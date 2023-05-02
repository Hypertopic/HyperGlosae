#language: fr

Fonctionnalité: Essayer de créer un document à partir de zéro

Scénario: en étant connecté

  Soit la liste des documents affichée
  Et une session active avec mon compte
  Quand j'essaie de créer un nouveau document
  Alors "<TITLE>" est le document principal

Scénario: sans être connecté


  Soit la liste des documents affichée
  Quand j'essaie de créer un nouveau document
  Alors je peux lire "Before editing this document, please log in first"
