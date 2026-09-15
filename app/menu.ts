export type MenuItem = {
  name: string;
  cost: number;
  fee: number;
  need?: string;
};

export type Store = {
  zone: "wp" | "st";
  extra: boolean;
  store: string;
  where: string;
  blurb: string;
  tag?: string;
  items: MenuItem[];
};

export const KID_CAP = 5;
export const STOP_CAP = 2;

export const MENU: Store[] = [
  {
    zone: "wp",
    extra: false,
    store: "Shaw's",
    where: "122 West Portal Ave",
    blurb: "Since 1931. Mitchell's scoops, house fudge, candy counter.",
    items: [
      { name: "Mitchell's single scoop", cost: 6.25, fee: 2 },
      { name: "Mitchell's double scoop", cost: 8.75, fee: 2 },
      { name: "Candy / fudge bag", cost: 6, fee: 2, need: "which candy or fudge" },
    ],
  },
  {
    zone: "wp",
    extra: false,
    store: "Hardware Coffee Co.",
    where: "32 West Portal Ave",
    blurb: "Opened May 2026 in the old hardware shop. Espresso + pastry case.",
    items: [
      { name: "Latte / mocha / matcha", cost: 6.5, fee: 2, need: "drink + iced/hot + mods" },
      { name: "Espresso / drip / americano", cost: 5, fee: 2, need: "which drink" },
      { name: "Pastry (croissant / cookie)", cost: 5.5, fee: 2, need: "which pastry" },
    ],
  },
  {
    zone: "wp",
    extra: false,
    store: "Submarine Center",
    where: "820 Ulloa St",
    blurb: "Counter since 1981. Mini / Center / Super. Toast + jalapeños if you want them.",
    items: [
      { name: "Mini sub (S1–S9)", cost: 9.9, fee: 2, need: "which mini + toasted?" },
      { name: "Center sub (S1–S9)", cost: 13.1, fee: 2.5, need: "which center + toasted?" },
      { name: "Hot pastrami Center (S6)", cost: 13.1, fee: 2.5 },
      { name: "The Atomic Center", cost: 15.25, fee: 2.5 },
    ],
  },
  {
    zone: "wp",
    extra: false,
    store: "Little Original Joe's",
    where: "393 West Portal Ave",
    blurb: "Slices until 4pm. Knots and wraps all lunch.",
    items: [
      { name: "Cheese slice", cost: 3, fee: 2 },
      { name: "Pepperoni / veg / slice of the day", cost: 4, fee: 2, need: "which slice" },
      { name: "Garlic parm knots (6)", cost: 10, fee: 2 },
      { name: "CBR wrap or sandwich", cost: 15.5, fee: 2.5, need: "CBR wrap / which sandwich" },
    ],
  },
  {
    zone: "wp",
    extra: false,
    store: "Easy Breezy",
    where: "44 West Portal Ave",
    blurb: "Self-serve froyo / custard by the ounce (~81¢/oz) + 4.5% shop fee.",
    items: [
      { name: "Small cup (~8 oz)", cost: 7.5, fee: 2, need: "flavors + toppings" },
      { name: "Medium cup (~12 oz)", cost: 10.5, fee: 2, need: "flavors + toppings" },
    ],
  },
  {
    zone: "wp",
    extra: false,
    store: "George's Donuts & Merriment",
    where: "163 West Portal Ave",
    blurb: "Fancy donuts. Classic glazed ~$5, filled brioche ~$7. They cap boxes.",
    items: [
      { name: "Classic donut (glazed / sprinkle)", cost: 5, fee: 2, need: "which donut" },
      { name: "Filled brioche donut", cost: 7, fee: 2, need: "which filled" },
    ],
  },
  {
    zone: "wp",
    extra: true,
    store: "El Toreador",
    where: "50 West Portal Ave",
    blurb: "Sit-down Mexican since 1980. Slow kitchen. One-stop only.",
    tag: "one-stop",
    items: [
      { name: "Mission / veggie burrito", cost: 16, fee: 2.5, need: "which burrito" },
      { name: "Carne asada / carnitas burrito", cost: 17.25, fee: 2.5, need: "asada or carnitas" },
    ],
  },
  {
    zone: "wp",
    extra: true,
    store: "Bursa",
    where: "60 West Portal Ave",
    blurb: "Turkish / Mediterranean. Wrap is the dash item; plates run $25+.",
    tag: "one-stop",
    items: [
      { name: "Falafel or kebab wrap", cost: 17, fee: 2.5, need: "chicken / falafel / beef + fries or salad" },
      { name: "Chicken kebab plate", cost: 25, fee: 3, need: "mods" },
    ],
  },
  {
    zone: "wp",
    extra: true,
    store: "Squat & Gobble",
    where: "1 West Portal Ave",
    blurb: "Crepes. Kitchen is slower than a counter shop.",
    tag: "one-stop",
    items: [
      { name: "Savory crepe", cost: 16, fee: 2.5, need: "which crepe (Philly, pesto, build-your-own)" },
      { name: "Sweet crepe", cost: 12, fee: 2.5, need: "which sweet" },
    ],
  },
  {
    zone: "wp",
    extra: true,
    store: "Fresca",
    where: "24 West Portal Ave",
    blurb: "Peruvian. Real plates, not a grab. One-stop only.",
    tag: "one-stop",
    items: [
      { name: "Salchipapas / tacos", cost: 16, fee: 3, need: "which starter" },
      { name: "Lomo saltado / ceviche", cost: 28, fee: 3, need: "which plate" },
    ],
  },
  {
    zone: "wp",
    extra: true,
    store: "Eezy Freezy",
    where: "West Portal Ave",
    blurb: "Tiny independent grocery. Write exact SKUs.",
    items: [
      { name: "Drink + snack", cost: 7, fee: 2, need: "exact items" },
      { name: "Named grocery item", cost: 9, fee: 2, need: "exact item" },
    ],
  },
  {
    zone: "wp",
    extra: true,
    store: "Peet's / Starbucks",
    where: "West Portal",
    blurb: "Backup if Hardware is slammed. Grande-ish drink.",
    items: [{ name: "Grande latte / cold brew", cost: 6.5, fee: 2, need: "shop + drink + mods" }],
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
    blurb: "Milk tea $4.99–$5.75. Cream brûlée / latte drinks ~$6.50–$7.",
    items: [
      { name: "Classic / jasmine milk tea", cost: 5.75, fee: 3, need: "flavor + sugar + ice + topping" },
      { name: "Boba latte / cream brûlée", cost: 6.99, fee: 3, need: "which drink + sugar + ice" },
    ],
  },
  {
    zone: "st",
    extra: false,
    store: "Wetzel's Pretzels",
    where: "Level 1 near Target",
    blurb: "Original ~$6.70. Cinnamon / almond / pepperoni twist a bit more.",
    items: [
      { name: "Original pretzel", cost: 6.7, fee: 3 },
      { name: "Specialty pretzel", cost: 7.5, fee: 3, need: "cinnamon / almond / pepperoni / cheese" },
      { name: "Pretzel + drink", cost: 11, fee: 3, need: "which pretzel" },
    ],
  },
  {
    zone: "st",
    extra: false,
    store: "Target",
    where: "Stonestown",
    blurb: "Short list only. Write aisle if you know it.",
    items: [{ name: "Named Target item", cost: 12, fee: 3, need: "exact item + aisle if you know it" }],
  },
  {
    zone: "st",
    extra: false,
    store: "Other mall food",
    where: "Stonestown",
    blurb: "One extra store per run. Write both the shop and the item.",
    tag: "one-stop",
    items: [{ name: "Named item at a named store", cost: 14, fee: 3, need: "store + exact item" }],
  },
];
