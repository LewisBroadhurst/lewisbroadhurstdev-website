# Vendored `@big-shared/ui`

A copy of the parts of `@big-shared/ui` this site uses, until the package is published to npm.

- Source: StratDeck repo, `packages/ui`, branch `claude/big-shared-ui` at commit `0713e1499` (package version 0.1.0).
- Copied unchanged: `theme.css`, `src/button.tsx`, `src/card.tsx`, `src/cn.ts`.
- Imported as `@big-shared/ui/<entry>` through the `paths` entry in `tsconfig.json`, and `theme.css` from `app/globals.css`, so the
  code already reads as if the package were installed.

Why vendored rather than a `file:` dependency: Vercel and GitHub Actions can't see a local StratDeck checkout, so a `file:` path
would break every deploy and CI run.

## Switching to the published package

1. `npm install @big-shared/ui`
2. Delete this folder and the `@big-shared/ui/*` entry under `paths` in `tsconfig.json`.
3. In `app/globals.css`, import `@big-shared/ui/theme.css` instead of `../vendor/big-shared-ui/theme.css`.
4. Add `transpilePackages: ['@big-shared/ui']` to `next.config.ts` (it ships TypeScript source).
