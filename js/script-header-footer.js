document.addEventListener("DOMContentLoaded", () => {

  // --- Injecter le header ---
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;

      // --- Menu toggle mobile ---
      const menuToggle = document.querySelector(".menu-toggle");
      const nav = document.querySelector("header nav");

      if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
          nav.classList.toggle("active");
        });
      }

      // --- Dropdown mobile pour "Pôles" ---
      const dropdowns = document.querySelectorAll(".dropdown");
      dropdowns.forEach(drop => {
        const link = drop.querySelector("a");
        link.addEventListener("click", (e) => {
          if (window.innerWidth <= 768) { // seulement sur mobile
            e.preventDefault();
            drop.classList.toggle("active");
          }
        });
      });

    });

  // --- Injecter le footer ---
  fetch('footer.html')
    .then(response => response.text())
    .then(data => document.getElementById('footer').innerHTML = data);

});
