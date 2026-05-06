import { products } from "../assets/data/data.js";
import { initCart } from "./cart.js";
import { printFilters, printPlates } from "./searcher.js";

document.addEventListener("DOMContentLoaded", () => {
  printFilters();
  printPlates(products);
  initCart();
});
