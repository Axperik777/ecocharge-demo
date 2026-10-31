'use strict';
(()=>{
 const t=(en,ru)=>window.EcoLocale?.language==='ru'?ru:en;
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const date=v=>v?new Date(v).toLocaleString(window.EcoLocale?.locale||'en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}):'';
 const icon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9l-5 3v-3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M7 9h10M7 13h6"/></svg>';
 let staff=false,started=false,stopped=false,timer=null,busy=false,sending=false,epoch=0,host=null,dialog=null,selected=null,rows=[],current=null,search='',lastMarkup='';
 const requests=new Set();let localePending=false,onInbox=null;
 const drafts=new Map(),attempts=new Map(),readCursors=new Map();
 const key=()=>selected?selected.clientId+'/'+(selected.id||'new'):'';
 const root=()=>staff?host:dialog;
 const visible=()=>!document.hidden&&(staff?host?.isConnected:dialog?.open);
 async function api(route,method='GET',body){
  const controller=new AbortController();requests.add(controller);const deadline=setTimeout(()=>controller.abort(),8000);
  try{const response=await fetch(new URL('api/'+route,document.baseURI),{method,credentials:'same-origin',signal:controller.signal,headers:{'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
   const result=await response.json();if(!response.ok){const error=Error(result.error||'Chat unavailable');error.status=response.status;throw error;}return result;
  }finally{clearTimeout(deadline);requests.delete(controller);}
 }
 const route=(uid=selected?.clientId)=>staff?'staff/clients/'+encodeURIComponent(uid)+'/chat':'client/chat';
 function status(text,error=false){const node=root()?.querySelector('[data-chat-status]');if(node){if(!error&&node.dataset.sendError==='true')return;node.textContent=text;node.classList.toggle('is-error',error);}}
 function remember(){const input=root()?.querySelector('[data-chat-input]');if(input&&selected)drafts.set(key(),input.value);}
 function frame(){return `<section class="ec-chat-thread"><header class="ec-chat-header"><div class="ec-chat-avatar" aria-hidden="true"><img src="assets/ecocharge-mark.svg" width="28" height="28" alt=""></div><div><small>${t('PRIVATE CONVERSATION','ЛИЧНАЯ ПЕРЕПИСКА')}</small><h2 data-chat-name>${t('Live chat','Чат с командой')}</h2><p data-chat-owner></p></div></header><div class="ec-chat-history" role="log" aria-label="${t('Conversation history','История переписки')}" aria-live="polite" aria-relevant="additions text" tabindex="0"></div><form class="ec-chat-compose"><label class="ec-chat-label" for="ec-chat-message">${t('Your message','Ваше сообщение')}</label><textarea id="ec-chat-message" data-chat-input rows="3" maxlength="1500" required placeholder="${staff?t('Write to the client…','Напишите клиенту…'):t('Write to your manager…','Напишите своему менеджеру…')}"></textarea><div class="ec-chat-sendrow"><span data-chat-status role="status"></span><button class="ec-chat-send" type="submit">${t('Send','Отправить')} <span aria-hidden="true">↗</span></button></div></form></section>`;}
 function paintFrame(){
  if(!root())return;const target=staff?host.querySelector('[data-chat-thread]'):dialog.querySelector('[data-chat-thread]');
  target.innerHTML=frame();lastMarkup='';const input=target.querySelector('[data-chat-input]');input.value=drafts.get(key())||'';
  const form=target.querySelector('form');form.addEventListener('submit',send);input.addEventListener('input',()=>{remember();target.querySelector('[data-chat-status]').dataset.sendError='false';});
  target.querySelector('.ec-chat-history').addEventListener('scroll',()=>markVisible());
 }
 function choose(row){remember();selected={clientId:row.clientId,id:row.id};current=null;epoch++;paintFrame();paintList();refresh();}
 function paintList(){
  const list=root()?.querySelector('[data-chat-list]');if(!list)return;
  const filtered=rows.filter(r=>(r.clientName+' '+r.subject+' '+(r.ownerName||'')).toLowerCase().includes(search.toLowerCase()));
  const markup=filtered.map(r=>`<button type="button" data-chat-pick="${esc(r.clientId+'/'+r.id)}" class="ec-chat-row ${selected?.clientId===r.clientId&&selected?.id===r.id?'is-selected':''}" aria-current="${selected?.clientId===r.clientId&&selected?.id===r.id?'true':'false'}"><span class="ec-chat-row-top"><strong translate="no">${esc(staff?r.clientName:r.subject)}</strong>${r.unread?`<b class="ec-chat-count">${r.unread}</b>`:''}</span><small>${esc(staff?r.subject:date(r.last?.date))}</small><span class="ec-chat-preview" translate="no">${esc(r.last?.text||'')}</span><span class="ec-chat-row-foot"><time>${date(r.last?.date)}</time>${staff&&r.awaitingReply?`<em>${t('Awaiting reply','Ждёт ответа')}</em>`:''}</span></button>`).join('')||`<p class="ec-chat-empty">${t('No conversations yet. Client messages will appear here.','Переписки пока нет. Здесь появятся сообщения клиентов.')}</p>`;
  if(list.innerHTML!==markup)list.innerHTML=markup;
 }
 function paint(payload){
  if(!root()||!selected)return;current=payload;
  const target=root().querySelector('[data-chat-thread]'),thread=payload.threads.find(r=>r.id===selected.id);
  if(!target?.querySelector('.ec-chat-header'))paintFrame();
  target.querySelector('[data-chat-name]').textContent=staff?payload.client.name:payload.manager?.name||t('Support','Поддержка');
  target.querySelector('[data-chat-owner]').textContent=staff?(thread?.subject||t('Live chat','Чат с командой'))+' · '+t('Manager: ','Менеджер: ')+(payload.manager?.name||'—'):t('Your assigned manager','Ваш закреплённый менеджер');
  target.querySelector('.ec-chat-avatar').textContent=(staff?payload.client.name:payload.manager?.name||'EC').split(/\s+/).slice(0,2).map(s=>s[0]).join('');
  const history=target.querySelector('.ec-chat-history'),list=thread?.messages||[];
  const markup=list.map(m=>{const mine=staff?m.from!=='client':m.from==='client';return `<article class="ec-chat-bubble ${mine?'is-mine':''}" data-message-id="${esc(m.id)}"><small translate="no">${esc(m.authorName||(m.from==='client'?payload.client.name:t('Support team','Команда поддержки')))}</small><p translate="no">${esc(m.text)}</p><time datetime="${esc(m.date)}">${date(m.date)}</time></article>`;}).join('')||`<div class="ec-chat-welcome">${icon}<h3>${t('A direct line to your manager','Прямая связь с вашим менеджером')}</h3><p>${t('Ask about your plan, account or next step. Your message is saved, even if your manager is away.','Задайте вопрос о плане, кабинете или следующем шаге. Сообщение сохранится, даже если менеджер сейчас не в сети.')}</p></div>`;
  if(markup!==lastMarkup){const bottom=history.scrollHeight-history.scrollTop-history.clientHeight<90||!lastMarkup;history.innerHTML=markup;lastMarkup=markup;if(bottom)history.scrollTop=history.scrollHeight;}
  markVisible();
 }
 async function markVisible(){
  if(!visible()||!current||!selected)return;
  const thread=current.threads.find(r=>r.id===selected.id),history=root()?.querySelector('.ec-chat-history');
  if(!thread?.messages.length||!history||history.scrollHeight-history.scrollTop-history.clientHeight>90)return;
  const sequence=thread.messages.at(-1).sequence,k=key();if((readCursors.get(k)||0)>=sequence)return;
  readCursors.set(k,sequence);
  try{await api(route()+'/read','POST',{clientId:selected.clientId,ticketId:thread.id,sequence});}catch{readCursors.delete(k);}
 }
 function badges(){
  const count=rows.reduce((n,r)=>n+r.unread,0);
  if(staff)onInbox?.();
  document.querySelectorAll('[data-chat-count]').forEach(node=>{node.textContent=count||'';node.hidden=!count;});
  const alert=document.querySelector('#central-chat-alert');if(alert){const waiting=rows.filter(r=>r.awaitingReply).length;alert.innerHTML=count||waiting?`<button type="button" class="ec-chat-alert" data-tab="chats">${icon}<span>${count?t('Unread messages: ','Непрочитанных сообщений: ')+count:t('Clients awaiting a reply: ','Ждут ответа: ')+waiting}</span><span aria-hidden="true">→</span></button>`:'';}
 }
 async function refresh(){
  if(stopped||busy||sending||document.hidden)return;busy=true;const version=epoch;
  try{
   if(staff){const inbox=await api('staff/chats');if(stopped||version!==epoch)return;rows=inbox.threads;badges();paintList();
    if(host?.isConnected){
     if(selected&&!rows.some(r=>r.clientId===selected.clientId&&r.id===selected.id)){remember();selected=null;current=null;host.querySelector('[data-chat-thread]').innerHTML=`<p class="ec-chat-empty">${t('Choose a conversation. Access follows the current client assignment.','Выберите переписку. Доступ зависит от текущего закрепления клиента.')}</p>`;}
     if(!selected&&rows.length){selected={clientId:rows[0].clientId,id:rows[0].id};paintFrame();paintList();}
     if(selected){const payload=await api(route());if(!stopped&&version===epoch){paint(payload);status(t('Messages update automatically','Сообщения обновляются автоматически'));}}
    }
   }else{
    const payload=await api('client/chat');if(stopped||version!==epoch)return;
    if(payload.client.id!==window.ECO_SHARED_CONTEXT.client.id){dialog?.close();stop();return;}
    rows=payload.threads.map(r=>({...r,clientId:payload.client.id,clientName:payload.client.name,last:r.messages.at(-1)}));badges();
    if(visible()){
     if(!selected){selected={clientId:payload.client.id,id:payload.threads.find(r=>r.channel==='live-chat')?.id||null};paintFrame();}
     paintList();paint(payload);status(t('Messages update automatically','Сообщения обновляются автоматически'));
    }
   }
  }catch(error){
   if(version!==epoch||stopped)return;
   status(error.status===401?t('Session ended. Sign in again.','Сессия завершена. Войдите снова.'):t('Connection lost. Reconnecting… Your draft is saved here.','Нет связи. Подключаемся… Черновик сохранён в этом окне.'),true);
   if(staff&&[401,403].includes(error.status)&&host){host.querySelector('[data-chat-thread]').innerHTML=`<p class="ec-chat-empty">${t('Conversation access ended.','Доступ к переписке завершён.')}</p>`;selected=null;current=null;}
   if(error.status===401)stop();
  }finally{busy=false;}
 }
 async function send(event){
  event.preventDefault();event.stopPropagation();if(!selected)return;
  const form=event.currentTarget,input=form.querySelector('[data-chat-input]'),text=input.value.trim();if(!text||input.disabled)return;
  const k=key(),destination={...selected},version=++epoch;sending=true;
  let attempt=attempts.get(k);if(!attempt||attempt.text!==text){attempt={id:'MSG-'+crypto.randomUUID(),text,ticketId:destination.id,clientId:destination.clientId};attempts.set(k,attempt);}
  input.disabled=true;form.querySelector('button').disabled=true;form.querySelector('[data-chat-status]').dataset.sendError='false';status(t('Sending…','Отправка…'));
  try{
   const payload=await api(route(destination.clientId),'POST',attempt);drafts.delete(k);attempts.delete(k);
   if(version!==epoch||stopped)return;
   input.value='';selected.id=payload.sentTicketId;paint(payload);status(t('Message saved','Сообщение сохранено'));refresh();
  }catch(error){if(version===epoch&&!stopped){status(error.status===403?t('Client assignment changed. Message was not sent.','Закрепление изменилось. Сообщение не отправлено.'):t('Could not confirm delivery. Press Send to retry safely.','Не удалось подтвердить доставку. Нажмите «Отправить» для повторной попытки.'),true);form.querySelector('[data-chat-status]').dataset.sendError='true';}}
  finally{sending=false;input.disabled=false;form.querySelector('button').disabled=false;if(version===epoch&&visible())input.focus();if(localePending){localePending=false;localize();}}
 }
 function start(){if(started)return;started=true;stopped=false;timer=setInterval(refresh,2000);refresh();}
 function stop(){stopped=true;epoch++;clearInterval(timer);timer=null;started=false;for(const request of requests)request.abort();remember();}
 function initStaff(options={}){staff=true;onInbox=options.onChange||onInbox;start();}
 function selectThread(clientId,ticketId){remember();selected={clientId,id:ticketId};current=null;epoch++;if(host?.isConnected){paintFrame();paintList();}refresh();}
 function mount(target){staff=true;start();if(host===target&&target.querySelector('.ec-chat-workspace'))return;remember();host=target;epoch++;
  host.innerHTML=`<div class="ec-chat-title"><h1>${t('Conversations','Чаты')}</h1><p>${t('Your clients. One conversation at a time.','Переписка с закреплёнными клиентами.')}</p></div><div class="ec-chat-workspace"><aside class="ec-chat-inbox"><label class="ec-chat-search">${t('Find a conversation','Найти переписку')}<input type="search" data-chat-search placeholder="${t('Client name or subject','Имя клиента или тема')}"></label><div data-chat-list></div></aside><div data-chat-thread><p class="ec-chat-empty">${t('Choose a conversation to reply.','Выберите переписку, чтобы ответить.')}</p></div></div>`;
  host.querySelector('[data-chat-search]').value=search;host.querySelector('[data-chat-search]').addEventListener('input',e=>{search=e.target.value;paintList();});if(selected)paintFrame();paintList();refresh();
 }
 function unmount(){if(!host)return;remember();host=null;epoch++;current=null;}
 function open(){
  if(staff||!dialog)return;start();if(!dialog.open)dialog.showModal();refresh();
 }
 function initClient(){
  if(!window.ECO_SHARED_CONTEXT||dialog)return;
  const button=document.createElement('button');button.type='button';button.className='ec-chat-launch';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','ec-live-chat');button.innerHTML=icon+'<span>'+t('Live chat','Чат с командой')+'</span><b data-chat-count hidden></b>';button.addEventListener('click',open);document.body.append(button);
  dialog=document.createElement('dialog');dialog.id='ec-live-chat';dialog.className='ec-chat-dialog';dialog.setAttribute('aria-label',t('Chat with your manager','Чат с вашим менеджером'));
  dialog.innerHTML=`<div class="ec-chat-top"><strong>${t('Live chat','Чат с командой')}</strong><button type="button" data-chat-conversations>${t('History','История')}</button><button type="button" data-chat-close aria-label="${t('Close chat','Закрыть чат')}">×</button></div><div data-chat-list hidden></div><div data-chat-thread><p class="ec-chat-empty" data-chat-status role="status">${t("Connecting…","Подключаемся…")}</p></div>`;document.body.append(dialog);
  dialog.querySelector('[data-chat-close]').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',remember);
  dialog.querySelector('[data-chat-conversations]').addEventListener('click',()=>{const list=dialog.querySelector('[data-chat-list]');list.hidden=!list.hidden;paintList();});
  if(typeof actions==='object')actions.chat=open;
  start();
 }
 function localize(){
  if(sending){localePending=true;return;}remember();
  if(dialog){dialog.setAttribute('aria-label',t('Chat with your manager','Чат с вашим менеджером'));dialog.querySelector('[data-chat-close]').setAttribute('aria-label',t('Close chat','Закрыть чат'));dialog.querySelector('[data-chat-conversations]').textContent=t('History','История');}
  if(selected&&root()){paintFrame();if(current)paint(current);}paintList();badges();
 }
 document.addEventListener('ecocharge:locale',localize);
 document.addEventListener('click',event=>{if(event.target.closest('[data-open-live-chat]'))open();const pick=event.target.closest('[data-chat-pick]');if(pick){const row=rows.find(r=>r.clientId+'/'+r.id===pick.dataset.chatPick);if(row){choose(row);if(!staff)dialog.querySelector('[data-chat-list]').hidden=true;}}
  if(event.target.closest('#central-signout,[data-action="logout"],[data-action="signout"]'))stop();
 });
 document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInterval(timer);timer=null;}else if(started&&!stopped){if(!timer)timer=setInterval(refresh,2000);refresh();}});
 window.addEventListener('pagehide',stop);
 window.EcoSupportChat={initStaff,mount,unmount,open,stop,initClient,selectThread,inbox:()=>rows.slice(),count:()=>rows.reduce((n,r)=>n+r.unread,0)};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initClient,{once:true});else initClient();
})();
