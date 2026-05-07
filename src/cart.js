import { products } from "../assets/data/data.js";
import { clearReceipt, paintReceipt, showReceipt, hideReceipt } from "./receipt.js";

export const cart = [];

function updateCartTotal() {
  const cartTotal = document.getElementById("cart-total");
  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  cartTotal.textContent = `Total: ${total.toFixed(2)} €`;
}

export function paintCart() {
  const cartProducts = document.getElementById("cart-products");

  if (cart.length === 0) {
    cartProducts.innerHTML = `<h3>Añade un plato a tu menú</h3>`;
    updateCartTotal();
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
          <div class="quantity-container">
            <button class="add-quantity" data-id="${product.id}">+</button>
            <p class="quantity">${product.quantity}</p>
            <button class="rest-quantity" data-id="${product.id}">-</button>
          </div>
        </div>
      `,
    )
    .join("");

  updateCartTotal();
}

export function clearCartAndReceipt() {
  const cartContainer = document.getElementById("cart-container");

  cart.length = 0;
  paintCart();
  clearReceipt();
  hideReceipt();
  cartContainer.style.display = "none";
}

export function initCart() {
  const cartButton = document.getElementById("cart");
  const cartContainer = document.getElementById("cart-container");
  const productsContainer = document.getElementById("products");
  const cartProductsContainer = document.getElementById("products-container");
  const proceedPayButton = document.getElementById("proceedPay-button");
  const closeReceiptButton = document.getElementById("close-receipt");

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

    cart.push({
      ...productFound,
      quantity: 1,
    });

    paintCart();
  });

  cartProductsContainer.addEventListener("click", (event) => {
    const addButton = event.target.closest(".add-quantity");
    if (addButton) {
      const productId = Number(addButton.dataset.id);
      addQuantity(productId);
      return;
    }

    const restButton = event.target.closest(".rest-quantity");
    if (restButton) {
      const productId = Number(restButton.dataset.id);
      restQuantity(productId);
      return;
    }

    const removeButton = event.target.closest(".close-button");
    if (!removeButton) {
      return;
    }

    const productId = Number(removeButton.dataset.id);
    const index = cart.findIndex((product) => product.id === productId);

    if (index !== -1) {
      cart.splice(index, 1);
      paintCart();
    }
  });

  proceedPayButton.addEventListener("click", () => {
    if (cart.length === 0) {
      return;
    }

    paintReceipt(cart);
    showReceipt();
  });

  closeReceiptButton.addEventListener("click", () => {
    hideReceipt();
  });

  paintCart();
  clearReceipt();
}

function addQuantity(productId) {
  const product = cart.find((item) => item.id === productId);

  if (!product) {
    return;
  }

  product.quantity += 1;
  paintCart();
}

function restQuantity(productId) {
  const index = cart.findIndex((item) => item.id === productId);

  if (index === -1) {
    return;
  }

  cart[index].quantity -= 1;

  if (cart[index].quantity === 0) {
    cart.splice(index, 1);
  }

  paintCart();
}
