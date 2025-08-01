#language: fr

Fonctionnalité: Essayer d'ouvrir l'URI partagée

Scénario: d'un document

  Quand j'essaie d'ouvrir l'URI "/c2b9f52285ce11edbd0aff9b25defbab" reçue par courriel
  Alors je ne peux pas lire "Le document que vous cherchez a été supprimé par les co-éditeurs ou l'URI fournie est incorrecte"
  Et "Analyse de l'entretien" est le document principal
  Et "Vestiges (diagramme de classes)" une des gloses
  Et "Flux de l'Institut (diagramme d'activité)" une des gloses
  Et "Fouille sur le terrain (diagramme d'activité)" une des gloses

Scénario: d'un document en regard d'une de ses gloses

  Quand j'essaie d'ouvrir l'URI "/c2b9f52285ce11edbd0aff9b25defbab/146e6e8442f0405b721b79357d00d0a1" reçue par courriel
  Alors "Analyse de l'entretien" est le document principal
  Et "Flux de l'Institut (diagramme d'activité)" est la glose ouverte

Scénario: d'un document avec une URI invalide

  Quand j'essaie d'ouvrir l'URI "/document-inexistant/glose-inexistante" reçue par courriel
  Alors je peux lire "Le document que vous cherchez a été supprimé par les co-éditeurs ou l'URI fournie est incorrecte"
