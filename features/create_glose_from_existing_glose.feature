#language: fr

Fonctionnalité: Réutiliser un document

Scénario: pour commenter ou adapter un document en un seul morceau

    Soit "Les fées (Charles Perrault)" le document principal
    Et une session active avec mon compte
    Et une glose intitulée "Glossaire" contenant :
        """
        "Il était une fois"
        : "Once upon a time" (eng)
        : "Bolo to raz" (svk)
        """
    Et je me focalise sur "Glossaire"
    Quand je réutilise "Fairies" comme glose de type "Commentary"
    Alors je peux lire "Once upon a time were a widow and her two daughters"

Scénario: pour commenter ou adapter un document en plusieurs morceaux

    Soit "Les fées (Charles Perrault)" le document principal
    Et une session active avec mon compte
    Et une glose intitulée "Glossaire" contenant :
        """
        "Il était une fois"
        : "Once upon a time" (eng)
        : "Bolo to raz" (svk)
        """
    Et je me focalise sur "Glossaire"
    Quand je réutilise "Víly" comme glose de type "Commentary"
    Alors je peux lire "Bola raz jedna vdova, ktorá mala dve dcéry"

Scénario: pour citer un document en un seul morceau

    Soit un document dont je suis l'auteur intitulé "Exposition virtuelle" et contenant :
       """
       Voici mes tableaux préférés...
       """
    Et "16e prix - Catégorie 10-13 ans, Ukraine (Yelena SOROCHINSKAYA),2019" le document principal
    Et une session active avec mon compte
    Quand je réutilise "Exposition virtuelle" comme glose de type "Quotation"
    Alors je peux lire "Voici mes tableaux préférés"
    Et je vois l'image "2019_10-13_16_UKR_R_A" dans la glose

