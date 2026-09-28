'use strict';
// This file is included only in the public GitHub Pages export.
(() => {
  if (!window.ECO_PLATFORM_CONFIG?.websiteOnly) return;
  const excluded = /^(?:client|login|register|team|staff|crm)(?:\/|$)/;
  const base = new URL('./', document.baseURI);
  const note = () => window.EcoLocale?.language === 'ru'
    ? 'Приём заявок на этой версии сайта не подключён. Данные не отправляются.'
    : 'Online requests are not connected on this version of the site. No details are sent.';
  function removeWorkspaceLinks(root) {
    const links = [...(root.matches?.('a[href]') ? [root] : []), ...(root.querySelectorAll?.('a[href]') || [])];
    for (const a of links) {
      const u = new URL(a.getAttribute('href'), base);
      if (u.origin === base.origin && u.pathname.startsWith(base.pathname) && excluded.test(u.pathname.slice(base.pathname.length))) a.remove();
    }
  }
  function updateNotes() {
    document.querySelectorAll('[data-website-only-note]').forEach(el => { if (el.textContent !== note()) el.textContent = note(); });
  }
  removeWorkspaceLinks(document);
  document.querySelectorAll('[data-lead-form]').forEach(form => {
    const message = document.createElement('p');
    message.className = 'lead-hint';
    message.dataset.websiteOnlyNote = '';
    message.setAttribute('translate', 'no');
    message.setAttribute('role', 'status');
    form.prepend(message);
    form.querySelectorAll('[type="submit"],[name="name"],[name="phone"],[name="email"],[name="consent"],[name="smsConsent"],[name="emailConsent"]').forEach(el => { el.disabled = true; });
    form.addEventListener('submit', event => { event.preventDefault(); event.stopImmediatePropagation(); updateNotes(); }, true);
  });
  updateNotes();
  document.addEventListener('ecocharge:locale', updateNotes);
  new MutationObserver(rows => rows.forEach(row => row.addedNodes.forEach(removeWorkspaceLinks))).observe(document.body, {childList:true, subtree:true});
})();
