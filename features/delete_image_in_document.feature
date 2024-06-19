#language: fr

Fonctionnalité: Supprimer une image d'une glose

  Scénario: dont on est l'auteur

    Soit un document dont je suis l'auteur affiché comme glose
    Et une session active avec mon compte
    Et une image "architecture.png" dans une glose
    Quand j'essaye de supprimer l'image "architecture.png" d'une glose
    Alors je ne vois pas l'image "architecture.png"
    