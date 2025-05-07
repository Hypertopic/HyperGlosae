#language: fr

Fonctionnalité: Consulter l'auteur et la date de la création d'un document

Scénario: un document créé dont je suis l'auteur

  Soit un document existant affiché comme document principal
  Quand je consulte les informations de création du document
  Alors je peux voir les informations de création du document "Created by alice" et une date

Scénario: un document créé dont je ne suis pas l'auteur

  Soit un document dont je ne suis pas l'auteur affiché comme document principal
  Quand je consulte les informations de création du document
  Alors je peux voir les informations de création du document "Created by bill" et une date

Scénario: un document sans historique de création

  Soit un document sans champ "history" affiché comme document principal
  Quand je consulte les informations de création du document
  Alors je ne vois aucune information de création du document
