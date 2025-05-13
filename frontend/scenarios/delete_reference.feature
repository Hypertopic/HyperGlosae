#language: fr

Fonctionnalité: Supprimer une référence à un document

Scénario: dont je suis l'auteur
  Soit un document dont je ne suis pas l'auteur affiché comme document principal
  Et avec un document reconnaissable dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand je supprime le lien entre le document principal et la référence
  Alors la glose ouverte est le document reconnaissable
  Et il n'y a aucun document principal affiché

Scénario: dont je ne suis pas l'auteur

  Soit un document dont je ne suis pas l'auteur affiché comme document principal
  Et avec un document reconnaissable dont je suis pas l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand je supprime le lien entre le document principal et la référence
  Alors je peux lire "Before editing this document, please request authorization to its editors first"

Scénario: contenant une citation

  Soit un document reconnaissable dont je suis l'auteur affiché comme glose et dont le type est "Quotation"
  Et avec une session active avec mon compte
  Et un document dont je ne suis pas l'auteur affiché comme document principal
  Et je choisit "Quotation" comme type de reférence
  Et je réutilise ma glose reconnaissable
  Quand je supprime le lien entre le document principal et la référence
  Alors les références au document principal contenues dans la glose ne sont plus visible