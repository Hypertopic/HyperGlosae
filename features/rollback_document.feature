#language: fr

Fonctionnalité: Revenir à une ancienne version du document

  Scénario: avec un document avec plusieurs versions dont je suis l'auteur

    Soit un document dont je suis l'auteur affiché comme glose
    Et dont le texte du premier passage est "TEXTE ANCIEN" dans sa version antérieure la plus récente
    Et dont le texte du premier passage est "TEXTE"
    Et une session active avec mon compte
    Quand j'essaye d'effectuer un rollback
    Alors le texte du premier passage de la glose est :
  """
  TEXTE ANCIEN
  """

  Scénario: avec un document avec une seule version dont je suis l'auteur

    Soit un document dont je suis l'auteur affiché comme glose
    Et une session active avec mon compte
    Quand j'essaye d'effectuer un rollback
    Alors le texte du premier passage de la glose est :
  """
  <TEXT>
  """

  Scénario: sans être connecté

    Soit un document dont je suis l'auteur affiché comme glose
    Et dont le texte du premier passage est "TEXTE"
    Quand j'essaye d'effectuer un rollback
    Alors je peux lire "Before editing this document, please log in first"