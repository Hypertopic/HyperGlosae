#language: fr

Fonctionnalité: Essayer d'éditer l'annotation d'un passage

Contexte:

  Soit un document en deux passages affiché comme document principal
  Et une glose dont je suis l'auteur faisant référence uniquement au premier passage
  Et une session active avec mon compte

Scénario: quand celle-ci est inexistante

  Quand j'essaie de remplacer l'annotation du passage 2 par :
    """
    Passage intéressant !
    """
  Alors la glose contient "Passage intéressant !"

Scénario: quand celle-ci pré-existe

  Quand j'essaie de remplacer l'annotation du passage 1 par :
    """
    Passage intéressant !
    """
  Alors la glose contient "Passage intéressant !"

Scénario: avec une mise en forme

  Quand j'essaie de remplacer l'annotation du passage 2 par :
    """
    [plusieurs personnes se présentent à moi. Ayant identifié que je suis nouveau, elles me souhaitent la bienvenue]
    Se **socialiser**
    """
  Alors la glose contient "Se socialiser"

Scénario: quand la numérotation est modifiée

  Quand j'essaie de éditer la numerotation de la ligne 2a:
    """
    Pour la remplacer par 2b
    """
    Alors cette ligne sera numérotée 2b
    """
    Pour supprimer la numérotation de la ligne 
    """
    Alors cette ligne n'aura plus de numérotaion