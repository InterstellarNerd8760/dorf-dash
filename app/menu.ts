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

/** In-store / pickup prices researched Sept 14 2026. Tax extra. Register wins. */
export const MENU_AS_OF = "Sept 14, 2026";

export const MENU: Store[] = [
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
