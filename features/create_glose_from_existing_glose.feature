#language: fr

Fonctionnalité: Créer une glose à partir d'une glose existant

Scénario: Ajouter des gloses existantes à une glose

    Soit "Les fées (Charles Perrault)" le document principal
    Et "A tündérek (Charles Perrault)" une des gloses
    Et une session active avec mon compte
    Et un commentaire est créée pour le document principal avec les métadonnées :
        """
        dc_title: Yulia Commentaire
        dc_creator: Yulia
        dc_issued: 2024
        """
    Quand j'essaie de créer le même commentaire pour "A tündérek (Charles Perrault)"
    Alors "Yulia Commentaire" est la glose ouverte
