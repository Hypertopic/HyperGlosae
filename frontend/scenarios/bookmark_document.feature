#language: fr

Fonctionnalité: Ajouter à sa bibliothèque un document 

Scénario: dont on n'est pas l'auteur

  Soit un document dont je ne suis pas l'auteur affiché comme document principal
  Et une session active avec mon compte
  Quand j'ajoute le document principal à ma bibliothèque
  Alors le document apparaît une seule fois dans la liste de ma bibliothèque

Scénario: dont on est l'auteur

  Soit un document dont je suis l'auteur affiché comme document principal
  Et une session active avec mon compte
  Quand j'ajoute le document principal à ma bibliothèque
  Alors le document apparaît une seule fois dans la liste de ma bibliothèque
  