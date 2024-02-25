#language: fr

Fonctionnalité: Éditer un passage

Scénario: en regard d'un autre passage

  Soit un document en plusieurs passages affiché comme document principal
  Et un autre document, en plusieurs passages, affiché comme glose et dont je suis l'auteur
  Et une session active avec mon compte
  Quand j'essaie de remplacer le contenu du premier passage de la glose par :
    """
    fouiller selon le programme
    : Action
    """
  Alors le texte du premier passage de la glose est :
    """
    fouiller selon le programme
    Action
    """

