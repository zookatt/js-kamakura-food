import { filters, products } from "../assets/data/data.js";

export function printFilters() {
  const filtersContainer = document.getElementById("filters");

  filtersContainer.innerHTML = filters
    .map(
      (filter) =>
        `<button class="filter" data-filter="${filter}">${filter}</button>`,
    )
    .join("");

  //cuando haces click en cada uno de los filtros, ha de mostrar solo los platos que forman parte de esa categoría.

  const filterButtons = document.querySelectorAll(".filter");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      if (selectedFilter === "todos") {
        printPlates();
        return;
      }

      const filteredProducts = products.filter(
        (product) => product.category === selectedFilter,
      );

      printPlates(filteredProducts);
    });
  });
}

//Has de manipular el DOM con una función de javascript, que imprima en pantalla los platos del menú (tienes una ejemplo impreso estáticamente del plato, para que sepas como tiene que quedar).

export function printPlates(productsArray) {
  const productContainer = document.getElementById("products");

  productContainer.innerHTML = productsArray
    .map(
      (product) => `<div class="product-container">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price-container">
                        <h5>${product.price}</h5>
                        <button class="add-button" data-id=${product.id}>Añadir</button>
                    </div>

                </div>`,
    )
    .join("");

  const addToCartButton = document.querySelectorAll(".add-button");
}
