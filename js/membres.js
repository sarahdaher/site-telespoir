document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('members-container');

  fetch('data/membres.json')
    .then(response => response.json())
    .then(members => {

      // Précharger toutes les images
      const preloadImages = members.map(member => {
        return new Promise(resolve => {
          const img = new Image();
          img.src = member.photo;
          img.onload = () => resolve(member);
          img.onerror = () => resolve(member); // continuer même si image manquante
        });
      });

      // Quand toutes les images sont prêtes
      Promise.all(preloadImages).then(readyMembers => {
        readyMembers.forEach(member => {
          const card = document.createElement('div');
          card.classList.add('member-card');
          card.innerHTML = `
            <img src="${member.photo}" alt="${member.prenom} ${member.nom}">
            <h3>${member.prenom} ${member.nom}</h3>
            <p>${member.poles.join(", ")}</p>
          `;
          container.appendChild(card);
        });

        // Afficher le conteneur seulement maintenant
        container.style.display = "flex"; // ou "grid" si tu utilises grid
      });

    })
    .catch(err => console.error('Erreur chargement membres:', err));
});
