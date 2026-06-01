#language: fr

Fonctionnalité: Définir un segment vidéo par deux clics

  Contexte: le bouton "Définir le segment" est affiché sous la vidéo uniquement quand la vidéo possède une annotation ouverte

  Scénario: 1er clic définit le timecode de début, 2e clic définit le timecode de fin et ouvre l'éditeur de commentaire
    Soit une page affichant une vidéo
    Et la vidéo contient une annotation ouverte
    Et une session active avec mon compte
    Quand je positionne la vidéo à "00:03:09.000"
    Et que j'appuie une première fois sur le bouton "Définir le segment" placé sous la vidéo
    Alors le champ "timecode début" du formulaire de segment est rempli par "00:03:09.000"
    Et aucun éditeur de commentaire n'est encore ouvert pour ce segment

    Quand je fais avancer la vidéo à "00:03:15.000"
    Et que j'appuie une deuxième fois sur le même bouton "Définir le segment"
    Alors le champ "timecode fin" du formulaire de segment est rempli par "00:03:15.000"
    Et l'éditeur de commentaire pour ce nouveau segment s'ouvre automatiquement
    Et l'éditeur affiche le timecode début "00:03:09.000" et le timecode fin "00:03:15.000"

  Scénario: Le bouton n'est visible que si la vidéo a une annotation ouverte
    Soit une page affichant une vidéo
    Et la vidéo n'a pas d'annotation ouverte
    Et une session active avec mon compte
    Alors le bouton "Définir le segment" placé sous la vidéo n'est pas visible

  Scénario: Cliquer une seule fois puis annuler / recommencer
    Soit une page affichant une vidéo
    Et la vidéo contient une annotation ouverte
    Et une session active avec mon compte
    Quand je positionne la vidéo à "00:01:00.000"
    Et que j'appuie une première fois sur le bouton "Définir le segment"
    Alors le champ "timecode début" est rempli par "00:01:00.000"

    Quand j'annule la définition du segment via le bouton "Annuler"
    Alors les champs "timecode début" et "timecode fin" sont vidés
    Et je peux recommencer la séquence : un nouveau premier clic enregistrera un nouveau timecode début

  Scénario: Deux clics trop rapprochés ou double-clic
    Soit une page affichant une vidéo
    Et la vidéo contient une annotation ouverte
    Et une session active avec mon compte
    Quand je suis à "00:05:00.000" et que j'appuie deux fois très rapidement sur le bouton "Définir le segment"
    Alors le système doit interpréter le premier clic comme début et le deuxième comme fin (même si les timecodes sont très proches)
    Et l'éditeur de commentaire s'ouvre avec les timecodes enregistrés

