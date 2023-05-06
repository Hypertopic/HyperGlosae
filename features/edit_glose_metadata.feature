#language: fr

Fonctionnalité: Essayer d'éditer les métadonnées d'une glose

Scénario: en étant connecté

  Soit un document existant affiché comme glose
  Et une session active avec mon compte
  Quand j'essaie de remplacer les métadonnées de la glose par :
    """
    dc_title: Commentaire
    dc_creator: Alice Liddell
    dc_issued: "1932"
    """
  Alors "Commentaire" est la glose ouverte

Scénario: sans être connecté

  Soit un document existant affiché comme glose
  Quand j'essaie de remplacer les métadonnées de la glose par :
    """
    dc_title: Commentaire
    dc_creator: Alice Liddell
    dc_issued: "1932"
    """
  Alors je peux lire "Before editing this document, please log in first"
