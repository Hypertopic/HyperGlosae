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


Scénario: en tant que composition partielle de texte

  Soit 'Les fées (Charles Perrault)' le document principal
  Et une session active avec mon compte
  Quand j'essaie de créer un glose de type "Quotation"
  Alors la glose contient :
    """
    Peuvent beaucoup sur les Esprits ;
    Cependant les douces paroles
    Ont encore plus de force, et sont d'un plus grand prix.
    """

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

Scénario: en gardant toutes les métadonnées du document source

  Soit "Vestiges (diagramme de classes)" le document principal
  Et une session active avec mon compte
  Et ayant les métadonnées
  """
    dc_creator: Aurélien Bénel
    dc_isPartOf: Archéologie préventive (IF14)
    dc_issued: 2019-10-01T15:50:42.624Z
    dc_language: french
    dc_license: https://creativecommons.org/licenses/by/4.0/
    dc_title: Vestiges (diagramme de classes)
  """
  Quand j'essaie de créer une glose en gardant les métadonnées du document source
  Alors la glose ouverte a les métadonnées
  """
    dc_creator: Aurélien Bénel
    dc_isPartOf: Archéologie préventive (IF14)
    dc_issued: 2019-10-01T15:50:42.624Z
    dc_language: french
    dc_license: https://creativecommons.org/licenses/by/4.0/
    dc_title: Vestiges (diagramme de classes)
  """

Scénario: en gardant certaines des métadonnées du document source

  Soit "Vestiges (diagramme de classes)" le document principal
  Et une session active avec mon compte
  Et ayant les métadonnées
  """
    dc_creator: Aurélien Bénel
    dc_isPartOf: Archéologie préventive (IF14)
    dc_issued: 2019-10-01T15:50:42.624Z
    dc_language: french
    dc_license: https://creativecommons.org/licenses/by/4.0/
    dc_title: Vestiges (diagramme de classes)
  """
  Quand j'essaie de créer une glose en gardant la "dc_isPartOf" du document source
  Alors la glose ouverte a les métadonnées
  """
    dc_isPartOf: Archéologie préventive (IF14)
  """
