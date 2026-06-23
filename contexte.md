# Contexte du Projet : Gestion des Relevés de Compteurs (Rondes)

## 1. Description Générale

Ce projet est une application web simple et légère (Frontend uniquement) destinée à enregistrer les relevés de différents compteurs (Eau, Électricité, DDO, Produit, Temp) lors de passages réguliers appelés "Rondes".
Elle est conçue pour être utilisée hors-ligne ou sans serveur distant, les données étant stockées directement dans le navigateur via l'API `localStorage`.

## 2. Choix Techniques et Évolutions

- **Technologies** : HTML5, CSS3, JavaScript (Vanilla). Aucun framework n'est utilisé.
- **Persistance** : `localStorage` du navigateur.
- **Évolution récente de la logique métier** :
  - Historiquement, l'application calculait la consommation en la comparant avec le dernier relevé stocké et bloquait la saisie si la nouvelle valeur était inférieure à la précédente.
  - **Cette logique a été retirée**. L'application se concentre désormais sur la **collecte brute** de données horodatées, associées à un type de ronde spécifique.
  - Introduction des **Types de Rondes** pour catégoriser les saisies (ex: relevé journalier vs relevé de quart).

## 3. Architecture des Données

Les données sont structurées en trois entités principales en mémoire et dans le `localStorage` :

### A. `tabOperateurs`

Un tableau d'objets définissant les opérateurs.

```json
[
  {
    "id_operateur": "966",
    "nom_operateur": "NADJOMBE",
    "prenom_operateur": "Gbati",
    "fonction_operateur": "Chef Service",
    "nomuser_operateur": "gbati",
    "motdepasse_operateur": "admin"
  }
]
```

### B. `type_ronde`

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

### C. `rondeDB` (anciennement `relevesDB`)

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

## 4. Objectif de ce fichier

Ce fichier `contexte.md` doit être fourni à l'IA lors des prochaines itérations ou partagé avec de nouveaux développeurs pour qu'ils comprennent instantanément le but de l'application, l'état de la base de données locale et les règles métiers actuelles (pas de calcul local, ajout automatique de la date/heure système).
