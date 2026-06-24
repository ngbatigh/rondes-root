# Rapport d'Audit - Gestion des Structures de Données

## 1. Vue d'ensemble du projet

**Application web** : Gestion des Relevés de Compteurs (Rondes)  
**Architecture** : Frontend uniquement (HTML5, CSS3, JavaScript Vanilla)  
**Persistance** : `localStorage` du navigateur  
**Portée** : Application hors-ligne sans serveur distant

---

## 2. Inventaire des structures de données

### 2.1 Variables globales en mémoire

| Variable        | Type                 | Description                                    |
| --------------- | -------------------- | ---------------------------------------------- |
| `rondeDB`       | Objet (dictionnaire) | Relevés horodatés par `id_compteur`            |
| `type_ronde`    | Tableau d'objets     | Types de rondes (journalier, quart, etc.)      |
| `tabCompteurs`  | Tableau d'objets     | 9 compteurs initialisés                        |
| `tabOperateurs` | Tableau d'objets     | Opérateurs (identifiants, noms, mots de passe) |
| `sections`      | Tableau de chaînes   | 9 sections géographiques/fonctionnelles        |
| `famille_list`  | Tableau de chaînes   | 7 familles de compteurs                        |
| `groupe1_list`  | Tableau de chaînes   | Groupes A-I                                    |
| `groupe2_list`  | Tableau de chaînes   | Groupes 1-9                                    |

### 2.2 Clés localStorage

| Clé             | Type         | Description          |
| --------------- | ------------ | -------------------- |
| `rondeDB`       | Objet JSON   | Relevés par compteur |
| `type_ronde`    | Tableau JSON | Types de rondes      |
| `tabCompteurs`  | Tableau JSON | Compteurs            |
| `tabOperateurs` | Tableau JSON | Opérateurs           |
| `sections`      | Tableau JSON | Sections             |
| `famille_list`  | Tableau JSON | Familles             |
| `groupe1_list`  | Tableau JSON | Groupes 1            |
| `groupe2_list`  | Tableau JSON | Groupes 2            |

---

## 3. Initialisation

### 3.1 Constantes par défaut (lignes 29-50)

Les constantes `sections_default`, `famille_default`, `groupe1_default`, `groupe2_default` sont codées en dur dans `scripts.js` et servent de valeurs de référence pour le premier lancement.

### 3.2 Fonction `initDatabase()` (lignes 558-771)

**Déclenchée quand** : Aucune donnée persistée trouvée dans `localStorage`  
**Opérations** :

1. Réinitialise toutes les constantes (`sections`, `famille_list`, `groupe1_list`, `groupe2_list`) depuis les valeurs par défaut
2. Crée 2 types de rondes par défaut (journalier, quart)
3. Crée 9 compteurs codés en dur (3 familles × 3 unités)
4. Génère des relevés de test avec dates aléatoires (hier)
5. Ecrit systématiquement toutes les clés dans `localStorage`

**Problème identifié** :

- **Écrasement brutal** : Si une seule clé manque, toutes les données sont réinitialisées, y compris les relevés saisis par les utilisateurs.
- **Duplication** : Les 9 compteurs sont définis à la fois en dur (lignes 59-198) et dans `initDatabase()` (lignes 595-731).

### 3.3 Initialisation des opérateurs

Les opérateurs par défaut sont initialisés dans `initDatabase()` (lignes 576-598) et persistés dans `localStorage` via la clé `tabOperateurs`.

**Sécurité** : Les mots de passe sont stockés en clair dans `localStorage` (non hachés).

---

## 4. Chargement des données

### 4.1 Fonction `loadSavedData()` (lignes 1619-1659)

**Ordonnancement** :

1. Vérifie la présence de chaque clé `localStorage` individuellement
2. Si opérateurs absent → appelle `initOperateurs()`
3. Si TOUTES les clés présentes → parse JSON et restaure les variables
4. Sinon → appelle `initDatabase()` (réinitialisation complète)

**Nettoyage à la volée** (lignes 1643-1650) :

- Supprime la propriété `consommation` des relevés si elle existe (héritage ancienne logique métier)
- Ajoute `id_ronde: 0` si absent (rétrocompatibilité)

**Problème identifié** :

- **Condition trop stricte** : `if (hasSections && hasTypeRonde && hasTabCompteurs && hasRondeDB)` — la moindre clé manque déclenche une réinitialisation complète, y compris `tabOperateurs` qui pourrait avoir été modifié.

### 4.2 Points d'appel

- `init()` (ligne 1665) → `loadSavedData()` → `remplirOperateursSelect()` → setup des événements

---

## 5. Opérations de modification

### 5.1 Gestion des opérateurs

| Opération | Fonction                         | Localisation   |
| --------- | -------------------------------- | -------------- |
| Ajouter   | `ajouterOperateur()`             | Lignes 299-350 |
| Modifier  | `modifierOperateur()`            | Lignes 380-434 |
| Supprimer | `supprimerOperateursSelection()` | Lignes 466-501 |

**Intégrité référentielle** : Aucune vérification de l'utilisation de `id_operateur` dans `rondeDB` avant suppression. Si un opérateur est supprimé, les relevés existants conservent son ancien identifiant, créant des références orphelines.

**Modification d'identifiant** : `modifierOperateur()` permet de changer `id_operateur` sans mettre à jour les relevés associés dans `rondeDB`.

### 5.2 Gestion des types de rondes

| Opération | Fonction                     | Localisation     |
| --------- | ---------------------------- | ---------------- |
| Ajouter   | `ajouterRonde()`             | Lignes 1006-1038 |
| Supprimer | `supprimerRondesSelection()` | Lignes 1040-1063 |

**Auto-incrémentation** : `id_ronde` = max existant + 1 (ligne 1020-1021)

**Intégrité** : Aucune vérification de l'utilisation de `id_ronde` dans `rondeDB` avant suppression. Les relevés existants conservent l'ancien identifiant.

### 5.3 Gestion des compteurs

| Opération          | Fonction                    | Localisation     |
| ------------------ | --------------------------- | ---------------- |
| Activer/Désactiver | `enregistrerActiver()`      | Lignes 1182-1210 |
| Modifier           | `enregistrerModification()` | Lignes 1261-1302 |
| Cloner             | `executerClonage()`         | Lignes 1336-1373 |
| Créer              | `creerCompteur()`           | Lignes 1376-1430 |

**Champs modifiables** : Tous les champs y compris `id_compteur`.

**Problèmes identifiés** :

- **Modification d'ID** : `enregistrerModification()` permet de changer `id_compteur` sans mettre à jour les clés de `rondeDB`. Les relevés restent associés à l'ancien ID.
- **Clonage** : Réinitialise `enservice_compteur`, `visible_compteur`, `actif_compteur` mais conserve tous les autres champs (y compris `debut_compteur` et `range_compteur`), ce qui peut créer des doublons de valeurs initiales.

### 5.4 Gestion des relevés

| Opération   | Fonction       | Localisation   |
| ----------- | -------------- | -------------- |
| Sauvegarder | `saveReleve()` | Lignes 802-822 |

**Horodatage** : Date et heure système automatiques (`new Date()`)

**Insertion** : Ajout simple en fin de tableau (`push`) — pas de limite de taille, pas de pagination.

---

## 6. Stockage

### 6.1 Mécanisme

- **API** : `localStorage` (navigateur)
- **Format** : Sérialisation JSON (`JSON.stringify()` / `JSON.parse()`)
- **Taille limite** : ~5-10 MB selon le navigateur
- **Persistance** : Supprimée par l'utilisateur ou en navigation privée

### 6.2 Synchronisation mémoire/persistance

Chaque modification appelle systématiquement `localStorage.setItem()` :

- `ajouterOperateur()` → ligne 339
- `modifierOperateur()` → ligne 426
- `supprimerOperateursSelection()` → ligne 490
- `ajouterRonde()` → ligne 1030
- `supprimerRondesSelection()` → ligne 1059
- `enregistrerActiver()` → ligne 1206
- `enregistrerModification()` → ligne 1298
- `executerClonage()` → ligne 1365
- `creerCompteur()` → ligne 1411
- `saveReleve()` → ligne 821
- `initDatabase()` → lignes 570-770

**Observation** : Bonne pratique de persistance systématique, mais pas de mécanisme de transaction ou de sauvegarde intermédiaire.

---

## 7. Problèmes identifiés et recommandations

### 7.1 Problèmes critiques

| #   | Problème                                                    | Impact                       | Localisation                                                   |
| --- | ----------------------------------------------------------- | ---------------------------- | -------------------------------------------------------------- |
| 1   | Réinitialisation complète si une clé manque                 | Perte de données utilisateur | `loadSavedData()` ligne 1633                                   |
| 2   | Modification d'`id_compteur` sans mise à jour de `rondeDB`  | Relevés orphelins            | `enregistrerModification()` ligne 1277                         |
| 3   | Modification d'`id_operateur` sans mise à jour de `rondeDB` | Relevés orphelins            | `modifierOperateur()` ligne 417                                |
| 4   | Suppression d'opérateur/de ronde sans vérification d'usage  | Références cassées           | `supprimerOperateursSelection()`, `supprimerRondesSelection()` |
| 5   | Mots de passe en clair                                      | Faille de sécurité           | `initOperateurs()` ligne 248                                   |

### 7.2 Problèmes mineurs

| #   | Problème                                                              | Impact             | Localisation                          |
| --- | --------------------------------------------------------------------- | ------------------ | ------------------------------------- |
| 6   | Duplication des 9 compteurs (définis en dur ET dans `initDatabase()`) | Maintenance        | `scripts.js` lignes 59-198 et 595-731 |
| 7   | `delai` stocké en chaîne, pas en nombre                               | Incohérence type   | `type_ronde` (ligne 13)               |
| 8   | `enservice_compteur` format ISO vs datetime MySQL                     | Incohérence format | SQL vs JS                             |
| 9   | Pas de validation de plage pour `valeur` vs `range_compteur`          | Saisie erronée     | Formulaire de relevé                  |
| 10  | Pas de limite de taille pour `rondeDB`                                | Risque performance | `saveReleve()`                        |

### 7.3 Recommandations

1. **Sauvegarde incrémentale** : Vérifier chaque clé individuellement et ne réinitialiser que celle qui manque.
2. **Cascade lors des modifications d'ID** : Mettre à jour toutes les occurrences dans `rondeDB` lors d'un changement d'`id_compteur` ou `id_operateur`.
3. **Contraintes d'intégrité** : Empêcher la suppression d'un opérateur/d'une ronde s'il est référencé dans `rondeDB`.
4. **Hachage des mots de passe** : Utiliser bcrypt ou Web Crypto API.
5. **Supprimer la duplication** : Ne conserver que la source de vérité (JS ou SQL, pas les deux).
6. **Types cohérents** : Stocker `delai` comme nombre.
7. **Validation métier** : Vérifier `valeur` dans `[debut_compteur, debut_compteur + range_compteur]`.
8. **Documentation du schéma** : Formaliser le schéma JSON et les contraintes dans le code.

---

## 8. Conclusion

La gestion des structures de données est fonctionnelle mais présente des risques significatifs de perte de données et d'intégrité référentielle. Les modifications d'identifiants (compteurs, opérateurs) sans mise à jour cascadée sont le problème le plus critique. La réinitialisation conditionnelle trop large représente un risque majeur pour la persistance des relevés saisis.

**Priorité d'action** :

1. Séparer la logique de réinitialisation par clé (P1)
2. Implémenter les cascades sur modification d'ID (P1)
3. Ajouter les contraintes d'intégrité référentielle (P2)
4. Hasher les mots de passe (P2)
5. Supprimer la duplication SQL/JS (P3)
