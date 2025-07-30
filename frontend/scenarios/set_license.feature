#language: fr

Fonctionnalité: Définir la licence

Contexte:

  Soit "Vidéo Sherlock Jr. (Buster Keaton)" le document principal
  Et "All rights reserved" le nom de la licence du document principal
  Et une session active avec mon compte

Scénario: d'une traduction avec licence compatible avec celle de la source

  Et j'essaie de créer une glose de type "Adaptation"
  Quand j'essaie de remplacer les métadonnées de la glose par :
    """
    dc_license: All rights reserved
    """
  Alors le nom de la licence de la glose est "All rights reserved"
  Et je ne peux pas lire "Licenses are not compatible"

Scénario: d'une traduction avec une licence incompatible avec celle de la source

  Et j'essaie de créer une glose de type "Adaptation"
  Quand j'essaie de remplacer les métadonnées de la glose par :
    """
    dc_license: https://creativecommons.org/licenses/by-sa/4.0/
    """
  Alors le code de la licence de la glose est "CC-BY-SA"
  Et je peux lire "Licenses are not compatible"

Scénario: d'un commentaire avec une licence incompatible avec celle de la source

  Et j'essaie de créer une glose de type "Commentary"
  Quand j'essaie de remplacer les métadonnées de la glose par :
    """
    dc_license: https://creativecommons.org/licenses/by-sa/4.0/
    """
  Alors le code de la licence de la glose est "CC-BY-SA"
  Et je ne peux pas lire "Licenses are not compatible"

