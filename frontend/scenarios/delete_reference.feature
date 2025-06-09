#language: fr

Fonctionnalité: Supprimer une référence à un document

Scénario: dont je suis l'auteur
  Soit un document dont je ne suis pas l'auteur affiché comme document principal
  Et avec un document reconnaissable dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand je supprime le lien entre le document principal et la référence
  Alors il n'y a aucun document principal affiché
  Et la glose ouverte est le document reconnaissable

Scénario: dont je ne suis pas l'auteur

  Soit un document dont je ne suis pas l'auteur affiché comme document principal
  Et avec un document reconnaissable dont je ne suis pas l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand je supprime le lien entre le document principal et la référence
  Alors je peux lire "Before editing this document, please request authorization to its editors first"

Scénario: contenant une citation

  Soit un document reconnaissable dont je suis l'auteur affiché comme glose et dont le type est "Quotation"
  Et un document dont je ne suis pas l'auteur affiché comme document principal et contenant :
    """
    Les hommes naissent et demeurent libres et égaux en droits. Les distinctions sociales ne peuvent être fondées que sur l'utilité commune.
    Le but de toute association politique est la conservation des droits naturels et imprescriptibles de l'Homme. Ces droits sont la liberté, la propriété, la sûreté, et la résistance à l'oppression.
    """
  Et une session active avec mon compte
  Et je choisis "Quotation" comme type de reférence
  Et je réutilise ma glose reconnaissable
  Quand je supprime le lien entre le document principal et la référence
  Alors il n'y a aucun document principal affiché
  Et la glose ouverte est le document reconnaissable
  Et les références au document principal contenues dans la glose ne sont plus visibles
