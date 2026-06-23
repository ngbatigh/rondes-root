// Base de données simulée (dans une vraie application, ce serait côté serveur)
let rondeDB = {
  eau: [],
  electricite: [],
  ddo: [],
  produit: [],
  temp: [],
};

// Types de rondes
let type_ronde = [
  {
    id_ronde: 0,
    ronde: "Relevé journalier",
    delai: "1440",
    description_ronde:
      "relevé de tous les compteurs chaque matin aux alentours de 06:00",
  },
  {
    id_ronde: 1,
    ronde: "Relevé de quart",
    delai: "480",
    description_ronde: "relevé de tous les compteurs chaque quart de 8 heures",
  },
];

// Initialisation avec quelques données de test
function initDatabase() {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateStr = yesterday.toISOString().split("T")[0];
  const heureStr = yesterday.toTimeString().split(" ")[0].substring(0, 5);

  // Données de test pour chaque compteur
  rondeDB.eau = [
    {
      id_ronde: 0,
      id_operateur: "Koffi",
      id_compteur: "eau",
      valeur: 1250,
      date: dateStr,
      heure: heureStr,
      commentaire: "",
    },
  ];

  rondeDB.electricite = [
    {
      id_ronde: 0,
      id_operateur: "Gbati",
      id_compteur: "electricite",
      valeur: 3450,
      date: dateStr,
      heure: heureStr,
      commentaire: "",
    },
  ];

  rondeDB.ddo = [
    {
      id_ronde: 1,
      id_operateur: "Abalo",
      id_compteur: "ddo",
      valeur: 890,
      date: dateStr,
      heure: heureStr,
      commentaire: "",
    },
  ];

  rondeDB.produit = [
    {
      id_ronde: 1,
      id_operateur: "Koffi",
      id_compteur: "produit",
      valeur: 450,
      date: dateStr,
      heure: heureStr,
      commentaire: "",
    },
  ];

  rondeDB.temp = [
    {
      id_ronde: 0,
      id_operateur: "Gbati",
      id_compteur: "temp",
      valeur: 120,
      date: dateStr,
      heure: heureStr,
      commentaire: "",
    },
  ];
}

// Remplir la liste déroulante des types de ronde
function fillRondeSelect() {
  const select = document.getElementById("id_ronde");
  select.innerHTML = '<option value="">Sélectionner une ronde</option>';
  type_ronde.forEach((r) => {
    const option = document.createElement("option");
    option.value = r.id_ronde;
    option.textContent = r.ronde;
    select.appendChild(option);
  });
}

// Sauvegarder un nouveau relevé
function saveReleve(id_ronde, id_operateur, id_compteur, valeur) {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const heureStr = now.toTimeString().split(" ")[0].substring(0, 5);

  const newReleve = {
    id_ronde: parseInt(id_ronde),
    id_operateur: id_operateur,
    id_compteur: id_compteur,
    valeur: valeur,
    date: dateStr,
    heure: heureStr,
    commentaire: "",
  };

  if (!rondeDB[id_compteur]) {
    rondeDB[id_compteur] = [];
  }

  rondeDB[id_compteur].push(newReleve);

  // Sauvegarder dans localStorage pour persistance
  localStorage.setItem("rondeDB", JSON.stringify(rondeDB));
  localStorage.setItem("type_ronde", JSON.stringify(type_ronde));
}

// Afficher un message à l'utilisateur
function showMessage(message, type = "success") {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;

  setTimeout(() => {
    messageDiv.style.display = "none";
    messageDiv.className = "message";
  }, 3000);
}

// Réinitialiser le formulaire après soumission
function resetFormAfterSubmit() {
  document.getElementById("valeurActuelle").value = "";
}

// Menu latéral
function setupSidebar() {
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("show");
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  }

  menuBtn.addEventListener("click", openSidebar);
  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);

  // Gestion des clics sur les liens du menu
  document.querySelectorAll(".sidebar-menu a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const action = link.dataset.action;
      closeSidebar();

      if (action === "rondes") {
        showPanel("gestionRondes");
      } else {
        // Pour tous les autres, retour au formulaire de relevé
        showPanel("releveForm");
        if (action === "recap") {
          showMessage("📋 Recap ronde - Fonctionnalité à venir", "success");
        } else if (action === "operateurs") {
          showMessage(
            "👥 Gestion des opérateurs - Fonctionnalité à venir",
            "success",
          );
        } else if (action === "compteurs") {
          showMessage(
            "🔢 Gestion des compteurs - Fonctionnalité à venir",
            "success",
          );
        } else if (action === "dashboard") {
          showMessage("📈 Tableau de bord - Fonctionnalité à venir", "success");
        } else if (action === "tableur") {
          showMessage("📑 Tableur - Fonctionnalité à venir", "success");
        }
      }
    });
  });
}

// Afficher un panneau et masquer le formulaire de relevé (ou l'inverse)
function showPanel(panelId) {
  const form = document.getElementById("releveForm");
  const gestionRondes = document.getElementById("gestionRondes");

  if (panelId === "gestionRondes") {
    form.style.display = "none";
    gestionRondes.style.display = "block";
    renderRondesList();
  } else {
    gestionRondes.style.display = "none";
    form.style.display = "block";
  }
}

// Afficher la liste des types de rondes
function renderRondesList() {
  const container = document.getElementById("rondesList");
  container.innerHTML = "";

  if (type_ronde.length === 0) {
    container.innerHTML =
      '<p style="color: #666; font-style: italic; text-align: center; padding: 20px;">Aucune ronde définie.</p>';
    return;
  }

  type_ronde.forEach((r) => {
    const div = document.createElement("div");
    div.className = "ronde-item";

    div.innerHTML = `
      <div class="ronde-info">
        <strong>${r.ronde}</strong>
        <span>Délai : ${r.delai} min — ${r.description_ronde}</span>
      </div>
      <button class="delete-ronde-btn" data-id="${r.id_ronde}">✕</button>
    `;

    container.appendChild(div);
  });

  // Écouter les clics sur les boutons supprimer
  document.querySelectorAll(".delete-ronde-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      deleteRonde(id);
    });
  });
}

// Ajouter une nouvelle ronde
function ajouterRonde() {
  const nomInput = document.getElementById("nouvelleRondeNom");
  const delaiInput = document.getElementById("nouvelleRondeDelai");
  const descInput = document.getElementById("nouvelleRondeDescription");

  const nom = nomInput.value.trim();
  const delai = delaiInput.value.trim();
  const description = descInput.value.trim();

  if (!nom || !delai) {
    showMessage("Veuillez remplir au moins le nom et le délai", "error");
    return;
  }

  // Calculer le prochain id
  const maxId =
    type_ronde.length > 0 ? Math.max(...type_ronde.map((r) => r.id_ronde)) : -1;

  const nouvelleRonde = {
    id_ronde: maxId + 1,
    ronde: nom,
    delai: delai,
    description_ronde: description || "",
  };

  type_ronde.push(nouvelleRonde);

  // Sauvegarder
  localStorage.setItem("type_ronde", JSON.stringify(type_ronde));

  // Mettre à jour l'affichage
  renderRondesList();
  fillRondeSelect();

  // Réinitialiser les champs
  nomInput.value = "";
  delaiInput.value = "";
  descInput.value = "";

  showMessage(`Ronde "${nom}" ajoutée avec succès !`);
}

// Supprimer une ronde
function deleteRonde(id) {
  const ronde = type_ronde.find((r) => r.id_ronde === id);
  if (!ronde) return;

  if (!confirm(`Supprimer la ronde "${ronde.ronde}" ?`)) return;

  type_ronde = type_ronde.filter((r) => r.id_ronde !== id);

  // Sauvegarder
  localStorage.setItem("type_ronde", JSON.stringify(type_ronde));

  // Mettre à jour
  renderRondesList();
  fillRondeSelect();

  showMessage(`Ronde "${ronde.ronde}" supprimée.`);
}

// Configuration du panneau de gestion des rondes
function setupGestionRondes() {
  document
    .getElementById("ajouterRondeBtn")
    .addEventListener("click", ajouterRonde);
  document.getElementById("backToReleve").addEventListener("click", () => {
    showPanel("releveForm");
  });
}

// Gestionnaire de soumission du formulaire
function handleSubmit(event) {
  event.preventDefault();

  const id_ronde = document.getElementById("id_ronde").value;
  const operateur = document.getElementById("operateur").value;
  const compteur = document.getElementById("compteur").value;
  const valeurActuelle = parseFloat(
    document.getElementById("valeurActuelle").value,
  );

  if (!id_ronde || !operateur || !compteur || !valeurActuelle) {
    showMessage("Veuillez remplir tous les champs", "error");
    return;
  }

  // Sauvegarder le relevé
  saveReleve(id_ronde, operateur, compteur, valeurActuelle);

  // Afficher un message de succès
  showMessage("Relevé enregistré avec succès !");

  // Réinitialiser le formulaire
  resetFormAfterSubmit();
}

// Écouter les changements sur le compteur
function setupEventListeners() {
  const form = document.getElementById("releveForm");

  form.addEventListener("submit", handleSubmit);
}

// Charger les données sauvegardées
function loadSavedData() {
  const savedRondeDB = localStorage.getItem("rondeDB");
  const savedTypeRonde = localStorage.getItem("type_ronde");

  if (savedTypeRonde) {
    type_ronde = JSON.parse(savedTypeRonde);
  }

  if (savedRondeDB) {
    // Nettoyer les anciennes données : supprimer la clé consommation des relevés existants
    const parsed = JSON.parse(savedRondeDB);
    for (const compteur in parsed) {
      if (Array.isArray(parsed[compteur])) {
        parsed[compteur] = parsed[compteur].map((releve) => {
          const { consommation, ...cleanReleve } = releve;
          // Si l'ancien format n'a pas id_ronde, on met une valeur par défaut
          if (cleanReleve.id_ronde === undefined) {
            cleanReleve.id_ronde = 0;
          }
          return cleanReleve;
        });
      }
    }
    rondeDB = parsed;
  } else {
    initDatabase();
  }

  fillRondeSelect();
}

// Initialisation de l'application
function init() {
  loadSavedData();
  setupEventListeners();
  setupSidebar();
  setupGestionRondes();
}

// Démarrer l'application
init();
