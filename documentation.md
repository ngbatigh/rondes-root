# Documentation Technique

Ce fichier détaille le fonctionnement interne de l'application, les algorithmes principaux, et donne un guide clair pour maintenir et améliorer le code existant.

---

## 1. Diagrammes de Flux (Mermaid)

### A. Initialisation de l'application (`init()` → `loadSavedData()` → `initDatabase()`)

```mermaid
graph TD
    A[Lancement de l'app / init] --> B[loadSavedData]
    B --> C{Vérifier les 4 clés localStorage}
    C -->|Toutes présentes| D[Charger sections, famille_list, groupe1_list, groupe2_list]
    D --> E[Charger type_ronde]
    E --> F[Charger tabCompteurs]
    F --> G[Charger rondeDB avec nettoyage]
    C -->|Une clé manquante| H[Appel à initDatabase]
    H --> I[Initialiser les constantes]
    I --> J[Initialiser type_ronde]
    J --> K[Initialiser tabCompteurs 9 compteurs]
    K --> L[Initialiser rondeDB avec 3 relevés test]
    L --> M[Tout sauvegarder dans localStorage]
    G --> N[fillRondeSelect + fillCompteurSelect]
    M --> N
    N --> O[setupEventListeners + setupSidebar + setupGestionRondes + setupGestionCompteurs]
```

### B. Soumission d'un Relevé (`handleSubmit()`)

```mermaid
graph TD
    A[Clic sur 'Valider la saisie'] --> B[Empêcher rechargement page preventDefault]
    B --> C[Récupération inputs: id_ronde, operateur, compteur, valeur]
    C --> D{Champs valides?}
    D -->|Non| E[Afficher message d'erreur]
    D -->|Oui| F[Appel saveReleve]
    F --> G[Génération Date et Heure système]
    G --> H[Création objet Relevé]
    H --> I[Ajout dans rondeDB array du compteur]
    I --> J[Sérialisation JSON et sauvegarde dans localStorage]
    J --> K[Afficher message de succès]
    K --> L[Réinitialisation de l'input valeurActuelle]
```

### C. Navigation dans le menu latéral (`setupSidebar()`)

```mermaid
graph TD
    A[Clic sur ☰] --> B[Ouverture sidebar + overlay]
    C[Clic sur × ou overlay] --> D[Fermeture sidebar + overlay]
    E[Clic sur un lien du menu] --> F[Fermeture sidebar]
    F --> G{Action}
    G -->|rondes| H[Afficher gestionRondesMenu]
    G -->|compteurs| I[Afficher gestionCompteursMenu]
    G -->|autres| J[Afficher formulaire de relevé + message]
```

### D. Gestion des types de rondes

```mermaid
graph TD
    A[Menu Gestion des Rondes] --> B[2 options]
    B --> C[Ajouter type de ronde]
    B --> D[Supprimer type de ronde]
    C --> E[Formulaire: Nom, Délai, Description]
    E --> F[Bouton ✅ Ajouter]
    E --> G[Bouton ❌ Annuler → retour menu]
    F --> H[id_ronde auto-incrémenté]
    H --> I[Sauvegarde localStorage]
    I --> J[Mise à jour fillRondeSelect]
    D --> K[Liste avec cases à cocher]
    K --> L[Sélection utilisateur]
    L --> M[Bouton 🗑️ Supprimer]
    M --> N[Confirmation dialogue]
    N -->|Oui| O[Suppression + sauvegarde localStorage]
    N -->|Non| P[Annulation]
    O --> Q[Mise à jour fillRondeSelect]
```

### E. Gestion des compteurs

```mermaid
graph TD
    A[Menu Gestion des Compteurs] --> B[4 options]
    B --> C[✅ Activer compteur]
    B --> D[✏️ Modifier compteur]
    B --> E[📋 Cloner compteur]
    B --> F[➕ Créer compteur]
    C --> G[Liste compteurs avec checkboxes visible/actif]
    G --> H[💾 Enregistrer → mise à jour enservice + localStorage]
    D --> I[Sélection compteur → formulaire pré-rempli]
    I --> J[Modification champs + listes déroulantes]
    J --> K[💾 Enregistrer → localStorage]
    E --> L[Sélection parent + nouvel ID]
    L --> M[Aperçu JSON]
    M --> N[📋 Cloner → copie valeurs sauf id]
    F --> O[Formulaire complet + listes déroulantes]
    O --> P[✅ Créer → ajout dans tabCompteurs]
```

---

## 2. Description des Fonctions (`scripts.js`)

### Fonctions d'initialisation et chargement

- **`initDatabase()`** : Fonction appelée uniquement au premier lancement (quand une des 4 clés localStorage est manquante). Initialise et sauvegarde toutes les données : constantes, type_ronde, tabCompteurs (9 compteurs), rondeDB (3 relevés test).
- **`loadSavedData()`** : Vérifie la présence des 4 clés (`sections`, `type_ronde`, `tabCompteurs`, `rondeDB`) dans localStorage. Si toutes présentes, charge les données. Sinon, appelle `initDatabase()`.
- **`init()`** : Point d'entrée de l'application. Appelle `loadSavedData()`, puis configure tous les event listeners.

### Fonctions utilitaires

- **`fillSelectFromArray(elementId, array, emptyOption)`** : Remplit un `<select>` avec un tableau de valeurs.
- **`fillRondeSelect()`** : Génère dynamiquement les `<option>` de la liste déroulante "Type de ronde".
- **`fillCompteurSelect()`** : Génère dynamiquement les `<option>` de la liste déroulante "Compteur". Filtre uniquement les compteurs visibles ET actifs.
- **`showMessage(message, type)`** : Affiche une notification temporaire (3 secondes).
- **`saveReleve(id_ronde, id_operateur, id_compteur, valeur)`** : Cœur de la logique d'enregistrement. Génère date/heure système, crée l'objet relevé, l'ajoute dans rondeDB et sauvegarde dans localStorage.

### Fonctions du menu latéral et navigation

- **`setupSidebar()`** : Configure l'ouverture/fermeture du menu latéral (bouton ☰, bouton ×, overlay). Gère le clic sur chaque lien du menu.
- **`showPanel(panelId)`** : Affiche un panneau spécifique et masque tous les autres. Gère 9 panneaux : releveForm, gestionRondesMenu, ajouterRondePanel, supprimerRondePanel, gestionCompteursMenu, activerCompteurPanel, modifierCompteurPanel, clonerCompteurPanel, creerCompteurPanel.

### Fonctions de gestion des rondes

- **`renderRondesCheckList()`** : Génère la liste des rondes avec cases à cocher (pour suppression).
- **`ajouterRonde()`** : Lit les champs du formulaire, calcule l'id_ronde auto-incrémenté, ajoute dans type_ronde, sauvegarde dans localStorage.
- **`supprimerRondesSelection()`** : Récupère les IDs cochés, demande confirmation, supprime les rondes, met à jour l'affichage.

### Fonctions de gestion des compteurs

- **`renderActiverCheckList()`** : Génère la liste de tous les compteurs avec badge de statut (✅ Actif & visible, 👁️ Actif mais invisible, ⏸️ Inactif) et checkboxes visible/actif.
- **`enregistrerActiver()`** : Met à jour les champs visible_compteur et actif_compteur, met à jour enservice_compteur en conséquence.
- **`remplirSelectModifier()`** : Remplit la liste déroulante de sélection pour "Modifier compteur".
- **`chargerCompteurDansFormModifier()`** : Charge les données du compteur sélectionné dans le formulaire de modification.
- **`enregistrerModification()`** : Enregistre les modifications d'un compteur.
- **`remplirSelectCloner()`** : Remplit la liste déroulante de sélection pour "Cloner compteur".
- **`afficherApercuClone()`** : Affiche un aperçu JSON du clone.
- **`executerClonage()`** : Crée un clone d'un compteur (copie toutes les valeurs sauf id_compteur).
- **`creerCompteur()`** : Crée un nouveau compteur à partir du formulaire.
- **`setupGestionCompteurs()`** : Configure tous les événements des panneaux de gestion des compteurs.

---

## 3. Structure du stockage localStorage

| Clé            | Type     | Description                                          |
| -------------- | -------- | ---------------------------------------------------- |
| `sections`     | `Array`  | 9 sections (Salle Des Machines, Embouteillage, etc.) |
| `famille_list` | `Array`  | 7 familles (Eau, Energie, DDO, etc.)                 |
| `groupe1_list` | `Array`  | 9 groupes (A, B, C, D, E, F, G, H, I)                |
| `groupe2_list` | `Array`  | 9 groupes (1, 2, 3, 4, 5, 6, 7, 8, 9)                |
| `type_ronde`   | `Array`  | Types de rondes (journalier, quart, etc.)            |
| `tabCompteurs` | `Array`  | 9 compteurs avec tous leurs champs                   |
| `rondeDB`      | `Object` | Relevés par compteur (clé = id_compteur)             |

---

## 4. Guide de Maintenance et Mise à Niveau (Upgrade)

### Ajouter un nouvel Opérateur

1. Ouvrir `index.html`.
2. Repérer le `<select id="operateur">`.
3. Ajouter une nouvelle balise `<option value="Nom">Nom</option>`.

### Ajouter un nouveau Compteur (via l'interface)

1. Cliquer sur **☰** → **🔢 Gestion des compteurs** → **➕ Créer compteur**.
2. Remplir le formulaire et cliquer sur **✅ Créer**.

### Ajouter un Type de Ronde (via l'interface)

1. Cliquer sur **☰** → **🔄 Gestion des Rondes** → **➕ Ajouter type de ronde**.
2. Remplir le formulaire et cliquer sur **✅ Ajouter**.

### Réinitialiser les données

Pour forcer la réinitialisation au premier lancement :

1. Ouvrir la console navigateur (F12).
2. Taper `localStorage.clear()` et recharger la page.

### Futures implémentations suggérées

- **Export des données** : Créer un bouton qui transforme `rondeDB` en fichier `.csv` ou `.json` pour le télécharger.
- **Synchronisation réseau** : Ajouter un module `fetch()` pour envoyer les données au serveur quand une connexion internet est détectée.
- **Gestion dynamique des opérateurs** : Créer un panneau d'administration pour ajouter/supprimer des opérateurs.
- **Tableau de bord** : Ajouter des statistiques sur les relevés (consommation, tendances, etc.).
