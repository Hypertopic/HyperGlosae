#language: fr

Fonctionnalité: Essayer d'éditer la numérotation d'un passage

Contexte:

  Soit un document affiché comme document principal
  Et une glose dont je suis l'auteur
  Et une session active avec mon compte

Scénario: quand le texte de la glose est en une seule partie

  Quand je supprime l'ensemble du contenu de la glose
  Alors le texte ainsi que la numérotation sont supprimés

Scénario: quand le texte de la glose est plusieur partie

  Quand je supprime l'ensemble du contenu du passage 1 de la glose
  Alors le texte du passage 1 est supprimé et la numérotation des autres passages est réadaptée
