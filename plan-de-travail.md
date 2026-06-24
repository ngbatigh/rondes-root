a ce stade j'aimerais ajouter une fonctionnalite pour la selection du compteur par lecture du qr code scanné a partir du telephone android. les id_compteur sont transforme en code qr colle au compteur. lors de la ronde, au lieu de selectionne le compteur dans une liste, l'operateur scanne le code qr du compteur et le champ compteur sur le formulaire se rempli automatiquement. pour ce faire, ajouter une icone juste en haut du select compteur qui va se charger de lancer le processus de scan code qr recupere l'id_compteur, actualise le champ compteur. ce champ reste inactif durant par defaut et ne devien actif que sur double click avec confirmation la dessus et ceci seulement pour une seule validation de saisie et redevien inactif

## Plan simplifié : Scan QR Code pour sélection de compteur

### Objectif

Permettre à l'opérateur de scanner un QR Code pour remplir automatiquement le champ "Compteur" du formulaire.

### Modifications à faire

#### 1. `index.html`

- Ajouter la librairie `html5-qrcode` dans le `<head>`
- Ajouter un bouton **📷 Scanner QR Code** au-dessus du select compteur
- Ajouter un élément caché pour le flux caméra

#### 2. `scripts.js`

- Ajouter la logique de scan QR Code avec `Html5Qrcode`
- Lire l'`id_compteur` scanné et remplir le select compteur
- Gérer la caméra arrière (facingMode: environment)

#### 3. `styles.css`

- Style du bouton scan
- Style de l'écran plein écran pour le scan

---

**Phase 1 uniquement** : Mise en place du scan QR Code, sans mécanisme de verrouillage/déverrouillage du champ compteur.

Voulez-vous que je bascule en **ACT MODE** pour implémenter cela ?
