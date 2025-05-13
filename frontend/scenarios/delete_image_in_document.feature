#language: fr

Fonctionnalité: Supprimer à l'intérieur d'un document une image

  Scénario:

    Soit le document contenant l'image "graphique" affiché comme document principal
    Et une session active avec mon compte
    Quand j'essaie de supprimer l'image "<IMAGE DESCRIPTION>"
    Alors je ne vois plus l'image "<IMAGE DESCRIPTION>" dans la glose
    Et je vois l'image "graphique" dans la glose