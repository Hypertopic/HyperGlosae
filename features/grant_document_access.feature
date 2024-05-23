#language: fr

Fonctionnalité: Essayer d'accorder les droits d'édition d'un document à un utilisateur

Scénario: dont on est l'auteur 

    Soit un document dont je suis l'auteur
    Et une session active avec mon compte
    Quand j'essaye d'accorder les droits d'édition à [Louis]
    Alors [Louis] peux modifier le document //modifier cette phrase
    
Scénario: dont on n'est pas l'auteur 

    Soit un document dont je ne suis pas l'auteur
    Et une session active avec mon compte 
    Quand j'essaye d'accorder les droits d'édition à [Louis]
    Alors [Louis] ne peux pas modifier le document

Scénario: sans etre connecté 

    Soit un document dont je suis l'auteur
    Et une session non active avec mon compte
    Quand j'essaye d'accorder les droits d'édition à [Louis]
    Alors [Louis] ne peux pas modifier le document