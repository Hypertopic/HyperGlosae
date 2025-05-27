#language: fr

Fonctionnalité: Essayer d'éditer la numérotation d'un passage

Contexte:

  Soit un document en deux passages affiché comme document principal
  Et une glose dont je suis l'auteur
  Et une session active avec mon compte

Scénario: quand j'ajoute un nouveau passage

    Quand j'ajoute le numéro à mon passage
    """
    {3} Last line
    """
    Alors la glose contient 3 passages
