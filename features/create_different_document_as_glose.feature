#language: fr

Fonctionnalité: Essayer de créer différent type de document en tant que glose

Scénario: pour un commentaire

  Soit un document existant affiché comme document principal
  Et une session active avec mon compte
  Quand je sélectionne "Commentary" dans le menu déroulant
  Alors "<TITLE>" est la glose ouverte

Scénario: pour une adaptation

  Soit un document existant affiché comme document principal
  Et une session active avec mon compte
  Quand je sélectionne "Adaptation" dans le menu déroulant
  Alors "<TITLE>" est la glose ouverte

Scénario: pour une citation

  Soit un document existant affiché comme document principal
  Et une session active avec mon compte
  Quand je sélectionne "Quotation" dans le menu déroulant
  Alors "<TITLE>" est la glose ouverte