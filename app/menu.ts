export type Zone = "wp" | "st";
export type RunState = "open" | "full" | "walk";

export type MenuItem = {
  name: string;
  cost: number;
  fee: number;
  need?: string;
};

export type Store = {
  zone: Zone;
  extra: boolean;
  store: string;
  where: string;
  blurb: string;
  tag?: "one-stop" | "long";
  items: MenuItem[];
};

export const KID_CAP = 5;
export const STOP_CAP = 2;
export const HOOK_KEY = "dorfDashWebhook";
export const STATE_KEY = "dorfDashRunState";

export const MENU: Store[] = [
  {
    zone: "wp",
    extra: false,
    store: "Shaw's",
    where: "122 West Portal Ave",
    blurb: "Candy counter, fudge, Mitchell's.",
    items: [
      { name: "Ice cream scoop", cost: 6, fee: 2 },
      { name: "Candy / fudge", cost: 5, fee: 2, need: "which candy" },
    ],
  },
  {
    zone: "wp",
    extra: false,
    store: "Hardware Coffee Co.",
    where: "32 West Portal Ave",
    blurb: "Coffee and pastries.",
    items: [
      { name: "Coffee drink", cost: 6, fee: 2, need: "drink + mods" },
      { name: "Pastry", cost: 5, fee: 2, need: "which pastry" },
    ],
  },
  {
    zone: "wp",
    extra: false,
    store: "Submarine Center",
    where: "820 Ulloa St",
    blurb: "Subs since 1981. Hot pastrami and the Atomic.",
    items: [
      { name: "Mini sub", cost: 10, fee: 2, need: "which mini" },
      { name: "Center sub", cost: 13, fee: 2.5, need: "which sub" },
      { name: "Hot pastrami", cost: 14, fee: 2.5 },
    ],
  },
  {
    zone: "wp",
    extra: false,
    store: "Little Original Joe's",
    where: "393 West Portal Ave",
    blurb: "Takeout Italian. Slice, knots, soft serve.",
    items: [
      { name: "Pizza slice", cost: 4, fee: 2, need: "pepperoni / cheese / other" },
      { name: "Garlic knots", cost: 10, fee: 2 },
      { name: "Sandwich / wrap", cost: 16, fee: 2.5, need: "which sandwich" },
    ],
  },
  {
    zone: "wp",
    extra: false,
    store: "Easy Breezy",
    where: "44 West Portal Ave",
    blurb: "Froyo.",
    items: [{ name: "Froyo", cost: 7, fee: 2, need: "size + flavors" }],
  },
  {
    zone: "wp",
    extra: false,
    store: "George's Donuts & Merriment",
    where: "West Portal",
    blurb: "Fancy donuts.",
    items: [{ name: "Donut", cost: 6, fee: 2, need: "which donut" }],
  },
  {
    zone: "wp",
    extra: true,
    store: "El Toreador",
    where: "50 West Portal Ave",
    blurb: "Mexican since 1980. Slower.",
    tag: "one-stop",
    items: [{ name: "Burrito / plate to go", cost: 16, fee: 2.5, need: "which plate" }],
  },
  {
    zone: "wp",
    extra: true,
    store: "Bursa Kebab",
    where: "60 West Portal Ave",
    blurb: "Turkish / Mediterranean.",
    tag: "one-stop",
    items: [{ name: "Wrap / plate", cost: 15, fee: 2.5, need: "which wrap" }],
  },
  {
    zone: "wp",
    extra: true,
    store: "Squat & Gobble",
    where: "West Portal",
    blurb: "Crepes and sandwiches.",
    tag: "one-stop",
    items: [{ name: "Crepe / sandwich", cost: 15, fee: 2.5, need: "which one" }],
  },
  {
    zone: "wp",
    extra: true,
    store: "Fresca",
    where: "24 West Portal Ave",
    blurb: "Peruvian. One-stop only.",
    tag: "one-stop",
    items: [{ name: "To-go plate", cost: 18, fee: 3, need: "which dish" }],
  },
  {
    zone: "wp",
    extra: true,
    store: "Eezy Freezy",
    where: "West Portal Ave",
    blurb: "Tiny grocery.",
    items: [
      { name: "Drink + snack", cost: 6, fee: 2, need: "exact items" },
      { name: "Named grocery item", cost: 8, fee: 2, need: "exact item" },
    ],
  },
  {
    zone: "wp",
    extra: true,
    store: "Peet's / Starbucks",
    where: "West Portal",
    blurb: "If Hardware is slammed.",
    items: [{ name: "Coffee drink", cost: 6, fee: 2, need: "drink + mods" }],
  },
  {
    zone: "wp",
    extra: true,
    store: "Safeway (Taraval)",
    where: "730 Taraval",
    blurb: "Extra walk. Only on a stacked run.",
    tag: "long",
    items: [{ name: "Named grocery / deli item", cost: 10, fee: 3, need: "exact item" }],
  },
  {
    zone: "st",
    extra: false,
    store: "Quickly",
    where: "Stonestown",
    blurb: "Boba / milk tea.",
    items: [{ name: "Boba / milk tea", cost: 7.5, fee: 3, need: "drink + sugar + ice" }],
  },
  {
    zone: "st",
    extra: false,
    store: "Wetzel's Pretzels",
    where: "Level 1 near Target",
    blurb: "Pretzels.",
    items: [
      { name: "Pretzel", cost: 6, fee: 3, need: "which pretzel" },
      { name: "Pretzel + drink", cost: 10, fee: 3 },
    ],
  },
  {
    zone: "st",
    extra: false,
    store: "Target",
    where: "Stonestown",
    blurb: "Short list only.",
    items: [{ name: "Named Target item", cost: 12, fee: 3, need: "exact item + aisle if you know it" }],
  },
  {
    zone: "st",
    extra: false,
    store: "Other mall food",
    where: "Stonestown",
    blurb: "One store per run. Write both.",
    tag: "one-stop",
    items: [{ name: "Named item at a named store", cost: 14, fee: 3, need: "store + exact item" }],
  },
];
