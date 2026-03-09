const events = [
  {
    title: "Stand de vente de seconde main",
    day: "19",
    month: "Feb",
    year: "2026",
    image: "images/events/marche-solidaire-telespoir.jpeg",
    imageAlt: "Vente de seconde main",
    content: `
    Le jeudi 19 février, Télespoir a organisé un stand de vente de seconde main dans le hall de Télécom, avec la ressourcerie Réuniv’. Nous remercions l’administration pour leurs généreux dons, dont la vaste majorité ont étés vendus à prix réduit. Cette initiative vise a permettre l’installation des étudiants sur le plateau, notamment des élèves internationaux. Cet évenement deviendra une action récurrente de notre association.`,
    footer: `<em>Merci à tous !</em>`,
  },
  {
    title: "Envoyez une lettre pour Noël",
    month: "Dec",
    year: "2025",
    image: "images/events/lettre.jpeg",
    imageAlt: "Lettre de Noël",
    content: `
      Pour Noël, Télespoir et le pôle TSÉ de Télécom vous proposent d’aider les personnes isolées 
      en leur envoyant une lettre via l’association « Une lettre un sourire » 🕊️🕊️.  
      Vous pouvez écrire une lettre directement sur leur site en scannant le QR code ou via ce lien : 
      <a href="https://1lettre1sourire.org/ecrire-une-lettre-fr/" target="_blank">https://1lettre1sourire.org/ecrire-une-lettre-fr/</a>.<br>
      Si vous préférez écrire une lettre manuscrite, déposez-la en salle 2C54 🫶.<br>
      Pensez à indiquer Télespoir comme référent du projet !
    `,
    footer: `<em>Merci pour votre générosité !</em>`,
  },
  {
    title: "Bingo",
    day: "02",
    month: "Dec",
    year: "2025",
    image: "images/events/bingo1.jpeg",
    imageAlt: "Bingo",
    content: `
      Le mardi 2 décembre 2025, nous avons organisé le traditionnel Bingo de Télespoir. 
      Grâce aux dons de nombreuses associations, de nombreux lots ont été proposés, 
      dont un iPad offert par le Forum, une place WEFA et 5 places POT offertes par le BDE, ainsi que divers goodies. 
      Au total, 394 grilles ont été vendues et une soixantaine de lots étaient à gagner. 
      Un grand merci à Telecroisiere, Teleplouf, BDI, TeleBreizh, Snoox, Fanfare, Telecapote, Ludo, BDS, Groupe Ultras, Gala, Bar, Thé-Lait-Café, Les Plaisirs de la Table, MAD, Snax, TSM, Fraise Framboise, La Scène, Telecom Etude, FUPS, TBF, Telecom Racing, Comete, Salon du Terroir, KFT et Forum pour leurs dons.
    `,
    footer: `<em>Félicitations à tous les gagnants !</em>`,
  },
  {
    title: "Deuxième maraude de l’année scolaire 2025/2026",
    day: "23",
    month: "Oct",
    year: "2025",
    image: "images/events/maraude2.jpeg",
    imageAlt: "Deuxième maraude 2025/2026",
    content: `
      Le jeudi 23 octobre 2025, nous avons organisé la deuxième maraude de l'année,
      cette fois en collaboration avec le pôle TSE à l’occasion de la Journée de la Nourriture.
      Grâce à la mobilisation d’un grand nombre de Télécommiens ainsi que de plusieurs membres de l’administration,
      nous avons pu mettre en place une grande distribution dans Paris.
      Au total, près de <strong>35 personnes</strong> ont participé à la préparation et à la distribution.
      Nous avons pu remettre près de <strong>100 repas</strong> aux personnes dans le besoin.
    `,
    footer: `<em>Merci à tous ceux qui ont pu participer :) 🙏</em>`,
  },
  {
    title: "Friperie de Télespoir",
    day: "13",
    month: "Oct",
    year: "2025",
    content: `
      À l'occasion de l'événement bien-être de Télécom Paris, Télespoir a tendu un stand friperie dans le hall de Télécom Paris pour vendre quelques goodies et vétements aux étudiants présents.`,
    footer: "Merci à tous",
  },
  {
    title: "Première maraude de l’année scolaire 2025/2026",
    day: "23",
    month: "Sep",
    year: "2025",
    image: "images/events/maraude1.jpeg",
    imageAlt: "Première maraude 2025/2026",
    content: `
      Le jeudi 23 septembre 2025, on a fait la première maraude de la nouvelle année scolaire ! 
      Grâce à la mobilisation d’un grand nombre de NainAs, nous avons pu organiser une distribution à plus grande échelle.
      Au total, près de <strong>25 personnes</strong> ont participé à la préparation, et plus de <strong>30 à la distribution</strong>.
      Répartis en six groupes, ils ont couvert plusieurs zones de Châtelet, Gare de l’Est, Gare du Nord, Gare de Lyon et Boulevard Saint Germain.
      Au total, nous avons pu distribuer près de <strong>100 repas</strong>.
    `,
    footer: `<em>Merci à tous ceux qui ont pu participer :) 🙏</em>`,
  },
];

function renderEvents() {
  const container = document.getElementById("events-list");

  container.innerHTML = events
    .map(
      (event) => `
    <section class="event-card">

      <div class="event-title-bar">
        <h2 class="event-title">${event.title}</h2>
      </div>

      <div class="event-body">

        <div class="event-date">
          ${event.day ? `<span class="day">${event.day}</span>` : ""}
          ${event.month ? `<span class="month">${event.month}</span>` : ""}
          ${event.year ? `<span class="year">${event.year}</span>` : ""}
        </div>

        ${
          event.image
            ? `
        <div class="event-image-wrapper">
          <img src="${event.image}" alt="${event.imageAlt || ""}" class="event-image">
        </div>`
            : ""
        }

        <div class="event-content">
          ${event.content ? `<p>${event.content}</p>` : ""}
          ${event.footer ? `<p>${event.footer}</p>` : ""}
        </div>

      </div>
    </section>
  `,
    )
    .join("");
}

// Exécute l’affichage quand la page est chargée
document.addEventListener("DOMContentLoaded", renderEvents);
