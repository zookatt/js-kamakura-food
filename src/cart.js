import { products } from "../assets/data/data.js";

const cart = [];

// Has de crear una función que al hacer click en el botón "Añadir" de cada plato,
// aparezca en el carrito dicho plato (tienes una ejemplo impreso estáticamente del
// plato en el carrito, para que sepas como tiene que quedar). No puedes añadir dos
// veces el mismo plato. Al hacer click en el botón "x" se debe eliminar el plato del
// carrito de compras

function paintCart() {
  const cartProducts = document.getElementById("cart-products");

  if (cart.length === 0) {
    cartProducts.innerHTML = `<h3>Añade un plato a tu menú</h3>`;
    return;
  }

  cartProducts.innerHTML = cart
    .map(
      (product) => `
        <div class="cart-container">
          <button class="close-button" data-id="${product.id}">x</button>
          <div class="text-container">
            <h3>${product.name}</h3>
            <h5>${product.price} €</h5>
          </div>
        </div>
      `,
    )
    .join("");
}

//DEBE contener las funcionalidades del carrito de compras.
//  crear una función que al hacer click en el carrito de compras, abra el elemento que lo contiene y al volver hacer click, lo cierre.
export function initCart() {
  const cartButton = document.getElementById("cart");
  const cartContainer = document.getElementById("cart-container");
  const productsContainer = document.getElementById("products");

  cartButton.addEventListener("click", () => {
    if (cartContainer.style.display === "flex") {
      cartContainer.style.display = "none";
    } else {
      cartContainer.style.display = "flex";
    }
  });

  productsContainer.addEventListener("click", (event) => {
    if (!event.target.classList.contains("add-button")) {
      return;
    }

    const productId = Number(event.target.dataset.id);
    const productFound = products.find((product) => product.id === productId);
    const alreadyInCart = cart.find((product) => product.id === productId);

    if (!productFound || alreadyInCart) {
      return;
    }

    cart.push(productFound);
    paintCart();
  });

  const cartProductsContainer = document.getElementById("products-container");

  cartProductsContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".close-button");
    if (!button) return;

    const productId = Number(button.dataset.id);
    const index = cart.findIndex((product) => product.id === productId);

    if (index !== -1) {
      cart.splice(index, 1);
      paintCart();
    }
  });
  paintCart();
}
