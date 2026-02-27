document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById('members-container');
  const select = document.getElementById('mandat-select');

  fetch("data/membres.json?v=2")
    .then(response => response.json())
    .then(data => {

      const mandats = Object.keys(data).sort().reverse();

      mandats.forEach(mandat => {
        const option = document.createElement("option");
        option.value = mandat;
        option.textContent = `Mandat ${mandat}`;
        select.appendChild(option);
      });

      const urlParams = new URLSearchParams(window.location.search);
      const mandatFromURL = urlParams.get("mandat");

      let currentMandat = mandats[0];

      if (mandatFromURL && data[mandatFromURL]) {
        currentMandat = mandatFromURL;
      }

      select.value = currentMandat;
      displayMembers(data[currentMandat]);

      // Changement de mandat
      select.addEventListener("change", () => {

        const selectedMandat = select.value;

        //Met à jour l'URL sans recharger la page ??????????
        const newUrl = `${window.location.pathname}?mandat=${selectedMandat}`;
        window.history.pushState({}, "", newUrl);

        fadeOut(() => {
          container.innerHTML = "";
          displayMembers(data[selectedMandat]);
        });

      });

    })
    .catch(err => console.error('Erreur chargement membres:', err));


  function displayMembers(members) {

    const preloadImages = members.map(member => {
      return new Promise(resolve => {
        const img = new Image();
        img.src = member.photo;
        img.onload = () => resolve(member);
        img.onerror = () => resolve(member);
      });
    });

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

      container.style.display = "flex";

      setTimeout(() => {
        container.style.opacity = "1";
      }, 50);

    });
  }

  function fadeOut(callback) {
    container.style.opacity = "0";

    setTimeout(() => {
      callback();
    }, 300);
  }

});