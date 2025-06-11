#language: fr

Fonctionnalité: Consulter dans l'historique d'un document

Scénario: dont je suis l'auteur, l'auteur et la date de la création de ce document

  Soit un document existant affiché comme document principal
  Quand je consulte l'historique du document
  Alors je peux voir l'auteur de la création du document "alice" et sa date de création

Scénario: dont je ne suis pas l'auteur, l'auteur et la date de la création de ce document

  Soit un document dont je ne suis pas l'auteur affiché comme document principal
  Quand je consulte l'historique du document
  Alors je peux voir l'auteur de la création du document "bill" et sa date de création

Scénario: dont je suis l'auteur, une modification

  Soit un document existant affiché comme document principal
  Et une session active avec mon compte
  Et que je modifie le document
  Quand je consulte l'historique du document
  Alors je peux voir une modification effectuée par "alice" et la date de cette modification

Scénario: dont je ne suis pas l'auteur, une modification

  Soit un document dont je ne suis pas l'auteur affiché comme document principal et qui a parmi ses éditeurs "alice"
  Et une session active avec mon compte
  Et que je modifie le document
  Quand je consulte l'historique du document
  Alors je peux voir une modification effectuée par "alice" et la date de cette modification

Scénario: sans historique

  Soit un document sans champ "history" affiché comme document principal
  Quand je consulte l'historique du document
  Alors aucun historique n'est affiché
