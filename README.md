# Gestion des Relevés de Compteurs

Une application web légère et hors-ligne permettant aux opérateurs de saisir rapidement les relevés de compteurs lors de leurs rondes d'inspection.

## 🚀 Fonctionnalités

- **Saisie rapide** : Formulaire optimisé pour saisir les relevés à la chaîne sans avoir à resélectionner l'opérateur ou le type de ronde à chaque fois.
- **Gestion des opérateurs** : Ajouter, modifier ou supprimer des opérateurs avec vérification d'unicité du matricule.
- **Gestion des Types de Rondes** : Prise en compte des différentes tournées (Relevé journalier, Relevé de quart, etc.).
- **Mode 100% Hors-ligne** : Toutes les données saisies sont sauvegardées directement dans le navigateur (`localStorage`). Aucune connexion internet n'est requise.
- **Horodatage automatique** : La date et l'heure du système sont automatiquement jointes au relevé de manière transparente.

## 🛠️ Technologies

- HTML5
- CSS3
- JavaScript (Vanilla / Aucun framework)

## 📋 Installation & Utilisation

1. **Cloner ou télécharger** ce dépôt sur votre machine.
2. **Lancer l'application** : Ouvrez simplement le fichier `index.html` dans n'importe quel navigateur web moderne (Chrome, Firefox, Safari, Edge).
3. **Saisie** :
   - Sélectionnez un Opérateur.
   - Sélectionnez un Type de ronde.
   - Choisissez le Compteur lu.
   - Entrez la Valeur lue.
   - Cliquez sur **Valider**.
4. Les données sont persistées sur votre navigateur même si vous le fermez.

## 📁 Structure du Projet

- `index.html` : L'interface utilisateur de l'application (le formulaire).
- `styles.css` : La feuille de style gérant le design responsive et visuel de l'app.
- `scripts.js` : Toute la logique métier, la gestion du formulaire et les lectures/écritures dans le `localStorage`.
- `contexte.md` : Résumé de l'état actuel du projet et des structures de données (utile pour intégrer de nouveaux développeurs ou des assistants IA).
- `documentation.md` : Documentation détaillée expliquant les algorithmes, avec diagrammes de flux et guide de maintenance.

## 🔄 Historique

Initialement, cette application calculait la consommation en comparant la nouvelle valeur saisie avec l'ancienne, et intégrait un affichage du dernier relevé. Ce système a été refondu pour se concentrer sur une collecte de données brute (`rondeDB`), horodatée, avec la notion de typologie de ronde (`type_ronde`), facilitant ainsi de futures exploitations par des systèmes tiers.
