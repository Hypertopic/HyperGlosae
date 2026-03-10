#language: fr

Fonctionnalité: Créer un commentaire à partir d'un fragment

Scénario: de texte

  Soit "Treignes, le 8 septembre 2012 (Christophe Lejeune)" le document principal
  Et un autre document, en plusieurs passages, affiché comme glose et dont je suis l'auteur
  Et une session active avec mon compte
  Quand je sélectionne le fragment de texte :
    """
    plusieurs personnes se présentent à moi. Ayant identifié que je suis nouveau, elles me souhaitent la bienvenue
    """
  Alors la glose est ouverte en mode édition et contient :
  """
  [plusieurs personnes se présentent à moi. Ayant identifié que je suis nouveau, elles me souhaitent la bienvenue]
  …
  """

Scénario: de texte formaté en italique

  Soit "Treignes, le 8 septembre 2012 (Christophe Lejeune)" le document principal
  Et un document dont je suis l'auteur affiché comme glose et contenant :
    """
    [*plusieurs personnes*]
    Mon commentaire sur ce passage
    """
  Et une session active avec mon compte
  Alors la glose contient "plusieurs personnes"
  Et la citation contient du texte en italique
