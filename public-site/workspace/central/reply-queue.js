(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.EcoReplyQueue=factory();})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function items(threads,owner=''){return threads.filter(r=>r.awaitingReply&&(!owner||r.owner===owner)).slice().sort((a,b)=>(Date.parse(a.awaitingSince||a.last?.date)||0)-(Date.parse(b.awaitingSince||b.last?.date)||0)||a.id.localeCompare(b.id));}
 function list(threads,{owner='',language='en',now=Date.now()}={}){
  const t=(en,ru)=>language==='ru'?ru:en,rows=items(threads,owner);
  if(!rows.length)return `<p class="wf-reply-empty" role="status">${owner?t('No clients awaiting a reply from this manager.','У этого менеджера нет обращений без ответа.'):t('No clients awaiting a reply. New messages and callback requests will appear here.','Обращений без ответа нет. Здесь появятся новые сообщения и запросы звонка.')}</p>`;
  return rows.map(r=>{const received=r.awaitingSince||r.last?.date,minutes=Math.max(0,Math.floor((now-(Date.parse(received)||now))/60000)),elapsed=minutes<1?t('Just received','Только что'):minutes<60?minutes+t(' min waiting',' мин ожидания'):Math.floor(minutes/60)+t(' h ',' ч ')+(minutes%60)+t(' min waiting',' мин ожидания');
   return `<article class="wf-reply-row"><div class="wf-reply-person"><strong translate="no">${esc(r.clientName)}</strong><small>${t('Manager','Менеджер')}: <span translate="no">${esc(r.ownerName)}</span></small></div><div class="wf-reply-message"><span class="wf-reply-topic">${r.kind==='callback'?t('Callback requested','Запрос звонка'):esc(r.subject||t('Message','Сообщение'))}</span><p translate="no">${esc(r.last?.text)}</p>${r.appointment?`<small>${t('Requested time','Желаемое время')}: ${esc(r.appointment.date)} ${esc(r.appointment.time)} · ${esc(r.appointment.timeZone)} · ${t('to be confirmed','нужно согласовать')}</small>`:''}</div><div class="wf-reply-action"><time datetime="${esc(received)}">${elapsed}</time><button class="crm-button primary" data-awaiting-client="${esc(r.clientId)}" data-awaiting-chat="${esc(r.id)}">${t('Reply to client','Ответить клиенту')} <span aria-hidden="true">↗</span></button></div></article>`;
  }).join('');
 }
 return {items,list};
});
