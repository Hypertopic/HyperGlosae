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

Scénario: qui a modifié le contenu 
 
 Quand "Bill" a édité le passage “1”
 Alors le passage "1" de la glose en mode édition contient une barre
 Et cette barre indique qu’il a modifié le passage “1”
