## Plan d'action pour implémenter les recommandations

### 📊 Vue d'ensemble

Le rapport identifie 8 recommandations réparties en 3 niveaux de priorité :

- **P1 (Critique)** : 2 recommandations touchant l'intégrité des données
- **P2 (Important)** : 2 recommandations sur la sécurité et l'intégrité référentielle
- **P3 (Amélioration)** : 4 recommandations techniques et de maintenabilité

---

### 🎯 Plan d'exécution proposé

#### Phase 1 — Stabilisation des données (P1)

**1.1 Sauvegarde incrémentale (`loadSavedData()`)**

- **Objectif** : Éviter la réinitialisation complète quand une clé manque
- **Approche** : Vérifier chaque clé individuellement et ne réinitialiser que celle qui est absente
- **Fichier** : `scripts.js`, fonction `loadSavedData()` (ligne ~1619)
- **Complexité** : Moyenne
- **Risque** : Faible (améliore le comportement existant)

**1.2 Cascades lors des modifications d'ID**

- **Objectif** : Mettre à jour `rondeDB` quand un `id_compteur` ou `id_operateur` change
- **Approche** :
  - Dans `enregistrerModification()` : après changement d'`id_compteur`, scanner toutes les clés de `rondeDB` et remplacer l'ancien ID par le nouveau
  - Dans `modifierOperateur()` : après changement d'`id_operateur`, scanner tous les relevés de `rondeDB` et remplacer l'ancien ID
- **Fichier** : `scripts.js`, fonctions `enregistrerModification()` (ligne ~1261) et `modifierOperateur()` (ligne ~380)
- **Complexité** : Moyenne
- **Risque** : Moyen (nécessite des tests sur données existantes)

#### Phase 2 — Sécurité et intégrité (P2)

**2.1 Contraintes d'intégrité référentielle**

- **Objectif** : Empêcher suppression/utilisations d'IDs référencés
- **Approche** :
  - Dans `supprimerOperateursSelection()` : vérifier si l'`id_operateur` existe dans `rondeDB` avant suppression
  - Dans `supprimerRondesSelection()` : vérifier si l'`id_ronde` existe dans `rondeDB` avant suppression
  - Afficher un message d'erreur si références trouvées
- **Fichier** : `scripts.js`, fonctions de suppression
- **Complexité** : Faible
- **Risque** : Faible

**2.2 Hachage des mots de passe**

- **Objectif** : Ne plus stocker les mots de passe en clair
- **Approche** :
  - Utiliser une fonction de hachage simple (ex: SHA-256 via `crypto.subtle.digest()`)
  - Hasher lors de la création/modification d'opérateur
  - Comparer les hachages lors de l'authentification
  - **Note** : Nécessite aussi d'ajouter un mécanisme d'authentification (login) qui n'existe pas actuellement
- **Fichier** : `scripts.js`, fonctions de gestion des opérateurs + nouveau module d'auth
- **Complexité** : Élevée
- **Risque** : Élevé (impacte l'authentification, fonctionnalité non existante à créer)

#### Phase 3 — Qualité et maintenabilité (P3)

**3.1 Supprimer la duplication SQL/JS**

- **Objectif** : Une seule source de vérité pour les compteurs
- **Approche** : Supprimer la définition en dur des 9 compteurs dans `scripts.js` (lignes 59-198). Garder uniquement `initDatabase()` comme source.
- **Fichier** : `scripts.js`
- **Complexité** : Faible
- **Risque** : Faible

**3.2 Types cohérents (`delai`)**

- **Objectif** : Stocker `delai` comme nombre au lieu de chaîne
- **Approche** : `parseInt()` lors de l'ajout de ronde + correction des valeurs par défaut
- **Fichier** : `scripts.js`, `initDatabase()` et `ajouterRonde()`
- **Complexité** : Faible
- **Risque** : Faible

**3.3 Validation métier (`valeur` vs `range_compteur`)**

- **Objectif** : Empêcher la saisie de valeurs hors plage
- **Approche** : Dans `handleSubmit()`, vérifier que `valeurActuelle` est dans `[debut_compteur, debut_compteur + range_compteur]`
- **Fichier** : `scripts.js`, fonction `handleSubmit()` (ligne ~1590)
- **Complexité** : Faible
- **Risque** : Faible

**3.4 Documentation du schéma**

- **Objectif** : Formaliser les schémas JSON et contraintes
- **Approche** : Ajouter des commentaires JSDoc et créer un fichier `SCHEMA.md`
- **Fichier** : Nouveau `SCHEMA.md` + commentaires dans `scripts.js`
- **Complexité** : Faible
- **Risque** : Nul

---

### 📅 Planning suggéré

| Sprint       | Durée recommandée | Recommandations    | Livrable                               |
| ------------ | ----------------- | ------------------ | -------------------------------------- |
| **Sprint 1** | 1-2 jours         | 1.1, 2.1, 3.1, 3.2 | Réinitialisation sécurisée + intégrité |
| **Sprint 2** | 2-3 jours         | 1.2, 3.3           | Cascades ID + validation plage         |
| **Sprint 3** | 3-5 jours         | 2.2                | Hachage mots de passe (avec auth)      |
| **Sprint 4** | 1 jour            | 3.4                | Documentation                          |

---

### ⚠️ Points d'attention

1. **Tests obligatoires** : Les cascades (1.2) et la sauvegarde incrémentale (1.1) doivent être testées avec des données existantes
2. **Migration** : Pour le hachage (2.2), prévoir une migration des mots de passe existants (rehash au prochain login)
3. **Backwards compatibility** : Les modifications de `delai` (3.2) doivent gérer les anciennes valeurs en chaîne
4. **Impacts UX** : Les contraintes d'intégrité (2.1) peuvent bloquer des actions utilisateur — prévoir des messages explicites

---

Souhaitez-vous commencer par un sprint spécifique, ou préférez-vous que j'apporte des modifications à l'ordre/au contenu du plan ?
