#language: fr

Fonctionnalité: Ajouter une référence à un document

Scénario: si j'en ai les droits d'édition

  Soit un document dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Et je crée un document avec les métadonnées suivantes:
    """
    dc_title: Titouan
    dc_creator: Alice Liddell
    dc_issued: 1932
    """
  Quand je me focalise sur "Titouan"
  Et j'essaie de créer une référence au document
  Alors "<TITLE>" est le document principal
  Et "Titouan" est une des gloses

Scénario: si je n'en ai pas les droits d'édition

  Soit un document existant affiché comme document principal dont je ne suis pas l'auteur
  Et une session active avec mon compte
  Quand j'essaie de créer une référence au document
  Alors je peux lire "Before editing this document, please request authorization to its editors"

Scénario: sans être connecté

  Soit un document que l'on consulte
  Quand j'essaie de créer une référence au document
  Alors je peux lire "Before editing this document, please log in"

