#language: fr

Fonctionnalité: Essayer d'éditer le contenu d'une glose

Scénario: dont on est l'auteur

  Soit un document dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand j'essaie de remplacer le contenu de la glose par :
    """
    Nous traduisons ici "shape" par "ombre" et non "forme" car dans un autre
    poème du recueil, les "shapes" sont clairement ce qui apparaît en allumant
    une lampe dans les ténèbres.
    """
  Alors je peux lire "Nous traduisons ici"

Scénario: dont on n'est pas l'auteur

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

Scénario: sans être connecté

  Soit un document dont je suis l'auteur affiché comme glose
  Quand j'essaie de remplacer le contenu de la glose par :
    """
    Nous traduisons ici "shape" par "ombre" et non "forme" car dans un autre
    poème du recueil, les "shapes" sont clairement ce qui apparaît en allumant
    une lampe dans les ténèbres.
    """
  Alors je peux lire "Before editing this document, please log in first"
  Et la glose est ouverte en mode édition

Scénario: dont les annotations sont manquantes ou inexistantes

  Soit un document en deux passages affiché comme document principal
  Et une session active avec mon compte
  Et une glose faisant référence uniquement à la partie une
  Quand j'essaie d'éditer le bloc 2 avec le texte
    """
    Diane
    : Acteurs
    """
  Alors je peux lire:
    """
    Diane
    Acteurs
    """

Scénario: dont les annotations sont présentes

  Soit un document en deux passages affiché comme document principal
  Et une session active avec mon compte
  Et une glose faisant référence uniquement à la partie une
  Quand j'essaie d'éditer le bloc 1 avec le texte
    """
    Diane
    : Acteurs
    """
  Alors je peux lire:
    """
    Diane
    Acteurs
    """
