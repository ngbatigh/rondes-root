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

let previousPanel = "releveForm";

function showPanel(panelId) {
  const form = document.getElementById("releveForm");
  const rondesMenu = document.getElementById("gestionRondesMenu");
  const ajouterRonde = document.getElementById("ajouterRondePanel");
  const supprimerRonde = document.getElementById("supprimerRondePanel");

  const compteursMenu = document.getElementById("gestionCompteursMenu");
  const activerCompteur = document.getElementById("activerCompteurPanel");
  const modifierCompteur = document.getElementById("modifierCompteurPanel");
  const clonerCompteur = document.getElementById("clonerCompteurPanel");
  const creerCompteur = document.getElementById("creerCompteurPanel");

  // Masquer tous
  form.style.display = "none";
  rondesMenu.style.display = "none";
  ajouterRonde.style.display = "none";
  supprimerRonde.style.display = "none";
  compteursMenu.style.display = "none";
  activerCompteur.style.display = "none";
  modifierCompteur.style.display = "none";
  clonerCompteur.style.display = "none";
  creerCompteur.style.display = "none";

  // Afficher le bon panneau
  if (panelId === "releveForm") form.style.display = "block";
  else if (panelId === "gestionRondesMenu") rondesMenu.style.display = "block";
  else if (panelId === "ajouterRondePanel")
    ajouterRonde.style.display = "block";
  else if (panelId === "supprimerRondePanel") {
    supprimerRonde.style.display = "block";
    renderRondesCheckList();
  } else if (panelId === "gestionCompteursMenu")
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

      if (action === "rondes") showPanel("gestionRondesMenu");
      else if (action === "compteurs") showPanel("gestionCompteursMenu");
      else {
        showPanel("releveForm");
        if (action === "recap")
          showMessage("📋 Recap ronde - Fonctionnalité à venir");
        else if (action === "operateurs")
          showMessage("👥 Gestion des opérateurs - Fonctionnalité à venir");
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

    // En-tête avec l'ID et le nom
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

    // Checkboxes
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

  // Mettre à jour enservice_compteur en fonction de actif_compteur
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

  // Remplir les listes déroulantes
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
  showMessage(`Compteur "${id}" modifié.`);
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

  // Réinitialiser le formulaire
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
  // Vérifier si toutes les clés nécessaires sont dans localStorage
  const hasSections = localStorage.getItem("sections");
  const hasTypeRonde = localStorage.getItem("type_ronde");
  const hasTabCompteurs = localStorage.getItem("tabCompteurs");
  const hasRondeDB = localStorage.getItem("rondeDB");

  if (hasSections && hasTypeRonde && hasTabCompteurs && hasRondeDB) {
    // Charger les constantes
    sections = JSON.parse(localStorage.getItem("sections"));
    famille_list = JSON.parse(localStorage.getItem("famille_list"));
    groupe1_list = JSON.parse(localStorage.getItem("groupe1_list"));
    groupe2_list = JSON.parse(localStorage.getItem("groupe2_list"));

    // Charger type_ronde
    type_ronde = JSON.parse(hasTypeRonde);

    // Charger tabCompteurs
    tabCompteurs = JSON.parse(hasTabCompteurs);

    // Charger rondeDB avec nettoyage des anciennes données
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
    // Premier lancement : tout initialiser
    initDatabase();
  }

  fillRondeSelect();
  fillCompteurSelect();
}

// ============================================================
// INITIALISATION
// ============================================================

function init() {
  loadSavedData();
  setupEventListeners();
  setupSidebar();
  setupGestionRondes();
  setupGestionCompteurs();
}

init();
