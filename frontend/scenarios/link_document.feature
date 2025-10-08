#language: fr

Fonctionnalité: Relier un document existant

Scénario: pour commenter un document

  Soit un document existant affiché comme document principal
  Et une session active avec mon compte
  Quand je réutilise "Glossaire" comme glose
  Alors "Glossaire" est la glose ouverte
  Et la glose contient :
    """
    "Il était une fois"
    "Once upon a time" (eng)
    "Bolo to raz" (svk)
    """

Scénario: pour le comparer avec un autre

  Soit "Les fées (Charles Perrault)" le document principal
  Et avec un document reconnaissable dont je suis l'auteur affiché comme glose en tant que "Quotation"
  Soit "A tündérek (Charles Perrault)" le document principal
  Et une session active avec mon compte
  Quand je réutilise mon document reconnaissable en tant que glose de citation et que je me focalise dessus
  Alors la colonne 1 contient "Il était une fois une veuve"
  Et la colonne 2 contient "Volt egyszer egy özvegyasszony"
  Et la colonne 2 contient "MÁSIK TANULSÁG"
  
