let open = document.getElementById("pay-button");
let modal1 = document.getElementById("modal1");
let close = modal1.querySelector("[data-close=modal1]");
open.addEventListener("click", () => modal1.classList.add("active"));
close.addEventListener("click", () => modal1.classList.remove("active"));
