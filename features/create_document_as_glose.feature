#language: fr

Fonctionnalité: Essayer de créer un document en tant que glose

Scénario: en étant connecté

  Soit un document existant affiché comme document principal
  Et une session active avec mon compte
  Quand j'essaie de créer un nouveau document
  Alors "<TITLE>" est la glose ouverte

Scénario: sans être connecté

  Soit un document existant affiché comme document principal
  Quand j'essaie de créer un nouveau document
  Alors je peux lire "Before editing this document, please log in first"
