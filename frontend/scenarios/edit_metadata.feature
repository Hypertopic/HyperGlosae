#language: fr

Fonctionnalité: Essayer d'éditer les métadonnées d'une glose

Scénario: dont on est l'auteur

  Soit un document dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand j'essaie de remplacer les métadonnées de la glose par :
    """
    dc_title: Chapitre 1: Contexte historique
    dc_creator: Alice Liddell
    dc_issued: 1932
    dc_language: french
    dc_translator: Charles Beaudelaire
    dc_isPartOf: Philosophie Moderne : Une première approche
    """
  Alors "Chapitre 1: Contexte historique" est la glose ouverte
  Et le créateur est "Alice Liddell"
  Et l'année de publication est "1932"
  Et la langue est "French"
  Et le titre de l'ouvrage est "Philosophie Moderne : Une première approche"

Scénario: dont on n'est pas l'auteur

  Soit un document dont je ne suis pas l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand j'essaie de remplacer les métadonnées de la glose par :
    """
    dc_title: Commentaire
    dc_creator: Alice Liddell
    dc_issued: 1932
    """
  Alors je peux lire "Before editing this document, please request authorization to its editors first"

Scénario: sans être connecté

  Soit un document dont je suis l'auteur affiché comme glose
  Quand j'essaie de remplacer les métadonnées de la glose par :
    """
    dc_title: Commentaire
    dc_creator: Alice Liddell
    dc_issued: 1932
    """
  Alors je peux lire "Before editing this document, please log in first"
