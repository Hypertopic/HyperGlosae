#language: fr

Fonctionnalité: Ajouter un timecode dans un commentaire

Scénario: d’un extrait de film sur Youtube
	

	Soit “Vidéo Sherlock Jr. (Buster Keaton)” le document principal
Et "Note rire Buster Keaton (Antoine-Valentin Charpentier)" une des gloses ouverte
	Quand j’ajoute un timecode allant de “00:03:45.000” à “00:04:45.000” dans la glose ouverte
Alors le texte qui contient la nouvelle référence temporelle collée à la fin du commentaire est : 
“00:03:45.000 --> 00:04:45.000
<TEXT>”
