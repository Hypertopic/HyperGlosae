#language: fr

Fonctionnalité: Essayer d'éditer les métadonnées d'une glose

Scénario: dont on est l'auteur

  Soit un document dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand j'essaie de remplacer les métadonnées de la glose par :
    """
    dc_title: Commentaire
    dc_creator: Alice Liddell
    dc_issued: "1932"
    """
  Alors "Commentaire" est la glose ouverte

Scénario: dont on n'est pas l'auteur

  Soit un document dont je ne suis pas l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand j'essaie de remplacer les métadonnées de la glose par :
    """
    dc_title: Commentaire
    dc_creator: Alice Liddell
    dc_issued: "1932"
    """
  Alors je peux lire "Before editing this document, please request authorization to its editors first"

Scénario: sans être connecté

  Soit un document dont je suis l'auteur affiché comme glose
  Quand j'essaie de remplacer les métadonnées de la glose par :
    """
    dc_title: Commentaire
    dc_creator: Alice Liddell
    dc_issued: "1932"
    """
  Alors je peux lire "Before editing this document, please log in first"
