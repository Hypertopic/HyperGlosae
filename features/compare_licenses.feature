#language: fr

Fonctionnalité: Comparer les licences pour les documents

Scénario: de traduction avec licences compatible

    Soit "Les fées (Charles Perrault)" le document principal
    Et "Víly (Charles Perrault)" une des gloses
    Quand je clique sur la glose
    Alors je ne peux pas lire "Licenses are not compatible"

Scénario: de traduction avec licences non compatible

    Soit "Víly (Charles Perrault)" le document principal
    Et "Fairies" une des gloses
    Quand je clique sur la glose
    Alors je peux lire "Licenses are not compatible"

Scénario: de non traduction avec licences non compatible

    Soit "Entretien avec un responsable d'opération" le document principal
    Et "Étiquetage de l'entretien" une des gloses
    Quand je clique sur la glose
    Alors je ne peux pas lire "Licenses are not compatible"