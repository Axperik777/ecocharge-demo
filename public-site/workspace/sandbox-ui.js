'use strict';
(()=>{
 const s=window.EcoSandbox,staff=location.pathname.includes('/crm/'),t=(en,ru)=>window.EcoLocale?.language==='ru'?ru:en,esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const url=(route,uid,role)=>new URL(route+'/?lang='+(window.EcoLocale?.language||'ru')+(uid?'&client='+encodeURIComponent(uid):'')+(route==='crm'?'&role='+(role|| (s.role==='ftd'?'manager':'admin')):''),document.baseURI).href;
 const dialog=document.createElement('dialog');dialog.className='sandbox-dialog';dialog.setAttribute('aria-labelledby','sandbox-title');document.body.append(dialog);
 const close=()=>dialog.close();
 function panel(title,body){dialog.innerHTML='<header><h2 id="sandbox-title">'+title+'</h2><button type="button" data-sb-close aria-label="'+t('Close','Закрыть')+'">×</button></header>'+body;if(!dialog.open)dialog.showModal();}
 function controls(){const db=s.read(),clients=Object.values(db.accounts);panel(t('Workspace controls','Управление просмотром'),'<p>'+t('Changes stay in this browser. Balances are simulated; no real transfers.','Изменения сохраняются в этом браузере. Баланс учебный, реальные переводы не выполняются.')+'</p><label>'+t('Client','Клиент')+'<select id="sandbox-client">'+clients.map(a=>'<option value="'+a.client.id+'" '+(a.client.id===s.clientId?'selected':'')+'>'+esc(a.client.name)+'</option>').join('')+'</select></label><div class="sandbox-actions"><button data-sb-open>'+t('Open client account','Открыть кабинет клиента')+'</button><a href="'+url('crm',null,'admin')+'">'+t('CRM / Admin','CRM / Администратор')+'</a><a href="'+window.ECO_PLATFORM_CONFIG.websiteBase+'?lang='+(window.EcoLocale?.language||'ru')+'">'+t('Website','Сайт')+'</a></div><label>'+t('CRM role','Роль в CRM')+'<select id="sandbox-role"><option value="admin" '+(s.role==='admin'?'selected':'')+'>'+t('Administrator','Администратор')+'</option><option value="ftd" '+(s.role==='ftd'?'selected':'')+'>'+t('Manager','Менеджер')+'</option></select></label><div class="sandbox-actions"><button data-sb-role>'+t('Apply role','Применить роль')+'</button><button class="sandbox-secondary" data-sb-reset>'+t('Reset all sample data','Сбросить все учебные данные')+'</button></div><p role="status" id="sandbox-status"></p>');}
 const menu=document.createElement('button');menu.type='button';menu.className='sandbox-control';menu.setAttribute('aria-label',t('Workspace controls','Управление просмотром'));menu.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 17h16M8 4v6m8 4v6"/></svg>';menu.addEventListener('click',controls);
 if(staff){document.querySelector('.central-header').append(menu);const signout=document.querySelector('#central-signout');if(signout)signout.hidden=true;}
 else{menu.classList.add('sandbox-client-control');document.body.append(menu);document.body.classList.add('sandbox-client');}
 function selected(){return document.querySelector('.wf-list-row [data-client][aria-pressed="true"]')?.dataset.client;}
 function enhance(){
  menu.setAttribute('aria-label',t('Workspace controls','Управление просмотром'));
  if(!staff)return;const actions=document.querySelector('[data-profile]')?.parentElement,uid=selected();if(actions&&uid&&!actions.querySelector('[data-sb-client]')){const open=document.createElement('a');open.className='crm-button outline';open.dataset.sbClient=uid;open.href=url('client',uid);open.textContent=t('Open account ↗','Открыть кабинет ↗');actions.append(open);if(s.role==='admin'){const remove=document.createElement('button');remove.type='button';remove.className='crm-button outline sandbox-danger';remove.dataset.sbDelete=uid;remove.textContent=t('Remove client','Удалить клиента');actions.append(remove);}}
  const notice=document.querySelector('#central-notice');if(notice&&/Аккаунт создан\. Передайте|Account created\. Share/.test(notice.textContent))notice.textContent=t('Account created. Use “Open account” in the client card.','Аккаунт создан. Нажмите «Открыть кабинет» в карточке клиента.');
  const password=document.querySelector('#central-create [name=password]');if(password){password.value='LocalExample2026';const label=password.closest('label');if(label)label.style.display='none';}
 }
 new MutationObserver(enhance).observe(document.querySelector('#central-main')||document.body,{childList:true,subtree:true});
 if(staff)new MutationObserver(enhance).observe(document.querySelector('#central-dialog-body'),{childList:true,subtree:true});
 document.addEventListener('click',async e=>{
  const b=e.target.closest('[data-sb-close],[data-sb-open],[data-sb-role],[data-sb-reset],[data-sb-reset-confirm],[data-sb-delete],[data-sb-delete-confirm],[data-sb-client]');if(!b)return;
  try{
   if(b.hasAttribute('data-sb-close'))close();
   if(b.hasAttribute('data-sb-client'))s.select(b.dataset.sbClient);
   if(b.hasAttribute('data-sb-open')){const uid=dialog.querySelector('#sandbox-client').value;s.select(uid);location.assign(url('client',uid));}
   if(b.hasAttribute('data-sb-role')){const role=dialog.querySelector('#sandbox-role').value;s.setRole(role);location.assign(url('crm',null,role==='ftd'?'manager':'admin'));}
   if(b.hasAttribute('data-sb-reset'))panel(t('Reset sample data?','Сбросить учебные данные?'),'<p>'+t('Your local clients, transactions and posts will be replaced by the initial examples.','Созданные в этом браузере клиенты, операции и публикации будут заменены исходными примерами.')+'</p><button data-sb-reset-confirm>'+t('Reset','Сбросить')+'</button>');
   if(b.hasAttribute('data-sb-reset-confirm')){s.reset();location.assign(url(staff?'crm':'client'));}
   if(b.hasAttribute('data-sb-delete')){const a=s.read().accounts[b.dataset.sbDelete];panel(t('Remove client?','Удалить клиента?'),'<p>'+esc(a.client.name)+'</p><p>'+t('The client disappears from this local workspace. The initial examples can be restored with Reset.','Клиент исчезнет из этого браузерного просмотра. Исходные примеры можно вернуть сбросом данных.')+'</p><button class="sandbox-danger" data-sb-delete-confirm="'+a.client.id+'">'+t('Remove client','Удалить клиента')+'</button>');}
   if(b.hasAttribute('data-sb-delete-confirm')){await s.request('staff/clients/'+b.dataset.sbDeleteConfirm+'/delete','POST');location.reload();}
  }catch(error){let el=dialog.querySelector('[role=status]');if(!el){el=document.createElement('p');el.setAttribute('role','status');dialog.append(el);}el.textContent=error.message;}
 });
 document.addEventListener('ecocharge:locale',enhance);enhance();
})();
