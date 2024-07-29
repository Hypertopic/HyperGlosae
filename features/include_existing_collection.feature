#language: fr

Fonctionnalité: Ajouter des images existantes à une collection

Scénario: une collection existante

  Soit un document existant contenant l'image 2019_10-13_16_UKR_R_A
  Et une session active avec mon compte
  Quand j'ajoute "16e prix - Catégorie 10-13 ans" à la collection 'Exposition "Nos dessins préférés"'
  Alors le document "16e prix - Catégorie 10-13 ans" est inclus dans la collection 'Exposition "Nos dessins préférés"'