'use strict';
// Installation is a browser feature. No account data or API responses are cached.
(function(root,factory){
 if(typeof module==='object'&&module.exports)module.exports=factory;
 else root.EcoInstallApp=factory(root);
})(typeof window!=='undefined'?window:null,function createInstallApp(env){
 const doc=env.document,nav=env.navigator,mode=env.matchMedia('(display-mode: standalone)');
 const accountRoot=new URL('client/',doc.baseURI),asset=name=>new URL(name,accountRoot).href;
 const t=(en,ru)=>env.EcoLocale?.language==='ru'?ru:en;
 let promptEvent=null,installed=mode.matches||nav.standalone===true,busy=false,dialog=null,opener=null;
 const icon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4M10 18h4M12 8v6m-3-3 3 3 3-3"/></svg>';
 function header(){return installed?'':`<button type="button" class="eco-install-button" data-app-install aria-label="${t('Install EcoGrid app','Установить приложение EcoGrid')}">${icon}<span>${t('Get app','Приложение')}</span></button>`;}
 function card(){return installed?'':`<section class="eco-install-card" translate="no" data-app-install-card><img src="${asset('app-icon-192.png')}" alt="" width="56" height="56"><div><h2>${t('Your account, one tap away.','Кабинет — в одном касании.')}</h2><p>${t('Add EcoGrid to your home screen. Your plan and manager chat in a separate app window.','Добавьте EcoGrid на главный экран. План и чат с менеджером — в отдельном окне приложения.')}</p></div><button type="button" class="eco-button secondary" data-app-install>${t('Install app','Установить приложение')}</button></section>`;}
 function paint(){for(const node of doc.querySelectorAll('[data-app-install], [data-app-install-card]'))node.hidden=installed;}
 function close(){dialog?.close();}
 function open(){
  if(installed)return;
  opener=doc.activeElement;
  if(!dialog){dialog=doc.createElement('dialog');dialog.className='eco-install-dialog';dialog.setAttribute('aria-labelledby','eco-install-title');dialog.setAttribute('translate','no');doc.body.append(dialog);dialog.addEventListener('close',()=>{if(opener?.isConnected)opener.focus();});}
  const ios=/iPhone|iPad|iPod/i.test(nav.userAgent)||(nav.platform==='MacIntel'&&nav.maxTouchPoints>1);
  const local=['localhost','127.0.0.1','[::1]'].includes(env.location.hostname);
  const steps=ios?[
   t('Open this account in Safari.','Откройте кабинет в Safari.'),
   t('Tap Share, then Add to Home Screen.','Нажмите «Поделиться», затем «На экран “Домой”».'),
   t('If shown, enable Open as Web App, then tap Add.','Если есть переключатель «Открывать как веб-приложение», включите его и нажмите «Добавить».')
  ]:[t('Open this account in Chrome or Edge on your phone.','Откройте кабинет в Chrome или Edge на телефоне.'),t('In the browser menu, choose Install app or Add to Home screen.','В меню браузера выберите «Установить приложение» или «Добавить на главный экран».'),t('On a computer, look for Install in the address bar or browser menu.','На компьютере ищите «Установить» в адресной строке или меню браузера.')];
  dialog.innerHTML=`<button type="button" class="eco-install-close" data-app-install-close aria-label="${t('Close','Закрыть')}">×</button><img src="${asset('app-icon-192.png')}" width="64" height="64" alt=""><span class="eco-install-eyebrow">EcoGrid APP</span><h2 id="eco-install-title">${t('Keep your account close.','Кабинет всегда под рукой.')}</h2><p>${t('Open your plan, account activity and manager chat from your home screen.','Открывайте план, историю операций и чат с менеджером прямо с главного экрана.')}</p><ol>${steps.map(v=>`<li>${v}</li>`).join('')}</ol><p class="eco-install-note">${t('Internet and sign-in are required. Installation options depend on your browser.','Для работы нужны интернет и вход в аккаунт. Способ установки зависит от браузера.')}</p>${local?`<p class="eco-install-local">${t('Local preview: this address works on this computer only. Phone installation becomes available after the account is hosted at an HTTPS address.','Локальный просмотр: этот адрес работает только на компьютере. Установка на телефон станет доступна после размещения кабинета по HTTPS.')}</p>`:!env.isSecureContext?`<p class="eco-install-local">${t('Open the secure HTTPS version to install.','Для установки откройте защищённую HTTPS-версию.')}</p>`:''}<p class="eco-install-feedback" role="status" data-app-install-feedback></p><button type="button" class="eco-install-primary" data-app-install-prompt ${promptEvent?'':'hidden'}>${t('Install EcoGrid','Установить EcoGrid')}</button>`;
  if(!dialog.open)dialog.showModal();
 }
 async function install(){
  if(!promptEvent||busy||installed)return;
  busy=true;const event=promptEvent;promptEvent=null;
  const button=dialog?.querySelector('[data-app-install-prompt]');if(button)button.disabled=true;
  try{await event.prompt();const result=await event.userChoice;const feedback=dialog?.querySelector('[data-app-install-feedback]');if(feedback)feedback.textContent=result.outcome==='accepted'?t('Installation requested. Follow your browser’s confirmation.','Установка запрошена. Следуйте подтверждению браузера.'):t('You can install later from your browser menu.','Можно установить позже через меню браузера.');}
  catch{const feedback=dialog?.querySelector('[data-app-install-feedback]');if(feedback)feedback.textContent=t('Use your browser menu to install the app.','Для установки воспользуйтесь меню браузера.');}
  finally{busy=false;if(button){button.disabled=false;button.hidden=true;}}
 }
 env.addEventListener('beforeinstallprompt',e=>{e.preventDefault();if(installed)return;promptEvent=e;const b=dialog?.querySelector('[data-app-install-prompt]');if(b)b.hidden=false;});
 env.addEventListener('appinstalled',()=>{installed=true;promptEvent=null;paint();close();});
 mode.addEventListener('change',()=>{installed=mode.matches||nav.standalone===true;paint();if(installed)close();});
 doc.addEventListener('click',e=>{if(e.target.closest('[data-app-install]'))open();else if(e.target.closest('[data-app-install-close]'))close();else if(e.target.closest('[data-app-install-prompt]'))install();});
 function connection(){let banner=doc.querySelector('[data-app-offline]');if(!banner){banner=doc.createElement('div');banner.className='eco-app-offline';banner.setAttribute('data-app-offline','');banner.setAttribute('role','status');banner.setAttribute('translate','no');doc.body.append(banner);}banner.hidden=nav.onLine!==false;banner.textContent=t('Offline · reconnect to refresh your balance and send requests.','Нет сети · подключитесь, чтобы обновить баланс и отправить заявку.');}
 env.addEventListener('online',connection);env.addEventListener('offline',connection);
 // Scope is deliberately limited to client navigation. APIs, chat and CRM pass through untouched.
 if(env.isSecureContext&&nav.serviceWorker)nav.serviceWorker.register(asset('sw.js'),{scope:accountRoot.pathname,updateViaCache:'none'}).catch(()=>{});
 connection();
 if(new URL(env.location.href).searchParams.get('install')==='1'){const ready=()=>open();if(doc.readyState==='loading')doc.addEventListener('DOMContentLoaded',ready,{once:true});else ready();}
 return {header,card,open,install,state:()=>({installed,canPrompt:!!promptEvent,busy})};
});
