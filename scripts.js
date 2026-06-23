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

// Opérateurs
let tabOperateurs = [];

// Initialisation avec quelques données de test
function initDatabase() {
  // Initialisation de la table des opérateurs avec les données par défaut
  tabOperateurs = [
    {
      id_operateur: "966",
      nom_operateur: "NADJOMBE",
      prenom_operateur: "Gbati",
      fonction_operateur: "Chef Service",
      nomuser_operateur: "gbati",
      motdepasse_operateur: "admin",
    },
    {
      id_operateur: "877",
      nom_operateur: "KPAKPA",
      prenom_operateur: "Tam",
      fonction_operateur: "Machiniste",
      nomuser_operateur: "",
      motdepasse_operateur: "123456",
    },
    {
      id_operateur: "935",
      nom_operateur: "TSOGBE",
      prenom_operateur: "Alain",
      fonction_operateur: "Chef d'Equipe SDM",
      nomuser_operateur: "alain",
      motdepasse_operateur: "123456",
    },
  ];
  localStorage.setItem("tabOperateurs", JSON.stringify(tabOperateurs));

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

// Remplir la liste déroulante des opérateurs
function remplirOperateursSelect() {
  const selectOperateur = document.getElementById("operateur");
  const selectModif = document.getElementById("selectOperateurModif");

  const defaultOption = '<option value="">Sélectionner un opérateur</option>';

  if (selectOperateur) selectOperateur.innerHTML = defaultOption;
  if (selectModif)
    selectModif.innerHTML = '<option value="">Sélectionner...</option>';

  tabOperateurs.forEach((op) => {
    const text = `${op.prenom_operateur} ${op.nom_operateur}`;

    if (selectOperateur) {
      const option1 = document.createElement("option");
      option1.value = op.id_operateur; // L'ID devient la valeur soumise
      option1.textContent = text;
      selectOperateur.appendChild(option1);
    }

    if (selectModif) {
      const option2 = document.createElement("option");
      option2.value = op.id_operateur;
      option2.textContent = text;
      selectModif.appendChild(option2);
    }
  });
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

      if (action === "operateurs") {
        showPanel("gestionOperateursMenu");
      } else {
        // Pour tous les autres, retour au formulaire de relevé
        showPanel("releveForm");
        showMessage(
          `Navigation vers : ${link.textContent.trim()} - Fonctionnalité à venir`,
          "success",
        );
      }
    });
  });
}

// Afficher un panneau et masquer les autres
function showPanel(panelId) {
  const form = document.getElementById("releveForm");

  // Panneaux Opérateurs
  const menuOperateurs = document.getElementById("gestionOperateursMenu");
  const ajouterOperateur = document.getElementById("ajouterOperateurPanel");
  const modifierOperateur = document.getElementById("modifierOperateurPanel");
  const supprimerOperateur = document.getElementById("supprimerOperateurPanel");

  // Masquer tous les panneaux
  if (form) form.style.display = "none";
  if (menuOperateurs) menuOperateurs.style.display = "none";
  if (ajouterOperateur) ajouterOperateur.style.display = "none";
  if (modifierOperateur) modifierOperateur.style.display = "none";
  if (supprimerOperateur) supprimerOperateur.style.display = "none";

  // Afficher le panneau demandé
  const panel = document.getElementById(panelId);
  if (panel) {
    panel.style.display = "block";

    // Actions spécifiques lors de l'ouverture d'un panneau
    if (panelId === "supprimerOperateurPanel") {
      renderOperateursCheckList();
    }
  }
}

// Ajouter un nouvel opérateur
function ajouterOperateur() {
  const idInput = document.getElementById("nouvelOperateurId");
  const nomInput = document.getElementById("nouvelOperateurNom");
  const prenomInput = document.getElementById("nouvelOperateurPrenom");
  const fonctionInput = document.getElementById("nouvelOperateurFonction");
  const userInput = document.getElementById("nouvelOperateurUser");
  const mdpInput = document.getElementById("nouvelOperateurMdp");

  const id = idInput.value.trim();
  const nom = nomInput.value.trim().toUpperCase();
  const prenom = prenomInput.value.trim();
  const fonction = fonctionInput.value.trim();
  const user = userInput.value.trim();
  const mdp = mdpInput.value.trim();

  if (!id || !nom || !prenom) {
    showMessage(
      "Veuillez remplir au moins le matricule, le nom et le prénom",
      "error",
    );
    return;
  }

  // Vérifier l'unicité de l'ID
  if (tabOperateurs.some((op) => op.id_operateur === id)) {
    showMessage(
      `L'ID "${id}" existe déjà. Veuillez utiliser un matricule unique.`,
      "error",
    );
    return;
  }

  const nouvelOperateur = {
    id_operateur: id,
    nom_operateur: nom,
    prenom_operateur: prenom,
    fonction_operateur: fonction,
    nomuser_operateur: user,
    motdepasse_operateur: mdp,
  };

  tabOperateurs.push(nouvelOperateur);

  // Sauvegarder
  localStorage.setItem("tabOperateurs", JSON.stringify(tabOperateurs));

  // Mettre à jour les listes
  remplirOperateursSelect();

  // Réinitialiser les champs
  idInput.value = "";
  nomInput.value = "";
  prenomInput.value = "";
  fonctionInput.value = "";
  userInput.value = "";
  mdpInput.value = "";

  showMessage(`Opérateur "${prenom} ${nom}" ajouté avec succès !`);
}

// Gérer la sélection pour modification
function handleSelectOperateurModif() {
  const select = document.getElementById("selectOperateurModif");
  const formModif = document.getElementById("formModifierOperateur");
  const idToEdit = select.value;

  if (!idToEdit) {
    formModif.style.display = "none";
    return;
  }

  const operateur = tabOperateurs.find((op) => op.id_operateur === idToEdit);
  if (!operateur) return;

  // Pré-remplir le formulaire
  document.getElementById("ancienOperateurId").value = operateur.id_operateur;
  document.getElementById("modifOperateurId").value = operateur.id_operateur;
  document.getElementById("modifOperateurNom").value = operateur.nom_operateur;
  document.getElementById("modifOperateurPrenom").value =
    operateur.prenom_operateur;
  document.getElementById("modifOperateurFonction").value =
    operateur.fonction_operateur;
  document.getElementById("modifOperateurUser").value =
    operateur.nomuser_operateur;
  document.getElementById("modifOperateurMdp").value =
    operateur.motdepasse_operateur;

  formModif.style.display = "block";
}

// Sauvegarder les modifications d'un opérateur
function modifierOperateur() {
  const ancienId = document.getElementById("ancienOperateurId").value;
  const idInput = document.getElementById("modifOperateurId");
  const nomInput = document.getElementById("modifOperateurNom");
  const prenomInput = document.getElementById("modifOperateurPrenom");
  const fonctionInput = document.getElementById("modifOperateurFonction");
  const userInput = document.getElementById("modifOperateurUser");
  const mdpInput = document.getElementById("modifOperateurMdp");

  const nouvelId = idInput.value.trim();
  const nom = nomInput.value.trim().toUpperCase();
  const prenom = prenomInput.value.trim();
  const fonction = fonctionInput.value.trim();
  const user = userInput.value.trim();
  const mdp = mdpInput.value.trim();

  if (!nouvelId || !nom || !prenom) {
    showMessage(
      "Veuillez remplir au moins le matricule, le nom et le prénom",
      "error",
    );
    return;
  }

  // Vérifier l'unicité du nouvel ID (seulement s'il a changé)
  if (
    nouvelId !== ancienId &&
    tabOperateurs.some((op) => op.id_operateur === nouvelId)
  ) {
    showMessage(
      `L'ID "${nouvelId}" existe déjà. Veuillez utiliser un matricule unique.`,
      "error",
    );
    return;
  }

  // Trouver et mettre à jour l'opérateur
  const index = tabOperateurs.findIndex((op) => op.id_operateur === ancienId);
  if (index !== -1) {
    tabOperateurs[index] = {
      id_operateur: nouvelId,
      nom_operateur: nom,
      prenom_operateur: prenom,
      fonction_operateur: fonction,
      nomuser_operateur: user,
      motdepasse_operateur: mdp,
    };

    // Sauvegarder
    localStorage.setItem("tabOperateurs", JSON.stringify(tabOperateurs));

    // Mettre à jour les listes
    remplirOperateursSelect();

    // Mettre à jour l'ID sélectionné dans le menu déroulant
    document.getElementById("selectOperateurModif").value = nouvelId;
    document.getElementById("ancienOperateurId").value = nouvelId;

    showMessage(`Opérateur "${prenom} ${nom}" modifié avec succès !`);
  }
}

// Afficher la liste des opérateurs avec cases à cocher pour suppression
function renderOperateursCheckList() {
  const container = document.getElementById("operateursCheckList");
  container.innerHTML = "";

  if (tabOperateurs.length === 0) {
    container.innerHTML =
      '<p style="color: #666; font-style: italic; text-align: center; padding: 20px;">Aucun opérateur à supprimer.</p>';
    return;
  }

  tabOperateurs.forEach((op) => {
    const div = document.createElement("div");
    div.className = "check-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `check-op-${op.id_operateur}`;
    checkbox.value = op.id_operateur;

    const label = document.createElement("label");
    label.htmlFor = `check-op-${op.id_operateur}`;
    label.innerHTML = `<strong>${op.id_operateur}</strong> - ${op.prenom_operateur} ${op.nom_operateur} <small>(${op.fonction_operateur})</small>`;

    div.appendChild(checkbox);
    div.appendChild(label);
    container.appendChild(div);
  });
}

// Supprimer les opérateurs sélectionnés
function supprimerOperateursSelection() {
  const checkboxes = document.querySelectorAll(
    "#operateursCheckList input[type='checkbox']:checked",
  );

  if (checkboxes.length === 0) {
    showMessage("Veuillez sélectionner au moins un opérateur", "error");
    return;
  }

  const idsToDelete = [];
  checkboxes.forEach((cb) => idsToDelete.push(cb.value));

  const noms = tabOperateurs
    .filter((op) => idsToDelete.includes(op.id_operateur))
    .map((op) => `${op.prenom_operateur} ${op.nom_operateur}`);

  if (!confirm(`Supprimer ${noms.length} opérateur(s) :\n${noms.join(", ")} ?`))
    return;

  tabOperateurs = tabOperateurs.filter(
    (op) => !idsToDelete.includes(op.id_operateur),
  );

  // Sauvegarder
  localStorage.setItem("tabOperateurs", JSON.stringify(tabOperateurs));

  // Mettre à jour
  renderOperateursCheckList();
  remplirOperateursSelect();

  // Cacher le formulaire de modification si l'opérateur sélectionné vient d'être supprimé
  const selectModifId = document.getElementById("selectOperateurModif").value;
  if (idsToDelete.includes(selectModifId)) {
    document.getElementById("formModifierOperateur").style.display = "none";
  }

  showMessage(`${noms.length} opérateur(s) supprimé(s).`);
}

// Configuration des panneaux de gestion des opérateurs
function setupGestionOperateurs() {
  // Navigation : menu → sous-menus
  document
    .getElementById("goToAjouterOperateur")
    ?.addEventListener("click", () => {
      showPanel("ajouterOperateurPanel");
    });

  document
    .getElementById("goToModifierOperateur")
    ?.addEventListener("click", () => {
      showPanel("modifierOperateurPanel");
      // Cacher le formulaire et réinitialiser le select par défaut
      document.getElementById("formModifierOperateur").style.display = "none";
      document.getElementById("selectOperateurModif").value = "";
    });

  document
    .getElementById("goToSupprimerOperateur")
    ?.addEventListener("click", () => {
      showPanel("supprimerOperateurPanel");
    });

  // Boutons retour ←
  document
    .getElementById("backFromOperateursMenu")
    ?.addEventListener("click", () => {
      showPanel("releveForm");
    });

  document
    .getElementById("backFromAjouterOperateur")
    ?.addEventListener("click", () => {
      showPanel("gestionOperateursMenu");
    });

  document
    .getElementById("backFromModifierOperateur")
    ?.addEventListener("click", () => {
      showPanel("gestionOperateursMenu");
    });

  document
    .getElementById("backFromSupprimerOperateur")
    ?.addEventListener("click", () => {
      showPanel("gestionOperateursMenu");
    });

  // Boutons Annuler
  document
    .getElementById("annulerAjouterOperateur")
    ?.addEventListener("click", () => {
      showPanel("gestionOperateursMenu");
    });

  document
    .getElementById("annulerModifierOperateur")
    ?.addEventListener("click", () => {
      showPanel("gestionOperateursMenu");
    });

  // Actions
  document
    .getElementById("ajouterOperateurBtn")
    ?.addEventListener("click", ajouterOperateur);
  document
    .getElementById("selectOperateurModif")
    ?.addEventListener("change", handleSelectOperateurModif);
  document
    .getElementById("modifierOperateurBtn")
    ?.addEventListener("click", modifierOperateur);
  document
    .getElementById("supprimerOperateursBtn")
    ?.addEventListener("click", supprimerOperateursSelection);
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
  const savedTabOperateurs = localStorage.getItem("tabOperateurs");

  if (savedTypeRonde) {
    type_ronde = JSON.parse(savedTypeRonde);
  }

  if (savedTabOperateurs) {
    tabOperateurs = JSON.parse(savedTabOperateurs);
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
  remplirOperateursSelect();
  setupEventListeners();
  setupSidebar();
  setupGestionOperateurs();
}

// Démarrer l'application
init();
