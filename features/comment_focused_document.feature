#language: fr

Fonctionnalité: Créer un commentaire à partir d'un fragment de document en cours de focus

Scénario: Une glose dont je suis l'auteur est ouverte

  Soit "Treignes, le 8 septembre 2012 (Christophe Lejeune)" le document principal
  Et un autre document, en plusieurs passages, affiché comme glose et dont je suis l'auteur
  Et une session active avec mon compte
  Quand je sélectionne le fragment de texte :
    """
    plusieurs personnes se présentent à moi. Ayant identifié que je suis nouveau, elles me souhaitent la bienvenue
    """
  Alors je peux créer un commentaire
  Et je peux lire:
  """
  plusieurs personnes se présentent à moi. Ayant identifié que je suis nouveau, elles me souhaitent la bienvenue:
  <TEXT>
  """
  Et la glose est ouverte en mode édition
