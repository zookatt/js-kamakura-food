import { products } from "../assets/data/data.js";
import { printFilters, printPlates } from "./searcher.js";

document.addEventListener("DOMContentLoaded", () => {
  printFilters();
  printPlates(products);
});
