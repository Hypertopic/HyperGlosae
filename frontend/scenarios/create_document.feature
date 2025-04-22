#language: fr

Fonctionnalité: Essayer de créer un document

Scénario: en tant que commentaire

  Soit un document existant affiché comme document principal
  Et une session active avec mon compte
  Quand j'essaie de créer un glose de type "Commentary"
  Alors la glose ouverte a le titre par défaut

Scénario: en tant qu'adaptation

  Soit un document existant affiché comme document principal
  Et une session active avec mon compte
  Quand j'essaie de créer un glose de type "Adaptation"
  Alors la glose ouverte a le titre par défaut

Scénario: en tant que collection

  Soit le document contenant l'image 2019_10-13_16_UKR_R_A affiché comme document principal
  Et une session active avec mon compte
  Quand j'essaie de créer un glose de type "Quotation"
  Alors je vois l'image "2019_10-13_16_UKR_R_A" dans la glose

Scénario: à partir de zéro

  Soit la liste des documents affichée
  Et une session active avec mon compte
  Quand j'essaie de créer un nouveau document
  Alors la glose ouverte a le titre par défaut

Scénario: sans être connecté

  Soit un document existant affiché comme document principal
  Quand j'essaie de créer un nouveau document
  Alors je peux lire "Before editing this document, please log in first"

Scénario: en gardant certains éditeurs

  Soit un document existant affiché comme document principal
  Et une session active avec mon compte
  Et ayant parmi les éditeurs "bill" et "christophe"
  Quand j'essaie de créer une glose en gardant "bill" comme éditeur
  Alors la glose ouverte a "bill" parmi les éditeurs par défaut

Scénario: en gardant tous les éditeurs

  Soit un document existant affiché comme document principal
  Et une session active avec mon compte
  Et ayant parmi les éditeurs "bill" et "christophe"
  Quand j'essaie de créer une glose en gardant tous les éditeurs
  Alors la glose ouverte a "bill" et "christophe" parmi les éditeurs par défaut
