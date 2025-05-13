#language: fr
Fonctionnalité: Qualifier un document

  Scénario: non typé avec un type pré-existant

    Soit un document dont je suis l'auteur affiché comme glose
    Et une session active avec mon compte
    Quand je choisis "interview" comme type de glose
    Alors le type "Ethnography/Interview" est le type de la glose

  Scénario: typé avec un autre type pré-existant

    Soit un document dont je suis l'auteur affiché comme glose et dont le type est "Ethnography/Report"
    Et une session active avec mon compte
    Quand je choisis "interview" comme type de glose
    Alors le type "Ethnography/Interview" est le type de la glose

  Scénario: typé comme non typé

    Soit un document dont je suis l'auteur affiché comme glose et dont le type est "Ethnography/Interview"
    Et une session active avec mon compte
    Quand je choisis "remove current type" comme type de glose
    Alors la glose n'a pas de type

  Scénario: non typé avec type non existant

    Soit un document dont je suis l'auteur affiché comme glose
    Et une session active avec mon compte
    Quand je qualifie le document avec un nouveau type de glose
    Alors le nouveau type est le type de la glose
