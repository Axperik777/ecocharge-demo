'use strict';
// Optional libraries are loaded only by the feature that needs them.
window.ecoLoadLibrary = (() => {
  const pending = new Map();
  const libraries = {
    qr: ['assets/qrcode-2.0.4.js', () => typeof window.qrcode==='function'],
    map: ['assets/leaflet.js', () => Boolean(window.L)],
    pdf: ['assets/jspdf.umd.min.js', () => Boolean(window.jspdf)],
    stellar: ['assets/stellar-wallet-providers.min.js', () => Boolean(window.EcoStellarProviders?.freighter&&window.EcoStellarProviders?.lobstr&&window.EcoStellarProviders?.albedo), 'sha384-plbZaU/j21d2ABqoDBhO2W+VptBzpMiD93U+q0QS8GuZcIC/jeWvgb8goYJGJjRJ']
  };
  return name => {
    if (!Object.hasOwn(libraries,name)) return Promise.reject(new Error('Unknown library'));
    const [src, ready, integrity] = libraries[name];
    if (ready()) return Promise.resolve();
    if (pending.has(name)) return pending.get(name);
    const promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const finish = error => {clearTimeout(timer); script.onload = script.onerror = null; if (error) {script.remove(); reject(error);} else resolve();};
      const timer = setTimeout(() => finish(new Error('Library load timed out')), 15000);
      script.src = new URL(src, document.baseURI).href;
      if (integrity) {script.integrity = integrity; script.crossOrigin = 'anonymous';}
      script.onload = () => finish(ready() ? null : new Error('Library unavailable'));
      script.onerror = () => finish(new Error('Library could not load'));
      document.head.append(script);
    }).catch(error => {pending.delete(name); throw error;});
    pending.set(name, promise);
    return promise;
  };
})();
