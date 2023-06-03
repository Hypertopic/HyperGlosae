#language: fr

Fonctionnalité: Naviguer vers le document suivant d'une collection

Scénario: 

    Soit je suis sur téléphone
    Et "Parcours : Visite de l'Eglise St-Jean-au-Marché, Troyes" le document principal
    Et le texte "Parcours: 1/3" visible dans la navbar
    Et "Plan : Eglise St-Jean-au-Marché, Troyes" le document actuel dans la collection
    Quand je navigue vers le document suivant
    Alors "Photographie : vitrail, baie 18, Eglise St-Jean-au-Marché, Troyes, Jugement de Salomon" est le document affiché à l'écran
    Et le texte "Parcours: 2/3" est visible dans la navbar