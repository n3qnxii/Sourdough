/* Sourdough POS media storage v9.0
 * Full-fidelity photos and records live in IndexedDB instead of localStorage's
 * ~5MB string quota. Small localStorage metadata remains as a migration fallback.
 * Browser/device quotas still apply: this is not unlimited cloud storage.
 */
(function () {
  'use strict';
  const DB_NAME = 'sourdough-pos-primary-v1';
  const STORE = 'app';
  const KEY = 'current';
  const LEGACY_KEY = 'sdpos_v32';
  let databasePromise;
  let queued = null;
  let writing = false;
  let hadError = false;
  const isPhoto = value => typeof value === 'string' && value.startsWith('data:image/');

  function open() {
    if (!window.indexedDB) return Promise.reject(new Error('IndexedDB is not available'));
    if (!databasePromise) databasePromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(STORE);
      req.onsuccess = () => {
        const db = req.result;
        db.onversionchange = () => db.close();
        resolve(db);
      };
      req.onerror = () => reject(req.error || new Error('Cannot open image storage'));
      req.onblocked = () => reject(new Error('Image storage is blocked by another tab'));
    }).catch(e => { databasePromise = null; throw e; });
    return databasePromise;
  }

  async function read() {
    const database = await open();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(STORE, 'readonly');
      const request = tx.objectStore(STORE).get(KEY);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error('Cannot read image storage'));
    });
  }

  async function write(payload) {
    const database = await open();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put({ data: payload, updatedAt: Date.now() }, KEY);
      tx.oncomplete = resolve;
      tx.onabort = () => reject(tx.error || new Error('Storage full: could not save images'));
      tx.onerror = () => reject(tx.error || new Error('Unable to save images'));
    });
  }

  // Only strips embedded image *data*. Product image paths and product details
  // are retained in the localStorage fallback.
  function compactCopy(data) {
    const copy = JSON.parse(JSON.stringify(data));
    const scrub = value => {
      if (!value || typeof value !== 'object') return;
      for (const [key, child] of Object.entries(value)) {
        if (isPhoto(child)) value[key] = '';
        else if (child && typeof child === 'object') scrub(child);
      }
    };
    scrub(copy);
    return copy;
  }

  function showError(reason) {
    hadError = true;
    console.error('Sourdough POS image/data storage:', reason);
    window.dispatchEvent(new CustomEvent('sdpos-save-error'));
  }

  async function flush() {
    if (writing) return;
    writing = true;
    try {
      while (queued !== null) {
        const snapshot = queued;
        queued = null;
        try {
          // Commit large photos and data first. Never remove the old full
          // localStorage copy until this IndexedDB transaction succeeds.
          await write(snapshot);
          try {
            localStorage.setItem(LEGACY_KEY, JSON.stringify(compactCopy(snapshot)));
          } catch (e) { console.warn('Local fallback too large; primary IndexedDB data remains saved', e); }
          hadError = false;
        } catch (e) {
          // No false "saved" state: notify immediately and retain the old
          // localStorage copy instead of silently discarding menu photos.
          showError(e);
        }
      }
    } finally { writing = false; }
  }

  window.SDPhotoStorage = {
    async boot() {
      try {
        const stored = await read();
        if (stored && stored.data && Array.isArray(stored.data.products)) {
          window.__sdposHydratedData = stored.data;
          return;
        }
      } catch (e) {
        console.warn('IndexedDB unavailable: using older browser storage', e);
      }
      // Migration: app.js reads the original intact localStorage records.
      window.__sdposHydratedData = null;
    },
    persist(data) {
      // JSON snapshot decouples each async save from subsequent UI edits.
      try { queued = JSON.parse(JSON.stringify(data)); }
      catch (e) { showError(e); return false; }
      void flush();
      return true;
    },
    compactCopy,
    get hasError() { return hadError; },
    async requestDurableStorage() {
      try { return await navigator.storage?.persist?.() || false; }
      catch (_) { return false; }
    }
  };
})();
