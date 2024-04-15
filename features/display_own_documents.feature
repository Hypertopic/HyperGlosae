# language: fr

Fonctionnalité: Retrouver dans sa bibliothèque

Scénario: ses propres documents

    Soit la liste des documents affichée
    Et le document intitulé "Script Buster Keaton" est affiché
    Et le document intitulé "Appréciation" n'est pas affiché
    Et le document intitulé "Mimes Buster Keaton" n'est pas affiché
    Quand je me connecte
    Alors je vois le document intitulé "Appréciation"
    Mais je ne vois pas le document intitulé "Mimes Buster Keaton"
    Et je ne vois pas le document intitulé "Script Buster Keaton"

