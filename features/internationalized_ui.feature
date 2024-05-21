#language: fr

Fonctionnalité: Avoir une interface traduite dans la langue favorite

Scénario: en français sur un document sans ses gloses ouvertes

    Soit "en" la langue préférée configurée dans le navigateur
    Et "Vidéo Sherlock Jr. (Buster Keaton)" le document principal
    Et un texte flottant avec la balise title "Create a document as a glose" est présent
    Et un texte flottant avec la balise title "Create a collection from this document" est présent
    Quand je choisis "fr" comme langue préférée configurée dans le navigateur et que je rafraichisse la page
    Alors un texte flottant avec la balise title "Créer un document en tant que glose" est présent
    Et un texte flottant avec la balise title "Créer une collection à partir de ce document" est présent

Scénario: en français sur la page principale
	
    Soit "en" la langue préférée configurée dans le navigateur
    Et la liste des documents affichée
    Et la page contient
        |Sign in|
        |referenced by 1 document(s)|
    Et un texte flottant avec la balise title "Create a document from scratch" est présent
    Et un placeholder contenant "Username" est présent
    Et un placeholder contenant "Password" est présent
    Quand je choisis "fr" comme langue préférée configurée dans le navigateur et que je rafraichisse la page
    Alors la page contient
        |Se connecter|
        |référencé par 1 document(s)|
    Et un texte flottant avec la balise title "Créer un document à partir de zéro" est présent
    Et un placeholder contenant "Nom d’utilisateur" est présent
    Et un placeholder contenant "Mot de passe" est présent

Scénario: en français sur la page de création de document

    Soit "fr" la langue préférée configurée dans le navigateur
    Et la liste des documents affichée
    Et une session active avec mon compte
    Quand j'essaie de créer un nouveau document
    Alors la page contient
        |<TITRE> (<CRÉATEUR>)|
        |Tous droits réservés|
        |<TEXTE>|

Scénario: en anglais sur un document avec une de ses gloses ouverte

    Soit "fr" la langue préférée configurée dans le navigateur
    Et "Vidéo Sherlock Jr. (Buster Keaton)" le document principal
    Et "Note rire Buster Keaton (Antoine-Valentin Charpentier)" une des gloses ouverte
    Et un texte flottant avec l’attribut title "Éditer les métadonnées..." est présent
    Et un texte flottant avec l’attribut title "Éditer le contenu..." est présent
    Et un texte flottant avec la balise title "Éditer le type" est présent
    Quand je choisis "en" comme langue préférée configurée dans le navigateur, que je rafraichisse la page et que "Note rire Buster Keaton (Antoine-Valentin Charpentier)" une des gloses ouverte
    Alors un texte flottant avec l’attribut title "Edit metadata..." est présent
    Et un texte flottant avec l’attribut title "Edit content..." est présent
    Et un texte flottant avec la balise title "Edit type" est présent