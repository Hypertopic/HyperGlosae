#language: fr

Fonctionnalité: Essayer d'éditer la numérotation d'un passage

Contexte:

  Soit un document en deux passages affiché comme document principal
  Et une glose dont je suis l'auteur
  Et une session active avec mon compte

Scénario: quand la glose ne contient qu'un seul passage

  Quand je modifie le texte de la glose pour rajouter a la fin
  """
  {2} Second
  """
  Alors la glose est en deux passages

Scénario: quand la glose contient 2 passages

    Quand je modifie le texte de dernier passge de la glose pour rajouter à la fin 
    """
    {3} Last
    """
    Alors la glose contient 3 passages
