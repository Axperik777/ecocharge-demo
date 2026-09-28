'use strict';
(()=>{
 const notice=()=>openModal('<h2>'+ (window.EcoLocale?.language==='ru'?'Просмотр кабинета':'Account preview')+'</h2><p>'+escapeHtml(window.EcoPagesMessage())+'</p>');
 const banner=document.createElement('aside');banner.className='pages-client-notice';banner.setAttribute('translate','no');
 const style=document.createElement('style');style.textContent='.pages-client-notice{padding:10px 18px;background:#173b45;color:#d5edf0;display:flex;gap:12px;align-items:center;justify-content:space-between;font:12px/1.5 Manrope,sans-serif}.pages-client-notice a{color:#d4f478;white-space:nowrap}.role-switch{display:none!important}';document.head.append(style);document.body.prepend(banner);
 const copy=()=>{const ru=window.EcoLocale?.language==='ru';banner.innerHTML='<span>'+(ru?'Демонстрационный кабинет · данные примера · операции не отправляются':'Account preview · sample data · no operations are submitted')+'</span><a href="'+window.ECO_PLATFORM_CONFIG.websiteBase+'?lang='+(ru?'ru':'en')+'">'+(ru?'На сайт ↗':'Website ↗')+'</a>';document.querySelectorAll('.cab-local-note').forEach(el=>el.textContent=window.EcoPagesMessage());};
 const previous=renderClientTab;renderClientTab=function(){previous();copy();};
 actions.signout=()=>location.assign(window.ECO_PLATFORM_CONFIG.websiteBase+'?lang='+(window.EcoLocale?.language||'en'));
 actions.reset=()=>location.reload();
 document.addEventListener('click',event=>{const target=event.target.closest('[data-open-live-chat],[data-action="chat"],[data-action="message"],[data-action="call"],[data-role="admin"]');if(target){event.preventDefault();event.stopImmediatePropagation();notice();}},true);
 document.addEventListener('submit',event=>{event.preventDefault();event.stopImmediatePropagation();notice();},true);
 document.addEventListener('ecocharge:locale',copy);copy();
})();
