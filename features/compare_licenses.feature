#language: fr

Fonctionnalité: Comparer les licences des documents

Scénario: entre la source et la glose

    Soit un document dont je suis l'auteur affiché comme glose
    Et une session active avec mon compte
    Quand j'essaie de remplacer les métadonnées de la glose par :
        """
        dc_title: Comparer licences
        dc_creator: Alice Liddell
        dc_issued: 1932
        dc_license: https://creativecommons.org/licenses/by-sa/4.0/
        """
    Alors je peux lire "Licenses are not compatible"