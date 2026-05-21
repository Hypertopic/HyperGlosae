#language: fr

Fonctionnalité: Coéditer un document avec un collaborateur

Contexte:
  Soit un document dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Et "Bill" un des éditeurs de la glose

Scénario: qui modifie le contenu 
  Quand "Bill" remplace le contenu de la glose par :
    """
    Notre sujet porte sur... 
    """
  Alors la glose en mode édition contient "Notre sujet"
  
Scénario: qui modifie les métadonnées
  Quand "Bill" remplace les métadonnées de la glose par :
    """
    dc_creator: Bill
    
    """
  Alors les métadonnées de la glose en mode édition contiennent "dc_creator: Bill"

Scénario: qui est en train de modifier le contenu
  Quand "Bill" est en train d’éditer le passage “1”
  Alors la glose en mode édition indique que "Bill" modifie le passage “1”

Scénario: termine de modifier le contenu
  Soit "Bill" est en train d’éditer le passage “1”
  Et la glose en mode édition indique que "Bill" modifie le passage “1”
  Quand "Bill" quitte le mode édition
  Alors la glose n'indique pas de modification en cours sur le passage "1"
  
