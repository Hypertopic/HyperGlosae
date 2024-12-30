#language: fr

Fonctionnalité: Se focaliser

Contexte:

  Soit "Les fées (Charles Perrault)" le document principal
  Et "A tündérek (Charles Perrault)" une des gloses
  Et "Víly (Charles Perrault)" une des gloses
  Et "Les fées : Conte (Charles Perrault)" une des sources

Scénario: sur la glose d'un document

  Quand je me focalise sur "A tündérek (Charles Perrault)"
  Alors "A tündérek (Charles Perrault)" est le document principal
  Et "Les fées (Charles Perrault)" une des sources

Scénario: sur la source d'un document

  Quand je me focalise sur "Les fées : Conte (Charles Perrault)"
  Alors "Les fées : Conte (Charles Perrault)" est le document principal
  Et "Les fées (Charles Perrault)" une des gloses

