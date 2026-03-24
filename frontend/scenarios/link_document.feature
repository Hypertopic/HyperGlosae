#language: fr

Fonctionnalité: Relier un document existant

Scénario: pour commenter un document

  Soit un document existant affiché comme document principal
  Et une session active avec mon compte
  Quand j'utilise un document existant comme commentaire
  Alors la liste de mes documents s'affichent
  Et la liste contient pour chaque document son titre, son auteur, sa dernière date de modification et son lien isPartOf
    """
    "Comments on the video - Côme Peyrelongue, 24/03/2026 09:32 - My First Video Document"
    "My Second Video Document - Côme Peyrelongue, 10/03/2026 20:15"
    "Comments on the video - Côme Peyrelongue, 23/03/2026 10:44 - My Second Video Document"
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
  
