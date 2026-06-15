---
tags: [projet, dataviz, competences]
type: projet
statut: actif
fichier: galaxie-competences.html
amas: [data, ia, interet, dev, systemes, metier]
---

# 🌌 Galaxie des compétences

> [!info] En bref
> Visualisation interactive en **un seul fichier HTML autonome** ([[galaxie-competences.html]]) qui représente mes compétences sous forme de carte stellaire. S'ouvre dans n'importe quel navigateur, sans dépendance externe (polices et logo embarqués).

## Principe visuel

- Six **amas** (familles), chacun dans un espace fixe disposé en couronne, sous une **nébuleuse** colorée qui l'enveloppe. Les nuages se **chevauchent** (fusion *screen*) là où les domaines se rejoignent.
- Chaque **planète** = une compétence : sa **taille** reflète la maîtrise, sa **couleur** l'amas. Les lignes tracent les **liens réels** entre compétences (pondérés).
- Au **centre** : mon sigle lumineux (light-painting, esprit *Nen* de HxH), PNG embarqué en base64, fusionné en *screen*.
- Layout **statique** (pas d'animation). Navigation passive.

> [!tip] Interactions
> - **Clic** sur une planète → fiche latérale (niveau + liens cliquables)
> - **Molette** → zoom · **glisser le fond** → recadrer
> - **Glisser un nom d'amas** → le repositionner pour tester des configurations

## Les six amas

| Amas | Couleur | Contenu |
|------|---------|---------|
| Data & Analytics | cyan | [[Power BI]], [[Python]], [[SQL]], [[Data cleaning]], [[Conception de KPI]], [[Data viz]] |
| IA & Connaissance | rose | [[Archi LLM]], [[World Models]], [[RAG-GraphRAG]], [[Stack IA locale]], [[Memoire d'agent]], [[IA musique]], [[Knowledge management]] |
| Centres d'intérêt | gris clair | [[Neurosciences]], [[BCI-EEG]], [[Physique theorique]], [[Game design]], [[Musique]], [[Poesie & rock]], [[Univers ludiques]] |
| Dév & Web | violet | [[Java]], [[HTML-CSS-JS]], [[React]], [[Front-end design]], [[Deploiement]] |
| Outils & Systèmes | ambre | [[SAP]], [[Progbat]], [[Outils BTP]] |
| Fonctionnel / métier | vert | [[Business analysis]], [[Gestion de projet]], [[Domaine pharma]], [[Domaine BTP]], [[Freelance conseil]], [[Comm & design]], [[Veille & synthese]] |

## Modèle de données (dans le `<script>`)

- `FAMS` — les 6 familles `{name, c (couleur CSS)}`.
- `ORDER` — ordre des amas autour du centre, choisi pour que les **voisins** soient des domaines réellement liés.
- `N` — nœuds `{id, fam, lvl, label, d}`. Niveau `lvl` : `0` intérêt · `1` débutant · `2` intermédiaire · `3` expert.
- `E` — arêtes `[idA, idB, poids 0–1]` ; le poids définit la force/épaisseur du lien.

## Pour modifier / étendre

> [!note] Trois gestes suffisent
> - **Ajouter une compétence** → nouvelle entrée dans `N`, puis ses liens dans `E`.
> - **Changer un niveau** → éditer `lvl` (la taille de la planète se recalcule).
> - **Réorganiser les amas** → modifier `ORDER` pour rapprocher les paires importantes.

## Technique

- HTML / CSS / JS vanilla + SVG, **un seul fichier**.
- Typographie : **Cormorant** (display, fin et aérien) + **Inter**.
- Nébuleuses = enveloppe convexe lissée autour des planètes de chaque amas, floutée et en fusion *screen*.
- Niveaux pré-remplis d'après mon parcours → **à ajuster librement**.

## Liens

- Index des compétences : [[_index]]
- Conventions du vault : [[conventions]]
- Modèle de note : [[template-skill]]
