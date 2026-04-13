import { filters } from "../assets/data/data.js";

export function printFilters() {
  const filtersContainer = document.getElementById("filters");

  filtersContainer.innerHTML = filters
    .map((filter) => `<button class="filter" ">${filter}</button>`)
    .join("");
}
