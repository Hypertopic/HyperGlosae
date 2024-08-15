#language: fr

Fonctionnalité: Commentez ou adaptez à l'aide d'un document existant un document

Scénario: en un seul morceau

    Soit "Les fées (Charles Perrault)" le document principal
    Et une session active avec mon compte
    Et une glose intitulée "Glossaire" contenant :
        """
        "Il était une fois"
        : "Once upon a time" (eng)
        : "Bolo to raz" (svk)
        """
    Et je me focalise sur "Glossaire"
    Quand je réutilise "Fairies" comme glose
    Alors je peux lire "Once upon a time were a widow and her two daughters"

Scénario: en plusieurs morceaux

    Soit "Les fées (Charles Perrault)" le document principal
    Et une session active avec mon compte
    Et une glose intitulée "Glossaire" contenant :
        """
        "Il était une fois"
        : "Once upon a time" (eng)
        : "Bolo to raz" (svk)
        """
    Et je me focalise sur "Glossaire"
    Quand je réutilise "Víly" comme glose
    Alors je peux lire "Bola raz jedna vdova, ktorá mala dve dcéry"

