#language: fr

Fonctionnalité: Essayer d'éditer le contenu d'une glose

Scénario: en étant connecté

  Soit un document existant affiché comme glose
  Et une session active avec mon compte
  Quand j'essaie de remplacer le contenu de la glose par :
    """
    Nous traduisons ici "shape" par "ombre" et non "forme" car dans un autre
    poème du recueil, les "shapes" sont clairement ce qui apparaît en allumant
    une lampe dans les ténèbres.
    """
  Alors je peux lire "Nous traduisons ici"

Scénario: sans être connecté

  Soit un document existant affiché comme glose
  Quand j'essaie de remplacer le contenu de la glose par :
    """
    Nous traduisons ici "shape" par "ombre" et non "forme" car dans un autre
    poème du recueil, les "shapes" sont clairement ce qui apparaît en allumant
    une lampe dans les ténèbres.
    """
  Alors je peux lire "Before editing this document, please log in first"
