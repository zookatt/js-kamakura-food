import { clearCartAndReceipt } from "./cart.js";

const open = document.getElementById("pay-button");
const modal1 = document.getElementById("modal1");
const close = modal1.querySelector("[data-close=modal1]");

open.addEventListener("click", () => modal1.classList.add("active"));

close.addEventListener("click", () => {
  modal1.classList.remove("active");
  clearCartAndReceipt();
});
