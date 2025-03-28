#language: fr

Fonctionnalité: Relier un document existant

Scénario: pour commenter un document

  Soit un document existant affiché comme document principal
  Et une session active avec mon compte
  Quand je réutilise "Glossaire" comme glose
  Alors "Glossaire" est la glose ouverte
  Et la glose contient :
    """
    "Il était une fois"
    "Once upon a time" (eng)
    "Bolo to raz" (svk)
    """
