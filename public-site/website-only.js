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
  function previewMenu() {
    const nav=document.querySelector('#site-menu nav');
    if(nav&&!nav.querySelector('[data-preview-menu]')){const a=document.createElement('a');a.dataset.previewMenu='';a.setAttribute('translate','no');nav.prepend(a);}
    const ru=window.EcoLocale?.language==='ru';document.querySelectorAll('[data-preview-menu]').forEach(a=>{a.href=new URL('cabinet/client/?lang='+(ru?'ru':'en'),base).href;const label=ru?'Кабинет':'Client account';if(a.textContent!==label)a.innerHTML='<span><strong>'+label+'</strong></span><span aria-hidden="true">↗</span>';});
  }
  function updateNotes() {
    previewMenu();
    document.querySelectorAll('[data-website-only-note]').forEach(el => { if (el.textContent !== note()) el.textContent = note(); });
    const ru=window.EcoLocale?.language==='ru';
    document.querySelectorAll('[data-preview-entry]').forEach(el=>{el.innerHTML='<h3>'+(ru?'Посмотрите, как устроен кабинет':'Explore the client account')+'</h3><p>'+(ru?'Проекты, история начислений, оборудование и лента EcoGrid в одном месте.':'Projects, account history, equipment and the EcoGrid feed in one place.')+'</p><a class="ec-button" href="'+new URL('cabinet/client/?lang='+(ru?'ru':'en'),base).href+'">'+(ru?'Открыть кабинет':'Open account preview')+' →</a>';});
    const access=document.querySelector('#request-access>div:first-child');
    if(access){access.setAttribute('translate','no');access.innerHTML='<h2>'+(ru?'Следующий шаг — ваш кабинет':'Your next step: the client account')+'</h2><p>'+(ru?'Посмотрите путь клиента после регистрации: выбор проекта, расчёты и общение с командой.':'Explore the journey after registration: project selection, calculations and communication with the team.')+'</p>';}
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
    for(const child of form.children)if(child!==message)child.hidden=true;
    const entry=document.createElement('div');entry.dataset.previewEntry='';entry.setAttribute('translate','no');form.prepend(entry);
    form.addEventListener('submit', event => { event.preventDefault(); event.stopImmediatePropagation(); updateNotes(); }, true);
  });
  updateNotes();
  document.addEventListener('ecocharge:locale', updateNotes);
  new MutationObserver(rows => {rows.forEach(row => row.addedNodes.forEach(removeWorkspaceLinks));previewMenu();}).observe(document.body, {childList:true, subtree:true});
})();
