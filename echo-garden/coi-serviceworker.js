/* coi-serviceworker — adds Cross-Origin-Opener-Policy / Cross-Origin-Embedder-Policy
   headers via a service worker so Godot web exports work on GitHub Pages.
   Based on https://github.com/gzuidhof/coi-serviceworker (MIT) */

if (typeof window === 'undefined') {
  // ── Service-worker context ──────────────────────────────────────────────────
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

  self.addEventListener('fetch', e => {
    // Skip opaque "only-if-cached" requests that would throw in SW
    if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') return;

    e.respondWith(
      fetch(e.request)
        .then(response => {
          if (response.status === 0) return response;
          const headers = new Headers(response.headers);
          headers.set('Cross-Origin-Opener-Policy', 'same-origin');
          headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
          return new Response(response.body, {
            status:     response.status,
            statusText: response.statusText,
            headers,
          });
        })
        .catch(() => fetch(e.request))
    );
  });

} else {
  // ── Page context — register this script as the service worker ───────────────
  (() => {
    if (window.crossOriginIsolated) return; // already isolated, nothing to do

    if (!('serviceWorker' in navigator)) {
      console.warn('coi-serviceworker: service workers not supported in this browser');
      return;
    }

    const swSrc = document.currentScript ? document.currentScript.src : 'coi-serviceworker.js';

    navigator.serviceWorker
      .register(swSrc)
      .then(reg => {
        // Wait for the SW to become active, then reload so headers take effect
        if (reg.active) {
          location.reload();
          return;
        }
        (reg.installing || reg.waiting).addEventListener('statechange', ev => {
          if (ev.target.state === 'activated') location.reload();
        });
      })
      .catch(err => console.error('coi-serviceworker: registration failed', err));
  })();
}
