// ==UserScript==
// @name         YouTube Codec Info Overlay
// @namespace    https://github.com/chirag127
// @version      1.0.0
// @description  Shows the active video codec, resolution, and decode status as an overlay on YouTube so you can verify H.264 is being used and see why the VM renders static. Diagnostic tool.
// @author       chirag127
// @license      MIT
// @match        https://www.youtube.com/*
// @match        https://m.youtube.com/*
// @icon         data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctext y='20' font-size='20'%3E%F0%9F%94%8B%3C/text%3E%3C/svg%3E
// @homepageURL  https://github.com/chirag127/youtube-codec-info-userscript
// @supportURL   https://github.com/chirag127/youtube-codec-info-userscript/issues
// @downloadURL  https://github.com/chirag127/youtube-codec-info-userscript/raw/main/youtube-codec-info-userscript.user.js
// @updateURL    https://github.com/chirag127/youtube-codec-info-userscript/raw/main/youtube-codec-info-userscript.user.js
// @grant        none
// @noframes
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";

  let box = null;
  let running = false;

  function el(tag, css, text) {
    const n = document.createElement(tag);
    if (css) Object.assign(n.style, css);
    if (text != null) n.textContent = text;
    return n;
  }

  function ensureBox() {
    if (box) return;
    box = el("div", {
      position: "fixed", bottom: "10px", left: "10px", zIndex: 2147483647,
      background: "rgba(0,0,0,0.75)", color: "#fff", font: "12px/1.3 ui-monospace,Consolas,monospace",
      padding: "8px 10px", borderRadius: "6px", border: "1px solid #065fd4",
      pointerEvents: "none", userSelect: "none"
    });
    document.body.append(box);
  }

  function fmt(n) { return n == null ? "—" : n; }

  function tick() {
    ensureBox();
    const v = document.querySelector("video");
    if (!v) {
      box.textContent = "No video element";
      return;
    }
    const vp9 = MediaSource.isTypeSupported("video/mp4; codecs=vp09.00.51.08");
    const avc1 = MediaSource.isTypeSupported("video/mp4; codecs=avc1.42E01E");
    const lines = [
      "codec H.264(avc1): " + (avc1 ? "supported" : "blocked"),
      "codec VP9(vp09):  " + (vp9 ? "supported" : "blocked"),
      "resolution: " + fmt(v.videoWidth) + "x" + fmt(v.videoHeight),
      "readyState: " + fmt(v.readyState),
      "paused: " + fmt(v.paused),
      "error: " + fmt(v.error ? v.error.message : "none"),
      "currentTime: " + (v.currentTime ? v.currentTime.toFixed(1) : "—") + "s",
    ];
    box.innerHTML = lines.map((l) => el("div", null, l).outerHTML).join("");
  }

  function start() {
    if (running) return;
    running = true;
    tick();
    setInterval(tick, 1000);
  }

  // Toggle with Alt+C (guarded against typing)
  document.addEventListener("keydown", (e) => {
    const a = document.activeElement;
    if (!a) return;
    const t = (a.tagName || "").toUpperCase();
    if (t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || a.isContentEditable) return;
    if (e.altKey && (e.key === "c" || e.key === "C")) {
      e.preventDefault();
      if (box) { box.remove(); box = null; running = false; }
      else { start(); }
    }
  }, true);

  // Auto-show on video pages
  setTimeout(start, 2000);
})();
