'use strict';
(()=>{
 const lang=()=>window.EcoLocale?.language==='ru',t=(en,ru)=>lang()?ru:en;let pause=false;try{pause=localStorage.getItem('ecogrid-guide-motion')==='paused';}catch{}
 function motion(){document.documentElement.dataset.guideMotion=pause?'paused':'on';document.querySelectorAll('[data-eco-motion]').forEach(b=>{b.setAttribute('aria-pressed',String(pause));b.textContent=pause?t('Resume animation','Включить анимацию'):t('Pause animation','Остановить анимацию');});}
 const dialog=document.getElementById('eco-guide-dialog'),opener=document.querySelector('[data-open-eco-guide]');opener?.addEventListener('click',()=>dialog?.showModal());dialog?.querySelector('[data-close-eco-guide]')?.addEventListener('click',()=>dialog.close());dialog?.addEventListener('close',()=>opener?.focus());
 document.addEventListener('click',e=>{if(e.target.closest('[data-eco-motion]')){pause=!pause;try{localStorage.setItem('ecogrid-guide-motion',pause?'paused':'on');}catch{}motion();}});document.addEventListener('ecocharge:locale',motion);motion();
})();
