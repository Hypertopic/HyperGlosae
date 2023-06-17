#language: fr

Fonctionnalité: Se focaliser sur la glose d'un document

Scénario: dans le cas d'une traduction

  Soit "Les fées (Charles Perrault)" le document principal
  Et "A tündérek (Charles Perrault)" une des gloses
  Et "Víly (Charles Perrault)" une des gloses
  Quand je me focalise sur "A tündérek (Charles Perrault)"
  Alors "A tündérek (Charles Perrault)" est le document principal
  Et "Les fées (Charles Perrault)" une des sources

Scénario: dans le cas d'un journal de bord en analyse du système d'information

  Soit "Analyse de l'entretien" le document principal
  Et "Vestiges (diagramme de classes)" une des gloses
  Et "Flux de l'Institut (diagramme d'activité)" une des gloses
  Et "Fouille sur le terrain (diagramme d'activité)" une des gloses
  Quand je me focalise sur "Flux de l'Institut (diagramme d'activité)"
  Alors "Flux de l'Institut (diagramme d'activité)" est le document principal
  Et "Analyse de l'entretien" est une des sources

Scénario: dans le cas d'une comparaison entre œuvres d'art apparentées

  Soit "Photographie : vitrail, baie 113, Église Saint-Nizier, Troyes" le document principal
  Et "Soleil noir et étoiles qui tombent – Comparaison de vitraux" une des gloses
  Et "Lavage des tuniques – Comparaison de vitraux" une des gloses
  Quand je me focalise sur "Lavage des tuniques – Comparaison de vitraux"
  Alors "Lavage des tuniques – Comparaison de vitraux" est le document principal
  Et je vois que l'image de la licence du document principal est "CC-BY-SA"
  Et "Photographie : vitrail, baie 113, Église Saint-Nizier, Troyes" une des sources
  Et "Photographie : vitrail, baie 6, Église Saint-Martin-ès-Vignes, Troyes" une des sources
  Et l'image intégrée en source "SNZ 113" est légendée par son titre : "Photographie : vitrail, baie 113, Église Saint-Nizier, Troyes"
  Et l'image intégrée en source "SMV 006 Lavage" est légendée par son titre : "Photographie : vitrail, baie 6, Église Saint-Martin-ès-Vignes, Troyes"

