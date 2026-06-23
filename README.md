# Gestion des Relevés de Compteurs

Une application web légère et hors-ligne permettant aux opérateurs de saisir rapidement les relevés de compteurs lors de leurs rondes d'inspection.

## 🚀 Fonctionnalités

- **Saisie rapide** : Formulaire optimisé pour saisir les relevés à la chaîne sans avoir à resélectionner l'opérateur ou le type de ronde à chaque fois.
- **Gestion des Types de Rondes** : Prise en compte des différentes tournées (Relevé journalier, Relevé de quart, etc.).
- **Menu latéral** : Accès rapide aux différentes sections via un bouton hamburger **☰** (6 options).
- **Gestion des rondes intégrée** : Ajouter et supprimer des types de rondes directement depuis l'interface (avec confirmation).
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
   - Choisissez le Compteur lu.
   - Entrez la Valeur lue.
   - Cliquez sur **Valider**.
4. **Gestion des rondes** :
   - Cliquez sur **☰** en haut à gauche.
   - Cliquez sur **🔄 Gestion des Rondes**.
   - Choisissez **Ajouter** ou **Supprimer** un type de ronde.
5. Les données sont persistées sur votre navigateur même si vous le fermez.

## 📁 Structure du Projet

- `index.html` : L'interface utilisateur de l'application (formulaire + menu latéral + panneaux de gestion).
- `styles.css` : La feuille de style gérant le design responsive et visuel de l'app.
- `scripts.js` : Toute la logique métier, la gestion du formulaire, le menu latéral et les lectures/écritures dans le `localStorage`.
- `contexte.md` : Résumé de l'état actuel du projet et des structures de données (utile pour intégrer de nouveaux développeurs ou des assistants IA).
- `documentation.md` : Documentation détaillée expliquant les algorithmes, avec diagrammes de flux et guide de maintenance.
- `instructions.txt` : État actuel du projet sous forme de notes synthétiques.

## 🔄 Navigation dans l'application

### Menu latéral

| Option                    | Statut                    |
| ------------------------- | ------------------------- |
| 📋 Recap ronde            | ⏳ Fonctionnalité à venir |
| 👥 Gestion des opérateurs | ⏳ Fonctionnalité à venir |
| 🔢 Gestion des compteurs  | ⏳ Fonctionnalité à venir |
| 🔄 Gestion des Rondes     | ✅ Implémenté             |
| 📈 Tableau de bord        | ⏳ Fonctionnalité à venir |
| 📑 Tableur                | ⏳ Fonctionnalité à venir |

### Gestion des Rondes (✅ Implémenté)

- **Ajouter type de ronde** : formulaire avec Nom, Délai (min), Description + boutons ✅ Ajouter et ❌ Annuler
- **Supprimer type de ronde** : liste avec cases à cocher + confirmation avant suppression
- Bouton retour **←** pour revenir à l'écran précédent

## 🔄 Historique

Initialement, cette application calculait la consommation en comparant la nouvelle valeur saisie avec l'ancienne, et intégrait un affichage du dernier relevé. Ce système a été refondu pour se concentrer sur une collecte de données brute (`rondeDB`), horodatée, avec la notion de typologie de ronde (`type_ronde`), facilitant ainsi de futures exploitations par des systèmes tiers.

L'interface a été enrichie d'un menu latéral coulissant avec 6 options, incluant un panneau complet de gestion des types de rondes (ajout et suppression avec confirmation).
