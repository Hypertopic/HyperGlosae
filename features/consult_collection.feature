#language: fr

Fonctionnalité: Consulter une collection

Scénario: sur téléphone, je ne vois pas les gloses et sources

  Soit la liste des documents affichée
  Et je suis sur téléphone
  Quand je me focalise sur "Parcours : Visite de l'Eglise St-Jean-au-Marché, Troyes"
  Alors "Plan : Eglise St-Jean-au-Marché, Troyes (CNRS)," est le document affiché à l'écran
  Et je ne vois pas les gloses
  Et je ne vois pas les sources
  Et je vois l'image "SJ"

Scénario: sur ordinateur, je vois les gloses et sourcess

  Soit la liste des documents affichée
  Et je suis sur ordinateur
  Quand je me focalise sur "Parcours : Visite de l'Eglise St-Jean-au-Marché, Troyes"
  Alors "Parcours : Visite de l'Eglise St-Jean-au-Marché, Troyes" est le document principal
  Et je vois les gloses
  Et je vois les sources
  Et je vois l'image "SJ"
  Et je vois l'image "SJ 018"
  Et je vois l'image "SJ 020"