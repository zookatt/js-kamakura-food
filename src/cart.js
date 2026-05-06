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

  paintCart();
}
