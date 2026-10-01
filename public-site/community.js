'use strict';
(()=>{
 const dialog=document.querySelector('#community-pending');let opener;
 document.addEventListener('click',e=>{const a=e.target.closest('[data-community-target]');if(!a)return;
  if(a.hasAttribute('data-community-pending')){e.preventDefault();opener=a;const helper=a.closest('dialog');if(helper?.open){helper.close();opener=document.querySelector('[data-open-eco-guide]');}dialog?.showModal();return;}
  window.EcoChargeFunnel?.track('community_outbound_clicked',{page:document.documentElement.dataset.page,destination:a.dataset.communityTarget});
 });
 document.addEventListener('click',e=>{const a=e.target.closest('[data-app-entry]');if(a)window.EcoChargeFunnel?.track('app_entry_clicked',{page:document.documentElement.dataset.page,destination:a.dataset.appEntry});});
 dialog?.querySelector('[data-community-close]').addEventListener('click',()=>dialog.close());
 dialog?.addEventListener('close',()=>opener?.focus());
})();
