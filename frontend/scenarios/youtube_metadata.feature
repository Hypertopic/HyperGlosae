#language: fr

Fonctionnalité: Récupérer les métadonnées YouTube à l'insertion d'une vidéo

  Scénario: Métadonnées YouTube récupérées automatiquement

    Soit un document existant affiché comme document principal
    Et avec un document reconnaissable dont je suis l'auteur affiché comme glose
    Et une session active avec mon compte
    Quand j'ajoute une vidéo YouTube dans la glose
    Alors les métadonnées YouTube sont affichées dans la glose
