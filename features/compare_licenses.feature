#language: fr

Fonctionnalité: Comparer les licences de la source

Scénario: d'une traduction avec licences compatibles

    Soit "Les fées (Charles Perrault)" le document principal
    Et "Víly (Charles Perrault)" une des gloses
    Et je vois que la licence du document principal est "Public domain"
    Quand je clique sur la glose
    Alors je vois que l'image de la licence de la glose est "CC-BY-NC-ND"
    Et je ne peux pas lire "Licenses are not compatible"

Scénario: d'une traduction avec licences non compatibles

    Soit "Víly (Charles Perrault)" le document principal
    Et "Fairies (Charles Perrault)" une des gloses
    Et je vois que l'image de la licence du document principal est "CC-BY-NC-ND"
    Quand je clique sur la glose
    Alors je vois que l'image de la licence de la glose est "CC-BY-NC-ND"
    Et je peux lire "Licenses are not compatible"

Scénario: d'un commentaire avec licences non compatibles

    Soit "Entretien avec un responsable d'opération" le document principal
    Et "Étiquetage de l'entretien" une des gloses
    Et je vois que la licence du document principal est "All rights reserved"
    Quand je clique sur la glose
    Alors je vois que l'image de la licence de la glose est "CC-BY"
    Et je ne peux pas lire "Licenses are not compatible"