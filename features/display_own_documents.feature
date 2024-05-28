# language: fr

Fonctionnalité: Retrouver dans sa bibliothèque

Scénario: ses propres documents

    Soit la liste des documents affichée
    Et le document intitulé "Script Buster Keaton" est affiché
    Et le document intitulé "Treignes, le 8 septembre 2012 (Christophe" n'est pas affiché
    Et le document intitulé "Entretien avec un responsable d'opération (Diane" n'est pas affiché
    Quand Christophe se connecte
    Alors le document intitulé "Treignes, le 8 septembre 2012 (Christophe" est affiché
    Mais le document intitulé "Entretien avec un responsable d'opération (Diane" n'est pas affiché
    Et le document intitulé "Script Buster Keaton" n'est pas affiché

Scénario: ses documents en favoris

    Soit la liste des documents affichée
    Et le document intitulé "Étiquetage de l'entretien" n'est pas affiché
    Quand Christophe se connecte
    Alors le document intitulé "Étiquetage de l'entretien" est affiché

