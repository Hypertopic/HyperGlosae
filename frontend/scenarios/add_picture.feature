#language: fr

Fonctionnalité: Ajouter une image à une glose

  Scénario: dont on est l'auteur

    Soit un document dont je suis l'auteur affiché comme glose
    Et une session active avec mon compte
    Quand j'essaie d'ajouter une image "architecture.png" à une glose
    Alors je vois l'image "architecture.png" dans la glose
    Et l'image a un texte alternatif "<IMAGE DESCRIPTION>"
