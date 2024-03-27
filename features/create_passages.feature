#language: fr

Fonctionnalité: Créer des passages dans un document

Scénario: en regard d'un document découpé en passages

  Soit un document en deux passages affiché comme document principal
  Et un autre document, non découpé, affiché comme glose et dont je suis l'auteur
  Et une session active avec mon compte
  Quand j'essaie de remplacer le contenu de la glose par :
    """
    {1} Les hommes naissent et demeurent libres et égaux en droits. Les distinctions sociales ne peuvent être fondées que sur l'utilité commune.
    {2} Le but de toute association politique est la conservation des droits naturels et imprescriptibles de l'Homme. Ces droits sont la liberté, la propriété, la sûreté, et la résistance à l'oppression.
    """
  Alors je ne peux pas lire "{1}"
  Mais le texte du premier passage de la glose est :
    """
    Les hommes naissent et demeurent libres et égaux en droits. Les distinctions sociales ne peuvent être fondées que sur l'utilité commune.
    """

Scénario: en regard d'un document non découpé en passages

  Soit un document existant affiché comme document principal
  Et un autre document, non découpé, affiché comme glose et dont je suis l'auteur
  Et une session active avec mon compte
  Quand j'essaie de remplacer le contenu de la glose par :
    """
    {1} Les hommes naissent et demeurent libres et égaux en droits. Les distinctions sociales ne peuvent être fondées que sur l'utilité commune.
    {2} Le but de toute association politique est la conservation des droits naturels et imprescriptibles de l'Homme. Ces droits sont la liberté, la propriété, la sûreté, et la résistance à l'oppression.
    """
  Alors je ne peux pas lire "{1}"
  Mais le texte du premier passage de la glose est :
    """
    Les hommes naissent et demeurent libres et égaux en droits. Les distinctions sociales ne peuvent être fondées que sur l'utilité commune.
    """

