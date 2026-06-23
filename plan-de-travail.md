## Plan : Vérification unicité `id_ronde` avant création

### Contexte

La branche `gestion-rondes` a une version plus ancienne de `scripts.js` (457 lignes) qui ne contient pas la vérification d'unicité pour `id_ronde`. Actuellement, l'`id_ronde` est auto-incrémenté via `Math.max(...type_ronde.map((r) => r.id_ronde)) + 1`, ce qui garantit théoriquement l'unicité. Cependant, il n'y a pas de vérification explicite.

### Vérification à ajouter

**Fonction `ajouterRonde()` (ligne 236)** — Ajouter une vérification explicite :

```javascript
const newId = maxId + 1;
if (type_ronde.find((r) => r.id_ronde === newId)) {
  showMessage("Cet ID de ronde existe déjà.", "error");
  return;
}
```

Bien que l'auto-incrémentation rende cette vérification redondante dans la pratique, elle est une sécurité supplémentaire en cas de modification manuelle des données localStorage.

### Fichier à modifier

- **`scripts.js`** : Ajouter la vérification dans `ajouterRonde()`

Basculez en **ACT MODE** pour que j'applique cette vérification.

État actuel du projet (juin 2026) :

## 1. Renommage

- `releveDB` → `rondeDB` (effectué)
- Chaque compteur est relevé en enregistrant : id_compteur, id_operateur, id_ronde, valeur, date, heure

## 2. Types de rondes

- Tableau `type_ronde` initialisé avec 2 valeurs : "Relevé journalier" (1440 min) et "Relevé de quart" (480 min)
- Gérable depuis l'interface (menu latéral → Gestion des Rondes)
- 2 sous-menus : Ajouter type de ronde + Supprimer type de ronde (avec confirmation)

## 3. Menu latéral

- Bouton hamburger ☰ en haut à gauche
- 6 options : Recap ronde, Gestion des opérateurs, Gestion des compteurs, Gestion des Rondes, Tableau de bord, Tableur
- Seule "Gestion des Rondes" est implémentée pour l'instant
- Les autres options affichent un message "Fonctionnalité à venir"

## 4. Compteurs (état actuel)

- 5 compteurs figés : eau, electricite, ddo, produit, temp
- Non gérables depuis l'interface

## 5. Opérateurs (état actuel)

- 3 opérateurs figés : Koffi, Gbati, Abalo
- Non gérables depuis l'interface

## 6. Validation

- Une confirmation est requise avant toute suppression
- Une validation des champs requis est effectuée avant tout ajout

## Synthèse : Gestion des données des rondes et des compteurs

### 1. Stockage — `localStorage` du navigateur

Deux entités sont sauvegardées automatiquement après chaque relevé :

| Clé `localStorage` | Type                    | Description                           |
| ------------------ | ----------------------- | ------------------------------------- |
| `type_ronde`       | `Array`                 | Définit les types de rondes possibles |
| `rondeDB`          | `Object` (dictionnaire) | Stocke tous les relevés par compteur  |

---

### 2. Structure des données

#### `type_ronde` (initialisé en dur dans `scripts.js`)

```json
[
  {
    "id_ronde": 0,
    "ronde": "Relevé journalier",
    "delai": "1440",
    "description_ronde": "relevé de tous les compteurs chaque matin aux alentours de 06:00"
  },
  {
    "id_ronde": 1,
    "ronde": "Relevé de quart",
    "delai": "480",
    "description_ronde": "relevé de tous les compteurs chaque quart de 8 heures"
  }
]
```

#### `rondeDB` (ex-`relevesDB`)

```json
{
  "eau": [
    { "id_ronde": 0, "id_operateur": "Koffi", "id_compteur": "eau", "valeur": 1250, "date": "2026-06-23", "heure": "06:30", "commentaire": "" }
  ],
  "electricite": [ ... ],
  "ddo": [ ... ],
  "produit": [ ... ],
  "temp": [ ... ]
}
```

---

### 3. Gestion des types de rondes

**Depuis l'interface utilisateur (menu latéral → 🔄 Gestion des Rondes) :**

- **Ajouter type de ronde** : formulaire avec Nom, Délai (min), Description + boutons ✅ Ajouter et ❌ Annuler
- **Supprimer type de ronde** : liste avec cases à cocher + confirmation avant suppression
- Les modifications sont sauvegardées dans `localStorage` et la liste déroulante du formulaire de relevé est mise à jour automatiquement
- L'`id_ronde` est auto-incrémenté à partir du max existant

---

### 4. Gestion des compteurs

**État actuel : les compteurs sont figés**

Les 5 compteurs sont définis en dur dans `scripts.js` comme clés de l'objet `rondeDB` :

```javascript
let rondeDB = {
  eau: [], // Eau (m³)
  electricite: [], // Électricité (kWh)
  ddo: [], // DDO (m³)
  produit: [], // Produit (hl)
  temp: [], // Temp (min)
};
```

La liste déroulante `<select id="compteur">` dans `index.html` contient ces 5 compteurs en HTML statique.

**Contrairement aux types de rondes, il n'existe aucun panneau d'administration pour gérer les compteurs (ajout, modification, suppression).**

---

### 5. Cycle de vie d'un relevé

```
1. Utilisateur remplit le formulaire
   → Sélectionne : Opérateur + Type de ronde + Compteur + Valeur

2. Clic sur "Valider la saisie"
   → saveReleve() est appelée
   → Génération automatique : date du jour + heure système
   → Nouvel objet relevé poussé dans rondeDB[compteur]
   → Sauvegarde dans localStorage

3. Message de confirmation affiché 3 secondes
```

---

### 6. Logique métier actuelle

- **Pas de calcul de consommation** — la collecte est brute
- **Pas de blocage** — aucune comparaison avec un relevé antérieur
- **Aucune modification/suppression** possible via l'interface
- **Horodatage système** — date et heure ajoutées automatiquement

---

### 7. Points importants

- **Persistance** : les données survivent à la fermeture du navigateur (localStorage)
- **Données de test** : si localStorage est vide, `initDatabase()` crée 5 relevés (un par compteur) datés de la veille
- **Nettoyage automatique** : au chargement, les anciens champs `consommation` sont supprimés des relevés
- **Types de rondes** : gérables depuis l'interface (ajout/suppression avec confirmation)
- **Compteurs** : NON gérables depuis l'interface (définis en dur)
- **Opérateurs** : NON gérables depuis l'interface (liste statique dans le HTML)

---

# Important : une validation de confirmation est requise avant toute suppression ou ajout de donnée
