#language: fr

Fonctionnalité: Supprimer une référence à un document

Scénario: dont je suis l'auteur

  Soit un document dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand je supprime le lien entre le document principal et la référence
  Alors le document principal n'est plus affiché
  Et le document principal ne fait plus partie des sources de la glose

Scénario: dont je ne suis pas l'auteur

  Soit un document dont je ne suis pas l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand je supprime le lien entre le document principal et la référence
  Alors je peux lire "Before editing this document, please request authorization to its editors first"

Scénario: contenant une citation

  Soit un document de type "Quotation" dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand je supprime le lien entre le document principal et la référence
  Alors les références au document principal contenues dans la glose ne sont plus visible