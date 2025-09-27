document.addEventListener("DOMContentLoaded", () => {

  // --- Injecter le header ---
  fetch('header.html')
    .then(res => res.text())
    .then(data => {
      const header = document.getElementById('header');
      header.innerHTML = data;

      const nav = header.querySelector('nav');
      const menuToggle = header.querySelector('.menu-toggle');
      const dropdowns = header.querySelectorAll('.dropdown');

      // Menu mobile toggle
      menuToggle?.addEventListener('click', e => {
        e.stopPropagation();
        nav.classList.toggle('active');
      });

      // Dropdown toggle pour PC et mobile
      dropdowns.forEach(drop => {
        const link = drop.querySelector('a');

        link.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();

          const isActive = drop.classList.contains('active');

          // Fermer tous les dropdowns
          dropdowns.forEach(d => d.classList.remove('active'));

          // Si ce n’était pas actif, on l’ouvre
          if (!isActive) {
            drop.classList.add('active');
          }
        });
      });

      // Clic en dehors ferme tout
      document.addEventListener('click', () => {
        dropdowns.forEach(d => d.classList.remove('active'));
        if (window.innerWidth <= 768) {
          nav.classList.remove('active');
        }
      });

      // Empêcher le clic dans nav de fermer immédiatement
      nav.addEventListener('click', e => e.stopPropagation());
    });

  // --- Injecter le footer ---
  fetch('footer.html')
    .then(res => res.text())
    .then(data => document.getElementById('footer').innerHTML = data);

});
