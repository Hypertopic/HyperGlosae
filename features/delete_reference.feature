#language: fr

Fonctionnalité: Supprimer les références existantes

  Scénario: sans être connecté

    Soit "Les fées : Conte" le document principal
    Quand je vais supprimer les références
    Alors je peux lire "Before editing this document, please log in first"

  Scénario: être connecté

    Soit "Les fées : Conte" le document principal
    Et une session active avec mon compte
    Quand je vais supprimer les références
    Alors La référence "Les fées (Charles Perrault),Contes des fées, 1886, All rights reserved" n'existe pas dans le document principal

