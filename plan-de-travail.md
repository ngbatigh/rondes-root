- s'inspirer des données dans init-tab-operateurs.sql pour créer une table avec les données exactes a initialiser en localStorage par la fonction d'initialisation.
- mettre a jour toutes les fonctions utilisant les données operateurs pour utiliser la nouvelle table
- dans le menu gestion des operateurs creer 3 sous menus ajouter modifier et suprimer des operateurs
- s'assurer avant tout ajout d'operateur que l'id_operateur saisi sera unique

## Plan mis à jour : Gestion des opérateurs

### Données SQL à intégrer

Le fichier `init-tab-operateurs.sql` contient 3 opérateurs :

| id_operateur | nom_operateur | prenom_operateur | fonction_operateur | nomuser_operateur | motdepasse_operateur |
| ------------ | ------------- | ---------------- | ------------------ | ----------------- | -------------------- |
| 966          | NADJOMBE      | Gbati            | Chef Service       | gbati             | admin                |
| 877          | KPAKPA        | Tam              | Machiniste         | (vide)            | 123456               |
| 935          | TSOGBE        | Alain            | Chef d'Equipe SDM  | alain             | 123456               |

### Plan en 3 étapes

#### Étape 1 : Créer la table `tabOperateurs` dans `scripts.js`

- Ajouter une variable globale `tabOperateurs` avec les 3 opérateurs du SQL
- Champs : `id_operateur`, `nom_operateur`, `prenom_operateur`, `fonction_operateur`, `nomuser_operateur`, `motdepasse_operateur`
- Mettre à jour `initDatabase()` pour initialiser `tabOperateurs` et sauvegarder dans `localStorage`
- Mettre à jour `loadSavedData()` pour charger `tabOperateurs` depuis `localStorage`
- Ajouter la clé `tabOperateurs` dans la vérification des clés localStorage

#### Étape 2 : Mettre à jour les fonctions utilisant les opérateurs

- **Formulaire de relevé** : Remplacer le `<select id="operateur">` statique par un select dynamique alimenté par `tabOperateurs` (affiché comme `prenom_operateur nom_operateur`)
- **`remplirOperateursSelect()`** : Nouvelle fonction pour remplir le select des opérateurs
- **`ajouterOperateur()`** : Nouvelle fonction pour ajouter un opérateur
- **`modifierOperateur()`** : Nouvelle fonction pour modifier un opérateur
- **`supprimerOperateurs()`** : Nouvelle fonction pour supprimer un ou plusieurs opérateurs

#### Étape 3 : Créer le menu "Gestion des opérateurs" avec 3 sous-menus

- **➕ Ajouter opérateur** : Formulaire avec tous les champs + **vérification unicité de `id_operateur`** avant ajout + boutons ✅ Ajouter et ❌ Annuler
- **✏️ Modifier opérateur** : Liste déroulante + formulaire pré-rempli + **vérification unicité de `id_operateur`** si modifié + boutons 💾 Enregistrer et ❌ Annuler
- **🗑️ Supprimer opérateur** : Liste avec cases à cocher + confirmation avant suppression

### Vérification unicité de `id_operateur`

Avant tout ajout ou modification :

1. Vérifier si `id_operateur` existe déjà dans `tabOperateurs`
2. Si exists → afficher un message d'erreur "Cet ID existe déjà" et bloquer l'opération
3. Si n'existe pas → procéder à l'ajout/modification

Cette vérification s'applique aussi bien pour l'ajout que pour la modification (sauf si l'utilisateur ne modifie pas l'ID).

### Fichiers à modifier

- **`scripts.js`** : Ajouter `tabOperateurs`, les fonctions CRUD, mettre à jour `initDatabase()` et `loadSavedData()`
- **`index.html`** : Remplacer le `<select id="operateur">` statique par un select dynamique + ajouter les 3 panneaux de gestion des opérateurs
- **`styles.css`** : Réutiliser les classes existantes

---

Ce plan vous convient-il ? Si oui, basculez en **ACT MODE** pour que je l'implémente.
