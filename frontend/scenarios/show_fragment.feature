#language: fr

Fonctionnalité: Consulter le contexte d'un commentaire de fragment

Scénario: de vidéo
  Soit "Vidéo Sherlock Jr. (Buster Keaton)" le document principal
  Et "Note rire Buster Keaton (Antoine-Valentin Charpentier)" la glose ouverte
  Quand je clique sur la référence temporelle "00:03:09.000 --> 00:03:15.000" annotée
  Alors la vidéo du document principal se lance de 189 à 195 secondes

Scénario: de texte

  Soit "Treignes, le 8 septembre 2012 (Christophe Lejeune)" le document principal
  Et "Etage suivant (Christophe Lejeune)" la glose ouverte
  Quand je survole le texte :
    """
    Se socialiser
    """
  Alors le texte du document principal est en surbrillance :
    """
    plusieurs personnes se présentent à moi. Ayant identifié que je suis nouveau, elles me souhaitent la bienvenue
    """
