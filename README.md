# YouTube Codec Info Overlay

Shows the active video codec, resolution, and decode status as an overlay on YouTube so
you can verify H.264 is being used and see why the VM renders static. Diagnostic tool —
toggle with **Alt+C**.

## Why this exists

In a VM without a GPU, YouTube's VP9/AV1 video can decode successfully but fail to render
(decoded frames never reach the screen), producing gray/green static. This overlay shows
you the real codec, resolution, readyState, and errors so you can confirm which script
(H.264 forcer, 480p cap) is actually taking effect.

## Install

First read the shared **[userscript install guide](https://github.com/chirag127/userscript-install-guide)** (how to set up ScriptCat / Tampermonkey). Then click:

**[Install youtube-codec-info-userscript.user.js](https://github.com/chirag127/youtube-codec-info-userscript/raw/main/youtube-codec-info-userscript.user.js)**

## Use

Open YouTube. A small overlay appears bottom-left showing:

- `codec H.264(avc1): supported/blocked`
- `codec VP9(vp09): supported/blocked`
- `resolution: WxH`
- `readyState`, `paused`, `error`
- `currentTime`

Press **Alt+C** to toggle the overlay on/off.

## License

[MIT](LICENSE) © 2026 chirag127

<!-- okf-bundle -->
## 🧠 Knowledge bundle (OKF)

This repository ships its documentation as an
**Open Knowledge Format** bundle in `okf/` —
written so both a human and an AI agent can understand the script without reading the code.

| File | Contents |
|------|----------|
| `okf/bundle.md` | Overview of the collection |
| `okf/index.md` | Catalogue of concepts |
| `okf/concepts/` | Shared knowledge (architecture, metadata, testing, DOM notes) |
| `okf/scripts/` | This script's own note (where applicable) |

Regenerate every repository's copy from the canonical bundle with `node okf/sync-okf.mjs`.
