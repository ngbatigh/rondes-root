- plutot 9 compteurs a initialiser.
- creer plutot 4 sous menus dans l'ordre strict de haut en bas sera :
  1. activer compteur
  2. modifier compteur
  3. cloner compteur
  4. creer compteur
- sur le formulaire cloner le compteur, on doit pouvoir selectionner un compteur a cloner, puis un id_compteur qui sera le clone; l'action de cloner equivaut a copier toutes les valeurs des champs du parent au clone sauf les id_compteur.
- ajouter a la liste des champs, juste après le champ en service_compteur, un champ "visible_compteur" et "actif_compteur" qui sont des booleens l'un stockant le statut visible ou invisible du compteur et l'autre le statut actif ou inactif du compteur.
- sur le formulaire activer compteur donner la possibilite de modifier les champs "visible_compteur" et "actif_compteur" a travers les cases a cocher.
- créer les constantes suivantes :

```js
    1. const section = [
  "Salle Des Machines",
  "Embouteillage",
  "Cave-Filtration-Siroperie",
  "Brassage",
  "Administration",
  "Bloc Social",
  "Traitement Eau Process",
  "Traitement Eau Usees",
  "Centre Logistique"
];
    2. const famille = [
  "Eau",
  "Energie",
  "DDO",
  "Vapeur",
  "Pression",
  "Temperature",
  "Debit"
];
    3. const groupe1 = ["A","B","C","D","E","F","G","H","I"];
    4. const groupe2 = ["1","2","3","4","5","6","7","8","9"];
```

- sur le formulaire creer compteur, les champs section_compteur, famille_compteur, groupe1_compteur, groupe2_compteur seront des listes deroulantes alimentés avec les données des constantes sections, familles, groupe1 et groupe2. les champs visible_compteur et actif_compteur sont des cases a cocher.

---

## plan propose

## Plan mis à jour : Gestion des Compteurs (v2)

### 1. Données SQL mises à jour

Le fichier SQL a été modifié. Les 9 compteurs ont maintenant des valeurs cohérentes avec les constantes :

```javascript
let tabCompteurs = [
  // === EAU ===
  { id_compteur: "A-0000-0000-0000-0001", nom_compteur: "eau mitige laveuse",  unite_compteur: "m3",  debut_compteur: 7.00,  range_compteur: 1000000.00, section_compteur: "Embouteillage",     famille_compteur: "eau",  groupe1_compteur: "A", groupe2_compteur: "1", enservice_compteur: "2026-06-01 00:00:00", description_compteur: "compteur eau" },
  { id_compteur: "B-0000-0000-0000-0001", ... enservice_compteur: "" ... }, // Inactif
  { id_compteur: "C-0000-0000-0000-0001", ... enservice_compteur: "" ... }, // Inactif

  // === ÉLECTRICITÉ ===
  { id_compteur: "A-0000-0000-0000-0010", nom_compteur: "electricite Axima", unite_compteur: "kwh", debut_compteur: 12.00, range_compteur: 1000000.00, section_compteur: "Salle Des Machines", famille_compteur: "Energie", groupe1_compteur: "A", groupe2_compteur: "1", enservice_compteur: "2026-06-20 00:00:00", description_compteur: "compteur d'électricité" },
  { id_compteur: "B-0000-0000-0000-0010", ... enservice_compteur: "" ... }, // Inactif
  { id_compteur: "C-0000-0000-0000-0010", ... enservice_compteur: "" ... }, // Inactif

  // === TEMPÉRATURE ===
  { id_compteur: "A-0000-0000-0000-0011", nom_compteur: "temperature glycole", unite_compteur: "°C",  debut_compteur: -4.00, range_compteur: 1000000.00, section_compteur: "Salle Des Machines", famille_compteur: "Temperature", groupe1_compteur: "F", groupe2_compteur: "1", enservice_compteur: "2026-06-19 00:00:00", description_compteur: "Thermometre ligne glycole" },
  { id_compteur: "B-0000-0000-0000-0011", ... enservice_compteur: "" ... }, // Inactif
  { id_compteur: "C-0000-0000-0000-0011", ... enservice_compteur: "" ... }, // Inactif
];
```

**Nouveaux champs à ajouter :** `visible_compteur: true/false`, `actif_compteur: true/false`

### 2. Constantes (listes déroulantes)

```javascript
const sections = [
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
const famille_list = [
  "Eau",
  "Energie",
  "DDO",
  "Vapeur",
  "Pression",
  "Temperature",
  "Debit",
];
const groupe1_list = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const groupe2_list = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
```

### 3. Navigation

Quand l'utilisateur clique sur **🔢 Gestion des compteurs** :

```
┌──────────────────────────────────────┐
│ ←   🔢 Gestion des compteurs        │
├──────────────────────────────────────┤
│  ┌────────────────────────────┐      │
│  │  ✅ Activer compteur       │      │  ← 1er
│  └────────────────────────────┘      │
│  ┌────────────────────────────┐      │
│  │  ✏️ Modifier compteur      │      │  ← 2ème
│  └────────────────────────────┘      │
│  ┌────────────────────────────┐      │
│  │  📋 Cloner compteur        │      │  ← 3ème
│  └────────────────────────────┘      │
│  ┌────────────────────────────┐      │
│  │  ➕ Créer compteur         │      │  ← 4ème
│  └────────────────────────────┘      │
└──────────────────────────────────────┘
```

### 4. Détail des 4 sous-menus

#### ✅ Activer compteur

- Liste de **tous les compteurs** avec pour chacun :
  - `id_compteur` + `nom_compteur` + statut actuel
  - Case à cocher **👁️ visible** (lié à `visible_compteur`)
  - Case à cocher **✅ actif** (lié à `actif_compteur`)
- Bouton **💾 Enregistrer** en bas → sauvegarde localStorage

#### ✏️ Modifier compteur

- Liste déroulante pour sélectionner un compteur
- Formulaire pré-rempli avec **tous les champs** (sauf `id_compteur` en lecture seule)
- `section_compteur`, `famille_compteur`, `groupe1_compteur`, `groupe2_compteur` → listes déroulantes des constantes
- `visible_compteur`, `actif_compteur` → cases à cocher
- Boutons : **💾 Enregistrer** et **❌ Annuler**

#### 📋 Cloner compteur

- Étape 1 : sélectionner le compteur **parent** dans une liste déroulante
- Étape 2 : saisir le nouvel **id_compteur** (champ texte)
- Aperçu des valeurs qui seront copiées (lecture seule)
- Boutons : **📋 Cloner** et **❌ Annuler**
- Le clone hérite de **toutes** les valeurs sauf `id_compteur`
- `enservice_compteur` = vide, `visible_compteur` = true, `actif_compteur` = true

#### ➕ Créer compteur

Formulaire complet avec :
| Champ | Type | Remplissage |
|---|---|---|
| `id_compteur` | texte | Obligatoire |
| `nom_compteur` | texte | Libre |
| `unite_compteur` | texte | Libre |
| `debut_compteur` | nombre | Libre |
| `range_compteur` | nombre | Libre |
| `section_compteur` | **liste déroulante** | Constante `sections` |
| `famille_compteur` | **liste déroulante** | Constante `famille_list` |
| `groupe1_compteur` | **liste déroulante** | Constante `groupe1_list` |
| `groupe2_compteur` | **liste déroulante** | Constante `groupe2_list` |
| `description_compteur` | texte | Libre |
| `visible_compteur` | **case à cocher** | Par défaut: ✅ |
| `actif_compteur` | **case à cocher** | Par défaut: ✅ |

- Boutons : **✅ Créer** et **❌ Annuler**

### 5. Fichiers à modifier

**`index.html`** :

- Remplacer le `<select id="compteur">` statique (lignes 57-64) par un select dynamique
- Ajouter les 5 nouvelles sections HTML : `#gestionCompteursMenu`, `#activerCompteurPanel`, `#modifierCompteurPanel`, `#clonerCompteurPanel`, `#creerCompteurPanel`

**`scripts.js`** :

- Ajouter `tabCompteurs` (9 objets), `sections`, `famille_list`, `groupe1_list`, `groupe2_list`
- Ajouter `fillCompteurSelect()` pour le select dynamique
- Ajouter `fillSelectFromArray(elementId, array)` utilitaire
- Ajouter `setupGestionCompteurs()` + fonctions :
  - `activerCompteurs()`
  - `modifierCompteur()`
  - `clonerCompteur()`
  - `creerCompteur()`
- Modifier `setupSidebar()` : action "compteurs" → `#gestionCompteursMenu`
- Sauvegarder `tabCompteurs` dans `localStorage`

**`styles.css`** : déjà équipé (`.panel`, `.panel-header`, `.back-btn`, `.menu-card`, `.check-item`, `.btn-row`)

**`init-tab-compteurs.sql`** : inchangé, déjà à jour

---

Ce plan révisé vous convient-il ? Je peux le mettre en œuvre dès que vous basculez en **ACT MODE**.

---

## prevoir une gestion de l'affichage de l'id_compteurs dans les listes sur option

## Plan : Vérification unicité `id_compteur` avant création/modification

### Contexte

Le plan de travail actuel (branche `gestion-compteurs`) demande de vérifier l'unicité de `id_compteur` avant toute création ou modification de compteur. Les fonctions `creerCompteur()` et `enregistrerModification()` contiennent déjà cette vérification, mais je dois m'assurer qu'elle est correcte et la renforcer si nécessaire.

### Vérifications à effectuer dans `scripts.js`

#### 1. Fonction `creerCompteur()` (ligne ~844)

Vérifier que le code contient déjà :

```javascript
if (tabCompteurs.find((c) => c.id_compteur === id)) {
  showMessage("Cet ID existe déjà.", "error");
  return;
}
```

✅ Cette vérification est déjà présente.

#### 2. Fonction `enregistrerModification()` (ligne ~737)

Vérifier que lors de la modification, si l'utilisateur change l'ID, on vérifie que le nouvel ID n'existe pas déjà (s'il est différent de l'original).

Actuellement, le code ne vérifie pas cela. Je dois ajouter :

```javascript
const originalId = id;
const newId = document.getElementById("modifierIdCompteur").value;
if (newId !== originalId && tabCompteurs.find((c) => c.id_compteur === newId)) {
  showMessage("Cet ID existe déjà.", "error");
  return;
}
```

### Fichier à modifier

- **`scripts.js`** : Renforcer la vérification dans `enregistrerModification()`

Basculez en **ACT MODE** pour que j'applique cette vérification.
