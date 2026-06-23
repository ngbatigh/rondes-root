# Contexte du Projet : Gestion des Relevés de Compteurs (Rondes)

## 1. Description Générale

Ce projet est une application web simple et légère (Frontend uniquement) destinée à enregistrer les relevés de différents compteurs (Eau, Électricité, DDO, Produit, Temp) lors de passages réguliers appelés "Rondes".
Elle est conçue pour être utilisée hors-ligne ou sans serveur distant, les données étant stockées directement dans le navigateur via l'API `localStorage`.

## 2. Interface utilisateur

### Menu latéral (sidebar)

L'application dispose d'un menu latéral coulissant accessible via un bouton hamburger **☰** en haut à gauche de l'en-tête. Il contient 6 options :

- **📋 Recap ronde** — Fonctionnalité à venir
- **👥 Gestion des opérateurs** — Fonctionnalité à venir
- **🔢 Gestion des compteurs** — Fonctionnalité à venir
- **🔄 Gestion des Rondes** — ✅ Implémenté (voir section 4)
- **📈 Tableau de bord** — Fonctionnalité à venir
- **📑 Tableur** — Fonctionnalité à venir

### Bouton retour ←

Chaque sous-panneau dispose d'un bouton retour **←** en haut à gauche pour revenir à l'écran précédent.

## 3. Choix Techniques et Évolutions

- **Technologies** : HTML5, CSS3, JavaScript (Vanilla). Aucun framework n'est utilisé.
- **Persistance** : `localStorage` du navigateur.
- **Évolution récente de la logique métier** :
  - Historiquement, l'application calculait la consommation en la comparant avec le dernier relevé stocké et bloquait la saisie si la nouvelle valeur était inférieure à la précédente.
  - **Cette logique a été retirée**. L'application se concentre désormais sur la **collecte brute** de données horodatées, associées à un type de ronde spécifique.
  - Introduction des **Types de Rondes** pour catégoriser les saisies (ex: relevé journalier vs relevé de quart).

## 4. Gestion des types de rondes

Depuis l'interface utilisateur (menu latéral → **🔄 Gestion des Rondes**) :

1. **Ajouter type de ronde** : formulaire avec Nom, Délai (min), Description + boutons ✅ Ajouter et ❌ Annuler
2. **Supprimer type de ronde** : liste avec cases à cocher + confirmation avant suppression
3. Les modifications sont sauvegardées dans `localStorage` et la liste déroulante du formulaire de relevé est mise à jour automatiquement
4. L'`id_ronde` est auto-incrémenté à partir du max existant

### Gestion des compteurs (état actuel)

Les compteurs sont **figés** — définis en dur dans le code (5 compteurs : eau, electricite, ddo, produit, temp). Il n'existe **aucun panneau d'administration** pour les gérer dynamiquement.

### Gestion des opérateurs (état actuel)

Les opérateurs sont **figés** — définis en dur dans le HTML (Koffi, Gbati, Abalo). Il n'existe **aucun panneau d'administration** pour les gérer dynamiquement.

## 5. Architecture des Données

Les données sont structurées en deux entités principales en mémoire et dans le `localStorage` :

### A. `type_ronde`

Un tableau d'objets définissant les types de rondes possibles.

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

### B. `rondeDB` (anciennement `relevesDB`)

Un objet agissant comme un dictionnaire. Les clés sont les identifiants des compteurs (`eau`, `electricite`, `ddo`, etc.) et les valeurs sont des tableaux contenant les relevés.

```json
{
  "eau": [
    {
      "id_ronde": 0,
      "id_operateur": "Koffi",
      "id_compteur": "eau",
      "valeur": 1250,
      "date": "2026-06-23",
      "heure": "06:30",
      "commentaire": ""
    }
  ]
}
```

## 6. Objectif de ce fichier

Ce fichier `contexte.md` doit être fourni à l'IA lors des prochaines itérations ou partagé avec de nouveaux développeurs pour qu'ils comprennent instantanément le but de l'application, l'état de la base de données locale et les règles métiers actuelles (pas de calcul local, ajout automatique de la date/heure système).
