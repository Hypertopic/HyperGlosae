#language: fr

Fonctionnalité: Coéditer un document avec un collaborateur

Contexte:
  Soit un document, en plusieurs passages, affiché comme glose et dont je suis l'auteur
  Et une session active avec mon compte
  Et "bill" un des éditeurs de la glose

Scénario: qui modifie le contenu
  Soit le passage "2" est en mode édition
  Quand "bill" remplace le passage "1" de la glose par :
    """
    Notre sujet porte sur...
    """
  Alors le passage "1" de la glose contient "Notre sujet porte sur..."
  Et le passage "2" est toujours en mode édition

Scénario: qui modifie les métadonnées
  Quand "bill" remplace les métadonnées de la glose par :
    """
    dc_creator: Bill

    """
  Alors les métadonnées de la glose en mode édition contiennent "dc_creator: Bill"
