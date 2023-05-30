#language: fr

Fonctionnalité: Créer une collection à partir d'une image

Scénario: dans le cas d’une image dans une collection

    Soit "Photographie : vitrail, baie 113, Église Saint-Nizier, Troyes" le document principal
    Et une session active avec mon compte
    Quand je crée une collection à partir de ce document
    Alors la collection "<TITLE>" est une référence créée
