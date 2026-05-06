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
          <div class="quantity-container">
  <button class="add-quantity" data-id="${product.id}">+</button>
  <p class="quantity">${product.quantity}</p>
  <button class="rest-quantity" data-id="${product.id}">-</button>
</div>
        </div>
      `,
    )
    .join("");
  //
  const cartTotal = document.getElementById("cart-total");

  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  cartTotal.textContent = `Total: ${total.toFixed(2)} €`;
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

    cart.push({
      ...productFound,
      quantity: 1,
    });
    paintCart();
  });

  const cartProductsContainer = document.getElementById("products-container");

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

  const proceedPayButton = document.getElementById("proceedPay-button");
  const receiptContainer = document.getElementById("receipt-container");

  proceedPayButton.addEventListener("click", () => {
    paintReceipt();
    receiptContainer.style.display = "block";
  });

  const closeReceiptButton = document.getElementById("close-receipt");

  closeReceiptButton.addEventListener("click", () => {
    receiptContainer.style.display = "none";
  });
  proceedPayButton.addEventListener("click", () => {
    if (cart.length === 0) {
      return;
    }

    paintReceipt();
    receiptContainer.style.display = "block";
  });
}

// El plato del carrito de compras lleva un contador, has de crear la función que recoja la cantidad
// escogida y haga el cálculo para obtener el subtotal por cada plato y luego que imprima el total
// de todos los platos en pantalla, dentro del texto que dice "Total: €". Cuando el contador llegue
// a 0 deberá desaparecer el plato del carrito de compras.

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

function paintReceipt() {
  const receiptProduct = document.getElementById("receipt-product");
  const receiptTotal = document.getElementById("receipt-total");

  receiptProduct.innerHTML = cart
    .map(
      (product) => `
        <div class="receipt-product">
          <h3>${product.name}</h3>
          <div class="receipt-price">
            <p>Cantidad: ${product.quantity}</p>
            <h5>${(product.price * product.quantity).toFixed(2)} €</h5>
          </div>
        </div>
      `,
    )
    .join("");

  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  receiptTotal.textContent = `Total: ${total.toFixed(2)} €`;
}
