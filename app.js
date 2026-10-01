const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)],
  money = (n) => "฿" + Number(n || 0).toLocaleString("th-TH");
const old = JSON.parse(localStorage.getItem("sdpos_v2") || "null");
const baseAccounts = [
  { u: "owner", p: "1234", name: "เจ้าของ", role: "owner" },
  { u: "staff1", p: "1111", name: "Staff 1", role: "staff" },
  { u: "staff2", p: "2222", name: "Staff 2", role: "staff" },
  { u: "staff3", p: "3333", name: "Staff 3", role: "staff" },
];
const baseCats = [
  { id: "sourdough", name: "Sourdough" },
  { id: "bread", name: "ขนมปัง" },
  { id: "bakery", name: "เบเกอรี่" },
  { id: "food", name: "ของทานเล่น" },
];
const defaultProducts = [
  {
    id: "classic",
    name: "Classic Sourdough",
    cat: "sourdough",
    price: 150,
    half: 80,
    halfCost: 0,
    halfName: "Classic Sourdough ครึ่งโลฟ",
    cost: 0,
    stock: 7,
    prep: "Japanese flour",
    desc: "Japanese flour",
    img: "assets/classic.svg",
    halfImg: "assets/classic.svg",
  },
  {
    id: "wholewheat",
    name: "Whole wheat Sourdough",
    cat: "sourdough",
    price: 180,
    half: 100,
    halfCost: 0,
    halfName: "Whole wheat Sourdough ครึ่งโลฟ",
    cost: 0,
    stock: 7,
    prep: "Japanese flour + 30% German whole wheat",
    desc: "Bestseller · Japanese flour + 30% German whole wheat",
    img: "assets/wholewheat.svg",
    halfImg: "assets/wholewheat.svg",
  },
  {
    id: "multigrain",
    name: "Multigrain Sourdough",
    cat: "sourdough",
    price: 190,
    half: 110,
    halfCost: 0,
    halfName: "Multigrain Sourdough ครึ่งโลฟ",
    cost: 0,
    stock: 7,
    prep: "",
    desc: "",
    img: "assets/multigrain.svg",
    halfImg: "assets/multigrain.svg",
  },
  {
    id: "sesame",
    name: "Black Sesame Sourdough",
    cat: "sourdough",
    price: 190,
    half: 110,
    halfCost: 0,
    halfName: "Black Sesame Sourdough ครึ่งโลฟ",
    cost: 0,
    stock: 7,
    prep: "",
    desc: "",
    img: "assets/sesame.svg",
    halfImg: "assets/sesame.svg",
  },
  {
    id: "cranberry",
    name: "Cranberry Sourdough",
    cat: "sourdough",
    price: 190,
    half: 110,
    halfCost: 0,
    halfName: "Cranberry Sourdough ครึ่งโลฟ",
    cost: 0,
    stock: 7,
    prep: "",
    desc: "",
    img: "assets/cranberry.svg",
    halfImg: "assets/cranberry.svg",
  },
  {
    id: "walnut",
    name: "Cranberry Walnuts Sourdough",
    cat: "sourdough",
    price: 240,
    half: 130,
    halfCost: 0,
    halfName: "Cranberry Walnuts Sourdough ครึ่งโลฟ",
    cost: 0,
    stock: 7,
    prep: "",
    desc: "",
    img: "assets/walnut.svg",
    halfImg: "assets/walnut.svg",
  },
  {
    id: "milk",
    name: "Fresh milk bread",
    cat: "bread",
    price: 100,
    half: null,
    halfCost: 0,
    halfName: "",
    cost: 0,
    stock: 7,
    prep: "",
    desc: "",
    img: "assets/milk.svg",
    halfImg: "",
  },
  {
    id: "wheatbread",
    name: "Whole wheat bread",
    cat: "bread",
    price: 120,
    half: null,
    halfCost: 0,
    halfName: "",
    cost: 0,
    stock: 7,
    prep: "",
    desc: "",
    img: "assets/wheatbread.svg",
    halfImg: "",
  },
  {
    id: "nosugar",
    name: "Whole wheat no sugar",
    cat: "bread",
    price: 120,
    half: null,
    halfCost: 0,
    halfName: "",
    cost: 0,
    stock: 7,
    prep: "",
    desc: "",
    img: "assets/nosugar.svg",
    halfImg: "",
  },
  {
    id: "brownie",
    name: "Brownie",
    cat: "bakery",
    price: 10,
    half: null,
    halfCost: 0,
    halfName: "",
    cost: 0,
    stock: 7,
    prep: "",
    desc: "",
    img: "assets/brownie.svg",
    halfImg: "",
  },
  {
    id: "buttercookie",
    name: "Butter cookie",
    cat: "bakery",
    price: 10,
    half: null,
    halfCost: 0,
    halfName: "",
    cost: 0,
    stock: 7,
    prep: "",
    desc: "",
    img: "assets/buttercookie.svg",
    halfImg: "",
  },
  {
    id: "graincookie",
    name: "Multigrain cookie",
    cat: "bakery",
    price: 15,
    half: null,
    halfCost: 0,
    halfName: "",
    cost: 0,
    stock: 7,
    prep: "",
    desc: "",
    img: "assets/graincookie.svg",
    halfImg: "",
  },
  {
    id: "fries",
    name: "French fries",
    cat: "food",
    price: 25,
    half: null,
    halfCost: 0,
    halfName: "",
    cost: 0,
    stock: 7,
    prep: "Small",
    desc: "Small",
    img: "assets/fries.svg",
    halfImg: "",
  },
];
const baseProducts = old?.products?.length
  ? old.products
  : structuredClone(defaultProducts);
baseProducts.forEach((p) => {
  if (p.prep === undefined) p.prep = p.desc || "";
  if (p.enabled === undefined) p.enabled = true;
});
let db = JSON.parse(localStorage.getItem("sdpos_v32") || "null") || {
  ...old,
  accounts: old?.accounts || baseAccounts,
  categories: old?.categories || baseCats,
  products: baseProducts,
  orders: old?.orders || [],
  promptpay: old?.promptpay || "",
  shopName: old?.shopName || "Sourdough",
  printerWidth: old?.printerWidth || 80,
  held: old?.held || [],
  preorders: old?.preorders || [],
  qrImage: old?.qrImage || "",
  language: old?.language || "th",
};
db.shopName = db.shopName || "Sourdough";
db.printerWidth = db.printerWidth || 80;
db.language = db.language || "th";
db.shopLogo = db.shopLogo || "";
db.tax = db.tax || {
  enabled: false,
  rate: 7,
  mode: "inclusive",
  label: "VAT",
  rounding: 2,
  serviceEnabled: false,
  serviceRate: 0,
  serviceLabel: "Service charge",
};
db.accounts = (db.accounts || baseAccounts).map((a, i) => ({
  ...a,
  active: a.active !== false,
  avatar:
    a.avatar ||
    `assets/staff/avatar-${i === 0 ? "owner" : "staff" + Math.min(i, 3)}.svg`,
}));
for (const k of [
  "accounts",
  "categories",
  "products",
  "orders",
  "held",
  "preorders",
])
  if (!db[k]) db[k] = [];
db.products.forEach((p) => {
  if (p.enabled === undefined) p.enabled = true;
});
// Preserve saved references to bundled branding after moving assets.
const bundledImagePaths = {
  "login-bg.png": "assets/branding/login-bg.png",
  "login-logo-transparent.png": "login-logo-transparent.png",
  "logo.png": "assets/branding/logo.png",
  "shop-logo-transparent.png": "assets/branding/shop-logo-transparent.png",
};
function bundledImagePath(src) {
  return bundledImagePaths[String(src || "").replace(/^\.\//, "")] || src;
}
for (const key of ["shopLogo", "qrImage"])
  if (db[key]) db[key] = bundledImagePath(db[key]);
for (const product of db.products)
  for (const key of ["img", "halfImg"])
    if (product[key]) product[key] = bundledImagePath(product[key]);
// Keep pre-orders tied to the same daily Order # from booking through payment.
(db.preorders || []).forEach((p) => {
  if (!p.orderNo) {
    const h = (db.held || []).find((x) => x.preorderId === p.id);
    const o = (db.orders || []).find((x) => x.preorderId === p.id);
    p.orderNo = h?.orderNo || o?.id || p.paymentOrderId || null;
  }
  if (p.paymentOrderId) {
    const o = (db.orders || []).find((x) => x.id === p.paymentOrderId);
    if (o) {
      o.isPreorder = true;
      o.preorderId = p.id;
    }
  }
});
// v5.83: full-loaf and half-loaf stock are tracked independently.
db.products.forEach((p) => {
  if (p.fullStock == null) p.fullStock = Number(p.stock || 0);
  p.stock = p.fullStock;
  p.halfStock = undefined;
});
// Retire the legacy stock reset without changing saved quantities.
if (!db.stockInitializedV552) {
  db.stockInitializedV552 = true;
}
setTimeout(syncHeaderBrand, 0);
// V5.0 migration: older builds could save an empty product list. Seed the real shop menu only when there are no products, without overwriting an existing/custom menu.
if (!db.products.length) {
  db.products = structuredClone(defaultProducts);
  localStorage.setItem("sdpos_v32", JSON.stringify(db));
}
let cart = [],
  currentUser = null,
  currentCat = "all",
  method = "cash",
  received = "0",
  currentOrderTab = "history",
  preCart = [];
const save = () => localStorage.setItem("sdpos_v32", JSON.stringify(db));
const total = () => cart.reduce((a, x) => a + x.qty * x.price, 0);
const qty = () => cart.reduce((a, x) => a + x.qty, 0);
function taxCalc(subtotal = total(), cfg = db.tax || {}) {
  let digits = Number.isFinite(+cfg.rounding) ? +cfg.rounding : 2,
    service = cfg.serviceEnabled
      ? roundTax((subtotal * (+cfg.serviceRate || 0)) / 100, digits)
      : 0,
    base = subtotal + service,
    tax = cfg.enabled
      ? roundTax(
          cfg.mode === "inclusive"
            ? (base * (+cfg.rate || 0)) / (100 + (+cfg.rate || 0))
            : (base * (+cfg.rate || 0)) / 100,
          digits,
        )
      : 0,
    grand = cfg.enabled && cfg.mode === "exclusive" ? base + tax : base;
  return { subtotal, service, tax, grand: roundTax(grand, digits) };
}
const payableTotal = () => taxCalc().grand;
const dateKey = (d) => {
  let x = new Date(d),
    y = x.getFullYear(),
    m = String(x.getMonth() + 1).padStart(2, "0"),
    day = String(x.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
let audioCtx = null,
  speechBusy = false,
  speechQueue = [],
  lastClickSoundAt = 0;
function clickSound(freq = 520, dur = 0.045) {
  if (speechBusy) return;
  const now = performance.now();
  if (now - lastClickSoundAt < 28) return;
  lastClickSoundAt = now;
  try {
    audioCtx =
      audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    let o = audioCtx.createOscillator(),
      g = audioCtx.createGain();
    o.frequency.value = freq;
    g.gain.value = 0.028;
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    o.stop(audioCtx.currentTime + dur);
  } catch (e) {}
}
function runSpeechQueue() {
  if (speechBusy || !speechQueue.length || !("speechSynthesis" in window))
    return;
  const item = speechQueue.shift(),
    en = item.en,
    lang = en ? "en-AU" : "th-TH";
  speechBusy = true;
  try {
    const u = new SpeechSynthesisUtterance(item.text);
    u.lang = lang;
    u.rate = en ? 1.08 : 1.06;
    u.pitch = en ? 1 : 0.98;
    u.volume = 0.95;
    const voices = speechSynthesis.getVoices?.() || [],
      preferred = en
        ? ["Karen", "Samantha", "Daniel", "Moira"]
        : ["Kanya", "Narisa", "Thai"];
    u.voice =
      voices.find(
        (v) =>
          v.lang?.toLowerCase() === "th-th" &&
          preferred.some((n) =>
            v.name?.toLowerCase().includes(n.toLowerCase()),
          ),
      ) ||
      voices.find(
        (v) =>
          preferred.some((n) => v.name?.includes(n)) &&
          v.lang?.toLowerCase().startsWith(en ? "en" : "th"),
      ) ||
      voices.find((v) => v.lang?.toLowerCase() === lang.toLowerCase()) ||
      voices.find((v) => v.lang?.toLowerCase().startsWith(en ? "en" : "th")) ||
      null;
    u.onend = u.onerror = () => {
      speechBusy = false;
      setTimeout(runSpeechQueue, 140);
    };
    speechSynthesis.speak(u);
    setTimeout(() => {
      try {
        if (speechSynthesis.paused) speechSynthesis.resume();
      } catch (e) {}
    }, 60);
  } catch (e) {
    speechBusy = false;
    setTimeout(runSpeechQueue, 100);
  }
}
function speakLocalized(thText, enText, opts = {}) {
  if (!("speechSynthesis" in window)) return;
  const en = db.language === "en",
    text = en ? enText || thText : thText;
  if (!text) return;
  const item = { text, en };
  if (opts.priority) speechQueue.unshift(item);
  else speechQueue.push(item);
  runSpeechQueue();
}
function speakThai(text) {
  speakLocalized(text, text);
}
// Prime available voices after browsers finish loading them.
try {
  speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
} catch (e) {}
document.addEventListener(
  "click",
  (e) => {
    if (e.target.closest("button,summary,.product,.stockCheck")) clickSound();
  },
  true,
);
function iconPayment(m) {
  return `<span class="payIcon ${m}"><svg><use href="#${m === "cash" ? "cash" : "qr"}"/></svg>${m === "cash" ? "เงินสด" : "QR"}</span>`;
}
function renderLoginUsers() {
  $("#loginUser").innerHTML = db.accounts
    .map((a, i) => ({ a, i }))
    .filter((x) => x.a.active !== false)
    .map((x) => `<option value="${x.i}">${x.a.u}</option>`)
    .join("");
}
function login() {
  let a = db.accounts[+$("#loginUser").value];
  if (!a || a.active === false || a.p !== $("#loginPass").value) {
    showPinError();
    return false;
  }
  currentUser = a;
  closeLoginPin();
  $("#login").classList.add("hidden");
  $("#app").classList.remove("hidden");
  document.body.classList.toggle("staff-session", a.role !== "owner");
  $("#who").textContent =
    db.language === "en" && a.role === "owner" && a.name === "เจ้าของ"
      ? "Owner"
      : a.name;
  $("#loginError").textContent = "";
  go("sell");
  renderAll();
  return true;
}
const loginPass = $("#loginPass");
loginPass.disabled = false;
loginPass.readOnly = true;
loginPass.setAttribute("readonly", "");
const loginPinPad = $("#loginPinPad"),
  pinDots = $("#pinDots");
function showPinError() {
  openLoginPin();
  $("#loginError").textContent = "Incorrect PIN";
  $("#pinDots").classList.remove("pinInvalid");
  void $("#pinDots").offsetWidth;
  $("#pinDots").classList.add("pinInvalid");
}
function updatePinDots() {
  if (!pinDots) return;
  const n = loginPass.value.length;
  pinDots.innerHTML = n
    ? Array.from({ length: n }, () => "<i></i>").join("")
    : "<span>PIN</span>";
}
function openLoginPin() {
  loginPinPad?.classList.remove("hidden");
  loginPinPad?.setAttribute("aria-hidden", "false");
  document.body.classList.add("pin-open");
  updatePinDots();
}
function closeLoginPin() {
  loginPinPad?.classList.add("hidden");
  loginPinPad?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("pin-open");
}
$("#loginBtn").addEventListener("click", login);
loginPass.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  openLoginPin();
});
loginPass.addEventListener("focus", () => {
  loginPass.blur();
  openLoginPin();
});
loginPinPad?.addEventListener("pointerdown", (e) => {
  const close = e.target.closest("[data-pin-close]");
  if (close) {
    e.preventDefault();
    closeLoginPin();
    return;
  }
  const b = e.target.closest("button[data-pin]");
  if (!b) return;
  e.preventDefault();
  const v = b.dataset.pin;
  if ($("#loginError").textContent && /^\d$/.test(v)) loginPass.value = "";
  $("#loginError").textContent = "";
  if (v === "clear") loginPass.value = "";
  else if (v === "back") loginPass.value = loginPass.value.slice(0, -1);
  else if (loginPass.value.length < 4) loginPass.value += v;
  updatePinDots();
  clickSound(520, 0.035);
  if (loginPass.value.length === 4) {
    const a = db.accounts[+$("#loginUser").value];
    if (a && a.active !== false && a.p === loginPass.value) login();
    else showPinError();
  }
});
$("#pinDone")?.addEventListener("click", () => {
  login();
});
$("#togglePass").addEventListener("click", () => {
  loginPass.type = loginPass.type === "password" ? "text" : "password";
  openLoginPin();
});
document.addEventListener("keydown", (e) => {
  if (loginPinPad?.classList.contains("hidden")) return;
  if (/^\d$/.test(e.key) && $("#loginError").textContent) loginPass.value = "";
  if (/^\d$/.test(e.key) && loginPass.value.length < 4) {
    $("#loginError").textContent = "";
    loginPass.value += e.key;
    updatePinDots();
    if (loginPass.value.length === 4) {
      const a = db.accounts[+$("#loginUser").value];
      if (a && a.active !== false && a.p === loginPass.value) login();
      else showPinError();
    }
  } else if (e.key === "Backspace") {
    loginPass.value = loginPass.value.slice(0, -1);
    updatePinDots();
    $("#loginError").textContent = "";
  } else if (e.key === "Escape") closeLoginPin();
  else if (e.key === "Enter") login();
});
$("#logout").onclick = () => {
  document.body.classList.remove("staff-session");
  currentUser = null;
  $("#app").classList.add("hidden");
  $("#login").classList.remove("hidden");
  $("#loginPass").value = "";
  updatePinDots();
};
function go(id) {
  if (currentUser?.role !== "owner" && (id === "reports" || id === "settings"))
    id = "sell";
  $$(".page").forEach((x) => x.classList.toggle("active", x.id === id));
  $$("nav button").forEach((x) =>
    x.classList.toggle("active", x.dataset.page === id),
  );
  $("#app").classList.toggle("sellMode", id === "sell");
  if (id === "orders") renderOrderTab();
  if (id === "reports") renderReports();
  if (id === "stock") renderStock();
  if (id === "manage") renderManage();
  if (id === "settings") renderSettings();
  setTimeout(updatePageLock, 0);
}
$$("nav button").forEach((b) => (b.onclick = () => go(b.dataset.page)));
let currentOrderNo = null;
function renderClock() {
  if (
    typeof currentOrderNo !== "undefined" &&
    currentOrderNo >= 2000010100001 &&
    Math.floor(currentOrderNo / 100000) !== dailyOrderPrefix() / 100000
  ) {
    ensureDailyOrder();
    $("#orderNo").textContent = "#" + formatOrderNumber(currentOrderNo);
  }
  const en = db.language === "en";
  $("#clock").textContent = new Date().toLocaleString(en ? "en-AU" : "th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
renderClock();
setInterval(renderClock, 1000);
$("#search")?.addEventListener("input", renderProducts);
$("#search")?.addEventListener("search", renderProducts);
function renderCats() {
  let arr = [...db.categories, { id: "all", name: "ทั้งหมด" }];
  $("#categoryNav").innerHTML = arr
    .map(
      (c) =>
        `<button class="${currentCat === c.id ? "active" : ""}" data-cat="${c.id}">${c.name}</button>`,
    )
    .join("");
  $$("#categoryNav button").forEach(
    (b) =>
      (b.onclick = () => {
        currentCat = b.dataset.cat;
        renderCats();
        renderProducts();
      }),
  );
}
function variantUnit(v) {
  return v === "half" ? 0.5 : 1;
}
function variantStock(p, v) {
  return Math.max(0, Number(p.fullStock ?? p.stock ?? 0) || 0);
}
function itemVariant(i) {
  return /half|ครึ่ง/i.test(i?.variant || "") ? "half" : "full";
}
function itemStockUnits(i) {
  return (+i?.qty || 0) * variantUnit(itemVariant(i));
}
function cartVariantQty(id, v) {
  return cart
    .filter((i) => i.id === id && itemVariant(i) === v)
    .reduce((n, i) => n + itemStockUnits(i), 0);
}
function reservedVariantQty(id, v, excludePreorderId = null) {
  return (db.held || [])
    .filter(
      (h) =>
        !h.preorderPaid &&
        !h.stockDeducted &&
        (!excludePreorderId || h.preorderId !== excludePreorderId),
    )
    .flatMap((h) => h.items || [])
    .filter((i) => i.id === id)
    .reduce((n, i) => n + itemStockUnits(i), 0);
}
function availableStock(p, v) {
  return Math.max(
    0,
    variantStock(p, v) -
      reservedVariantQty(p.id, v, activePreorderPaymentId) -
      cartVariantQty(p.id, v),
  );
}
function renderProducts() {
  let q = ($("#search").value || "").trim().toLocaleLowerCase();
  let ps = db.products.filter(
    (p) =>
      (currentCat === "all" || p.cat === currentCat) &&
      p.name.toLowerCase().includes(q),
  );
  $("#products").innerHTML =
    ps
      .map((p) => {
        let full = availableStock(p, "full"),
          half = p.half != null ? full : null,
          none = full <= 0 || (full < 1 && p.half == null),
          halfOnly = full > 0 && full < 1 && p.half != null,
          low = full > 0 && full <= 5;
        let stockText = `${full}`;
        return `<button class="product ${none ? "soldOut" : ""} ${low && !none ? "lowStockProduct" : ""} ${p.enabled === false ? "saleOff" : ""}" data-id="${p.id}" ${none || p.enabled === false ? "disabled" : ""}><img src="${p.img || "assets/branding/logo.png"}"><div class="pBody"><h3>${p.name}</h3><p>${p.desc || ""}</p><div class="pFoot"><b>${money(p.price)}</b>${p.half ? `<span>ครึ่ง ${money(p.half)}</span>` : ""}</div><small class="saleStockLine">${db.language === "en" ? "Remaining" : "คงเหลือ"} ${stockText}</small>${halfOnly ? `<span class="saleLowBadge">${db.language === "en" ? "Half loaf only" : "เหลือขายได้เฉพาะครึ่งโลฟ"}</span>` : low && !none ? `<span class="saleLowBadge">${db.language === "en" ? "Low stock" : "สต๊อกเหลือน้อย"}</span>` : ""}</div></button>`;
      })
      .join("") || '<div class="emptyState">ไม่พบสินค้า</div>';
  $$(".product").forEach(
    (b) =>
      (b.onclick = () => {
        const id = b.dataset.id;
        chooseProduct(id);
        const active = [...document.querySelectorAll(".product")].find(
          (el) => el.dataset.id === id,
        );
        if (active) {
          active.classList.remove("productTapped");
          void active.offsetWidth;
          active.classList.add("productTapped");
          setTimeout(() => active.classList.remove("productTapped"), 700);
        }
      }),
  );
}

function chooseProduct(id) {
  let p = db.products.find((x) => x.id === id);
  if (!p) return;
  if (p.half) {
    let hs = availableStock(p, "half"),
      fs = availableStock(p, "full"),
      en = db.language === "en";
    $("#variantTitle").textContent = p.name;
    $("#variantChoices").innerHTML =
      `<button class="variantStockChoice ${hs < 0.5 ? "variantSoldOut" : ""}" onclick="pickVariant('${id}','half')" ${hs < 0.5 ? "disabled" : ""}><img src="${p.halfImg || p.img || "assets/branding/logo.png"}"><b>${en ? "Half loaf" : "ครึ่งโลฟ"}</b><strong>${money(p.half)}</strong><small>${en ? "Remaining" : "คงเหลือ"} ${hs}</small>${hs < 0.5 ? `<em>${en ? "Out of stock" : "สินค้าหมด"}</em>` : ""}</button><button class="variantStockChoice ${fs < 1 ? "variantSoldOut" : ""}" onclick="pickVariant('${id}','full')" ${fs < 1 ? "disabled" : ""}><img src="${p.img || "assets/branding/logo.png"}"><b>${en ? "Full loaf" : "เต็มโลฟ"}</b><strong>${money(p.price)}</strong><small>${en ? "Remaining" : "คงเหลือ"} ${fs}</small>${fs < 1 ? `<em>${en ? "Out of stock" : "สินค้าหมด"}</em>` : ""}</button>`;
    $("#variantModal").classList.remove("hidden");
    syncModalScrollLock();
  } else addCart(p, "", p.price);
}
window.pickVariant = (id, v) => {
  let p = db.products.find((x) => x.id === id);
  let need = variantUnit(v);
  if (!p || availableStock(p, v) < need) {
    clickSound(260, 0.05);
    return;
  }
  addCart(
    p,
    v === "half"
      ? db.language === "en"
        ? "Half loaf"
        : "ครึ่งโลฟ"
      : db.language === "en"
        ? "Full loaf"
        : "เต็มโลฟ",
    v === "half" ? p.half : p.price,
  );
  $("#variantModal").classList.add("hidden");
};
function notifyVariantLowStock(p, v) {
  let remaining = availableStock(p, v);
  if (remaining <= 0 || remaining > 5) return;
  let en = db.language === "en",
    label =
      v === "half"
        ? en
          ? "Half loaf"
          : "ครึ่งโลฟ"
        : en
          ? "Full loaf"
          : "เต็มโลฟ";
  showLowStockToast([p]);
  $("#salePulse").innerHTML =
    `<b>${p.name}</b> · ${label} ${en ? "only" : "เหลือ"} ${remaining} ${en ? "left" : ""}`;
  $("#salePulse").classList.add("flash");
  setTimeout(() => $("#salePulse").classList.remove("flash"), 700);
}
function addCart(p, variant, price) {
  let v = /half|ครึ่ง/i.test(variant || "") ? "half" : "full";
  if (availableStock(p, v) < variantUnit(v)) return;
  let key = p.id + "|" + variant,
    x = cart.find((i) => i.key === key);
  if (x) x.qty++;
  else cart.push({ key, id: p.id, name: p.name, variant, price, qty: 1 });
  renderCart();
  renderProducts();
  $("#salePulse").innerHTML =
    `เพิ่ม <b>${p.name}</b> · ในออเดอร์ ${qty()} ชิ้น`;
  $("#salePulse").classList.add("flash");
  setTimeout(() => $("#salePulse").classList.remove("flash"), 500);
  notifyVariantLowStock(p, v);
}
function renderSaleTaxSummary(tc = taxCalc()) {
  let el = $("#saleTaxSummary");
  if (!el) return;
  let t = db.tax || {},
    en = db.language === "en";
  if (!t.enabled && !t.serviceEnabled) {
    el.classList.add("hidden");
    el.innerHTML = "";
    return;
  }
  let rows = [];
  rows.push(
    `<div><span>${en ? "Subtotal" : "ยอดสินค้า"}</span><b>${money(tc.subtotal)}</b></div>`,
  );
  if (t.serviceEnabled)
    rows.push(
      `<div><span>${t.serviceLabel || "Service charge"} ${+t.serviceRate || 0}%</span><b>${money(tc.service)}</b></div>`,
    );
  if (t.enabled)
    rows.push(
      `<div class="taxAccent"><span>${t.label || "VAT"} ${+t.rate || 0}% ${t.mode === "inclusive" ? (en ? "(included)" : "(รวมในราคา)") : en ? "(added)" : "(บวกเพิ่ม)"}</span><b>${money(tc.tax)}</b></div>`,
    );
  rows.push(
    `<div class="taxGrand"><span>${en ? "Amount due" : "ยอดชำระ"}</span><b>${money(tc.grand)}</b></div>`,
  );
  el.innerHTML = rows.join("");
  el.classList.remove("hidden");
}
function renderCart() {
  ensureDailyOrder();
  const en = db.language === "en";
  let n = qty(),
    tc = taxCalc();
  $("#itemCount").textContent = n + " " + (en ? "items" : "ชิ้น");
  $("#total").textContent = money(tc.grand);
  renderSaleTaxSummary(tc);
  $("#orderNo").textContent = "#" + formatOrderNumber(currentOrderNo);
  $("#cartItems").innerHTML = cart.length
    ? cart
        .map(
          (x, i) =>
            `<div class="cartLine"><div><b data-no-translate>${x.name}</b><small>${x.variant || (en ? "Regular" : "ปกติ")} · ${money(x.price)}</small><div class="qty"><button data-i="${i}" data-d="-1">−</button><strong>${x.qty}</strong><button data-i="${i}" data-d="1">+</button></div></div><b>${money(x.qty * x.price)}</b></div>`,
        )
        .join("")
    : `<div class="emptyState"><svg><use href="#cart"/></svg><b>${en ? "No items" : "ยังไม่มีสินค้า"}</b><span>${en ? "Choose items to start selling" : "เลือกเมนูเพื่อเริ่มขาย"}</span></div>`;
  $$(".qty button").forEach(
    (b) =>
      (b.onclick = () => {
        let i = +b.dataset.i,
          d = +b.dataset.d,
          item = cart[i],
          p = db.products.find((x) => x.id === item?.id),
          v = /half|ครึ่ง/i.test(item?.variant || "") ? "half" : "full";
        if (d > 0 && p && availableStock(p, v) < variantUnit(v)) return;
        item.qty += d;
        if (item.qty <= 0) cart.splice(i, 1);
        renderCart();
        renderProducts();
        if (d > 0 && p) notifyVariantLowStock(p, v);
      }),
  );
  renderHeld();
}
function orderSequence(id) {
  const n = Number(id) || 0;
  return n >= 2000010100001 && n < 3000010100000 ? n % 100000 : n;
}
function formatOrderNumber(id) {
  return String(orderSequence(id)).padStart(3, "0");
}
function dailyOrderPrefix() {
  return Number(dateKey(new Date()).replaceAll("-", "")) * 100000;
}
function nextId() {
  const today = dateKey(new Date());
  const entries = [
    ...db.orders
      .filter((o) => (o.localDate || dateKey(o.date)) === today)
      .map((o) => o.id),
    ...db.held
      .filter((h) => (h.localDate || dateKey(h.time)) === today)
      .map((h) => h.orderNo),
    ...db.preorders
      .filter(
        (p) =>
          (p.createdLocalDate || dateKey(p.createdAt || Date.now())) === today,
      )
      .map((p) => p.orderNo),
  ];
  return dailyOrderPrefix() + Math.max(0, ...entries.map(orderSequence)) + 1;
}
function ensureDailyOrder() {
  if (
    currentOrderNo == null ||
    (Number(currentOrderNo) >= 2000010100001 &&
      Math.floor(Number(currentOrderNo) / 100000) !==
        dailyOrderPrefix() / 100000)
  )
    currentOrderNo = nextId();
}
$("#clear").onclick = () => {
  cart = [];
  renderCart();
  $("#salePulse").textContent = "ล้างรายการแล้ว";
};
$("#cancelBtn").onclick = () => {
  if (!cart.length) return;
  const cancelCurrent = () => {
    let now = new Date(),
      cancelledOrder = {
        id: currentOrderNo || nextId(),
        date: now.toISOString(),
        localDate: dateKey(now),
        staff: currentUser.name,
        method: "cancelled",
        total: total(),
        received: 0,
        change: 0,
        status: "cancelled",
        cancelSource: "sell",
        cancelReason:
          db.language === "en"
            ? "Customer cancelled before payment"
            : "ลูกค้ายกเลิกก่อนชำระเงิน",
        items: structuredClone(cart),
      };
    db.orders.push(cancelledOrder);
    if (activePreorderPaymentId) {
      let pp = db.preorders.find((x) => x.id === activePreorderPaymentId);
      if (pp) {
        pp.status = "cancelled";
        pp.cancelledAt = now.toISOString();
        pp.cancelOrderId = cancelledOrder.id;
      }
      db.held = (db.held || []).filter(
        (h) => h.preorderId !== activePreorderPaymentId,
      );
      activePreorderPaymentId = null;
    }
    cart = [];
    currentOrderNo = null;
    save();
    renderCart();
    renderProducts();
    renderHeld();
    $("#salePulse").textContent =
      (db.language === "en" ? "Order #" : "บันทึก Order #") +
      formatOrderNumber(cancelledOrder.id) +
      (db.language === "en" ? " cancelled" : " เป็นยกเลิกแล้ว");
    clickSound(320, 0.12);
    speakLocalized("ยกเลิกรายการค่ะ", "Order cancelled.", { priority: true });
  };
  if (activePreorderPaymentId) {
    let pp = db.preorders.find((x) => x.id === activePreorderPaymentId);
    if (pp) return preConfirm("cancel", pp, cancelCurrent);
  }
  if (
    confirm(
      db.language === "en"
        ? "Cancel the current order?"
        : "ลูกค้ายกเลิกออเดอร์ปัจจุบัน?",
    )
  )
    cancelCurrent();
};
$("#holdBtn").onclick = () => {
  if (!cart.length)
    return alert(db.language === "en" ? "No items" : "ยังไม่มีสินค้า");
  ensureDailyOrder();
  let heldItems = structuredClone(cart);
  heldItems.forEach((i) => {
    let p = db.products.find((x) => x.id === i.id);
    if (p) {
      p.fullStock = Math.max(
        0,
        Number(p.fullStock ?? p.stock ?? 0) - itemStockUnits(i),
      );
      p.stock = p.fullStock;
    }
  });
  db.held.push({
    id: Date.now(),
    orderNo: currentOrderNo,
    time: new Date().toISOString(),
    localDate: dateKey(new Date()),
    items: heldItems,
    staff: currentUser.name,
    stockDeducted: true,
  });
  cart = [];
  currentOrderNo = null;
  save();
  renderCart();
  $("#salePulse").textContent =
    "พัก Order #" +
    formatOrderNumber(db.held[db.held.length - 1].orderNo) +
    " แล้ว";
};
function paidPreorderOrder(id) {
  return db.orders.find(
    (o) => String(o.preorderId) === String(id) && o.status === "paid",
  );
}
// Reconcile the held list with the authoritative payment records.
function syncPaidPreorders() {
  db.held = db.held.filter(
    (h) =>
      !h.preorderId ||
      !db.preorders.some(
        (p) =>
          String(p.id) === String(h.preorderId) &&
          ["completed", "cancelled"].includes(p.status),
      ),
  );
  for (const p of db.preorders) {
    if (["completed", "cancelled"].includes(p.status)) continue;
    const paid = paidPreorderOrder(p.id);
    if (!paid && p.status !== "paid") continue;
    p.status = "paid";
    if (paid) p.paymentOrderId = paid.id;
    let h = db.held.find((h) => String(h.preorderId) === String(p.id));
    if (!h) {
      h = {
        id: "paid-pre-" + p.id,
        preorderId: p.id,
        isPreorder: true,
        items: structuredClone(p.items || []),
        orderNo: paid?.id || p.orderNo,
        customer: p.customer,
        pickupDate: p.date,
        pickupTime: p.time,
        note: p.note,
        time: paid?.date || new Date().toISOString(),
      };
      db.held.push(h);
    }
    h.preorderPaid = true;
    h.stockDeducted = true;
    h.isNewPreorder = false;
  }
}
function renderHeld() {
  syncPaidPreorders();
  let hc = db.held.length,
    en = db.language === "en";
  let hcEl = $("#heldCount");
  if (hcEl) {
    hcEl.textContent = hc;
    hcEl.classList.toggle("isZero", hc === 0);
  }
  let fb = $("#heldFloatBadge");
  if (fb) {
    fb.textContent = hc;
    fb.classList.toggle("hidden", hc === 0);
  }
  let nb = $("#heldNavBtn");
  if (nb) nb.classList.toggle("hasHeld", hc > 0);
  const heldIcon = (type) =>
    type === "user"
      ? `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3"/><path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6"/></svg>`
      : type === "bag"
        ? `<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>`
        : type === "date"
          ? `<svg viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="15" rx="3"/><path d="M8 3.5v4M16 3.5v4M3.5 10h17"/></svg>`
          : `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5l3.5 2"/></svg>`;
  $("#heldOrders").innerHTML =
    db.held
      .map((h, i) => {
        let q = h.items.reduce((a, x) => a + x.qty, 0),
          sum = h.items.reduce((a, x) => a + x.qty * x.price, 0),
          names = h.items
            .slice(0, 2)
            .map((x) => x.name)
            .join(" · "),
          more =
            h.items.length > 2
              ? ` +${h.items.length - 2} ${en ? "more" : "รายการ"}`
              : "";
        return `<article class="heldCard ${h.isPreorder ? "heldPreorder" : ""}">${h.isPreorder ? `<div class="heldPreRibbon">${h.isNewPreorder ? `<span class="heldNewDot"></span><b>${en ? "NEW" : "ใหม่"}</b>` : ""}<svg viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="15" rx="3"/><path d="M8 3.5v4M16 3.5v4M3.5 10h17"/></svg>${en ? "PRE-ORDER · HELD ORDER" : "รายการสั่งล่วงหน้า · พักออเดอร์"}</div>` : ""}<div class="heldCardTop"><div class="heldOrderLabels"><span class="heldOrderNo">Order #${formatOrderNumber(h.orderNo || i + 1)}</span><span class="heldQueueNo">${h.isPreorder ? h.customer || "" : en ? "Held " + (i + 1) : "พักลำดับ " + (i + 1)}</span></div><span class="heldDot"></span></div>${h.isPreorder ? `<div class="heldPreCustomer">${heldIcon("user")}<span><small>${en ? "Customer" : "ลูกค้า"}</small><b>${h.customer || "-"}</b></span></div><div class="heldPreMeta"><span>${heldIcon("date")}<b>${h.pickupDate || "-"}</b></span><span>${heldIcon("time")}<b>${h.pickupTime || "-"}</b></span><span>${heldIcon("bag")}<b>${q} ${en ? "items" : "ชิ้น"}</b></span></div>` : ""}<b class="heldNames">${names || (en ? "Held order" : "ออเดอร์พัก")}${more}</b><div class="heldMeta"><span>${h.isPreorder ? (en ? "Pre-order total" : "ยอดสั่งล่วงหน้า") : q + " " + (en ? "items" : "ชิ้น")}</span><strong>${money(sum)}</strong></div>${h.isPreorder && h.preorderPaid ? `<div class="heldPaidRow"><span class="heldPaidState"><svg viewBox="0 0 24 24"><path d="M4 7h16v11H4zM4 10h16M8 15h3"/></svg>${en ? "Paid · waiting pickup" : "ชำระแล้ว · รอรับสินค้า"}</span><button class="heldCompleteMini" onclick="event.stopPropagation();completeHeldPreorder(${h.preorderId})" title="${en ? "Complete pre-order" : "สำเร็จรายการจองล่วงหน้า"}"><svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"/></svg>${en ? "Complete" : "สำเร็จ"}</button></div>` : `<button class="heldResume" onclick="resumeHeld(${i})">${en ? "Resume order" : "เรียกออเดอร์กลับมา"}</button>`}</article>`;
      })
      .join("") ||
    `<div class="heldEmpty"><div class="heldEmptyIcon">✓</div><b>${en ? "No held orders" : "ไม่มีออเดอร์พัก"}</b><span>${en ? "Held and pre-orders will appear here" : "ออเดอร์ที่พักและสั่งล่วงหน้าจะแสดงตรงนี้"}</span></div>`;
}
window.completeHeldPreorder = (id) => {
  let p = db.preorders.find((x) => x.id === id);
  if (!p || p.status !== "paid") return;
  p.status = "completed";
  p.completedAt = new Date().toISOString();
  db.held = (db.held || []).filter((h) => h.preorderId !== id);
  let o = db.orders.find((x) => x.id === p.paymentOrderId);
  if (o) {
    o.isPreorder = true;
    o.preorderId = id;
    o.preorderCompleted = true;
  }
  save();
  renderHeld();
  if (currentOrderTab === "preorder") renderPreorders();
  clickSound(820, 0.1);
  speakLocalized("รายการสั่งล่วงหน้าสำเร็จแล้วค่ะ", "Pre-order completed.", {
    priority: true,
  });
};
window.resumeHeld = (i) => {
  let held = db.held[i];
  if (!held) return;
  if (
    held.isPreorder &&
    (held.preorderPaid ||
      paidPreorderOrder(held.preorderId) ||
      db.preorders.find((p) => p.id === held.preorderId)?.status === "paid")
  ) {
    renderHeld();
    return;
  }
  if (cart.length) {
    ensureDailyOrder();
    db.held.push({
      id: Date.now(),
      orderNo: currentOrderNo,
      time: new Date().toISOString(),
      localDate: dateKey(new Date()),
      items: structuredClone(cart),
      staff: currentUser?.name || "",
    });
  }
  if (held.stockDeducted)
    (held.items || []).forEach((it) => {
      let p = db.products.find((x) => x.id === it.id);
      if (p) {
        p.fullStock = Number(p.fullStock ?? p.stock ?? 0) + itemStockUnits(it);
        p.stock = p.fullStock;
      }
    });
  cart = structuredClone(held.items);
  currentOrderNo = held.orderNo || nextId();
  if (held.isPreorder && held.preorderId) {
    activePreorderPaymentId = held.preorderId;
  } else {
    activePreorderPaymentId = null;
  }
  db.held.splice(i, 1);
  save();
  renderCart();
  $("#salePulse").textContent =
    "เรียก Order #" + formatOrderNumber(currentOrderNo) + " กลับมาแล้ว";
  window.setHeldDrawerState?.(false);
  go("sell");
  requestAnimationFrame(() =>
    window.scrollTo({ top: 0, left: 0, behavior: "auto" }),
  );
};
$("#payBtn").onclick = () => {
  if (!cart.length)
    return alert(
      db.language === "en" ? "Please choose a product" : "กรุณาเลือกสินค้า",
    );
  received = "0";
  method = "cash";
  let tc = taxCalc();
  $("#payTotal").textContent = money(tc.grand);
  renderPayTaxSummary(tc);
  $("#payModal").classList.remove("hidden");
  syncModalScrollLock();
  setMethod("cash");
  renderKeypad();
  setReceived(0);
};
$$(".method button").forEach(
  (b) => (b.onclick = () => setMethod(b.dataset.method)),
);
document.addEventListener("pointerdown", (e) => {
  const b = e.target.closest("#clearReceived");
  if (!b) return;
  e.preventDefault();
  e.stopPropagation();
  setReceived(0);
  clickSound(430, 0.04);
});
function setMethod(m) {
  method = m;
  $$(".method button").forEach((b) =>
    b.classList.toggle("active", b.dataset.method === m),
  );
  $("#cashArea").classList.toggle("hidden", m !== "cash");
  $("#qrArea").classList.toggle("hidden", m !== "qr");
  if (m === "qr") renderQR();
}
function renderPayTaxSummary(tc = taxCalc()) {
  let el = $("#payTaxSummary"),
    t = db.tax || {},
    en = db.language === "en";
  if (!el) return;
  if (!t.enabled && !t.serviceEnabled) {
    el.classList.add("hidden");
    el.innerHTML = "";
    return;
  }
  let a = [
    `<div><span>${en ? "Subtotal" : "ยอดสินค้า"}</span><b>${money(tc.subtotal)}</b></div>`,
  ];
  if (t.serviceEnabled)
    a.push(
      `<div><span>${t.serviceLabel || "Service charge"} ${+t.serviceRate || 0}%</span><b>${money(tc.service)}</b></div>`,
    );
  if (t.enabled)
    a.push(
      `<div class="taxAccent"><span>${t.label || "VAT"} ${+t.rate || 0}% ${t.mode === "inclusive" ? (en ? "included" : "รวมในราคา") : en ? "added" : "บวกเพิ่ม"}</span><b>${money(tc.tax)}</b></div>`,
    );
  el.innerHTML = a.join("");
  el.classList.remove("hidden");
}
function setReceived(v) {
  received = String(Math.max(0, +String(v).replace(/[^\d.]/g, "") || 0));
  let input = $("#cashInput");
  if (input) input.value = money(received);
  let display = $("#receivedDisplay");
  if (display) display.textContent = money(received);
  let diff = (+received || 0) - payableTotal(),
    box = $("#changeBox"),
    label = $("#changeLabel");
  $("#change").textContent = money(diff);
  box?.classList.toggle("shortage", diff < 0);
  if (label)
    label.textContent =
      diff < 0
        ? db.language === "en"
          ? "Amount due"
          : "ขาดเงิน"
        : db.language === "en"
          ? "Change"
          : "เงินทอน";
}
function renderKeypad() {
  let input = $("#cashInput"),
    modal = $("#cashPadModal"),
    keys = $("#cashPadKeys"),
    en = db.language === "en";
  $("#quickCash").innerHTML =
    [20, 50, 100, 500, 1000]
      .map((v) => `<button type="button" data-v="${v}">${v}</button>`)
      .join("") +
    `<button type="button" data-exact="1" class="exactCash">${en ? "Exact amount" : "พอดี"}</button>`;
  $$("#quickCash [data-v]").forEach((b) => {
    b.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setReceived((+received || 0) + (+b.dataset.v || 0));
      clickSound(700, 0.025);
    };
  });
  $("#quickCash [data-exact]").onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setReceived(payableTotal());
    clickSound(760, 0.05);
  };
  keys.innerHTML = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "⌫",
    "0",
    "ล้าง",
  ]
    .map(
      (k) =>
        `<button data-key="${k}" class="${k === "⌫" ? "keyDelete" : k === "ล้าง" ? "keyClear" : ""}">${k}</button>`,
    )
    .join("");
  input.value = "";
  function refreshPad() {
    $("#cashPadValue").textContent = money(+(input.value || 0));
    setReceived(input.value || 0);
  }
  function openPad() {
    modal.classList.remove("hidden");
    syncModalScrollLock();
    refreshPad();
    clickSound(620, 0.04);
  }
  input.onclick = openPad;
  input.onfocus = () => input.blur();
  keys.querySelectorAll("button").forEach(
    (b) =>
      (b.onclick = () => {
        let k = b.dataset.key;
        if (k === "⌫") input.value = input.value.slice(0, -1);
        else if (k === "ล้าง") input.value = "";
        else input.value = (input.value === "0" ? "" : input.value) + k;
        refreshPad();
        clickSound(680, 0.035);
      }),
  );
  $("#cashPadExact").onclick = () => {
    input.value = payableTotal();
    refreshPad();
    clickSound(760, 0.05);
  };
  $("#cashPadUse").onclick = () => {
    modal.classList.add("hidden");
    syncModalScrollLock();
    refreshPad();
    clickSound(820, 0.06);
  };
  $("#cashPadClose").onclick = () => {
    modal.classList.add("hidden");
    syncModalScrollLock();
  };
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      syncModalScrollLock();
    }
  };
  setReceived(0);
}
function crc16(s) {
  let crc = 0xffff;
  for (let c of s) {
    crc ^= c.charCodeAt(0) << 8;
    for (let i = 0; i < 8; i++)
      ((crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1), (crc &= 0xffff));
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}
function tlv(id, val) {
  return id + String(val.length).padStart(2, "0") + val;
}
function promptPayPayload(id, amount) {
  let x = (id || "").replace(/\D/g, "");
  if (!x) return "";
  let target = x.length === 10 ? "0066" + x.slice(1) : x.length === 13 ? x : "";
  if (!target) return "";
  let aid =
    tlv("00", "A000000677010111") +
    (x.length === 10 ? tlv("01", target) : tlv("02", target));
  let s =
    tlv("00", "01") +
    tlv("01", "12") +
    tlv("29", aid) +
    tlv("53", "764") +
    tlv("54", Number(amount).toFixed(2)) +
    tlv("58", "TH") +
    tlv(
      "59",
      (db.shopName || "SOURDOUGH")
        .toUpperCase()
        .replace(/[^A-Z0-9 ]/g, "")
        .slice(0, 25) || "SOURDOUGH",
    ) +
    tlv("60", "THAILAND") +
    "6304";
  return s + crc16(s);
}
function drawQR(el, payload, size) {
  el.innerHTML = "";
  if (!payload) {
    el.innerHTML = '<div class="qrWarn">ยังไม่ได้ตั้งค่า PromptPay</div>';
    return;
  }
  if (window.QRCode)
    new QRCode(el, {
      text: payload,
      width: size,
      height: size,
      colorDark: "#2b1d14",
      colorLight: "#fff",
    });
  else
    el.innerHTML =
      '<div class="qrWarn">ต้องเชื่อมอินเทอร์เน็ตครั้งแรกเพื่อโหลดตัวสร้าง QR</div>';
}
function renderQR() {
  let p = promptPayPayload(db.promptpay, payableTotal());
  $("#qrAmount").textContent = money(payableTotal());
  if (db.qrImage) {
    $("#qrStatus").textContent =
      "QR รูปภาพของร้าน · กรุณาตรวจสอบยอด " + money(payableTotal());
    $("#qrcode").innerHTML =
      `<img src="${db.qrImage}" style="width:220px;height:220px;object-fit:contain;border-radius:12px">`;
    $("#qrcodeFull").innerHTML =
      `<img src="${db.qrImage}" style="width:340px;height:340px;object-fit:contain;border-radius:16px">`;
  } else {
    $("#qrStatus").textContent = db.promptpay
      ? "PromptPay: " + db.promptpay
      : "กรุณาตั้ง PromptPay ในหน้าตั้งค่า";
    drawQR($("#qrcode"), p, 220);
    drawQR($("#qrcodeFull"), p, 340);
  }
  $("#qrFullAmount").textContent = money(payableTotal());
}
$("#qrZoom").onclick = () => {
  renderQR();
  const q = $("#qrFull");
  q.classList.remove("hidden");
  q.scrollTop = 0;
  updatePageLock();
  requestAnimationFrame(() =>
    q.querySelector(".qrFullBox")?.scrollIntoView({ block: "center" }),
  );
};
$("#confirmPay").onclick = () => {
  if (!cart.length) return;
  if (
    activePreorderPaymentId &&
    (paidPreorderOrder(activePreorderPaymentId) ||
      db.preorders.find((p) => p.id === activePreorderPaymentId)?.status ===
        "paid")
  ) {
    cart = [];
    activePreorderPaymentId = null;
    $("#payModal").classList.add("hidden");
    renderCart();
    return;
  }
  ensureDailyOrder();
  let tc = taxCalc(),
    due = tc.grand;
  if (method === "cash" && +received < due)
    return alert(
      db.language === "en" ? "Insufficient payment" : "จำนวนเงินไม่พอ",
    );
  if (method === "qr" && !db.qrImage && !promptPayPayload(db.promptpay, due))
    return alert(
      db.language === "en"
        ? "Set up PromptPay or upload a QR image first"
        : "กรุณาตั้งค่า PromptPay หรือใส่รูป QR ก่อน",
    );
  let now = new Date(),
    taxSnapshot = structuredClone(db.tax || {}),
    paidItems = structuredClone(cart).map((i) => {
      let p = db.products.find((x) => x.id === i.id) || {};
      let isHalf = /half|ครึ่ง/i.test(String(i.variant || ""));
      let fullCost = Math.max(0, Number(p.cost) || 0);
      let halfCost = Math.max(0, Number(p.halfCost) || fullCost / 2);
      return { ...i, unitCost: isHalf ? halfCost : fullCost };
    }),
    o = {
      id: currentOrderNo || nextId(),
      date: now.toISOString(),
      localDate: dateKey(now),
      staff: currentUser.name,
      method,
      total: due,
      subtotal: tc.subtotal,
      taxAmount: tc.tax,
      serviceAmount: tc.service,
      taxSettings: taxSnapshot,
      received: method === "cash" ? +received : due,
      change: method === "cash" ? +received - due : 0,
      status: "paid",
      items: paidItems,
    };
  if (activePreorderPaymentId) {
    o.preorderId = activePreorderPaymentId;
    o.isPreorder = true;
    let pp = db.preorders.find((x) => x.id === activePreorderPaymentId);
    if (pp) {
      pp.orderNo = o.id;
      o.preorderLabel = true;
      o.preorderCustomer = pp.customer || "";
      o.preorderPhone = pp.phone || "";
      o.preorderPickupDate = pp.date || "";
      o.preorderPickupTime = pp.time || "";
    }
  }
  db.orders.push(o);
  if (activePreorderPaymentId) {
    let pp = db.preorders.find((x) => x.id === activePreorderPaymentId);
    if (pp) {
      pp.status = "paid";
      pp.paidAt = new Date().toISOString();
      pp.paymentOrderId = o.id;
    }
    syncPaidPreorders();
    activePreorderPaymentId = null;
    try {
      renderPreorders();
    } catch (e) {}
    try {
      renderHeld();
    } catch (e) {}
    try {
      renderOrders();
    } catch (e) {}
  }
  if (o.isPreorder) window.setHeldDrawerState?.(true);
  currentOrderNo = null;
  o.items.forEach((i) => {
    let p = db.products.find((x) => x.id === i.id);
    if (!p) return;
    let used = itemStockUnits(i);
    p.fullStock = Math.max(0, Number(p.fullStock ?? p.stock ?? 0) - used);
    p.stock = p.fullStock;
    p.halfStock = undefined;
  });
  save();
  cart = [];
  renderCart();
  renderProducts();
  try {
    renderStock();
  } catch (e) {}
  $("#payModal").classList.add("hidden");
  $("#successOrder").textContent = "Order #" + formatOrderNumber(o.id);
  $("#successAmount").textContent = money(o.total);
  $("#successPaid").textContent = money(o.received);
  $("#successChange").textContent = money(o.change);
  $("#successModal").classList.remove("hidden");
  currentSuccessOrderId = o.id;
  let sn = $("#successCustomerNote");
  let noteSaved = $("#successNoteSaved");
  if (noteSaved) {
    noteSaved.textContent = "";
    noteSaved.classList.remove("show");
  }
  if (sn) {
    sn.value = o.customerNote || "";
    sn.onfocus = pauseSuccessCountdown;
    sn.oninput = pauseSuccessCountdown;
  }
  let saveNote = $("#saveSuccessNote");
  if (saveNote)
    saveNote.onclick = () => {
      let oo = db.orders.find((x) => x.id === currentSuccessOrderId),
        status = $("#successNoteSaved");
      if (oo) {
        oo.customerNote = (sn?.value || "").trim();
        save();
        try {
          renderOrders();
        } catch (e) {}
        try {
          renderReports();
        } catch (e) {}
        if (status) {
          status.textContent =
            db.language === "en" ? "✓ Saved successfully" : "✓ บันทึกสำเร็จ";
          status.classList.add("show");
          setTimeout(() => status.classList.remove("show"), 3500);
        }
      }
      resumeSuccessCountdown();
    };
  startSuccessCountdown();
  $("#successPrint").onclick = () => {
    let oo = db.orders.find((x) => x.id === o.id);
    if (oo && sn) {
      oo.customerNote = (sn.value || "").trim();
      save();
    }
    window.openReceiptPreview(o.id);
  };
  $("#successNew").onclick = () => {
    let oo = db.orders.find((x) => x.id === o.id);
    if (oo && sn) {
      oo.customerNote = (sn.value || "").trim();
      save();
    }
    closeSuccessAndReset();
  };
  clickSound(880, 0.18);
  checkLowStockAlerts();
  speakLocalized(
    o.method === "cash"
      ? Math.abs(+o.change) < 0.005
        ? `${o.total} บาท รับเงินมาพอดีค่ะ`
        : `${o.total} บาท เงินทอน ${o.change} บาท`
      : `${o.total} บาท`,
    o.method === "cash"
      ? Math.abs(+o.change) < 0.005
        ? `${o.total} baht. Exact amount received.`
        : `${o.total} baht. Change ${o.change} baht.`
      : `${o.total} baht.`,
    { priority: true },
  );
};
$$("[data-close]").forEach(
  (b) => (b.onclick = () => $("#" + b.dataset.close).classList.add("hidden")),
);
$$("[data-otab]").forEach(
  (b) =>
    (b.onclick = () => {
      currentOrderTab = b.dataset.otab;
      $$("[data-otab]").forEach((x) => x.classList.toggle("active", x === b));
      renderOrderTab();
    }),
);
function renderOrderTab() {
  if (currentOrderTab === "preorder") renderPreorders();
  else {
    currentOrderTab = "history";
    renderOrders();
  }
}
function cancelPaid(id) {
  const o = (db.orders || []).find((x) => String(x.id) === String(id));
  if (!o || o.status === "cancelled") return;
  const en = db.language === "en";
  if (
    !confirm(
      en
        ? `Cancel Order #${formatOrderNumber(o.id)}?`
        : `ยืนยันยกเลิก Order #${formatOrderNumber(o.id)} หรือไม่?`,
    )
  )
    return;
  o.status = "cancelled";
  o.cancelledAt = new Date().toISOString();
  o.cancelReason = en ? "Order cancelled" : "ยกเลิกออเดอร์";
  save();
  renderOrders();
  try {
    renderReports();
  } catch (e) {}
}
function renderOrders() {
  let en = db.language === "en",
    os = [...db.orders].reverse();
  $("#orderTab").innerHTML = `<div class="orderList">${
    os
      .map((o) => {
        let d = new Date(o.date),
          date = d.toLocaleDateString(en ? "en-AU" : "th-TH", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          time = d.toLocaleTimeString(en ? "en-AU" : "th-TH", {
            hour: "2-digit",
            minute: "2-digit",
          });
        return `<details class="orderCard orderDrop"><summary><div class="orderIdentity"><span class="orderNo">#${formatOrderNumber(o.id)}</span>${o.isPreorder || o.preorderId ? `<span class="orderPreBadge"><svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>${en ? "Pre-order" : "รายการจองล่วงหน้า"}</span>${o.preorderCustomer || (db.preorders || []).find((p) => p.id === o.preorderId)?.customer ? `<span class="orderPreCustomer">${en ? "Customer" : "ลูกค้า"}: ${o.preorderCustomer || (db.preorders || []).find((p) => p.id === o.preorderId)?.customer || ""}</span>` : ""}` : ""}<div class="orderMetaChips"><span class="orderMetaChip"><svg viewBox="0 0 24 24"><path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/></svg>${date}</span><span class="orderMetaChip"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${time}</span><span class="orderMetaChip staffChip"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3"/><path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6"/></svg>${o.staff}</span></div></div><div class="orderSummaryRight"><div class="orderTotalBlock"><small>${en ? "Amount due" : "ยอดที่ต้องจ่าย"}</small><strong>${money(o.total)}</strong></div>${o.status === "cancelled" ? "" : iconPayment(o.method)}${o.status === "cancelled" ? `<span class="cancelBadge">${en ? "Cancelled" : "ยกเลิก"}</span>` : ""}<span class="chev">⌄</span></div></summary><div class="orderItems">${o.items.map((i) => `<div><span>${i.qty} × ${i.name}${i.variant ? " · " + i.variant : ""}</span><b>${money(i.qty * i.price)}</b></div>`).join("")}</div>${o.status !== "cancelled" ? `<div class="orderPaymentDetail">${o.method === "cash" ? `<div><span>${en ? "Cash received" : "รับเงินสด"}</span><b>${money(o.received || 0)}</b></div><div><span>${en ? "Change" : "เงินทอน"}</span><b>${money(o.change || 0)}</b></div>` : `<div><span>PromptPay QR</span><b>${money(o.total || 0)}</b></div>`}</div>` : ""}${o.customerNote ? `<div class="orderCustomerNote noteOnly"><b>${o.customerNote}</b></div>` : ""}${o.status === "cancelled" ? `<div class="cancelNotice"><b>${en ? "Cancelled" : "ยกเลิก"}</b><span>${o.cancelReason || (en ? "This order was cancelled" : "ออเดอร์นี้ถูกยกเลิก")}</span></div>` : ""}<div class="actions"><button type="button" onclick="event.preventDefault();event.stopPropagation();openReceiptPreview(${o.id})"><svg><use href="#print"/></svg>${en ? "Receipt" : "ใบเสร็จ"}</button><button class="warm" type="button" onclick="event.preventDefault();event.stopPropagation();openKitchenPreview(${o.id})"><svg><use href="#chef"/></svg>${en ? "Print prep ticket" : "พิมพ์เตรียมอาหาร"}</button>${o.status !== "cancelled" ? `<button class="danger" type="button" onclick="event.preventDefault();event.stopPropagation();cancelPaid(${o.id})">${en ? "Cancel order" : "ยกเลิกออเดอร์"}</button>` : `<span class="cancelBadge cancelBadgeAction">${en ? "Cancelled" : "ยกเลิกแล้ว"}</span>`}</div></details>`;
      })
      .join("") ||
    `<div class="emptyState">${en ? "No orders yet" : "ยังไม่มีออเดอร์"}</div>`
  }</div>`;
}
function renderPreorders() {
  let en = db.language === "en";
  const metaIcon = (type) =>
    type === "date"
      ? `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="3"/><path d="M8 3.5v4M16 3.5v4M3.5 10h17"/></svg>`
      : type === "time"
        ? `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5l3.5 2"/></svg>`
        : type === "user"
          ? `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3"/><path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6"/></svg>`
          : type === "bag"
            ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>`
            : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.8 9.5 7l-1.8 2.2c1.4 2.8 3.3 4.7 6.1 6.1l2.2-1.8 3.2 2.4c.5.4.6 1.1.3 1.7l-1 1.8c-.4.7-1.1 1.1-1.9 1-7-.8-12.2-6-13-13-.1-.8.3-1.5 1-1.9l1.8-1c.6-.3 1.3-.2 1.7.3Z"/></svg>`;
  const today = dateKey(new Date());
  window.preorderViewDate = window.preorderViewDate || today;
  window.preorderViewMode = window.preorderViewMode || "date";
  let viewDate = window.preorderViewDate;
  const isOutstanding = window.preorderViewMode === "outstanding";
  let rows = [...db.preorders]
    .filter((p) =>
      isOutstanding
        ? (p.status || "pending") === "pending"
        : (p.createdLocalDate || p.date) === viewDate,
    )
    .sort((a, b) => (b.createdAt || b.id || 0) - (a.createdAt || a.id || 0));
  const actionIcon = (kind) =>
    kind === "paid"
      ? `<svg viewBox="0 0 24 24"><path d="M4 7h16v11H4zM4 10h16M8 15h3"/></svg>`
      : kind === "done"
        ? `<svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"/></svg>`
        : kind === "edit"
          ? `<svg viewBox="0 0 24 24"><path d="M4 20h4l11-11-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></svg>`
          : `<svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>`;
  $("#orderTab").innerHTML =
    `<div class="pageHead preorderPageHead"><div><h2>${en ? "Pre-orders" : "รายการสั่งล่วงหน้า"}</h2><p>${en ? "Newest bookings appear first · choose a date to view history" : "รายการใหม่จะแสดงบนสุด · เลือกวันเพื่อดูรายการย้อนหลัง"}</p></div><div class="preHeadActions"><label class="preDateFilter"><svg viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="15" rx="3"/><path d="M8 3.5v4M16 3.5v4M3.5 10h17"/></svg><span>${en ? "View date" : "ดูวันที่"}</span><input id="preHistoryDate" type="date" value="${viewDate}"></label><button type="button" id="preToday" class="softBtn ${!isOutstanding ? "active" : ""}">${en ? "Today" : "วันนี้"}</button><button type="button" id="preOutstanding" class="softBtn preOutstandingBtn ${isOutstanding ? "active" : ""}">${en ? "Outstanding" : "ค้างชำระ"} <span>${db.preorders.filter((p) => (p.status || "pending") === "pending").length}</span></button><button type="button" id="newPre" class="primary"><svg><use href="#calendar"/></svg>${en ? "New pre-order" : "สร้างออเดอร์ล่วงหน้า"}</button></div></div><div class="preHistoryBar"><span>${metaIcon("date")}</span><div><small>${isOutstanding ? (en ? "Unpaid pre-orders from all dates" : "รายการค้างชำระจากทุกวัน") : en ? "Showing bookings created on" : "กำลังแสดงรายการที่สร้างวันที่"}</small><b>${isOutstanding ? (en ? "All dates" : "ทุกวัน") : viewDate}</b></div><strong>${rows.length} ${en ? "bookings" : "รายการ"}</strong></div><div class="orderList preorderList">${
      rows
        .map((p) => {
          let qty = p.items.reduce((n, i) => n + (i.qty || 0), 0),
            sum = p.items.reduce(
              (n, i) => n + (i.price || 0) * (i.qty || 0),
              0,
            ),
            seq = p.preNo || 1,
            status = p.status || "pending",
            orderNo =
              p.orderNo ||
              (db.held || []).find((h) => h.preorderId === p.id)?.orderNo ||
              p.paymentOrderId ||
              null;
          let statusText =
            status === "completed"
              ? en
                ? "Completed"
                : "สำเร็จ"
              : status === "cancelled"
                ? en
                  ? "Cancelled"
                  : "ยกเลิก"
                : status === "paid"
                  ? en
                    ? "Paid · waiting pickup"
                    : "ชำระแล้ว · รอรับสินค้า"
                  : en
                    ? "Pre-order"
                    : "จองล่วงหน้า";
          return `<details class="orderCard orderDrop preorderCard preStatus-${status}"><summary><div class="preSummaryMain"><div class="preCustomerLine"><span class="preDailyNo">${orderNo ? "Order #" + formatOrderNumber(orderNo) : "#P" + formatOrderNumber(seq)}</span><h3>${p.customer}</h3><span class="preBadge statusBadge-${status}">${statusText}</span></div><div class="preMeta"><span>${metaIcon("date")}<small>${en ? "Pickup date" : "วันที่รับ"}</small><b>${p.date}</b></span><span>${metaIcon("time")}<small>${en ? "Time" : "เวลา"}</small><b>${p.time}</b></span>${p.phone ? `<span>${metaIcon("phone")}<small>${en ? "Phone" : "เบอร์โทร"}</small><b><a class="prePhoneLink" href="tel:${String(p.phone).replace(/[^+\d]/g, "")}" onclick="event.stopPropagation()">${p.phone}</a></b></span>` : ""}<span>${metaIcon("user")}<small>${en ? "Customer" : "ลูกค้า"}</small><b>${p.customer || "-"}</b></span><span>${metaIcon("bag")}<small>${en ? "Items" : "จำนวนสินค้า"}</small><b>${qty} ${en ? "items" : "ชิ้น"}</b></span></div></div><div class="preQuickActions" onclick="event.stopPropagation()">${status === "completed" ? `<button class="preStateButton completed" disabled>${actionIcon("done")}<span>${en ? "Completed" : "สำเร็จ"}</span></button>` : status === "cancelled" ? `<button class="preStateButton cancelled" disabled>${actionIcon("cancel")}<span>${en ? "Cancelled" : "ยกเลิก"}</span></button>` : status === "paid" ? `<button class="preStateButton paidDone" disabled>${actionIcon("paid")}<span>${en ? "Paid" : "ชำระแล้ว"}</span></button>` : `<button class="preIconAction edit" onclick="editPreorder(${p.id})" title="${en ? "Edit" : "แก้ไข"}">${actionIcon("edit")}<span>${en ? "Edit" : "แก้ไข"}</span></button><button class="preIconAction paid" onclick="setPrePaid(${p.id})" title="${en ? "Pay" : "ชำระ"}">${actionIcon("paid")}<span>${en ? "Pay" : "ชำระ"}</span></button><button class="preIconAction cancel" onclick="cancelPre(${p.id})" title="${en ? "Cancel" : "ยกเลิก"}">${actionIcon("cancel")}<span>${en ? "Cancel" : "ยกเลิก"}</span></button>`}</div></summary><div class="preOrderHead"><span>${en ? "Item" : "เมนู"}</span><span>${en ? "Price" : "ราคา"}</span><span>${en ? "Qty" : "จำนวน"}</span><span>${en ? "Subtotal" : "รวม"}</span></div><div class="orderItems preOrderItems">${p.items.map((i) => `<div><span>${i.name} ${i.variant || ""}</span><b>${money(i.price)}</b><strong>${i.qty}</strong><em>${money(i.price * i.qty)}</em></div>`).join("")}</div>${p.note ? `<div class="note"><b>${en ? "Note" : "หมายเหตุ"}</b><span>${p.note}</span></div>` : ""}<div class="preOrderFooter"><div class="preFooterCount">${metaIcon("bag")}<span><small>${en ? "Total items" : "จำนวนสินค้าทั้งหมด"}</small><b>${qty} ${en ? "items" : "ชิ้น"}</b></span></div><div class="preFooterTotal"><small>${en ? "Grand total" : "ยอดรวมทั้งหมด"}</small><strong>${money(sum)}</strong></div></div><div class="actions"><button class="warm" type="button" onclick="event.preventDefault();event.stopPropagation();openPreorderPreview(${p.id})"><svg><use href="#print"/></svg>${en ? "Print prep ticket" : "พิมพ์เตรียมอาหาร"}</button></div></details>`;
        })
        .join("") ||
      `<div class="emptyState">${en ? "No pre-orders for this date" : "ไม่มีรายการสั่งล่วงหน้าในวันที่เลือก"}</div>`
    }</div>`;
  $("#newPre").onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openPreorder();
  };
  $("#preHistoryDate").onchange = (e) => {
    window.preorderViewMode = "date";
    window.preorderViewDate = e.target.value || today;
    renderPreorders();
  };
  $("#preToday").onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.preorderViewMode === "date" && window.preorderViewDate === today)
      return;
    window.preorderViewMode = "date";
    window.preorderViewDate = today;
    renderPreorders();
  };
  $("#preOutstanding").onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.preorderViewMode === "outstanding") {
      window.preorderViewMode = "date";
      window.preorderViewDate = today;
    } else {
      window.preorderViewMode = "outstanding";
    }
    renderPreorders();
  };
}
let activePreorderPaymentId = null;
function preConfirm(kind, p, onYes) {
  const en = db.language === "en",
    isDone = kind === "complete";
  const qty = (p.items || []).reduce((n, i) => n + (i.qty || 0), 0),
    sum = (p.items || []).reduce(
      (n, i) => n + (i.price || 0) * (i.qty || 0),
      0,
    );
  let m = document.getElementById("preActionConfirm");
  if (m) m.remove();
  m = document.createElement("div");
  m.id = "preActionConfirm";
  m.className = "modal preActionConfirm";
  m.innerHTML = `<div class="modalBox preConfirmBox"><button class="close preConfirmX" type="button">×</button><div class="preConfirmIcon ${isDone ? "ok" : "bad"}">${isDone ? "✓" : "×"}</div><h2>${isDone ? (en ? "Confirm completion?" : "ยืนยันทำรายการสำเร็จ?") : en ? "Confirm cancellation?" : "ยืนยันยกเลิกรายการ?"}</h2><p>${isDone ? (en ? "Has the customer received all items?" : "รายการนี้ไปรับสินค้าแล้วหรือไม่?") : en ? "Do you want to cancel this pre-order?" : "ต้องการยกเลิกรายการนี้ใช่ไหม?"}</p><div class="preConfirmInfo"><b>#P${formatOrderNumber(p.preNo || 1)} - ${escapeHtml(p.customer || "-")}</b><span>${en ? "Pickup" : "วันที่"} ${p.date} · ${p.time}</span><span>${en ? "Items" : "จำนวน"} ${qty} ${en ? "items" : "ชิ้น"} &nbsp; ${en ? "Total" : "ยอดรวม"} ${money(sum)}</span></div><div class="preConfirmActions"><button class="warm preNo">${en ? "Back" : "ยกเลิก"}</button><button class="${isDone ? "preYesDone" : "preYesCancel"}">${isDone ? (en ? "Confirm" : "ยืนยัน") : en ? "Confirm cancel" : "ยืนยันยกเลิก"}</button></div></div>`;
  document.body.appendChild(m);
  const close = () => m.remove();
  m.querySelector(".preConfirmX").onclick = close;
  m.querySelector(".preNo").onclick = close;
  m.onclick = (e) => {
    if (e.target === m) close();
  };
  m.querySelector(isDone ? ".preYesDone" : ".preYesCancel").onclick = () => {
    close();
    onYes();
  };
}
window.setPrePaid = (id) => {
  let p = db.preorders.find((x) => x.id === id);
  if (
    !p ||
    p.status === "completed" ||
    p.status === "cancelled" ||
    p.status === "paid"
  )
    return;
  if (paidPreorderOrder(id)) {
    renderHeld();
    renderPreorders();
    return;
  }
  const heldIndex = db.held.findIndex((h) => h.preorderId === id);
  if (heldIndex >= 0) {
    window.resumeHeld(heldIndex);
  } else {
    activePreorderPaymentId = id;
    cart = structuredClone(p.items || []);
    currentOrderNo = p.orderNo || nextId();
  }
  renderCart();
  renderProducts();
  go("sell");
  requestAnimationFrame(() =>
    window.scrollTo({ top: 0, left: 0, behavior: "instant" }),
  );
  $("#salePulse").textContent =
    (db.language === "en" ? "Pre-order payment · " : "ชำระออเดอร์ล่วงหน้า · ") +
    (p.customer || "");
};
window.completePre = (id) => {
  let p = db.preorders.find((x) => x.id === id);
  if (!p || p.status === "completed" || p.status === "cancelled") return;
  preConfirm("complete", p, () => {
    p.status = "completed";
    p.completedAt = new Date().toISOString();
    db.held = (db.held || []).filter((h) => h.preorderId !== id);
    save();
    renderPreorders();
    renderHeld();
    speakLocalized("รายการสำเร็จแล้วค่ะ", "Order completed.", {
      priority: true,
    });
  });
};
window.cancelPre = (id) => {
  let p = db.preorders.find((x) => x.id === id);
  if (!p || p.status === "completed" || p.status === "cancelled") return;
  preConfirm("cancel", p, () => {
    p.status = "cancelled";
    p.cancelledAt = new Date().toISOString();
    db.held = (db.held || []).filter((h) => h.preorderId !== id);
    save();
    renderPreorders();
    renderHeld();
    speakLocalized("ยกเลิกรายการค่ะ", "Order cancelled.", { priority: true });
  });
};
let editingPreorderId = null;
let lockedScrollY = 0;
function openOverlays() {
  return [
    ...document.querySelectorAll(
      ".modal:not(.hidden), .reportPaymentOverlay, #docPreview630, #heldDrawer.open, .kModalOverlay, #qrFull:not(.hidden)",
    ),
  ];
}
function hasOpenOverlay() {
  return openOverlays().length > 0;
}
function updatePageLock() {
  const shouldLock = hasOpenOverlay();
  if (shouldLock && !document.body.classList.contains("page-locked")) {
    lockedScrollY = window.scrollY || 0;
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.classList.add("page-locked");
    document.documentElement.classList.add("page-locked");
  } else if (!shouldLock && document.body.classList.contains("page-locked")) {
    document.body.classList.remove("page-locked");
    document.documentElement.classList.remove("page-locked");
    document.body.style.top = "";
    window.scrollTo(0, lockedScrollY);
  }
}
function syncModalScrollLock() {
  updatePageLock();
}

function overlayScrollContainer(target) {
  const overlays = openOverlays();
  const top = overlays
    .map((el, index) => ({
      el,
      index,
      z: Number.parseInt(getComputedStyle(el).zIndex, 10) || 0,
    }))
    .sort((a, b) => a.z - b.z || a.index - b.index)
    .at(-1)?.el;
  if (top && !top.contains(target)) return null;
  return target.closest(
    ".reportPaymentRows,#docPreview630 main,#heldDrawer.open,.kModalOverlay,.modal:not(.hidden),#qrFull:not(.hidden)",
  );
}
document.addEventListener(
  "wheel",
  (e) => {
    if (!hasOpenOverlay()) return;
    const sc = overlayScrollContainer(e.target);
    if (!sc) e.preventDefault();
  },
  { passive: false, capture: true },
);
document.addEventListener(
  "touchmove",
  (e) => {
    if (!hasOpenOverlay()) return;
    const sc = overlayScrollContainer(e.target);
    if (!sc) e.preventDefault();
  },
  { passive: false, capture: true },
);

function openPreorder(existing = null) {
  editingPreorderId = existing?.id || null;
  preCart = structuredClone(existing?.items || []);
  $("#preName").value = existing?.customer || "";
  $("#prePhone").value = existing?.phone || "";
  $("#preDate").value = existing?.date || dateKey(new Date());
  $("#preTime").value = existing?.time || "10:00";
  $("#preNote").value = existing?.note || "";
  renderPreProducts();
  $("#preorderModal").classList.remove("hidden");
  syncModalScrollLock();
}
window.editPreorder = (id) => {
  const p = db.preorders.find((x) => x.id === id);
  if (!p || ["paid", "completed", "cancelled"].includes(p.status)) return;
  openPreorder(p);
};
function renderPreProducts() {
  const en = db.language === "en";
  const options = [];
  db.products
    .filter((p) => p.enabled !== false)
    .forEach((p) => {
      options.push({
        key: p.id + "|full",
        id: p.id,
        name: p.name,
        variant: en ? "Full loaf" : "เต็มโลฟ",
        price: p.price,
        img: p.img,
        kind: "full",
        stock: availableStock(p, "full"),
        unit: 1,
      });
      if (p.half != null)
        options.push({
          key: p.id + "|half",
          id: p.id,
          name: p.name,
          variant: en ? "Half loaf" : "ครึ่งโลฟ",
          price: p.half,
          img: p.halfImg || p.img,
          kind: "half",
          stock: availableStock(p, "half"),
          unit: 0.5,
        });
    });
  let selectedQty = preCart.reduce((a, i) => a + i.qty, 0),
    selectedTotal = preCart.reduce((a, i) => a + i.qty * i.price, 0);
  let selectedRows = preCart.length
    ? preCart
        .map(
          (i) =>
            `<div class="preSelectedRow"><span><b>${i.name}</b><small>${i.variant || ""} × ${i.qty}</small></span><strong>${money(i.price * i.qty)}</strong></div>`,
        )
        .join("")
    : `<div class="preSelectedEmpty">${en ? "No items selected yet" : "ยังไม่ได้เลือกเมนู"}</div>`;
  $("#preProducts").innerHTML =
    `<div class="prePickerShell"><div class="prePickerIntro"><div><b>${en ? "Choose items" : "เลือกเมนู"}</b><span>${en ? "Stock shown here follows the Stock page. Half loaf uses 0.5." : "เต็มโลฟและครึ่งโลฟแยกสต๊อกกัน"}</span></div></div><div class="preMenuGrid">${options
      .map((o) => {
        let x = preCart.find((i) => i.key === o.key),
          qty = x ? x.qty : 0,
          remain = Math.max(0, o.stock - qty * o.unit);
        return `<button type="button" class="preMenuCard ${qty ? "selected" : ""} ${remain <= 0 ? "soldOut" : ""}" data-key="${o.key}" ><span class="preMenuName">${o.name}</span><small class="preVariantLabel">${o.variant}</small><span class="preMenuPrice">${money(o.price)}</span><small>${en ? "Remaining" : "คงเหลือ"} ${remain}</small>${qty ? `<span class="preMenuBadge">${qty}</span><span class="preMenuMinus" data-minus="1">−</span>` : ""}</button>`;
      })
      .join(
        "",
      )}</div><aside class="preSelectionPanel"><div class="preSelectionHead"><div><small>${en ? "CURRENT SELECTION" : "รายการที่เลือก"}</small><b>${selectedQty} ${en ? "items" : "ชิ้น"}</b></div><span class="preSelectionCount">${selectedQty}</span></div><div class="preSelectedRows">${selectedRows}</div><div class="preSelectionTotal"><span>${en ? "Total" : "รวมทั้งหมด"}</span><strong>${money(selectedTotal)}</strong></div></aside></div>`;
  $$("#preProducts .preMenuCard").forEach(
    (card) =>
      (card.onclick = (e) => {
        let o = options.find((x) => x.key === card.dataset.key);
        if (!o) return;
        let x = preCart.find((x) => x.key === o.key);
        if (e.target.closest("[data-minus]")) {
          e.stopPropagation();
          if (x) {
            x.qty--;
            if (x.qty <= 0) preCart = preCart.filter((i) => i !== x);
          }
        } else {
          if (x) x.qty++;
          else
            preCart.push({
              key: o.key,
              id: o.id,
              name: o.name,
              variant: o.variant,
              price: o.price,
              qty: 1,
            });
        }
        clickSound(520, 0.045);
        renderPreProducts();
      }),
  );
}

$("#preorderForm").onsubmit = (e) => {
  e.preventDefault();
  if (!preCart.length)
    return alert(
      db.language === "en"
        ? "Please choose at least one item"
        : "กรุณาเลือกเมนู",
    );
  // Pre-orders may be saved even when stock is low; stock is counted as usual and checked at sale time.
  let now = new Date(),
    pre,
    preOrderNo;
  if (editingPreorderId) {
    pre = db.preorders.find((x) => x.id === editingPreorderId);
    if (!pre || ["paid", "completed", "cancelled"].includes(pre.status)) {
      editingPreorderId = null;
      return alert(
        db.language === "en"
          ? "This pre-order can no longer be edited."
          : "รายการนี้ชำระเงินหรือปิดรายการแล้ว ไม่สามารถแก้ไขได้",
      );
    }
    Object.assign(pre, {
      customer: $("#preName").value,
      phone: $("#prePhone").value,
      date: $("#preDate").value,
      time: $("#preTime").value,
      note: $("#preNote").value,
      items: structuredClone(preCart),
      updatedAt: Date.now(),
    });
    const held = (db.held || []).find((h) => h.preorderId === pre.id);
    if (held)
      Object.assign(held, {
        items: structuredClone(pre.items),
        customer: pre.customer,
        phone: pre.phone,
        pickupDate: pre.date,
        pickupTime: pre.time,
        note: pre.note,
      });
    preOrderNo = held?.orderNo || pre.preNo;
    window.preorderViewDate = pre.createdLocalDate || dateKey(now);
  } else {
    const createdLocalDate = dateKey(now),
      dailyPreNo =
        db.preorders.filter(
          (x) => (x.createdLocalDate || "") === createdLocalDate,
        ).length + 1;
    preOrderNo = nextId();
    pre = {
      id: Date.now(),
      createdAt: Date.now(),
      createdLocalDate,
      preNo: dailyPreNo,
      orderNo: preOrderNo,
      customer: $("#preName").value,
      phone: $("#prePhone").value,
      date: $("#preDate").value,
      time: $("#preTime").value,
      note: $("#preNote").value,
      items: structuredClone(preCart),
    };
    window.preorderViewMode = "date";
    window.preorderViewDate = createdLocalDate;
    db.preorders.push(pre);
    db.held.push({
      id: Date.now() + 1,
      orderNo: preOrderNo,
      time: now.toISOString(),
      localDate: dateKey(now),
      items: structuredClone(preCart),
      staff: currentUser?.name || "",
      isPreorder: true,
      preorderId: pre.id,
      customer: pre.customer,
      phone: pre.phone,
      pickupDate: pre.date,
      pickupTime: pre.time,
      note: pre.note,
      isNewPreorder: true,
    });
  }
  save();
  $("#preorderModal").classList.add("hidden");
  renderPreorders();
  renderHeld();
  clickSound(760, 0.12);
  const wasEdit = !!editingPreorderId;
  editingPreorderId = null;
  speakLocalized(
    wasEdit ? "แก้ไขรายการสั่งล่วงหน้าแล้วค่ะ" : "มีรายการสั่งล่วงหน้าใหม่",
    wasEdit ? "Pre-order updated." : "A new pre-order has been added.",
  );
  $("#salePulse").textContent = wasEdit
    ? db.language === "en"
      ? "Pre-order updated"
      : "แก้ไขรายการสั่งล่วงหน้าแล้ว"
    : (db.language === "en"
        ? "Pre-order added to Held Orders · Order #"
        : "เพิ่มรายการสั่งล่วงหน้าไปที่พักออเดอร์ · Order #") +
      formatOrderNumber(preOrderNo);
  window.setHeldDrawerState?.(true);
};
window.deletePre = (id) => {
  db.preorders = db.preorders.filter((x) => x.id !== id);
  save();
  renderPreorders();
};
function renderKitchen() {
  let en = db.language === "en",
    active = db.orders
      .filter((o) => o.status === "paid")
      .slice(-20)
      .reverse();
  $("#orderTab").innerHTML =
    `<div class="kitchenGrid"><div><h2>${en ? "Orders to prepare" : "รายการที่ต้องเตรียม"}</h2>${active.map((o) => `<details class="kitchenDrop"><summary><b>Order #${formatOrderNumber(o.id)}</b><span>${o.items.reduce((a, i) => a + i.qty, 0)} ${en ? "items" : "ชิ้น"} ⌄</span></summary><div class="kitchenInner">${o.items.map((i) => `<div><b>${i.qty} × ${i.name}</b><span>${i.variant || ""}</span></div>`).join("")}<button class="warm" type="button" onclick="event.preventDefault();event.stopPropagation();openKitchenPreview(${o.id})"><svg><use href="#print"/></svg>${en ? "Print prep ticket" : "พิมพ์ใบเตรียม"}</button></div></details>`).join("") || `<div class="emptyState">${en ? "Nothing to prepare" : "ไม่มีรายการ"}</div>`}</div><div><h2>${en ? "Ingredients / prep notes" : "ข้อมูลวัตถุดิบ / การเตรียม"}</h2>${db.categories
      .map(
        (c) =>
          `<section class="ingredientGroup"><h3>${c.name}</h3>${db.products
            .filter((p) => p.cat === c.id)
            .map(
              (p) =>
                `<div><b>${p.name}</b><span>${p.prep || p.desc || (en ? "Not specified" : "ยังไม่ได้ระบุ")}</span></div>`,
            )
            .join("")}</section>`,
      )
      .join("")}</div></div>`;
}
function statsFor(k) {
  const dayOrders = db.orders.filter(
    (o) => (o.localDate || dateKey(o.date)) === k,
  );
  const paid = dayOrders.filter(
    (o) =>
      o.status !== "cancelled" &&
      (o.status === "paid" || o.method === "cash" || o.method === "qr"),
  );
  const cancelled = dayOrders.filter((o) => o.status === "cancelled").length;
  const sales = paid.reduce((sum, o) => sum + (+o.total || 0), 0);
  const cash = paid
    .filter((o) => o.method === "cash")
    .reduce((sum, o) => sum + (+o.total || 0), 0);
  const qr = paid
    .filter((o) => o.method === "qr")
    .reduce((sum, o) => sum + (+o.total || 0), 0);
  const cost = paid.reduce(
    (sum, o) =>
      sum +
      (o.items || []).reduce((sub, i) => {
        const product =
          db.products.find((p) => p.id === i.id) ||
          db.products.find((p) => p.name === i.name) ||
          {};
        const variant = String(i.variant || "").toLowerCase();
        const isHalf = variant.includes("ครึ่ง") || variant.includes("half");
        // New orders store unitCost at payment time. Older orders safely fall back to the current product cost.
        const savedCost = Number(i.unitCost);
        const fullCost = Math.max(0, Number(product.cost) || 0);
        const halfCost = Math.max(0, Number(product.halfCost) || fullCost / 2);
        const unitCost = Number.isFinite(savedCost)
          ? Math.max(0, savedCost)
          : isHalf
            ? halfCost
            : fullCost;
        return sub + unitCost * Math.max(0, Number(i.qty) || 0);
      }, 0),
    0,
  );
  const safeCost = Number.isFinite(cost) ? Math.max(0, cost) : 0;
  const profit = sales - safeCost;
  return {
    paid,
    cancelled,
    sales,
    cash,
    qr,
    cost: safeCost,
    profit: Number.isFinite(profit) ? profit : 0,
  };
}
function statHtml(s) {
  let en = db.language === "en";
  return `<div><span>${en ? "Total sales" : "ยอดขายรวม"}</span><b>${money(s.sales)}</b></div><div><span>${en ? "Cash" : "เงินสด"}</span><b>${money(s.cash)}</b></div><div><span>QR</span><b>${money(s.qr)}</b></div><div><span>${en ? "Completed orders" : "ออเดอร์สำเร็จ"}</span><b>${s.paid.length} ${en ? "orders" : "ออเดอร์"}</b></div><div><span>${en ? "Cost" : "ต้นทุน"}</span><b>${money(s.cost)}</b></div><div><span>${en ? "Estimated profit" : "กำไรโดยประมาณ"}</span><b>${money(s.profit)}</b></div><div><span>${en ? "Cancelled" : "ยกเลิก"}</span><b>${s.cancelled} ${en ? "orders" : "ออเดอร์"}</b></div>`;
}
function todayDashboard(s) {
  let en = db.language === "en";
  const cost = Math.max(0, Number(s.cost) || 0);
  const profit = Number(s.profit) || 0;
  const positiveProfit = Math.max(0, profit);
  const total = Math.max(1, cost + positiveProfit);
  let costPct = (cost / total) * 100,
    profitPct = (positiveProfit / total) * 100;
  // Keep both real, non-zero values visible instead of letting a very small side disappear.
  if (cost > 0 && positiveProfit > 0) {
    const minVisible = 4;
    if (costPct < minVisible) {
      costPct = minVisible;
      profitPct = 100 - minVisible;
    } else if (profitPct < minVisible) {
      profitPct = minVisible;
      costPct = 100 - minVisible;
    }
  }
  const profitWins = profit >= cost;
  const hasCost = cost > 0;
  // Keep a visible red cost segment whenever there are sales, even before
  // product costs have been configured. The numeric labels remain truthful.
  const costTrackPct = cost > 0 ? costPct : s.sales > 0 ? 8 : 0;
  const profitTrackPct = cost > 0 ? profitPct : s.sales > 0 ? 92 : 0;
  const costHint =
    !hasCost && s.sales > 0
      ? `<small class="reportCostHint">${en ? "Set product cost to show the cost share" : "ตั้งค่าต้นทุนสินค้าเพื่อแสดงสัดส่วนต้นทุน"}</small>`
      : "";
  return `<div class="reportHero"><div><span class="reportEyebrow">${en ? "TODAY AT A GLANCE" : "ภาพรวมวันนี้"}</span><h3>${money(s.sales)}</h3><p>${en ? "Total sales today" : "ยอดขายรวมของวันนี้"}</p></div><div class="reportOrderPill"><svg><use href="#ordersIcon"/></svg><b>${s.paid.length}</b><span>${en ? "completed" : "สำเร็จ"}</span></div></div><div class="reportMiniGrid"><button type="button" class="metricMotion reportPayDrill" data-pay-detail="cash"><svg><use href="#wallet"/></svg><span>${en ? "Cash" : "เงินสด"}</span><b>${money(s.cash)}</b><small>${en ? "View payments" : "ดูรายการ"}</small></button><button type="button" class="metricMotion delay1 reportPayDrill" data-pay-detail="qr"><svg><use href="#qr"/></svg><span>PromptPay QR</span><b>${money(s.qr)}</b><small>${en ? "View payments" : "ดูรายการ"}</small></button><div class="metricMotion delay2"><svg><use href="#cancelDoc"/></svg><span>${en ? "Cancelled" : "ยกเลิก"}</span><b>${s.cancelled}</b></div></div><div class="profitCard splitProfitCard"><div class="profitHead"><div><span>${en ? "PROFIT & COST" : "กำไรและต้นทุน"}</span><h3>${en ? "Today’s balance" : "สมดุลของวันนี้"}</h3></div><span class="profitMood ${profitWins ? "good" : "warn"}">${profitWins ? (en ? "Profit leads" : "กำไรมากกว่า") : en ? "Cost leads" : "ต้นทุนมากกว่า"}</span></div><div class="splitLabels"><div class="${profitWins ? "loser" : "winner"}"><b>${en ? "Cost" : "ต้นทุน"}</b><strong>${money(cost)}</strong><em>${costPct.toFixed(1)}%</em></div><div class="${profitWins ? "winner" : "loser"} right"><b>${en ? "Profit" : "กำไร"}</b><strong>${money(profit)}</strong><em>${profitPct.toFixed(1)}%</em></div></div><div class="splitTrack"><i class="costSide ${profitWins ? "low" : "high"}" style="width:${costTrackPct}%"></i><i class="profitSide ${profitWins ? "high" : "low"}" style="width:${profitTrackPct}%"></i><span class="splitCenter"></span></div>${costHint}</div>`;
}
function showReportPaymentDetails(method, key) {
  const en = db.language === "en",
    s = statsFor(key),
    rows = s.paid
      .filter((o) => o.method === method)
      .sort(
        (a, b) =>
          new Date(b.date || 0) - new Date(a.date || 0) ||
          (+b.id || 0) - (+a.id || 0),
      ),
    esc = (s) =>
      String(s ?? "").replace(
        /[&<>"']/g,
        (c) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[c],
      );
  document.getElementById("reportPaymentDetail")?.remove();
  const total = rows.reduce((n, o) => n + (+o.total || 0), 0),
    wrap = document.createElement("div");
  wrap.id = "reportPaymentDetail";
  wrap.className = "reportPaymentOverlay";
  wrap.innerHTML = `<section class="reportPaymentDialog"><header><div><small>${method === "cash" ? (en ? "CASH PAYMENTS" : "รายการเงินสด") : "PROMPTPAY QR"}</small><h2>${key}</h2></div><button type="button" data-close-paydetail>×</button></header><div class="reportPaymentTotal"><div><span>${en ? "Total" : "รวม"}</span> <b>${money(total)}</b></div><small>${rows.length} ${en ? "orders" : "ออเดอร์"}</small></div><div class="reportPaymentRows">${rows.length ? rows.map((o) => `<article class="reportPaymentItem"><div class="reportPayTop"><div><b>Order #${formatOrderNumber(o.id)}</b><small>${new Date(o.date).toLocaleTimeString(en ? "en-AU" : "th-TH", { hour: "2-digit", minute: "2-digit" })} · ${esc(o.staff || "-")}</small></div><strong>${money(o.total)}</strong></div>${method === "cash" ? `<div class="cashDetailGrid"><div><span>${en ? "Cash received" : "รับเงินสด"}</span><b>${money(o.received || 0)}</b></div><div><span>${en ? "Change" : "เงินทอน"}</span><b>${money(o.change || 0)}</b></div></div>` : ""}<div class="reportPayNote"><span>${en ? "Note" : "หมายเหตุ"}</span><b>${esc(o.customerNote || "-")}</b></div></article>`).join("") : `<div class="reportPaymentEmpty">${en ? "No payments" : "ยังไม่มีรายการชำระเงิน"}</div>`}</div></section>`;
  document.body.appendChild(wrap);
  updatePageLock();
  const close = () => {
    wrap.remove();
    updatePageLock();
  };
  wrap.querySelector("[data-close-paydetail]").onclick = close;
  wrap.onclick = (e) => {
    if (e.target === wrap) close();
  };
}
function bindReportPaymentDetails() {
  document
    .querySelectorAll("[data-pay-detail]")
    .forEach(
      (b) =>
        (b.onclick = () =>
          showReportPaymentDetails(b.dataset.payDetail, dateKey(new Date()))),
    );
}
function renderReports() {
  let today = dateKey(new Date()),
    s = statsFor(today);
  $("#todayStats").className = "todayDashboard";
  $("#todayStats").innerHTML = todayDashboard(s);
  if (!$("#reportDate").value) $("#reportDate").value = today;
  renderPast();
  bindReportPaymentDetails();
}
function renderPast() {
  let key = $("#reportDate").value,
    s = statsFor(key);
  $("#pastStats").className = "stats";
  $("#pastStats").innerHTML = statHtml(s);
  let rows = {};
  s.paid.forEach((o) =>
    o.items.forEach((i) => {
      let k = i.id + "|" + i.variant;
      if (!rows[k])
        rows[k] = {
          id: i.id,
          name: i.name + (i.variant ? " · " + i.variant : ""),
          qty: 0,
          total: 0,
          cash: 0,
          qr: 0,
        };
      rows[k].qty += i.qty;
      rows[k].total += i.qty * i.price;
      rows[k][o.method] += i.qty * i.price;
    }),
  );
  let en = db.language === "en",
    ranked = Object.values(rows).sort(
      (a, b) => b.qty - a.qty || b.total - a.total,
    ),
    maxQty = Math.max(1, ...ranked.map((r) => r.qty)),
    totalQty = ranked.reduce((n, r) => n + r.qty, 0);
  let ranking = ranked.length
    ? `<section class="bestSellerPanel"><div class="bestSellerHead"><div class="bestSellerIcon"><svg viewBox="0 0 24 24"><path d="M4 8l4 3 4-6 4 6 4-3-2 10H6L4 8Z"/></svg></div><div><span>${en ? "PRODUCT RANKING" : "อันดับสินค้า"}</span><h3>${en ? "Best-selling products" : "สินค้าที่ขายดีที่สุด"}</h3><p>${en ? "Ranked from highest to lowest quantity sold" : "เรียงจากจำนวนที่ขายได้มากที่สุดไปน้อยที่สุด"}</p></div><div class="rankTotal"><small>${en ? "Items sold" : "ขายทั้งหมด"}</small><b>${totalQty}</b></div></div><div class="bestSellerTable"><div class="bestSellerRow bestSellerTH"><span>#</span><span>${en ? "Product" : "สินค้า"}</span><span>${en ? "Qty sold" : "จำนวนที่ขาย"}</span><span>${en ? "Sales" : "ยอดขาย"}</span><span>${en ? "Share" : "สัดส่วน"}</span></div>${ranked
        .map((r, i) => {
          let prod = db.products.find((p) => p.id === r.id),
            pct = totalQty ? (r.qty / totalQty) * 100 : 0,
            currentStock = prod ? Number(prod.fullStock ?? prod.stock ?? 0) : 0;
          return `<div class="bestSellerRow"><span class="rankNo ${i < 3 ? "top" : ""}">${i + 1}</span><span class="rankProduct">${prod?.img ? `<img src="${prod.img}" alt="">` : ""}<span><b>${r.name}</b><small>${en ? "Stock now" : "คงเหลือตอนนี้"} ${Number.isInteger(currentStock) ? currentStock : currentStock.toFixed(1)}</small></span></span><strong>${r.qty}</strong><b>${money(r.total)}</b><span class="rankShare"><i><em style="width:${(r.qty / maxQty) * 100}%"></em></i><small>${pct.toFixed(1)}%</small></span></div>`;
        })
        .join(
          "",
        )}</div><div class="rankHighlights"><div><span class="rankArrow up">↗</span><small>${en ? "Top seller" : "ขายดีที่สุด"}</small><b>${ranked[0].name}</b><em>${ranked[0].qty} ${en ? "items" : "ชิ้น"} · ${((ranked[0].qty / totalQty) * 100).toFixed(1)}%</em></div>${ranked.length > 1 ? `<div><span class="rankArrow down">↘</span><small>${en ? "Lowest seller" : "ขายน้อยที่สุด"}</small><b>${ranked[ranked.length - 1].name}</b><em>${ranked[ranked.length - 1].qty} ${en ? "items" : "ชิ้น"} · ${((ranked[ranked.length - 1].qty / totalQty) * 100).toFixed(1)}%</em></div>` : ""}</div></section>`
    : `<div class="emptyState">${en ? "No product sales for this date" : "ยังไม่มียอดขายสินค้าในวันที่เลือก"}</div>`;
  $("#productSales").innerHTML = ranking;
}
$("#reportDate").onchange = renderPast;
let selectedStock = new Set();
let stockFilter = "all";
function visibleStockProducts() {
  return db.products.filter(
    (p) => stockFilter === "all" || p.cat === stockFilter,
  );
}
function renderStock() {
  const en = db.language === "en";
  if (stockFilter !== "all" && !db.categories.some((c) => c.id === stockFilter))
    stockFilter = "all";
  selectedStock = new Set(
    [...selectedStock].filter((id) => db.products.some((p) => p.id === id)),
  );
  const products = visibleStockProducts();
  $("#stockCategoryJump").innerHTML =
    `<option value="all">${en ? "All categories" : "ทุกหมวดหมู่"}</option>` +
    db.categories
      .map(
        (c) =>
          `<option value="${escapeHtml(c.id)}">${escapeHtml(c.name)}</option>`,
      )
      .join("");
  $("#stockCategoryJump").value = stockFilter;
  $("#stockList").innerHTML =
    `<section class="stockTableCard"><div class="stockTableHead"><span>${en ? "Product" : "สินค้า"}</span><span>${en ? "Category" : "หมวดหมู่"}</span><span>${en ? "Price" : "ราคา"}</span><span>${en ? "Stock" : "สต๊อก"}</span><span>${en ? "Status" : "สถานะ"}</span></div>${
      products
        .map((p, i) => {
          const amount = Number(p.fullStock ?? p.stock ?? 0),
            selected = selectedStock.has(p.id);
          return `<div class="stockTableRow ${selected ? "selected" : ""} ${amount <= 3 ? "isLow" : ""}" data-stock-id="${escapeHtml(p.id)}" data-stock-cat="${escapeHtml(p.cat)}">
    <button class="stockProductCell" type="button" aria-pressed="${selected}"><span class="stockIndex">${i + 1}</span><span class="stockThumb"><img src="${escapeHtml(p.img || "assets/branding/logo.png")}" alt=""></span><span class="stockName"><b data-no-translate>${escapeHtml(p.name)}</b><small>${selected ? (en ? "Tap again to finish" : "แตะอีกครั้งเพื่อเสร็จสิ้น") : en ? "Tap to adjust stock" : "แตะเพื่อปรับสต๊อก"}</small></span></button>
    <span class="stockCategory" data-no-translate>${escapeHtml(db.categories.find((c) => c.id === p.cat)?.name || p.cat)}</span><strong class="stockPrice">${money(p.price)}</strong>
    <div class="stockQtyControl ${selected ? "editing" : ""}"><button type="button" data-stock-delta="-1" ${selected ? "" : "hidden"} aria-label="${en ? "Decrease" : "ลด"}">−</button><strong>${amount}</strong><button type="button" data-stock-delta="1" ${selected ? "" : "hidden"} aria-label="${en ? "Increase" : "เพิ่ม"}">+</button></div>
    <span class="stockStatus ${amount <= 3 ? "low" : "ok"}">${amount <= 0 ? (en ? "Out of stock" : "สินค้าหมด") : amount <= 3 ? (en ? "Low stock" : "สต๊อกต่ำ") : en ? "In stock" : "ปกติ"}</span></div>`;
        })
        .join("") ||
      `<div class="emptyState">${en ? "No products" : "ไม่มีสินค้า"}</div>`
    }</section>`;
  const all =
    products.length > 0 && products.every((p) => selectedStock.has(p.id));
  $("#selectAllStock").textContent = all
    ? en
      ? "Clear selection"
      : "ยกเลิกการเลือกทั้งหมด"
    : en
      ? "Select all"
      : "เลือกทั้งหมด";
  $("#bulkPlus").disabled = $("#bulkMinus").disabled = !selectedStock.size;
}
$("#stockList").onclick = (e) => {
  const row = e.target.closest("[data-stock-id]");
  if (!row) return;
  const delta = e.target.closest("[data-stock-delta]");
  if (delta) {
    stockChange(row.dataset.stockId, Number(delta.dataset.stockDelta));
    return;
  }
  toggleStockPick(row.dataset.stockId);
};
window.toggleStockPick = (id) => {
  selectedStock.has(id) ? selectedStock.delete(id) : selectedStock.add(id);
  renderStock();
};
function adjustStock(id, delta) {
  const p = db.products.find((x) => x.id === id);
  if (!p) return;
  p.fullStock = Math.max(0, Number(p.fullStock ?? p.stock ?? 0) + delta);
  p.stock = p.fullStock;
  syncLowStockReset(p);
}
function refreshStock() {
  save();
  renderStock();
  renderProducts();
  checkLowStockAlerts();
}
window.stockChange = (id, delta) => {
  adjustStock(id, delta);
  refreshStock();
};
$("#selectAllStock").onclick = () => {
  const products = visibleStockProducts();
  const all = products.every((p) => selectedStock.has(p.id));
  products.forEach((p) =>
    all ? selectedStock.delete(p.id) : selectedStock.add(p.id),
  );
  renderStock();
};
$("#stockCategoryJump").onchange = (e) => {
  stockFilter = e.target.value;
  selectedStock.clear();
  renderStock();
};
function bulk(delta) {
  selectedStock.forEach((id) => adjustStock(id, delta));
  refreshStock();
}
$("#bulkPlus").onclick = () => bulk(1);
$("#bulkMinus").onclick = () => bulk(-1);
function renderManage() {
  $("#categoryManager").innerHTML = db.categories
    .map(
      (c) =>
        `<button type="button" data-category-id="${escapeHtml(c.id)}" title="${db.language === "en" ? "Hold to rename or delete" : "กดค้างเพื่อเปลี่ยนชื่อหรือลบ"}" data-no-translate>${escapeHtml(c.name)}</button>`,
    )
    .join("");
  bindCategoryActions();
  renderManageList("all");
}
function bindCategoryActions() {
  document
    .querySelectorAll("#categoryManager [data-category-id]")
    .forEach((button) => {
      let timer = null,
        held = false,
        startX = 0,
        startY = 0;
      const cancel = () => {
        clearTimeout(timer);
        timer = null;
      };
      button.onpointerdown = (e) => {
        if (e.button !== 0) return;
        held = false;
        startX = e.clientX;
        startY = e.clientY;
        timer = setTimeout(() => {
          held = true;
          openCategoryEditor(button.dataset.categoryId);
        }, 550);
      };
      button.onpointerup = cancel;
      button.onpointercancel = cancel;
      button.onpointerleave = cancel;
      button.onpointermove = (e) => {
        if (Math.hypot(e.clientX - startX, e.clientY - startY) > 12) cancel();
      };
      button.onclick = (e) => {
        if (held) {
          e.preventDefault();
          held = false;
          return;
        }
        filterManage(button.dataset.categoryId);
      };
      button.oncontextmenu = (e) => {
        e.preventDefault();
        cancel();
        held = true;
        openCategoryEditor(button.dataset.categoryId);
      };
      button.onkeydown = (e) => {
        if (e.key === "F2" || (e.shiftKey && e.key === "F10")) {
          e.preventDefault();
          openCategoryEditor(button.dataset.categoryId);
        }
      };
    });
}
function openCategoryEditor(id) {
  const category = db.categories.find((c) => c.id === id);
  if (!category) return;
  const en = db.language === "en",
    others = db.categories.filter((c) => c.id !== id),
    count = db.products.filter((p) => p.cat === id).length;
  document.getElementById("categoryEditor74")?.remove();
  const modal = document.createElement("div");
  modal.id = "categoryEditor74";
  modal.className = "modal";
  modal.innerHTML = `<section class="modalBox categoryEditor74"><h2>${en ? "Edit category" : "แก้ไขหมวดหมู่"}</h2><label>${en ? "Category name" : "ชื่อหมวดหมู่"}<input id="categoryRename74" value="${escapeHtml(category.name)}" maxlength="80"></label><p>${en ? "Deleting this category keeps its products and moves them to the category below." : "เมื่อลบหมวดหมู่ สินค้าจะยังอยู่และย้ายไปหมวดหมู่ด้านล่าง"}</p><label>${en ? "Move products to" : "ย้ายสินค้าไปที่"}<select id="categoryMove74">${others.length ? others.map((c) => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.name)}</option>`).join("") : `<option value="uncategorized">${en ? "Uncategorized" : "ไม่มีหมวดหมู่"}</option>`}</select></label><small>${count} ${en ? "products" : "สินค้า"}</small><div class="categoryError74" role="alert"></div><footer><button data-category-close>${en ? "Cancel" : "ยกเลิก"}</button><button class="danger" data-category-delete>${en ? "Delete category" : "ลบหมวดหมู่"}</button><button class="primary" data-category-save>${en ? "Save" : "บันทึก"}</button></footer></section>`;
  document.body.appendChild(modal);
  updatePageLock();
  const close = () => {
    modal.remove();
    updatePageLock();
  };
  modal.querySelector("[data-category-close]").onclick = close;
  modal.onclick = (e) => {
    if (e.target === modal) close();
  };
  const refresh = () => {
    save();
    renderManage();
    renderCats();
    renderProducts();
    renderStock();
    close();
  };
  modal.querySelector("[data-category-save]").onclick = () => {
    const name = $("#categoryRename74").value.trim();
    if (
      !name ||
      db.categories.some(
        (c) => c.id !== id && c.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      modal.querySelector(".categoryError74").textContent = en
        ? "Enter a unique category name."
        : "กรุณาใส่ชื่อหมวดหมู่ที่ไม่ซ้ำ";
      return;
    }
    category.name = name;
    refresh();
  };
  modal.querySelector("[data-category-delete]").onclick = () => {
    const destination = $("#categoryMove74").value;
    if (!db.categories.some((c) => c.id === destination))
      db.categories.push({
        id: destination,
        name: en ? "Uncategorized" : "ไม่มีหมวดหมู่",
      });
    db.products
      .filter((p) => p.cat === id)
      .forEach((p) => (p.cat = destination));
    db.categories = db.categories.filter((c) => c.id !== id);
    if (currentCat === id) currentCat = "all";
    if (stockFilter === id) stockFilter = "all";
    refresh();
  };
}
window.filterManage = (cat) => renderManageList(cat);
function renderManageList(cat) {
  let en = db.language === "en",
    ps = db.products.filter((p) => cat === "all" || p.cat === cat);
  $("#menuManager").innerHTML = ps
    .map(
      (p) =>
        `<div class="manageRow ${p.enabled === false ? "disabledSale" : ""}" role="button" tabindex="0" onclick="if(!event.target.closest('button'))editProduct('${p.id}')" onkeydown="if((event.key==='Enter'||event.key===' ')&&!event.target.closest('button')){event.preventDefault();editProduct('${p.id}')}"><img src="${p.img || "assets/branding/logo.png"}"><div><b>${p.name}</b><span>${db.categories.find((c) => c.id === p.cat)?.name || p.cat} · ${money(p.price)} · ${en ? "Stock" : "สต๊อก"} ${p.stock}</span></div><button class="saleToggle ${p.enabled === false ? "off" : "on"}" onclick="event.stopPropagation();toggleProductSale('${p.id}')"><i></i>${p.enabled === false ? (en ? "Unavailable" : "ปิดขาย") : en ? "On sale" : "เปิดขาย"}</button><button onclick="event.stopPropagation();editProduct('${p.id}')">${en ? "Edit" : "แก้ไข"}</button><button class="danger" onclick="event.stopPropagation();deleteProduct('${p.id}')">${en ? "Delete" : "ลบ"}</button></div>`,
    )
    .join("");
}
window.toggleProductSale = (id) => {
  let p = db.products.find((x) => x.id === id);
  if (!p) return;
  p.enabled = p.enabled === false ? true : false;
  save();
  renderManageList("all");
  renderProducts();
};
$("#addCategory").onclick = () => {
  const m = $("#categoryModal"),
    i = $("#newCategoryName");
  m.classList.remove("hidden");
  i.value = "";
  setTimeout(() => i.focus(), 80);
};
$("#cancelCategory").onclick = () =>
  $("#categoryModal").classList.add("hidden");
$("#confirmCategory").onclick = () => {
  let name = $("#newCategoryName").value.trim();
  if (!name) return $("#newCategoryName").focus();
  if (db.categories.some((c) => c.name.toLowerCase() === name.toLowerCase()))
    return alert(
      db.language === "en"
        ? "This category already exists"
        : "มีหมวดหมู่นี้อยู่แล้ว",
    );
  db.categories.push({ id: "cat" + Date.now(), name });
  save();
  $("#categoryModal").classList.add("hidden");
  renderManage();
  renderCats();
  clickSound(720, 0.08);
};
$("#newCategoryName").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    $("#confirmCategory").click();
  }
});
$("#addProduct").onclick = () => openEditor();
function fillCatSelect() {
  $("#editCategory").innerHTML = db.categories
    .map((c) => `<option value="${c.id}">${c.name}</option>`)
    .join("");
}
function openEditor(p) {
  fillCatSelect();
  $("#imagePreview").dataset.cropped = "";
  $("#halfImagePreview").dataset.cropped = "";
  $("#editImage").value = "";
  $("#editHalfImage").value = "";
  $("#editorTitle").textContent = p ? "แก้ไขเมนู" : "เพิ่มเมนู";
  $("#editId").value = p?.id || "";
  $("#editName").value = p?.name || "";
  $("#editCategory").value = p?.cat || db.categories[0]?.id || "";
  $("#editPrice").value = p?.price || "";
  $("#editHalf").value = p?.half || "";
  $("#editHalfCost").value = p?.halfCost || "";
  $("#editHalfName").value = p?.halfName || "ครึ่งโลฟ";
  $("#editCost").value = p?.cost || "";
  $("#halfImagePreview").innerHTML = p?.halfImg
    ? `<img src="${p.halfImg}">`
    : "";
  $("#editStock").value = p?.fullStock ?? p?.stock ?? 7;
  if ($("#editHalfStock"))
    $("#editHalfStock").value = p?.halfStock ?? p?.stock ?? 7;
  $("#editPrep").value = p?.prep || "";
  $("#imagePreview").innerHTML =
    `<img src="${p?.img || "assets/classic.svg"}" alt="">`;
  $("#editorModal").classList.remove("hidden");
  syncModalScrollLock();
  if ($("#hasHalf")) {
    $("#hasHalf").checked = !!p?.half;
    $("#halfFields").classList.toggle("hidden", !$("#hasHalf").checked);
  }
}
window.editProduct = (id) => openEditor(db.products.find((p) => p.id === id));
let pendingDeleteProductId = null;
window.deleteProduct = (id) => {
  let p = db.products.find((x) => x.id === id);
  if (!p) return;
  pendingDeleteProductId = id;
  let en = db.language === "en";
  $("#deleteProductImage").src = p.img || "assets/branding/logo.png";
  $("#deleteProductName").textContent = p.name;
  $("#deleteProductTitle").textContent = en
    ? "Delete this product?"
    : "ลบสินค้านี้ใช่ไหม?";
  $("#deleteProductText").textContent = en
    ? "This product will be removed from Sell, Stock, Manage Store, held orders and future pre-orders. Previous order history will be kept."
    : "สินค้านี้จะถูกนำออกจากหน้าขาย สต๊อก จัดการร้าน ออเดอร์พัก และรายการสั่งล่วงหน้าที่ยังไม่จบ โดยประวัติออเดอร์เก่าจะยังอยู่";
  $("#deleteProductCancel").textContent = en ? "Keep product" : "เก็บสินค้าไว้";
  $("#deleteProductConfirmText").textContent = en
    ? "Delete product"
    : "ลบสินค้า";
  $("#deleteProductModal").classList.remove("hidden");
};
window.closeDeleteProductModal = () => {
  pendingDeleteProductId = null;
  $("#deleteProductModal")?.classList.add("hidden");
};
window.confirmDeleteProduct = () => {
  let id = pendingDeleteProductId,
    p = db.products.find((x) => x.id === id);
  if (!p) return closeDeleteProductModal();
  db.products = db.products.filter((x) => x.id !== id);
  cart = cart.filter((x) => x.id !== id);
  db.held = (db.held || [])
    .map((h) => ({ ...h, items: (h.items || []).filter((x) => x.id !== id) }))
    .filter((h) => (h.items || []).length);
  db.preorders = (db.preorders || []).map((o) => {
    if (["completed", "cancelled", "paid"].includes(o.status)) return o;
    return { ...o, items: (o.items || []).filter((x) => x.id !== id) };
  });
  selectedStock?.delete?.(id);
  save();
  closeDeleteProductModal();
  renderManage();
  renderProducts();
  renderCart();
  renderStock();
  renderHeld();
  clickSound(330, 0.1);
  speakLocalized("ลบสินค้าเรียบร้อยแล้ว", "Product deleted successfully.");
};
$("#productForm").onsubmit = (e) => {
  e.preventDefault();
  let id = $("#editId").value || "p" + Date.now(),
    oldp = db.products.find((p) => p.id === id),
    file = $("#editImage").files[0],
    halfFile = $("#editHalfImage").files[0],
    cropped = $("#imagePreview").dataset.cropped || null,
    halfCropped = $("#halfImagePreview").dataset.cropped || null;
  let build = (img, halfImg) => {
    let p = {
      id,
      name: $("#editName").value,
      cat: $("#editCategory").value,
      price: +$("#editPrice").value,
      half: $("#editHalf").value ? +$("#editHalf").value : null,
      halfCost: +$("#editHalfCost").value || 0,
      halfName: $("#editHalfName").value || "ครึ่งโลฟ",
      cost: +$("#editCost").value || 0,
      stock: +$("#editStock").value || 0,
      fullStock: +$("#editStock").value || 0,
      halfStock: $("#hasHalf")?.checked ? +$("#editHalfStock")?.value || 0 : 0,
      prep: $("#editPrep").value,
      img: img || oldp?.img || "assets/classic.svg",
      halfImg:
        halfImg || oldp?.halfImg || img || oldp?.img || "assets/classic.svg",
      desc: oldp?.desc || "",
    };
    const wasEdit = !!oldp;
    if (oldp) Object.assign(oldp, p);
    else db.products.push(p);
    save();
    $("#editorModal").classList.add("hidden");
    renderManage();
    renderProducts();
    try {
      renderStock();
    } catch (e) {}
    try {
      renderPreProducts();
    } catch (e) {}
    try {
      renderPast();
    } catch (e) {}
    clickSound(780, 0.1);
    speakLocalized(
      wasEdit ? `แก้ไขสินค้า ${p.name} สำเร็จ` : `เพิ่มสินค้า ${p.name} สำเร็จ`,
      wasEdit
        ? `Product ${p.name} updated successfully.`
        : `Product ${p.name} added successfully.`,
    );
  };
  let read = (f) =>
    new Promise((r) => {
      if (!f) return r(null);
      let x = new FileReader();
      x.onload = () => r(x.result);
      x.readAsDataURL(f);
    });
  Promise.all([read(file), read(halfFile)]).then(([a, b]) =>
    build(cropped || a, halfCropped || b),
  );
};
function shopLogoSrc() {
  return db.shopLogo || "assets/branding/shop-logo-transparent.png";
}
function syncHeaderBrand() {
  const b = document.querySelector(".brand b");
  if (b) b.textContent = db.shopName || "Sourdough";
  const im = $("#headerShopLogo");
  if (im) im.src = shopLogoSrc();
  document.title = (db.shopName || "Sourdough") + " POS";
  document
    .querySelectorAll("[data-shop-name], #taxPreviewShop")
    .forEach((el) => (el.textContent = db.shopName || "Sourdough"));
  document
    .querySelectorAll(".loginLogo, #headerShopLogo")
    .forEach((el) => (el.alt = db.shopName || "Store logo"));
  document.querySelectorAll(".dLogo").forEach((el) => (el.src = shopLogoSrc()));
  renderShopLogoPreview();
  window.refreshOpenDocument?.();
}
function renderShopLogoPreview() {
  const box = $("#shopLogoPreview");
  if (box) {
    box.innerHTML = `<img src="${box.dataset.cropped || shopLogoSrc()}" alt="Store logo"><span class="logoEditHint">${db.language === "en" ? "Tap to change image" : "แตะเพื่อเปลี่ยนรูป"}</span>`;
    box.onclick = () => {
      if (db.shopLogo && window.openImageCrop)
        window.openImageCrop(db.shopLogo, box, {
          logo: true,
          title: db.language === "en" ? "Adjust store logo" : "ปรับโลโก้ร้าน",
        });
      else $("#shopLogoInput")?.click();
    };
  }
}
$("#shopLogoInput")?.addEventListener("change", (e) => {
  const f = e.target.files?.[0];
  if (!f) return;
  let r = new FileReader();
  r.onload = () => {
    if (window.openImageCrop)
      window.openImageCrop(r.result, $("#shopLogoPreview"), {
        logo: true,
        title: db.language === "en" ? "Adjust store logo" : "ปรับโลโก้ร้าน",
      });
  };
  r.readAsDataURL(f);
  e.target.value = "";
});
$("#resetShopLogo")?.addEventListener("click", () => {
  db.shopLogo = "";
  $("#shopLogoPreview").dataset.cropped = "";
  save();
  syncHeaderBrand();
});
function staffRoleLabel(a, en) {
  return a.role === "owner"
    ? en
      ? "Owner"
      : "เจ้าของ"
    : en
      ? "Staff"
      : "พนักงาน";
}
function renderTaxSettings() {
  let t = db.tax || {};
  let ids = {
    taxEnabled: t.enabled,
    taxRate: t.rate ?? 7,
    taxMode: t.mode || "inclusive",
    taxLabel: t.label || "VAT",
    taxRounding: String(t.rounding ?? 2),
    serviceEnabled: t.serviceEnabled,
    serviceRate: t.serviceRate || 0,
    serviceLabel: t.serviceLabel || "Service charge",
  };
  Object.entries(ids).forEach(([id, v]) => {
    let e = $("#" + id);
    if (!e) return;
    if (e.type === "checkbox") e.checked = !!v;
    else e.value = v;
  });
  updateTaxPreview();
}
function roundTax(n, d) {
  let p = Math.pow(10, +d || 0);
  return Math.round((Number(n) + Number.EPSILON) * p) / p;
}
function updateTaxPreview() {
  let enabled = $("#taxEnabled")?.checked,
    rate = +($("#taxRate")?.value || 0),
    mode = $("#taxMode")?.value || "inclusive",
    label = $("#taxLabel")?.value.trim() || "VAT",
    digits = +($("#taxRounding")?.value || 2),
    svcOn = $("#serviceEnabled")?.checked,
    svcRate = +($("#serviceRate")?.value || 0),
    base = 1000,
    service = svcOn ? roundTax((base * svcRate) / 100, digits) : 0,
    taxBase = base + service,
    tax = enabled
      ? roundTax(
          mode === "inclusive"
            ? (taxBase * rate) / (100 + rate)
            : (taxBase * rate) / 100,
          digits,
        )
      : 0,
    total = mode === "exclusive" ? taxBase + tax : taxBase,
    en = db.language === "en";
  let fmt = (n) =>
    "฿" +
    Number(n || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  $("#taxExampleMode") &&
    ($("#taxExampleMode").textContent =
      mode === "inclusive"
        ? en
          ? "Tax inclusive"
          : "ราคารวมภาษีแล้ว (Tax Inclusive)"
        : en
          ? "Tax exclusive"
          : "ราคาไม่รวมภาษี (Tax Exclusive)");
  $("#taxExampleLabel") &&
    ($("#taxExampleLabel").textContent =
      `${label} ${rate}%${mode === "inclusive" ? (en ? " (included)" : " (รวมอยู่ในราคา)") : ""}`);
  $("#taxExampleValue") && ($("#taxExampleValue").textContent = fmt(tax));
  $("#taxExampleTotal") && ($("#taxExampleTotal").textContent = fmt(total));
  $("#serviceExample") && ($("#serviceExample").textContent = fmt(service));
  $("#serviceExampleRow")?.classList.toggle("hidden", !svcOn);
  $("#miniServiceRow")?.classList.toggle("hidden", !svcOn);
  $("#miniServiceValue") && ($("#miniServiceValue").textContent = fmt(service));
  $("#miniTaxLabel") && ($("#miniTaxLabel").textContent = `${label} ${rate}%`);
  $("#miniTaxValue") && ($("#miniTaxValue").textContent = fmt(tax));
  $("#miniTaxTotal") && ($("#miniTaxTotal").textContent = fmt(total));
  $("#taxPreviewShop") &&
    ($("#taxPreviewShop").textContent = db.shopName || "Sourdough");
  $("#serviceFields")?.classList.toggle("hidden", !svcOn);
}
function saveTaxSettings() {
  db.tax = {
    enabled: $("#taxEnabled").checked,
    rate: Math.max(0, +$("#taxRate").value || 0),
    mode: $("#taxMode").value,
    label: $("#taxLabel").value.trim() || "VAT",
    rounding: +$("#taxRounding").value || 0,
    serviceEnabled: $("#serviceEnabled").checked,
    serviceRate: Math.max(0, +$("#serviceRate").value || 0),
    serviceLabel: $("#serviceLabel").value.trim() || "Service charge",
  };
  save();
  updateTaxPreview();
  let b = $("#saveTaxSettings");
  b?.classList.add("taxFlash");
  setTimeout(() => b?.classList.remove("taxFlash"), 850);
  clickSound(720, 0.08);
}
function renderSettings() {
  renderShopLogoPreview();
  $("#promptpay").value = db.promptpay || "";
  $("#shopName").value = db.shopName || "Sourdough";
  if ($("#printerWidth"))
    $("#printerWidth").value = String(db.printerWidth || 80);
  renderQRImagePreview();
  renderSettingsQR();
  renderTaxSettings();
  let en = db.language === "en";
  $("#accountSettings").innerHTML =
    `<div class="staffPanelHead"><div class="staffTitleIcon"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3"/><path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6"/></svg></div><div class="staffPanelCopy"><b>${en ? "Staff" : "พนักงาน"}</b><small>${en ? "Choose a staff member to edit their account" : "เลือกพนักงานเพื่อแก้ไขข้อมูลบัญชี"}</small></div><button type="button" class="staffAddIconBtn" onclick="openAddStaff()" title="${en ? "Add staff" : "เพิ่มพนักงาน"}" aria-label="${en ? "Add staff" : "เพิ่มพนักงาน"}"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button></div><div class="staffSimpleList">` +
    db.accounts
      .map(
        (a, i) =>
          `<button type="button" class="staffSimpleRow" onclick="openStaffEditor(${i})"><span class="staffPhoto"><img src="${a.avatar || "assets/staff/avatar-staff1.svg"}" alt=""></span><span class="staffSimpleIdentity"><b>${escapeHtml(a.name)}</b><small>${staffRoleLabel(a, en)}</small></span>${currentUser?.u === a.u ? `<span class="staffLiveDot" title="${en ? "Signed in now" : "กำลังใช้งาน"}"><i></i>${en ? "Signed in" : "กำลังใช้งาน"}</span>` : ""}<span class="staffEditIcon"><svg viewBox="0 0 24 24"><path d="M4 20h4l11-11-4-4L4 16v4Z"/><path d="m13 7 4 4"/></svg></span></button>`,
      )
      .join("") +
    `</div>`;
}
function escapeHtml(v) {
  return String(v ?? "").replace(
    /[&<>"']/g,
    (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        m
      ],
  );
}
window.openAddStaff = () => {
  let en = db.language === "en",
    modal = $("#staffEditorModal");
  $("#staffEditIndex").value = "-1";
  $("#staffEditAvatar").src = "assets/staff/avatar-staff1.svg";
  $("#staffEditAvatarData").value = "";
  $("#staffEditName").value = "";
  $("#staffEditUser").value = "";
  $("#staffEditPass").value = "";
  $("#staffEditRole").textContent = en ? "Staff" : "พนักงาน";
  $("#staffEditActive").checked = true;
  $("#staffEditorTitle").textContent = en ? "Add staff" : "เพิ่มพนักงาน";
  document.querySelector(".staffEditorTitle p").textContent = en
    ? "Create a new staff account using the same details as staff editing."
    : "สร้างบัญชีพนักงานใหม่ด้วยข้อมูลแบบเดียวกับหน้าแก้ไขพนักงาน";
  $("#staffEditDelete").classList.add("hidden");
  $("#staffCurrentNotice").classList.add("hidden");
  $("#staffEditSave").textContent = en ? "Add staff" : "เพิ่มพนักงาน";
  modal.classList.remove("hidden");
  setTimeout(() => $("#staffEditName").focus(), 50);
};
window.openStaffEditor = (i) => {
  let a = db.accounts[i];
  if (!a) return;
  let en = db.language === "en",
    modal = $("#staffEditorModal");
  $("#staffEditIndex").value = i;
  $("#staffEditDelete").classList.remove("hidden");
  $("#staffCurrentNotice").classList.toggle("hidden", currentUser?.u !== a.u);
  document.querySelector(".staffEditorTitle p").textContent = en
    ? "Update staff details and login access."
    : "ปรับข้อมูลพนักงานและสิทธิ์การใช้งาน";
  $("#staffEditAvatar").src = a.avatar || "assets/staff/avatar-staff1.svg";
  $("#staffEditAvatarData").value = a.avatar || "";
  $("#staffEditName").value = a.name || "";
  $("#staffEditUser").value = a.u || "";
  $("#staffEditPass").value = a.p || "";
  $("#staffEditRole").textContent = staffRoleLabel(a, en);
  $("#staffEditActive").checked = a.active !== false;
  $("#staffEditorTitle").textContent = en ? "Edit staff" : "แก้ไขพนักงาน";
  $("#staffEditDelete").textContent = en ? "Delete staff" : "ลบพนักงาน";
  $("#staffEditSave").textContent = en ? "Save changes" : "บันทึกข้อมูล";
  modal.classList.remove("hidden");
  setTimeout(() => $("#staffEditName").focus(), 50);
};
window.closeStaffEditor = () => $("#staffEditorModal")?.classList.add("hidden");
window.saveStaffEditor = () => {
  let i = +$("#staffEditIndex").value,
    a = i >= 0 ? db.accounts[i] : null,
    isNew = i < 0,
    oldUser = a?.u,
    newUser = $("#staffEditUser").value.trim(),
    newName = $("#staffEditName").value.trim(),
    newPass = $("#staffEditPass").value.trim();
  if (!newName || !newUser || !newPass)
    return alert(
      db.language === "en"
        ? "Please complete all fields."
        : "กรุณากรอกข้อมูลให้ครบ",
    );
  if (db.accounts.some((x, j) => (isNew || j !== i) && x.u === newUser))
    return alert(
      db.language === "en"
        ? "This username is already in use."
        : "Username นี้มีผู้ใช้งานแล้ว",
    );
  let active = $("#staffEditActive").checked;
  if (!isNew && currentUser?.u === oldUser && !active)
    return alert(
      db.language === "en"
        ? "You cannot disable the account currently signed in."
        : "ไม่สามารถปิดบัญชีที่กำลังเข้าสู่ระบบอยู่ได้",
    );
  if (isNew) {
    a = {
      u: newUser,
      p: newPass,
      name: newName,
      role: "staff",
      active,
      avatar:
        $("#staffEditAvatarData").value || "assets/staff/avatar-staff1.svg",
    };
    db.accounts.push(a);
  } else {
    a.name = newName;
    a.u = newUser;
    a.p = newPass;
    a.active = active;
    a.avatar = $("#staffEditAvatarData").value || a.avatar;
    if (currentUser?.u === oldUser) {
      currentUser = a;
      $("#who").textContent = a.name;
    }
  }
  save();
  renderLoginUsers();
  renderSettings();
  closeStaffEditor();
  clickSound(720, 0.08);
  speakLocalized(
    isNew ? "เพิ่มพนักงานสำเร็จ" : "แก้ไขข้อมูลพนักงานสำเร็จ",
    isNew ? "Staff added successfully." : "Staff updated successfully.",
  );
};
document.addEventListener("change", (e) => {
  if (e.target?.id !== "staffEditAvatarInput") return;
  let f = e.target.files?.[0];
  if (!f) return;
  let r = new FileReader();
  r.onload = () => {
    if (window.openImageCrop)
      window.openImageCrop(r.result, $("#staffEditAvatar"), {
        staff: true,
        title: db.language === "en" ? "Adjust staff photo" : "ปรับรูปพนักงาน",
      });
  };
  r.readAsDataURL(f);
  e.target.value = "";
});
window.deleteStaffEditor = () => {
  let i = +$("#staffEditIndex").value,
    a = db.accounts[i];
  if (!a) return;
  if (a.role === "owner")
    return alert(
      db.language === "en"
        ? "The owner account cannot be deleted."
        : "ไม่สามารถลบบัญชีเจ้าของได้",
    );
  if (currentUser?.u === a.u)
    return alert(
      db.language === "en"
        ? "You cannot delete the account currently signed in."
        : "ไม่สามารถลบบัญชีที่กำลังเข้าสู่ระบบอยู่ได้",
    );
  if (
    !confirm(
      db.language === "en"
        ? `Delete ${a.name}?`
        : `ลบพนักงาน ${a.name} ใช่หรือไม่?`,
    )
  )
    return;
  db.accounts.splice(i, 1);
  save();
  renderLoginUsers();
  renderSettings();
  closeStaffEditor();
};
window.toggleStaffActive = (i) => {
  let a = db.accounts[i];
  if (!a) return;
  if (currentUser?.u === a.u && a.active !== false)
    return alert(
      db.language === "en"
        ? "You cannot disable the account currently signed in."
        : "ไม่สามารถปิดบัญชีที่กำลังเข้าสู่ระบบอยู่ได้",
    );
  a.active = a.active === false;
  save();
  renderLoginUsers();
  renderSettings();
  clickSound(a.active ? 720 : 330, 0.08);
};
window.saveAccount = (i) => {};
$("#savePrompt").onclick = () => {
  let v = $("#promptpay").value.replace(/\D/g, "");
  if (v && ![10, 13].includes(v.length))
    return alert(
      db.language === "en"
        ? "PromptPay requires a 10-digit phone number or a 13-digit national or tax ID"
        : "PromptPay ควรเป็นเบอร์โทร 10 หลัก หรือเลขบัตร/เลขผู้เสียภาษี 13 หลัก",
    );
  db.promptpay = v;
  db.shopName = $("#shopName").value.trim() || "Sourdough";
  if ($("#printerWidth")) db.printerWidth = +$("#printerWidth").value || 80;
  let pendingLogo = $("#shopLogoPreview")?.dataset.cropped;
  if (pendingLogo) {
    db.shopLogo = pendingLogo;
    $("#shopLogoPreview").dataset.cropped = "";
  }
  save();
  renderSettingsQR();
  renderQR();
  syncHeaderBrand();
  updateTaxPreview();
  alert(
    db.language === "en"
      ? "Saved. Dynamic QR updated automatically."
      : "บันทึกแล้ว · QR ไดนามิกอัปเดตอัตโนมัติ",
  );
};
$("#removePromptpay")?.addEventListener("click", () => {
  if (!db.promptpay) return;
  if (
    !confirm(
      db.language === "en"
        ? "Remove the dynamic QR number?"
        : "ลบเบอร์สำหรับ QR ไดนามิกใช่ไหม?",
    )
  )
    return;
  db.promptpay = "";
  save();
  $("#promptpay").value = "";
  renderSettingsQR();
  renderQR();
});
function renderAll() {
  renderLoginUsers();
  renderCats();
  renderProducts();
  renderCart();
}
renderLoginUsers();
renderAll();

function renderSettingsQR() {
  let el = $("#settingsQR");
  if (!el) return;
  if (db.qrImage) {
    el.innerHTML =
      '<small>ตัวอย่างรูป QR ที่ใช้ในหน้าชำระเงิน</small><div><img class="customSettingsQR" src="' +
      db.qrImage +
      '" alt="QR ร้าน"></div>';
    return;
  }
  let p = promptPayPayload(db.promptpay, 1);
  el.innerHTML =
    '<small>ตัวอย่าง QR · ยอดจริงจะสร้างใหม่อัตโนมัติในหน้าขาย</small><div id="settingsQRCode"></div>';
  drawQR($("#settingsQRCode"), p, 150);
}
function renderQRImagePreview() {
  let el = $("#qrImagePreview"),
    rm = $("#removeQrImage");
  if (!el) return;
  el.innerHTML = db.qrImage ? `<img src="${db.qrImage}" alt="QR ร้าน">` : "";
  rm?.classList.toggle("hidden", !db.qrImage);
}
$("#qrImageInput")?.addEventListener("change", (e) => {
  let f = e.target.files?.[0];
  if (!f) return;
  let r = new FileReader();
  r.onload = () => {
    db.qrImage = r.result;
    save();
    renderQRImagePreview();
    renderSettingsQR();
    renderQR();
  };
  r.readAsDataURL(f);
});
$("#removeQrImage")?.addEventListener("click", () => {
  db.qrImage = "";
  save();
  $("#qrImageInput").value = "";
  renderQRImagePreview();
  renderSettingsQR();
  renderQR();
});

/* v3.9 settings, export, half-loaf and receipt refinements */
(function () {
  const logo = document.querySelector(".loginLogo");
  if (logo) logo.src = "login-logo-transparent.png";
  const hasHalf = $("#hasHalf"),
    halfFields = $("#halfFields");
  function syncHalf() {
    if (!hasHalf || !halfFields) return;
    halfFields.classList.toggle("hidden", !hasHalf.checked);
    if (!hasHalf.checked) {
      $("#editHalf").value = "";
      $("#editHalfCost").value = "";
      $("#editHalfName").value = "";
      $("#editHalfImage").value = "";
      $("#halfImagePreview").innerHTML = "";
    }
  }
  if (hasHalf) {
    hasHalf.onchange = syncHalf;
  }
  const oldOpen = window.openEditor || openEditor;
  window.openEditor = function (p) {
    oldOpen(p);
    hasHalf.checked = !!p?.half;
    syncHalf();
  };
  document.querySelectorAll("[data-settings]").forEach(
    (b) =>
      (b.onclick = () => {
        document.querySelector("#settingsHome").style.display = "none";
        document
          .querySelectorAll(".settingsPanel")
          .forEach((x) =>
            x.classList.toggle(
              "active",
              x.dataset.panel === b.dataset.settings,
            ),
          );
      }),
  );
  document.querySelectorAll(".settingsBack").forEach(
    (b) =>
      (b.onclick = () => {
        document
          .querySelectorAll(".settingsPanel")
          .forEach((x) => x.classList.remove("active"));
        document.querySelector("#settingsHome").style.display = "grid";
      }),
  );
  function rowsFor(k, all = false) {
    let rows = [
        [
          "Order",
          "Date",
          "Time",
          "Staff",
          "Payment",
          "Product",
          "Variant",
          "Qty",
          "Unit Price",
          "Sales",
          "Cost",
          "Profit",
          "Status",
        ],
      ],
      qty = 0,
      sales = 0,
      cost = 0,
      profit = 0;
    db.orders
      .filter((o) => all || (o.localDate || dateKey(o.date)) === k)
      .forEach((o) =>
        o.items.forEach((i) => {
          let p = db.products.find((x) => x.id === i.id) || {};
          let c =
              i.variant && /ครึ่ง|half/i.test(i.variant)
                ? p.halfCost || 0
                : p.cost || 0,
            d = o.localDate || dateKey(new Date(o.date)),
            q = +i.qty || 0,
            s = q * (+i.price || 0),
            co = q * c,
            pr = s - co;
          qty += q;
          sales += s;
          cost += co;
          profit += pr;
          rows.push([
            formatOrderNumber(o.id),
            d,
            new Date(o.date).toLocaleTimeString("th-TH"),
            o.staff,
            o.method === "cash" ? "Cash" : "PromptPay",
            i.name,
            i.variant || "",
            q,
            i.price,
            s,
            co,
            pr,
            o.status,
          ]);
        }),
      );
    rows.push([
      "TOTAL",
      "",
      "",
      "",
      "",
      "",
      "",
      qty,
      "",
      sales,
      cost,
      profit,
      "",
    ]);
    return rows;
  }
  function dl(name, content, type) {
    let a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([content], { type }));
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  window.exportOrderRows = rowsFor;
  function csv(rows) {
    return (
      "\ufeff" +
      rows
        .map((r) =>
          r
            .map((v) => '"' + String(v ?? "").replaceAll('"', '""') + '"')
            .join(","),
        )
        .join("\r\n")
    );
  }
  let exportAll = false;
  function syncExportMode() {
    const d = $("#exportDate");
    if (d) d.disabled = exportAll;
    const l = $("#exportModeLabel");
    if (l)
      l.textContent = exportAll
        ? db.language === "en"
          ? "All dates"
          : "ทั้งหมด"
        : db.language === "en"
          ? "Selected date"
          : "เลือกวัน";
  }
  $("#exportMode")?.addEventListener("change", (e) => {
    exportAll = e.target.checked;
    syncExportMode();
  });
  $("#exportCSV").onclick = () => {
    let k = $("#exportDate").value || dateKey(new Date()),
      tag = exportAll ? "all" : k;
    dl(
      `sourdough-sales-${tag}.csv`,
      csv(rowsFor(k, exportAll)),
      "text/csv;charset=utf-8",
    );
  };
  $("#exportExcel").onclick = () => {
    let k = $("#exportDate").value || dateKey(new Date()),
      tag = exportAll ? "all" : k,
      r = rowsFor(k, exportAll);
    let h =
      "<table>" +
      r
        .map(
          (x, i) =>
            "<tr>" +
            x
              .map(
                (v) =>
                  `<${i ? "td" : "th"}>${String(v ?? "")
                    .replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")}</${i ? "td" : "th"}>`,
              )
              .join("") +
            "</tr>",
        )
        .join("") +
      "</table>";
    dl(`sourdough-sales-${tag}.xls`, h, "application/vnd.ms-excel");
  };
  $("#exportDate").value = dateKey(new Date());
  syncExportMode();
})();

/* direct image crop: drag the picture itself; wheel/pinch to zoom */
(function () {
  const modal = $("#imageCropModal"),
    canvas = $("#cropCanvas"),
    ctx = canvas?.getContext("2d");
  if (!modal || !canvas || !ctx) return;
  let img = null,
    target = null,
    scale = 1,
    ox = 0,
    oy = 0,
    drag = false,
    lastX = 0,
    lastY = 0,
    pinch = 0,
    isLogo = false,
    isStaff = false,
    cropShape = "rounded";
  function metrics() {
    let base = Math.max(640 / img.naturalWidth, 640 / img.naturalHeight),
      sc = base * scale,
      w = img.naturalWidth * sc,
      h = img.naturalHeight * sc;
    return { w, h };
  }
  function clamp() {
    if (!img) return;
    let { w, h } = metrics(),
      mx = Math.max(0, (w - 640) / 2),
      my = Math.max(0, (h - 640) / 2);
    ox = Math.max(-mx, Math.min(mx, ox));
    oy = Math.max(-my, Math.min(my, oy));
  }
  function shapePath(c, shape, size = 640) {
    let r = size / 2;
    c.beginPath();
    if (shape === "circle") {
      c.arc(r, r, r, 0, Math.PI * 2);
    } else if (shape === "oval") {
      c.ellipse(r, r, r, r * 0.72, 0, 0, Math.PI * 2);
    } else if (shape === "heart") {
      let k = size / 640;
      c.moveTo(320 * k, 570 * k);
      c.bezierCurveTo(270 * k, 520 * k, 70 * k, 390 * k, 95 * k, 205 * k);
      c.bezierCurveTo(115 * k, 60 * k, 285 * k, 70 * k, 320 * k, 185 * k);
      c.bezierCurveTo(355 * k, 70 * k, 525 * k, 60 * k, 545 * k, 205 * k);
      c.bezierCurveTo(570 * k, 390 * k, 370 * k, 520 * k, 320 * k, 570 * k);
    } else if (shape === "arch") {
      c.moveTo(70, 590);
      c.lineTo(70, 320);
      c.arc(320, 320, 250, Math.PI, 0);
      c.lineTo(570, 590);
      c.closePath();
    } else if (shape === "rounded") {
      let rr = 70;
      c.roundRect(0, 0, size, size, rr);
    } else {
      c.rect(0, 0, size, size);
    }
    c.closePath();
  }
  function draw() {
    if (!img) return;
    clamp();
    ctx.clearRect(0, 0, 640, 640);
    ctx.save();
    if (isLogo) {
      shapePath(ctx, cropShape, 640);
      ctx.clip();
    } else {
      ctx.fillStyle = "#f5eee4";
      ctx.fillRect(0, 0, 640, 640);
    }
    let { w, h } = metrics();
    ctx.drawImage(img, (640 - w) / 2 + ox, (640 - h) / 2 + oy, w, h);
    ctx.restore();
  }
  function close() {
    modal.classList.add("hidden");
    document.documentElement.classList.remove("imageCropOpen");
    img = null;
    target = null;
    drag = false;
    isLogo = false;
    isStaff = false;
  }
  function zoomBy(d) {
    scale = Math.max(0.42, Math.min(4, scale + d));
    draw();
  }
  function loadImage(src, preview, opts = {}) {
    let im = new Image();
    im.onload = () => {
      img = im;
      target = preview;
      isLogo = !!opts.logo;
      isStaff = !!opts.staff;
      scale = 1;
      ox = oy = 0;
      cropShape = opts.shape || "rounded";
      $("#imageCropModal h2").textContent =
        opts.title ||
        (db.language === "en" ? "Adjust product photo" : "ปรับรูปสินค้า");
      $(".cropHint").textContent = isLogo
        ? db.language === "en"
          ? "Choose a frame shape · drag to position · zoom in or out before saving"
          : "เลือกรูปทรงกรอบ · ลากเพื่อจัดตำแหน่ง · ซูมเข้าออกก่อนบันทึก"
        : db.language === "en"
          ? "Drag to reposition · pinch or scroll to zoom"
          : "ลากรูปในกรอบเพื่อจัดตำแหน่ง · ใช้สองนิ้วหรือสกอลล์เพื่อซูม";
      const chooser = $("#cropShapeChooser");
      chooser?.classList.toggle("hidden", !isLogo);
      if (chooser) {
        $("#cropShapeTitle").textContent =
          db.language === "en" ? "Choose frame shape" : "เลือกรูปทรงกรอบ";
        $("#cropZoomLabel").textContent =
          db.language === "en" ? "Zoom" : "ซูมรูป";
        chooser.querySelectorAll("button").forEach((b) => {
          b.classList.toggle("active", b.dataset.shape === cropShape);
          const labels = {
            square: ["สี่เหลี่ยม", "Square"],
            rounded: ["เหลี่ยมมน", "Rounded"],
            circle: ["วงกลม", "Circle"],
            oval: ["วงรี", "Oval"],
            heart: ["หัวใจ", "Heart"],
            arch: ["ซุ้มโค้ง", "Arch"],
          };
          b.querySelector("span").textContent =
            labels[b.dataset.shape][db.language === "en" ? 1 : 0];
        });
      }
      document.documentElement.classList.add("imageCropOpen");
      modal.classList.remove("hidden");
      modal.classList.toggle("logoCropMode", isLogo || isStaff);
      modal.scrollTop = 0;
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        modal
          .querySelector(".cropBox")
          ?.scrollIntoView({ block: "start", behavior: "auto" });
        draw();
      });
    };
    im.src = src;
  }
  function openCrop(file, preview, opts = {}) {
    if (!file) return;
    let r = new FileReader();
    r.onload = () => loadImage(r.result, preview, opts);
    r.readAsDataURL(file);
  }
  window.openImageCrop = (src, preview, opts = {}) =>
    loadImage(src, preview, opts);
  canvas.addEventListener("pointerdown", (e) => {
    if (!img) return;
    drag = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture?.(e.pointerId);
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!drag || !img) return;
    let rect = canvas.getBoundingClientRect(),
      k = 640 / rect.width;
    ox += (e.clientX - lastX) * k;
    oy += (e.clientY - lastY) * k;
    lastX = e.clientX;
    lastY = e.clientY;
    draw();
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((t) =>
    canvas.addEventListener(t, () => (drag = false)),
  );
  canvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 0.12 : -0.12);
    },
    { passive: false },
  );
  canvas.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        let a = e.touches[0],
          b = e.touches[1],
          d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
        if (pinch) zoomBy((d - pinch) / 260);
        pinch = d;
      }
    },
    { passive: false },
  );
  canvas.addEventListener("touchend", () => (pinch = 0));
  $("#cropZoomIn").onclick = () => zoomBy(0.15);
  $("#cropZoomOut").onclick = () => zoomBy(-0.15);
  $("#cropShapeChooser")?.addEventListener("click", (e) => {
    let b = e.target.closest("button[data-shape]");
    if (!b) return;
    cropShape = b.dataset.shape;
    $("#cropShapeChooser")
      .querySelectorAll("button")
      .forEach((x) => x.classList.toggle("active", x === b));
    draw();
  });
  $("#cropClose").onclick = close;
  $("#cropCancel").onclick = close;
  $("#cropApply").onclick = () => {
    if (!img || !target) return;
    draw();
    let out = document.createElement("canvas");
    out.width = 900;
    out.height = 900;
    let oc = out.getContext("2d");
    if (!isLogo) {
      oc.fillStyle = "#f5eee4";
      oc.fillRect(0, 0, 900, 900);
    }
    if (isLogo) {
      oc.save();
      shapePath(oc, cropShape, 900);
      oc.clip();
    }
    oc.drawImage(canvas, 0, 0, 900, 900);
    if (isLogo) oc.restore();
    let data = out.toDataURL(
      isLogo || isStaff ? "image/png" : "image/jpeg",
      0.92,
    );
    if (isLogo) {
      target.dataset.cropped = data;
      db.shopLogo = data;
      save();
      syncHeaderBrand();
      target.innerHTML = `<img src="${data}" alt="Store logo"><span class="logoEditHint">${db.language === "en" ? "Tap to change image" : "แตะเพื่อเปลี่ยนรูป"}</span>`;
      target.onclick = () =>
        window.openImageCrop(data, target, {
          logo: true,
          title: db.language === "en" ? "Adjust store logo" : "ปรับโลโก้ร้าน",
        });
    } else if (isStaff) {
      $("#staffEditAvatar").src = data;
      $("#staffEditAvatarData").value = data;
    } else {
      target.dataset.cropped = data;
      target.innerHTML = `<img src="${data}" alt="รูปที่ครอปแล้ว">`;
    }
    close();
  };
  $("#editImage").addEventListener("change", (e) =>
    openCrop(e.target.files[0], $("#imagePreview")),
  );
  $("#editHalfImage").addEventListener("change", (e) =>
    openCrop(e.target.files[0], $("#halfImagePreview")),
  );
})();

/* Store logo: remove a flat/light background automatically before crop. */
function removeLogoBackground(file) {
  return new Promise((resolve) => {
    let r = new FileReader();
    r.onload = () => {
      let im = new Image();
      im.onload = () => {
        let max = 1400,
          k = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight)),
          c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(im.naturalWidth * k));
        c.height = Math.max(1, Math.round(im.naturalHeight * k));
        let x = c.getContext("2d", { willReadFrequently: true });
        x.drawImage(im, 0, 0, c.width, c.height);
        let d = x.getImageData(0, 0, c.width, c.height),
          a = d.data,
          w = c.width,
          h = c.height,
          pts = [
            [2, 2],
            [w - 3, 2],
            [2, h - 3],
            [w - 3, h - 3],
          ];
        let bg = [0, 0, 0];
        pts.forEach(([px, py]) => {
          let i = (py * w + px) * 4;
          bg[0] += a[i];
          bg[1] += a[i + 1];
          bg[2] += a[i + 2];
        });
        bg = bg.map((v) => v / pts.length);
        for (let i = 0; i < a.length; i += 4) {
          let dr = a[i] - bg[0],
            dg = a[i + 1] - bg[1],
            dbb = a[i + 2] - bg[2],
            dist = Math.sqrt(dr * dr + dg * dg + dbb * dbb);
          if (dist < 38) a[i + 3] = 0;
          else if (dist < 82)
            a[i + 3] = Math.round((a[i + 3] * (dist - 38)) / 44);
        }
        x.putImageData(d, 0, 0);
        resolve(c.toDataURL("image/png"));
      };
      im.src = r.result;
    };
    r.readAsDataURL(file);
  });
}

// V4.2: auto-close payment success screen after 5 seconds with animated countdown
let successTimer = null,
  successCountdownPaused = false,
  successRemaining = 5,
  currentSuccessOrderId = null;
function closeSuccessAndReset() {
  if (successTimer) {
    clearInterval(successTimer);
    successTimer = null;
  }
  successCountdownPaused = false;
  successRemaining = 5;
  currentSuccessOrderId = null;
  $("#successModal").classList.add("hidden");
  $("#salePulse").textContent =
    db.language === "en" ? "Ready for a new order" : "พร้อมรับออเดอร์ใหม่";
  if (activePreorderPaymentId) {
    activePreorderPaymentId = null;
  }
}
function paintSuccessCountdown() {
  const sec = $("#successSeconds"),
    ringSec = $("#ringSeconds"),
    ring = $("#countRingProgress"),
    c = 2 * Math.PI * 18;
  if (sec) sec.textContent = successCountdownPaused ? "—" : successRemaining;
  if (ringSec)
    ringSec.textContent = successCountdownPaused ? "Ⅱ" : successRemaining;
  if (ring)
    ring.style.strokeDashoffset = String(c * (1 - successRemaining / 5));
}
function pauseSuccessCountdown() {
  successCountdownPaused = true;
  paintSuccessCountdown();
}
function resumeSuccessCountdown() {
  successCountdownPaused = false;
  paintSuccessCountdown();
}
function startSuccessCountdown() {
  if (successTimer) clearInterval(successTimer);
  successRemaining = 5;
  successCountdownPaused = false;
  paintSuccessCountdown();
  successTimer = setInterval(() => {
    if (successCountdownPaused) return;
    successRemaining--;
    paintSuccessCountdown();
    if (successRemaining <= 0) {
      clearInterval(successTimer);
      successTimer = null;
      setTimeout(closeSuccessAndReset, 180);
    }
  }, 1000);
}

// V4.4 held orders drawer from bottom navigation
(function () {
  const drawer = $("#heldDrawer"),
    backdrop = $("#heldDrawerBackdrop"),
    btn = $("#heldNavBtn"),
    close = $("#heldDrawerClose");
  function setHeldDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle("open", open);
    if (backdrop) backdrop.classList.toggle("hidden", !open);
    updatePageLock();
  }
  window.setHeldDrawerState = setHeldDrawer;
  if (btn)
    btn.onclick = () => {
      renderHeld();
      setHeldDrawer(!drawer.classList.contains("open"));
    };
  if (close) close.onclick = () => setHeldDrawer(false);
  if (backdrop) backdrop.onclick = () => setHeldDrawer(false);
})();

/* ===== V5.1: prevent pinch/double-tap zoom on touch devices ===== */
["gesturestart", "gesturechange", "gestureend"].forEach(function (type) {
  document.addEventListener(
    type,
    function (e) {
      e.preventDefault();
    },
    { passive: false },
  );
});
let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  function (e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  },
  { passive: false },
);

$("#variantModal").addEventListener("pointerdown", (e) => {
  if (e.target === $("#variantModal"))
    $("#variantModal").classList.add("hidden");
});

$$(".app nav button").forEach((b) =>
  b.addEventListener("click", () => {
    b.classList.remove("navPop");
    void b.offsetWidth;
    b.classList.add("navPop");
  }),
);

/* v5.14 payment sheet polish */
(function () {
  const modal = document.getElementById("payModal");
  if (modal) {
    modal.addEventListener("pointerdown", function (e) {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }
  function syncPaymentMethodLabels() {
    const cash = document.querySelector('.method button[data-method="cash"]');
    const qr = document.querySelector('.method button[data-method="qr"]');
    if (cash) {
      const svg = cash.querySelector("svg");
      cash.replaceChildren(svg);
      cash.append(
        document.createTextNode(db.language === "en" ? "Cash" : "เงินสด"),
      );
    }
    if (qr) {
      const svg = qr.querySelector("svg");
      qr.replaceChildren(svg);
      qr.append(
        document.createTextNode(
          db.language === "en" ? "PromptPay QR" : "คิวอาร์โค้ด",
        ),
      );
    }
  }
  document
    .getElementById("langTH")
    ?.addEventListener("click", () => setTimeout(syncPaymentMethodLabels, 10));
  document
    .getElementById("langEN")
    ?.addEventListener("click", () => setTimeout(syncPaymentMethodLabels, 10));
  document
    .getElementById("payBtn")
    ?.addEventListener("click", () => setTimeout(syncPaymentMethodLabels, 0));
  // Keep payment labels in sync without observing the modal DOM.
  // Observing childList here caused a feedback loop because syncPaymentMethodLabels()
  // itself replaces the button children, which could freeze the payment sheet.
  setTimeout(syncPaymentMethodLabels, 0);
})();

/* ===== v5.29 calendar locale follows TH / EN ===== */
(function () {
  function syncCalendarLocale() {
    const en = db.language === "en";
    const locale = en ? "en-AU" : "th-TH";
    document.documentElement.lang = en ? "en" : "th";
    document
      .querySelectorAll(
        'input[type="date"], input[type="time"], input[type="datetime-local"]',
      )
      .forEach((el) => {
        el.setAttribute("lang", locale);
        el.dataset.locale = locale;
      });
  }
  document
    .getElementById("langTH")
    ?.addEventListener("click", () => setTimeout(syncCalendarLocale, 20));
  document
    .getElementById("langEN")
    ?.addEventListener("click", () => setTimeout(syncCalendarLocale, 20));
  const oldSetLang = window.setLang;
  syncCalendarLocale();
  const observer = new MutationObserver(() => syncCalendarLocale());
  observer.observe(document.body, { childList: true, subtree: true });
})();

// v5.45 tax settings interactions
document.addEventListener("input", (e) => {
  if (e.target.closest(".taxSettingsPanel")) updateTaxPreview();
});
document.addEventListener("change", (e) => {
  if (e.target.closest(".taxSettingsPanel")) updateTaxPreview();
});
$("#saveTaxSettings")?.addEventListener("click", saveTaxSettings);

/* v5.47 — keep dynamically generated Tax UI in sync with TH / EN */
document.getElementById("langTH")?.addEventListener("click", () =>
  setTimeout(() => {
    renderTaxSettings();
    renderSaleTaxSummary();
    renderPayTaxSummary();
  }, 30),
);
document.getElementById("langEN")?.addEventListener("click", () =>
  setTimeout(() => {
    renderTaxSettings();
    renderSaleTaxSummary();
    renderPayTaxSummary();
  }, 30),
);

/* ===== v5.51 low-stock one-time voice alert ===== */
const LOW_STOCK_LIMIT = 5;
function syncLowStockReset(p) {
  if (!p) return;
  if (+p.stock > LOW_STOCK_LIMIT && p.lowStockAlerted) {
    delete p.lowStockAlerted;
    delete p.lowStockAlertedAt;
  }
}
function showLowStockToast(items) {
  document.querySelector(".lowStockVoiceToast")?.remove();
  const en = db.language === "en",
    el = document.createElement("div");
  el.className = "preReminderToast lowStockVoiceToast";
  const names = items.map((p) => p.name).join(", ");
  el.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 3 2.7 20h18.6L12 3Zm0 5v6m0 3.2v.1"/></svg><div><small>${en ? "LOW STOCK" : "สินค้าใกล้หมด"}</small><b>${en ? "Please restock" : "กรุณาเติมของด้วยค่ะ"}</b><span>${names}</span></div><button type="button" aria-label="Close">×</button>`;
  el.querySelector("button").onclick = () => el.remove();
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 12000);
}
function checkCartLowStock(p) {
  if (!p || p.lowStockAlerted) return;
  const inCart = cart
      .filter((i) => i.id === p.id)
      .reduce((n, i) => n + (+i.qty || 0), 0),
    remaining = Math.max(0, (+p.stock || 0) - inCart);
  if (remaining <= LOW_STOCK_LIMIT) {
    p.lowStockAlerted = true;
    p.lowStockAlertedAt = Date.now();
    save();
    showLowStockToast([p]);
    speakLocalized(
      "สินค้าใกล้จะหมดแล้ว กรุณาเติมของด้วยค่ะ",
      "Low stock. Please restock.",
      { priority: true },
    );
    if (remaining <= 0) setTimeout(() => go("stock"), 220);
  }
}
function checkLowStockAlerts() {
  const newlyLow = [];
  (db.products || []).forEach((p) => {
    syncLowStockReset(p);
    if (+p.stock <= LOW_STOCK_LIMIT && !p.lowStockAlerted) {
      p.lowStockAlerted = true;
      p.lowStockAlertedAt = Date.now();
      newlyLow.push(p);
    }
  });
  if (!newlyLow.length) return;
  save();
  clickSound(740, 0.16);
  showLowStockToast(newlyLow);
  speakLocalized(
    "สินค้าใกล้จะหมดแล้ว กรุณาเติมของด้วยค่ะ",
    "Low stock. Please restock.",
  );
  if (newlyLow.some((p) => +p.stock <= 0)) setTimeout(() => go("stock"), 220);
}
/* ===== v5.50 pre-order due reminder ===== */
(function () {
  const LEAD_MINUTES = 30;
  function pickupDate(p) {
    if (!p?.date || !p?.time) return null;
    const d = new Date(`${p.date}T${p.time}:00`);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  function reminderTone() {
    try {
      audioCtx =
        audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.18, 0.36].forEach((delay, i) => {
        const o = audioCtx.createOscillator(),
          g = audioCtx.createGain();
        o.frequency.value = [660, 820, 980][i];
        g.gain.value = 0.055;
        o.connect(g);
        g.connect(audioCtx.destination);
        o.start(audioCtx.currentTime + delay);
        g.gain.exponentialRampToValueAtTime(
          0.001,
          audioCtx.currentTime + delay + 0.16,
        );
        o.stop(audioCtx.currentTime + delay + 0.17);
      });
    } catch (e) {}
  }
  function speakReminder(p) {
    speakLocalized(
      `แจ้งเตือนรายการสั่งล่วงหน้า ลูกค้า ${p.customer || ""} เวลารับ ${p.time} นาฬิกา`,
      `Pre-order reminder. Customer ${p.customer || ""}. Pickup at ${p.time}.`,
    );
  }
  function showReminder(p, mins) {
    document.querySelector(".preReminderToast")?.remove();
    const en = db.language === "en",
      el = document.createElement("div");
    el.className = "preReminderToast";
    el.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z"/><path d="M10 20h4"/></svg><div><small>${en ? "PRE-ORDER REMINDER" : "แจ้งเตือนสั่งล่วงหน้า"}</small><b>${en ? "Customer" : "ลูกค้า"}: ${p.customer || "-"}</b><span>${en ? "Pickup" : "เวลารับ"} ${p.time} · ${en ? `in about ${Math.max(0, mins)} min` : `อีกประมาณ ${Math.max(0, mins)} นาที`}</span></div><button type="button" aria-label="Close">×</button>`;
    el.querySelector("button").onclick = () => el.remove();
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 15000);
  }
  function checkPreorderReminders() {
    const now = new Date();
    let changed = false;
    (db.preorders || []).forEach((p) => {
      if (p.remindedAt) return;
      const due = pickupDate(p);
      if (!due) return;
      const diff = (due - now) / 60000;
      if (diff <= LEAD_MINUTES && diff >= -5) {
        p.remindedAt = Date.now();
        changed = true;
        reminderTone();
        speakReminder(p);
        showReminder(p, Math.ceil(diff));
      }
    });
    if (changed) save();
  }
  // Browser audio requires a user interaction first; unlock audio on the first tap/click.
  document.addEventListener(
    "pointerdown",
    () => {
      try {
        audioCtx =
          audioCtx || new (window.AudioContext || window.webkitAudioContext)();
        audioCtx.resume?.();
      } catch (e) {}
    },
    { once: true },
  );
  setTimeout(checkPreorderReminders, 1200);
  setInterval(checkPreorderReminders, 30000);
  window.checkPreorderReminders = checkPreorderReminders;
})();

// v5.61 Kitchen workflow
function kitchenStore() {
  db.kitchenWorkflow = db.kitchenWorkflow || {};
  return db.kitchenWorkflow;
}
function kitchenState(id) {
  const s = kitchenStore();
  if (!s[id]) s[id] = { status: "waiting", steps: {}, updated: Date.now() };
  return s[id];
}
window.kitchenSelect = function (id) {
  db.kitchenSelected = Number(id);
  save();
  renderKitchen();
};
window.kitchenStep = function (id, key, checked) {
  const st = kitchenState(id);
  st.steps[key] = !!checked;
  if (st.status === "waiting" && checked) st.status = "doing";
  st.updated = Date.now();
  save();
  renderKitchen();
};
window.kitchenFinish = function (id) {
  const st = kitchenState(id);
  st.status = "done";
  st.updated = Date.now();
  save();
  renderKitchen();
};
window.kitchenCancel = function (id) {
  const st = kitchenState(id);
  st.status = "cancelled";
  st.updated = Date.now();
  save();
  renderKitchen();
};
window.kitchenFilter = function (v) {
  db.kitchenFilter = v;
  save();
  renderKitchen();
};

renderKitchen = function () {
  const en = db.language === "en",
    all = db.orders
      .filter((o) => o.status === "paid")
      .slice(-40)
      .reverse();
  const wf = kitchenStore();
  const filter = db.kitchenFilter || "all";
  const statusOf = (o) =>
    o.status === "cancelled"
      ? "cancelled"
      : o.status === "paid"
        ? "done"
        : wf[o.id]?.status || "waiting";
  const visible = all.filter((o) => filter === "all" || statusOf(o) === filter);
  let selected = Number(db.kitchenSelected);
  if (!visible.some((o) => o.id === selected))
    selected = visible[0]?.id || all[0]?.id;
  db.kitchenSelected = selected;
  const o = all.find((x) => x.id === selected);
  const labels = {
    waiting: en ? "Waiting" : "รอเตรียม",
    doing: en ? "In progress" : "กำลังทำ",
    done: en ? "Completed" : "เสร็จแล้ว",
    cancelled: en ? "Cancelled" : "ยกเลิก",
  };
  const counts = (k) => all.filter((x) => statusOf(x) === k).length;
  const queue = visible
    .map((x) => {
      let st = statusOf(x);
      return `<button class="kqCard ${formatOrderNumber(x.id) === String(selected) ? "selected" : ""}" onclick="kitchenSelect(${x.id})"><div class="kqTop"><b>#${String(x.id)}</b><span class="kStatus ${st}">${labels[st]}</span><strong>${x.items.reduce((a, i) => a + i.qty, 0)} ${en ? "items" : "ชิ้น"}</strong></div><div class="kqItems">${x.items
        .slice(0, 2)
        .map((i) => `<span>${i.name}<b>${i.qty}</b></span>`)
        .join(
          "",
        )}${x.items.length > 2 ? `<small>+${x.items.length - 2} ${en ? "more" : "เมนู"}</small>` : ""}</div></button>`;
    })
    .join("");
  if (!o) {
    $("#orderTab").innerHTML =
      `<div class="emptyState">${en ? "Nothing to prepare" : "ไม่มีรายการที่ต้องเตรียม"}</div>`;
    return;
  }
  const st = kitchenState(o.id),
    status = st.status;
  const steps = en
    ? [
        "Prepare ingredients",
        "Mix ingredients / dough",
        "Shape or portion",
        "Rest / proof",
        "Bake / cook",
        "Cool and final check",
      ]
    : [
        "เตรียมวัตถุดิบ",
        "ผสมวัตถุดิบ / แป้ง",
        "ขึ้นรูปหรือแบ่งส่วน",
        "พักแป้ง / พักส่วนผสม",
        "อบ / ปรุง",
        "พักให้เย็นและตรวจสอบ",
      ];
  const stepRows = steps
    .map((s, i) => {
      let key = "s" + i,
        ck = !!st.steps[key];
      return `<div class="kStep ${ck ? "checked" : ""}"><label><input type="checkbox" ${ck ? "checked" : ""} ${status === "done" || status === "cancelled" ? "disabled" : ""} onchange="kitchenStep(${o.id},'${key}',this.checked)"><span>${i + 1}. ${s}</span></label><details><summary>${en ? "Details" : "รายละเอียด"}⌄</summary><p>${en ? "Follow the product preparation note and check quality before moving to the next step." : "ทำตามข้อมูลการเตรียมของสินค้าและตรวจสอบคุณภาพก่อนเข้าสู่ขั้นตอนถัดไป"}</p></details></div>`;
    })
    .join("");
  const done = Object.values(st.steps).filter(Boolean).length,
    pct = Math.round((done / steps.length) * 100);
  const productCards = o.items
    .map((i) => {
      let p =
        db.products.find((p) => p.id === (i.id || i.productId)) ||
        db.products.find((p) => p.name === i.name);
      return `<div class="kProd">${p?.image ? `<img src="${p.image}">` : ""}<b>${i.name}</b><span>${i.qty} ${en ? "items" : "ชิ้น"}</span></div>`;
    })
    .join("");
  const notes = o.items
    .map((i) => {
      let p =
        db.products.find((p) => p.id === (i.id || i.productId)) ||
        db.products.find((p) => p.name === i.name);
      return `<div class="kNote"><b>${i.name}</b><span>${p?.prep || p?.desc || (en ? "No preparation note" : "ยังไม่ได้ระบุข้อมูลการเตรียม")}</span></div>`;
    })
    .join("");
  $("#orderTab").innerHTML =
    `<div class="kDash"><aside class="kQueue"><h2>${en ? "Orders to prepare" : "รายการที่ต้องเตรียม"}</h2><div class="kFilters"><button class="${filter === "all" ? "on" : ""}" onclick="kitchenFilter('all')">${en ? "All" : "ทั้งหมด"} ${all.length}</button><button class="waiting ${filter === "waiting" ? "on" : ""}" onclick="kitchenFilter('waiting')">${en ? "Waiting" : "รอเตรียม"} ${counts("waiting")}</button><button class="doing ${filter === "doing" ? "on" : ""}" onclick="kitchenFilter('doing')">${en ? "Doing" : "กำลังทำ"} ${counts("doing")}</button><button class="done ${filter === "done" ? "on" : ""}" onclick="kitchenFilter('done')">${en ? "Done" : "เสร็จ"} ${counts("done")}</button></div><div class="kQueueList">${queue || `<div class="emptyState">${en ? "No orders" : "ไม่มีรายการ"}</div>`}</div></aside><section class="kWork"><div class="kWorkHead"><div><div class="kTitle"><h2>Order #${formatOrderNumber(o.id)}</h2><span class="kStatus ${status}">${labels[status]}</span></div><small>${new Date(o.date || o.time || Date.now()).toLocaleString(en ? "en-AU" : "th-TH")}</small></div><div><b>${o.items.reduce((a, i) => a + i.qty, 0)} ${en ? "items" : "ชิ้น"}</b> <button class="warm" type="button" onclick="event.preventDefault();event.stopPropagation();openKitchenPreview(${o.id})">${en ? "Print kitchen ticket" : "พิมพ์ใบครัว"}</button></div></div><div class="kProducts">${productCards}</div><div class="kTabs"><b>${en ? "Preparation steps" : "ขั้นตอนการทำ"}</b><span>${en ? "Ingredients & notes" : "วัตถุดิบและโน้ต"}</span></div><div class="kBody"><div><div class="kSteps">${stepRows}</div><div class="kProgress"><div><i style="width:${pct}%"></i></div><span>${done}/${steps.length} ${en ? "steps" : "ขั้นตอน"} · ${pct}%</span></div></div><aside class="kNotes"><h3>${en ? "Ingredients / preparation" : "วัตถุดิบ / การเตรียม"}</h3>${notes}</aside></div><div class="kActions">${status !== "done" && status !== "cancelled" ? `<button class="kCancel" onclick="kitchenCancel(${o.id})">× ${en ? "Cancel order" : "ยกเลิกออเดอร์"}</button><button class="kDone" onclick="kitchenFinish(${o.id})">✓ ${en ? "Completed" : "เสร็จแล้ว"}</button>` : `<div class="kFinal ${status}">${status === "done" ? "✓" : "×"} ${labels[status]}</div>`}</div></section></div>`;
  save();
};

// v5.63 Kitchen detail workspace
window.kitchenAddStep = function (id) {
  const en = db.language === "en";
  const name = prompt(en ? "New preparation step" : "เพิ่มขั้นตอนการทำ");
  if (!name?.trim()) return;
  const st = kitchenState(id);
  st.customSteps = st.customSteps || [];
  st.customSteps.push({ id: "c" + Date.now(), name: name.trim(), done: false });
  st.updated = Date.now();
  save();
  renderKitchen();
};
window.kitchenCustomStep = function (id, key, checked) {
  const st = kitchenState(id);
  const s = (st.customSteps || []).find((x) => x.id === key);
  if (s) s.done = !!checked;
  if (st.status === "waiting" && checked) st.status = "doing";
  st.updated = Date.now();
  save();
  renderKitchen();
};
window.kitchenTab = function (tab) {
  db.kitchenTab = tab;
  save();
  renderKitchen();
};

const _renderKitchenV563 = renderKitchen;
renderKitchen = function () {
  const en = db.language === "en",
    all = db.orders
      .filter((o) => o.status === "paid")
      .slice()
      .reverse();
  const wf = kitchenStore(),
    filter = db.kitchenFilter || "all",
    statusOf = (o) => wf[o.id]?.status || "waiting";
  const visible = all.filter((o) => filter === "all" || statusOf(o) === filter);
  let selected = Number(db.kitchenSelected);
  if (!visible.some((o) => o.id === selected))
    selected = visible[0]?.id || all[0]?.id;
  db.kitchenSelected = selected;
  const o = all.find((x) => x.id === selected),
    labels = {
      waiting: en ? "Waiting" : "รอเตรียม",
      doing: en ? "In progress" : "กำลังทำ",
      done: en ? "Completed" : "เสร็จแล้ว",
      cancelled: en ? "Cancelled" : "ยกเลิก",
    };
  const counts = (k) => all.filter((x) => statusOf(x) === k).length;
  const ico = (type) =>
    ({
      clock:
        '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>',
      list: '<svg viewBox="0 0 24 24"><path d="M9 6h10M9 12h10M9 18h10"/><circle cx="5" cy="6" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="5" cy="18" r="1"/></svg>',
      box: '<svg viewBox="0 0 24 24"><path d="M4 7l8-4 8 4-8 4-8-4zm0 0v10l8 4 8-4V7M12 11v10"/></svg>',
      note: '<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg>',
      history:
        '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2-5.3L4 9M4 4v5h5"/><path d="M12 8v5l3 2"/></svg>',
    })[type] || "";
  const queue = visible
    .map((x) => {
      let st = statusOf(x),
        qty = x.items.reduce((a, i) => a + i.qty, 0);
      return `<button class="kqCard ${x.id === selected ? "selected" : ""}" onclick="kitchenSelect(${x.id})"><div class="kqTop"><b>#${formatOrderNumber(x.id)}</b><span class="kTime">${ico("clock")}${new Date(x.date || x.time || Date.now()).toLocaleTimeString(en ? "en-AU" : "th-TH", { hour: "2-digit", minute: "2-digit" })}</span><span class="kStatus ${st}">${labels[st]}</span><strong>${qty} ${en ? "items" : "ชิ้น"}</strong></div><div class="kqItems">${x.items
        .slice(0, 2)
        .map((i) => `<span>${i.name}<b>× ${i.qty}</b></span>`)
        .join(
          "",
        )}${x.items.length > 2 ? `<small>+${x.items.length - 2} ${en ? "more menus" : "เมนู"}</small>` : ""}</div></button>`;
    })
    .join("");
  if (!o) {
    $("#orderTab").innerHTML =
      `<div class="emptyState">${en ? "Nothing to prepare" : "ไม่มีรายการที่ต้องเตรียม"}</div>`;
    return;
  }
  const st = kitchenState(o.id),
    status = st.status,
    tab = db.kitchenTab || "steps";
  const baseSteps = en
    ? [
        "Prepare ingredients",
        "Mix ingredients / dough",
        "Shape or portion",
        "Rest / proof",
        "Bake / cook",
        "Cool and final check",
      ]
    : [
        "เตรียมวัตถุดิบ",
        "ผสมวัตถุดิบ / แป้ง",
        "ขึ้นรูปหรือแบ่งส่วน",
        "พักแป้ง / พักส่วนผสม",
        "อบ / ปรุง",
        "พักให้เย็นและตรวจสอบ",
      ];
  const rows = baseSteps
    .map((s, i) => {
      let key = "s" + i,
        ck = !!st.steps[key];
      return `<div class="kStep ${ck ? "checked" : ""}"><label><input type="checkbox" ${ck ? "checked" : ""} ${["done", "cancelled"].includes(status) ? "disabled" : ""} onchange="kitchenStep(${o.id},'${key}',this.checked)"><span>${i + 1}. ${s}</span></label><details><summary>${en ? "Details" : "รายละเอียด"}⌄</summary><p>${en ? "Add or follow the preparation note for this step." : "ทำตามข้อมูลการเตรียมของสินค้า หรือใช้รายละเอียดขั้นตอนที่ร้านกำหนด"}</p></details></div>`;
    })
    .join("");
  const custom = (st.customSteps || [])
    .map(
      (s, i) =>
        `<div class="kStep ${s.done ? "checked" : ""}"><label><input type="checkbox" ${s.done ? "checked" : ""} ${["done", "cancelled"].includes(status) ? "disabled" : ""} onchange="kitchenCustomStep(${o.id},'${s.id}',this.checked)"><span>${baseSteps.length + i + 1}. ${s.name}</span></label></div>`,
    )
    .join("");
  const allStepCount = baseSteps.length + (st.customSteps || []).length,
    done =
      Object.values(st.steps || {}).filter(Boolean).length +
      (st.customSteps || []).filter((s) => s.done).length,
    pct = allStepCount ? Math.round((done / allStepCount) * 100) : 0;
  const productCards = o.items
    .map((i) => {
      let p =
        db.products.find((p) => p.id === (i.id || i.productId)) ||
        db.products.find((p) => p.name === i.name);
      return `<div class="kProd">${p?.image ? `<img src="${p.image}">` : `<div class="kProdBlank">${ico("box")}</div>`}<b>${i.name}</b><span>${i.qty} ${en ? "items" : "ชิ้น"}</span></div>`;
    })
    .join("");
  const notes = o.items
    .map((i) => {
      let p =
        db.products.find((p) => p.id === (i.id || i.productId)) ||
        db.products.find((p) => p.name === i.name);
      return `<div class="kNote"><b>${i.name}</b><span>${i.ingredientNote ?? p?.prep ?? p?.desc ?? (en ? "Not specified yet" : "ยังไม่ได้ระบุ")}</span></div>`;
    })
    .join("");
  const started = st.updated || o.time || Date.now(),
    elapsed = Math.max(0, Date.now() - started),
    mins = Math.floor(elapsed / 60000),
    elapsedText =
      mins >= 60
        ? `${Math.floor(mins / 60)} ${en ? "hr" : "ชม."} ${mins % 60} ${en ? "min" : "นาที"}`
        : `${mins} ${en ? "min" : "นาที"}`;
  let panel = "";
  if (tab === "steps")
    panel = `<div class="kSteps">${rows}${custom}</div>${!["done", "cancelled"].includes(status) ? `<button class="kAddStep" onclick="kitchenAddStep(${o.id})">＋ ${en ? "Add preparation step" : "เพิ่มขั้นตอนการทำ"}</button>` : ""}<div class="kProgress"><div><i style="width:${pct}%"></i></div><span>${done}/${allStepCount} ${en ? "steps" : "ขั้นตอน"} · ${pct}%</span></div>`;
  else if (tab === "ingredients")
    panel = `<div class="kInfoPanel"><h3>${ico("box")}${en ? "Ingredients / preparation" : "วัตถุดิบ / การเตรียม"}</h3>${notes}</div>`;
  else if (tab === "notes")
    panel = `<div class="kInfoPanel"><h3>${ico("note")}${en ? "Special note" : "โน้ตพิเศษ"}</h3><p>${o.note || o.customerNote || (en ? "No special note" : "ไม่มีโน้ตพิเศษ")}</p></div>`;
  else
    panel = `<div class="kInfoPanel"><h3>${ico("history")}${en ? "Order history" : "ประวัติ"}</h3><div class="kHistoryLine"><b>${labels[status]}</b><span>${new Date(st.updated || o.time || Date.now()).toLocaleString(en ? "en-AU" : "th-TH")}</span></div><div class="kHistoryLine"><b>${en ? "Elapsed time" : "เวลาที่ใช้ทำ"}</b><span>${elapsedText}</span></div></div>`;
  $("#orderTab").innerHTML =
    `<div class="kDash"><aside class="kQueue"><div class="kQueueTitle"><h2>${en ? "Orders to prepare" : "รายการที่ต้องเตรียม"}</h2><b>${all.length}</b></div><div class="kFilters"><button class="${filter === "all" ? "on" : ""}" onclick="kitchenFilter('all')">${en ? "All" : "ทั้งหมด"} ${all.length}</button><button class="waiting ${filter === "waiting" ? "on" : ""}" onclick="kitchenFilter('waiting')">${en ? "Waiting" : "รอเตรียม"} ${counts("waiting")}</button><button class="doing ${filter === "doing" ? "on" : ""}" onclick="kitchenFilter('doing')">${en ? "Doing" : "กำลังทำ"} ${counts("doing")}</button><button class="done ${filter === "done" ? "on" : ""}" onclick="kitchenFilter('done')">${en ? "Done" : "เสร็จ"} ${counts("done")}</button></div><div class="kQueueList">${queue || `<div class="emptyState">${en ? "No orders" : "ไม่มีรายการ"}</div>`}</div></aside><section class="kWork"><div class="kWorkHead"><div><div class="kTitle"><h2>Order #${formatOrderNumber(o.id)}</h2><span class="kStatus ${status}">${labels[status]}</span></div><small>${new Date(o.date || o.time || Date.now()).toLocaleDateString(en ? "en-AU" : "th-TH")} · ${new Date(o.date || o.time || Date.now()).toLocaleTimeString(en ? "en-AU" : "th-TH", { hour: "2-digit", minute: "2-digit" })}</small></div><div class="kHeadStats"><div>${ico("clock")}<span>${en ? "Time used" : "เวลาที่ใช้"}<b>${elapsedText}</b></span></div><strong>${en ? "Total" : "ทั้งหมด"} ${o.items.reduce((a, i) => a + i.qty, 0)} ${en ? "items" : "ชิ้น"}</strong><button class="warm" type="button" onclick="event.preventDefault();event.stopPropagation();openKitchenPreview(${o.id})">${en ? "Print" : "พิมพ์ใบครัว"}</button></div></div><div class="kProductTitle">${en ? "Order items" : "รายการสินค้า"} (${o.items.length} ${en ? "menus" : "เมนู"})</div><div class="kProducts">${productCards}</div><div class="kTabs"><button class="${tab === "steps" ? "on" : ""}" onclick="kitchenTab('steps')">${ico("list")}${en ? "Preparation steps" : "ขั้นตอนการทำ"}</button><button class="${tab === "ingredients" ? "on" : ""}" onclick="kitchenTab('ingredients')">${ico("box")}${en ? "Ingredients" : "วัตถุดิบ"}</button><button class="${tab === "notes" ? "on" : ""}" onclick="kitchenTab('notes')">${ico("note")}${en ? "Special note" : "โน้ตพิเศษ"}</button><button class="${tab === "history" ? "on" : ""}" onclick="kitchenTab('history')">${ico("history")}${en ? "History" : "ประวัติ"}</button></div><div class="kDetailPanel">${panel}</div><div class="kActions">${!["done", "cancelled"].includes(status) ? `<button class="kCancel" onclick="kitchenCancel(${o.id})">× ${en ? "Cancel order" : "ยกเลิกออเดอร์"}</button><button class="kDone" onclick="kitchenFinish(${o.id})">✓ ${en ? "Completed" : "เสร็จแล้ว"}</button>` : `<div class="kFinal ${status}">${status === "done" ? "✓" : "×"} ${labels[status]}</div>`}</div></section></div>`;
  save();
};

/* v5.64 — Kitchen dashboard refined for the CURRENT Sourdough shop only. */
window.kitchenSearch = function (v) {
  db.kitchenSearch = v;
  save();
  renderKitchen();
};
window.kitchenSort = function (v) {
  db.kitchenSort = v;
  save();
  renderKitchen();
};
const _kitchenRenderCurrentShop = renderKitchen;
renderKitchen = function () {
  const en = db.language === "en",
    wf = kitchenStore(),
    filter = db.kitchenFilter || "all",
    q = (db.kitchenSearch || "").trim().toLowerCase(),
    sort = db.kitchenSort || "received";
  const statusOf = (o) =>
      o.status === "cancelled"
        ? "cancelled"
        : o.status === "paid"
          ? "done"
          : wf[o.id]?.status || "waiting",
    labels = {
      waiting: en ? "Waiting" : "รอเตรียม",
      doing: en ? "In progress" : "กำลังทำ",
      done: en ? "Completed" : "เสร็จแล้ว",
      cancelled: en ? "Cancelled" : "ยกเลิก",
    };
  let all = kitchenQueueSource().slice();
  all.sort((a, b) =>
    sort === "latest"
      ? (Date.parse(b.date || b.time) || 0) -
        (Date.parse(a.date || a.time) || 0)
      : (Date.parse(a.date || a.time) || 0) -
        (Date.parse(b.date || b.time) || 0),
  );
  const counts = (k) => all.filter((x) => statusOf(x) === k).length;
  let visible = all.filter(
    (o) =>
      !q ||
      String(o.id).includes(q) ||
      o.items.some((i) => (i.name || "").toLowerCase().includes(q)),
  );
  let selected = Number(db.kitchenSelected);
  if (!visible.some((o) => o.id === selected))
    selected = visible[0]?.id || all[0]?.id;
  db.kitchenSelected = selected;
  const ico = (type) =>
    ({
      clock:
        '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>',
      list: '<svg viewBox="0 0 24 24"><path d="M9 6h10M9 12h10M9 18h10"/><circle cx="5" cy="6" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="5" cy="18" r="1"/></svg>',
      box: '<svg viewBox="0 0 24 24"><path d="M4 7l8-4 8 4-8 4-8-4zm0 0v10l8 4 8-4V7M12 11v10"/></svg>',
      note: '<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg>',
      history:
        '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2-5.3L4 9M4 4v5h5"/><path d="M12 8v5l3 2"/></svg>',
      user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
    })[type] || "";
  const queue = visible
    .map((x) => {
      let st = statusOf(x),
        qty = x.items.reduce((a, i) => a + i.qty, 0);
      return `<button class="kqCard ${x.id === selected ? "selected" : ""}" onclick="kitchenSelect(${x.id})"><div class="kqTop"><b>#${formatOrderNumber(x.id)}</b><span class="kTime">${ico("clock")}${new Date(x.date || x.time || Date.now()).toLocaleTimeString(en ? "en-AU" : "th-TH", { hour: "2-digit", minute: "2-digit" })}</span><span class="kStatus ${st}">${labels[st]}</span><strong>${qty} ${en ? "items" : "ชิ้น"}</strong></div><div class="kqItems">${x.items
        .slice(0, 3)
        .map((i) => `<span>${i.name}<b>× ${i.qty}</b></span>`)
        .join(
          "",
        )}${x.items.length > 3 ? `<small>+${x.items.length - 3} ${en ? "more menus" : "เมนู"}</small>` : ""}</div></button>`;
    })
    .join("");
  const o = all.find((x) => x.id === selected);
  if (!o) {
    $("#orderTab").innerHTML =
      `<div class="emptyState">${en ? "Nothing to prepare" : "ไม่มีรายการที่ต้องเตรียม"}</div>`;
    return;
  }
  const st = kitchenState(o.id);
  if (o.status === "cancelled") {
    st.status = "cancelled";
    st.finishedAt = st.finishedAt || Date.parse(o.date || o.time) || Date.now();
  } else if (o.status === "paid") {
    st.status = "done";
    st.finishedAt = st.finishedAt || Date.parse(o.date || o.time) || Date.now();
  }
  const status = st.status,
    tab = db.kitchenTab || "steps";
  const baseSteps = en
    ? [
        "Prepare ingredients",
        "Prepare product / portion",
        "Bake or finish preparation",
        "Pack the order",
        "Final quality check",
      ]
    : [
        "เตรียมวัตถุดิบ",
        "เตรียมสินค้า / แบ่งส่วน",
        "อบหรือเตรียมสินค้าให้เสร็จ",
        "แพ็กออเดอร์",
        "ตรวจสอบความเรียบร้อย",
      ];
  const rows = baseSteps
    .map((s, i) => {
      let key = "s" + i,
        ck = !!st.steps[key];
      return `<div class="kStep ${ck ? "checked" : ""}"><label><span class="kDrag">⋮⋮</span><input type="checkbox" ${ck ? "checked" : ""} ${["done", "cancelled"].includes(status) ? "disabled" : ""} onchange="kitchenStep(${o.id},'${key}',this.checked)"><span>${i + 1}. ${s}</span><em>${[5, 10, 15, 5, 5][i]} ${en ? "min" : "นาที"}</em></label><details><summary>${en ? "Details" : "รายละเอียด"}⌄</summary><p>${en ? "Use the shop preparation note for this product and check quality before continuing." : "ทำตามข้อมูลการเตรียมของเมนูในร้าน และตรวจสอบความเรียบร้อยก่อนขั้นตอนถัดไป"}</p></details></div>`;
    })
    .join("");
  const custom = (st.customSteps || [])
    .map(
      (s, i) =>
        `<div class="kStep ${s.done ? "checked" : ""}"><label><span class="kDrag">⋮⋮</span><input type="checkbox" ${s.done ? "checked" : ""} ${["done", "cancelled"].includes(status) ? "disabled" : ""} onchange="kitchenCustomStep(${o.id},'${s.id}',this.checked)"><span>${baseSteps.length + i + 1}. ${s.name}</span></label></div>`,
    )
    .join("");
  const allStepCount = baseSteps.length + (st.customSteps || []).length,
    done =
      Object.values(st.steps || {}).filter(Boolean).length +
      (st.customSteps || []).filter((s) => s.done).length,
    pct = allStepCount ? Math.round((done / allStepCount) * 100) : 0;
  const productCards = o.items
    .map((i) => {
      let p =
        db.products.find((p) => p.id === (i.id || i.productId)) ||
        db.products.find((p) => p.name === i.name);
      return `<div class="kProd">${p?.image ? `<img src="${p.image}">` : `<div class="kProdBlank">${ico("box")}</div>`}<div class="kProdText"><b>${i.name}</b><small>${i.variant || ""}</small><strong>${i.qty}</strong><span>${en ? "items" : "ชิ้น"}</span></div></div>`;
    })
    .join("");
  const notes = o.items
    .map((i) => {
      let p =
        db.products.find((p) => p.id === (i.id || i.productId)) ||
        db.products.find((p) => p.name === i.name);
      return `<div class="kNote"><b>${i.name}</b><span>${i.ingredientNote ?? p?.prep ?? p?.desc ?? (en ? "Not specified yet" : "ยังไม่ได้ระบุ")}</span></div>`;
    })
    .join("");
  const started = st.startedAt || st.updated || o.time || Date.now();
  if (status === "doing" && !st.startedAt) {
    st.startedAt = Date.now();
    save();
  }
  const elapsed = Math.max(0, Date.now() - started),
    mins = Math.floor(elapsed / 60000),
    elapsedText =
      mins >= 60
        ? `${Math.floor(mins / 60)} ${en ? "hr" : "ชม."} ${mins % 60} ${en ? "min" : "นาที"}`
        : `${mins} ${en ? "min" : "นาที"}`;
  let panel = "";
  if (tab === "steps")
    panel = `<div class="kSteps">${rows}${custom}</div>${!["done", "cancelled"].includes(status) ? `<button class="kAddStep" onclick="kitchenAddStep(${o.id})">＋ ${en ? "Add preparation step" : "เพิ่มขั้นตอนการทำ"}</button>` : ""}<div class="kProgress"><div><i style="width:${pct}%"></i></div><span>${done}/${allStepCount} ${en ? "steps" : "ขั้นตอน"} · ${pct}%</span></div>`;
  else if (tab === "ingredients")
    panel = `<div class="kInfoPanel"><h3>${ico("box")}${en ? "Ingredients / preparation" : "วัตถุดิบ / การเตรียม"}</h3>${notes}</div>`;
  else if (tab === "notes")
    panel = `<div class="kInfoPanel"><h3>${ico("note")}${en ? "Special note" : "โน้ตพิเศษ"}</h3><p>${o.note || o.customerNote || (en ? "No special note" : "ไม่มีโน้ตพิเศษ")}</p></div>`;
  else
    panel = `<div class="kInfoPanel"><h3>${ico("history")}${en ? "Order history" : "ประวัติ"}</h3><div class="kHistoryLine"><b>${en ? "Order received" : "รับออเดอร์"}</b><span>${new Date(o.date || o.time || Date.now()).toLocaleString(en ? "en-AU" : "th-TH")}</span></div>${st.startedAt ? `<div class="kHistoryLine"><b>${en ? "Preparation started" : "เริ่มเตรียม"}</b><span>${new Date(st.startedAt).toLocaleString(en ? "en-AU" : "th-TH")}</span></div>` : ""}<div class="kHistoryLine"><b>${labels[status]}</b><span>${new Date(st.updated || Date.now()).toLocaleString(en ? "en-AU" : "th-TH")}</span></div></div>`;
  $("#orderTab").innerHTML =
    `<div class="kDash"><aside class="kQueue"><div class="kQueueTitle"><h2>${en ? "Orders to prepare" : "รายการที่ต้องเตรียม"}</h2><b>${all.length}</b></div><div class="kFilters five"><button class="${filter === "all" ? "on" : ""}" onclick="kitchenFilter('all')">${en ? "All" : "ทั้งหมด"} ${all.length}</button><button class="waiting ${filter === "waiting" ? "on" : ""}" onclick="kitchenFilter('waiting')">${en ? "Waiting" : "รอเตรียม"} ${counts("waiting")}</button><button class="doing ${filter === "doing" ? "on" : ""}" onclick="kitchenFilter('doing')">${en ? "Doing" : "กำลังทำ"} ${counts("doing")}</button><button class="done ${filter === "done" ? "on" : ""}" onclick="kitchenFilter('done')">${en ? "Done" : "เสร็จแล้ว"} ${counts("done")}</button><button class="cancelled ${filter === "cancelled" ? "on" : ""}" onclick="kitchenFilter('cancelled')">${en ? "Cancelled" : "ยกเลิก"} ${counts("cancelled")}</button></div><div class="kQueueTools"><input value="${(db.kitchenSearch || "").replace(/"/g, "&quot;")}" oninput="kitchenSearch(this.value)" placeholder="${en ? "Search order / menu..." : "ค้นหาเลขออเดอร์ / เมนู..."}"><select onchange="kitchenSort(this.value)"><option value="received" ${sort === "received" ? "selected" : ""}>${en ? "Received order" : "เรียงตามออเดอร์ที่ได้รับ"}</option><option value="latest" ${sort === "latest" ? "selected" : ""}>${en ? "Latest first" : "ล่าสุดก่อน"}</option></select></div><div class="kQueueList">${queue || `<div class="emptyState">${en ? "No orders" : "ไม่มีรายการ"}</div>`}</div></aside><section class="kWork"><div class="kWorkHead"><div><div class="kTitle"><h2>Order #${formatOrderNumber(o.id)}</h2><span class="kStatus ${status}">${labels[status]}</span></div><small>${new Date(o.date || o.time || Date.now()).toLocaleDateString(en ? "en-AU" : "th-TH")} · ${new Date(o.date || o.time || Date.now()).toLocaleTimeString(en ? "en-AU" : "th-TH", { hour: "2-digit", minute: "2-digit" })}</small></div><div class="kHeadStats"><div>${ico("clock")}<span>${en ? "Time used" : "เวลาที่ใช้"}<b>${elapsedText}</b></span></div><strong>${en ? "Total" : "ทั้งหมด"} ${o.items.reduce((a, i) => a + i.qty, 0)} ${en ? "items" : "ชิ้น"}</strong><button class="warm" type="button" onclick="event.preventDefault();event.stopPropagation();openKitchenPreview(${o.id})">${en ? "Print" : "พิมพ์ใบครัว"}</button></div></div><div class="kProductTitle">${en ? "Order items" : "รายการสินค้า"} (${o.items.length} ${en ? "menus" : "เมนู"})</div><div class="kProducts">${productCards}</div><div class="kTabs"><button class="${tab === "steps" ? "on" : ""}" onclick="kitchenTab('steps')">${ico("list")}${en ? "Preparation steps" : "ขั้นตอนการทำ"}</button><button class="${tab === "ingredients" ? "on" : ""}" onclick="kitchenTab('ingredients')">${ico("box")}${en ? "Ingredients" : "วัตถุดิบ"}</button><button class="${tab === "notes" ? "on" : ""}" onclick="kitchenTab('notes')">${ico("note")}${en ? "Special note" : "โน้ตพิเศษ"}</button><button class="${tab === "history" ? "on" : ""}" onclick="kitchenTab('history')">${ico("history")}${en ? "History" : "ประวัติ"}</button></div><div class="kDetailPanel">${panel}</div><div class="kInfoCards"><div>${ico("clock")}<span>${en ? "Estimated / used time" : "เวลาที่ใช้ทำโดยประมาณ"}<b>${elapsedText}</b></span></div><div>${ico("user")}<span>${en ? "Responsible employee" : "ผู้รับผิดชอบ"}<b>${db.currentUser?.name || db.currentUser?.displayName || db.currentUser || "-"}</b></span></div><div>${ico("note")}<span>${en ? "Customer note" : "หมายเหตุจากลูกค้า"}<b>${o.note || o.customerNote || "-"}</b></span></div></div><div class="kActions">${!["done", "cancelled"].includes(status) ? `<button class="kCancel" onclick="kitchenCancel(${o.id})">× ${en ? "Cancel order" : "ยกเลิกออเดอร์"}</button><button class="kDone" onclick="kitchenFinish(${o.id})">✓ ${en ? "Completed" : "เสร็จแล้ว"}</button>` : `<div class="kFinal ${status}">${status === "done" ? "✓" : "×"} ${labels[status]}</div>`}</div></section></div>`;
  save();
};

/* v5.65 — Kitchen reference redesign, preserving the existing POS data model */
(function () {
  const oldState = kitchenState;
  kitchenState = function (id) {
    const st = oldState(id);
    st.history = st.history || [];
    st.customSteps = st.customSteps || [];
    st.ingredients = st.ingredients || [];
    if (!st.history.length)
      st.history.push({ type: "received", at: st.receivedAt || Date.now() });
    return st;
  };
  function kLog(id, type) {
    const st = kitchenState(id);
    st.history.push({
      type,
      at: Date.now(),
      staff:
        db.currentUser?.name ||
        db.currentUser?.displayName ||
        db.currentUser ||
        "",
    });
    st.updated = Date.now();
  }
  window.kitchenStep = function (id, key, checked) {
    const st = kitchenState(id);
    st.steps[key] = !!checked;
    if (st.status === "waiting" && checked) {
      st.status = "doing";
      st.startedAt = st.startedAt || Date.now();
      kLog(id, "started");
    }
    kLog(id, checked ? "stepDone" : "stepUndo");
    save();
    renderKitchen();
  };
  window.kitchenCustomStep = function (id, key, checked) {
    const st = kitchenState(id),
      s = st.customSteps.find((x) => x.id === key);
    if (s) s.done = !!checked;
    if (st.status === "waiting" && checked) {
      st.status = "doing";
      st.startedAt = st.startedAt || Date.now();
      kLog(id, "started");
    }
    kLog(id, checked ? "stepDone" : "stepUndo");
    save();
    renderKitchen();
  };
  function kModal(html) {
    let m = document.getElementById("kitchenModal");
    if (!m) {
      m = document.createElement("div");
      m.id = "kitchenModal";
      m.className = "modal hidden";
      document.body.appendChild(m);
    }
    m.innerHTML = `<div class="modalBox kModalBox">${html}</div>`;
    m.classList.remove("hidden");
    m.onclick = (e) => {
      if (e.target === m) m.classList.add("hidden");
    };
  }
  window.kitchenCloseModal = () =>
    document.getElementById("kitchenModal")?.classList.add("hidden");
  window.kitchenAddStep = function (id) {
    const en = db.language === "en";
    kModal(
      `<button class="close" onclick="kitchenCloseModal()">×</button><h2>${en ? "Add preparation step" : "เพิ่มขั้นตอนการทำ"}</h2><div class="kModalForm"><label>${en ? "Step name" : "ชื่อขั้นตอน"}<input id="kStepName"></label><label>${en ? "Description" : "รายละเอียด"}<textarea id="kStepDesc"></textarea></label><label>${en ? "Estimated time" : "เวลาที่ใช้โดยประมาณ"}<input id="kStepTime" placeholder="${en ? "e.g. 10 min" : "เช่น 10 นาที"}"></label><label>${en ? "Optional note" : "หมายเหตุ (ไม่บังคับ)"}<input id="kStepNote"></label></div><div class="kModalActions"><button onclick="kitchenCloseModal()">${en ? "Cancel" : "ยกเลิก"}</button><button class="primary" onclick="kitchenSaveStep(${id})">${en ? "Save step" : "บันทึกขั้นตอน"}</button></div>`,
    );
  };
  window.kitchenSaveStep = function (id) {
    const name = document.getElementById("kStepName")?.value.trim();
    if (!name) return;
    const st = kitchenState(id);
    st.customSteps.push({
      id: "c" + Date.now(),
      name,
      desc: document.getElementById("kStepDesc").value.trim(),
      time: document.getElementById("kStepTime").value.trim(),
      note: document.getElementById("kStepNote").value.trim(),
      done: false,
    });
    kLog(id, "stepAdded");
    save();
    kitchenCloseModal();
    renderKitchen();
  };
  window.kitchenConfirm = function (id, type) {
    const en = db.language === "en",
      cancel = type === "cancel";
    kModal(
      `<div class="kConfirmIcon ${cancel ? "red" : "green"}">${cancel ? "×" : "✓"}</div><h2>${cancel ? (en ? "Cancel this order?" : "ยืนยันยกเลิกออเดอร์?") : en ? "Complete this order?" : "ยืนยันออเดอร์เสร็จแล้ว?"}</h2><p>${cancel ? (en ? "The kitchen status will be changed to Cancelled." : "สถานะในครัวจะเปลี่ยนเป็นยกเลิก") : en ? "The kitchen status will be changed to Completed." : "สถานะในครัวจะเปลี่ยนเป็นเสร็จแล้ว"}</p><div class="kModalActions"><button onclick="kitchenCloseModal()">${en ? "Back" : "กลับ"}</button><button class="${cancel ? "danger" : "success"}" onclick="kitchenApplyStatus(${id},'${type}')">${cancel ? (en ? "Cancel order" : "ยืนยันยกเลิก") : en ? "Complete" : "ยืนยันเสร็จแล้ว"}</button></div>`,
    );
  };
  window.kitchenApplyStatus = function (id, type) {
    const st = kitchenState(id);
    st.status = type === "cancel" ? "cancelled" : "done";
    st.finishedAt = Date.now();
    kLog(id, st.status);
    // v5.72: after completing an order, immediately advance to the next active kitchen order.
    if (type === "done") {
      const wf = kitchenStore();
      const active = kitchenQueueSource()
        .filter(
          (o) =>
            String(o.id) !== String(id) &&
            !["done", "cancelled"].includes(wf[o.id]?.status || "waiting") &&
            o.status !== "paid" &&
            o.status !== "cancelled",
        )
        .slice();
      active.sort(
        (a, b) =>
          (Date.parse(a.date || a.time) || 0) -
          (Date.parse(b.date || b.time) || 0),
      );
      if (active.length) {
        db.kitchenSelected = active[0].id;
        db.kitchenFilter = "all";
      }
    }
    save();
    kitchenCloseModal();
    renderKitchen();
  };
  window.kitchenFinish = (id) => kitchenConfirm(id, "done");
  window.kitchenCancel = (id) => kitchenConfirm(id, "cancel");
  window.kitchenMobileBack = function () {
    document.querySelector(".kDash")?.classList.remove("mobile-detail");
  };
  const oldSelect = window.kitchenSelect;
  window.kitchenSelect = function (id) {
    oldSelect(id);
    requestAnimationFrame(() =>
      document.querySelector(".kDash")?.classList.add("mobile-detail"),
    );
  };

  window.kitchenEditBaseStep = function (id, key, idx) {
    const en = db.language === "en",
      st = kitchenState(id),
      ed = st.stepEdits?.[key] || {};
    kModal(
      `<button class="close" onclick="kitchenCloseModal()">×</button><h2>${en ? "Edit preparation step" : "แก้ไขขั้นตอนการทำ"}</h2><div class="kModalForm"><label>${en ? "Step name" : "ชื่อขั้นตอน"}<input id="kEditName" value="${(ed.name || "").replace(/"/g, "&quot;")}"></label><label>${en ? "Description" : "รายละเอียด"}<textarea id="kEditDesc">${ed.desc || ""}</textarea></label><label>${en ? "Estimated time" : "เวลาที่ใช้โดยประมาณ"}<input id="kEditTime" value="${(ed.time || "").replace(/"/g, "&quot;")}"></label></div><div class="kModalActions"><button onclick="kitchenCloseModal()">${en ? "Cancel" : "ยกเลิก"}</button><button class="primary" onclick="kitchenSaveBaseStep(${id},'${key}',${idx})">${en ? "Save" : "บันทึก"}</button></div>`,
    );
  };
  window.kitchenSaveBaseStep = function (id, key, idx) {
    const st = kitchenState(id);
    st.stepEdits = st.stepEdits || {};
    st.stepEdits[key] = {
      name: document.getElementById("kEditName").value.trim(),
      desc: document.getElementById("kEditDesc").value.trim(),
      time: document.getElementById("kEditTime").value.trim(),
    };
    save();
    kitchenCloseModal();
    renderKitchen();
  };
  window.kitchenDeleteBaseStep = function (id, key) {
    const st = kitchenState(id);
    st.deletedSteps = st.deletedSteps || {};
    st.deletedSteps[key] = true;
    save();
    renderKitchen();
  };
  window.kitchenEditCustomStep = function (id, key) {
    const en = db.language === "en",
      st = kitchenState(id),
      x = st.customSteps.find((s) => s.id === key);
    if (!x) return;
    kModal(
      `<button class="close" onclick="kitchenCloseModal()">×</button><h2>${en ? "Edit preparation step" : "แก้ไขขั้นตอนการทำ"}</h2><div class="kModalForm"><label>${en ? "Step name" : "ชื่อขั้นตอน"}<input id="kEditName" value="${x.name.replace(/"/g, "&quot;")}"></label><label>${en ? "Description" : "รายละเอียด"}<textarea id="kEditDesc">${x.desc || ""}</textarea></label><label>${en ? "Estimated time" : "เวลาที่ใช้โดยประมาณ"}<input id="kEditTime" value="${x.time || ""}"></label></div><div class="kModalActions"><button onclick="kitchenCloseModal()">${en ? "Cancel" : "ยกเลิก"}</button><button class="primary" onclick="kitchenSaveCustomStep(${id},'${key}')">${en ? "Save" : "บันทึก"}</button></div>`,
    );
  };
  window.kitchenSaveCustomStep = function (id, key) {
    const x = kitchenState(id).customSteps.find((s) => s.id === key);
    if (x) {
      x.name = document.getElementById("kEditName").value.trim();
      x.desc = document.getElementById("kEditDesc").value.trim();
      x.time = document.getElementById("kEditTime").value.trim();
    }
    save();
    kitchenCloseModal();
    renderKitchen();
  };
  window.kitchenDeleteCustomStep = function (id, key) {
    const st = kitchenState(id);
    st.customSteps = st.customSteps.filter((s) => s.id !== key);
    save();
    renderKitchen();
  };
  window.kitchenEditIngredients = function (id) {
    const en = db.language === "en",
      o = kitchenQueueSource().find((x) => String(x.id) === String(id));
    if (!o) return;
    const vals = o.items
      .map((i) => {
        const p =
          db.products.find((p) => p.id === (i.id || i.productId)) ||
          db.products.find((p) => p.name === i.name);
        return `${i.name}: ${i.ingredientNote ?? p?.prep ?? p?.desc ?? ""}`;
      })
      .join("\n");
    kModal(
      `<button class="close" onclick="kitchenCloseModal()">×</button><h2>${en ? "Edit ingredients" : "แก้ไขวัตถุดิบ"}</h2><div class="kModalForm"><label>${en ? "One line per product: Product: ingredients" : "หนึ่งบรรทัดต่อสินค้า: ชื่อสินค้า: วัตถุดิบ"}<textarea id="kIngEdit">${vals}</textarea></label></div><div class="kModalActions"><button onclick="kitchenCloseModal()">${en ? "Cancel" : "ยกเลิก"}</button><button class="primary" onclick="kitchenSaveIngredients(${id})">${en ? "Save" : "บันทึก"}</button></div>`,
    );
  };
  window.kitchenSaveIngredients = function (id) {
    const lines = document.getElementById("kIngEdit").value.split("\n"),
      updates = {};
    lines.forEach((line) => {
      const n = line.indexOf(":");
      if (n < 0) return;
      updates[line.slice(0, n).trim()] = line.slice(n + 1).trim();
    });
    const apply = (o) => {
      if (!o || String(o.id ?? o.orderNo) !== String(id)) return;
      (o.items || []).forEach((i) => {
        if (Object.prototype.hasOwnProperty.call(updates, i.name))
          i.ingredientNote = updates[i.name];
      });
    };
    (db.orders || []).forEach(apply);
    (db.held || []).forEach(apply);
    Object.entries(updates).forEach(([name, val]) => {
      const product = db.products.find((p) => p.name === name);
      if (product) product.prep = val;
    });
    save();
    kitchenCloseModal();
    renderKitchen();
  };
  window.kitchenDeleteIngredients = function (id) {
    const o = db.orders.find((x) => x.id === id);
    o?.items.forEach((i) => {
      const p =
        db.products.find((p) => p.id === (i.id || i.productId)) ||
        db.products.find((p) => p.name === i.name);
      if (p) p.prep = "";
    });
    save();
    renderKitchen();
  };
  window.kitchenEditNote = function (id) {
    const en = db.language === "en",
      o = db.orders.find((x) => x.id === id);
    if (!o) return;
    kModal(
      `<button class="close" onclick="kitchenCloseModal()">×</button><h2>${en ? "Edit special note" : "แก้ไขโน้ตพิเศษ"}</h2><div class="kModalForm"><textarea id="kNoteEdit">${o.note || o.customerNote || ""}</textarea></div><div class="kModalActions"><button onclick="kitchenCloseModal()">${en ? "Cancel" : "ยกเลิก"}</button><button class="primary" onclick="kitchenSaveNote(${id})">${en ? "Save" : "บันทึก"}</button></div>`,
    );
  };
  window.kitchenSaveNote = function (id) {
    const o = db.orders.find((x) => x.id === id);
    if (o) o.note = document.getElementById("kNoteEdit").value.trim();
    save();
    kitchenCloseModal();
    renderKitchen();
  };
  window.kitchenDeleteNote = function (id) {
    const o = db.orders.find((x) => x.id === id);
    if (o) {
      o.note = "";
      o.customerNote = "";
    }
    save();
    renderKitchen();
  };
  renderKitchen = function () {
    const en = db.language === "en",
      wf = kitchenStore(),
      filter = db.kitchenFilter || "all",
      q = (db.kitchenSearch || "").trim().toLowerCase(),
      sort = db.kitchenSort || "received";
    const statusOf = (o) =>
        o.status === "cancelled"
          ? "cancelled"
          : o.status === "paid"
            ? "done"
            : wf[o.id]?.status || "waiting",
      labels = {
        waiting: en ? "Waiting" : "รอเตรียม",
        doing: en ? "Preparing" : "กำลังทำ",
        done: en ? "Completed" : "เสร็จแล้ว",
        cancelled: en ? "Cancelled" : "ยกเลิก",
      };
    let all = db.orders
      .filter((o) => o.status === "paid" || o.status === "cancelled")
      .slice();
    // v5.70: keep active kitchen work first; completed/cancelled automatically move to the bottom.
    // Within each group preserve the selected time ordering so the next live order naturally takes priority.
    all.sort((a, b) => {
      const sa = statusOf(a),
        sb = statusOf(b),
        ta = ["done", "cancelled"].includes(sa) ? 1 : 0,
        tb = ["done", "cancelled"].includes(sb) ? 1 : 0;
      if (ta !== tb) return ta - tb;
      return sort === "latest"
        ? (Date.parse(b.date || b.time) || 0) -
            (Date.parse(a.date || a.time) || 0)
        : (Date.parse(a.date || a.time) || 0) -
            (Date.parse(b.date || b.time) || 0);
    });
    const counts = (k) => all.filter((x) => statusOf(x) === k).length;
    let visible = all.filter(
      (o) =>
        !q ||
        String(o.id).includes(q) ||
        o.items.some((i) => (i.name || "").toLowerCase().includes(q)),
    );
    let selected = String(db.kitchenSelected ?? "");
    if (!all.some((o) => String(o.id) === selected))
      selected = String(visible[0]?.id ?? all[0]?.id ?? "");
    db.kitchenSelected = selected;
    const o = all.find((x) => String(x.id) === selected);
    const icon = (t) =>
      ({
        clock:
          '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>',
        list: '<svg viewBox="0 0 24 24"><path d="M9 6h10M9 12h10M9 18h10"/><circle cx="5" cy="6" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="5" cy="18" r="1"/></svg>',
        box: '<svg viewBox="0 0 24 24"><path d="M4 7l8-4 8 4-8 4-8-4zm0 0v10l8 4 8-4V7M12 11v10"/></svg>',
        note: '<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg>',
        history:
          '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2-5.3L4 9M4 4v5h5"/><path d="M12 8v5l3 2"/></svg>',
        user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
        search:
          '<svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg>',
      })[t] || "";
    const queue = visible
      .map((x) => {
        const st = statusOf(x),
          qty = x.items.reduce((a, i) => a + i.qty, 0),
          thumbs = x.items
            .slice(0, 3)
            .map((i) => {
              const p =
                  db.products.find((p) => p.id === (i.id || i.productId)) ||
                  db.products.find((p) => p.name === i.name),
                src = p?.img || p?.image || i.img || "";
              return src ? `<img src="${src}" alt="">` : "";
            })
            .join("");
        return `<button class="kqCard ${x.id === selected ? "selected" : ""}" onclick="kitchenSelect(${x.id})"><div class="kqTop"><b>#${formatOrderNumber(x.id)}</b><span class="kTime">${icon("clock")}${new Date(x.date || x.time || Date.now()).toLocaleTimeString(en ? "en-AU" : "th-TH", { hour: "2-digit", minute: "2-digit" })}</span><span class="kStatus ${st}">${labels[st]}</span><strong>${qty} ${en ? "items" : "ชิ้น"}</strong></div><div class="kqContent"><div class="kThumbs">${thumbs}</div><div class="kqItems">${x.items
          .slice(0, 2)
          .map((i) => `<span>${i.name}<b>× ${i.qty}</b></span>`)
          .join(
            "",
          )}${x.items.length > 2 ? `<small>+${x.items.length - 2} ${en ? "more menus" : "เมนู"}</small>` : ""}</div><i>›</i></div></button>`;
      })
      .join("");
    if (!o) {
      document.getElementById("orderTab").innerHTML =
        `<div class="emptyState">${en ? "Nothing to prepare" : "ไม่มีรายการที่ต้องเตรียม"}</div>`;
      return;
    }
    const st = kitchenState(o.id);
    if (o.status === "cancelled") st.status = "cancelled";
    else if (o.status === "paid") st.status = "done";
    const status = st.status,
      tab = db.kitchenTab === "history" ? "history" : "ingredients";
    db.kitchenTab = tab;
    st.stepEdits = st.stepEdits || {};
    st.deletedSteps = st.deletedSteps || {};
    const base = en
      ? [
          "Prepare ingredients",
          "Mix ingredients / dough",
          "Shape or portion",
          "Rest / proof",
          "Bake / cook",
          "Cool and final check",
        ]
      : [
          "เตรียมวัตถุดิบ",
          "ผสมวัตถุดิบ / แป้ง",
          "ขึ้นรูปหรือแบ่งส่วน",
          "พักแป้ง / พักส่วนผสม",
          "อบ / ปรุง",
          "พักให้เย็นและตรวจสอบ",
        ];
    const times = [
      "5 " + (en ? "min" : "นาที"),
      "10 " + (en ? "min" : "นาที"),
      "10 " + (en ? "min" : "นาที"),
      "2 " + (en ? "hr" : "ชั่วโมง"),
      "40 " + (en ? "min" : "นาที"),
      "30 " + (en ? "min" : "นาที"),
    ];
    const rows = base
      .map((name, i) => {
        const key = "s" + i;
        if (st.deletedSteps[key]) return "";
        const ed = st.stepEdits[key] || {},
          s = ed.name || name,
          tm = ed.time || times[i],
          desc =
            ed.desc ||
            (en
              ? "Follow the preparation information saved for this product."
              : "ทำตามข้อมูลการเตรียมที่บันทึกไว้สำหรับเมนูนี้"),
          ck = !!st.steps[key];
        return `<div class="kStep ${ck ? "checked" : ""}"><label><span class="kDrag">⠿</span><input type="checkbox" ${ck ? "checked" : ""} ${["done", "cancelled"].includes(status) ? "disabled" : ""} onchange="kitchenStep(${o.id},'${key}',this.checked)"><span>${i + 1}. ${s}</span><em>${tm}</em><span class="kRowActions"><button type="button" onclick="event.preventDefault();event.stopPropagation();kitchenEditBaseStep(${o.id},'${key}',${i})">✎</button><button type="button" class="del" onclick="event.preventDefault();event.stopPropagation();kitchenDeleteBaseStep(${o.id},'${key}')">×</button></span></label><div class="kStepDesc">${desc}</div></div>`;
      })
      .join("");
    const custom = st.customSteps
      .map(
        (s, i) =>
          `<div class="kStep ${s.done ? "checked" : ""}"><label><span class="kDrag">⠿</span><input type="checkbox" ${s.done ? "checked" : ""} ${["done", "cancelled"].includes(status) ? "disabled" : ""} onchange="kitchenCustomStep(${o.id},'${s.id}',this.checked)"><span>${base.length + i + 1}. ${s.name}</span><em>${s.time || ""}</em><span class="kRowActions"><button type="button" onclick="event.preventDefault();event.stopPropagation();kitchenEditCustomStep(${o.id},'${s.id}')">✎</button><button type="button" class="del" onclick="event.preventDefault();event.stopPropagation();kitchenDeleteCustomStep(${o.id},'${s.id}')">×</button></span></label>${s.desc || s.note ? `<div class="kStepDesc">${s.desc || ""}${s.note ? `<small>${s.note}</small>` : ""}</div>` : ""}</div>`,
      )
      .join("");
    const products = o.items
      .map((i) => {
        const p =
            db.products.find((p) => p.id === (i.id || i.productId)) ||
            db.products.find((p) => p.name === i.name),
          src = p?.img || p?.image || i.img || "";
        return `<div class="kProd">${src ? `<img src="${src}" alt="">` : `<div class="kProdBlank">${icon("box")}</div>`}<div class="kProdText"><b>${i.name}</b><small>${i.variant || ""}</small><strong>${i.qty}</strong><span>${en ? "items" : "ชิ้น"}</span></div></div>`;
      })
      .join("");
    const notes = o.items
      .map((i) => {
        const p =
          db.products.find((p) => p.id === (i.id || i.productId)) ||
          db.products.find((p) => p.name === i.name);
        return `<div class="kNote"><b>${i.name}</b><span>${i.ingredientNote ?? p?.prep ?? p?.desc ?? (en ? "Not specified yet" : "ยังไม่ได้ระบุ")}</span></div>`;
      })
      .join("");
    const received = Date.parse(o.date || o.time) || Date.now(),
      start = st.startedAt || received,
      endAt = st.finishedAt || Date.now(),
      elapsed = Math.max(0, endAt - start),
      elapsedText = kitchenClockText(elapsed);
    const histLabel = {
      received: en ? "Order received" : "รับออเดอร์",
      started: en ? "Preparation started" : "เริ่มเตรียม",
      stepDone: en ? "Preparation step completed" : "ทำขั้นตอนเสร็จ",
      stepUndo: en ? "Step unchecked" : "ยกเลิกติ๊กขั้นตอน",
      stepAdded: en ? "Preparation step added" : "เพิ่มขั้นตอนการทำ",
      done: en ? "Completed" : "เสร็จแล้ว",
      cancelled: en ? "Cancelled" : "ยกเลิก",
    };
    let panel =
      tab === "ingredients"
        ? `<div class="kInfoPanel"><div class="kPanelHead"><h3>${icon("box")}${en ? "Ingredients" : "วัตถุดิบ"}</h3><div><button onclick="kitchenEditIngredients(${o.id})">✎ ${en ? "Edit" : "แก้ไข"}</button><button class="del" onclick="kitchenDeleteIngredients(${o.id})">× ${en ? "Delete" : "ลบ"}</button></div></div>${notes || `<div class="kEmpty">${en ? "No ingredient information" : "ยังไม่มีข้อมูลวัตถุดิบ"}</div>`}</div>`
        : `<div class="kInfoPanel"><h3>${icon("history")}${en ? "History" : "ประวัติ"}</h3><div class="kTimeline">${st.history.map((h) => `<div><i></i><span><b>${histLabel[h.type] || h.type}</b><small>${new Date(h.at).toLocaleString(en ? "en-AU" : "th-TH")}${h.staff ? " · " + h.staff : ""}</small></span></div>`).join("")}</div></div>`;
    document.getElementById("orderTab").innerHTML =
      `<div class="kDash"><aside class="kQueue"><div class="kQueueTitle"><h2>${en ? "Orders to prepare" : "รายการที่ต้องเตรียม"}</h2><b>${all.length}</b></div><div class="kQueueTools"><label>${icon("search")}<input value="${(db.kitchenSearch || "").replace(/"/g, "&quot;")}" oninput="kitchenSearch(this.value)" placeholder="${en ? "Search order / menu..." : "ค้นหาเลขออเดอร์ / เมนู..."}"></label><select onchange="kitchenSort(this.value)"><option value="received" ${sort === "received" ? "selected" : ""}>${en ? "Received order" : "เรียงตามออเดอร์ที่ได้รับ"}</option><option value="latest" ${sort === "latest" ? "selected" : ""}>${en ? "Latest first" : "ล่าสุดก่อน"}</option></select></div><div class="kQueueList">${queue || `<div class="emptyState">${en ? "No orders" : "ไม่มีรายการ"}</div>`}</div></aside><section class="kWork"><button class="kMobileBack" onclick="kitchenMobileBack()">‹ ${en ? "Orders" : "รายการออเดอร์"}</button><div class="kWorkHead"><div><div class="kTitle"><h2>Order #${formatOrderNumber(o.id)}</h2><span class="kStatus ${status}">${labels[status]}</span></div></div><div class="kHeadStats"><div>${icon("box")}<span>${en ? "Total" : "ทั้งหมด"}<b>${o.items.reduce((a, i) => a + i.qty, 0)} ${en ? "items" : "ชิ้น"}</b></span></div></div></div><div class="kRightStack"><div class="kItemsPane"><div class="kProductTitle">${en ? "Order items" : "รายการสินค้า"} (${o.items.length} ${en ? "menus" : "เมนู"})</div><div class="kProducts">${products}</div></div><div class="kDetailPane"><div class="kTabs"><button class="${tab === "ingredients" ? "on" : ""}" onclick="kitchenTab('ingredients')">${icon("box")}${en ? "Ingredients" : "วัตถุดิบ"}</button><button class="${tab === "history" ? "on" : ""}" onclick="kitchenTab('history')">${icon("history")}${en ? "History" : "ประวัติ"}</button></div><div class="kDetailPanel">${panel}</div></div></div><div class="kInfoCards"><div>${icon("user")}<span>${en ? "Responsible employee" : "ผู้รับผิดชอบ"}<b>${db.currentUser?.name || db.currentUser?.displayName || db.currentUser || "-"}</b></span></div><div>${icon("note")}<span>${en ? "Customer note" : "หมายเหตุจากลูกค้า"}<b>${o.note || o.customerNote || "-"}</b></span></div></div><div class="kActions">${!["done", "cancelled"].includes(status) ? `<button class="kCancel" onclick="kitchenCancel(${o.id})">× ${en ? "Cancel order" : "ยกเลิกออเดอร์"}</button><button class="kDone" onclick="kitchenFinish(${o.id})">✓ ${en ? "Completed" : "เสร็จแล้ว"}</button>` : `<div class="kFinal ${status}">${status === "done" ? "✓" : "×"} ${labels[status]}</div>`}</div></section></div>`;
    save();
  };
})();

/* v5.68 — live kitchen stopwatch + stable tab scroll */
function kitchenClockText(ms) {
  const total = Math.max(0, Math.floor(ms / 1000)),
    h = Math.floor(total / 3600),
    m = Math.floor((total % 3600) / 60),
    s = total % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}
function updateKitchenClocks() {
  document.querySelectorAll(".kLiveTimer").forEach((el) => {
    const start = Number(el.dataset.start) || Date.now(),
      end = Number(el.dataset.end) || Date.now();
    el.textContent = kitchenClockText(end - start);
  });
}
setInterval(updateKitchenClocks, 1000);
const _kitchenTabV568 = window.kitchenTab;
window.kitchenTab = function (tab) {
  const work = document.querySelector(".kWork"),
    pageY = window.scrollY,
    top = work?.scrollTop || 0;
  db.kitchenTab = tab;
  save();
  renderKitchen();
  requestAnimationFrame(() => {
    const w = document.querySelector(".kWork");
    if (w) w.scrollTop = top;
    window.scrollTo({ top: pageY, left: 0, behavior: "auto" });
    updateKitchenClocks();
  });
};

/* v5.69 — smooth Kitchen interactions: stable search, checkbox and scroll */
(function () {
  let kitchenSearchTimer = null;
  window.kitchenSearch = function (v) {
    db.kitchenSearch = v;
    clearTimeout(kitchenSearchTimer);
    kitchenSearchTimer = setTimeout(() => {
      const pageY = window.scrollY;
      const qScroll = document.querySelector(".kQueueList")?.scrollTop || 0;
      const wScroll = document.querySelector(".kWork")?.scrollTop || 0;
      save();
      renderKitchen();
      requestAnimationFrame(() => {
        const inp = document.querySelector(".kQueueTools input");
        if (inp) {
          inp.focus({ preventScroll: true });
          const n = inp.value.length;
          try {
            inp.setSelectionRange(n, n);
          } catch (e) {}
        }
        const q = document.querySelector(".kQueueList"),
          w = document.querySelector(".kWork");
        if (q) q.scrollTop = qScroll;
        if (w) w.scrollTop = wScroll;
        window.scrollTo({ top: pageY, left: 0, behavior: "auto" });
        updateKitchenClocks();
      });
    }, 220);
  };
  function stableKitchenAction(action) {
    const pageY = window.scrollY,
      qScroll = document.querySelector(".kQueueList")?.scrollTop || 0,
      wScroll = document.querySelector(".kWork")?.scrollTop || 0;
    action();
    requestAnimationFrame(() => {
      const q = document.querySelector(".kQueueList"),
        w = document.querySelector(".kWork");
      if (q) q.scrollTop = qScroll;
      if (w) w.scrollTop = wScroll;
      window.scrollTo({ top: pageY, left: 0, behavior: "auto" });
      updateKitchenClocks();
    });
  }
  window.kitchenStep = function (id, key, checked) {
    stableKitchenAction(() => {
      const st = kitchenState(id);
      st.steps[key] = !!checked;
      if (st.status === "waiting" && checked) {
        st.status = "doing";
        st.startedAt = st.startedAt || Date.now();
        if (typeof kLog === "function") kLog(id, "started");
      }
      if (typeof kLog === "function")
        kLog(id, checked ? "stepDone" : "stepUndo");
      save();
      renderKitchen();
    });
  };
  window.kitchenCustomStep = function (id, key, checked) {
    stableKitchenAction(() => {
      const st = kitchenState(id),
        s = st.customSteps.find((x) => x.id === key);
      if (s) s.done = !!checked;
      if (st.status === "waiting" && checked) {
        st.status = "doing";
        st.startedAt = st.startedAt || Date.now();
        if (typeof kLog === "function") kLog(id, "started");
      }
      if (typeof kLog === "function")
        kLog(id, checked ? "stepDone" : "stepUndo");
      save();
      renderKitchen();
    });
  };
})();

// File choosers open only from explicit user gestures.
$("#chooseShopLogo").onclick = () => $("#shopLogoInput").click();
$("#chooseQrImage").onclick = () => $("#qrImageInput").click();

// v5.78 global language switch
// Language controls are initialized by i18n.js after this script.

/* ===== v5.83 workflow refinements ===== */
function kitchenQueueSource() {
  const paidOrCancelled = (db.orders || []).filter(
    (o) => o.status === "paid" || o.status === "cancelled",
  );
  const existing = new Set(paidOrCancelled.map((o) => String(o.id)));
  const held = (db.held || [])
    .filter((h) => !existing.has(String(h.orderNo)))
    .map((h) => ({
      id: h.orderNo,
      date: h.time,
      time: h.time,
      localDate: h.localDate,
      staff: h.staff || "",
      status: "kitchen_pending",
      items: structuredClone(h.items || []),
      note: h.note || "",
      customerNote: h.note || "",
      isPreorder: !!h.isPreorder,
      preorderId: h.preorderId,
      _fromHeld: true,
    }));
  return [...paidOrCancelled, ...held];
}
// Kitchen selection accepts both normal and held/pre-order queue IDs.
window.kitchenSelect = function (id) {
  db.kitchenSelected = String(id);
  save();
  renderKitchen();
  requestAnimationFrame(() =>
    document.querySelector(".kDash")?.classList.add("mobile-detail"),
  );
};
/* v5.91 — preorder numeric phone, kitchen completion cleanup, complete product-sales list */
(function () {
  // Phone field: numbers only, including pasted values.
  function bindPrePhoneNumeric() {
    const el = document.getElementById("prePhone");
    if (!el || el.dataset.numericOnly === "1") return;
    el.dataset.numericOnly = "1";
    el.setAttribute("inputmode", "numeric");
    el.setAttribute("pattern", "[0-9]*");
    el.addEventListener("input", () => {
      const v = el.value.replace(/\D+/g, "");
      if (el.value !== v) el.value = v;
    });
  }
  const _openPreorderV591 = window.openPreorder || openPreorder;
  openPreorder = function (existing = null) {
    _openPreorderV591(existing);
    bindPrePhoneNumeric();
  };
  window.openPreorder = openPreorder;
  document.addEventListener("DOMContentLoaded", bindPrePhoneNumeric, {
    once: true,
  });

  // Kitchen: completed orders keep their frozen timer, but no redundant "Completed" status badge/final label.
  const _renderKitchenV591 = renderKitchen;
  renderKitchen = function () {
    _renderKitchenV591();
    document.querySelectorAll(".kStatus.done").forEach((el) => el.remove());
    document.querySelectorAll(".kFinal.done").forEach((el) => el.remove());
  };

  // Reports: always show every product currently available on Sell, split into Full/Half rows once each.
  const _renderPastV591 = renderPast;
  renderPast = function () {
    _renderPastV591();
    const host = document.getElementById("productSales");
    const dateInput = document.getElementById("reportDate");
    if (!host || !dateInput) return;
    const key = dateInput.value,
      en = db.language === "en";
    const paid = (db.orders || []).filter(
      (o) =>
        (o.localDate || dateKey(o.date)) === key &&
        o.status !== "cancelled" &&
        o.method !== "cancelled",
    );
    const sold = new Map();
    paid.forEach((o) =>
      (o.items || []).forEach((i) => {
        const half = /half|ครึ่ง/i.test(i.variant || "");
        const k = String(i.id) + "|" + (half ? "half" : "full");
        const r = sold.get(k) || { qty: 0, total: 0 };
        r.qty += +i.qty || 0;
        r.total += (+i.qty || 0) * (+i.price || 0);
        sold.set(k, r);
      }),
    );
    const rows = [];
    (db.products || [])
      .filter((p) => p.enabled !== false)
      .forEach((p) => {
        const full = sold.get(String(p.id) + "|full") || { qty: 0, total: 0 };
        rows.push({
          id: p.id,
          kind: "full",
          name: p.name,
          variant: en ? "Full loaf" : "เต็มโลฟ",
          img: p.img || p.image || "",
          qty: full.qty,
          total: full.total,
        });
        if (p.half != null) {
          const half = sold.get(String(p.id) + "|half") || { qty: 0, total: 0 };
          rows.push({
            id: p.id,
            kind: "half",
            name: p.name,
            variant: en ? "Half loaf" : "ครึ่งโลฟ",
            img: p.halfImg || p.img || p.image || "",
            qty: half.qty,
            total: half.total,
          });
        }
      });
    rows.sort(
      (a, b) =>
        b.qty - a.qty || b.total - a.total || a.name.localeCompare(b.name),
    );
    const totalQty = rows.reduce((n, r) => n + r.qty, 0),
      maxQty = Math.max(1, ...rows.map((r) => r.qty));
    host.innerHTML = `<section class="bestSellerPanel productSalesComplete"><div class="bestSellerHead"><div><span>${en ? "PRODUCT SALES" : "ยอดขายสินค้า"}</span><h3>${en ? "All Sell-menu products" : "เมนูทั้งหมดในหน้าขาย"}</h3><p>${en ? "Full and half loaves are counted separately. Items with no sales remain visible." : "แยกยอดเต็มโลฟและครึ่งโลฟ และเมนูที่ยังไม่มียอดขายยังแสดงอยู่"}</p></div><div class="rankTotal"><small>${en ? "Items sold" : "ขายทั้งหมด"}</small><b>${totalQty}</b></div></div><div class="bestSellerTable"><div class="bestSellerRow bestSellerTH"><span>#</span><span>${en ? "Product" : "สินค้า"}</span><span>${en ? "Qty sold" : "จำนวนที่ขาย"}</span><span>${en ? "Sales" : "ยอดขาย"}</span><span>${en ? "Share" : "สัดส่วน"}</span></div>${rows
      .map((r, i) => {
        const pct = totalQty ? (r.qty / totalQty) * 100 : 0;
        return `<div class="bestSellerRow"><span class="rankNo ${i < 3 && r.qty > 0 ? "top" : ""}">${i + 1}</span><span class="rankProduct">${r.img ? `<img src="${r.img}" alt="">` : ""}<span><b>${r.name}</b><small>${r.variant}</small></span></span><strong>${r.qty}</strong><b>${money(r.total)}</b><span class="rankShare"><i><em style="width:${(r.qty / maxQty) * 100}%"></em></i><small>${pct.toFixed(1)}%</small></span></div>`;
      })
      .join("")}</div></section>`;
  };
})();

new MutationObserver(updatePageLock).observe(document.body, {
  subtree: true,
  childList: true,
  attributes: true,
  attributeFilter: ["class"],
});
document.addEventListener("click", () => setTimeout(updatePageLock, 0), true);

/* v6.30 — STANDALONE DOCUMENT PREVIEW (no legacy print dependency) */
(function () {
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[m],
    );
  const en = () => db.language === "en";
  window.addEventListener("afterprint", () =>
    document.documentElement.classList.remove("browserNativePrint631"),
  );
  function closeDocPreview() {
    document.getElementById("docPreview630")?.remove();
    document.body.classList.remove("docPreviewOpen");
  }
  function showDocPreview(title, body) {
    closeDocPreview();
    const x = document.createElement("div");
    x.id = "docPreview630";
    x.className = "docPreview630";
    x.innerHTML = `<section class="docCard630"><header><div><small>${en() ? "DOCUMENT PREVIEW" : "ตัวอย่างเอกสาร"}</small><h2>${esc(title)}</h2></div><button type="button" class="docClose630">×</button></header><main><div class="docPaper630">${body}</div></main><footer><button type="button" class="docCloseBtn630">${en() ? "Close" : "ปิด"}</button><button type="button" class="docNativePrint631">${en() ? "Print" : "พิมพ์"}</button></footer></section>`;
    document.body.appendChild(x);
    document.body.classList.add("docPreviewOpen");
    x.querySelector(".docClose630").onclick = closeDocPreview;
    x.querySelector(".docCloseBtn630").onclick = closeDocPreview;
    x.querySelector(".docNativePrint631").onclick = function () {
      /* IMPORTANT: direct user click -> browser-owned print UI. No printer SDK, iframe, popup or auto-print. */
      document.documentElement.classList.add("browserNativePrint631");
      window.print();
    };
    x.onclick = (e) => {
      if (e.target === x) closeDocPreview();
    };
  }
  function items(items, kitchen = false) {
    return (items || [])
      .map((i) =>
        kitchen
          ? `<div class="dKitchenItem"><b>${i.qty} × ${esc(i.name)}</b>${i.variant ? `<span>${esc(i.variant)}</span>` : ""}</div>`
          : `<div class="dRow dItem"><span><b>${i.qty} × ${esc(i.name)}</b>${i.variant ? `<small>${esc(i.variant)}</small>` : ""}</span><b>${money((+i.qty || 0) * (+i.price || 0))}</b></div>`,
      )
      .join("");
  }
  function receiptTax(o) {
    const t = o.taxSettings || {};
    let html = "";
    if (t.serviceEnabled)
      html += `<div class="dRow receiptService"><span>${esc(t.serviceLabel || "Service charge")} ${Number(t.serviceRate) || 0}%</span><b>${money(o.serviceAmount || 0)}</b></div>`;
    if (t.enabled)
      html += `<div class="dRow receiptTax"><span>${esc(t.label || "VAT")} ${Number(t.rate) || 0}% <small>${t.mode === "inclusive" ? (en() ? "(included)" : "(รวมในราคา)") : en() ? "(added)" : "(บวกเพิ่ม)"}</small></span><b>${money(o.taxAmount || 0)}</b></div>`;
    return html;
  }
  window.openReceiptPreview = function (id) {
    const o = [...db.orders].reverse().find((x) => String(x.id) === String(id));
    if (!o) return;
    const E = en(),
      pre = db.preorders.find((p) => String(p.id) === String(o.preorderId));
    const customer = o.preorderCustomer || pre?.customer || "",
      dt = new Date(o.date || Date.now());
    showDocPreview(
      E ? "Customer receipt" : "ใบเสร็จลูกค้า",
      `
      <div class="dTicket receipt73">
        <img class="dLogo" src="${esc(shopLogoSrc())}" alt="${esc(db.shopName)}">
        <hr>
        <div class="dRow"><b>Order #${formatOrderNumber(o.id)}</b><span>${dt.toLocaleDateString(E ? "en-AU" : "th-TH")} ${dt.toLocaleTimeString(E ? "en-AU" : "th-TH", { hour: "2-digit", minute: "2-digit" })}</span></div>
        <div class="dRow"><span>${E ? "Staff" : "พนักงาน"}</span><b>${esc(o.staff || "-")}</b></div>
        ${o.isPreorder || o.preorderId ? `<div class="dRow receiptPreorder"><span>Preorder</span><b>${esc(customer || "-")}</b></div>` : ""}
        <hr>${items(o.items)}${receiptTax(o)}<hr>
        ${o.method === "cash" ? `<div class="receiptCash"><div class="dRow"><span>${E ? "Cash received" : "รับเงินสด"}</span><b>${money(o.received || 0)}</b></div><div class="dRow"><span>${E ? "Change" : "เงินทอน"}</span><b>${money(o.change || 0)}</b></div></div>` : `<div class="dRow"><span>${E ? "Payment" : "ชำระเงิน"}</span><b>PromptPay QR</b></div>`}
        <div class="dTotal"><span>${E ? "TOTAL" : "รวมทั้งหมด"}</span><b>${money(o.total || 0)}</b></div>
        ${o.customerNote ? `<div class="receiptNote"><b>${E ? "Note:" : "หมายเหตุ:"}</b> <span>${esc(o.customerNote)}</span></div>` : ""}
        <div class="dThanks">${E ? "THANK YOU" : "ขอบคุณค่ะ"} ♡</div>
      </div>`,
    );
  };
  function kitchenDocument(o, p) {
    const E = en(),
      date = new Date(o.date || o.time || Date.now());
    const customer = o.preorderCustomer || o.customer || p?.customer || "";
    const pickupDate = o.preorderPickupDate || o.pickupDate || p?.date;
    const pickupTime = o.preorderPickupTime || o.pickupTime || p?.time;
    const note = o.customerNote || o.note || p?.note || "";
    const rows = (o.items || [])
      .map(
        (i) =>
          `<div class="prepItem"><strong class="prepQty">${Number(i.qty) || 0}×</strong><div><b>${esc(i.name)}</b>${i.variant ? `<span>${esc(i.variant)}</span>` : ""}</div><i class="prepCheck" aria-hidden="true"></i></div>`,
      )
      .join("");
    return `<div class="dTicket prep73">
      <div class="prepHeading"><span>${E ? "KITCHEN TICKET" : "ใบเตรียมอาหาร"}</span><b>${o.isPreorder || p ? "PREORDER" : E ? "TAKEAWAY" : "หน้าร้าน"}</b></div>
      <h1>#${formatOrderNumber(o.id || p?.orderNo || p?.preNo || "-")}</h1>
      <div class="prepTime">${date.toLocaleString(E ? "en-AU" : "th-TH", { dateStyle: "short", timeStyle: "short" })}</div>
      ${customer ? `<div class="dRow"><span>${E ? "Customer" : "ลูกค้า"}</span><b>${esc(customer)}</b></div>` : ""}
      ${pickupDate ? `<div class="prepPickup"><span>${E ? "PICKUP" : "รับสินค้า"}</span><b>${esc(pickupDate)} · ${esc(pickupTime || "-")}</b></div>` : ""}
      <div class="prepSection"><b>${E ? "ITEMS TO PREPARE" : "รายการที่ต้องเตรียม"}</b><span>${(o.items || []).reduce((a, i) => a + (Number(i.qty) || 0), 0)} ${E ? "items" : "ชิ้น"}</span></div>
      ${rows}
      ${note ? `<div class="prepNote"><b>${E ? "CUSTOMER NOTE" : "หมายเหตุลูกค้า"}</b><div>${esc(note)}</div></div>` : ""}
      <div class="prepFooter">${E ? "Prepared by" : "ผู้เตรียม"} __________________</div>
    </div>`;
  }
  window.openKitchenPreview = function (id) {
    let o = [...db.orders].reverse().find((x) => String(x.id) === String(id));
    if (!o) {
      const h = db.held.find(
        (x) => String(x.orderNo) === String(id) || String(x.id) === String(id),
      );
      if (h) o = { ...h, id: h.orderNo, date: h.time };
    }
    if (!o) return;
    const p = db.preorders.find((p) => String(p.id) === String(o.preorderId));
    showDocPreview(
      en() ? "Kitchen preparation" : "ใบเตรียมอาหาร",
      kitchenDocument(o, p),
    );
  };
  window.openPreorderPreview = function (id) {
    const p = db.preorders.find((x) => String(x.id) === String(id));
    if (!p) return;
    const o = {
      id: p.orderNo || p.preNo,
      items: p.items,
      date: p.createdAt,
      customer: p.customer,
      note: p.note,
      isPreorder: true,
    };
    showDocPreview(
      en() ? "Pre-order preparation" : "ใบเตรียม Preorder",
      kitchenDocument(o, p),
    );
  };
  window.openTodaySummaryPreview = function () {
    const k = dateKey(new Date()),
      s = statsFor(k),
      E = en();
    showDocPreview(
      E ? "Today's sales summary" : "สรุปยอดขายวันนี้",
      `<div class="dTicket summaryTicket"><div class="summaryBrand"><img class="dLogo" src="${esc(shopLogoSrc())}" alt=""><div><h1>${esc(db.shopName || "Sourdough")}</h1><p class="dSub">${E ? "TODAY'S SALES SUMMARY" : "สรุปยอดขายวันนี้"}</p></div></div><div class="summaryDate">${esc(k)}</div><div class="summaryKpis"><div><span>${E ? "Total sales" : "ยอดขายรวม"}</span><b>${money(s.sales)}</b></div><div><span>${E ? "Paid orders" : "ออเดอร์ที่ชำระแล้ว"}</span><b>${(s.paid || []).length}</b></div></div><div class="summarySectionTitle">${E ? "PAYMENT BREAKDOWN" : "สรุปช่องทางชำระเงิน"}</div><div class="dRow summaryRow"><span>${E ? "Cash" : "เงินสด"}</span><b>${money(s.cash)}</b></div><div class="dRow summaryRow"><span>PromptPay</span><b>${money(s.qr)}</b></div><div class="summarySectionTitle">${E ? "PROFIT OVERVIEW" : "ภาพรวมกำไร"}</div><div class="dRow summaryRow cost"><span>${E ? "Cost" : "ต้นทุน"}</span><b>${money(s.cost)}</b></div><div class="dTotal summaryProfit"><span>${E ? "Estimated profit" : "กำไรโดยประมาณ"}</span><b>${money(s.profit)}</b></div><p class="summaryFooter">${E ? "Thank you" : "ขอบคุณที่อุดหนุน"} · ${esc(db.shopName || "Sourdough")}</p></div>`,
    );
  };
  setTimeout(() => {
    const b = document.getElementById("printSummary");
    if (b) {
      b.innerHTML = `<svg><use href="#print"></use></svg>${en() ? "Preview today summary" : "ดูสรุปยอดวันนี้"}`;
      b.onclick = window.openTodaySummaryPreview;
    }
  }, 0);
})();

/* v6.07 — Login PIN is exactly 4 digits */
(() => {
  const input = document.getElementById("loginPass");
  if (input) {
    input.maxLength = 4;
    input.setAttribute("maxlength", "4");
    input.setAttribute("inputmode", "numeric");
    input.setAttribute("pattern", "[0-9]{4}");
  }
})();

updatePageLock();

/* Shared TH / EN interface translation */
/* One translation controller for static labels and dynamically rendered screens.
 * Never modifies database values, input values, menu names or print documents.
 */
(() => {
  "use strict";
  const translations = {
    ...{
      หน้าขาย: "Sell",
      ขาย: "Sell",
      กำลังขาย: "Selling",
      ยังไม่ได้เลือกสินค้า: "No items yet",
      เลือกเมนูเพื่อเริ่มขาย: "Choose items to start selling",
      เจ้าของ: "Owner",
      ค้นหาเมนู: "Search menu",
      ออเดอร์ปัจจุบัน: "Current order",
      ล้าง: "Clear",
      จำนวน: "Qty",
      รวม: "Total",
      ชำระเงิน: "Pay",
      พักออเดอร์: "Hold order",
      ยกเลิกออเดอร์: "Cancel order",
      ออเดอร์: "Orders",
      รายงาน: "Reports",
      สต๊อก: "Stock",
      จัดการร้าน: "Manage",
      ตั้งค่า: "Settings",
      ออกจากระบบ: "Log out",
      สั่งจองล่วงหน้า: "Pre-order",
      ครัว: "Kitchen",
      สต๊อกสินค้า: "Stock",
      เลือกทั้งหมด: "Select all",
      จัดการร้าน: "Manage store",
      "สินค้า รูป ราคา หมวดหมู่ และข้อมูลเตรียมอาหาร":
        "Products, photos, prices, categories and prep notes",
      ตั้งค่าร้าน: "Store settings",
      ชำระเงิน: "Payment",
      ตั้งค่าเครื่องพิมพ์: "Printer settings",
      จัดการพนักงาน: "Staff",
      สำรองข้อมูล: "Backup",
      กลับ: "Back",
      "ร้านและ PromptPay": "Payment",
      ชื่อร้าน: "Store name",
      บันทึกการตั้งค่าร้าน: "Save store settings",
      เครื่องพิมพ์: "Printer",
      ความกว้างงานพิมพ์: "Print width",
      "ทดสอบพิมพ์ D520": "Test D520 print",
      สำรองข้อมูลยอดขาย: "Sales backup",
      เลือกวันที่: "Choose date",
      ยอดชำระ: "Amount due",
      เงินสด: "Cash",
      รับเงิน: "Cash received",
      เงินทอน: "Change",
      ขาดเงิน: "Amount short",
      ยืนยันการชำระเงิน: "Confirm payment",
      พอดี: "Exact",
      ใช้จำนวนนี้: "Use this amount",
      ชำระเงินสำเร็จ: "Payment successful",
      พิมพ์ใบเสร็จ: "Print receipt",
      เริ่มออเดอร์ใหม่: "New order",
      รายการพักออเดอร์: "Held orders",
      ออเดอร์ที่พักไว้: "Held orders",
      เรียกออเดอร์กลับมา: "Resume order",
      ไม่มีออเดอร์พัก: "No held orders",
      เพิ่มเมนู: "Add product",
      เพิ่มหมวดหมู่ใหม่: "Add category",
      ชื่อหมวดหมู่: "Category name",
      เพิ่มหมวดหมู่: "Add category",
      แก้ไขเมนู: "Edit product",
      ชื่อสินค้า: "Product name",
      หมวดหมู่: "Category",
      "ราคาเต็ม/ปกติ": "Regular price",
      ต้นทุน: "Cost",
      "ข้อมูลเตรียม/วัตถุดิบ": "Prep / ingredients",
      รูปสินค้า: "Product photo",
      บันทึกเมนู: "Save product",
      สร้างออเดอร์ล่วงหน้า: "Create pre-order",
      ชื่อลูกค้า: "Customer name",
      เบอร์โทร: "Phone",
      วันที่รับ: "Pickup date",
      เวลา: "Time",
      หมายเหตุ: "Note",
      เลือกเมนู: "Choose items",
      บันทึกออเดอร์ล่วงหน้า: "Save pre-order",
      ชื่อเมนู: "Item",
      ราคา: "Price",
      สรุปปิดยอดวันนี้: "Today’s closing summary",
      "ยอดขาย เงินสด QR และจำนวนออเดอร์": "Sales, payments and order activity",
      พิมพ์สรุปยอดวันนี้: "Print today’s summary",
      เช็กยอดออเดอร์ย้อนหลัง: "Past sales",
      เลือกวันที่เพื่อดูรายละเอียด: "Choose a date to view details",
      ยอดขายสินค้า: "Product sales",
      สต๊อกสินค้า: "Stock",
      จัดตามหมวดหมู่เพื่อปรับจำนวนได้ง่าย:
        "Organised by category for quick updates",
      จัดการร้าน: "Store",
      "สินค้า รูป ราคา หมวดหมู่ และข้อมูลเตรียมอาหาร":
        "Products, photos, prices, categories and prep notes",
      ตั้งค่า: "Settings",
      ชื่อร้านและการชำระเงิน: "Payment",
      ชำระเงิน: "Payment",
      "AIMO D520 และขนาดกระดาษ": "AIMO D520 and paper size",
      "ชื่อ Username และ Password": "Name, username and password",
      "Export ยอดขาย CSV / Excel": "Export sales to CSV / Excel",
      โลโก้ร้าน: "Store logo",
      "ใช้บนแถบด้านบนและใบเสร็จ · แนะนำ PNG พื้นหลังโปร่งใส":
        "Used in the header and receipts · transparent PNG recommended",
      เลือกรูปโลโก้: "Choose logo",
      ใช้โลโก้เดิม: "Use default logo",
      "รูป QR ของร้าน": "Store QR image",
      "เลือกรูป QR": "Choose QR image",
      "ลบรูป QR": "Remove QR image",
      รูปสินค้า: "Product photo",
      สินค้านี้มีตัวเลือกครึ่งโลฟ: "Half-loaf option available",
      ราคาครึ่งโลฟ: "Half-loaf price",
      ต้นทุนครึ่งโลฟ: "Half-loaf cost",
      ชื่อครึ่งโลฟ: "Half-loaf name",
      รูปครึ่งโลฟ: "Half-loaf photo",
      สต๊อก: "Stock",
      รายการสั่งล่วงหน้า: "Pre-orders",
      จองล่วงหน้า: "Pre-order",
      ลบ: "Delete",
      พิมพ์เตรียมอาหาร: "Print prep ticket",
      ยังไม่มีรายการสั่งล่วงหน้า: "No pre-orders yet",
      ลูกค้าจ่าย: "Customer paid",
      กลับหน้าขายใน: "Back to Sell in",
      วินาที: "seconds",
      "แตะ “เริ่มออเดอร์ใหม่” เพื่อกลับทันที": "Tap “New order” to return now",
      ปรับรูปสินค้า: "Adjust product photo",
      ซูมรูป: "Zoom",
      ใช้รูปนี้: "Use photo",
      ยกเลิก: "Cancel",
      จัดการหมวดหมู่: "Categories",
      เพิ่มหมวดหมู่ใหม่: "Add category",
      ตั้งชื่อหมวดหมู่สำหรับจัดเมนูในหน้าขาย:
        "Name a category to organise the Sell screen",
    },
    ...{
      ออกจากระบบ: "Log out",
      รายการพักออเดอร์: "Held orders",
      ออเดอร์ที่พักไว้: "Held orders",
      กำลังขาย: "Selling now",
      หน้าขาย: "Sell",
      ขาย: "Sell",
      ยังไม่ได้เลือกสินค้า: "No items selected",
      เลือกเมนูเพื่อเริ่มขาย: "Choose items to start selling",
      เจ้าของ: "Owner",
      ค้นหาเมนู: "Search menu",
      ออเดอร์ปัจจุบัน: "Current order",
      ล้าง: "Clear",
      จำนวน: "Quantity",
      รวม: "Total",
      ชำระเงิน: "Pay",
      พักออเดอร์: "Hold order",
      ยกเลิกออเดอร์: "Cancel order",
      ออเดอร์: "Orders",
      สั่งจองล่วงหน้า: "Pre-orders",
      ครัว: "Kitchen",
      สรุปปิดยอดวันนี้: "Today’s summary",
      "ยอดขาย เงินสด QR และจำนวนออเดอร์": "Sales, payments and order activity",
      พิมพ์สรุปยอดวันนี้: "Print today’s summary",
      เช็กยอดออเดอร์ย้อนหลัง: "Past sales",
      เลือกวันที่เพื่อดูรายละเอียด: "Choose a date to view details",
      ยอดขายสินค้า: "Product sales",
      สต๊อกสินค้า: "Stock",
      จัดตามหมวดหมู่เพื่อปรับจำนวนได้ง่าย:
        "Organised by category for quick updates",
      เลือกทั้งหมด: "Select all",
      ยกเลิกการเลือกทั้งหมด: "Clear selection",
      จัดการร้าน: "Store management",
      "สินค้า รูป ราคา หมวดหมู่ และข้อมูลเตรียมอาหาร":
        "Products, photos, prices, categories and prep notes",
      หมวดหมู่: "Category",
      เพิ่มเมนู: "Add product",
      ตั้งค่า: "Settings",
      ตั้งค่าร้าน: "Store settings",
      ชำระเงิน: "Payment",
      ชื่อร้านและการชำระเงิน: "Payment",
      ชำระเงิน: "Payment",
      ตั้งค่าเครื่องพิมพ์: "Printer settings",
      "AIMO D520 และขนาดกระดาษ": "AIMO D520 and paper size",
      จัดการพนักงาน: "Staff management",
      "ชื่อ Username และ Password": "Name, username and password",
      สำรองข้อมูล: "Backup",
      "Export ยอดขาย CSV / Excel": "Export sales to CSV / Excel",
      กลับ: "Back",
      "ร้านและ PromptPay": "Payment",
      ชื่อร้าน: "Store name",
      "เบอร์โทร / เลข PromptPay": "Phone / PromptPay ID",
      โลโก้ร้าน: "Store logo",
      "ใช้บนแถบด้านบนและใบเสร็จ · แนะนำ PNG พื้นหลังโปร่งใส":
        "Used in the header and receipts · transparent PNG recommended",
      เลือกรูปโลโก้: "Choose logo",
      ใช้โลโก้เดิม: "Use default logo",
      "รูป QR ของร้าน": "Store QR image",
      "เลือกรูป QR": "Choose QR image",
      "ลบรูป QR": "Remove QR image",
      บันทึกการตั้งค่าร้าน: "Save store settings",
      เครื่องพิมพ์: "Printer",
      ความกว้างงานพิมพ์: "Print width",
      "ทดสอบพิมพ์ D520": "Test D520 print",
      สำรองข้อมูลยอดขาย: "Sales backup",
      เลือกวันที่: "Choose date",
      ยอดชำระ: "Amount due",
      เงินสด: "Cash",
      รับเงิน: "Cash received",
      แตะช่องเพื่อเปิดแป้นตัวเลข: "Tap to open keypad",
      เงินทอน: "Change",
      ขาดเงิน: "Amount short",
      "แตะ QR เพื่อขยายเต็มจอ": "Tap QR to enlarge",
      ยืนยันการชำระเงิน: "Confirm payment",
      ลูกค้าจ่าย: "Customer paid",
      พอดี: "Exact amount",
      ใช้จำนวนนี้: "Use this amount",
      ชำระเงินสำเร็จ: "Payment successful",
      กลับหน้าขายใน: "Back to Sell in",
      วินาที: "seconds",
      "แตะ “เริ่มออเดอร์ใหม่” เพื่อกลับทันที": "Tap “New order” to return now",
      พิมพ์ใบเสร็จ: "Print receipt",
      เริ่มออเดอร์ใหม่: "New order",
      ปรับรูปสินค้า: "Adjust product photo",
      "ลากรูปในกรอบเพื่อจัดตำแหน่ง · ใช้สองนิ้วหรือสกอลล์เพื่อซูม":
        "Drag to reposition · pinch or scroll to zoom",
      ซูมรูป: "Zoom",
      ยกเลิก: "Cancel",
      ใช้รูปนี้: "Use photo",
      จัดการหมวดหมู่: "Categories",
      เพิ่มหมวดหมู่ใหม่: "Add category",
      ตั้งชื่อหมวดหมู่สำหรับจัดเมนูในหน้าขาย:
        "Name a category to organise the Sell screen",
      ชื่อหมวดหมู่: "Category name",
      เพิ่มหมวดหมู่: "Add category",
      รูปสินค้า: "Product photo",
      เลือกรูปแล้วลากจัดตำแหน่งและซูมในกรอบได้ทันที:
        "Choose a photo, then drag and zoom to frame it",
      ชื่อสินค้า: "Product name",
      "ราคาเต็ม/ปกติ": "Regular price",
      สินค้านี้มีตัวเลือกครึ่งโลฟ: "Half-loaf option available",
      ราคาครึ่งโลฟ: "Half-loaf price",
      ต้นทุนครึ่งโลฟ: "Half-loaf cost",
      ชื่อครึ่งโลฟ: "Half-loaf name",
      รูปครึ่งโลฟ: "Half-loaf photo",
      "เลือกรูปแล้วสามารถครอป เลื่อน และซูมได้":
        "Choose a photo, then crop, move and zoom",
      ต้นทุน: "Cost",
      สต๊อก: "Stock",
      "ข้อมูลเตรียม/วัตถุดิบ": "Prep / ingredients",
      บันทึกเมนู: "Save product",
      สร้างออเดอร์ล่วงหน้า: "Create pre-order",
      ชื่อลูกค้า: "Customer name",
      เบอร์โทร: "Phone",
      วันที่รับ: "Pickup date",
      เวลา: "Time",
      หมายเหตุ: "Note",
      เลือกเมนู: "Choose items",
      บันทึกออเดอร์ล่วงหน้า: "Save pre-order",
      พิมพ์เตรียมอาหาร: "Print prep ticket",
      ลบ: "Delete",
      จองล่วงหน้า: "Pre-order",
      ยังไม่มีรายการสั่งล่วงหน้า: "No pre-orders yet",
      ยังไม่มีออเดอร์: "No orders yet",
      ยังไม่มีสินค้า: "No items",
      เปิดขาย: "On sale",
      ปิดขาย: "Not for sale",
      แก้ไข: "Edit",
      สินค้า: "Product",
      ราคา: "Price",
      ยอดขายรวม: "Total sales",
      ออเดอร์สำเร็จ: "Completed orders",
      กำไรโดยประมาณ: "Estimated profit",
      กำไร: "Profit",
      ต้นทุนสินค้า: "Product cost",
      ภาพรวมวันนี้: "Today at a glance",
      ยอดขายรวมของวันนี้: "Total sales today",
      สำเร็จ: "completed",
      กำไรและต้นทุน: "Profit & cost",
      สมดุลของวันนี้: "Today’s balance",
      กำไรมากกว่า: "Profit is higher",
      ต้นทุนมากกว่า: "Cost is higher",
      ยกเลิกแล้ว: "Cancelled",
      ออเดอร์นี้ถูกยกเลิก: "This order was cancelled",
      ลูกค้ายกเลิกก่อนชำระเงิน: "Customer cancelled before payment",
      ชิ้น: "items",
      รายการที่ต้องเตรียม: "Orders to prepare",
      "ข้อมูลวัตถุดิบ / การเตรียม": "Ingredients / prep notes",
      ไม่มีรายการ: "Nothing to prepare",
      ยังไม่ได้ระบุ: "Not specified",
      ใบเสร็จ: "Receipt",
      พิมพ์ใบเตรียม: "Print prep ticket",
      กรุณาเลือกเมนู: "Please choose at least one item",
      ภาษี: "Tax",
      "VAT และรูปแบบการคิดภาษี": "VAT and tax calculation",
      ภาษีและค่าบริการ: "Tax & service charge",
      ตั้งค่าการคำนวณภาษีสำหรับการขายและใบเสร็จ:
        "Configure tax calculations for sales and receipts",
      "เปิดใช้ภาษีมูลค่าเพิ่ม (VAT)": "Enable VAT",
      คำนวณภาษีในหน้าชำระเงินและแสดงในใบเสร็จ:
        "Calculate tax at checkout and show it on receipts",
      "อัตราภาษี (%)": "Tax rate (%)",
      วิธีคิดราคา: "Tax calculation",
      "ราคารวมภาษีแล้ว (Tax Inclusive)": "Tax inclusive",
      "ราคาไม่รวมภาษี (Tax Exclusive)": "Tax exclusive",
      ชื่อภาษีที่แสดงบนใบเสร็จ: "Tax label on receipt",
      การปัดเศษภาษี: "Tax rounding",
      "ปัดเศษ 2 ตำแหน่ง (มาตรฐาน)": "2 decimal places (standard)",
      ปัดเป็นจำนวนเต็ม: "Round to whole number",
      "ค่าบริการ (ไม่บังคับ)": "Service charge (optional)",
      "เปิดเมื่อต้องการเพิ่ม Service charge แยกจาก VAT":
        "Enable to add a service charge separately from VAT",
      "ค่าบริการ (%)": "Service charge (%)",
      ชื่อที่แสดง: "Display label",
      "การเปลี่ยนแปลงจะมีผลกับการขายครั้งถัดไป และไม่แก้ยอดออเดอร์เก่า":
        "Changes apply to future sales and will not alter previous orders",
      บันทึกการตั้งค่าภาษี: "Save tax settings",
      ตัวอย่างการคำนวณ: "Calculation preview",
      อัปเดตตามการตั้งค่าทันที: "Updates instantly as settings change",
      ยอดสินค้า: "Subtotal",
      ยอดรวม: "Total",
      รวมอยู่ในราคา: "included",
      บวกเพิ่ม: "added",
      รวมในราคา: "included",
      พร้อมรับออเดอร์ใหม่: "Ready for a new order",
    },
  };
  const extra = {
    "เบอร์ QR ไดนามิก / PromptPay": "Dynamic QR / PromptPay number",
    "ลบเบอร์ QR": "Remove QR number",
    "ใส่รูป QR ที่มีอยู่แล้วได้ หรือปล่อยว่างเพื่อใช้ QR ที่ระบบสร้างจาก PromptPay":
      "Upload your QR image, or leave blank to generate a PromptPay QR code",
    "หากใส่รูป QR ระบบจะแสดงรูปนี้ตอนรับชำระเงิน ส่วนยอดชำระจะแสดงอยู่ใต้ QR อย่างชัดเจน":
      "Your uploaded QR image will appear at checkout, with the amount due below it",
    "ตัวอย่าง QR · ยอดจริงจะสร้างใหม่อัตโนมัติในหน้าขาย":
      "QR preview · the checkout QR is generated for the actual amount",
    "ยังไม่ได้ตั้งค่า PromptPay": "PromptPay has not been set up",
    เลือกวัน: "Select date",
    ทุกหมวดหมู่: "All categories",
    เมนู: "Menu",
    ไม่บังคับ: "Optional",
    "ส่งออกออเดอร์ รายการสินค้า วิธีชำระเงิน ยอดขาย ต้นทุน และกำไรของวันที่เลือก":
      "Export orders, products, payment methods, sales, costs and profit for the selected date",
    "แตะช่องเพื่อเขียน ระบบจะหยุดนับถอยหลังชั่วคราว":
      "Tap to enter a note and pause the countdown",
    เลือกรูปทรงกรอบ: "Choose frame shape",
    สี่เหลี่ยม: "Square",
    เหลี่ยมมน: "Rounded",
    วงกลม: "Circle",
    วงรี: "Oval",
    หัวใจ: "Heart",
    ซุ้มโค้ง: "Arch",
    "ข้อมูลเต็มโลฟ / สินค้าปกติ": "Full loaf / regular product details",
    ข้อมูลหลักของสินค้า: "Product details",
    "ต้นทุนเต็มโลฟ / ปกติ": "Full loaf / regular cost",
    "สต๊อกเต็มโลฟ / ปกติ": "Full loaf / regular stock",
    "ติ๊กเพื่อเปิดข้อมูล ราคา รูป และสต๊อกของครึ่งโลฟ":
      "Enable half-loaf prices, photos and stock",
    ข้อมูลครึ่งโลฟ: "Half-loaf details",
    ใช้เฉพาะสินค้าที่มีครึ่งโลฟ: "Only for products with a half-loaf option",
    สต๊อกครึ่งโลฟ: "Half-loaf stock",
    "ลบสินค้านี้ใช่ไหม?": "Delete this product?",
    เก็บสินค้าไว้: "Keep product",
    ลบสินค้า: "Delete product",
    พนักงาน: "Staff",
    บทบาท: "Role",
    แก้ไขพนักงาน: "Edit staff",
    เพิ่มพนักงาน: "Add staff",
    ลบพนักงาน: "Delete staff",
    บันทึกข้อมูล: "Save changes",
    ปรับข้อมูลพนักงานและสิทธิ์การใช้งาน:
      "Update staff details and login access.",
    อนุญาตให้เข้าสู่ระบบ: "Allow sign-in",
    "เปิด/ปิดสิทธิ์การใช้งานบัญชีนี้":
      "Enable or disable access for this account",
    บัญชีที่กำลังเข้าสู่ระบบจะแสดงจุดสีเขียวในหน้ารายชื่อ:
      "The signed-in account has a green indicator in the staff list",
    เลือกพนักงานเพื่อแก้ไขข้อมูลบัญชี:
      "Choose a staff member to edit their account",
    ชื่อที่แสดง: "Display name",
    กำลังใช้งาน: "Signed in",
    ครึ่ง: "Half",
    เต็มโลฟ: "Full loaf",
    ครึ่งโลฟ: "Half loaf",
    ไม่พบสินค้า: "No products found",
    ชื่อผู้ใช้: "Username",
    รหัสผ่าน: "Password",
    เข้าสู่ระบบ: "Sign in",
    รายงาน: "Reports",
    ทั้งหมด: "All",
    ปิด: "Close",
    บันทึก: "Save",
    ค้นหา: "Search",
    รายละเอียด: "Details",
    สถานะ: "Status",
  };
  const dictionary = Object.assign(translations, extra);
  const reverse = Object.fromEntries(
    Object.entries(dictionary).map(([th, en]) => [en, th]),
  );
  const sources = new WeakMap();
  const attributeSources = new WeakMap();
  const excluded =
    'script,style,textarea,[data-no-translate],#docPreview630,#printPreviewV631,#printHostV631,.posPrintStage,[id^="printPreview"],[id^="printHost"],.dTicket';
  const protectedSelector =
    ".product h3,.product p,.cartLine b,.staffSimpleIdentity b,#who,#loginUser option,#variantTitle,#deleteProductName,#shopLogoPreview,.brand b";
  function protectedText(node) {
    const el = node.nodeType === 1 ? node : node.parentElement;
    if (!el || el.closest(excluded) || el.closest(protectedSelector))
      return true;
    const value = (node.nodeValue || "").trim();
    return [
      db.shopName,
      ...db.products.flatMap((p) => [p.name, p.desc]),
      ...db.categories.map((c) => c.name),
      ...db.accounts.map((a) => a.name),
    ]
      .filter(Boolean)
      .some((name) => value === name);
  }
  const keys = Object.keys(dictionary).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(
    keys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
    "g",
  );
  function toEnglish(text) {
    return text.replace(/\s+/g, " ").replace(pattern, (key) => dictionary[key]);
  }
  function translateText(text) {
    if (db.language === "en") return toEnglish(text);
    const trimmed = text.trim();
    return reverse[trimmed] ? text.replace(trimmed, reverse[trimmed]) : text;
  }
  function updateNode(node) {
    if (protectedText(node)) return;
    let state = sources.get(node);
    if (!state || node.nodeValue !== state.output)
      state = { source: node.nodeValue };
    const output =
      db.language === "en"
        ? toEnglish(state.source)
        : translateText(state.source);
    if (node.nodeValue !== output) node.nodeValue = output;
    state.output = output;
    sources.set(node, state);
  }
  let pending = false;
  const observer = new MutationObserver(() => {
    if (!pending) {
      pending = true;
      queueMicrotask(() => {
        pending = false;
        applyLanguage();
      });
    }
  });
  function applyLanguage() {
    observer.disconnect();
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
    );
    let node;
    while ((node = walker.nextNode())) updateNode(node);
    document
      .querySelectorAll("[placeholder],[title],[aria-label]")
      .forEach((el) => {
        if (protectedText(el)) return;
        const states = attributeSources.get(el) || {};
        for (const attr of ["placeholder", "title", "aria-label"]) {
          const current = el.getAttribute(attr);
          if (!current) continue;
          let state = states[attr];
          if (!state || current !== state.output) state = { source: current };
          const output =
            db.language === "en"
              ? toEnglish(state.source)
              : translateText(state.source);
          if (output !== current) el.setAttribute(attr, output);
          state.output = output;
          states[attr] = state;
        }
        attributeSources.set(el, states);
      });
    document.documentElement.lang = db.language;
    for (const prefix of ["lang", "globalLang"])
      for (const lang of ["TH", "EN"]) {
        document
          .getElementById(prefix + lang)
          ?.classList.toggle("active", db.language === lang.toLowerCase());
      }
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
    });
  }
  function setLanguage(language) {
    db.language = language;
    save();
    renderCats();
    renderProducts();
    renderCart();
    renderClock();
    const active = document.querySelector(".page.active")?.id;
    const renderers = {
      settings: updateTaxPreview,
      orders: renderOrderTab,
      stock: renderStock,
      manage: renderManage,
      reports: renderReports,
    };
    renderers[active]?.();
    applyLanguage();
  }
  for (const id of ["langTH", "globalLangTH"])
    document
      .getElementById(id)
      ?.addEventListener("click", () => setLanguage("th"));
  for (const id of ["langEN", "globalLangEN"])
    document
      .getElementById(id)
      ?.addEventListener("click", () => setLanguage("en"));
  window.applyLanguage = applyLanguage;
  applyLanguage();
})();
