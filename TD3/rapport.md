# Rapport de TD3 - Introduction au JavaScript

  ## Points clés de la séance

  ### 1. Le modèle Événement  État  Rendu
  Le JavaScript repose sur un cycle mental précis pour créer de l'interactivité :
  1.  **Événement :** L'utilisateur interagit avec la page
  2.  **État :** Le JavaScript détecte et change l'état de l'application
  3.  **Rendu :** Cette modification d'état déclenche une mise à jour visuelle via le CSS

  **Exemple :** Une popup
  *   **Événement :** L'utilisateur clique sur "Ouvrir".
  *   **État :** La classe `.is-open` est ajoutée au conteneur de la modale.
  *   **Rendu :** Le CSS applique `display: flex` et un fond semi-transparent, affichant la popup à l'écran.

  ### 2. `classList.toggle`
  `classList.toggle` est le lien  entre le JS et le CSS
  *   Le JS ne gère pas directement le visuel, il gère la logique : Est-ce que la classe est
  là ? -> Ajoute-la
  *   Le CSS gère le style : Si la classe est là, fais ceci.

Aucune IA vu que j'etais absent.
