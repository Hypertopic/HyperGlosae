#language: fr

Fonctionnalité: Découper un document en passages numérotés

Scénario: en fonction du numéro de paragraphe

  Soit un document dont je suis l'auteur affiché comme glose et contenant :
    """
    Ayant poussé la porte étroite qui chancelle,
    Je me suis promené dans le petit jardin
    Qu'éclairait doucement le soleil du matin,
    Pailletant chaque fleur d’une humide étincelle.
    
    Rien n'a changé. J’ai tout revu : l’humble tonnelle
    De vigne folle avec les chaises de rotin…
    Le jet d'eau fait toujours son murmure argentin
    Et le vieux tremble sa plainte sempiternelle.
    """
  Et une session active avec mon compte
  Quand je découpe la glose en passages numérotés et que je me focalise sur la glose
  Alors la rubrique "1" est associée au passage "Ayant poussé la porte"
  Et la rubrique "2" est associée au passage "Rien n'a changé"
  Et "De vigne folle" est à la ligne 2 du passage

Scénario: en indiquant des rubriques alpha-numériques dans le texte

  Soit un document dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand je remplace le contenu de la glose par ce qui suit et que je me focalise sur la glose :
    """
    {447a} CALLICLÈS. C'est ainsi, dit-on, qu'il faut arriver à la guerre et à une bataille.
    SOCRATE. Comment ! sommes-bous en retard, et arrivons-nous, comme on dit, après la fête ?
    CALLICLÈS. Et même après une fête tout à fait agréable ; car Gorgias vient de nous faire entendre une infinité de belles choses.
    SOCRATE. Eh bien, Calliclès, c'est pourtant Chéréphon qui est cause de cela, pour nous avoir obligés de nous arrêter sur la place publique.

    {447b} CHÉRÉPHON. Il n'y a pas de mal, Socrate ; car j'y remédierai bien. Gorgias est mon ami, et par conséquent il se fera entendre à nous à l'instant même, si tu le désires, ou, si tu l'aimes mieux, une autre fois.
    """
  Alors la rubrique "447a" est associée au passage "CALLICLÈS. C'est ainsi, dit-on, qu'il faut arriver à la guerre et à une bataille."
  Et la rubrique "447b" est associée au passage "CHÉRÉPHON. Il n'y a pas de mal, Socrate ; car j'y remédierai bien. Gorgias"
