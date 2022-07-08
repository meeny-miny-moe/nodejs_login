"use strict";

const toggleBtn = document.querySelector(".navbar_togglebtn");
const sidebar = document.querySelector(".navbar_side");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
