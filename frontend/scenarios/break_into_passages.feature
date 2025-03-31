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

Scénario: en indiquant des rubriques numériques dans le texte

  Soit un document dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand je remplace le contenu de la glose par ce qui suit et que je me focalise sur la glose :
    """
    {2.7} Ainsi donc, le mot genre a trois significations
    et c'est de la troisième qu'il s'agit en philosophie.
    {2.8} Et c'est pour définir le genre en ce sens qu'on a dit
    qu'il est l'attribut essentiel applicable à plusieurs espèces différentes entre elles,
    comme l'attribut animal.
    """
  Alors la rubrique "2.7" est associée au passage "Ainsi donc, le mot genre"
  Et la rubrique "2.8" est associée au passage "Et c'est pour définir le genre"

