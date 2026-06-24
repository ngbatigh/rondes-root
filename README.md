# Gestion des Relevés de Compteurs

Une application web légère et hors-ligne permettant aux opérateurs de saisir rapidement les relevés de compteurs lors de leurs rondes d'inspection.

## 🚀 Fonctionnalités

- **Saisie rapide** : Formulaire optimisé pour saisir les relevés à la chaîne sans avoir à resélectionner l'opérateur ou le type de ronde à chaque fois.
- **Gestion des Types de Rondes** : Prise en compte des différentes tournées (Relevé journalier, Relevé de quart, etc.).
- **Gestion des Compteurs** : 9 compteurs initialisés avec possibilité d'activer, modifier, cloner et créer de nouveaux compteurs.
- **Menu latéral** : Accès rapide aux différentes sections via un bouton hamburger **☰** (6 options).
- **Mode 100% Hors-ligne** : Toutes les données saisies sont sauvegardées directement dans le navigateur (`localStorage`). Aucune connexion internet n'est requise.
- **Horodatage automatique** : La date et l'heure du système sont automatiquement jointes au relevé de manière transparente.

## 🛠️ Technologies

- HTML5
- CSS3
- JavaScript (Vanilla / Aucun framework)

## 📋 Installation & Utilisation

1. **Cloner ou télécharger** ce dépôt sur votre machine.
2. **Lancer l'application** : Ouvrez simplement le fichier `index.html` dans n'importe quel navigateur web moderne (Chrome, Firefox, Safari, Edge).
3. **Saisie d'un relevé** :
   - Sélectionnez un Opérateur.
   - Sélectionnez un Type de ronde.
   - Choisissez le Compteur lu (seuls les compteurs visibles et actifs apparaissent).
   - Entrez la Valeur lue.
   - Cliquez sur **Valider**.
4. **Gestion des rondes** :
   - Cliquez sur **☰** en haut à gauche.
   - Cliquez sur **🔄 Gestion des Rondes**.
   - Choisissez **Ajouter** ou **Supprimer** un type de ronde.
5. **Gestion des compteurs** :
   - Cliquez sur **☰** en haut à gauche.
   - Cliquez sur **🔢 Gestion des compteurs**.
   - Choisissez **Activer**, **Modifier**, **Cloner** ou **Créer** un compteur.
6. Les données sont persistées sur votre navigateur même si vous le fermez.

## 📁 Structure du Projet

- `index.html` : L'interface utilisateur (formulaire + menu latéral + panneaux de gestion).
- `styles.css` : La feuille de style gérant le design responsive et visuel.
- `scripts.js` : Toute la logique métier, la gestion du formulaire, le menu latéral et les lectures/écritures dans le `localStorage`.
- `contexte.md` : Résumé de l'état actuel du projet et des structures de données.
- `documentation.md` : Documentation détaillée expliquant les algorithmes, avec diagrammes de flux et guide de maintenance.
- `gestion-rondes01.txt` : Synthèse de la gestion des rondes et compteurs.
- `gestion-compteurs01.txt` : Synthèse détaillée de la gestion des compteurs.
- `init-tab-compteurs.sql` : Données SQL d'initialisation des 9 compteurs.

## 🔄 Navigation dans l'application

### Menu latéral

| Option                    | Statut                       |
| ------------------------- | ---------------------------- |
| 📋 Recap ronde            | ⏳ Fonctionnalité à venir    |
| 👥 Gestion des opérateurs | ⏳ Fonctionnalité à venir    |
| 🔢 Gestion des compteurs  | ✅ Implémenté (4 sous-menus) |
| 🔄 Gestion des Rondes     | ✅ Implémenté (2 sous-menus) |
| 📈 Tableau de bord        | ⏳ Fonctionnalité à venir    |
| 📑 Tableur                | ⏳ Fonctionnalité à venir    |

### Gestion des Rondes (✅ Implémenté)

- **Ajouter type de ronde** : formulaire avec Nom, Délai (min), Description + boutons ✅ Ajouter et ❌ Annuler
- **Supprimer type de ronde** : liste avec cases à cocher + confirmation avant suppression

### Gestion des Compteurs (✅ Implémenté)

- **✅ Activer compteur** : liste avec checkboxes visible/actif + badge statut
- **✏️ Modifier compteur** : sélection + formulaire pré-rempli + listes déroulantes
- **📋 Cloner compteur** : sélection parent + nouvel ID + aperçu JSON
- **➕ Créer compteur** : formulaire complet + listes déroulantes + cases à cocher

## 📦 Stockage localStorage

| Clé            | Contenu                            |
| -------------- | ---------------------------------- |
| `sections`     | 9 sections (listes déroulantes)    |
| `famille_list` | 7 familles (listes déroulantes)    |
| `groupe1_list` | 9 groupes 1 (A-I)                  |
| `groupe2_list` | 9 groupes 2 (1-9)                  |
| `type_ronde`   | Types de rondes                    |
| `tabCompteurs` | 9 compteurs avec tous leurs champs |
| `rondeDB`      | Relevés par compteur               |

## 🔄 Historique

Initialement, cette application calculait la consommation en comparant la nouvelle valeur saisie avec l'ancienne. Ce système a été refondu pour se concentrer sur une collecte de données brute (`rondeDB`), horodatée, avec la notion de typologie de ronde (`type_ronde`) et la gestion dynamique des compteurs (`tabCompteurs`).
