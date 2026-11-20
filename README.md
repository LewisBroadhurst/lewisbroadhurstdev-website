# lewisbroadhurst.dev

Lewis Broadhurst's portfolio: projects as case studies, a live shipping record from GitHub, the work timeline and CV.

Next.js 16 (App Router), Tailwind 4 and `@big-shared/ui`, the design system shared with StratDeck and Crypto Charts. It is
vendored in `vendor/big-shared-ui/` until it's published to npm; that folder's README says how to switch.

## Run it

```bash
npm install
npm run dev
```

`npm test` (Vitest), `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm run build`. CI runs all five on every
pull request.

## Where things live

| Path                             | What                                                                          |
| -------------------------------- | ----------------------------------------------------------------------------- |
| `lib/projects.ts`                | The case studies: outcomes, problem, decisions, architecture, what I'd change |
| `lib/experience.ts`              | The work timeline, skills and education. Keep in step with the CV PDF         |
| `public/Lewis_Broadhurst_CV.pdf` | The CV the site links to                                                      |
| `lib/github/`                    | The shipping record: GitHub data shaping (tested) and its loader              |
| `lib/live/`                      | The live fact on each project card (tested shaping, cached fetches)           |
| `lib/og.tsx`                     | Share images for every page                                                   |

## Environment

| Variable                    | Needed for                                                                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`              | A live shipping record. Read-only; needs access to the private repos for their PRs to count. Without it the site uses `data/shipping-snapshot.json`. |
| `NEXT_PUBLIC_GOOGLE_TAG_ID` | Google Analytics. Optional.                                                                                                                          |

Refresh the snapshot now and then:

```bash
GITHUB_TOKEN=$(gh auth token) node scripts/refresh-shipping-snapshot.ts
```
