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

  Soit un document principal dont je suis l'auteur et qui n'a pas de document source
  Et une session active avec mon compte
  Quand j'essaye de remplacer le contenu du document principal par :
    """
    Comment se coordonne la restauration de locomotives à vapeur ? ...
    """
  Alors le document principal passe à droite et peut être édité

Scénario: du document principal lorsqu'il a un document source

  Soit un document principal dont je suis l'auteur et qui a un document source
  Et une session active avec mon compte
  Quand j'essaye de remplacer le contenu du document principal par :
    """
    Lors d'une de mes premières venues à l'atelier, ...
    """
  Alors le document principal passe à droite et peut être édité