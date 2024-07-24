#language: fr

Fonctionnalité: Essayer de créer une collection

Scénario: à partir d’un bloc de passage

  Soit "A tündérek (Charles Perrault)" le document principal
  Et une session active avec mon compte
  Quand je crée une collection à partir du premier bloc
  Alors la glose est ouverte et contient :
  """
  Volt egyszer egy özvegyasszony, s annak két lánya. A nagyobbik kívül-belül annyira hasonlított rá, hogy aki ránézett, anyjára ismert benne. Olyan undok és gőgös volt mindkettő, hogy senki sem tudott megmaradni mellettük. A kisebbik az apjára ütött, szelíd volt és becsületes, s emellett szépsége is párját ritkította. Mivel mindenki ahhoz vonzódik, aki hasonlít rá, az anya bolondult a nagyobbik lányáért, a kisebbiket pedig gyűlölte. A konyhában kellett ennie, és egész álló nap dolgoznia.
  """
