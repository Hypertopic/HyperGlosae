#language: fr

Fonctionnalité: Essayer d'inviter quelqu'un à éditer un document

Scénario: dont on est l'auteur

  Soit un document reconnaissable dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand j'essaie d'accorder les droits d'édition à "Christophe"
  Alors je vois "Christophe" dans la liste des éditeurs
  Et "christophe" peut modifier le document
  Et le document apparaît dans la bibliothèque de "christophe"

Scénario: dont on n'est pas l'auteur

  Soit un document dont je ne suis pas l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand j'essaie d'accorder les droits d'édition à "christophe"
  Alors je peux lire "Before editing this document, please request authorization to its editors first"

Scénario: sans être connecté

  Soit un document reconnaissable dont je suis l'auteur affiché comme glose
  Quand j'essaie d'accorder les droits d'édition à "christophe"
  Alors je peux lire "Before editing this document, please log in first"

