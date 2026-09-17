'use strict';

// Context travels with a demo inquiry; nothing is sent to an external service.
const contactTopics={general:'General question',plan:'Help choosing a plan',station:'Station details',documents:'Documents & ownership',account:'Account request',call:'Callback request'};
let contactDraft=null,inboxFilter='all';
const contactDate=value=>new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}).format(new Date(value));
const unreadReplies=()=>demo.tickets.filter(t=>t.reply&&t.readReply!==t.reply).length;
function inquiryContext(topic){
  const draft=topic==='plan'&&tab==='tariffs';
  const p=draft?demo.tariffs.find(t=>t.id===chosenTier):demo.plan;
  const amount=draft?investmentDraft:demo.plan?.capital;
  return {entry:tab,topic,stationId:topic==='station'?selected?.id:null,stationName:topic==='station'?selected?.name:null,plan:p?.name||null,capital:Number.isFinite(amount)?amount:null,rate:p?.rate||null,stationIds:draft?chosenStations.slice():demo.plan?.stationIds.slice()||[]};
}
function contextMarkup(c){if(!c)return '';return `<div class="inquiry-context">${icon(c.stationId?'pin':'file')}<div><strong>${escapeHtml(c.stationName||c.plan&&c.plan+' demo plan'||contactTopics[c.topic]||'Account discussion')}</strong><small>${c.stationId?'AFDC '+c.stationId+' · ':''}${c.plan?escapeHtml(c.plan)+' · ':''}${c.capital?money(c.capital)+' total · ':''}${c.rate?c.rate+'% / demo week':'Your manager will see this context.'}</small></div></div>`}
function configuredChannels(){const m=demo.manager;return `<div class="contact-channel-links">${[['email','Email','mail'],['whatsapp','WhatsApp','phone'],['telegram','Telegram','chat']].map(([key,label,i])=>`<button type="button" data-contact="${key}">${icon(i)}<span>${label}<small>${m[key]?'Open channel':'Demo placeholder'}</small></span>${icon('out')}</button>`).join('')}</div>`}
function contactComposer(topic='general',context=null){
  ensureManager();
  const c=context||inquiryContext(topic),isCall=topic==='call';
  const suggested={plan:'Please help me compare the plans and understand the assumptions.',station:'Please tell me more about this location and the evidence of investment rights.',documents:'Please explain the agreement, company ownership evidence and the next steps.',account:'I have a question about my demo account.',call:''};
  const sameDraft=contactDraft?.topic===topic&&JSON.stringify(contactDraft.context)===JSON.stringify(c);
  const message=sameDraft?contactDraft.message:(window.EcoLocale?.t(suggested[topic]||'')||suggested[topic]||'');
  openModal(`<div class="contact-eyebrow">YOUR ACCOUNT MANAGER</div><h2>${isCall?'Request a conversation':contactTopics[topic]||contactTopics.general}</h2><p class="contact-intro">${escapeHtml(demo.manager.name)} will see your question and the selected details.</p>${contextMarkup(c)}<form id="support-form" data-journey="true" data-kind="${isCall?'call':'chat'}"><input type="hidden" id="contact-topic" value="${topic}">${isCall?`<div class="callback-fields"><div><label for="callback-date">Preferred date</label><input id="callback-date" name="date" type="date" min="${window.EcoChargeCallback?.today('America/New_York')||new Date().toLocaleDateString('en-CA')}" required></div><div><label for="callback-time">Preferred time</label><input id="callback-time" name="time" type="time" required></div></div><label for="callback-zone">Time zone</label><select id="callback-zone" name="timeZone"><option value="America/New_York">Eastern Time · New York</option><option value="America/Chicago">Central Time · Chicago</option><option value="America/Denver">Mountain Time · Denver</option><option value="America/Los_Angeles">Pacific Time · Los Angeles</option><option value="America/Phoenix">Arizona · Phoenix</option><option value="Pacific/Honolulu">Hawaii · Honolulu</option></select><p class="form-hint">This requests a time; it does not confirm an appointment.</p>`:''}<label for="support-message">${isCall?'What would you like to discuss?':'Your question'}</label><textarea id="support-message" name="message" maxlength="1500" rows="4" placeholder="What would help you take the next step?" required>${escapeHtml(message)}</textarea><div class="form-error" role="alert" id="support-error"></div><button class="button primary" type="submit">${isCall?'Request demo callback':'Send to my manager'} ${icon('arrow')}</button><p class="form-hint">Local demo inbox. No real message or call is sent.</p></form><button class="text-button conversation-link" data-action="conversations">View my conversations ${icon('arrow')}</button>`);
  $('#support-form')._context=c;
  $('#support-message').addEventListener('input',()=>{contactDraft={topic,context:c,message:$('#support-message').value}});
}
function threadMessages(t){return t.messages?.length?t.messages:[{from:'client',text:t.message,date:t.date},...(t.reply?[{from:'manager',text:t.reply,date:t.repliedAt||t.date}]:[])]}
function showConversations(){
  ensureManager();
  openModal(`<div class="contact-eyebrow">YOUR ACCOUNT MANAGER</div><h2>Conversations</h2><p>Questions, replies and callback requests in one place.</p><div class="conversation-list">${demo.tickets.length?demo.tickets.slice().reverse().map(t=>`<button class="conversation-summary" data-thread="${escapeHtml(t.id)}"><span><strong>${escapeHtml(t.subject)}</strong><small>${escapeHtml((t.reply||t.message).slice(0,130))}</small><time>${contactDate(t.date)}</time></span><span class="pill ${t.status==='Open'?'pending':''}">${t.service?.closed?'Closed':t.reply&&t.readReply!==t.reply?'New reply':t.status==='Open'?'Awaiting reply':t.reply?'Answered':'Closed'}</span></button>`).join(''):'<div class="empty-state">No conversations yet.<br>Ask about a station, a plan or your documents.</div>'}</div><button class="button primary" data-contact-topic="general">Ask a question ${icon('chat')}</button>`);
}
function showThread(id){
  const t=demo.tickets.find(t=>t.id===id);if(!t)return;
  if(t.reply){t.readReply=t.reply;persist()}
  openModal(`<div class="contact-eyebrow">${escapeHtml(t.id)} · DEMO CONVERSATION</div><h2>${escapeHtml(t.subject)}</h2>${contextMarkup(t.context)}<div class="thread-messages">${threadMessages(t).map(m=>`<article class="thread-bubble ${m.from==='manager'?'from-manager':''}"><strong>${m.from==='manager'?escapeHtml(demo.manager.name):'You'}</strong><p>${escapeHtml(m.text)}</p><time>${contactDate(m.date)}</time></article>`).join('')}</div>${t.service?.closed?'<p class="thread-status">This conversation is closed. Send a follow-up to reopen it.</p>':t.status==='Open'?'<p class="thread-status">Awaiting a manager reply in this demo.</p>':''}<form id="followup-form" data-ticket="${escapeHtml(t.id)}"><label for="followup-message">Continue the conversation</label><textarea id="followup-message" rows="3" maxlength="1500" required placeholder="Add a question…"></textarea><div class="form-error" role="alert"></div><button class="button primary" type="submit">Send follow-up ${icon('arrow')}</button></form><button class="text-button" data-action="conversations">All conversations</button>`);
}
actions.conversations=showConversations;
actions.chat=showConversations;
actions.message=()=>contactComposer('general');
actions.call=()=>contactComposer('call');
actions['guided-support']=()=>contactComposer('plan');
supportModal=kind=>kind==='chat'?showConversations():contactComposer(kind==='call'?'call':'general');
actions.manager=()=>{
  ensureManager();openModal(`<div class="contact-eyebrow">YOUR ACCOUNT MANAGER</div><h2>${escapeHtml(demo.manager.name)}</h2><p>Choose what you need help with.</p><div class="contact-topic-grid">${[['plan','Compare plans','zap'],['station','Discuss this station','pin'],['documents','Review documents','file'],['call','Request a call','phone']].map(([topic,label,i])=>`<button data-contact-topic="${topic}">${icon(i)}<span>${label}</span>${icon('arrow')}</button>`).join('')}</div><button class="button primary" data-action="conversations">My conversations ${unreadReplies()?`· ${unreadReplies()} new`:''} ${icon('chat')}</button>${configuredChannels()}<p class="form-hint">Demo manager profile. Contact links activate when real details are added in Staff console.</p>`)
};
const originalContactManager=contactManager;
contactManager=function(channel){if(!demo.manager[channel]){openModal(`<h2>${channel==='email'?'Email':channel==='whatsapp'?'WhatsApp':'Telegram'} · demo channel</h2><p>The manager’s real contact has not been added yet. Try the complete conversation flow in the demo inbox.</p><button class="button primary" data-contact-topic="general">Write in demo inbox ${icon('chat')}</button>${role==='admin'?'<button class="button secondary" data-action="manager-settings">Add contact details</button>':''}`);return}originalContactManager(channel)};
function renderContactSurfaces(){
  ensureManager();
  let welcome=$('#client-next-step');
  if(!welcome){welcome=document.createElement('section');welcome.id='client-next-step';welcome.className='panel client-next-step';$('.metrics-grid').before(welcome)}
  welcome.hidden=role!=='client'||tab!=='dashboard';
  const unread=unreadReplies(),pending=demo.tickets.filter(t=>t.status==='Open').length;
  welcome.innerHTML=`<div class="next-step-copy"><span class="contact-eyebrow">YOUR ECO-CHARGE WORKSPACE</span><h2>${unread?'Your manager has replied.':demo.plan?'Your demo plan is ready.':'Explore your charging options.'}</h2><p>${unread?'Continue the conversation and review your questions.':demo.plan?'Review your plan, explore its locations or discuss the details.':'Explore real stations and compare a demo plan with your manager.'}</p></div><div class="next-step-actions"><button class="button primary" data-action="${unread?'conversations':demo.plan?'simulate-session':'tariffs'}">${unread?'Read '+unread+' '+(unread===1?'reply':'replies'):demo.plan?'Try one demo week':'Compare demo plans'} ${icon('arrow')}</button><button class="button secondary" data-action="manager">${icon('chat')} Talk to my manager</button></div><div class="next-step-links"><button data-contact-topic="plan">Help me choose</button><button data-contact-topic="documents">Explain the documents</button><button data-contact-topic="call">Request a call</button></div>`;
  let launcher=$('#manager-launcher');if(!launcher){launcher=document.createElement('button');launcher.id='manager-launcher';launcher.className='manager-launcher';launcher.dataset.action='manager';document.body.append(launcher)}
  launcher.hidden=role!=='client';launcher.innerHTML=`${icon('chat')}<span>${unread?'New reply':'My manager'}</span>${unread?`<b>${unread}</b>`:''}`;launcher.setAttribute('aria-label',unread?`${unread} unread manager replies`:'Contact my manager');
  $('#notification-count').textContent=String(role==='admin'?demo.requests.filter(r=>r.status==='Pending').length+pending:unread+demo.requests.filter(r=>r.status==='Pending').length);
  $('#notification-count').hidden=$('#notification-count').textContent==='0';
  const docs=$('#documents-section');if(docs&&!docs.querySelector('[data-contact-topic]'))docs.insertAdjacentHTML('beforeend','<button class="button secondary contextual-contact" data-contact-topic="documents">'+icon('chat')+' Ask about these documents</button>');
  const assets=$('#asset-list-section');if(assets&&!assets.querySelector('[data-contact-topic]'))assets.insertAdjacentHTML('beforeend','<button class="button secondary contextual-contact" data-contact-topic="plan">'+icon('chat')+' Review my selection with my manager</button>');
}
const numbersBeforeContact=renderNumbers;
renderNumbers=function(){numbersBeforeContact();renderContactSurfaces()};
const navBeforeContact=renderNav;
renderNav=function(){navBeforeContact();renderContactSurfaces()};
const tariffsBeforeContact=renderTariffs;
renderTariffs=function(){tariffsBeforeContact();const panel=$('#tariffs-section .allocation-panel');if(panel&&!panel.querySelector('.contextual-contact'))panel.insertAdjacentHTML('beforeend','<button class="button secondary contextual-contact" data-contact-topic="plan">'+icon('chat')+' Discuss this plan</button>');const help=$('#tariffs-section .decision-help');if(help)help.remove()};
supportTable=function(){
  const tickets=demo.tickets.slice().reverse().filter(t=>inboxFilter==='all'||(inboxFilter==='open'?t.status==='Open':t.status!=='Open'));
  return `<section class="panel admin-section" id="manager-inbox"><div class="section-heading"><h2>${icon('chat')} Client conversations</h2><span>${demo.tickets.length} total</span></div><div class="inbox-filters">${[['all','All'],['open','Awaiting reply'],['replied','Replied']].map(([id,label])=>`<button data-inbox-filter="${id}" aria-pressed="${inboxFilter===id}">${label}</button>`).join('')}</div>${tickets.length?tickets.map(t=>`<article class="ticket-row"><div class="ticket-heading"><strong>${escapeHtml(t.subject)}</strong><span class="pill ${t.status==='Open'?'pending':''}">${t.status==='Open'?'Needs reply':'Replied'}</span></div><small>${escapeHtml(demo.client.name)} · ${contactDate(t.date)}</small>${contextMarkup(t.context)}<p>${escapeHtml(t.message)}</p>${t.reply?`<div class="ticket-last-reply"><strong>Your last reply</strong><p>${escapeHtml(t.reply)}</p></div>`:''}<div class="ticket-actions"><button class="button secondary" data-reply="${escapeHtml(t.id)}">${t.reply?'Continue conversation':'Reply to client'}</button><small>${escapeHtml(t.id)}</small></div></article>`).join(''):'<div class="empty-state">No conversations in this view.</div>'}<button class="button secondary contextual-contact" data-action="manager-compose">${icon('mail')} Start a client conversation</button></section>`;
};
actions['manager-compose']=()=>openModal(`<h2>Message ${escapeHtml(demo.client.name)}</h2><p>Start a conversation in the client’s local demo inbox.</p><form id="manager-message-form"><label for="manager-message-subject">Subject</label><input id="manager-message-subject" maxlength="100" required placeholder="Plan review…"><label for="manager-message-body">Your message</label><textarea id="manager-message-body" maxlength="1500" required rows="4"></textarea><div class="form-error" role="alert"></div><button class="button primary" type="submit">Send demo message</button></form>`);
function messageId(){return 'TKT-'+Date.now().toString(36).toUpperCase()+'-'+Math.random().toString(36).slice(2,6).toUpperCase()}
document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.contactTopic)contactComposer(b.dataset.contactTopic);
  if(b.dataset.thread)showThread(b.dataset.thread);
  if(b.dataset.inboxFilter){inboxFilter=b.dataset.inboxFilter;const old=$('#manager-inbox');old.outerHTML=supportTable()}
  if(b.dataset.reply){if(role!=='admin')return;const t=demo.tickets.find(t=>t.id===b.dataset.reply);if(!t)return;e.stopImmediatePropagation();openModal(`<h2>Reply to ${escapeHtml(demo.client.name)}</h2>${contextMarkup(t.context)}<div class="thread-messages">${threadMessages(t).map(m=>`<article class="thread-bubble ${m.from==='manager'?'from-manager':''}"><strong>${m.from==='manager'?'You':escapeHtml(demo.client.name)}</strong><p>${escapeHtml(m.text)}</p><time>${contactDate(m.date)}</time></article>`).join('')}</div><form id="reply-form" data-ticket="${escapeHtml(t.id)}"><label for="reply-text">Your reply</label><textarea id="reply-text" rows="4" required maxlength="1500"></textarea><div class="form-error" role="alert" id="reply-error"></div><button class="button primary" type="submit">Send reply & resolve</button></form>`)}
},true);
document.addEventListener('submit',e=>{
  const form=e.target;
  if(!form.matches('#support-form[data-journey],#followup-form,#reply-form,#manager-message-form'))return;
  e.preventDefault();e.stopImmediatePropagation();const now=new Date().toISOString();
  if(form.id==='support-form'){
    const message=$('#support-message').value.trim();if(message.length<3){$('#support-error').textContent='Please enter at least 3 characters.';$('#support-message').focus();return}
    const topic=$('#contact-topic').value,isCall=topic==='call';
    const appointment=isCall?{date:$('#callback-date').value,time:$('#callback-time').value,timeZone:$('#callback-zone').value}:null;
    if(isCall){const instant=window.EcoChargeCallback?.validate(appointment);if(!instant){$('#support-error').textContent='Choose a future time in the selected time zone. Avoid an unavailable or repeated daylight-saving time.';return}appointment.instant=instant;}
    const text=isCall?`Preferred callback: ${appointment.date} at ${appointment.time} (${appointment.timeZone}). Time to be confirmed.\n\n${message}`:message;
    const id=messageId();demo.tickets.push({id,subject:contactTopics[topic],context:form._context,message:text,appointment,status:'Open',date:now,reply:'',messages:[{from:'client',text,date:now}]});
    window.EcoChargeDrafts?.clear(form);contactDraft=null;activity(`Client sent ${contactTopics[topic].toLowerCase()}`);persist();
    openModal(`<div class="success-icon">✓</div><h2>${isCall?'Callback request saved':'Your question is in the inbox'}</h2><p>${isCall?'The requested time awaits confirmation.':'Your manager can review your question and the selected details.'}</p>${contextMarkup(form._context)}<div class="modal-note">Demo conversation · saved in this browser. Replies appear in your client inbox.</div><button class="button primary" data-thread="${id}">View my request ${icon('arrow')}</button>`);
  }else if(form.id==='followup-form'){
    const text=$('#followup-message').value.trim(),t=demo.tickets.find(t=>t.id===form.dataset.ticket);if(text.length<3){form.querySelector('.form-error').textContent='Please enter at least 3 characters.';return}if(!t)return;
    t.messages=threadMessages(t);t.messages.push({from:'client',text,date:now});t.message=text;t.status='Open';t.service={...t.service,closed:false};window.EcoChargeDrafts?.clear(form);activity('Client followed up on '+t.id);persist();showThread(t.id);
  }else if(form.id==='reply-form'){
    if(role!=='admin')return;
    const text=$('#reply-text').value.trim(),t=demo.tickets.find(t=>t.id===form.dataset.ticket);if(text.length<3){$('#reply-error').textContent='Enter a reply of at least 3 characters.';return}if(!t)return;
    t.messages=threadMessages(t);t.messages.push({from:'manager',text,date:now});t.reply=text;t.readReply=null;t.repliedAt=now;t.status='Resolved';window.EcoChargeDrafts?.clear(form);activity('Manager replied to '+t.id);persist();$('#modal').close();renderAdmin();toast('Reply saved in the client inbox.');
  }else{
    if(role!=='admin')return;
    const subject=$('#manager-message-subject').value.trim(),text=$('#manager-message-body').value.trim();if(subject.length<3||text.length<3){form.querySelector('.form-error').textContent='Enter a subject and message of at least 3 characters.';return}
    const id=messageId();demo.tickets.push({id,subject,message:'',reply:text,status:'Resolved',date:now,repliedAt:now,messages:[{from:'manager',text,date:now}]});window.EcoChargeDrafts?.clear(form);activity('Manager started conversation '+id);persist();$('#modal').close();renderAdmin();toast('Demo message is visible in the client inbox.');
  }
},true);
actions['contact-show-staff']=()=>{$('#modal').close();adminTab='requests';setRole('admin')};
const managerRefreshBeforeContact=refreshManager;
refreshManager=function(){managerRefreshBeforeContact();renderContactSurfaces()};
const resetBeforeContact=actions['confirm-reset'];
actions['confirm-reset']=()=>{contactDraft=null;inboxFilter='all';resetBeforeContact();renderContactSurfaces()};
renderContactSurfaces();

// The overview already offers direct contact; reveal the floating shortcut after it leaves view.
new IntersectionObserver(entries=>{document.body.classList.toggle('contact-intro-visible',entries[0].isIntersecting)},{threshold:.1}).observe($('#client-next-step'));
function labelMobileTables(){for(const table of $$('#admin-view .table-scroll table')){const labels=[...table.querySelectorAll('thead th')].map(th=>(window.EcoLocale?.sourceText(th)||th.textContent).trim());for(const row of table.querySelectorAll('tbody tr'))[...row.children].forEach((cell,i)=>cell.dataset.label=labels[i]||'')}}
const adminBeforeMobileTables=renderAdmin;
renderAdmin=function(){adminBeforeMobileTables();labelMobileTables()};
document.addEventListener('input',e=>{if(e.target.id==='admin-station-search')queueMicrotask(labelMobileTables)});
