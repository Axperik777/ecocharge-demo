'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const forbiddenVisibleCopy=/(?:\b(?:demo|demonstration|preview|sample|prototype|illustrative|simulated)\b|\bunverified\s+(?:story|legend)\b|(?:^|[^\p{L}\p{N}_])демо(?:[- ]?верси\p{L}*)?(?=$|[^\p{L}\p{N}_])|демонстраци\p{L}*|непроверенн\p{L}*\s+(?:истори|легенд)\p{L}*|пример\p{L}*\s+кабинет\p{L}*|(?:учебн|тестов)\p{L}*\s+(?:стенд|верси|кабинет|легенд)\p{L}*|для\s+иллюстраци\p{L}*|(?:предпросмотр|превью|прототип|иллюстративн|симуляц|симулированн|смоделированн|имитационн|фиктивн)\p{L}*)/iu;
const decodeEntities=value=>String(value).replace(/&nbsp;|&#160;/gi,' ').replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#0*39;|&apos;/gi,"'").replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#([0-9]+);/g,(_,n)=>String.fromCodePoint(Number(n)));
const normalizeVisible=value=>decodeEntities(String(value).replace(/<[^>]*>/g,' ').replace(/\$\{[^}]*\}/g,' ')).replace(/\\(?:r?n|t)/g,' ').replace(/\\u\{([0-9a-f]+)\}/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/\\u([0-9a-f]{4})/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/\\x([0-9a-f]{2})/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/\\(['"`\\])/g,'$1').replace(/\s+/g,' ').trim();
const tokenOnly=value=>/^(?:https?:|data:|mailto:|tel:|[#./[]|[a-z][a-z0-9+.-]*:)/i.test(value)||(!/[\sА-Яа-яЁё]/u.test(value)&&/^[\w./:?&=#%+@~\[\]-]+$/u.test(value));
function visibleViolation(value){
 const raw=String(value).trim(),text=normalizeVisible(value);
 if(!text||!forbiddenVisibleCopy.test(text))return '';
 const markupRemainder=raw.replace(/<[^>]*>/g,' ').replace(/<[^>]*$/g,' ').replace(/^[^<]*\b(?:data-[\w-]+|class|id|src|href|value|accept)\s*=\s*[^>]*>/i,' ').trim();
 if(!markupRemainder&&/(?:data-[\w-]+|class\s*=|id\s*=|src\s*=|href\s*=|value\s*=|accept\s*=)/i.test(raw))return '';
 if(!raw.includes('>')&&/^<\/?[a-z][^>]*(?:class|src|href|value|data-[\w-]+)\s*=/i.test(raw))return '';
 if(!raw.includes('>')&&/[<>=]/.test(raw)&&/(?:data-[\w-]+|class\s*=|id\s*=|src\s*=|href\s*=|value\s*=|accept\s*=)/i.test(raw)&&!/[.!?](?:\s|<|$)/.test(raw))return '';
 if(tokenOnly(text)&&!/^(?:Demo|DEMO|Demonstration|DEMONSTRATION|Preview|PREVIEW|Sample|SAMPLE|Prototype|PROTOTYPE|Illustrative|ILLUSTRATIVE|Simulated|SIMULATED|Демо|ДЕМО|Предпросмотр|ПРЕДПРОСМОТР|Прототип|ПРОТОТИП)$/u.test(text))return '';
 return text;
}
function assertVisibleValue(value,label){const hit=visibleViolation(value);if(hit)assert.fail('Visible release marker in '+label+': '+hit.slice(0,240));}
function htmlVisibleParts(html){
 const source=String(html).replace(/<!--[\s\S]*?-->/g,' '),parts=[];
 parts.push(source.replace(/<(?:script|style)\b[^>]*>[\s\S]*?<\/(?:script|style)>/gi,' ').replace(/<[^>]+>/g,' '));
 for(const match of source.matchAll(/\b(?:alt|aria-label|title|placeholder|value)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi))parts.push(match[1]??match[2]??'');
 return parts;
}
const regexAfterWord=new Set(['return','throw','case','delete','typeof','void','new','in','instanceof','yield','await']);
function skipQuoted(text,i,quote){for(i++;i<text.length;){const ch=text[i++];if(ch==='\\')i++;else if(ch===quote)break;}return i;}
function skipRegex(text,i){let inClass=false;for(i++;i<text.length;){const ch=text[i++];if(ch==='\\')i++;else if(ch==='[')inClass=true;else if(ch===']')inClass=false;else if(ch==='/'&&!inClass)break;else if(ch==='\n'||ch==='\r')break;}while(/[a-z]/i.test(text[i]||''))i++;return i;}
function skipTemplate(text,i){for(i++;i<text.length;){if(text[i]==='\\'){i+=2;continue;}if(text[i]==='`')return i+1;if(text[i]==='$'&&text[i+1]==='{'){const end=findExpressionEnd(text,i+2);i=end<text.length?end+1:text.length;continue;}i++;}return i;}
function findExpressionEnd(text,i){
 let depth=1,canStartRegex=true;
 while(i<text.length){const ch=text[i];
  if(/\s/.test(ch)){i++;continue;}
  if(ch==='/'&&text[i+1]==='/'){i+=2;while(i<text.length&&text[i]!=='\n')i++;continue;}
  if(ch==='/'&&text[i+1]==='*'){i+=2;while(i<text.length&&!(text[i]==='*'&&text[i+1]==='/'))i++;i+=2;continue;}
  if(ch==='/'&&canStartRegex){i=skipRegex(text,i);canStartRegex=false;continue;}
  if(ch==="'"||ch==='"'){i=skipQuoted(text,i,ch);canStartRegex=false;continue;}
  if(ch==='`'){i=skipTemplate(text,i);canStartRegex=false;continue;}
  if(/[A-Za-z_$]/.test(ch)){const start=i++;while(/[\w$]/.test(text[i]||''))i++;canStartRegex=regexAfterWord.has(text.slice(start,i));continue;}
  if(/[0-9]/.test(ch)){i++;while(/[\w.]/.test(text[i]||''))i++;canStartRegex=false;continue;}
  if(ch==='{'){depth++;canStartRegex=true;i++;continue;}
  if(ch==='}'){if(--depth===0)return i;canStartRegex=false;i++;continue;}
  canStartRegex=/[([=,:;!?&|+*%^~<>-]/.test(ch);i++;
 }
 return text.length;
}
function templateValues(text,i){
 const values=[];let value='';
 while(i<text.length){const ch=text[i++];
  if(ch==='\\'&&i<text.length){value+=ch+text[i++];continue;}
  if(ch==='`'){if(value)values.push(value);return {i,values};}
  if(ch==='$'&&text[i]==='{'){if(value)values.push(value);value='';const start=++i,end=findExpressionEnd(text,i);values.push(...literalValues(text.slice(start,end)));i=end<text.length?end+1:text.length;continue;}
  value+=ch;
 }
 if(value)values.push(value);return {i,values};
}
function literalValues(source){
 const values=[],text=String(source);let i=0,canStartRegex=true;
 while(i<text.length){
  if(/\s/.test(text[i])){i++;continue;}
  if(text[i]==='/'&&text[i+1]==='/'){i+=2;while(i<text.length&&text[i]!=='\n')i++;continue;}
  if(text[i]==='/'&&text[i+1]==='*'){i+=2;while(i<text.length&&!(text[i]==='*'&&text[i+1]==='/'))i++;i+=2;continue;}
  if(text[i]==='/'&&canStartRegex){i++;let inClass=false;while(i<text.length){const ch=text[i++];if(ch==='\\'){i++;continue;}if(ch==='[')inClass=true;else if(ch===']')inClass=false;else if(ch==='/'&&!inClass)break;else if(ch==='\n'||ch==='\r')break;}while(/[a-z]/i.test(text[i]||''))i++;canStartRegex=false;continue;}
  const quote=text[i];
  if(quote!=="'"&&quote!=='"'&&quote!=='`'){
   if(/[A-Za-z_$]/.test(quote)){const start=i++;while(/[\w$]/.test(text[i]||''))i++;canStartRegex=regexAfterWord.has(text.slice(start,i));continue;}
   if(/[0-9]/.test(quote)){i++;while(/[\w.]/.test(text[i]||''))i++;canStartRegex=false;continue;}
   canStartRegex=/[({[=,:;!?&|+*%^~<>-]/.test(quote);i++;continue;
  }
  if(quote==='`'){const template=templateValues(text,i+1);values.push(...template.values);i=template.i;canStartRegex=false;continue;}
  i++;let value='';
  while(i<text.length){const ch=text[i++];if(ch==='\\'&&i<text.length){value+=ch+text[i++];continue;}if(ch===quote)break;value+=ch;}
  values.push(value);canStartRegex=false;
 }
 return values;
}
function htmlViolations(html){const values=[...htmlVisibleParts(html)];for(const match of String(html).matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi))values.push(...literalValues(match[1]));return [...new Set(values.map(visibleViolation).filter(Boolean))];}
function assetViolations(source){return [...new Set(literalValues(source).map(visibleViolation).filter(Boolean))];}
function assertHtmlVisibleCopy(html,label){for(const hit of htmlViolations(html))assertVisibleValue(hit,label);}
function assertAssetVisibleCopy(source,label){for(const hit of assetViolations(source))assertVisibleValue(hit,label);}
function verifyVisibleFiles(root,files){
 const localeFiles=files.filter(file=>/(?:^|[\\/])locale-(?:en|ru)\.js$/i.test(file)),regularFiles=files.filter(file=>!localeFiles.includes(file)),activeLiterals=new Set();
 for(const file of regularFiles){const rel=path.relative(root,file).replaceAll('\\','/'),source=/\.(?:html|js|json|css)$/.test(file)?fs.readFileSync(file,'utf8'):'';if(file.endsWith('.html')){assertHtmlVisibleCopy(source,rel);for(const value of htmlVisibleParts(source))activeLiterals.add(value);for(const match of source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi))for(const value of literalValues(match[1]))activeLiterals.add(value);}else if(/\.(?:js|json|css)$/.test(file)){assertAssetVisibleCopy(source,rel);for(const value of literalValues(source))activeLiterals.add(value);}}
 for(const file of localeFiles){const rel=path.relative(root,file).replaceAll('\\','/'),context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:rel});const dictionary=context.window.ECOCHARGE_EN||context.window.ECOCHARGE_RU||{};for(const [key,value] of Object.entries(dictionary))if(activeLiterals.has(key))assertVisibleValue(value,rel+' translation for '+key);}
}
function verify(root){
 assert.equal(visibleViolation('<option value="demo"'),'');assert.equal(visibleViolation('" accept="image/jpeg" hidden> <div data-identity-preview="'),'');assert.equal(visibleViolation('<option value="demo">Demo</option>'),'Demo');assert.equal(visibleViolation('<div class="x">Preview</div>'),'Preview');
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'preview-manifest.json')));
 assert.equal(manifest.kind,'workspace-sandbox');assert.equal(manifest.source,'fresh-isolated-fixture');assert.equal(manifest.authentication,false);assert.equal(manifest.apiConnected,false);assert.equal(manifest.realPayments,false);assert.equal(manifest.activeOffer,'charge');assert.equal(manifest.chargeModel,'charge-fixed-obligation-v3');assert.equal(manifest.settlementDays,4);assert.equal(manifest.obligationFunding,'fictional-company-reserve');
 const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]),files=walk(root);
 for(const f of files){const rel=path.relative(root,f).replaceAll('\\','/');assert(!/(?:^|\/)(?:server|private-data|config|node_modules)(?:\/|$)|\.sqlite|\.local\.|\.cjs$|initial-users|\.env|ДОСТУПЫ/i.test(rel),rel);if(/\.(js|html|json)$/.test(f)){const code=fs.readFileSync(f,'utf8');assert(!/https?:\/\/(?:localhost|127\.0\.0\.1)(?=[:/])/.test(code),'Local URL in '+rel);}}
 verifyVisibleFiles(root,files);
 const currentUi=['central/caller-ui.js','central/workspace-model.js','central/energy-brief-ui.js','central/energy-journal.js'].map(file=>fs.readFileSync(path.join(root,file),'utf8')).join('\n');
 assert.doesNotMatch(currentUi,/Record a 4-day accrual|Weekly report available|First closed week|Compare the weekly model|Starting option \/ week|Alternative \/ week|Модель за неделю|Сравнить недельную модель|Недельный отч[её]т|Первая закрытая неделя|No plan periods closed|Monday report|Day \d+ of 7|День \d+ из 7|7-day period|Период 7 дней/i,'Workspace preview contains retired current-state copy');
 assert.match(currentUi,/Compare 4-day obligations/);assert.match(currentUi,/Account report available/);assert.match(currentUi,/First funded 4-day settlement/);
 const c={window:{},structuredClone,crypto,URLSearchParams,console};vm.createContext(c);
 for(const name of ['sandbox-data.js','sandbox-domain.js','sandbox-stations.js','sandbox-model.js'])vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),c,{filename:name});
 const w=c.window,seed=w.ECO_SANDBOX_SEED,m=w.createEcoSandbox(seed,w.EcoSandboxDomain,w.ECO_SANDBOX_STATIONS);assert.equal(seed.schema,2);assert.equal(seed.activeOffer,'charge');assert.equal(seed.chargeModel,'charge-fixed-obligation-v3');assert.equal(seed.settlementDays,4);let db=m.initial(),uid=Object.keys(db.accounts)[0],ctx={clientId:uid,role:'admin'},checks=0;
 const seeded=db.accounts[uid].state;assert.equal(seeded.plan.economyModel,'charge-fixed-obligation-v3');assert.deepEqual(seeded.miningPositions||[],[]);assert.equal(seeded.sessions.length,manifest.completedSettlements);assert.ok(seeded.sessions.length>0);for(const period of seeded.sessions){assert.equal(period.period,'accrual');assert.equal(period.settlementDays,4);assert.equal(period.funded,period.obligation);assert.equal(period.companyPayable,0);assert.equal(period.revenueApplied,0);assert.equal(period.reserveApplied,period.obligation);assert.equal(period.source,'manual_verified_settlement');}
 const request=(p,method='GET',b={})=>{const r=m.execute(db,p,method,b,ctx);if(method!=='GET')db=r.db;checks++;return r.result;};
 const bad=(fn)=>{const before=JSON.stringify(db);assert.throws(fn);assert.equal(JSON.stringify(db),before);checks++;};
 assert(!/"(?:password|token|secret)"\s*:/i.test(JSON.stringify(seed)));
 const opening=db.accounts[uid].state.adjustments.find(v=>v.operationId==='opening-balance');assert(opening);assert(Date.parse(opening.date)<=Date.parse(db.accounts[uid].state.plan.appliedAt));
 for(const route of ['staff/overview','staff/funding-requests','staff/withdrawal-requests','staff/chats','staff/funnel','staff/followups','staff/club','staff/knowledge','staff/community','client/account','client/chat','client/identity','client/plan-document','client/club'])assert(request(route));
 bad(()=>request('public/leads','POST',{name:'Заявка сайта',email:'site@example.com',consent:false}));
 const capacityInput={intent:'capacity',country:'US',company:'Compute QA',workload:'Production AI inference and agents',acceleratorClass:'inference',requestedCapacity:'8 GPUs or 5,000 GPU-hours',term:'1-3-months',budgetUsd:50000,note:'Confirm availability, region, cooling, network and SLA.'};
 bad(()=>w.EcoSandboxDomain.compute.publicInquiry({...capacityInput,requestedCapacity:''}));
 const computeInquiry=w.EcoSandboxDomain.compute.publicInquiry(capacityInput);
 const web=request('public/leads','POST',{name:'Заявка сайта',email:'site@example.com',consent:true,attribution:{utm_source:'qa',utm_campaign:'website-to-crm'},context:{intent:'compute',compute:computeInquiry,journey:{route:'fast',topic:'compute',purpose:'capacity',country:'US'}},emailConsent:true,consentVersion:w.EcoSandboxDomain.compute.consentVersion});
 assert(web.accepted);assert.equal(db.leads[web.id].owner,null);assert.equal(db.leads[web.id].attribution.utm_campaign,'website-to-crm');assert.equal(db.leads[web.id].context.compute.intent,'capacity');assert.equal(db.leads[web.id].context.compute.requestedCapacity,capacityInput.requestedCapacity);assert.equal(db.leads[web.id].context.journey.requestedProject,'compute');
 assert.equal(request('public/leads','POST',{name:'Заявка сайта',email:'site@example.com',consent:true}).id,web.id);
 ctx.role='ftd';assert(!request('staff/overview').leads.some(l=>l.id===web.id));bad(()=>request('staff/leads/'+web.id));bad(()=>request('staff/clients','POST',{leadId:web.id}));ctx.role='admin';
 request('staff/assign','POST',{owner:db.overview.managers[0].id,reason:'Передача с сайта',items:[{kind:'lead',id:web.id,version:db.leads[web.id].crm.version}]});
 ctx.role='ftd';assert(request('staff/overview').leads.some(l=>l.id===web.id));ctx.role='admin';
 const accepted=request('public/leads','POST',{name:'Тест Проверки',email:'qa@example.com',consent:true,attribution:{landing_id:'charge',utm_source:'qa'},context:{journey:{route:'fast',topic:'charge',purpose:'participation',country:'US'}}}),lead=db.leads[accepted.id],owner=db.overview.managers[0].id;
 assert.equal(db.leads[lead.id].context.journey.requestedProject,'charge');
 request('staff/assign','POST',{owner,reason:'Проверка назначения',items:[{kind:'lead',id:lead.id,version:lead.crm.version}]});
 const a=request('staff/clients','POST',{leadId:lead.id,crmVersion:db.leads[lead.id].crm.version,name:'Тест Проверки',username:'check.client',email:'qa@example.com',comment:'Создан для проверки'});ctx.clientId=a.client.id;
 assert.equal(db.accounts[a.client.id].state.journey.requestedProject,'charge');
 let row=request('client/account');assert.equal(row.state.balance,0);
 const beforeMember=JSON.stringify(row.state);const crm=request('staff/clients/'+a.client.id).crm;
 bad(()=>request('staff/clients/'+a.client.id+'/club-membership','POST',{version:crm.version-1,member:true}));
 request('staff/clients/'+a.client.id+'/club-membership','POST',{version:crm.version,member:true});
 assert.equal(request('staff/leads/'+lead.id).crm.clubMember,true);const memberState=request('client/account').state;assert.equal(memberState.academy.clubMember,true);assert.deepEqual({...memberState,academy:undefined},{...JSON.parse(beforeMember),academy:undefined});
 const progress=request('staff/clients/'+a.client.id).crm;
 bad(()=>request('staff/clients/'+a.client.id+'/academy-presentation','POST',{version:progress.version-1,presented:true}));
 request('staff/clients/'+a.client.id+'/academy-presentation','POST',{version:progress.version,presented:true});
 assert.equal(request('client/account').state.academy.presentationComplete,true);assert.equal(request('staff/leads/'+lead.id).crm.presentationComplete,true);
 db=JSON.parse(JSON.stringify(db));assert.equal(request('staff/clients/'+a.client.id).crm.clubMember,true);
 row=request('client/account');
 // Profile preferences survive browser persistence and are visible to the manager.
 const savedProfile={name:'Profile QA',email:'profile@example.test',phone:'',language:'ru',timezone:'America/St_Johns'},beforeProfile=structuredClone(row);
 row=request('client/profile','POST',{clientId:a.client.id,version:row.version,profile:savedProfile});
 assert.equal(row.state.ecosystem.timezone,savedProfile.timezone);assert.equal(row.client.owner,beforeProfile.client.owner);assert.equal(row.client.username,beforeProfile.client.username);assert.deepEqual(row.state.requests,beforeProfile.state.requests);assert.equal(row.state.balance,beforeProfile.state.balance);
 db=JSON.parse(JSON.stringify(db));assert.equal(request('client/account').state.ecosystem.timezone,savedProfile.timezone);assert.equal(request('staff/clients/'+a.client.id).state.ecosystem.timezone,savedProfile.timezone);
 bad(()=>request('client/profile','POST',{clientId:a.client.id,version:row.version,profile:{...savedProfile,timezone:'Asia/Tbilisi'}}));
 bad(()=>request('client/profile','POST',{clientId:'wrong-client',version:row.version,profile:savedProfile}));
 bad(()=>request('client/profile','POST',{clientId:a.client.id,version:beforeProfile.version,profile:savedProfile}));
 const callback=request('client/support','POST',{id:'timezone-call',clientId:a.client.id,version:row.version,message:'Confirm the call time',subject:'Callback',appointment:{date:'2030-01-15',time:'10:00',timeZone:'America/St_Johns'}});
 assert.equal(callback.state.tickets.at(-1).appointment.instant,'2030-01-15T13:30:00.000Z');assert.match(callback.state.tickets.at(-1).message,/America\/St_Johns/);
 row=request('client/account');

 request('staff/clients/'+a.client.id+'/balance','POST',{id:'credit-test',version:row.version,kind:'credit',amount:300,expectedBalance:0,reason:'Учебное пополнение'});
 row=request('client/account');assert.equal(row.state.balance,300);
 bad(()=>request('staff/clients/'+a.client.id+'/balance','POST',{id:'credit-test',version:row.version,kind:'credit',amount:300,expectedBalance:300,reason:'Повтор операции'}));
 bad(()=>request('staff/clients/'+a.client.id+'/balance','POST',{id:'overdraft-test',version:row.version,kind:'debit',amount:301,expectedBalance:300,reason:'Проверка недостатка'}));
 request('staff/clients/'+a.client.id+'/balance','POST',{id:'debit-test',version:row.version,kind:'debit',amount:50,expectedBalance:300,reason:'Учебное списание'});
 row=request('client/account');assert.equal(row.state.balance,250);
 const stale=structuredClone(row),submission=structuredClone(row.state);submission.requests.push({id:'topup-test',type:'topup',amount:100,status:'Pending',payment:{method:'card'}});
 request('client/account','PUT',{clientId:a.client.id,version:row.version,state:submission});assert.equal(request('staff/funding-requests').requests.length,1);
 row=request('client/account');bad(()=>request('staff/clients/'+a.client.id+'/finance','POST',{id:'review-test',kind:'review',version:row.version,requestId:'topup-test',decision:'approve',reason:'Проверка без отметки'}));
 request('staff/clients/'+a.client.id+'/finance','POST',{id:'review-test',kind:'review',version:row.version,requestId:'topup-test',decision:'approve',receiptChecked:true,reason:'Подтверждение модели'});
 assert.equal(request('client/account').state.balance,350);assert.equal(request('staff/funding-requests').requests.length,0);
 bad(()=>request('client/account','PUT',{clientId:a.client.id,version:stale.version,state:stale.state}));
 row=request('client/account');request('staff/clients/'+a.client.id+'/finance','POST',{id:'plan-test',kind:'plan',version:row.version,plan:{tierId:'single',capital:250,stationIds:w.ECO_SANDBOX_STATIONS.filter(s=>!s.selectionClosed).slice(0,3).map(s=>s.id)},reason:'Активация тестового плана'});
 assert.equal(request('client/account').state.balance,100);assert.equal(request('client/account').state.plan.economyModel,'charge-fixed-obligation-v3');assert.equal(request('client/account').nextAccrual.settlementDays,4);assert.equal(request('client/plan-document').plan.capital,250);
 row=request('client/account');request('staff/clients/'+a.client.id+'/energy-brief','POST',{id:'settlement-note',version:row.version,kind:'weekly',text:'Обсудили результат расчёта и следующий шаг.'});
 const brief=request('client/account').state.energyBriefs.at(-1);assert(brief.report);assert(brief.createdAt);assert(brief.authorName);
 request('client/chat','POST',{id:'message-test',text:'Вопрос клиента',clientId:a.client.id});const chat=request('staff/chats').threads.find(t=>t.clientId===a.client.id);assert(chat?.awaitingReply);
 request('staff/clients/'+a.client.id+'/chat','POST',{id:'reply-test',ticketId:chat.id,text:'Ответ менеджера',clientId:a.client.id});assert.equal(request('client/chat').threads.find(t=>t.id===chat.id).messages.at(-1).text,'Ответ менеджера');assert.equal(request('client/account').state.tickets.find(t=>t.id===chat.id).status,'Resolved');assert.equal(request('staff/chats').threads.find(t=>t.id===chat.id).awaitingReply,false);
 const baseline={like:1293,useful:702,interested:2526},welcome=()=>request('client/community').posts.find(p=>p.id==='welcome');
 assert.equal(JSON.stringify(welcome().reactions),JSON.stringify(baseline));
 let reacted=request('client/community/reaction','POST',{postId:'welcome',reaction:'like'});assert.equal(reacted.reactions.like,1294);
 reacted=request('client/community/reaction','POST',{postId:'welcome',reaction:'useful'});assert.equal(reacted.reactions.like,1293);assert.equal(reacted.reactions.useful,703);
 db=JSON.parse(JSON.stringify(db));assert.equal(welcome().myReaction,'useful');
 reacted=request('client/community/reaction','POST',{postId:'welcome',reaction:''});assert.equal(JSON.stringify(reacted.reactions),JSON.stringify(baseline));
 const post=request('staff/community','POST',{titleRu:'Новость',titleEn:'News',bodyRu:'Текст новости',bodyEn:'News text',category:'news',status:'published'});request('client/community/reaction','POST',{postId:post.id,reaction:'useful'});assert.equal(request('staff/community').posts.find(p=>p.id===post.id).reactions.useful,1);
 db=JSON.parse(JSON.stringify(db));assert.equal(request('client/account').state.balance,100);assert.equal(request('client/chat').threads.find(t=>t.id===chat.id).messages.length,2);
 ctx.role='ftd';bad(()=>request('staff/clients/'+a.client.id+'/delete','POST'));ctx.role='admin';request('staff/clients/'+a.client.id+'/delete','POST');assert(!db.accounts[a.client.id]);assert(!db.leads[lead.id].client_id);

 // Long-route interest stays outside the call queue, then an explicit Compute request promotes it without rewriting first touch.
 ctx.role='admin';const slow={route:'nurture',topic:'solar',purpose:'updates',country:'CA'},fast={route:'fast',topic:'compute',purpose:'capacity',country:'CA'},body={name:'Dual Route QA',email:'dual-qa@example.test',consent:true,marketingConsent:true,marketingConsentVersion:w.EcoSandboxDomain.journey.version,context:{journey:slow},attribution:{utm_source:'creator',partner_id:'creator-one',sub_id:'video-one'}};
 bad(()=>request('public/leads','POST',{...body,marketingConsent:false}));const interest=request('public/leads','POST',body);assert.equal(db.leads[interest.id].context.journey.route,'nurture');
 const promoted=request('public/leads','POST',{...body,context:{intent:'compute',compute:{...computeInquiry,country:'CA'},journey:fast},attribution:{utm_source:'email'}});assert.equal(promoted.id,interest.id);assert.equal(db.leads[interest.id].context.journey.entryRoute,'nurture');assert.equal(db.leads[interest.id].context.journey.entryProject??null,null);assert.equal(db.leads[interest.id].context.journey.requestedProject,'compute');assert.equal(db.leads[interest.id].context.journey.firstSource.partner_id,'creator-one');assert.equal(db.leads[interest.id].context.journey.lastSource.utm_source,'email');
 request('staff/assign','POST',{owner,reason:'Consultation requested',items:[{kind:'lead',id:interest.id,version:db.leads[interest.id].crm.version}]});ctx.role='ftd';assert(request('staff/overview').leads.some(l=>l.id===interest.id));
 const next=request('staff/clients','POST',{leadId:interest.id,crmVersion:db.leads[interest.id].crm.version,name:body.name,username:'dual-route',email:body.email,comment:'Requested account'});ctx.clientId=next.client.id;let snapshot=request('client/account');assert.equal(snapshot.state.journey.entryRoute,'nurture');
 const accountCompute={requestType:'compute',intent:'capacity',country:'CA',region:'CA',workload:'inference',acceleratorClass:'general-gpu',requestedCapacity:'4 GPUs reserved',runtime:'reserved',term:'quarterly',dataResidency:'CA',sla:'99.5',security:'private-network',budgetUsd:25000,note:'Account request QA'};
 bad(()=>request('client/equipment','POST',{id:'compute-capacity-missing',clientId:ctx.clientId,version:snapshot.version,equipment:{...accountCompute,requestedCapacity:''},language:'en'}));
 request('client/equipment','POST',{id:'compute-capacity',clientId:ctx.clientId,version:snapshot.version,equipment:accountCompute,language:'en'});assert.equal(db.leads[interest.id].context.journey.topic,'compute');assert.equal(db.leads[interest.id].context.journey.requestedProject,'compute');assert.equal(db.leads[interest.id].context.journey.firstSource.partner_id,'creator-one');assert.equal(db.leads[interest.id].context.compute.requestedCapacity,'4 GPUs reserved');assert.equal(request('client/account').state.subscription.granted,true);ctx.role='admin';
 assert(request('staff/chats').threads.some(t=>t.clientId===ctx.clientId&&t.awaitingReply&&t.equipment?.requestType==='compute'&&t.equipment?.intent==='capacity'));const cohort=request('staff/funnel').journeys.byRoute.find(r=>r.key==='nurture');assert.equal(cohort.contacts,1);assert.equal(cohort.consultations,1);assert.equal(cohort.accounts,1);assert.equal(cohort.paid,0);
 assert.equal(Object.keys(m.initial().accounts).length,1);
 return {ok:true,files:files.length,checks,privateData:false,networkApi:false,localPersistence:true};
}
verify.visibleCopy={assetViolations,assertAssetVisibleCopy,assertHtmlVisibleCopy,htmlViolations,verifyVisibleFiles,visibleViolation};
module.exports=verify;
if(require.main===module)console.log(JSON.stringify(module.exports(path.resolve(process.argv[2]))));
