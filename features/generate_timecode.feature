#language: fr

Fonctionnalité: Ajouter un timecode dans un commentaire

Scénario: d’un extrait de film sur Youtube

	Soit "Vidéo Sherlock Jr. (Buster Keaton)" le document principal
	Et une session active avec mon compte
	Et "Note rire Buster Keaton (Antoine-Valentin Charpentier)" une des gloses ouverte
	Quand j’ajoute un timecode dans la glose ouverte
	Alors le texte à la fin du commentaire contient la nouvelle référence temporelle