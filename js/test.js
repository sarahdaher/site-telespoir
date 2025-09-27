// Affiche le md de l'accueil
if(document.getElementById('home-content')) {
  fetch('../content/home.md')
    .then(res => res.text())
    .then(text => {
      document.getElementById('home-content').innerHTML = marked.parse(text);
    });
}

// Fonction pour afficher les JSON 
function loadJSON(containerId, file) {
  const container = document.getElementById(containerId);
  if(!container) return;

  fetch('../content/' + file)
    .then(res => res.json())
    .then(items => {
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        let inner = `<h3>${item.title || item.name}</h3>`;
        if(item.role) inner += `<p>${item.role}</p>`;
        if(item.date) inner += `<p><strong>Date:</strong> ${item.date}</p>`;
        if(item.description) inner += `<p>${item.description}</p>`;
        if(item.image) inner += `<img src="${item.image}" alt="${item.title || item.name}">`;
        card.innerHTML = inner;
        container.appendChild(card);
      });
    });
}

loadJSON('projets-container', 'projets.json');
loadJSON('events-container', 'events.json');
loadJSON('equipe-container', 'equipe.json');
