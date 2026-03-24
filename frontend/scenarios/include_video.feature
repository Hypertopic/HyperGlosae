#language: fr

Fonctionnalité: Insérer dans un document une vidéo

Scénario: provenant de YouTube

  Soit un document dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand j'essaie de remplacer le contenu de la glose par :
    """
    ![link](https://www.youtube.com/watch?v=JRXkAhMYKEc&ab_channel=ViniciusHenrique)
    """
  Alors le document comporte la vidéo "https://www.youtube.com/embed/JRXkAhMYKEc"



Scénario: via le bouton d'insertion de l'interface

  Soit un document dont je suis l'auteur affiché comme glose
  Et une session active avec mon compte
  Quand je clique sur l'icône "Add a video"
  Et que je saisis le lien "https://www.youtube.com/watch?v=JRXkAhMYKEc&ab_channel=ViniciusHenrique" dans la boîte de dialogue
  Et que je valide l'insertion
  Alors le document comporte la vidéo "https://www.youtube.com/embed/JRXkAhMYKEc"
  Et le texte brut de la glose contient "![link](https://www.youtube.com/watch?v=JRXkAhMYKEc)"

  

