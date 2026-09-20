'use strict';
// Optional libraries are loaded only by the feature that needs them.
window.ecoLoadLibrary = (() => {
  const pending = new Map();
  const libraries = {map: ['assets/leaflet.js', () => Boolean(window.L)], pdf: ['assets/jspdf.umd.min.js', () => Boolean(window.jspdf)]};
  return name => {
    const [src, ready] = libraries[name];
    if (ready()) return Promise.resolve();
    if (pending.has(name)) return pending.get(name);
    const promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const finish = error => {clearTimeout(timer); script.onload = script.onerror = null; if (error) {script.remove(); reject(error);} else resolve();};
      const timer = setTimeout(() => finish(new Error('Library load timed out')), 15000);
      script.src = new URL(src, document.baseURI).href;
      script.onload = () => finish(ready() ? null : new Error('Library unavailable'));
      script.onerror = () => finish(new Error('Library could not load'));
      document.head.append(script);
    }).catch(error => {pending.delete(name); throw error;});
    pending.set(name, promise);
    return promise;
  };
})();
