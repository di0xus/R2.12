// TP4 — Fetch & API
// Complétez ce fichier en suivant les exercices du sujet.

// ============================================
// TEMPS 1 — JSON local (exercices 1.1 à 1.3)
// ============================================

// 1.2
async function chargerProjets() {
  const reponse = await fetch("./data.json");
  const donnees = await reponse.json();
  return donnees.projets;
}

// 1.3
const conteneur = document.querySelector("#projets-liste");

async function chargerEtAfficher() {
  // État chargement
  conteneur.innerHTML = '<p class="loading">Chargement...</p>';

  try {
    const reponse = await fetch("./data.json");

    if (!reponse.ok) {
      throw new Error(`Erreur HTTP : ${reponse.status}`);
    }

    const donnees = await reponse.json();

    // État   succes
    afficherProjets(donnees.projets);
  } catch (erreur) {
    // État erreur
    conteneur.innerHTML = `<p class="error">Impossible de charger les données : ${erreur.message}</p>`;
    console.error(erreur);
  }
}

function afficherProjets(projets) {
  conteneur.innerHTML = "";
  projets.forEach((projet) => {
    const carte = document.createElement("article");
    carte.classList.add("carte");
    carte.innerHTML = `
      <h3>${projet.titre}</h3>
      <p>${projet.description}</p>
      <p class="annee">${projet.annee}</p>
      <div class="tags">
        ${projet.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
    `;
    conteneur.append(carte);
  });
}

// Lancer au chargement
chargerEtAfficher();

// ============================================
// TEMPS 2 — API distante (exercices 2.1 à 2.3)
// ============================================

//  2.1 2.3
const apiConteneur = document.querySelector("#api-liste");
let tousPays = [];

// Extraire l'affichage dans une fonction réutilisable (4.1)
function afficherPays(pays) {
  apiConteneur.innerHTML = "";
  pays.forEach((p) => {
    const carte = document.createElement("article");
    carte.classList.add("carte");
    carte.innerHTML = `
      <h3>${p.flag} ${p.name.common}</h3>
      <p>Capitale : ${p.capital ? p.capital[0] : "Inconnu"}</p>
      <p>Population : ${p.population.toLocaleString()}</p>
    `;
    apiConteneur.appendChild(carte);
  });
}

async function chargerPays() {
  try {
    const reponse = await fetch("https://restcountries.com/v3.1/region/europe");
    if (!reponse.ok) {
      throw new Error(`Erreur HTTP : ${reponse.status}`);
    }

    tousPays = await reponse.json();

    // 2.2
    console.log(tousPays);
    console.log(tousPays[0]);
    console.log(tousPays[0].name);

    afficherPays(tousPays);

    // 4.1tri filter
    document.querySelector("#tri-pop").addEventListener("click", () => {
      const tries = [...tousPays].sort((a, b) => b.population - a.population);
      afficherPays(tries);
    });

    document.querySelector("#tri-nom").addEventListener("click", () => {
      const tries = [...tousPays].sort((a, b) =>
        a.name.common.localeCompare(b.name.common),
      );
      afficherPays(tries);
    });

    document.querySelector("#filtre-grand").addEventListener("click", () => {
      const grands = tousPays.filter((p) => p.population > 10_000_000);
      afficherPays(grands);
    });

    document.querySelector("#reinitialiser").addEventListener("click", () => {
      afficherPays(tousPays);
    });
  } catch (erreur) {
    apiConteneur.innerHTML = `<p class="error">Impossible de charger les pays : ${erreur.message}</p>`;
    console.error(erreur);
  }
}

chargerPays();

// ============================================
// TEMPS 3 — Recherche + API (exercices 3.1 et 3.2)
// ============================================

// 3.1
const input = document.querySelector("#recherche");
const resultatsConteneur = document.querySelector("#recherche-resultats");
let timerRecherche = null;

input.addEventListener("input", () => {
  // Annuler le timer
  clearTimeout(timerRecherche);

  // Relance timer
  timerRecherche = setTimeout(async () => {
    const terme = input.value.trim();

    if (terme.length < 2) {
      resultatsConteneur.innerHTML = "<p>Tapez au moins 2 caractères.</p>";
      return;
    }

    resultatsConteneur.innerHTML = '<p class="loading">Recherche...</p>';

    try {
      const reponse = await fetch(
        `https://restcountries.com/v3.1/name/${terme}`,
      );

      if (!reponse.ok) {
        resultatsConteneur.innerHTML = "<p>Aucun résultat.</p>";
        return;
      }

      const pays = await reponse.json();

      resultatsConteneur.innerHTML = "";
      pays.forEach((p, index) => {
        const carte = document.createElement("article");
        carte.classList.add("carte");
        carte.innerHTML = `
          <h3>${p.flag} ${p.name.common}</h3>
          <p>Capitale : ${p.capital ? p.capital[0] : "Inconnue"}</p>
          <p>Population : ${p.population.toLocaleString()}</p>
        `;
        resultatsConteneur.appendChild(carte);

        // 3.2 focus
        if (index === 0) {
          const titre = carte.querySelector("h3");
          if (titre) titre.setAttribute("tabindex", "-1");
          titre.focus();
        }
      });
    } catch (erreur) {
      resultatsConteneur.innerHTML =
        '<p class="error" role="alert">Erreur de recherche.</p>';
    }
  }, 300);
});

// ============================================
// TEMPS 4 — Bonus (exercices 4.1 à 4.3)
// ============================================

// Votre code ici...
// 4.1 avec 2.1
// debounce avec 3.1
