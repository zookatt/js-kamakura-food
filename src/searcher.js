import { filters, products } from "../assets/data/data.js";

export function printFilters() {
  const filtersContainer = document.getElementById("filters");

  filtersContainer.innerHTML = filters
    .map((filter) => `<button class="filter" ">${filter}</button>`)
    .join("");
}

//cuando haces click en cada uno de los filtros, ha de mostrar solo los platos que forman parte de esa categoría.

//Has de manipular el DOM con una función de javascript, que imprima en pantalla los platos del menú (tienes una ejemplo impreso estáticamente del plato, para que sepas como tiene que quedar).

export function printPlates() {
  const productContainer = document.getElementById("products");
  console.log(productContainer);
  productContainer.innerHTML = products
    .map(
      (product) => `<div class="product-container">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price-container">
                        <h5>${product.price}</h5>
                        <button class="add-button">Añadir</button>
                    </div>

                </div>`,
    )
    .join("");
}
