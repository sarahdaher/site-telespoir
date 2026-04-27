// Mot de passe admin — changez cette valeur !
const MOT_DE_PASSE = "cacahehe";

let data = null;

document.addEventListener("DOMContentLoaded", () => {
  // Login
  document
    .getElementById("login-btn")
    .addEventListener("click", tenterConnexion);
  document.getElementById("mdp-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") tenterConnexion();
  });
});

function tenterConnexion() {
  const mdp = document.getElementById("mdp-input").value;
  if (mdp === MOT_DE_PASSE) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
    chargerDonnees();
  } else {
    document.getElementById("login-error").textContent =
      "Mot de passe incorrect.";
  }
}

function chargerDonnees() {
  fetch("data/course.json")
    .then((r) => r.json())
    .then((d) => {
      data = d;
      afficherStats();
      remplirSelects();
      bindBoutons();
    })
    .catch(() => alert("Impossible de charger course.json"));
}

function afficherStats() {
  const taux = data.taux_km_euro || 1;
  const totalKm = data.familles.reduce((acc, f) => acc + f.km, 0);
  const totalDons =
    data.familles.reduce((acc, f) => acc + f.dons, 0) +
    (data.dons_directs || 0);
  const total = totalKm * taux + totalDons;

  const statsEl = document.getElementById("admin-stats");
  statsEl.innerHTML = `
    <div class="admin-stat-block">
      <span class="admin-stat-val">${total.toLocaleString("fr-FR")} €</span>
      <span class="admin-stat-label">Cagnotte totale</span>
    </div>
    <div class="admin-stat-block">
      <span class="admin-stat-val">${totalKm} km</span>
      <span class="admin-stat-label">Km parcourus</span>
    </div>
    <div class="admin-stat-block">
      <span class="admin-stat-val">${totalDons.toLocaleString("fr-FR")} €</span>
      <span class="admin-stat-label">Dons directs</span>
    </div>
    <div class="admin-stat-block">
      <span class="admin-stat-val">${data.familles.length}</span>
      <span class="admin-stat-label">Familles</span>
    </div>
  `;
}

function remplirSelects() {
  const kmSelect = document.getElementById("km-famille");
  const donSelect = document.getElementById("don-cible");

  kmSelect.innerHTML = "";
  // Garde seulement les familles dans don-cible (l'option globale est déjà dans le HTML)
  donSelect.innerHTML = `<option value="__global__">Don général (cagnotte globale)</option>`;

  data.familles.forEach((f) => {
    const opt1 = document.createElement("option");
    opt1.value = f.nom;
    opt1.textContent = f.nom;
    kmSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = f.nom;
    opt2.textContent = f.nom;
    donSelect.appendChild(opt2);
  });
}

function bindBoutons() {
  document.getElementById("btn-km").addEventListener("click", () => {
    const famille = document.getElementById("km-famille").value;
    const val = parseFloat(document.getElementById("km-valeur").value);
    if (isNaN(val) || val <= 0) {
      alert("Entrez un nombre de kilomètres valide.");
      return;
    }

    const f = data.familles.find((f) => f.nom === famille);
    if (f) {
      f.km = Math.round((f.km + val) * 10) / 10;
      ajouterLog(`➕ ${val} km ajoutés à ${famille} (total : ${f.km} km)`);
      afficherStats();
      document.getElementById("km-valeur").value = "";
    }
  });

  document.getElementById("btn-don").addEventListener("click", () => {
    const cible = document.getElementById("don-cible").value;
    const val = parseFloat(document.getElementById("don-valeur").value);
    if (isNaN(val) || val <= 0) {
      alert("Entrez un montant valide.");
      return;
    }

    if (cible === "__global__") {
      data.dons_directs = (data.dons_directs || 0) + val;
      ajouterLog(`💶 Don général de ${val} € enregistré`);
    } else {
      const f = data.familles.find((f) => f.nom === cible);
      if (f) {
        f.dons = (f.dons || 0) + val;
        ajouterLog(`💶 Don de ${val} € enregistré pour ${cible}`);
      }
    }
    afficherStats();
    document.getElementById("don-valeur").value = "";
  });

  document.getElementById("btn-export").addEventListener("click", exporterJSON);
}

function ajouterLog(message) {
  const log = document.getElementById("admin-log");
  const vide = log.querySelector(".log-empty");
  if (vide) vide.remove();

  const li = document.createElement("li");
  const now = new Date().toLocaleTimeString("fr-FR");
  li.textContent = `[${now}] ${message}`;
  log.prepend(li);
}

function exporterJSON() {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "course.json";
  a.click();
  URL.revokeObjectURL(url);
  ajouterLog("💾 JSON exporté — remplacez data/course.json sur le serveur");
}
