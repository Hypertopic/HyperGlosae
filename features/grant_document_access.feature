#language: fr

Fonctionnalité: Essayer d'accorder à un utilisateur les droits d'édition d'un document

Scénario: dont on est l'auteur

    Soit un document dont je suis l'auteur affiché comme glose
    Et une session active avec mon compte
    Quand j'essaye d'accorder les droits d'édition à "bill"
    Alors "bill" peut modifier le document

Scénario: dont on n'est pas l'auteur

    Soit un document dont je ne suis pas l'auteur affiché comme glose
    Et une session active avec mon compte
    Quand j'essaye d'accorder les droits d'édition à "alice"
    Alors alice ne peut pas modifier le document

Scénario: sans etre connecté

    Soit un document dont je suis l'auteur affiché comme glose
    Et une session active avec mon compte
    Quand j'essaye d'accorder les droits d'édition à "bill"
    Alors bill ne peut pas modifier le document