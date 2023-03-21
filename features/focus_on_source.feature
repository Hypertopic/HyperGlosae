#language: fr

Fonctionnalité: Se focaliser sur la source d'un document

Scénario: dans le cas d'une traduction

  Soit "A tündérek (Charles Perrault)" le document principal
  Et "Les fées (Charles Perrault)" une des sources
  Quand je me focalise sur "Les fées (Charles Perrault)"
  Alors "Les fées (Charles Perrault)" est le document principal
  Et "A tündérek (Charles Perrault)" est une des gloses
  Et "Víly (Charles Perrault)" est une des gloses

Scénario: dans le cas d'un journal de bord en analyse du système d'information

  Soit "Étiquetage de l'entretien" le document principal
  Et "Entretien avec un responsable d'opération" une des sources
  Quand je me focalise sur "Entretien avec un responsable d'opération"
  Alors "Entretien avec un responsable d'opération" est le document principal
  Et "Étiquetage de l'entretien" est une des gloses

Scénario: dans le cas d'une comparaison entre œuvres d'art apparentées

  Soit "Soleil noir et étoiles qui tombent – Comparaison de vitraux" le document principal
  Et "Photographie : vitrail, baie 113, Église Saint-Nizier, Troyes" une des sources
  Et "Photographie : vitrail, baie 6, Église Saint-Martin-ès-Vignes, Troyes" une des sources
  Et "Photographie : vitrail, baie 5, Église Saint-Martin, Grandville, Aube" une des sources
  Quand je me focalise sur "Photographie : vitrail, baie 113, Église Saint-Nizier, Troyes"
  Alors "Photographie : vitrail, baie 113, Église Saint-Nizier, Troyes" est le document principal
  Et "Soleil noir et étoiles qui tombent – Comparaison de vitraux" est une des gloses
  Et "Lavage des tuniques – Comparaison de vitraux" est une des gloses

