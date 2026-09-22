'use strict';
// Translate presentation only. IDs, financial data, station records and user input stay unchanged.
(()=>{
 const key='ecocharge-locale',valid=v=>v==='ru'?'ru':'en';
 let language='en';try{language=valid(localStorage.getItem(key))}catch{}
 const requested=new URL(location.href).searchParams.get('lang');if(['en','ru'].includes(requested)){language=requested;try{localStorage.setItem(key,language)}catch{}}
 const messages=window.ECOCHARGE_RU||{},normalize=s=>s.replace(/\s+/g,' ').trim();
 const lower=new Map(Object.entries(messages).map(([k,v])=>[k.toLowerCase(),v]));
 const templates=Object.entries(messages).filter(([k])=>/\{\d+\}/.test(k)).sort((a,b)=>b[0].replace(/\{\d+\}/g,'').length-a[0].replace(/\{\d+\}/g,'').length).map(([k,v])=>{const slots=[];const parts=k.split(/(\{\d+\})/),numeric=/^\{0\} (?:stations?|locations?|ports?|weeks?|photos?|real locations|DC ports?|new repl(?:y|ies)|unread(?: replies)?|total|conversations|weekly illustration)\b/.test(k);return {re:new RegExp('^'+parts.map(p=>/^\{\d+\}$/.test(p)?(slots.push(p),numeric&&p==='{0}'?'([+−-]?\\$?[\\d,.]+)':'(.+?)'):p.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('')+'$','i'),value:v,slots};});
 const sources=new WeakMap(),attributes=new WeakMap();
 const skip='script,style,code,pre,textarea,[translate="no"],[data-locale-switch],.brand-lockup,.ec-brand,.leaflet-control-attribution,.thread-bubble p,.conversation-summary small,.ops-ticket>p,.ops-next-action>span,.conversation-message,#profile-name';
 const number=new Intl.NumberFormat('ru-RU'),currency=new Intl.NumberFormat('ru-RU',{style:'currency',currency:'USD'});
 const monthNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 // Only format display text. ISO record IDs, URLs and form values stay unchanged.
 function displayDates(s,locale){if(/^https?:\/\//.test(s.trim()))return s;return s.replace(/(^|[^\w/:-])(\d{4}-\d{2}-\d{2})(?![\w/:-])/g,(match,prefix,iso)=>{const d=new Date(iso+'T12:00:00Z');return Number.isFinite(+d)&&d.toISOString().slice(0,10)===iso?prefix+new Intl.DateTimeFormat(locale,{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(d):match;});}
 function countedRussian(s){const m=s.match(/^(\d[\d,]*) (reference stations?|charging stations?|stations?|locations?|ports?|weeks?|photos?)$/);if(!m)return;const n=Number(m[1].replaceAll(',','')),form=new Intl.PluralRules('ru-RU').select(n),index=form==='one'?0:form==='few'?1:2;
 const nouns=m[2].startsWith('reference')?['станция для примера','станции для примера','станций для примера']:m[2].startsWith('charging')?['зарядная станция','зарядные станции','зарядных станций']:m[2].startsWith('station')?['станция','станции','станций']:m[2].startsWith('location')?['локация','локации','локаций']:m[2].startsWith('port')?['разъём','разъёма','разъёмов']:m[2].startsWith('week')?['неделя','недели','недель']:['фотография','фотографии','фотографий'];return number.format(n)+' '+nouns[index];}
 function numbers(s){
  s=s.replace(/(-?)\$([\d,]+(?:\.\d{1,2})?)/g,(_,minus,n)=>currency.format(Number(minus+n.replaceAll(',',''))));
  s=s.replace(/(\d+)\.(\d+)(?=%)/g,'$1,$2').replace(/\bkWh\b/g,'кВт·ч').replace(/\bkW\b/g,'кВт');
  if(/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s))s=number.format(Number(s.replaceAll(',','')));
  if(/^\d+\.\d+$/.test(s))s=s.replace('.',',');
  s=displayDates(s,'ru-RU');
  s=s.replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2})(?:, (\d{4}))?/g,(_,m,d,y)=>new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'short',...(y?{year:'numeric'}:{}),timeZone:'UTC'}).format(new Date(Date.UTC(Number(y||2026),monthNames.indexOf(m),Number(d)))));
  s=s.replace(/\b(\d{1,2}):(\d{2})\s*(AM|PM)\b/g,(_,h,m,mer)=>String((Number(h)%12)+(mer==='PM'?12:0)).padStart(2,'0')+':'+m).replace(/\bat (?=\d{2}:\d{2})/g,'в ');
  s=s.replace(/\b(Sun|Mon|Tue|Wed|Thu|Fri|Sat), /g,(_,d)=>({Sun:'вс',Mon:'пн',Tue:'вт',Wed:'ср',Thu:'чт',Fri:'пт',Sat:'сб'}[d])+', ');
  return s.replace(/г\.\.(?=\s|$)/g,'г.');
 }
 function translate(source,depth=0){
  const s=normalize(String(source??''));if(!s)return String(source??'');if(language!=='ru')return displayDates(String(source??''),'en-US');
  let result=countedRussian(s)??messages[s];
  if(result===undefined){const v=lower.get(s.toLowerCase());if(v!==undefined)result=s===s.toUpperCase()?v.toUpperCase():v;}
  if(result===undefined&&/[↗→←]$/.test(s)){const end=s.slice(-1);result=translate(s.slice(0,-1).trim(),depth+1)+' '+end;}
  if(result===undefined&&s.startsWith('← '))result='← '+translate(s.slice(2),depth+1);
  if(result===undefined&&depth<3){for(const t of templates){const match=s.match(t.re);if(match){result=t.value.replace(/\{\d+\}/g,slot=>translate(match[t.slots.indexOf(slot)+1],depth+1));break;}}}
  if(result===undefined&&depth<3&&s.includes(' · '))result=s.split(' · ').map(x=>translate(x,depth+1)).join(' · ');
  if(result===undefined)result=s;
  return (String(source).match(/^\s*/)?.[0]||'')+numbers(result)+(String(source).match(/\s*$/)?.[0]||'');
 }
 function ignored(el){return !el||el.closest(skip)||el.isContentEditable;}
 function textNode(node){if(ignored(node.parentElement))return;const current=node.nodeValue;let entry=sources.get(node);if(!entry||current!==entry.output)entry={source:current};const output=translate(entry.source);entry.output=output;sources.set(node,entry);if(current!==output)node.nodeValue=output;}
 function attrs(el){if(ignored(el)&&el.tagName!=='TEXTAREA')return;let entries=attributes.get(el);if(!entries){entries={};attributes.set(el,entries)}for(const name of ['placeholder','aria-label','title','alt','data-label']){if(!el.hasAttribute(name))continue;const current=el.getAttribute(name);let e=entries[name];if(!e||e.output!==current)e={source:current};e.output=language==='ru'?translate(e.source):e.source;entries[name]=e;if(e.output!==current)el.setAttribute(name,e.output);}}
 function localize(root=document.body){if(!root)return;if(root.nodeType===3){textNode(root);return}if(root.nodeType!==1)return;attrs(root);if(ignored(root))return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode:n=>{if(n.nodeType===1&&n.tagName==='TEXTAREA')attrs(n);return n.nodeType===1&&ignored(n)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});while(walker.nextNode()){const n=walker.currentNode;if(n.nodeType===3)textNode(n);else attrs(n);}}
 function controls(){document.querySelectorAll('[data-locale-switch]').forEach(w=>{w.setAttribute('aria-label',language==='ru'?'Язык интерфейса':'Interface language');w.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===language)))});}
 function mount(){const host=document.querySelector('.ec-header-actions')||document.querySelector('.prototype-bar')||document.querySelector('.site-header');if(!host||host.querySelector('[data-locale-switch]'))return;const wrap=document.createElement('div');wrap.className='locale-switch';wrap.dataset.localeSwitch='';wrap.setAttribute('role','group');wrap.innerHTML='<button type="button" data-language="en" lang="en" title="English">EN</button><button type="button" data-language="ru" lang="ru" title="Русский">RU</button>';if(host.classList.contains('ec-header-actions'))host.prepend(wrap);else host.append(wrap);controls();}
 function metadata(){for(const el of document.querySelectorAll('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]')){let e=attributes.get(el);const value=el.content;if(!e||value!==e.output)e={source:value};e.output=translate(e.source);attributes.set(el,e);el.content=e.output;}}
 function set(value,persist=true){language=valid(value);document.documentElement.lang=language==='ru'?'ru':'en-US';document.documentElement.dataset.locale=language;if(persist){try{localStorage.setItem(key,language)}catch{};const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(history.state,'',url);}mount();localize();localize(document.querySelector('title'));metadata();document.querySelectorAll('[data-locale-invalid]').forEach(el=>{el.setCustomValidity('');delete el.dataset.localeInvalid;});controls();document.dispatchEvent(new CustomEvent('ecocharge:locale',{detail:{language}}));}
 function html(value){const template=document.createElement('template');template.innerHTML=value;const box=document.createElement('div');box.append(template.content);localize(box);return box.innerHTML;}
 function sourceText(el){const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let text='';while(walker.nextNode())text+=sources.get(walker.currentNode)?.source||walker.currentNode.nodeValue;return text;}
 window.EcoLocale={get language(){return language},get locale(){return language==='ru'?'ru-RU':'en-US'},t:translate,set,localize,html,sourceText};
 document.documentElement.lang=language==='ru'?'ru':'en-US';document.documentElement.dataset.locale=language;
 document.addEventListener('click',e=>{const b=e.target.closest('[data-language]');if(b)set(b.dataset.language)});
 window.addEventListener('storage',e=>{if(e.key===key)set(e.newValue,false)});
 document.addEventListener('invalid',e=>{const el=e.target;if(!el.setCustomValidity)return;el.setCustomValidity('');const v=el.validity;let text=v.valueMissing?(el.type==='checkbox'?'Please confirm this field.':'Please fill out this field.'):v.typeMismatch?'Please enter a valid value.':v.rangeUnderflow?`Enter a value of at least ${el.min}.`:v.rangeOverflow?`Enter a value no greater than ${el.max}.`:v.tooShort?`Enter at least ${el.minLength} characters.`:v.stepMismatch?'Please use the allowed numeric step.':'';if(text){el.setCustomValidity(translate(text));el.dataset.localeInvalid='true';}},true);
 document.addEventListener('input',e=>{if(e.target.dataset.localeInvalid){e.target.setCustomValidity('');delete e.target.dataset.localeInvalid;}});
 function ready(){mount();set(language,false);let pending=new Set(),queued=false;const observer=new MutationObserver(records=>{for(const r of records){if(r.type==='childList')r.addedNodes.forEach(n=>pending.add(n));else pending.add(r.target);}if(!queued){queued=true;queueMicrotask(()=>{queued=false;const work=pending;pending=new Set();for(const n of work)if(n.isConnected)localize(n);});}});observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title','alt','data-label']});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
