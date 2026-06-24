# Contexte du Projet : Gestion des Relevés de Compteurs (Rondes)

## 1. Description Générale

Ce projet est une application web simple et légère (Frontend uniquement) destinée à enregistrer les relevés de différents compteurs (Eau, Électricité, Température, etc.) lors de passages réguliers appelés "Rondes".
Elle est conçue pour être utilisée hors-ligne ou sans serveur distant, les données étant stockées directement dans le navigateur via l'API `localStorage`.

## 2. Interface utilisateur

### Menu latéral (sidebar)

L'application dispose d'un menu latéral coulissant accessible via un bouton hamburger **☰** en haut à gauche de l'en-tête. Il contient 6 options :

- **📋 Recap ronde** — Fonctionnalité à venir
- **👥 Gestion des opérateurs** — Fonctionnalité à venir
- **🔢 Gestion des compteurs** — ✅ Implémenté (4 sous-menus)
- **🔄 Gestion des Rondes** — ✅ Implémenté (2 sous-menus)
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
  - Introduction d'une **gestion dynamique des compteurs** avec 9 compteurs initialisés depuis un fichier SQL.

## 4. Architecture des Données

Les données sont structurées en plusieurs entités principales en mémoire et dans le `localStorage` :

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

### B. `tabCompteurs`

Un tableau d'objets définissant tous les compteurs. 9 compteurs initialisés depuis le fichier `init-tab-compteurs.sql`.

Chaque compteur contient les champs :

- `id_compteur` (identifiant unique, format A/B/C-XXXX-XXXX-XXXX-XXXX)
- `nom_compteur`
- `unite_compteur`
- `debut_compteur` (valeur initiale)
- `range_compteur` (plage de valeurs)
- `section_compteur` (liste déroulante depuis constante `sections`)
- `famille_compteur` (liste déroulante depuis constante `familles`)
- `groupe1_compteur` (liste déroulante depuis constante `groupe1`)
- `groupe2_compteur` (liste déroulante depuis constante `groupe2`)
- `enservice_compteur` (date de mise en service, vide si inactif)
- `visible_compteur` (booléen)
- `actif_compteur` (booléen)
- `description_compteur`

### C. Constantes

4 constantes alimentent les listes déroulantes des formulaires :

- `sections` : 9 sections (Salle Des Machines, Embouteillage, Cave-Filtration-Siroperie, Brassage, Administration, Bloc Social, Traitement Eau Process, Traitement Eau Usees, Centre Logistique)
- `familles` : 7 familles (Eau, Energie, DDO, Vapeur, Pression, Temperature, Debit)
- `groupe1` : A, B, C, D, E, F, G, H, I
- `groupe2` : 1, 2, 3, 4, 5, 6, 7, 8, 9

### D. `rondeDB`

Un objet agissant comme un dictionnaire. Les clés sont les `id_compteur` (ex: "A-0000-0000-0000-0001") et les valeurs sont des tableaux contenant les relevés.

```json
{
  "A-0000-0000-0000-0001": [
    {
      "id_ronde": 0,
      "id_operateur": "Koffi",
      "id_compteur": "A-0000-0000-0000-0001",
      "valeur": 1250,
      "date": "2026-06-23",
      "heure": "06:30",
      "commentaire": ""
    }
  ]
}
```

## 5. Gestion des types de rondes

Depuis l'interface utilisateur (menu latéral → **🔄 Gestion des Rondes**) :

1. **Ajouter type de ronde** : formulaire avec Nom, Délai (min), Description + boutons ✅ Ajouter et ❌ Annuler
2. **Supprimer type de ronde** : liste avec cases à cocher + confirmation avant suppression
3. Les modifications sont sauvegardées dans `localStorage` et la liste déroulante du formulaire de relevé est mise à jour automatiquement
4. L'`id_ronde` est auto-incrémenté à partir du max existant

## 6. Gestion des compteurs

Depuis l'interface utilisateur (menu latéral → **🔢 Gestion des compteurs**) :

1. **✅ Activer compteur** : liste de tous les compteurs avec cases à cocher 👁️ Visible et ✅ Actif + bouton 💾 Enregistrer
2. **✏️ Modifier compteur** : sélection d'un compteur + formulaire pré-rempli avec tous les champs + listes déroulantes (section, famille, groupe1, groupe2) + cases à cocher (visible, actif)
3. **📋 Cloner compteur** : sélection du compteur parent + nouvel ID + aperçu JSON + bouton 📋 Cloner
4. **➕ Créer compteur** : formulaire complet avec tous les champs + listes déroulantes + cases à cocher (visible, actif cochées par défaut)

### Stockage localStorage

| Clé            | Contenu                        |
| -------------- | ------------------------------ |
| `sections`     | Tableau des sections           |
| `famille_list` | Tableau des familles           |
| `groupe1_list` | Tableau des groupes 1          |
| `groupe2_list` | Tableau des groupes 2          |
| `type_ronde`   | Tableau des types de rondes    |
| `tabCompteurs` | Tableau des 9 compteurs        |
| `rondeDB`      | Objet des relevés par compteur |

## 7. Objectif de ce fichier

Ce fichier `contexte.md` doit être fourni à l'IA lors des prochaines itérations ou partagé avec de nouveaux développeurs pour qu'ils comprennent instantanément le but de l'application, l'état de la base de données locale et les règles métiers actuelles (pas de calcul local, ajout automatique de la date/heure système, gestion dynamique des compteurs et des rondes).
