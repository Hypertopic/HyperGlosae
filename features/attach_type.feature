#language: fr

Fonctionnalité: Attacher à une glose un type

Scénario: prédéfini en étant connecté

  Soit un document dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand j'attache le type "Ethnography/​Interview" 
  Alors le type "Ethnography/​Interview" est le type de la glose ouverte

Scénario: prédéfini sans être connecté

  Soit un document dont je suis l'auteur affiché comme glose
  Quand j'attache le type "Ethnography/​Interview" 
  Alors je peux lire "Before editing this document, please log in first"
