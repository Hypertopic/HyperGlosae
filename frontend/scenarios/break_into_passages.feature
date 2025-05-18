#language: fr

Fonctionnalité: Découper un document en passages numérotés

Scénario: en fonction du numéro de paragraphe

  Soit un document dont je suis l'auteur affiché comme glose et contenant :
    """
    Les hommes naissent et demeurent libres et égaux en droits. Les distinctions sociales ne peuvent être fondées que sur l'utilité commune.
    Le but de toute association politique est la conservation des droits naturels et imprescriptibles de l'Homme. Ces droits sont la liberté, la propriété, la sûreté, et la résistance à l'oppression.
    """
  Et une session active avec mon compte
  Quand je découpe la glose en passages numérotés et que je me focalise sur la glose
  Alors la rubrique "1" est associée au passage "Les hommes naissent et demeurent libres"
  Et la rubrique "2" est associée au passage "Le but de toute association politique"

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
