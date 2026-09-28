(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('../account-finance.js'),require('../business-model.js'));else root.EcoWorkspace=factory(root.EcoFinance,root.EcoBusiness);})(typeof window==='undefined'?globalThis:window,function(finance,business){
 'use strict';
 function overview(a){const s=finance.summary(a),plan=s.draft||s.active;
  const stage=s.pending.length?'pending':s.draft?(s.gap===0?'ready':'draft'):s.active?'active':s.available>0?'funded':'new';
  const action=stage==='pending'?'payment-pending-status':stage==='ready'?'activate-draft':plan?'journey-my-plan':'journey-resume';
  const latest=(a.tickets||[]).slice().sort((a,b)=>Date.parse(b.repliedAt||b.date)-Date.parse(a.repliedAt||a.date))[0]||null;
  return {clubVisible:(a.requests||[]).some(r=>r.type==='topup'&&r.status==='Approved'&&r.receiptChecked===true&&r.amount>0),collapseLab:true,moneyFirst:true,stage,plan,active:s.active,available:s.available,weekly:plan?finance.planWeekly(plan):0,action,latest,unread:(a.tickets||[]).filter(t=>t.reply&&t.readReply!==t.reply).length,
   accountMode:!!(s.active||s.balance>0||s.pending.length),capital:s.capital,reserved:s.reserved,recorded:s.recorded,activeWeekly:s.weekly,pendingFunding:s.pending};
 }
 // Same illustrative unit prices as the public charging-economics example.
 // This lesson has no connection to account credits or the weekly plan rate.
 function session(energyKwh=30){if(!Number.isInteger(energyKwh)||energyKwh<10||energyKwh>80)throw Error('Invalid session example.');return business.session(energyKwh);}
 function exploration(value,stationIds){const v=value&&typeof value==='object'?value:{};const ids=(key,max)=>[...new Set(Array.isArray(v[key])?v[key]:[])].filter(id=>Number.isInteger(id)&&stationIds.has(id)).slice(0,max);return {saved:ids('saved',50),compared:ids('compared',3),recent:ids('recent',12),read:[...new Set(Array.isArray(v.read)?v.read:[])].filter(s=>['guide-0','guide-1','guide-2','documents','session'].includes(s))};}
 function context(value,stationIds){if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid discussion context.');
  const topic=['general','plan','station','documents','account','call','session'].includes(value.topic)?value.topic:'general';
  const ids=Array.isArray(value.stationIds)?value.stationIds:value.stationId?[value.stationId]:[];
  if(ids.length>10||new Set(ids).size!==ids.length||ids.some(id=>!Number.isInteger(id)||!stationIds.has(id)))throw Error('Invalid discussion context.');
  const c={topic,stationIds:ids.slice()};if(Number.isInteger(value.stationId)&&stationIds.has(value.stationId))c.stationId=value.stationId;
  const tier=finance.tiers.find(t=>t.id===value.tierId||t.name===value.plan);
  if(tier&&finance.valid(value.capital)&&finance.eligible(value.capital,tier.id)&&ids.length<=tier.count)Object.assign(c,{tierId:tier.id,plan:tier.name,capital:value.capital,rate:tier.rate,ratePeriod:finance.ratePeriod,weekly:finance.weekly(value.capital,tier.rate),stationCount:tier.count});
  if(value.lesson)c.lesson=session(value.lesson.energyKwh);
  if(value.energy){const e=value.energy;if(!['city','highway','retail','ev','commercial','grid'].includes(e.location)||!Number.isFinite(e.hour)||e.hour<0||e.hour>24||typeof e.peak!=='boolean')throw Error('Invalid model scenario.');c.energy={location:e.location,hour:Math.round(e.hour*100)/100,peak:e.peak,modelVersion:['ev','commercial','grid'].includes(e.location)?business.config.version:'demand-v1'};}
  return c;
 }
 function rows(c,lang='en'){if(!c)return [];const ru=lang==='ru',money=n=>new Intl.NumberFormat(ru?'ru-RU':'en-US',{style:'currency',currency:'USD'}).format(n),r=[];
  if(c.plan)r.push([ru?'Выбор на момент вопроса':'Selection when sent',c.plan+' · '+money(c.capital)],[ru?'Модель за неделю':'Weekly model',money(c.weekly??finance.weekly(c.capital,c.rate))+' · '+c.rate+'%']);
  if(c.energy)r.push([ru?'Сценарий Energy Lab · модель':'Energy Lab scenario · model',({city:ru?'Город':'City',highway:ru?'Трасса':'Highway',retail:ru?'ТЦ (прежняя модель)':'Retail (legacy model)',...business.labels(lang)})[c.energy.location]+' · '+Math.floor(c.energy.hour).toString().padStart(2,'0')+':'+Math.floor((c.energy.hour%1)*60).toString().padStart(2,'0')+' · '+(c.energy.peak?(ru?'пиковый спрос':'peak demand'):(ru?'обычный спрос':'regular demand'))]);
  if(c.stationIds?.length)r.push([ru?'Станции · AFDC':'Stations · AFDC',c.stationIds.join(', ')]);
  if(c.stationCount&&c.stationIds.length!==c.stationCount)r.push([ru?'Станций выбрано':'Stations selected',c.stationIds.length+' / '+c.stationCount]);
  if(c.lesson)r.push([ru?'Пример сессии':'Session example',c.lesson.energyKwh+' kWh'],[ru?'Оплата зарядки / электричество':'Charging payment / electricity',money(c.lesson.receipts)+' / '+money(c.lesson.electricity)],[ru?'До прочих расходов':'Before other costs',money(c.lesson.beforeOtherCosts)]);
  if(!r.length)r.push([ru?'Тема':'Topic',({documents:ru?'Документы и условия':'Documents & terms',account:ru?'Доступ к средствам':'Access to funds',call:ru?'Звонок':'Callback',general:ru?'Вопрос менеджеру':'Question for manager'})[c.topic]||(ru?'Выбор клиента':'Client selection')]);
  return r;
 }
 function energyState(a,payload){const active=finance.summary(a).active;return {active:!!(active?.capital>0&&payload?.active),teaser:true};}
 return {overview,session,exploration,context,rows,energyState};
});
