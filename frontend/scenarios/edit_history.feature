#language: fr

Fonctionnalité: Consulter l'historique des modifications du document

Scénario: un document modifié dont je suis l'auteur

  Soit un document existant affiché comme document principal
  Et que je modifie le document
  Quand je consulte les informations de modification du document
  Alors je peux voir les informations de modification du document "Modified by alice" et une date

Scénario: un document modifié dont je ne suis pas l'auteur

  Soit un document dont je ne suis pas l'auteur affiché comme document principal
  Et ayant parmi les éditeurs "bill" et "alice"
  Et que je modifie le document
  Quand je consulte les informations de modification du document
  Alors je peux voir les informations de modification du document "Modified by alice" et une date

Scénario: un document sans historique de modification 

  Soit un document sans champ "modifications" affiché comme document principal
  Quand je consulte les informations de modification du document
  Alors je ne vois aucune information de modification du document
