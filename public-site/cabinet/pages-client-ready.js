'use strict';
(()=>{
 const notice=()=>openModal('<h2>'+ (window.EcoLocale?.language==='ru'?'Просмотр кабинета':'Account preview')+'</h2><p>'+escapeHtml(window.EcoPagesMessage())+'</p>');
 const style=document.createElement('style');style.textContent='.role-switch{display:none!important}';document.head.append(style);
 const copy=()=>{document.querySelectorAll('.cab-local-note').forEach(el=>el.textContent=window.EcoPagesMessage());};
 const previous=renderClientTab;renderClientTab=function(){previous();copy();};
 actions.signout=()=>location.assign(window.ECO_PLATFORM_CONFIG.websiteBase+'?lang='+(window.EcoLocale?.language||'en'));
 actions.reset=()=>location.reload();
 document.addEventListener('click',event=>{const target=event.target.closest('[data-open-live-chat],[data-action="chat"],[data-action="message"],[data-action="call"],[data-role="admin"]');if(target){event.preventDefault();event.stopImmediatePropagation();notice();}},true);
 document.addEventListener('submit',event=>{event.preventDefault();event.stopImmediatePropagation();notice();},true);
 document.addEventListener('ecocharge:locale',copy);copy();
})();
