# HyperFrames render slice (public)

This repository (**Hyperfreames-render**, `acemagnates/Hyperfreames-render`) contains **only** the HTML compositions, assets, and GitHub
Actions workflows needed to run `hyperframes render` for the on-air projects
in `scripts/public-render-allowlist.json` (e.g. ACE-435, CALENDAR-654).

- **No** agent skills, Cursor rules, or internal pipeline docs live here.
- The full project (private) syncs this tree via `npm run sync:public-render`
  or the `publish-public-render-slice.yml` workflow.

See the private repo `docs/public-render-repo.md` for setup and billing notes.
