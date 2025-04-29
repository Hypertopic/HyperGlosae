#language: fr

Fonctionnalité: Supprimer à l'intérieur d'un document une image

  Scénario: qui existe

    Soit un document existant affiché comme document principal
    Et contient l'image "diagramme de classe"
    Et une session active avec mon compte
    Quand j'essaie de supprimer l'image "diagramme de classe"
    Alors je ne vois plus l'image "diagramme de classe" dans la glose
  
  Scénario: qui n'existe pas

    Soit un document existant affiché comme document principal
    Et contient l'image "diagramme de classe" 
    Et contient l'image "graphique"
    Et une session active avec mon compte
    Quand j'essaie de supprimer l'image "diagramme de classe"
    Alors je ne vois plus l'image "diagramme de classe" dans la glose
    Et je vois toujours l'image "graphique" dans la glose



  
