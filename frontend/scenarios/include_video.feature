#language: fr

Fonctionnalité: Insérer dans un document une vidéo sur YouTube

  Scénario: Reconnaissance automatique d'un lien YouTube pur

    Soit un document dont je suis l'auteur affiché comme glose
    Et une session active avec mon compte
    Quand j'essaie de remplacer le contenu de la glose par :
      """
      https://www.youtube.com/watch?v=JRXkAhMYKEc&ab_channel=ViniciusHenrique
      """
    Alors le document comporte la vidéo "https://www.youtube.com/embed/JRXkAhMYKEc"
  

