#language: fr

Fonctionnalité: Ajouter une image à une glose

  Scénario: dont on est l'auteur

    Soit un document dont je suis l'auteur affiché comme glose
    Et une session active avec mon compte
    Quand j'essaie d'ajouter une image "#1architecture.png" à une glose
    Alors je vois l'image "#1architecture.png" dans la glose
    Et l'image a un texte alternatif "<IMAGE DESCRIPTION>"

  Scénario: avec un fichier qui n'est pas une image

    Soit un document dont je suis l'auteur affiché comme glose
    Et une session active avec mon compte
    Quand j'essaie d'ajouter une image "samples/hyperglosae/cinema_script.json" à une glose
    Alors je peux lire "Please choose an image file (png,jpg,jpeg...)."
    Et je ne vois pas "cinema_script.json"

