export function paintReceipt(cart) {
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

export function clearReceipt() {
  const receiptProduct = document.getElementById("receipt-product");
  const receiptTotal = document.getElementById("receipt-total");

  receiptProduct.innerHTML = "";
  receiptTotal.textContent = "Total: 0.00 €";
}

export function showReceipt() {
  const receiptContainer = document.getElementById("receipt-container");
  receiptContainer.style.display = "block";
}

export function hideReceipt() {
  const receiptContainer = document.getElementById("receipt-container");
  receiptContainer.style.display = "none";
}
