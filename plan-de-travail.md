# Plan de travail — Branche lecture-qrcode

## Fonctionnalité 1 : Scan QR Code pour sélection de compteur

### Objectif

Permettre à l'opérateur de scanner un QR Code pour remplir automatiquement le champ "Compteur" du formulaire.

### Modifications implémentées

#### 1. `index.html`

- Ajout de la librairie `html5-qrcode` dans le `<head>`
- Ajout d'un bouton **📷 Scanner QR Code** au-dessus du select compteur
- Ajout d'un élément caché pour le flux caméra plein écran

#### 2. `scripts.js`

- Logique de scan QR Code avec `Html5Qrcode`
- Lecture de l'`id_compteur` scanné et remplissage du select compteur
- Gestion de la caméra arrière (facingMode: environment)

#### 3. `styles.css`

- Style du bouton scan
- Style de l'écran plein écran pour le scan

---

## Fonctionnalité 2 : Gestion des compteurs (gestion-compteurs)

### Sous-menus de Gestion des compteurs

1. **Activer compteur** — visibilité et statut actif/inactif
2. **Modifier compteur** — édition complète des champs
3. **Cloner compteur** — copie avec nouvel ID
4. **Créer compteur** — formulaire complet avec listes déroulantes
5. **Créer QR Code** — génération et téléchargement

### Données

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

### Champs compteurs

- `id_compteur`, `nom_compteur`, `unite_compteur`, `debut_compteur`, `range_compteur`
- `section_compteur`, `famille_compteur`, `groupe1_compteur`, `groupe2_compteur`
- `enservice_compteur`, `visible_compteur`, `actif_compteur`, `description_compteur`

### Vérifications

- Unicité de `id_compteur` avant création/modification
- 9 compteurs initialisés dans `tabCompteurs`
