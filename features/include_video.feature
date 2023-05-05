#language: fr

Fonctionnalité: Insérer dans un document une vidéo

Scénario: provenant de YouTube

  Soit un document existant affiché comme glose
  Et une session active avec mon compte
  Quand j'essaie de remplacer le contenu de la glose par :
    """
    ![link](https://www.youtube.com/watch?v=JRXkAhMYKEc&ab_channel=ViniciusHenrique)
    """
  Alors le document comporte la vidéo avec pour titre "Sherlock Jr. - Buster Keaton (1924) HD"
