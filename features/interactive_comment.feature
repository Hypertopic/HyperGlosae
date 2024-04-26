#language: fr

Fonctionnalité: Interagir avec un commentaire d’une vidéo

Scénario: pour la première fois sur un timecode

  Soit "Vidéo Sherlock Jr. (Buster Keaton)" le document principal
  Et "Note rire Buster Keaton (Antoine-Valentin Charpentier)" une des gloses ouverte
  Quand je clique sur la référence temporelle "00:03:09.000 --> 00:03:15.000" avec pour commentaire "Une feuille de papier est collée sur le balais."
  Alors la vidéo du document principal se lance de "189" secondes à "195" secondes

Scénario: pour la deuxième fois sur un timecode

  Soit "Vidéo Sherlock Jr. (Buster Keaton)" le document principal
  Et "Note rire Buster Keaton (Antoine-Valentin Charpentier)" une des gloses ouverte
  Et je suis déjà placé sur la référence temporelle "00:03:09.000 --> 00:03:15.000" avec pour commentaire "Une feuille de papier est collée sur le balais."
  Quand je clique sur la référence temporelle "00:09:40.000 --> 00:10:15.000" avec pour commentaire "Il tombe dans son propre piège (peau de banane)."
  Alors la vidéo du document principal se lance de "580" secondes à "615" secondes
