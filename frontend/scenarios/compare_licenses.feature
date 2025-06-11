#language: fr

Fonctionnalité: Comparer les licences de la source

Scénario: d'une traduction avec licences compatibles

    Soit "Les fées (Charles Perrault)" le document principal
    Et "Public domain" le nom de la licence du document principal
    Quand je consulte le contenu de "Víly (Charles Perrault)"
    Alors je vois que le code de la licence est "CC-BY-NC-ND"
    Et je ne peux pas lire "Licenses are not compatible"

Scénario: d'une traduction avec licences non compatibles

    Soit "Víly (Charles Perrault)" le document principal
    Et "CC-BY-NC-ND" le nom de la licence du document principal
    Quand je consulte le contenu de "Fairies (Charles Perrault)"
    Alors je vois que le code de la licence est "CC-BY-NC-ND"
    Et je peux lire "Licenses are not compatible"

Scénario: d'un commentaire avec licences non compatibles

    Soit "Entretien avec un responsable d'opération" le document principal
    Et "All rights reserved" le nom de la licence du document principal
    Quand je consulte le contenu de "Étiquetage de l'entretien"
    Alors je vois que le code de la licence est "CC-BY"
    Et je ne peux pas lire "Licenses are not compatible"

