#language: fr

Fonctionnalité: Créer une glose à partir d'une glose existant

Scénario: Ajouter des gloses existantes à une glose

    Soit "Víly (Charles Perrault)" le document principal
    Et "Fairies (Charles Perrault)" une des gloses
    Et une session active avec mon compte
    Et un commentaire est créée pour le document principal avec les métadonnées :
        """
        dc_title: GLOSSAIRE
        dc_creator: <CREATOR>
        dc_issued: 2024
        """
    Quand j'essaie de créer un commentaire pour "GLOSSAIRE" avec "Fairies"
    Alors "Fairies" est la glose ouverte
