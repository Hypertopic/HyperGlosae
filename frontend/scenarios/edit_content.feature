#language: fr

Fonctionnalité: Essayer d'éditer le contenu

Scénario: de la glose dont on est l'auteur

  Soit un document dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand j'essaie de remplacer le contenu de la glose par :
    """
    Nous traduisons ici "shape" par "ombre" et non "forme" car dans un autre
    poème du recueil, les "shapes" sont clairement ce qui apparaît en allumant
    une lampe dans les ténèbres.
    """
  Alors la glose contient "Nous traduisons ici"

Scénario: de la glose dont on n'est pas l'auteur

  Soit un document dont je ne suis pas l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand j'essaie de remplacer le contenu de la glose par :
    """
    Nous traduisons ici "shape" par "ombre" et non "forme" car dans un autre
    poème du recueil, les "shapes" sont clairement ce qui apparaît en allumant
    une lampe dans les ténèbres.
    """
  Alors je peux lire "Before editing this document, please request authorization to its editors first"
  Et la glose est ouverte en mode édition

Scénario: de la glose sans être connecté

  Soit un document dont je suis l'auteur affiché comme glose
  Quand j'essaie de remplacer le contenu de la glose par :
    """
    Nous traduisons ici "shape" par "ombre" et non "forme" car dans un autre
    poème du recueil, les "shapes" sont clairement ce qui apparaît en allumant
    une lampe dans les ténèbres.
    """
  Alors je peux lire "Before editing this document, please log in first"
  Et la glose est ouverte en mode édition

Scénario: du document principal lorsqu'il n'a pas de document source

  Soit "Restaurer la vapeur" le document principal
  Et qui n'a pas de document source
  Et une session active avec mon compte
  Quand je souhaite modifier le contenu du document principal
  Alors "Restaurer la vapeur" est la glose ouverte en mode édition

Scénario: du document principal lorsqu'il a un document source

  Soit "Treignes, le 8 septembre 2012 (Christophe Lejeune)" le document principal
  Et qui a un document source
  Et une session active avec mon compte
  Quand je souhaite modifier le contenu du document principal
  Alors "Treignes, le 8 septembre 2012 (Christophe Lejeune)" est la glose ouverte en mode édition