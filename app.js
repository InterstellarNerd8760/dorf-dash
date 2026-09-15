const STATE_KEY = "dorfDashRunState";
const KID_CAP = 5;
const STOP_CAP = 2;
const MENU = [
  {
    zone: "wp",
    extra: false,
    store: "Shaw's",
    where: "122 West Portal Ave",
    blurb: "Since 1931. Mitchell’s scoops, house fudge, candy counter. Pickup menu, not delivery.",
    items: [
      { name: "Mitchell's single scoop", cost: 6.25, fee: 2, need: "flavor + cup/cone" },
      { name: "Mitchell's double scoop", cost: 8.75, fee: 2, need: "two flavors" },
      { name: "Sundae (single)", cost: 9, fee: 2, need: "flavor + fudge or caramel" },
      { name: "Milkshake", cost: 9, fee: 2, need: "flavor" },
      { name: "Candy / fudge bag", cost: 6, fee: 2, need: "which candy or fudge (Dubai chocolate fudge is a thing)" },
    ],
  },
  {
    zone: "wp",
    extra: false,
    store: "Hardware Coffee Co.",
    where: "32 West Portal Ave",
    blurb: "Opened May 2026 in the old hardware shop. Opening menu still on the board.",
    items: [
      { name: "Latte", cost: 6.5, fee: 2, need: "hot/iced + milk + flavor (+$1 flavor, +75¢ alt milk)" },
      { name: "Mocha", cost: 7, fee: 2, need: "hot/iced" },
      { name: "Matcha latte", cost: 8, fee: 2, need: "hot/iced + milk" },
      { name: "Cold brew / drip / americano", cost: 5.5, fee: 2, need: "which drink (drip $5, cold brew $6)" },
      { name: "Butter or chocolate croissant", cost: 5.5, fee: 2, need: "which pastry" },
      { name: "Chocolate chip cookie", cost: 5.5, fee: 2 },
      { name: "Hardware egg sandwich", cost: 14, fee: 2.5, need: "mods (fried egg, cheddar, bacon, English muffin)" },
    ],
  },
  {
    zone: "wp",
    extra: false,
    store: "Submarine Center",
    where: "820 Ulloa St",
    blurb: "Counter since 1981. Mini / Center / Super. Comes with mustard, mayo, onion, lettuce, tomato, secret sauce. Ask toasted + jalapeños.",
    items: [
      { name: "Mini turkey (S4)", cost: 9.3, fee: 2, need: "toasted? jalapeños?" },
      { name: "Mini hot pastrami (S6)", cost: 9.9, fee: 2, need: "toasted? jalapeños?" },
      { name: "Mini classic (S1 ham + salami)", cost: 9.6, fee: 2, need: "toasted?" },
      { name: "Center turkey (S4)", cost: 12.3, fee: 2.5, need: "toasted? jalapeños?" },
      { name: "Center hot pastrami (S6)", cost: 13.1, fee: 2.5, need: "toasted? jalapeños?" },
      { name: "The Atomic Center (S10)", cost: 15.25, fee: 2.5, need: "toasted? (pastrami, turkey, cheese, corned beef, jalapeños)" },
      { name: "Chips + fountain soda", cost: 4.5, fee: 2, need: "which chips + which soda" },
    ],
  },
  {
    zone: "wp",
    extra: false,
    store: "Little Original Joe's",
    where: "393 West Portal Ave",
    blurb: "Official lunch menu. Slices until 4pm. Knots and wraps all lunch.",
    items: [
      { name: "Cheese slice", cost: 3, fee: 2 },
      { name: "Pepperoni / veg / slice of the day", cost: 4, fee: 2, need: "which slice" },
      { name: "Garlic parm knots (6)", cost: 10, fee: 2, need: "marinara or ranch" },
      { name: "Chicken Caesar wrap", cost: 14.5, fee: 2.5 },
      { name: "CBR wrap", cost: 15.5, fee: 2.5 },
      { name: "Italian sub or ham & cheese panini", cost: 14.5, fee: 2.5, need: "Italian sub or panini" },
      { name: "Chicken parm sub", cost: 15.5, fee: 2.5 },
    ],
  },
  {
    zone: "wp",
    extra: false,
    store: "Easy Breezy",
    where: "44 West Portal Ave",
    blurb: "Self-serve froyo / custard. 81¢/oz + 4.5% shop fee. Weigh it yourself.",
    items: [
      { name: "Small cup (~8 oz + toppings)", cost: 7.5, fee: 2, need: "flavors + toppings" },
      { name: "Medium cup (~12 oz + toppings)", cost: 10.5, fee: 2, need: "flavors + toppings" },
    ],
  },
  {
    zone: "wp",
    extra: false,
    store: "George's Donuts & Merriment",
    where: "163 West Portal Ave",
    blurb: "Fancy donuts. Chronicle listed $3.50–$4.75 at open; expect ~$5 now. They cap boxes at 6.",
    items: [
      { name: "Classic donut (glazed / chocolate / sprinkle)", cost: 5, fee: 2, need: "which donut" },
      { name: "Filled brioche (key lime / crème brûlée / bacon & eggs)", cost: 6.5, fee: 2, need: "which filled" },
      { name: "Fries for a King", cost: 10, fee: 2 },
    ],
  },
  {
    zone: "wp",
    extra: true,
    store: "El Toreador",
    where: "50 West Portal Ave",
    blurb: "Sit-down Mexican since 1980. Official food menu. Slow kitchen. One-stop only.",
    tag: "one-stop",
    items: [
      { name: "Vegetarian burrito", cost: 14.95, fee: 2.5 },
      { name: "Mission burrito (machaca beef or chicken)", cost: 15.95, fee: 2.5, need: "beef or chicken" },
      { name: "Carne asada burrito", cost: 17.25, fee: 2.5 },
      { name: "Carnitas burrito", cost: 17.25, fee: 2.5 },
    ],
  },
  {
    zone: "wp",
    extra: true,
    store: "Bursa",
    where: "60 West Portal Ave",
    blurb: "Turkish / Mediterranean. Wrap is the dash item (comes with fries or salad). Plates run $25+.",
    tag: "one-stop",
    items: [
      { name: "Falafel wrap", cost: 14, fee: 2.5, need: "fries or salad" },
      { name: "Citrus chicken wrap", cost: 15, fee: 2.5, need: "fries or salad" },
      { name: "Adana or kofte wrap", cost: 16, fee: 2.5, need: "adana or kofte + fries or salad" },
      { name: "Chicken kebab lunch plate", cost: 15, fee: 3, need: "lunch menu until 4pm" },
    ],
  },
  {
    zone: "wp",
    extra: true,
    store: "Squat & Gobble",
    where: "1 West Portal Ave",
    blurb: "Crepes. Kitchen is slower than a counter shop. Official dessert crepes $14.95.",
    tag: "one-stop",
    items: [
      { name: "Build-your-own crepe", cost: 13.15, fee: 2.5, need: "cheese + up to 3 veggies" },
      { name: "Savory crepe (Philly / pesto / fajita)", cost: 17.95, fee: 2.5, need: "which crepe" },
      { name: "Dessert crepe (Nutella / Whole Thing / strawberry)", cost: 14.95, fee: 2.5, need: "which sweet" },
    ],
  },
  {
    zone: "wp",
    extra: true,
    store: "Fresca",
    where: "24 West Portal Ave",
    blurb: "Peruvian. Real plates, not a grab. One-stop only. Prices from the Fresca board (Noe Valley Toast is the same kitchen family).",
    tag: "one-stop",
    items: [
      { name: "Salchipapas", cost: 15, fee: 3 },
      { name: "Salmon tacos", cost: 18, fee: 3 },
      { name: "Lunch lomo saltado", cost: 29, fee: 3, need: "mods" },
    ],
  },
  {
    zone: "wp",
    extra: true,
    store: "Eezy Freezy",
    where: "25 West Portal Ave",
    blurb: "Family Irish grocery. Cadbury, Tayto, Barry’s tea, drinks. Write the exact SKU.",
    items: [
      { name: "Drink + snack (Tayto / Cadbury / soda)", cost: 7, fee: 2, need: "exact items" },
      { name: "Named grocery item", cost: 9, fee: 2, need: "exact item (Barry’s tea, Lucozade, etc.)" },
    ],
  },
  {
    zone: "wp",
    extra: true,
    store: "Peet's Coffee",
    where: "54 West Portal Ave",
    blurb: "Backup if Hardware is slammed. West Portal coffeebar.",
    items: [
      { name: "Caffe latte", cost: 6.1, fee: 2, need: "size + hot/iced + mods" },
      { name: "Matcha latte", cost: 6.5, fee: 2, need: "hot/iced + sweetened?" },
    ],
  },
  {
    zone: "wp",
    extra: true,
    store: "Safeway (Taraval)",
    where: "730 Taraval",
    blurb: "Parkside, not the avenue. Extra walk. Stacked runs only.",
    tag: "long",
    items: [{ name: "Named grocery / deli item", cost: 10, fee: 3, need: "exact item" }],
  },
  {
    zone: "st",
    extra: false,
    store: "Quickly",
    where: "Stonestown main entrance",
    blurb: "Pickup board: classic milk tea $4.99, flavored $5.75. Boba is extra unless the drink includes it.",
    items: [
      { name: "Classic / jasmine milk tea", cost: 4.99, fee: 3, need: "flavor + sugar + ice + topping" },
      { name: "Flavored milk tea (taro / Thai / brown sugar / panda)", cost: 5.75, fee: 3, need: "which flavor + sugar + ice + topping" },
      { name: "Cream brûlée milk tea", cost: 6.5, fee: 3, need: "which tea + sugar + ice" },
      { name: "Boba latte (brown sugar / strawberry / taro)", cost: 6.99, fee: 3, need: "which latte + sugar + ice" },
    ],
  },
  {
    zone: "st",
    extra: false,
    store: "Wetzel's Pretzels",
    where: "Level 1 near Target",
    blurb: "Stonestown DoorDash board: original $7.39. Specialty a bit more.",
    items: [
      { name: "Original pretzel (butter + salt)", cost: 7.39, fee: 3 },
      { name: "Specialty pretzel", cost: 8.29, fee: 3, need: "cinnamon / almond / pepperoni / cheese" },
      { name: "Wetzel dog", cost: 9.5, fee: 3, need: "plain or cheese dog" },
    ],
  },
  {
    zone: "st",
    extra: false,
    store: "Shake Shack",
    where: "Stonestown Galleria",
    blurb: "Mall counter. Stonestown listing: cheeseburger $9.99, fries $6.29.",
    items: [
      { name: "Cheeseburger", cost: 9.99, fee: 3, need: "mods (no tomato, extra ShackSauce…)" },
      { name: "Fries", cost: 6.29, fee: 3, need: "regular or spicy" },
      { name: "Cheeseburger + fries", cost: 16.28, fee: 3, need: "burger mods" },
    ],
  },
  {
    zone: "st",
    extra: true,
    store: "Panda Express",
    where: "Stonestown, 3251 20th Ave",
    blurb: "Mall food court. SF plates run higher than the national $11 board.",
    tag: "one-stop",
    items: [
      { name: "Bowl (1 entree + 1 side)", cost: 11.5, fee: 3, need: "entree + side (orange chicken, chow mein…)" },
      { name: "Plate (2 entrees + 1 side)", cost: 13.5, fee: 3, need: "two entrees + side" },
    ],
  },
  {
    zone: "st",
    extra: true,
    store: "Target",
    where: "Stonestown",
    blurb: "Short list only. Write aisle if you know it.",
    items: [{ name: "Named Target item", cost: 12, fee: 3, need: "exact item + aisle if you know it" }],
  },
  {
    zone: "st",
    extra: true,
    store: "Other mall food",
    where: "Stonestown",
    blurb: "Nar Doner, Rooster & Rice, Supreme Dumpling, Kizuki. One extra store per run. Write the shop.",
    tag: "one-stop",
    items: [{ name: "Named item at a named store", cost: 14, fee: 3, need: "store + exact item" }],
  },
];
let zone = "wp";
let showExtra = false;
const extraSeen = { wp:false, st:false };
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
paintState();
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
  try { await navigator.clipboard.writeText(msg); } catch (err) {}
  document.getElementById("go").textContent = "Copied — screenshot this or use the live site";
});
renderMenu();
