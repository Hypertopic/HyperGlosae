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
  
