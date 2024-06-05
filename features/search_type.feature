#language: fr

Fonctionnalité: Chercher un type dans une glose

Scénario: par son préfixe

  Soit un document dont je suis l'auteur affiché comme glose
  Quand je cherche le type "ethno"
  Alors je peux lire "Ethnography/Interview" dans la liste des types
  Et je peux lire "Ethnography/Report" dans la liste des types
  Et je peux lire "Ethnography/Analysis" dans la liste des types

Scénario: par une partie de son nom

  Soit un document dont je suis l'auteur affiché comme glose
  Quand je cherche le type "inter"
  Alors je peux lire "Ethnography/Interview" dans la liste des types
  Et je ne peux pas lire "Ethnography/Report"
  Et je ne peux pas lire "Ethnography/Analysis"


Scénario: avec une expression qui ne correspond pas totalement aux noms disponibles

  Soit un document dont je suis l'auteur affiché comme glose
  Quand je cherche le type "lab report"
  Alors je ne peux rien lire dans la liste des types