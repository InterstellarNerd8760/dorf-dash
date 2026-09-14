const HOOK_KEY = "dorfDashWebhook";
const STATE_KEY = "dorfDashRunState";
const BUILTIN_HOOK = "";
const KID_CAP = 5;
const STOP_CAP = 2;
const MENU = [
  { zone:"wp", extra:false, store:"Shaw's", where:"122 West Portal Ave", blurb:"Since 1931. Mitchell's scoops, house fudge, candy counter.", items:[
    { name:"Mitchell's single scoop", cost:6.25, fee:2 },
    { name:"Mitchell's double scoop", cost:8.75, fee:2 },
    { name:"Candy / fudge bag", cost:6, fee:2, need:"which candy or fudge" }
  ]},
  { zone:"wp", extra:false, store:"Hardware Coffee Co.", where:"32 West Portal Ave", blurb:"Opened May 2026 in the old hardware shop. Espresso + pastry case.", items:[
    { name:"Latte / mocha / matcha", cost:6.5, fee:2, need:"drink + iced/hot + mods" },
    { name:"Espresso / drip / americano", cost:5, fee:2, need:"which drink" },
    { name:"Pastry (croissant / cookie)", cost:5.5, fee:2, need:"which pastry" }
  ]},
  { zone:"wp", extra:false, store:"Submarine Center", where:"820 Ulloa St", blurb:"Counter since 1981. Mini / Center / Super. Toast + jalapeños if you want them.", items:[
    { name:"Mini sub (S1–S9)", cost:9.9, fee:2, need:"which mini + toasted?" },
    { name:"Center sub (S1–S9)", cost:13.1, fee:2.5, need:"which center + toasted?" },
    { name:"Hot pastrami Center (S6)", cost:13.1, fee:2.5 },
    { name:"The Atomic Center", cost:15.25, fee:2.5 }
  ]},
  { zone:"wp", extra:false, store:"Little Original Joe's", where:"393 West Portal Ave", blurb:"Slices until 4pm. Knots and wraps all lunch.", items:[
    { name:"Cheese slice", cost:3, fee:2 },
    { name:"Pepperoni / veg / slice of the day", cost:4, fee:2, need:"which slice" },
    { name:"Garlic parm knots (6)", cost:10, fee:2 },
    { name:"CBR wrap or sandwich", cost:15.5, fee:2.5, need:"CBR wrap / which sandwich" }
  ]},
  { zone:"wp", extra:false, store:"Easy Breezy", where:"44 West Portal Ave", blurb:"Self-serve froyo / custard by the ounce (~81¢/oz) + 4.5% shop fee.", items:[
    { name:"Small cup (~8 oz)", cost:7.5, fee:2, need:"flavors + toppings" },
    { name:"Medium cup (~12 oz)", cost:10.5, fee:2, need:"flavors + toppings" }
  ]},
  { zone:"wp", extra:false, store:"George's Donuts & Merriment", where:"163 West Portal Ave", blurb:"Fancy donuts. Classic glazed ~$5, filled brioche ~$7. They cap boxes.", items:[
    { name:"Classic donut (glazed / sprinkle)", cost:5, fee:2, need:"which donut" },
    { name:"Filled brioche donut", cost:7, fee:2, need:"which filled" }
  ]},
  { zone:"wp", extra:true, store:"El Toreador", where:"50 West Portal Ave", blurb:"Sit-down Mexican since 1980. Slow kitchen. One-stop only.", tag:"one-stop", items:[
    { name:"Mission / veggie burrito", cost:16, fee:2.5, need:"which burrito" },
    { name:"Carne asada / carnitas burrito", cost:17.25, fee:2.5, need:"asada or carnitas" }
  ]},
  { zone:"wp", extra:true, store:"Bursa", where:"60 West Portal Ave", blurb:"Turkish / Mediterranean. Wrap is the dash item; plates run $25+.", tag:"one-stop", items:[
    { name:"Falafel or kebab wrap", cost:17, fee:2.5, need:"chicken / falafel / beef + fries or salad" },
    { name:"Chicken kebab plate", cost:25, fee:3, need:"mods" }
  ]},
  { zone:"wp", extra:true, store:"Squat & Gobble", where:"1 West Portal Ave", blurb:"Crepes. Kitchen is slower than a counter shop.", tag:"one-stop", items:[
    { name:"Savory crepe", cost:16, fee:2.5, need:"which crepe (Philly, pesto, build-your-own)" },
    { name:"Sweet crepe", cost:12, fee:2.5, need:"which sweet" }
  ]},
  { zone:"wp", extra:true, store:"Fresca", where:"24 West Portal Ave", blurb:"Peruvian. Real plates, not a grab. One-stop only.", tag:"one-stop", items:[
    { name:"Salchipapas / tacos", cost:16, fee:3, need:"which starter" },
    { name:"Lomo saltado / ceviche", cost:28, fee:3, need:"which plate" }
  ]},
  { zone:"wp", extra:true, store:"Eezy Freezy", where:"West Portal Ave", blurb:"Tiny independent grocery. Write exact SKUs.", items:[
    { name:"Drink + snack", cost:7, fee:2, need:"exact items" },
    { name:"Named grocery item", cost:9, fee:2, need:"exact item" }
  ]},
  { zone:"wp", extra:true, store:"Peet's / Starbucks", where:"West Portal", blurb:"Backup if Hardware is slammed. Grande-ish drink.", items:[
    { name:"Grande latte / cold brew", cost:6.5, fee:2, need:"shop + drink + mods" }
  ]},
  { zone:"wp", extra:true, store:"Safeway (Taraval)", where:"730 Taraval", blurb:"Parkside, not the avenue. Extra walk. Stacked runs only.", tag:"long", items:[
    { name:"Named grocery / deli item", cost:10, fee:3, need:"exact item" }
  ]},
  { zone:"st", extra:false, store:"Quickly", where:"Stonestown main entrance", blurb:"Milk tea $4.99-$5.75. Cream brulee / latte drinks ~$6.50-$7.", items:[
    { name:"Classic / jasmine milk tea", cost:5.75, fee:3, need:"flavor + sugar + ice + topping" },
    { name:"Boba latte / cream brulee", cost:6.99, fee:3, need:"which drink + sugar + ice" }
  ]},
  { zone:"st", extra:false, store:"Wetzel's Pretzels", where:"Level 1 near Target", blurb:"Original ~$6.70. Cinnamon / almond / pepperoni twist a bit more.", items:[
    { name:"Original pretzel", cost:6.7, fee:3 },
    { name:"Specialty pretzel", cost:7.5, fee:3, need:"cinnamon / almond / pepperoni / cheese" },
    { name:"Pretzel + drink", cost:11, fee:3, need:"which pretzel" }
  ]},
  { zone:"st", extra:false, store:"Target", where:"Stonestown", blurb:"Short list only. Write aisle if you know it.", items:[
    { name:"Named Target item", cost:12, fee:3, need:"exact item + aisle if you know it" }
  ]},
  { zone:"st", extra:false, store:"Other mall food", where:"Stonestown", blurb:"One extra store per run. Write both the shop and the item.", tag:"one-stop", items:[
    { name:"Named item at a named store", cost:14, fee:3, need:"store + exact item" }
  ]}
];
let zone = "wp";
let showExtra = false;
const extraSeen = { wp:false, st:false };
function hook() { return (localStorage.getItem(HOOK_KEY) || BUILTIN_HOOK || "").trim(); }
function runState() { return localStorage.getItem(STATE_KEY) || "open"; }
function setRunState(s) { localStorage.setItem(STATE_KEY, s); paintState(); }
function paintState() {
  const s = runState();
  const chip = document.getElementById("stateChip");
  const go = document.getElementById("go");
  if (s === "full") { chip.textContent = "Run is full"; chip.className = "chip warn"; go.disabled = true; go.textContent = "This run is full"; }
  else if (s === "walk") { chip.textContent = "Walking back — too late"; chip.className = "chip warn"; go.disabled = true; go.textContent = "They're already walking"; }
  else { chip.textContent = "Open until we lock it"; chip.className = "chip"; go.disabled = false; go.textContent = "Send / copy order"; }
}
function picked() {
  return [...document.querySelectorAll("#menu input[type=checkbox]:checked")].map((el) => {
    const spec = el.closest(".item").querySelector(".spec input");
    return { store: el.dataset.store, name: el.dataset.name, cost: Number(el.dataset.cost), fee: Number(el.dataset.fee), need: el.dataset.need || "", spec: spec ? spec.value.trim() : "" };
  });
}
function storesInBag(list) { return [...new Set(list.map((i) => i.store))]; }
function paintBag() {
  const list = picked();
  const bag = document.getElementById("bag");
  const box = document.getElementById("bagList");
  const stops = storesInBag(list);
  document.getElementById("stopChip").textContent = stops.length + " / " + STOP_CAP + " stores";
  document.getElementById("seatChip").textContent = KID_CAP + " kids max";
  if (!list.length) { bag.className = "bag"; return; }
  bag.className = "bag on";
  const total = list.reduce((s,i) => s + i.cost + i.fee, 0);
  box.innerHTML = stops.map((st) => {
    const items = list.filter((i) => i.store === st).map((i) => i.name + (i.spec ? " — " + i.spec : "")).join(", ");
    return "<div class='chip' style='margin:0 6px 6px 0;display:inline-block'>" + st + ": " + items + "</div>";
  }).join("") + "<div class='hint'>About $" + Math.ceil(total) + " cash · " + stops.length + " store" + (stops.length===1?"":"s") + "</div>";
}
function renderMenu() {
  const menuEl = document.getElementById("menu");
  menuEl.innerHTML = "";
  const rows = MENU.filter((s) => s.zone === zone && (showExtra || !s.extra));
  rows.forEach((store, si) => {
    const box = document.createElement("div");
    box.className = "store";
    const flag = store.tag ? "<div class='flag " + (store.tag==="long"?"long":"") + "'>" + store.tag + "</div>" : "";
    box.innerHTML = "<div class='store-head'><div><h3>" + store.store + "</h3><p class='where'>" + store.where + " · " + store.blurb + "</p></div><div class='flags'>" + flag + "</div></div>";
    store.items.forEach((item, ii) => {
      const id = "i-" + zone + "-" + si + "-" + ii;
      const about = Math.ceil(item.cost + item.fee);
      const row = document.createElement("div");
      row.className = "item";
      row.innerHTML =
        "<input type='checkbox' id='"+id+"' data-store=\""+store.store+"\" data-name=\""+item.name+"\" data-cost='"+item.cost+"' data-fee='"+item.fee+"' data-need=\""+(item.need||"")+"\" />" +
        "<label for='"+id+"'><div class='name'>"+item.name+"</div>" +
        (item.need ? "<div class='need'>Write "+item.need+"</div>" : "") +
        "</label>" +
        "<div class='price'><b>$"+about+"</b><small>item ~$"+item.cost.toFixed(0)+" + $"+item.fee.toFixed(2)+" fee</small></div>" +
        (item.need ? "<div class='spec'><input placeholder='"+item.need+"' /></div>" : "");
      box.appendChild(row);
    });
    menuEl.appendChild(box);
  });
  menuEl.querySelectorAll("input[type=checkbox]").forEach((el) => {
    el.addEventListener("change", () => {
      const row = el.closest(".item");
      row.classList.toggle("on", el.checked);
      const list = picked();
      const stops = storesInBag(list);
      if (stops.length > STOP_CAP) {
        el.checked = false;
        row.classList.remove("on");
        alert("Two stores is the cap. Uncheck one first or wait for the next walk.");
      }
      paintBag();
    });
  });
  const extraExists = MENU.some((s) => s.zone === zone && s.extra);
  const more = document.getElementById("moreBtn");
  more.style.display = extraExists ? "block" : "none";
  more.textContent = showExtra ? "Hide the longer-walk shops" : "Show the longer-walk shops";
  paintBag();
}
function setZone(next) {
  zone = next;
  showExtra = extraSeen[zone];
  document.getElementById("btnWp").className = zone==="wp" ? "on" : "";
  document.getElementById("btnSt").className = zone==="st" ? "on" : "";
  document.getElementById("runName").textContent = zone==="st" ? "Stonestown lunch" : "West Portal lunch";
  document.getElementById("runMeta").textContent = zone==="st" ? "Mall run · same lunch windows · 2 stores still the cap" : "Wed 12:30–1:30 · Thu 11:30–2:30 · lock before we walk";
  document.getElementById("zonePill").textContent = zone==="st" ? "STONESTOWN" : "WEST PORTAL";
  document.getElementById("placesTitle").textContent = zone==="st" ? "Stonestown shops" : "West Portal shops";
  renderMenu();
}
document.getElementById("btnWp").onclick = () => setZone("wp");
document.getElementById("btnSt").onclick = () => setZone("st");
document.getElementById("moreBtn").onclick = () => { showExtra = !showExtra; extraSeen[zone] = showExtra; renderMenu(); };
document.getElementById("markOpen").onclick = () => setRunState("open");
document.getElementById("markFull").onclick = () => setRunState("full");
document.getElementById("markWalk").onclick = () => setRunState("walk");
function setStatus(t) { document.getElementById("hookStatus").textContent = t; }
function refreshStatus() {
  const local = (localStorage.getItem(HOOK_KEY) || "").trim();
  if (local) setStatus("Using webhook saved on this device.");
  else if (BUILTIN_HOOK) setStatus("Using the deployed webhook. School computers can send.");
  else setStatus("No webhook in the deploy and none on this device. Paste into BUILTIN_HOOK and republish.");
}
refreshStatus();
paintState();
document.getElementById("saveHook").onclick = () => {
  const v = document.getElementById("hook").value.trim();
  if (!v.startsWith("https://discord.com/api/webhooks/")) { setStatus("That does not look like a Discord webhook URL."); return; }
  localStorage.setItem(HOOK_KEY, v);
  document.getElementById("hook").value = "";
  refreshStatus();
};
document.getElementById("testHook").onclick = async () => {
  const url = hook();
  if (!url) { setStatus("Save a webhook first."); return; }
  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: "Dorf Dash test ping. If you see this, webhooks work." }) });
    setStatus(r.ok ? "Test landed in Discord." : "Discord said no (" + r.status + ").");
  } catch (err) { setStatus("Browser blocked it or the URL is dead. Copy still works."); }
};
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (runState() !== "open") { alert("This run is closed."); return; }
  const list = picked();
  if (!list.length) { alert("Pick at least one thing."); return; }
  const missing = list.find((i) => i.need && !i.spec);
  if (missing) { alert("Write the exact thing for " + missing.name + "."); return; }
  const stops = storesInBag(list);
  const total = list.reduce((s,i) => s + i.cost + i.fee, 0);
  const bring = Math.ceil(total);
  const msg = [
    "DORF DASH RESERVE",
    "Who: " + document.getElementById("name").value.trim(),
    "Contact: " + document.getElementById("contact").value.trim(),
    "Pickup: " + document.getElementById("pickup").value.trim(),
    "Run: " + (zone==="st" ? "Stonestown" : "West Portal"),
    "Stores (" + stops.length + "/" + STOP_CAP + "): " + stops.join(", "),
    "Items:",
    ...list.map((i) => "  • " + i.name + (i.spec ? " — " + i.spec : "") + " (" + i.store + ") ~$" + (i.cost+i.fee).toFixed(2)),
    "Bring about $" + bring + " cash",
    document.getElementById("note").value.trim() ? "Note: " + document.getElementById("note").value.trim() : "Note: —"
  ].join("\n");
  const out = document.getElementById("out");
  out.style.display = "block";
  out.textContent = msg;
  const url = hook();
  let sent = false;
  if (url) {
    try {
      const r = await fetch(url, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ content: msg }) });
      sent = r.ok;
    } catch (err) { sent = false; }
  }
  try { await navigator.clipboard.writeText(msg); } catch (err) {}
  document.getElementById("go").textContent = sent ? "Pinged Discord" : "Copied — paste in Discord";
});
renderMenu();
