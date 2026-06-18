/*!
 * dh-protect.js — ownership credit + copy/tamper detection (canonical source)
 * © 2026 Dylon Hernandez. All rights reserved. Proprietary, not for reuse. See LICENSE.
 *
 * Three tiers in one file:
 *   1. Always prints an ownership credit to the console (travels with copied source).
 *   2. On a domain NOT in `allow`, fires a one-time beacon to `beacon` so the
 *      owner is alerted that a copy is running somewhere ("we come up").
 *   3. On an unauthorized domain AND when a real allow-list is configured, shows
 *      a visible "unauthorized copy" watermark.
 *
 * Configure by setting window.__DH_PROTECT__ = { ... } BEFORE this script runs.
 * Safe by design: never throws into the host app, zero dependencies, never nags
 * on localhost/file://, and never shows the watermark unless an authorized domain
 * is known (so it cannot false-flag your own first deploy).
 */
;(function () {
  "use strict";
  var CFG = (typeof window !== "undefined" && window.__DH_PROTECT__) || {};
  var OWNER = CFG.owner || "Dylon Hernandez";
  var ENTITY = CFG.entity || "";
  var SITE = CFG.site || "";
  var ALLOW = Array.isArray(CFG.allow) ? CFG.allow : [];
  var BEACON = CFG.beacon || "";
  var WATERMARK = CFG.watermark !== false;
  var APP = CFG.app || (typeof document !== "undefined" && document.title) || "app";
  var YEAR = new Date().getFullYear();

  if (typeof location === "undefined") return;
  var host = (location.hostname || "").toLowerCase();
  var isLocal = host === "" || host === "localhost" || host === "127.0.0.1" ||
    host === "0.0.0.0" || /\.local$/.test(host) || location.protocol === "file:";

  // Tier 1: always credit
  try {
    console.log(
      "%c " + APP + " ",
      "background:#D97757;color:#fff;font-weight:700;border-radius:3px;padding:1px 4px",
      "© " + YEAR + " " + OWNER + (ENTITY ? " / " + ENTITY : "") +
      ". All rights reserved." + (SITE ? "  " + SITE : "")
    );
  } catch (e) {}

  if (isLocal) return;

  var ok = false;
  for (var i = 0; i < ALLOW.length; i++) {
    var a = String(ALLOW[i]).toLowerCase().replace(/^\*\./, "");
    if (host === a || host.slice(-(a.length + 1)) === "." + a) { ok = true; break; }
  }
  if (ok) return;

  // ---- unauthorized domain from here ----

  // Tier 2: phone home once per session
  try {
    if (BEACON && BEACON.indexOf("PASTE_") === -1) {
      var skey = "__dhp_seen_" + APP;
      if (!sessionStorage.getItem(skey)) {
        sessionStorage.setItem(skey, "1");
        var body = JSON.stringify({
          app: APP, host: host, url: location.href,
          referrer: document.referrer || "", at: new Date().toISOString()
        });
        if (navigator.sendBeacon) {
          try { navigator.sendBeacon(BEACON, body); }
          catch (e2) { fetch(BEACON, { method: "POST", mode: "no-cors", keepalive: true, body: body }).catch(function () {}); }
        } else {
          fetch(BEACON, { method: "POST", mode: "no-cors", keepalive: true, body: body }).catch(function () {});
        }
      }
    }
  } catch (e) {}

  // Tier 3: visible watermark, only when a real authorized domain is known
  try {
    if (WATERMARK && ALLOW.length > 0) {
      var paint = function () {
        if (!document.body || document.querySelector("[data-dh-protect]")) return;
        var bar = document.createElement("div");
        bar.setAttribute("data-dh-protect", "1");
        bar.textContent = "Unauthorized copy. Original work © " + YEAR + " " + OWNER + (SITE ? "  ·  " + SITE : "");
        bar.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:2147483647;background:#D97757;color:#fff;font:600 13px/1.45 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:11px 16px;text-align:center;letter-spacing:.2px;box-shadow:0 -2px 14px rgba(0,0,0,.28)";
        document.body.appendChild(bar);
      };
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", paint);
      else paint();
    }
  } catch (e) {}
})();
