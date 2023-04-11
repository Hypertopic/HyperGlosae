#language: fr

Fonctionnalité: Consulter un document et une de ses gloses côte à côte

Scénario: quand la glose est la traduction d'un passage

  Soit "Les fées (Charles Perrault)" le document principal
  Et "A tündérek (Charles Perrault)" une des gloses
  Et "Víly (Charles Perrault)" une des gloses
  Et je peux lire "Il était une fois une veuve qui avait deux filles"
  Mais je ne peux pas lire "Volt egyszer egy özvegyasszony"
  Et je ne peux pas lire "Bola raz jedna vdova, ktorá mala dve dcéry"
  Quand je consulte le contenu de "Víly (Charles Perrault)"
  Alors je peux lire "Bola raz jedna vdova, ktorá mala dve dcéry"
  Et je peux lire "Il était une fois une veuve qui avait deux filles"
  Mais je ne peux pas lire "Volt egyszer egy özvegyasszony"

Scénario: quand la glose est le commentaire d'un fragment

  Soit "Entretien avec un responsable d'opération" le document principal
  Et "Étiquetage de l'entretien" une des gloses
  Et je peux lire "le matin tu arrives sur le chantier, tu vas fouiller selon le programme que t'as établi"
  Quand je consulte le contenu de "Étiquetage de l'entretien"
  Alors je peux lire "le matin tu arrives sur le chantier, tu vas fouiller selon le programme que t'as établi"
  Et je peux lire:
    """
    fouiller selon le programme
    Action
    """

Scénario: quand la glose est un commentaire global

  Soit "Étiquetage de l'entretien" le document principal
  Et "Analyse de l'entretien" une des gloses
  Et je peux lire "photos"
  Mais je ne peux pas lire "photographies"
  Quand je consulte le contenu de "Analyse de l'entretien"
  Alors je peux lire "photos"
  Et je peux lire "l'archéologie transforme les vestiges en documents ([photographies], plans, [coupes], etc.)."
 
Scénario: quand la glose est une comparaison de documents apparentés

  Soit "Photographie : vitrail, baie 113, Église Saint-Nizier, Troyes" le document principal
  Et "Soleil noir et étoiles qui tombent – Comparaison de vitraux" une des gloses
  Et "Lavage des tuniques – Comparaison de vitraux" une des gloses
  Et je vois l'image "SNZ 113"
  Mais je ne vois pas l'image "GRV 005"
  Et je ne vois pas l'image "SMV 006 Soleil"
  Et je ne vois pas l'image "SMV 006 Lavage"
  Quand je consulte le contenu de "Soleil noir et étoiles qui tombent – Comparaison de vitraux"
  Alors je vois l'image "GRV 005"
  Et je vois l'image "SMV 006 Soleil"
  Mais je ne vois pas l'image "SMV 006 Lavage"
  Et je vois l'image "SNZ 113"
  Et l'image intégrée dans la page "SNZ 113" est légendée par son titre : "Photographie : vitrail, baie 113, Église Saint-Nizier, Troyes"
  Et l'image intégrée dans la page "SMV 006 Soleil" est légendée par son titre : "Photographie : vitrail, baie 6, Église Saint-Martin-ès-Vignes, Troyes"
  Et l'image intégrée dans la page "GRV 005" est légendée par son titre : "Photographie : vitrail, baie 5, Église Saint-Martin, Grandville, Aube (Aurélien Bénel),2016"

