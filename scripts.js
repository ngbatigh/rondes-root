// ============================================================
// DONNÉES
// ============================================================

// Base de données des relevés
let rondeDB = {};

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

// Valeurs par défaut des constantes (pour premier lancement)
const sections_default = [
  "Salle Des Machines",
  "Embouteillage",
  "Cave-Filtration-Siroperie",
  "Brassage",
  "Administration",
  "Bloc Social",
  "Traitement Eau Process",
  "Traitement Eau Usees",
  "Centre Logistique",
];
const famille_default = [
  "Eau",
  "Energie",
  "DDO",
  "Vapeur",
  "Pression",
  "Temperature",
  "Debit",
];
const groupe1_default = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const groupe2_default = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Variables chargées depuis localStorage (ou valeurs par défaut)
let sections = [];
let famille_list = [];
let groupe1_list = [];
let groupe2_list = [];

// Tableau des compteurs (9 initialisés depuis le SQL)
let tabCompteurs = [
  // === EAU ===
  {
    id_compteur: "A-0000-0000-0000-0001",
    nom_compteur: "eau mitige laveuse",
    unite_compteur: "m3",
    debut_compteur: 7.0,
    range_compteur: 1000000.0,
    section_compteur: "Embouteillage",
    famille_compteur: "Eau",
    groupe1_compteur: "A",
    groupe2_compteur: "1",
    enservice_compteur: "2026-06-01 00:00:00",
    visible_compteur: true,
    actif_compteur: true,
    description_compteur: "compteur eau",
  },
  {
    id_compteur: "B-0000-0000-0000-0001",
    nom_compteur: "eau mitige laveuse",
    unite_compteur: "m3",
    debut_compteur: 7.0,
    range_compteur: 1000000.0,
    section_compteur: "Embouteillage",
    famille_compteur: "Eau",
    groupe1_compteur: "A",
    groupe2_compteur: "1",
    enservice_compteur: "",
    visible_compteur: true,
    actif_compteur: false,
    description_compteur: "compteur eau",
  },
  {
    id_compteur: "C-0000-0000-0000-0001",
    nom_compteur: "eau mitige laveuse",
    unite_compteur: "m3",
    debut_compteur: 7.0,
    range_compteur: 1000000.0,
    section_compteur: "Embouteillage",
    famille_compteur: "Eau",
    groupe1_compteur: "A",
    groupe2_compteur: "1",
    enservice_compteur: "",
    visible_compteur: true,
    actif_compteur: false,
    description_compteur: "compteur eau",
  },
  // === ÉLECTRICITÉ ===
  {
    id_compteur: "A-0000-0000-0000-0010",
    nom_compteur: "electricite Axima",
    unite_compteur: "kwh",
    debut_compteur: 12.0,
    range_compteur: 1000000.0,
    section_compteur: "Salle Des Machines",
    famille_compteur: "Energie",
    groupe1_compteur: "A",
    groupe2_compteur: "1",
    enservice_compteur: "2026-06-20 00:00:00",
    visible_compteur: true,
    actif_compteur: true,
    description_compteur: "compteur d'électricité",
  },
  {
    id_compteur: "B-0000-0000-0000-0010",
    nom_compteur: "electricite Axima",
    unite_compteur: "kwh",
    debut_compteur: 12.0,
    range_compteur: 1000000.0,
    section_compteur: "Salle Des Machines",
    famille_compteur: "Energie",
    groupe1_compteur: "A",
    groupe2_compteur: "1",
    enservice_compteur: "",
    visible_compteur: true,
    actif_compteur: false,
    description_compteur: "compteur d'électricité",
  },
  {
    id_compteur: "C-0000-0000-0000-0010",
    nom_compteur: "electricite Axima",
    unite_compteur: "kwh",
    debut_compteur: 12.0,
    range_compteur: 1000000.0,
    section_compteur: "Salle Des Machines",
    famille_compteur: "Energie",
    groupe1_compteur: "A",
    groupe2_compteur: "1",
    enservice_compteur: "",
    visible_compteur: true,
    actif_compteur: false,
    description_compteur: "compteur d'électricité",
  },
  // === TEMPÉRATURE ===
  {
    id_compteur: "A-0000-0000-0000-0011",
    nom_compteur: "temperature glycole",
    unite_compteur: "°C",
    debut_compteur: -4.0,
    range_compteur: 1000000.0,
    section_compteur: "Salle Des Machines",
    famille_compteur: "Temperature",
    groupe1_compteur: "F",
    groupe2_compteur: "1",
    enservice_compteur: "2026-06-19 00:00:00",
    visible_compteur: true,
    actif_compteur: true,
    description_compteur: "Thermometre ligne glycole",
  },
  {
    id_compteur: "B-0000-0000-0000-0011",
    nom_compteur: "temperature glycole",
    unite_compteur: "°C",
    debut_compteur: -4.0,
    range_compteur: 1000000.0,
    section_compteur: "Salle Des Machines",
    famille_compteur: "Temperature",
    groupe1_compteur: "F",
    groupe2_compteur: "1",
    enservice_compteur: "",
    visible_compteur: true,
    actif_compteur: false,
    description_compteur: "Thermometre ligne glycole",
  },
  {
    id_compteur: "C-0000-0000-0000-0011",
    nom_compteur: "temperature glycole",
    unite_compteur: "°C",
    debut_compteur: -4.0,
    range_compteur: 1000000.0,
    section_compteur: "Salle Des Machines",
    famille_compteur: "Temperature",
    groupe1_compteur: "F",
    groupe2_compteur: "1",
    enservice_compteur: "",
    visible_compteur: true,
    actif_compteur: false,
    description_compteur: "Thermometre ligne glycole",
  },
];

// ============================================================
// FONCTIONS UTILITAIRES
// ============================================================

// Remplir un select avec un tableau de valeurs
function fillSelectFromArray(elementId, array, emptyOption) {
  const select = document.getElementById(elementId);
  if (!select) return;
  select.innerHTML = "";
  if (emptyOption) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = emptyOption;
    select.appendChild(opt);
  }
  array.forEach((val) => {
    const option = document.createElement("option");
    option.value = val;
    option.textContent = val;
    select.appendChild(option);
  });
}

// Afficher un message
function showMessage(message, type = "success") {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = "block";

  setTimeout(() => {
    messageDiv.style.display = "none";
    messageDiv.className = "message";
  }, 3000);
}

// ============================================================
// GESTION DES OPÉRATEURS
// ============================================================

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
      option1.value = op.id_operateur;
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

  if (tabOperateurs.some((op) => op.id_operateur === id)) {
    showMessage(
      `L'ID "${id}" existe déjà. Veuillez utiliser un matricule unique.`,
      "error",
    );
    return;
  }

  tabOperateurs.push({
    id_operateur: id,
    nom_operateur: nom,
    prenom_operateur: prenom,
    fonction_operateur: fonction,
    nomuser_operateur: user,
    motdepasse_operateur: mdp,
  });

  localStorage.setItem("tabOperateurs", JSON.stringify(tabOperateurs));
  remplirOperateursSelect();

  idInput.value = "";
  nomInput.value = "";
  prenomInput.value = "";
  fonctionInput.value = "";
  userInput.value = "";
  mdpInput.value = "";

  showMessage(`Opérateur "${prenom} ${nom}" ajouté avec succès !`);
}

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

    localStorage.setItem("tabOperateurs", JSON.stringify(tabOperateurs));
    remplirOperateursSelect();

    document.getElementById("selectOperateurModif").value = nouvelId;
    document.getElementById("ancienOperateurId").value = nouvelId;

    showMessage(`Opérateur "${prenom} ${nom}" modifié avec succès !`);
  }
}

function renderOperateursCheckList() {
  const container = document.getElementById("operateursCheckList");
  if (!container) return;
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

  localStorage.setItem("tabOperateurs", JSON.stringify(tabOperateurs));
  renderOperateursCheckList();
  remplirOperateursSelect();

  const selectModifId = document.getElementById("selectOperateurModif")?.value;
  if (selectModifId && idsToDelete.includes(selectModifId)) {
    const formModif = document.getElementById("formModifierOperateur");
    if (formModif) formModif.style.display = "none";
  }

  showMessage(`${noms.length} opérateur(s) supprimé(s).`);
}

function setupGestionOperateurs() {
  document
    .getElementById("goToAjouterOperateur")
    ?.addEventListener("click", () => showPanel("ajouterOperateurPanel"));
  document
    .getElementById("goToModifierOperateur")
    ?.addEventListener("click", () => {
      showPanel("modifierOperateurPanel");
      const formModif = document.getElementById("formModifierOperateur");
      if (formModif) formModif.style.display = "none";
      const sel = document.getElementById("selectOperateurModif");
      if (sel) sel.value = "";
    });
  document
    .getElementById("goToSupprimerOperateur")
    ?.addEventListener("click", () => showPanel("supprimerOperateurPanel"));

  document
    .getElementById("backFromOperateursMenu")
    ?.addEventListener("click", () => showPanel("releveForm"));
  document
    .getElementById("backFromAjouterOperateur")
    ?.addEventListener("click", () => showPanel("gestionOperateursMenu"));
  document
    .getElementById("backFromModifierOperateur")
    ?.addEventListener("click", () => showPanel("gestionOperateursMenu"));
  document
    .getElementById("backFromSupprimerOperateur")
    ?.addEventListener("click", () => showPanel("gestionOperateursMenu"));

  document
    .getElementById("annulerAjouterOperateur")
    ?.addEventListener("click", () => showPanel("gestionOperateursMenu"));
  document
    .getElementById("annulerModifierOperateur")
    ?.addEventListener("click", () => showPanel("gestionOperateursMenu"));

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

// ============================================================
// GESTION DES RELEVÉS
// ============================================================

function initDatabase() {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = yesterday.toISOString().split("T")[0];
  const heureStr = yesterday.toTimeString().split(" ")[0].substring(0, 5);

  // Constantes
  sections = [...sections_default];
  famille_list = [...famille_default];
  groupe1_list = [...groupe1_default];
  groupe2_list = [...groupe2_default];
  localStorage.setItem("sections", JSON.stringify(sections));
  localStorage.setItem("famille_list", JSON.stringify(famille_list));
  localStorage.setItem("groupe1_list", JSON.stringify(groupe1_list));
  localStorage.setItem("groupe2_list", JSON.stringify(groupe2_list));

  // Types de rondes
  type_ronde = [
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
      description_ronde:
        "relevé de tous les compteurs chaque quart de 8 heures",
    },
  ];
  localStorage.setItem("type_ronde", JSON.stringify(type_ronde));

  // Opérateurs par défaut
  tabOperateurs = [
    {
      id_operateur: "966",
      nom_operateur: "NADJOMBE",
      prenom_operateur: "Gbati",
      fonction_operateur: "admin",
      nomuser_operateur: "gbati@nadjombe",
      motdepasse_operateur: "admin",
    },
    {
      id_operateur: "877",
      nom_operateur: "KPAKPA",
      prenom_operateur: "Tam",
      fonction_operateur: "operateur",
      nomuser_operateur: "tam@kpakpa",
      motdepasse_operateur: "tam@kpakpa",
    },
    {
      id_operateur: "935",
      nom_operateur: "TSOGBE",
      prenom_operateur: "Alain",
      fonction_operateur: "operateur",
      nomuser_operateur: "alain@tsogbe",
      motdepasse_operateur: "alain@tsogbe",
    },
  ];
  localStorage.setItem("tabOperateurs", JSON.stringify(tabOperateurs));

  // Compteurs (9 objets)
  tabCompteurs = [
    {
      id_compteur: "A-0000-0000-0000-0001",
      nom_compteur: "eau mitige laveuse",
      unite_compteur: "m3",
      debut_compteur: 7.0,
      range_compteur: 1000000.0,
      section_compteur: "Embouteillage",
      famille_compteur: "Eau",
      groupe1_compteur: "A",
      groupe2_compteur: "1",
      enservice_compteur: "2026-06-01 00:00:00",
      visible_compteur: true,
      actif_compteur: true,
      description_compteur: "compteur eau",
    },
    {
      id_compteur: "B-0000-0000-0000-0001",
      nom_compteur: "eau mitige laveuse",
      unite_compteur: "m3",
      debut_compteur: 7.0,
      range_compteur: 1000000.0,
      section_compteur: "Embouteillage",
      famille_compteur: "Eau",
      groupe1_compteur: "A",
      groupe2_compteur: "1",
      enservice_compteur: "",
      visible_compteur: true,
      actif_compteur: false,
      description_compteur: "compteur eau",
    },
    {
      id_compteur: "C-0000-0000-0000-0001",
      nom_compteur: "eau mitige laveuse",
      unite_compteur: "m3",
      debut_compteur: 7.0,
      range_compteur: 1000000.0,
      section_compteur: "Embouteillage",
      famille_compteur: "Eau",
      groupe1_compteur: "A",
      groupe2_compteur: "1",
      enservice_compteur: "",
      visible_compteur: true,
      actif_compteur: false,
      description_compteur: "compteur eau",
    },
    {
      id_compteur: "A-0000-0000-0000-0010",
      nom_compteur: "electricite Axima",
      unite_compteur: "kwh",
      debut_compteur: 12.0,
      range_compteur: 1000000.0,
      section_compteur: "Salle Des Machines",
      famille_compteur: "Energie",
      groupe1_compteur: "A",
      groupe2_compteur: "1",
      enservice_compteur: "2026-06-20 00:00:00",
      visible_compteur: true,
      actif_compteur: true,
      description_compteur: "compteur d'électricité",
    },
    {
      id_compteur: "B-0000-0000-0000-0010",
      nom_compteur: "electricite Axima",
      unite_compteur: "kwh",
      debut_compteur: 12.0,
      range_compteur: 1000000.0,
      section_compteur: "Salle Des Machines",
      famille_compteur: "Energie",
      groupe1_compteur: "A",
      groupe2_compteur: "1",
      enservice_compteur: "",
      visible_compteur: true,
      actif_compteur: false,
      description_compteur: "compteur d'électricité",
    },
    {
      id_compteur: "C-0000-0000-0000-0010",
      nom_compteur: "electricite Axima",
      unite_compteur: "kwh",
      debut_compteur: 12.0,
      range_compteur: 1000000.0,
      section_compteur: "Salle Des Machines",
      famille_compteur: "Energie",
      groupe1_compteur: "A",
      groupe2_compteur: "1",
      enservice_compteur: "",
      visible_compteur: true,
      actif_compteur: false,
      description_compteur: "compteur d'électricité",
    },
    {
      id_compteur: "A-0000-0000-0000-0011",
      nom_compteur: "temperature glycole",
      unite_compteur: "°C",
      debut_compteur: -4.0,
      range_compteur: 1000000.0,
      section_compteur: "Salle Des Machines",
      famille_compteur: "Temperature",
      groupe1_compteur: "F",
      groupe2_compteur: "1",
      enservice_compteur: "2026-06-19 00:00:00",
      visible_compteur: true,
      actif_compteur: true,
      description_compteur: "Thermometre ligne glycole",
    },
    {
      id_compteur: "B-0000-0000-0000-0011",
      nom_compteur: "temperature glycole",
      unite_compteur: "°C",
      debut_compteur: -4.0,
      range_compteur: 1000000.0,
      section_compteur: "Salle Des Machines",
      famille_compteur: "Temperature",
      groupe1_compteur: "F",
      groupe2_compteur: "1",
      enservice_compteur: "",
      visible_compteur: true,
      actif_compteur: false,
      description_compteur: "Thermometre ligne glycole",
    },
    {
      id_compteur: "C-0000-0000-0000-0011",
      nom_compteur: "temperature glycole",
      unite_compteur: "°C",
      debut_compteur: -4.0,
      range_compteur: 1000000.0,
      section_compteur: "Salle Des Machines",
      famille_compteur: "Temperature",
      groupe1_compteur: "F",
      groupe2_compteur: "1",
      enservice_compteur: "",
      visible_compteur: true,
      actif_compteur: false,
      description_compteur: "Thermometre ligne glycole",
    },
  ];
  localStorage.setItem("tabCompteurs", JSON.stringify(tabCompteurs));

  // Relevés de test avec les vrais IDs de compteurs
  rondeDB = {
    "A-0000-0000-0000-0001": [
      {
        id_ronde: 0,
        id_operateur: "Koffi",
        id_compteur: "A-0000-0000-0000-0001",
        valeur: 1250,
        date: dateStr,
        heure: heureStr,
        commentaire: "",
      },
    ],
    "A-0000-0000-0000-0010": [
      {
        id_ronde: 0,
        id_operateur: "Gbati",
        id_compteur: "A-0000-0000-0000-0010",
        valeur: 3450,
        date: dateStr,
        heure: heureStr,
        commentaire: "",
      },
    ],
    "A-0000-0000-0000-0011": [
      {
        id_ronde: 1,
        id_operateur: "Abalo",
        id_compteur: "A-0000-0000-0000-0011",
        valeur: -4,
        date: dateStr,
        heure: heureStr,
        commentaire: "",
      },
    ],
  };
  localStorage.setItem("rondeDB", JSON.stringify(rondeDB));
}

// Remplir le select des types de ronde
function fillRondeSelect() {
  const select = document.getElementById("id_ronde");
  if (!select) return;
  select.innerHTML = '<option value="">Sélectionner une ronde</option>';
  type_ronde.forEach((r) => {
    const option = document.createElement("option");
    option.value = r.id_ronde;
    option.textContent = r.ronde;
    select.appendChild(option);
  });
}

// Remplir le select des compteurs (depuis tabCompteurs, uniquement ceux visibles ET actifs)
function fillCompteurSelect() {
  const select = document.getElementById("compteur");
  if (!select) return;
  select.innerHTML = '<option value="">Sélectionner un compteur</option>';
  tabCompteurs
    .filter((c) => c.visible_compteur && c.actif_compteur)
    .forEach((c) => {
      const option = document.createElement("option");
      option.value = c.id_compteur;
      option.textContent = `${c.id_compteur} — ${c.nom_compteur} (${c.unite_compteur})`;
      select.appendChild(option);
    });
}

// Sauvegarder un relevé
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
  localStorage.setItem("rondeDB", JSON.stringify(rondeDB));
}

// ============================================================
// AFFICHAGE DES PANNEAUX
// ============================================================

function showPanel(panelId) {
  const form = document.getElementById("releveForm");

  // Opérateurs
  const operateursMenu = document.getElementById("gestionOperateursMenu");
  const ajouterOperateurPanel = document.getElementById(
    "ajouterOperateurPanel",
  );
  const modifierOperateurPanel = document.getElementById(
    "modifierOperateurPanel",
  );
  const supprimerOperateurPanel = document.getElementById(
    "supprimerOperateurPanel",
  );

  // Rondes
  const rondesMenu = document.getElementById("gestionRondesMenu");
  const ajouterRonde = document.getElementById("ajouterRondePanel");
  const supprimerRonde = document.getElementById("supprimerRondePanel");

  // Compteurs
  const compteursMenu = document.getElementById("gestionCompteursMenu");
  const activerCompteur = document.getElementById("activerCompteurPanel");
  const modifierCompteur = document.getElementById("modifierCompteurPanel");
  const clonerCompteur = document.getElementById("clonerCompteurPanel");
  const creerCompteur = document.getElementById("creerCompteurPanel");
  const qrCodeCompteur = document.getElementById("qrCodeCompteurPanel");

  // Masquer tous
  const allPanels = [
    form,
    operateursMenu,
    ajouterOperateurPanel,
    modifierOperateurPanel,
    supprimerOperateurPanel,
    rondesMenu,
    ajouterRonde,
    supprimerRonde,
    compteursMenu,
    activerCompteur,
    modifierCompteur,
    clonerCompteur,
    creerCompteur,
    qrCodeCompteur,
  ];
  allPanels.forEach((p) => {
    if (p) p.style.display = "none";
  });

  // Afficher le bon panneau
  if (panelId === "releveForm") form.style.display = "block";
  // --- Opérateurs ---
  else if (panelId === "gestionOperateursMenu") {
    if (operateursMenu) operateursMenu.style.display = "block";
  } else if (panelId === "ajouterOperateurPanel") {
    if (ajouterOperateurPanel) ajouterOperateurPanel.style.display = "block";
  } else if (panelId === "modifierOperateurPanel") {
    if (modifierOperateurPanel) modifierOperateurPanel.style.display = "block";
  } else if (panelId === "supprimerOperateurPanel") {
    if (supprimerOperateurPanel)
      supprimerOperateurPanel.style.display = "block";
    renderOperateursCheckList();
  }
  // --- Rondes ---
  else if (panelId === "gestionRondesMenu") rondesMenu.style.display = "block";
  else if (panelId === "ajouterRondePanel")
    ajouterRonde.style.display = "block";
  else if (panelId === "supprimerRondePanel") {
    supprimerRonde.style.display = "block";
    renderRondesCheckList();
  }
  // --- Compteurs ---
  else if (panelId === "gestionCompteursMenu")
    compteursMenu.style.display = "block";
  else if (panelId === "activerCompteurPanel") {
    activerCompteur.style.display = "block";
    renderActiverCheckList();
  } else if (panelId === "modifierCompteurPanel") {
    modifierCompteur.style.display = "block";
    remplirSelectModifier();
  } else if (panelId === "clonerCompteurPanel") {
    clonerCompteur.style.display = "block";
    remplirSelectCloner();
  } else if (panelId === "creerCompteurPanel") {
    creerCompteur.style.display = "block";
  } else if (panelId === "qrCodeCompteurPanel") {
    qrCodeCompteur.style.display = "block";
    const select = document.getElementById("qrSelectCompteur");
    if (select) {
      select.innerHTML = '<option value="">Choisir...</option>';
      tabCompteurs.forEach((c) => {
        const opt = document.createElement("option");
        opt.value = c.id_compteur;
        opt.textContent = `${c.id_compteur} — ${c.nom_compteur}`;
        select.appendChild(opt);
      });
    }
    const container = document.getElementById("qrCodeContainer");
    if (container) container.style.display = "none";
  }
}

// ============================================================
// MENU LATÉRAL
// ============================================================

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

  document.querySelectorAll(".sidebar-menu a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const action = link.dataset.action;
      closeSidebar();

      if (action === "operateurs") showPanel("gestionOperateursMenu");
      else if (action === "rondes") showPanel("gestionRondesMenu");
      else if (action === "compteurs") showPanel("gestionCompteursMenu");
      else {
        showPanel("releveForm");
        if (action === "recap")
          showMessage("📋 Recap ronde - Fonctionnalité à venir");
        else if (action === "dashboard")
          showMessage("📈 Tableau de bord - Fonctionnalité à venir");
        else if (action === "tableur")
          showMessage("📑 Tableur - Fonctionnalité à venir");
      }
    });
  });
}

// ============================================================
// GESTION DES RONDES
// ============================================================

function renderRondesCheckList() {
  const container = document.getElementById("rondesCheckList");
  if (!container) return;
  container.innerHTML = "";

  if (type_ronde.length === 0) {
    container.innerHTML =
      '<p style="color: #666; font-style: italic; text-align: center; padding: 20px;">Aucune ronde à supprimer.</p>';
    return;
  }

  type_ronde.forEach((r) => {
    const div = document.createElement("div");
    div.className = "check-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `check-${r.id_ronde}`;
    checkbox.value = r.id_ronde;
    const label = document.createElement("label");
    label.htmlFor = `check-${r.id_ronde}`;
    label.innerHTML = `${r.ronde} <small>(Délai: ${r.delai} min — ${r.description_ronde})</small>`;
    div.appendChild(checkbox);
    div.appendChild(label);
    container.appendChild(div);
  });
}

function ajouterRonde() {
  const nomInput = document.getElementById("nouvelleRondeNom");
  const delaiInput = document.getElementById("nouvelleRondeDelai");
  const descInput = document.getElementById("nouvelleRondeDescription");

  const nom = nomInput?.value?.trim();
  const delai = delaiInput?.value?.trim();
  const description = descInput?.value?.trim();

  if (!nom || !delai) {
    showMessage("Veuillez remplir au moins le nom et le délai", "error");
    return;
  }

  const maxId =
    type_ronde.length > 0 ? Math.max(...type_ronde.map((r) => r.id_ronde)) : -1;

  type_ronde.push({
    id_ronde: maxId + 1,
    ronde: nom,
    delai: delai,
    description_ronde: description || "",
  });

  localStorage.setItem("type_ronde", JSON.stringify(type_ronde));
  fillRondeSelect();

  if (nomInput) nomInput.value = "";
  if (delaiInput) delaiInput.value = "";
  if (descInput) descInput.value = "";

  showMessage(`Ronde "${nom}" ajoutée avec succès !`);
}

function supprimerRondesSelection() {
  const checkboxes = document.querySelectorAll(
    "#rondesCheckList input[type='checkbox']:checked",
  );
  if (checkboxes.length === 0) {
    showMessage("Veuillez sélectionner au moins une ronde", "error");
    return;
  }

  const idsToDelete = [];
  checkboxes.forEach((cb) => idsToDelete.push(parseInt(cb.value)));
  const noms = type_ronde
    .filter((r) => idsToDelete.includes(r.id_ronde))
    .map((r) => r.ronde);

  if (!confirm(`Supprimer ${noms.length} ronde(s) :\n${noms.join(", ")} ?`))
    return;

  type_ronde = type_ronde.filter((r) => !idsToDelete.includes(r.id_ronde));
  localStorage.setItem("type_ronde", JSON.stringify(type_ronde));
  renderRondesCheckList();
  fillRondeSelect();
  showMessage(`${noms.length} ronde(s) supprimée(s).`);
}

function setupGestionRondes() {
  document
    .getElementById("goToAjouterRonde")
    ?.addEventListener("click", () => showPanel("ajouterRondePanel"));
  document
    .getElementById("goToSupprimerRonde")
    ?.addEventListener("click", () => showPanel("supprimerRondePanel"));

  document
    .getElementById("backFromRondesMenu")
    ?.addEventListener("click", () => showPanel("releveForm"));
  document
    .getElementById("backFromAjouter")
    ?.addEventListener("click", () => showPanel("gestionRondesMenu"));
  document
    .getElementById("backFromSupprimer")
    ?.addEventListener("click", () => showPanel("gestionRondesMenu"));
  document
    .getElementById("annulerAjouter")
    ?.addEventListener("click", () => showPanel("gestionRondesMenu"));

  document
    .getElementById("ajouterRondeBtn")
    ?.addEventListener("click", ajouterRonde);
  document
    .getElementById("supprimerRondesBtn")
    ?.addEventListener("click", supprimerRondesSelection);
}

// ============================================================
// GESTION DES COMPTEURS
// ============================================================

// ----- Activer compteur -----
function renderActiverCheckList() {
  const container = document.getElementById("activerCheckList");
  if (!container) return;
  container.innerHTML = "";

  if (tabCompteurs.length === 0) {
    container.innerHTML =
      '<p style="color: #666; font-style: italic; text-align: center; padding: 20px;">Aucun compteur.</p>';
    return;
  }

  tabCompteurs.forEach((c, index) => {
    const div = document.createElement("div");
    div.className = "check-item";
    div.style.flexDirection = "column";
    div.style.alignItems = "stretch";

    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.marginBottom = "8px";

    const info = document.createElement("span");
    info.style.fontWeight = "600";
    info.textContent = `${c.id_compteur} — ${c.nom_compteur}`;
    header.appendChild(info);

    const badge = document.createElement("span");
    badge.style.fontSize = "12px";
    badge.style.padding = "2px 8px";
    badge.style.borderRadius = "4px";
    badge.style.fontWeight = "600";
    if (c.actif_compteur && c.visible_compteur) {
      badge.style.background = "#d4edda";
      badge.style.color = "#155724";
      badge.textContent = "✅ Actif & visible";
    } else if (c.actif_compteur) {
      badge.style.background = "#fff3cd";
      badge.style.color = "#856404";
      badge.textContent = "👁️ Actif mais invisible";
    } else {
      badge.style.background = "#f8d7da";
      badge.style.color = "#721c24";
      badge.textContent = "⏸️ Inactif";
    }
    header.appendChild(badge);
    div.appendChild(header);

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.gap = "20px";

    const cbVisible = document.createElement("label");
    cbVisible.style.cursor = "pointer";
    cbVisible.style.fontWeight = "500";
    const inputVisible = document.createElement("input");
    inputVisible.type = "checkbox";
    inputVisible.checked = c.visible_compteur;
    inputVisible.dataset.index = index;
    inputVisible.dataset.field = "visible_compteur";
    cbVisible.appendChild(inputVisible);
    cbVisible.appendChild(document.createTextNode(" 👁️ Visible"));

    const cbActif = document.createElement("label");
    cbActif.style.cursor = "pointer";
    cbActif.style.fontWeight = "500";
    const inputActif = document.createElement("input");
    inputActif.type = "checkbox";
    inputActif.checked = c.actif_compteur;
    inputActif.dataset.index = index;
    inputActif.dataset.field = "actif_compteur";
    cbActif.appendChild(inputActif);
    cbActif.appendChild(document.createTextNode(" ✅ Actif"));

    row.appendChild(cbVisible);
    row.appendChild(cbActif);
    div.appendChild(row);

    container.appendChild(div);
  });
}

function enregistrerActiver() {
  const checkboxes = document.querySelectorAll(
    "#activerCheckList input[type='checkbox']",
  );
  checkboxes.forEach((cb) => {
    const idx = parseInt(cb.dataset.index);
    const field = cb.dataset.field;
    if (tabCompteurs[idx]) {
      tabCompteurs[idx][field] = cb.checked;
    }
  });

  tabCompteurs.forEach((c) => {
    if (c.actif_compteur && !c.enservice_compteur) {
      c.enservice_compteur = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    }
    if (!c.actif_compteur) {
      c.enservice_compteur = "";
    }
  });

  localStorage.setItem("tabCompteurs", JSON.stringify(tabCompteurs));
  fillCompteurSelect();
  renderActiverCheckList();
  showMessage("Modifications enregistrées.");
}

// ----- Modifier compteur -----
function remplirSelectModifier() {
  const select = document.getElementById("modifierSelectCompteur");
  if (!select) return;
  const currentVal = select.value;
  select.innerHTML = '<option value="">Choisir...</option>';
  tabCompteurs.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id_compteur;
    opt.textContent = `${c.id_compteur} — ${c.nom_compteur}`;
    select.appendChild(opt);
  });
  select.value = currentVal;
}

function chargerCompteurDansFormModifier() {
  const id = document.getElementById("modifierSelectCompteur").value;
  const container = document.getElementById("modifierFormContainer");
  if (!id) {
    container.style.display = "none";
    return;
  }
  const c = tabCompteurs.find((x) => x.id_compteur === id);
  if (!c) {
    container.style.display = "none";
    return;
  }
  container.style.display = "block";

  document.getElementById("modifierIdCompteur").value = c.id_compteur;
  document.getElementById("modifierNom").value = c.nom_compteur;
  document.getElementById("modifierUnite").value = c.unite_compteur;
  document.getElementById("modifierDebut").value = c.debut_compteur;
  document.getElementById("modifierRange").value = c.range_compteur;
  document.getElementById("modifierDescription").value = c.description_compteur;
  document.getElementById("modifierVisible").checked = c.visible_compteur;
  document.getElementById("modifierActif").checked = c.actif_compteur;

  fillSelectFromArray("modifierSection", sections, "Sélectionner...");
  fillSelectFromArray("modifierFamille", famille_list, "Sélectionner...");
  fillSelectFromArray("modifierGroupe1", groupe1_list, "Sélectionner...");
  fillSelectFromArray("modifierGroupe2", groupe2_list, "Sélectionner...");

  document.getElementById("modifierSection").value = c.section_compteur;
  document.getElementById("modifierFamille").value = c.famille_compteur;
  document.getElementById("modifierGroupe1").value = c.groupe1_compteur;
  document.getElementById("modifierGroupe2").value = c.groupe2_compteur;
}

function enregistrerModification() {
  const id = document.getElementById("modifierSelectCompteur").value;
  if (!id) {
    showMessage("Veuillez sélectionner un compteur", "error");
    return;
  }
  const c = tabCompteurs.find((x) => x.id_compteur === id);
  if (!c) return;

  const newId = document.getElementById("modifierIdCompteur").value.trim();

  if (newId !== id && tabCompteurs.find((x) => x.id_compteur === newId)) {
    showMessage("Cet ID existe déjà.", "error");
    return;
  }

  c.id_compteur = newId;
  c.nom_compteur = document.getElementById("modifierNom").value;
  c.unite_compteur = document.getElementById("modifierUnite").value;
  c.debut_compteur = parseFloat(document.getElementById("modifierDebut").value);
  c.range_compteur = parseFloat(document.getElementById("modifierRange").value);
  c.section_compteur = document.getElementById("modifierSection").value;
  c.famille_compteur = document.getElementById("modifierFamille").value;
  c.groupe1_compteur = document.getElementById("modifierGroupe1").value;
  c.groupe2_compteur = document.getElementById("modifierGroupe2").value;
  c.description_compteur = document.getElementById("modifierDescription").value;
  c.visible_compteur = document.getElementById("modifierVisible").checked;
  c.actif_compteur = document.getElementById("modifierActif").checked;

  if (c.actif_compteur && !c.enservice_compteur) {
    c.enservice_compteur = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  }
  if (!c.actif_compteur) c.enservice_compteur = "";

  localStorage.setItem("tabCompteurs", JSON.stringify(tabCompteurs));
  fillCompteurSelect();
  remplirSelectModifier();
  showMessage(`Compteur "${newId}" modifié.`);
}

// ----- Cloner compteur -----
function remplirSelectCloner() {
  const select = document.getElementById("clonerSelectParent");
  if (!select) return;
  select.innerHTML = '<option value="">Choisir...</option>';
  tabCompteurs.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id_compteur;
    opt.textContent = `${c.id_compteur} — ${c.nom_compteur}`;
    select.appendChild(opt);
  });
  document.getElementById("clonerApercu").style.display = "none";
}

function afficherApercuClone() {
  const id = document.getElementById("clonerSelectParent").value;
  const apercu = document.getElementById("clonerApercu");
  const content = document.getElementById("clonerApercuContent");
  if (!id) {
    apercu.style.display = "none";
    return;
  }
  const c = tabCompteurs.find((x) => x.id_compteur === id);
  if (!c) {
    apercu.style.display = "none";
    return;
  }
  apercu.style.display = "block";
  const clone = { ...c, id_compteur: "[NOUVEL ID]" };
  content.textContent = JSON.stringify(clone, null, 2);
}

function executerClonage() {
  const parentId = document.getElementById("clonerSelectParent").value;
  const nouvelId = document.getElementById("clonerNouvelId").value.trim();

  if (!parentId) {
    showMessage("Veuillez sélectionner un compteur parent.", "error");
    return;
  }
  if (!nouvelId) {
    showMessage("Veuillez saisir un nouvel ID.", "error");
    return;
  }
  if (tabCompteurs.find((c) => c.id_compteur === nouvelId)) {
    showMessage("Cet ID existe déjà.", "error");
    return;
  }

  const parent = tabCompteurs.find((c) => c.id_compteur === parentId);
  if (!parent) return;

  const clone = {
    ...parent,
    id_compteur: nouvelId,
    enservice_compteur: "",
    visible_compteur: true,
    actif_compteur: true,
  };

  tabCompteurs.push(clone);
  localStorage.setItem("tabCompteurs", JSON.stringify(tabCompteurs));

  document.getElementById("clonerNouvelId").value = "";
  document.getElementById("clonerApercu").style.display = "none";
  remplirSelectCloner();
  remplirSelectModifier();
  fillCompteurSelect();
  showMessage(`Compteur cloné : ${nouvelId}`);
}

// ----- Créer compteur -----
function creerCompteur() {
  const id = document.getElementById("creerIdCompteur").value.trim();
  if (!id) {
    showMessage("L'ID compteur est obligatoire.", "error");
    return;
  }
  if (tabCompteurs.find((c) => c.id_compteur === id)) {
    showMessage("Cet ID existe déjà.", "error");
    return;
  }

  const actif = document.getElementById("creerActif").checked;
  const nouveau = {
    id_compteur: id,
    nom_compteur: document.getElementById("creerNom").value,
    unite_compteur: document.getElementById("creerUnite").value,
    debut_compteur: parseFloat(
      document.getElementById("creerDebut").value || 0,
    ),
    range_compteur: parseFloat(
      document.getElementById("creerRange").value || 0,
    ),
    section_compteur: document.getElementById("creerSection").value,
    famille_compteur: document.getElementById("creerFamille").value,
    groupe1_compteur: document.getElementById("creerGroupe1").value,
    groupe2_compteur: document.getElementById("creerGroupe2").value,
    description_compteur: document.getElementById("creerDescription").value,
    visible_compteur: document.getElementById("creerVisible").checked,
    actif_compteur: actif,
    enservice_compteur: actif
      ? new Date().toISOString().slice(0, 19).replace("T", " ")
      : "",
  };

  tabCompteurs.push(nouveau);
  localStorage.setItem("tabCompteurs", JSON.stringify(tabCompteurs));

  document.getElementById("creerIdCompteur").value = "";
  document.getElementById("creerNom").value = "";
  document.getElementById("creerUnite").value = "";
  document.getElementById("creerDebut").value = "";
  document.getElementById("creerRange").value = "";
  document.getElementById("creerSection").value = "";
  document.getElementById("creerFamille").value = "";
  document.getElementById("creerGroupe1").value = "";
  document.getElementById("creerGroupe2").value = "";
  document.getElementById("creerDescription").value = "";
  document.getElementById("creerVisible").checked = true;
  document.getElementById("creerActif").checked = true;

  remplirSelectModifier();
  remplirSelectCloner();
  fillCompteurSelect();
  showMessage(`Compteur "${id}" créé.`);
}

function setupGestionCompteurs() {
  // Menu → sous-menus
  document
    .getElementById("goToActiverCompteur")
    ?.addEventListener("click", () => showPanel("activerCompteurPanel"));
  document
    .getElementById("goToModifierCompteur")
    ?.addEventListener("click", () => showPanel("modifierCompteurPanel"));
  document
    .getElementById("goToClonerCompteur")
    ?.addEventListener("click", () => showPanel("clonerCompteurPanel"));
  document
    .getElementById("goToCreerCompteur")
    ?.addEventListener("click", () => showPanel("creerCompteurPanel"));
  document
    .getElementById("goToQrCodeCompteur")
    ?.addEventListener("click", () => showPanel("qrCodeCompteurPanel"));

  // Retours ←
  document
    .getElementById("backFromCompteursMenu")
    ?.addEventListener("click", () => showPanel("releveForm"));
  document
    .getElementById("backFromActiver")
    ?.addEventListener("click", () => showPanel("gestionCompteursMenu"));
  document
    .getElementById("backFromModifier")
    ?.addEventListener("click", () => showPanel("gestionCompteursMenu"));
  document
    .getElementById("backFromCloner")
    ?.addEventListener("click", () => showPanel("gestionCompteursMenu"));
  document
    .getElementById("backFromCreer")
    ?.addEventListener("click", () => showPanel("gestionCompteursMenu"));
  document
    .getElementById("backFromQrCode")
    ?.addEventListener("click", () => showPanel("gestionCompteursMenu"));

  // Activer
  document
    .getElementById("enregistrerActiverBtn")
    ?.addEventListener("click", enregistrerActiver);

  // Modifier
  document
    .getElementById("modifierSelectCompteur")
    ?.addEventListener("change", chargerCompteurDansFormModifier);
  document
    .getElementById("enregistrerModifierBtn")
    ?.addEventListener("click", enregistrerModification);
  document
    .getElementById("annulerModifier")
    ?.addEventListener("click", () => showPanel("gestionCompteursMenu"));

  // Cloner
  document
    .getElementById("clonerSelectParent")
    ?.addEventListener("change", afficherApercuClone);
  document
    .getElementById("executerClonerBtn")
    ?.addEventListener("click", executerClonage);
  document
    .getElementById("annulerCloner")
    ?.addEventListener("click", () => showPanel("gestionCompteursMenu"));

  // Créer
  document
    .getElementById("executerCreerBtn")
    ?.addEventListener("click", creerCompteur);
  document
    .getElementById("annulerCreer")
    ?.addEventListener("click", () => showPanel("gestionCompteursMenu"));

  // ----- QR Code -----
  document
    .getElementById("qrSelectCompteur")
    ?.addEventListener("change", function () {
      const idCompteur = this.value;
      const container = document.getElementById("qrCodeContainer");
      const svgDiv = document.getElementById("qrCodeSvg");
      const infos = document.getElementById("qrCodeInfos");

      if (!idCompteur) {
        container.style.display = "none";
        return;
      }

      const compteur = tabCompteurs.find((c) => c.id_compteur === idCompteur);
      if (!compteur) return;

      const typeNumber = 0;
      const errorCorrectionLevel = "L";
      const qr = qrcode(typeNumber, errorCorrectionLevel);
      qr.addData(idCompteur);
      qr.make();

      const moduleCount = qr.getModuleCount();
      const moduleSize = 20;
      const size = moduleCount * moduleSize;

      // Calculer la taille physique pour impression 300 DPI (1px = 0.254mm à 96 DPI)
      // Pour impression haute résolution, on garde les pixels mais on peut aussi indiquer la taille en mm
      const widthMm = ((size * 25.4) / 96).toFixed(1);

      let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="width: ${widthMm}mm; height: ${widthMm}mm; shape-rendering: crispEdges;">`;
      svg += `<rect width="${size}" height="${size}" fill="white"/>`;
      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          if (qr.isDark(row, col)) {
            const x = col * moduleSize;
            const y = row * moduleSize;
            svg += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" fill="black"/>`;
          }
        }
      }
      svg += `</svg>`;

      svgDiv.innerHTML = svg;
      infos.textContent = `ID: ${compteur.id_compteur} — ${compteur.nom_compteur}`;
      container.style.display = "block";
    });

  document
    .getElementById("telechargerQrBtn")
    ?.addEventListener("click", function () {
      const select = document.getElementById("qrSelectCompteur");
      const idCompteur = select.value;
      if (!idCompteur) return;

      const compteur = tabCompteurs.find((c) => c.id_compteur === idCompteur);
      if (!compteur) return;

      const svgElem = document.querySelector("#qrCodeSvg svg");
      if (!svgElem) return;

      const svgString = new XMLSerializer().serializeToString(svgElem);
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${compteur.nom_compteur}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

  // Initialiser les listes déroulantes des formulaires
  fillSelectFromArray("creerSection", sections, "Sélectionner...");
  fillSelectFromArray("creerFamille", famille_list, "Sélectionner...");
  fillSelectFromArray("creerGroupe1", groupe1_list, "Sélectionner...");
  fillSelectFromArray("creerGroupe2", groupe2_list, "Sélectionner...");
}

// ============================================================
// FORMULAIRE DE RELEVÉ
// ============================================================

function handleSubmit(event) {
  event.preventDefault();
  const id_ronde = document.getElementById("id_ronde").value;
  const operateur = document.getElementById("operateur").value;
  const compteur = document.getElementById("compteur").value;
  const valeurActuelle = parseFloat(
    document.getElementById("valeurActuelle").value,
  );

  if (!id_ronde || !operateur || !compteur || isNaN(valeurActuelle)) {
    showMessage("Veuillez remplir tous les champs", "error");
    return;
  }

  saveReleve(id_ronde, operateur, compteur, valeurActuelle);
  showMessage("Relevé enregistré avec succès !");
  document.getElementById("valeurActuelle").value = "";
}

function setupEventListeners() {
  document
    .getElementById("releveForm")
    ?.addEventListener("submit", handleSubmit);
}

// ============================================================
// CHARGEMENT DES DONNÉES
// ============================================================

function loadSavedData() {
  const hasSections = localStorage.getItem("sections");
  const hasTypeRonde = localStorage.getItem("type_ronde");
  const hasTabCompteurs = localStorage.getItem("tabCompteurs");
  const hasRondeDB = localStorage.getItem("rondeDB");

  if (hasSections && hasTypeRonde && hasTabCompteurs && hasRondeDB) {
    sections = JSON.parse(localStorage.getItem("sections"));
    famille_list = JSON.parse(localStorage.getItem("famille_list"));
    groupe1_list = JSON.parse(localStorage.getItem("groupe1_list"));
    groupe2_list = JSON.parse(localStorage.getItem("groupe2_list"));

    type_ronde = JSON.parse(hasTypeRonde);
    tabCompteurs = JSON.parse(hasTabCompteurs);

    const parsed = JSON.parse(hasRondeDB);
    for (const compteur in parsed) {
      if (Array.isArray(parsed[compteur])) {
        parsed[compteur] = parsed[compteur].map((releve) => {
          const { consommation, ...cleanReleve } = releve;
          if (cleanReleve.id_ronde === undefined) cleanReleve.id_ronde = 0;
          return cleanReleve;
        });
      }
    }
    rondeDB = parsed;
  } else {
    initDatabase();
  }

  tabOperateurs = JSON.parse(localStorage.getItem("tabOperateurs"));

  fillRondeSelect();
  fillCompteurSelect();
}

// ============================================================
// INITIALISATION
// ============================================================

function init() {
  loadSavedData();

  const session = checkSession();

  if (!session) {
    // Pas de session : afficher la page de login
    document.getElementById("loginPage").style.display = "flex";
    document.querySelector(".container").style.display = "none";
    document.getElementById("sidebar").style.display = "none";

    // Gérer le submit du formulaire de login
    document
      .getElementById("loginForm")
      .addEventListener("submit", async function (e) {
        e.preventDefault();
        const user = document.getElementById("loginUser").value.trim();
        const password = document.getElementById("loginPassword").value;

        if (!user || !password) {
          showLoginMessage("Veuillez remplir tous les champs", "error");
          return;
        }

        await loginUser(user, password);
      });

    // Gérer le lien bypass
    document
      .getElementById("bypassLoginBtn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        bypassLogin();
      });
  } else {
    // Session existante : afficher l'application
    document.getElementById("loginPage").style.display = "none";
    document.querySelector(".container").style.display = "block";
    document.getElementById("sidebar").style.display = "block";

    // Vérifier rôle admin
    updateUIBasedOnRole(session);
  }

  remplirOperateursSelect();
  setupEventListeners();
  setupSidebar();
  setupGestionOperateurs();
  setupGestionRondes();
  setupGestionCompteurs();

  // Reset lien en bas de page
  document
    .getElementById("resetLinkFooter")
    ?.addEventListener("click", function (e) {
      e.preventDefault();
      if (
        confirm(
          "ATTENTION : Réinitialisation complète.\n\nToutes les données seront supprimées et l'application redémarrera.\n\nContinuer ?",
        )
      ) {
        if (confirm("Dernière confirmation : Êtes-vous sûr ?")) {
          localStorage.clear();
          sessionStorage.clear();
          location.reload();
        }
      }
    });
}

/**
 * Connecter un opérateur par nom d'utilisateur
 */
async function loginUser(username, password) {
  const operateur = tabOperateurs.find(
    (op) => op.nomuser_operateur.toLowerCase() === username.toLowerCase(),
  );

  if (!operateur) {
    showLoginMessage("Nom d'utilisateur introuvable.", "error");
    return;
  }

  // Vérifier si le mot de passe est déjà haché (64 chars) ou en clair
  let hashInput;
  if (operateur.motdepasse_operateur.length === 64) {
    hashInput = await hashPassword(password);
  } else {
    hashInput = password;
  }

  if (operateur.motdepasse_operateur !== hashInput) {
    showLoginMessage("Mot de passe incorrect.", "error");
    return;
  }

  // Si le mot de passe était en clair, le hasher maintenant (migration)
  if (operateur.motdepasse_operateur.length !== 64) {
    try {
      const nouveauHash = await hashPassword(password);
      operateur.motdepasse_operateur = nouveauHash;
      localStorage.setItem("tabOperateurs", JSON.stringify(tabOperateurs));
    } catch (e) {
      console.warn(
        "Impossible de hacher le mot de passe lors de la migration.",
        e,
      );
    }
  }

  // Créer la session
  const session = {
    id_operateur: operateur.id_operateur,
    nom: `${operateur.prenom_operateur} ${operateur.nom_operateur}`,
    fonction: operateur.fonction_operateur,
    dateConnexion: new Date().toISOString(),
  };

  sessionStorage.setItem("session", JSON.stringify(session));
  showLoginMessage(`Bienvenue ${session.nom} !`, "success");

  // Rediriger vers l'application après 1 seconde
  setTimeout(() => {
    location.reload();
  }, 1000);
}

/**
 * Afficher un message dans le formulaire de login
 */
function showLoginMessage(message, type = "success") {
  const messageDiv = document.getElementById("loginMessage");
  if (!messageDiv) return;

  messageDiv.textContent = message;
  messageDiv.className = `login-message ${type}`;
  messageDiv.style.display = "block";

  setTimeout(() => {
    messageDiv.style.display = "none";
    messageDiv.className = "login-message";
  }, 3000);
}

/**
 * Contourner le login pour les tests
 */
function bypassLogin() {
  const premierOp = tabOperateurs.find((op) => op.nomuser_operateur);

  if (!premierOp) {
    alert("Aucun opérateur avec login trouvé. Créez-en un d'abord.");
    return;
  }

  const session = {
    id_operateur: premierOp.id_operateur,
    nom: `${premierOp.prenom_operateur} ${premierOp.nom_operateur}`,
    fonction: premierOp.fonction_operateur || "admin",
    dateConnexion: new Date().toISOString(),
    bypass: true,
  };

  sessionStorage.setItem("session", JSON.stringify(session));
  location.reload();
}

/**
 * Vérifier si une session existe
 */
function checkSession() {
  const sessionStr = sessionStorage.getItem("session");
  if (!sessionStr) return null;

  try {
    const session = JSON.parse(sessionStr);
    const operateur = tabOperateurs.find(
      (op) => op.id_operateur === session.id_operateur,
    );
    if (!operateur) {
      sessionStorage.removeItem("session");
      return null;
    }
    return session;
  } catch (e) {
    sessionStorage.removeItem("session");
    return null;
  }
}

/**
 * Mettre à jour l'interface selon le rôle
 */
function updateUIBasedOnRole(session) {
  const operateur = tabOperateurs.find(
    (op) => op.id_operateur === session.id_operateur,
  );
  if (!operateur) return;

  const isAdmin = operateur.fonction_operateur === "admin";

  // Masquer les menus admin dans la sidebar
  const sidebarLinks = document.querySelectorAll(".sidebar-menu li a");
  sidebarLinks.forEach((link) => {
    const action = link.getAttribute("data-action");
    if (!isAdmin && ["operateurs", "compteurs", "rondes"].includes(action)) {
      link.style.display = "none";
    } else {
      link.style.display = "block";
    }
  });

  // Masquer le bouton menu si pas admin
  const menuBtn = document.getElementById("menuBtn");
  if (menuBtn) {
    menuBtn.style.display = isAdmin ? "block" : "none";
  }
}

init();
