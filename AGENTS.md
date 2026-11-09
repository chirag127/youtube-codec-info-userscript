# AGENTS.md - youtube-codec-info-userscript

Single-file userscript. `youtube-codec-info-userscript.user.js` at repo root IS the product. No build, no deps, `@grant none`.

## Method

Reads YouTube's video element and media APIs every second and renders a small fixed
overlay bottom-left:

- `MediaSource.isTypeSupported` for vp09.00.51.08 and avc1.42E01E (which codec is blocked)
- `video.videoWidth` / `video.videoHeight` (actual resolution)
- `readyState`, `paused`, `error`
- `currentTime`

Toggle with `Alt+C` (guarded so it never fires while typing in an input).

## Rules

- One file, zero deps, `@grant none`. Runs at `document-idle`.
- No hotkeys other than Alt+C toggle.
- Diagnostic only — does not modify playback or page DOM beyond adding the overlay.

## Install docs

Shared guide: https://github.com/chirag127/userscript-install-guide — link it, never duplicate install steps.

## Test

`sctl install ./youtube-codec-info-userscript.user.js`, open YouTube, press `Alt+C`,
confirm the overlay appears and shows `codec VP9(vp09): blocked` when the H.264 forcer is
active.

<!-- okf-requirement -->
## 🧠 OKF documentation requirement (mandatory)

**Every repository in this collection MUST ship an Open Knowledge Format (OKF) bundle in `okf/`.**

A repository without `okf/` is **incomplete**, even if the script works.

### What must exist

```
okf/
├── bundle.md      overview of the collection
├── index.md       catalogue of concepts
├── concepts/      all shared concept notes (architecture, metadata, scriptcat-and-sctl,
│                  testing, youtube-dom, okf-requirement)
└── scripts/       THIS repository's own script note (where one applies)
```

### Rules

1. **Never hand-edit** a repository's `okf/` copy. The canonical bundle is
   `docs/okf/` in the `c:\ws` monorepo.
2. After changing the canonical bundle, regenerate every copy:
   `node okf/sync-okf.mjs`
3. Verify nothing has drifted: `node okf/sync-okf.mjs --check` - must exit `0`.
4. `README.md` must link to `okf/`. `AGENTS.md` (this file) must restate this requirement.
5. When adding a new script, add its note at `docs/okf/scripts/<repo-name>.md` in the canonical
   bundle first, then sync.
6. Record durable knowledge here as a concept note: fragile selectors, platform rules,
   rejected alternatives, and mistakes that already cost time.

Full detail: [`docs/okf/concepts/okf-requirement.md`](docs/okf/concepts/okf-requirement.md)
