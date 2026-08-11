document.addEventListener("DOMContentLoaded", () => {
  fetch("data/course.json")
    .then((r) => r.json())
    .then((data) => {
      const taux = data.taux_km_euro || 1;

      // Calcul cagnotte totale
      const totalKmEuros = data.familles.reduce(
        (acc, f) => acc + f.km * taux,
        0,
      );
      const totalDons =
        data.familles.reduce((acc, f) => acc + f.dons, 0) +
        (data.dons_directs || 0);
      const total = totalKmEuros + totalDons;

      // Dernier palier global
      const dernierPalier =
        data.paliers_globaux[data.paliers_globaux.length - 1].montant;
      const objectif = Math.max(dernierPalier, total);

      // --- Montant total ---
      document.getElementById("montant-total").textContent =
        total.toLocaleString("fr-FR") + " €";
      document.getElementById("progress-objectif").textContent =
        `Objectif : ${dernierPalier.toLocaleString("fr-FR")} €`;

      // --- Barre de progression ---
      const pct = Math.min((total / dernierPalier) * 100, 100);
      document.getElementById("progress-bar").style.width = pct + "%";

      // Labels des paliers
      const labelsEl = document.getElementById("progress-labels");
      data.paliers_globaux.forEach((p) => {
        const span = document.createElement("span");
        span.className =
          "progress-label" + (total >= p.montant ? " atteint" : "");
        span.textContent = p.montant + " €";
        labelsEl.appendChild(span);
      });

      // Marqueurs sur la barre
      const barOuter = document.querySelector(".progress-bar-outer");
      data.paliers_globaux.forEach((p) => {
        const pctMarker = (p.montant / dernierPalier) * 100;
        if (pctMarker < 100) {
          const marker = document.createElement("div");
          marker.className = "palier-marker";
          marker.style.left = pctMarker + "%";
          barOuter.appendChild(marker);
        }
      });

      // --- Défis globaux ---
      const defisEl = document.getElementById("defis-globaux");
      data.paliers_globaux.forEach((p) => {
        const debloque = total >= p.montant;
        const card = document.createElement("div");
        card.className = "defi-card" + (debloque ? " debloque" : "");
        card.innerHTML = `
          <span class="defi-palier">À ${p.montant} €</span>
          <span class="defi-lock">${debloque ? "🔓" : "🔒"}</span>
          <span class="defi-texte">${p.defi}</span>
        `;
        defisEl.appendChild(card);
      });

      // --- Familles ---
      const famillesEl = document.getElementById("familles-grid");
      data.familles.forEach((f) => {
        const totalFamille = f.km * taux + f.dons;
        const dernierPalierFamille = f.paliers[f.paliers.length - 1].montant;
        const pctFamille = Math.min(
          (totalFamille / dernierPalierFamille) * 100,
          100,
        );

        const defisHTML = f.paliers
          .map((p) => {
            const debloque = totalFamille >= p.montant;
            return `
            <div class="famille-defi ${debloque ? "debloque" : ""}">
              <span class="famille-defi-icon">${debloque ? "" : "🔒"}</span>
              <span>${p.defi} <em style="color:#aaa;font-size:0.8rem">(${p.montant} €)</em></span>
            </div>`;
          })
          .join("");

        const card = document.createElement("div");
        card.className = "famille-card";
        card.style.borderTopColor = f.couleur;
        card.innerHTML = `
          <div class="famille-header">
            <span class="famille-nom">${f.nom}</span>
            <div class="famille-stats">
              <div class="famille-stat">
                <span class="stat-valeur">${f.km} km</span>
                <span class="stat-label">Course</span>
              </div>
              <div class="famille-stat">
                <span class="stat-valeur">${totalFamille.toLocaleString("fr-FR")} €</span>
                <span class="stat-label">Total</span>
              </div>
            </div>
          </div>
          <div class="famille-progress">
            <div class="famille-progress-inner" style="width:${pctFamille}%; background:${f.couleur}"></div>
          </div>
          <div class="famille-defis">${defisHTML}</div>
        `;
        famillesEl.appendChild(card);
      });

      // --- Classement course ---
      const classementEl = document.getElementById("classement");
      const sorted = [...data.familles].sort((a, b) => b.km - a.km);
      const maxKm = sorted[0]?.km || 1;
      const rangs = ["🥇", "🥈", "🥉"];
      const classes = ["or", "argent", "bronze"];

      sorted.forEach((f, i) => {
        const totalF = f.km * taux + f.dons;
        const ligne = document.createElement("div");
        ligne.className = "classement-ligne";
        ligne.innerHTML = `
          <span class="classement-rang ${classes[i] || ""}">${rangs[i] || i + 1}</span>
          <span class="classement-couleur" style="background:${f.couleur}"></span>
          <span class="classement-nom">${f.nom}</span>
          <div class="classement-bar-wrap">
            <div class="classement-bar" style="width:${(f.km / maxKm) * 100}%; background:${f.couleur}"></div>
          </div>
          <span class="classement-km">${f.km} km</span>
          <span class="classement-dons">${totalF.toLocaleString("fr-FR")} €</span>
        `;
        classementEl.appendChild(ligne);
      });
    })
    .catch((err) => console.error("Erreur chargement course.json :", err));
});
