# Portfolio — Gwenaël Liger

Portfolio personnel bilingue (FR/EN) construit avec **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS** et **Framer Motion**. Les composants sont documentés et testés via **Storybook** + **Vitest**.

## Prérequis

- **Node.js 20+** (la CI utilise Node 20)
- **npm**

## Installation

```bash
npm install
```

## Lancer le projet

### Développement

```bash
npm run dev
```

L'application est disponible sur [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build   # build de production
npm run start   # sert le build
```

## Storybook

Développer et visualiser les composants en isolation :

```bash
npm run storybook         # serveur Storybook sur http://localhost:6006
npm run build-storybook   # build statique de Storybook
```

## Tests

Les tests s'exécutent via l'addon Vitest de Storybook (configuré dans [vitest.config.ts](vitest.config.ts)) et utilisent Playwright pour le rendu navigateur :

```bash
npx vitest         # lancer les tests
npx vitest --watch # mode watch
```

> Au premier lancement, installer les navigateurs Playwright si nécessaire : `npx playwright install`.

## Lint

```bash
npm run lint
```

## Structure

```
app/        Pages (App Router) : accueil, projets, à propos
components/ Composants React (+ stories Storybook)
data/       Données du portfolio (projets, compétences…)
lib/i18n/   Traductions FR/EN
public/     Assets statiques
```

## Déploiement

Le déploiement est géré par **Vercel**. Le workflow [.github/workflows/preview.yml](.github/workflows/preview.yml) déploie automatiquement une preview sur chaque push (hors `main`/`master`) et commente l'URL sur la PR associée.
