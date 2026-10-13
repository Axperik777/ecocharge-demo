/* Pure financial models only; no server, database or authentication. */
(()=>{const modules={"dist/charge-model.js":function(module,exports,require){
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoChargeModel=api;})(typeof window==='object'?window:globalThis,()=>{
 'use strict';
  const policy=Object.freeze({version:'charge-fixed-obligation-v3',legacyVersion:'charge-revenue-v2',legacyVersions:['charge-revenue-v2','charge-revenue-v1'],termsVersion:3,participantShare:.42,minimumStations:3,minimumAmount:250,currency:'USD',baseAllocationIncluded:true,aiCost:472,aiDays:30,aiRateBonus:1,settlementDays:4,welcomeCoins:500,executionStatus:'not-connected',settlementModel:'fixed-company-obligation'});
 const pairs={
  who:['EcoGrid is an energy and technology project. Charge focuses on EV charging infrastructure. The agreement must identify the full legal name and registration number of the contracting entity.','EcoGrid — проект в сфере энергетики и технологий. Charge связан с зарядной инфраструктурой для электромобилей. В договоре должны быть указаны полное юридическое название и регистрационный номер стороны договора.'],
  where:['Charge targets the United States. Before participation, review the company jurisdiction and address, each site address, its operator and evidence of the right to receive its revenue. These documents are not yet supplied here.','Целевой рынок Charge — США. До участия нужно проверить юрисдикцию и адрес компании, адрес каждого объекта, оператора и документы на право получать его выручку. Эти документы пока не предоставлены.'],
  work:['The proposed model covers financing and operation: site selection, equipment, connection, maintenance and driver payments. The proposal must specify the responsibilities of EcoGrid, the operator and contractors.','Предлагаемая модель объединяет финансирование и эксплуатацию: выбор площадки, оборудование, подключение, обслуживание и оплату водителями. Предложение должно определять обязанности EcoGrid, оператора и подрядчиков.'],
  source:['Drivers pay for EV charging. Forty-two percent of verified Charge revenue is the primary funding pool for participant payment obligations; the company reserve covers an eligible shortfall. A calculation or station photograph does not confirm revenue or reserve funding.','Водители оплачивают зарядку электромобилей. 42% подтверждённой выручки Charge — основной источник покрытия обязательств по выплатам участникам; допустимый дефицит покрывает резерв компании. Расчёт или фотография станции не подтверждают выручку и наличие резерва.'],
  rights:['After activation, the signed agreement must define the company payment obligation, reporting, four-day settlement schedule and exit conditions. The site and complete funding budget must be known. Choosing a directory location does not create ownership or a direct right to station revenue.','После активации подписанный договор должен определять обязательство компании по выплате, отчётность, расчёт каждые 4 дня и условия выхода. Объект и полный бюджет финансирования должны быть известны. Выбор локации в справочнике не создаёт собственность или прямое право на выручку станции.'],
  split:['42% of verified Charge revenue is applied first to the fixed company payment obligations. If that amount is insufficient, an eligible company reserve covers the shortfall; any uncovered amount remains recorded as company payable and is never silently written off. This rule does not present the remainder as a client or company ownership share.','42% подтверждённой выручки Charge в первую очередь направляются на покрытие фиксированных обязательств компании по выплатам. Если этой суммы недостаточно, допустимый дефицит покрывает резерв компании; непокрытая сумма остаётся зафиксированной задолженностью компании и не списывается скрыто. Остаток не обозначается как доля собственности клиента или компании.'],
  formula:['After agreement activation, the selected Charge plan creates a fixed company payment obligation of 13–16% per UTC calendar month, accrued continuously by time. The obligation is not reduced by weak station revenue, but its fulfilment depends on the company and its reserve; it is not a guarantee of capital repayment.','После активации договора выбранный план Charge создаёт фиксированное обязательство компании по выплате 13–16% за календарный месяц UTC с непрерывным начислением пропорционально времени. Слабая выручка станции не уменьшает обязательство, но его исполнение зависит от компании и её резерва; это не гарантия возврата капитала.'],
  allocation:['Choose at least three eligible chargers. Basic allocation across them is included. Changes apply to future periods under the agreement; completed distributions are never moved between clients. More chargers diversify demand exposure but cannot guarantee a payout.','Выберите минимум три доступные для участия зарядки. Базовое распределение между ними включено. Изменения применяются к будущим периодам по договору; завершённые выплаты между клиентами не перераспределяются. Несколько зарядок распределяют риск загрузки, но не гарантируют выплату.'],
 ai:['Charge AI is an optional service. While a server-confirmed 30-day connection is active, it adds exactly +1 percentage point to the selected Charge monthly rate. The Academy planning example uses 472 EcoCoin for 30 days and a future 500 EcoCoin allocation, which would leave 28. EcoCoin has not been publicly issued or credited in this build, so the example is not a current balance or redeemable gift. Current activation requires individual confirmation of the AI terms and the related payment. EcoCoin is not used for activation in this build; any future coin option would require a separate launch and finalized rules. There is no automatic renewal. Base Charge terms continue without AI.','AI для Charge — дополнительная услуга. Пока действует подтверждённое сервером подключение на 30 дней, оно добавляет ровно +1 процентный пункт к месячной ставке выбранного плана Charge. В планируемом примере Академии используются 472 EcoCoin за 30 дней и будущая выдача 500 EcoCoin, после которой осталось бы 28. В этой сборке EcoCoin публично не выпущены и не зачислены, поэтому пример не является текущим балансом или доступным подарком. Текущее подключение требует индивидуального подтверждения условий AI и связанного платежа. EcoCoin в этой сборке не используются для активации; любая будущая возможность оплаты монетами потребует отдельного запуска и утверждённых правил. Автоматического продления нет. Без AI продолжают действовать базовые условия Charge.'],
 aiEvidence:['The +1 percentage point applies only inside a server-recorded active Charge AI interval and increases the company payment obligation for that interval. A client-side flag cannot activate it. AI does not create missing revenue or remove company liability. The public preview does not issue EcoCoin, credit a coin balance or execute coin transfers.','Надбавка +1 процентный пункт действует только внутри зафиксированного сервером активного периода AI для Charge и увеличивает обязательство компании за этот интервал. Клиентская отметка не может её включить. AI не создаёт отсутствующую выручку и не снимает ответственность компании. Публичный просмотр не выпускает EcoCoin, не зачисляет баланс монет и не выполняет переводы.'],
   costs:['Charge operating costs and reserve funding are recorded separately from the fixed client obligation. Lower costs do not automatically change the selected Charge plan rate or erase an unpaid company obligation.','Операционные расходы Charge и финансирование резерва учитываются отдельно от фиксированного обязательства перед клиентом. Снижение расходов не меняет автоматически ставку выбранного плана Charge и не списывает невыполненное обязательство компании.'],
  proof:['Before activation: verified contracting entity, site and operator rights, total funding budget, payment-obligation terms, revenue and reserve reporting, settlement dates and exit terms. Until these are available, save a selection and discuss the documents with the Academy.','До активации нужны: подтверждённая сторона договора, права на объекты и оператор, полный бюджет, условия обязательства по выплате, отчётность по выручке и резерву, даты расчётов и выход. Пока данных нет, сохраните подборку и обсудите документы с Академией.'],
  cadence:['The company obligation accrues continuously at the UTC calendar-month rate. Every 4 days the due amount is settled: funded profit becomes withdrawable, while an uncovered shortfall remains a company payable until funded.','Обязательство компании начисляется непрерывно по ставке за календарный месяц UTC. Каждые 4 дня сумма подлежит расчёту: профинансированная прибыль становится доступной к выводу, а непокрытая разница остаётся задолженностью компании до погашения.']
 };
 const settlementReference=Object.freeze({capital:250,days:policy.settlementDays,rate:13,aiRate:14,kind:'calendar-month-model'});
 const calendarAmount=(capital,rate,from,to)=>{let cursor=typeof from==='number'?from:Date.parse(from),end=typeof to==='number'?to:Date.parse(to),total=0;if(!Number.isFinite(cursor)||!Number.isFinite(end)||end<=cursor)return 0;while(cursor<end){const d=new Date(cursor),monthStart=Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),1),monthEnd=Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,1),stop=Math.min(end,monthEnd),monthCents=Math.round(capital*100*rate/100),part=t=>Math.round(monthCents*(t-monthStart)/(monthEnd-monthStart));total+=part(stop)-part(cursor);cursor=stop;}return total/100;};
 function periodOffer(capital=250,rate=13,start=Date.now()){cents(capital);if(capital<policy.minimumAmount||capital>1e7)throw Error('Enter at least $250.');if(!Number.isFinite(rate)||rate<0||rate>100)throw Error('Enter a valid monthly rate.');const from=typeof start==='number'?start:Date.parse(start),to=from+policy.settlementDays*86400000,baseAmount=calendarAmount(capital,rate,from,to),aiAmount=calendarAmount(capital,rate+policy.aiRateBonus,from,to);return {capital,days:policy.settlementDays,rate,aiRate:rate+policy.aiRateBonus,baseAmount,aiAmount,base:[baseAmount],ai:[aiAmount],kind:settlementReference.kind};}
 // Legacy name retained for integrations; it now returns the current 4-day model period.
 const weeklyReference=settlementReference,weeklyOffer=periodOffer;
 const questions=[['who','Who are you?','Кто вы?'],['where','Where are the company and chargers?','Где компания и зарядки?'],['work','What does EcoGrid do?','Что делает EcoGrid?'],['source','Where does my income come from?','Откуда мой заработок?'],['rights','What do I receive for my money?','Что я получаю за свои деньги?'],['split','How is revenue distributed?','Как распределяется выручка?'],['formula','How is my payment calculated?','Как рассчитывается моя выплата?'],['allocation','Why at least three chargers?','Зачем минимум три зарядки?'],['ai','What does paid AI add?','Что даёт платный AI?']];
 const copy=(key,lang='en')=>(pairs[key]||['',''])[lang==='ru'?1:0];
 const faq=(lang='en')=>questions.map(([id,en,ru])=>({id,question:lang==='ru'?ru:en,answer:copy(id,lang)+(id==='ai'?' '+copy('aiEvidence',lang):'')}));
 const cents=v=>{if(!Number.isFinite(v)||v<0||v>1e10||Math.abs(v*100-Math.round(v*100))>1e-4)throw Error('Invalid USD amount.');return Math.round(v*100);};
 function selection(input,allowed){
  const capital=Number(input?.capital),ids=input?.stationIds;
  cents(capital);if(capital<policy.minimumAmount||capital>1e7)throw Error('Enter at least $250.');
  if(!Array.isArray(ids)||ids.length<policy.minimumStations||ids.length>100||new Set(ids).size!==ids.length||ids.some(id=>!Number.isSafeInteger(id)||allowed&&!allowed.has(id)))throw Error('Select at least three different eligible chargers.');
  return {economyModel:policy.version,tierId:['single','network','portfolio','scale'].includes(input.tierId)?input.tierId:'single',name:'Charge',capital,stationIds:ids.slice(),rate:13,ratePeriod:'calendar-month',period:'accrual',settlementDays:policy.settlementDays,settlementBasis:policy.settlementModel,baseAllocationIncluded:true};
 }
 // A deterministic basic allocation proposal, never a claim of live AI execution.
 function allocate(capital,stationIds){selection({capital,stationIds});const total=cents(capital),base=Math.floor(total/stationIds.length),rest=total%stationIds.length;return stationIds.map((id,i)=>({id,capital:(base+(i<rest?1:0))/100}));}
 function coverage({obligation,revenue=0,companyReserve=0}){
  const due=cents(obligation),gross=cents(revenue),reserve=cents(companyReserve),pool=Math.floor(gross*42/100),company=gross-pool;
  const revenueApplied=Math.min(due,pool),reserveApplied=Math.min(due-revenueApplied,reserve),funded=revenueApplied+reserveApplied,payable=due-funded;
  return {obligation:due/100,revenue:gross/100,participantPool:pool/100,companyRevenue:company/100,revenueApplied:revenueApplied/100,reserveApplied:reserveApplied/100,funded:funded/100,companyPayable:payable/100,status:payable===0?'funded':funded?'partially-funded':'payable'};
 }
 const settlement=coverage;
 function portfolio(rows){
  if(!Array.isArray(rows)||rows.length<policy.minimumStations||new Set(rows.map(r=>r.id)).size!==rows.length)throw Error('At least three different chargers are required.');
  const detail=rows.map(row=>({id:row.id,...coverage(row)}));return {stations:detail,obligation:detail.reduce((n,r)=>n+Math.round(r.obligation*100),0)/100,funded:detail.reduce((n,r)=>n+Math.round(r.funded*100),0)/100,companyPayable:detail.reduce((n,r)=>n+Math.round(r.companyPayable*100),0)/100};
 }
 // Illustrative hardware/installation assumptions, not actual object financials.
 const assumptions=Object.freeze({chargerCount:3,referenceHardware:36181,hardwareDiscount:.19,installationPerCharger:40000,pricePerKwh:.45,powerCost:.12,efficiency:.95,processingShare:.03,fixedMonthlyPerCharger:750,replacementMonths:120,kwhPerSession:30,days:30,source:'https://www.mbusassep.com/equipment/product/18149'});
 function scenarios(capital=250,count=3){
  const ids=Array.from({length:count},(_,i)=>i+1),allocations=allocate(capital,ids),a=assumptions,hardware=Math.round(a.referenceHardware*(1-a.hardwareDiscount)*100)/100,budget=hardware+a.installationPerCharger;
  if(capital>budget*count)throw Error('Amount exceeds the illustrative funding budget.');
  return {capital,count,budget:Math.round(budget*count*100)/100,assumptions:a,rows:[5,10,20].map((sessions,i)=>{const revenue=sessions*a.kwhPerSession*a.days*a.pricePerKwh;return {id:['conservative','base','strong'][i],sessionsPerDay:sessions,revenue:Math.round(revenue*count*100)/100,...portfolio(allocations.map(r=>({id:r.id,revenue:Math.round(revenue*100)/100,obligation:periodOffer(r.capital,13).baseAmount,companyReserve:0})))}})};
 }
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function html(lang='en',{compact=false}={}){const ru=lang==='ru';return `<section class="charge-policy" data-charge-policy="${policy.version}" translate="no"><p class="charge-policy-label">EcoGrid Charge · ${ru?'МОДЕЛЬ УЧАСТИЯ':'PARTICIPATION MODEL'}</p><h2>${ru?'Фиксированное обязательство компании. Расчёт каждые 4 дня.':'Fixed company obligation. Settlement every 4 days.'}</h2><div class="charge-policy-split"><div><strong>42%</strong><span>${ru?'подтверждённой выручки сначала покрывают обязательства':'of verified revenue funds obligations first'}</span></div><div><strong>${ru?'Резерв':'Reserve'}</strong><span>${ru?'покрывает допустимый дефицит':'covers an eligible shortfall'}</span></div><div><strong translate="no">companyPayable</strong><span>${ru?'фиксирует непокрытую сумму':'records any uncovered amount'}</span></div></div><p>${escape(copy('formula',lang))}</p><p>${escape(copy('allocation',lang))}</p>${compact?'':`<details><summary>${ru?'Ответы перед решением':'Answers before you decide'}</summary>${faq(lang).map(r=>`<h3>${escape(r.question)}</h3><p>${escape(r.answer)}</p>`).join('')}<p>${escape(copy('proof',lang))}</p></details>`}</section>`;}
 return Object.freeze({policy,settlementReference,periodOffer,weeklyReference,weeklyOffer,copy,faq,selection,allocate,coverage,settlement,portfolio,scenarios,assumptions,html});
});

},
"dist/public-plan.js":function(module,exports,require){
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./account-finance.js'):root.EcoFinance);if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoPublicPlan=api;})(typeof window==='object'?window:globalThis,function(finance){
 'use strict';
 function normalize(value){
  const tier=finance.tiers.find(t=>t.id===value?.tierId),capital=finance.parseAmount(value?.capital),start=String(value?.start||'');
  if(!tier)throw Error('Choose a participation plan.');
  if(!finance.eligible(capital,tier.id))throw Error('Enter an amount within the limits for this plan.');
  if(!/^20\d{2}-\d{2}-\d{2}$/.test(start)||!Number.isFinite(Date.parse(start+'T00:00:00Z'))||new Date(start+'T00:00:00Z').toISOString().slice(0,10)!==start)throw Error('Choose a valid calculation start date.');
  return {version:'public-plan-v2',tierId:tier.id,capital,start};
 }
 function calculate(value){const input=normalize(value),tier=finance.tiers.find(t=>t.id===input.tierId),at=Date.parse(input.start+'T00:00:00Z'),end=at+finance.settlementPeriodMs,period=finance.planAccrual({capital:input.capital,rate:tier.rate,ratePeriod:finance.ratePeriod},at,end);return {...input,name:tier.name,rate:tier.rate,minimum:tier.minimum,period,periodDays:finance.settlementDays,weekly:period,monthly:finance.monthly(input.capital,tier.rate),end:new Date(end).toISOString().slice(0,10)};}
 return Object.freeze({normalize,calculate});
});

},
"dist/central/profile-model.js":function(module,exports,require){
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.EcoProfileModel=factory();})(typeof window==='undefined'?globalThis:window,()=>{
 'use strict';
 const text=v=>typeof v==='string'?v.trim():'';
 const timeZones=Object.freeze([
  ['US','America/New_York','New York','Нью-Йорк'],
  ['US','America/Chicago','Chicago','Чикаго'],
  ['US','America/Denver','Denver','Денвер'],
  ['US','America/Los_Angeles','Los Angeles','Лос-Анджелес'],
  ['US','America/Phoenix','Phoenix, Arizona','Финикс, Аризона'],
  ['US','America/Anchorage','Anchorage, Alaska','Анкоридж, Аляска'],
  ['US','America/Adak','Adak, Aleutian Islands','Адак, Алеутские острова'],
  ['US','Pacific/Honolulu','Honolulu, Hawaii','Гонолулу, Гавайи'],
  ['CA','America/Toronto','Toronto / Montreal','Торонто / Монреаль'],
  ['CA','America/Winnipeg','Winnipeg','Виннипег'],
  ['CA','America/Edmonton','Edmonton / Calgary','Эдмонтон / Калгари'],
  ['CA','America/Vancouver','Vancouver','Ванкувер'],
  ['CA','America/Halifax','Halifax','Галифакс'],
  ['CA','America/St_Johns',"St. John’s, Newfoundland",'Сент-Джонс, Ньюфаундленд'],
  ['CA','America/Regina','Regina, Saskatchewan','Реджайна, Саскачеван'],
  ['CA','America/Whitehorse','Whitehorse, Yukon','Уайтхорс, Юкон'],
  ['CA','America/Dawson_Creek','Dawson Creek','Досон-Крик'],
  ['CA','America/Creston','Creston','Крестон'],
  ['CA','America/Atikokan','Atikokan','Атикокан'],
  ['CA','America/Blanc-Sablon','Blanc-Sablon','Блан-Саблон']
 ].map(([country,id,en,ru])=>Object.freeze({country,id,en,ru})));
 const canonical=value=>{try{return new Intl.DateTimeFormat('en-US',{timeZone:value}).resolvedOptions().timeZone;}catch{return '';}};
 function selectedZone(value){if(typeof value!=='string'||!value||value.length>80)return '';const id=canonical(value);return timeZones.find(z=>canonical(z.id)===id)?.id||'';}
 function zone(value){return !!selectedZone(value);}
 function zoneGroups(language='en'){return ['US','CA'].map(country=>({country,label:language==='ru'?(country==='US'?'США':'Канада'):(country==='US'?'United States':'Canada'),zones:timeZones.filter(z=>z.country===country).map(z=>({id:z.id,label:language==='ru'?z.ru:z.en}))}));}
 function profile(input){
  const value={name:text(input.name),email:text(input.email).toLowerCase(),phone:text(input.phone),language:input.language,timezone:input.timezone},errors={};
  if(value.name.length<2||value.name.length>100||/[\x00-\x1f]/.test(value.name))errors.name='name';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)||value.email.length>160)errors.email='email';
  if(value.phone&&(!/^[+\d\s().-]+$/.test(value.phone)||value.phone.replace(/\D/g,'').length<7||value.phone.replace(/\D/g,'').length>15||value.phone.length>40))errors.phone='phone';
  if(!['en','ru'].includes(value.language))errors.language='language';if(!zone(value.timezone))errors.timezone='timezone';
  return {value,errors};
 }
 // The same wall-clock matching approach used by the existing callback form.
 // Reject a skipped or repeated DST time rather than choosing an arbitrary instant.
 function appointment(value,now=Date.now()){
  if(!value||!/^\d{4}-\d{2}-\d{2}$/.test(value.date)||!/^\d{2}:\d{2}$/.test(value.time)||!zone(value.timeZone))return null;
  const anchor=Date.parse(value.date+'T'+value.time+':00Z');if(!Number.isFinite(anchor))return null;
  const format=new Intl.DateTimeFormat('en-CA',{timeZone:value.timeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}),matches=[];
  for(let offset=-840;offset<=840;offset+=15){const instant=anchor+offset*60000,p=Object.fromEntries(format.formatToParts(instant).map(p=>[p.type,p.value]));if(`${p.year}-${p.month}-${p.day}`===value.date&&`${p.hour}:${p.minute}`===value.time)matches.push(instant);}
  return matches.length===1&&matches[0]>now?{date:value.date,time:value.time,timeZone:value.timeZone,instant:new Date(matches[0]).toISOString()}:null;
 }
 return {profile,zone,appointment,timeZones,selectedZone,zoneGroups};
});

},
"dist/journey-model.js":function(module,exports,require){
'use strict';
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoJourney=api;})(typeof window==='object'?window:globalThis,()=>{
 const version='journey-v1';
 const topics={academy:['EcoGrid Academy','EcoGrid Academy'],energy:['Energy projects','Энергетические проекты'],solar:['Solar & storage','Солнце и накопители'],charge:['EV charging','Зарядные станции'],mining:['Mining computing-cell rental','Аренда вычислительных ячеек Mining'],ai:['EcoGrid AI technology','Технология EcoGrid AI'],ecocoin:['EcoCoin','EcoCoin'],club:['EcoGrid Club community','Сообщество EcoGrid Club']};
 // Keep old AI records readable; new inquiries select a project or the Club community.
 const projectTopics=Object.fromEntries(Object.entries(topics).filter(([id])=>!['ai','ecocoin','club','academy'].includes(id)));
 const purposes={participation:['Project participation','Участие в проекте'],equipment:['Equipment for my property','Оборудование для своего объекта'],capacity:['EcoGrid farm computing-cell rental','Аренда вычислительной ячейки на ферме EcoGrid'],business:['Business partnership','Деловое партнёрство'],updates:['Explore and follow updates','Изучить и следить за новостями']};
 const projectPurposes={energy:['participation','equipment','business'],charge:['participation'],solar:['participation','equipment','business'],mining:['capacity']};
 const routes={fast:['Consultation','Консультация'],nurture:['Explore first','Знакомство с проектом']};
 const acquisitionPaths={direct_project:['Direct project campaign','Прямая реклама проекта'],community_interest:['Community by shared interest','Сообщество по интересам'],academy_education:['Academy education','Обучение в Академии']};
 const projectIds=new Set(['charge','solar','mining']);
 const communityArticleIds=new Set(['policy-household-budget','digital-assets-infrastructure','responsible-energy']);
 const keys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','gclid','msclkid','ttclid','landing_id','landing_host','lead_route','aff','partner_id','sub_id','ref'];
 function attribution(input={}){const v={};for(const k of keys)if(typeof input[k]==='string')v[k]=input[k].slice(0,300);return v;}
 function normalize(input){if(!input)return null;const route=input.route,topic=input.topic,purpose=input.purpose,country=input.country;if(!Object.hasOwn(routes,route)||!Object.hasOwn(topics,topic)||!Object.hasOwn(purposes,purpose)||!['US','CA'].includes(country))throw Error('Choose a route, topic, purpose and country.');if(route==='nurture'&&purpose!=='updates')throw Error('Choose exploration to follow project updates.');if(route==='fast'&&projectPurposes[topic]&&!projectPurposes[topic].includes(purpose))throw Error('Choose an objective available for this project.');return {route,topic,purpose,country};}
 function merge(previous,input,source={},at=new Date().toISOString()){
  const next=normalize(input);if(!next)return previous||null;
  const first=previous?.entryRoute||next.route;
  // A newsletter request never cancels an already requested consultation.
  const route=['fast','consult'].includes(previous?.route)?'fast':next.route;
  const current=route==='fast'&&next.route==='nurture'&&previous?{topic:previous.topic,purpose:previous.purpose}:next;
  const touch=attribution(source),history=(previous?.history||[]).slice(-19);
  const event={route:next.route,topic:next.topic,purpose:next.purpose,country:next.country,at,source:touch};
  if(!history.length||JSON.stringify({...history.at(-1),at:''})!==JSON.stringify({...event,at:''}))history.push(event);
  const nextProject=projectIds.has(next.topic)?next.topic:null;
  const previousProject=projectIds.has(previous?.currentProject)?previous.currentProject:(projectIds.has(previous?.topic)?previous.topic:null);
  // entryProject is immutable attribution. currentProject is the direction being explored,
  // while requestedProject changes only after an explicit consultation request.
  const legacyEntryProject=previous&&(['fast','consult'].includes(previous.entryRoute)||!previous.entryRoute&&['fast','consult'].includes(previous.route))?previousProject:null;
  const entryProject=previous?.entryProject||legacyEntryProject||(!previous&&next.route==='fast'?nextProject:null);
  const currentProject=nextProject||previousProject;
  const requestedProject=next.route==='fast'&&nextProject?nextProject:(previous?.requestedProject||(['fast','consult'].includes(previous?.route)?previousProject:null));
  return {...previous,...next,...current,route,entryRoute:first,enteredAt:previous?.enteredAt||at,firstSource:previous?.firstSource||touch,lastSource:touch,consultationAt:previous?.consultationAt||(next.route==='fast'?at:null),history,...(entryProject?{entryProject}:{}),...(currentProject?{currentProject}:{}),...(requestedProject?{requestedProject}:{})};
 }
 function requestConversation(state,chosen,language,id,at=new Date().toISOString()){
  const j=normalize(chosen);if(j.route!=='fast')throw Error('Request a consultation first.');state.tickets??=[];const prior=state.tickets.find(t=>t.journeyTopic===j.topic&&t.status!=='Resolved'&&!t.service?.closed);if(prior)return prior;
  const ru=language==='ru',name=label(topics,j.topic,language),subject=(ru?'Обсудить проект · ':'Project discussion · ')+name,message=(ru?'Хочу обсудить направление: ':'I would like to discuss: ')+name+'. '+label(purposes,j.purpose,language)+'. '+(j.country==='CA'?(ru?'Канада':'Canada'):(ru?'США':'United States'));
  const ticket={id,subject,message,reply:'',date:at,status:'Open',journeyTopic:j.topic,messages:[{id,from:'client',text:message,date:at}],service:{closed:false}};state.tickets.push(ticket);return ticket;
 }
 function clientPreferenceInput(previous,values,language='en'){
  if(!['updates','participation','capacity'].includes(values.purpose)||!Object.hasOwn(projectTopics,values.topic))throw Error('Choose a project and next step.');
  const purpose=values.topic==='mining'&&values.purpose==='participation'?'capacity':values.purpose;
  if(purpose==='capacity'&&values.topic!=='mining')throw Error('Choose a project and next step.');
  const consultationRequested=purpose!=='updates',route=consultationRequested?'fast':'nurture';
  return {consultationRequested,journey:normalize({route,topic:values.topic,purpose,country:values.country}),marketingConsent:values.marketingConsent==='on',language:language==='ru'?'ru':'en'};
 }
 function entry(record){return record.context?.journey||record.journey||record.state?.journey||null;}
 function projectContext(record={}){
  const state=record.state||record,content=record.context?.content||state.content||{},j=entry(record)||{};
  const firstHistory=Array.isArray(j.history)?j.history.find(item=>projectIds.has(item?.topic)):null;
  const entryProject=projectIds.has(j.entryProject)?j.entryProject:(projectIds.has(content.entryProject)?content.entryProject:(['fast','consult'].includes(j.entryRoute)?(projectIds.has(firstHistory?.topic)?firstHistory.topic:(projectIds.has(j.topic)?j.topic:null)):null));
  const currentProject=projectIds.has(j.currentProject)?j.currentProject:(projectIds.has(j.topic)?j.topic:null);
  const requestedProject=projectIds.has(j.requestedProject)?j.requestedProject:(['fast','consult'].includes(j.route)?currentProject:null);
  return {entryProject:entryProject||null,currentProject:currentProject||null,requestedProject:requestedProject||null};
 }
 function acquisition(record={}){
  const state=record.state||record,content=record.context?.content||state.content||{},j=entry(record)||{};
  const entryArticle=typeof content.entryId==='string'&&/^[a-z0-9][a-z0-9-]{0,79}$/.test(content.entryId)?content.entryId:'';
  const inferred=entryArticle?(communityArticleIds.has(entryArticle)?'community_interest':'academy_education'):['fast','consult'].includes(j.entryRoute)?'direct_project':['academy','ai','ecocoin'].includes(j.topic)?'academy_education':'community_interest';
  const path=Object.hasOwn(acquisitionPaths,content.acquisitionPath)?content.acquisitionPath:inferred;
  const projects=projectContext(record),project=projects.requestedProject||projects.currentProject;
  return {path,articleAssist:content.articleAssist===true,entryArticle,project,...projects,purpose:j.purpose||null};
 }
 function communityEntry(state={}){const j=entry(state);return j?.route==='nurture'&&['club','academy','ecocoin'].includes(j.topic)&&!state.plan&&!state.planDraft&&!state.requests?.some(r=>r.type==='topup');}
 function academyStage(state={}){
  if(state.plan?.status==='active'||state.miningPositions?.some(p=>p.status!=='closed'&&p.capital>0))return 'active';
  const context=projectContext(state),project=context.requestedProject||(state.plan||state.planDraft?'charge':state.miningPositions?.some(p=>p.status!=='closed'&&p.capital>0)?'mining':null),presentationProject=projectIds.has(state.academy?.presentationProject)?state.academy.presentationProject:null;
  if((state.academy?.presentationComplete===true&&project&&(!presentationProject||presentationProject===project))||state.planDraft?.savedBy==='manager')return 'proposal';
  return 'new';
 }
 // Presentation controls the first funding prompt, not access to existing money.
 function needsAcademy(state={}){
  return academyStage(state)==='new'&&!(Number(state.balance)>0)&&!state.requests?.some(r=>r.type==='topup'&&['Pending','Approved'].includes(r.status));
 }
 function exploring(record){return entry(record)?.route==='nurture';}
 function label(group,key,lang='en'){return (group[key]||['—','—'])[lang==='ru'?1:0];}
 function cohorts(rows,dimension='entryRoute',at=Date.now()){
  const groups=new Map();for(const r of rows){const j=r.journey||{},key=dimension==='acquisitionPath'?acquisition(r).path:dimension==='topic'?r.requestedProject||j.topic||'unknown':dimension==='partner'?(j.firstSource?.partner_id||j.firstSource?.aff||r.source?.partner_id||r.source?.aff||'direct'):j.entryRoute||'legacy';let g=groups.get(key);if(!g){g={key,contacts:0,consultations:0,qualified:0,accounts:0,paid:0,ageDays:0,daysToPaid:0};groups.set(key,g);}g.contacts++;g.consultations+=!!j.consultationAt||(!j.entryRoute&&r.connected)?1:0;g.qualified+=r.qualified?1:0;g.accounts+=r.account?1:0;const started=Date.parse(j.enteredAt||r.created);if(Number.isFinite(started))g.ageDays+=Math.max(0,at-started)/86400000;if(r.paidAt&&Number.isFinite(Date.parse(r.paidAt))){g.paid++;if(Number.isFinite(started))g.daysToPaid+=Math.max(0,Date.parse(r.paidAt)-started)/86400000;}}
  return [...groups.values()].map(g=>({...g,averageAgeDays:g.contacts?g.ageDays/g.contacts:null,averageDaysToPaid:g.paid?g.daysToPaid/g.paid:null,paidRate:g.contacts?g.paid/g.contacts:0}));
 }
 return {needsAcademy,clientPreferenceInput,academyStage,communityEntry,requestConversation,projectContext,version,topics,projectTopics,purposes,projectPurposes,routes,acquisitionPaths,keys,attribution,normalize,merge,entry,acquisition,exploring,label,cohorts};
});

},
"dist/calendar-yield.js":function(module,exports,require){
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./demand-rhythm.js'):root.EcoDemandRhythm);if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoCalendarYield=api;})(typeof window==='undefined'?globalThis:window,function(rhythm){
 'use strict';
 const DAY=86400000,WEEK=7*DAY,BASIS='calendar-month',VERSION='calendar-v1',SCALE=1000000000n;
 const time=v=>typeof v==='number'?v:Date.parse(v);
 const roundDiv=(n,d)=>(n+d/2n)/d;
 function monthCents(capital,rate){if(!Number.isFinite(capital)||!Number.isFinite(rate)||capital<=0||rate<=0)return 0;const c=Math.round(capital*100),b=Math.round(rate*100);if(!Number.isSafeInteger(c)||!Number.isSafeInteger(b))return 0;return Number(roundDiv(BigInt(c)*BigInt(b),10000n));}
 function bounds(at){const d=new Date(at),start=Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),1),end=Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,1);return {start,end,days:(end-start)/DAY};}
 // Round cumulative cents at each boundary. Adjacent periods telescope: a whole
 // calendar month is exactly monthCents, including February and leap years.
 // Demand weights are time units; all monetary multiplication uses integers.
 function centsBetween(capital,rate,from,to,curve='demand-v1'){
  let a=time(from);const b=time(to),target=monthCents(capital,rate);if(!target||!Number.isFinite(a)||!Number.isFinite(b)||b<=a)return 0;
  if(b-a>3660*DAY)throw Error('Calculation interval is too long.');let total=0;
  while(a<b){const m=bounds(a),end=Math.min(b,m.end),at=t=>{const units=t===m.end?BigInt(m.days)*SCALE:BigInt(Math.round((curve===rhythm.VERSION?rhythm.fraction(m.start,t):(t-m.start)/DAY)*Number(SCALE)));return Number(roundDiv(BigInt(target)*units,BigInt(m.days)*SCALE));};total+=at(end)-at(a);a=end;}return total;
 }
 return Object.freeze({DAY,WEEK,BASIS,VERSION,monthCents,bounds,centsBetween});
});

},
"dist/business-model.js":function(module,exports,require){
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.EcoBusiness=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 // Narrative/teaching inputs only. Never import this module into account credit math.
 // Teaching inputs only. Channel routing is illustrative and changes with the scenario;
 // it is never a fixed company/client or revenue split.
 const config=Object.freeze({version:'energy-routing-v2',dispatchLimitKw:900,solarPeakKw:1800,chargingPrice:.45,utilityPrice:.18,solarStorageCost:.12,sessionKwh:30,sessionsPerDay:20,exampleDays:30,monthlyOperatingCost:3000,exampleReceipts:1000,lowerReceipts:600,siteCosts:150,serviceCosts:120,reserves:80,inverseShare:.004,inverseCostRatio:.35,inverseKwhPrice:.25});
 // Product narrative for the diploma model; this does not connect live AI or change financial calculations.
 const aiContent=Object.freeze({
  "energy": {
    "title": [
      "Energy decisions that support profitability",
      "Управление энергией с фокусом на прибыль"
    ],
    "body": [
      "EcoGrid AI is our shared operating intelligence across every project. It compares generation, demand, tariffs and equipment condition to help allocate energy where it delivers more value and reduce avoidable costs. Operators set the limits and approve operating decisions.",
      "EcoGrid AI — наш единый инструмент управления во всех проектах. Он сопоставляет выработку, спрос, тарифы и состояние оборудования, чтобы направлять энергию туда, где она приносит больше пользы, и сокращать лишние расходы. Команда задаёт ограничения и контролирует решения."
    ]
  },
  "solar": {
    "title": [
      "Use more of the energy we generate",
      "Больше пользы от каждого киловатт-часа"
    ],
    "body": [
      "EcoGrid AI forecasts solar output from weather and site data, compares it with demand and helps plan when to use, store or sell energy. This reduces unused generation and purchases during expensive hours, supporting project profitability.",
      "EcoGrid AI прогнозирует солнечную выработку по погоде и данным объекта, сопоставляет её со спросом и помогает выбрать, когда использовать, накапливать или продавать энергию. Это сокращает потери выработки и закупки в дорогие часы, помогая увеличивать прибыль проекта."
    ]
  },
  "storage": {
    "title": [
      "Store at the right time. Supply when needed.",
      "Накапливать вовремя. Отдавать по потребности."
    ],
    "body": [
      "EcoGrid AI plans battery charging and discharge around generation, tariffs and expected demand. Reserve levels and battery operating limits stay in place: the aim is to reduce peak purchases without sacrificing the required backup.",
      "EcoGrid AI планирует заряд и разряд накопителей с учётом генерации, тарифов и ожидаемого спроса. Резерв и рабочие ограничения батарей сохраняются: задача — снижать закупки в пиковые часы, не расходуя необходимый запас."
    ]
  },
  "charge": {
    "title": [
      "Match power to charging demand",
      "Распределять мощность под спрос на зарядку"
    ],
    "body": [
      "EcoGrid AI forecasts busy charging periods and helps distribute available power between stations, batteries and other site loads. It flags unusual consumption and equipment faults so the team can reduce downtime and manage the cost of each charging session.",
      "EcoGrid AI прогнозирует часы спроса и помогает распределять доступную мощность между зарядными станциями, накопителями и другими нагрузками объекта. Он выявляет необычное потребление и сбои оборудования, чтобы команда сокращала простои и управляла себестоимостью зарядки."
    ]
  },
  "mining": {
    "title": [
      "Control the cost of computing",
      "Контролировать себестоимость вычислений"
    ],
    "body": [
      "EcoGrid AI compares electricity prices, computing output, temperature and cooling demand. It helps operators choose workload schedules and spot inefficient machines early, reducing avoidable energy costs and downtime to improve the operating result.",
      "EcoGrid AI сопоставляет тариф на электричество, вычислительную мощность, температуру и нагрузку на охлаждение. Он помогает выбирать режимы работы и заранее замечать неэффективные устройства, сокращая лишние затраты энергии и простои ради лучшего операционного результата."
    ]
  },
  "ecocoin": {
    "title": [
      "A clearer view of ecosystem activity",
      "Понятная картина активности экосистемы"
    ],
    "body": [
      "Within EcoCoin, EcoGrid AI helps the team analyse ecosystem activity and flag unusual patterns for review. Transfer rules remain with the blockchain and wallet; AI does not set the token price or guarantee its growth.",
      "В EcoCoin наш AI помогает команде анализировать активность экосистемы и выделять необычные изменения для проверки. Правила переводов определяются блокчейном и кошельком; AI не задаёт стоимость токена и не гарантирует её рост."
    ]
  },
  "club": {
    "title": [
      "AI-assisted community learning",
      "AI в обучении и обсуждениях сообщества"
    ],
    "body": [
      "Club members exchange ideas about responsible energy, technology and practical skills. The team may use AI to structure explanations and discussion materials; it does not make decisions for members or promise project outcomes.",
      "В Клубе участники обмениваются идеями об ответственной энергетике, технологиях и практических навыках. Команда может использовать AI, чтобы структурировать объяснения и материалы для обсуждения; он не принимает решения за участников и не обещает результат проектов."
    ]
  }
});
 // Offer configuration only: no token ledger, financial credits or allocation execution.
 const aiProgram=Object.freeze({gift:500,cost:472,days:30,status:'planned'});
 const aiProgramTopics=Object.freeze({
  charge:['Compare charging sites','Сравнение зарядных площадок','The planned mode compares usage, electricity costs and downtime across eligible charging sites to guide allocation within the project.','Планируемый режим сравнивает загрузку, стоимость электричества и простои доступных зарядных площадок для распределения участия внутри проекта.'],
  solar:['Compare solar sites','Сравнение солнечных объектов','The planned mode compares generation, energy sales and operating costs across eligible solar sites, including storage operation where available.','Планируемый режим сравнивает выработку, продажу энергии и расходы доступных солнечных объектов, включая работу накопителей там, где они предусмотрены.'],
  mining:['Compare compatible mining equipment','Сравнение совместимого оборудования','The planned mode compares computing output, electricity, cooling and uptime across compatible equipment within the selected project. Hardware and algorithm limits remain in place.','Планируемый режим сравнивает вычислительную мощность, электричество, охлаждение и время работы совместимого оборудования внутри выбранного проекта. Ограничения оборудования и алгоритма сохраняются.'],
  energy:['AI mode for your selected project','AI-режим для выбранного проекта','Choose Charge, Solar or Mining and review how the proposed AI mode would work within that project.','Выберите Charge, Solar или Mining и изучите, как предлагаемый AI-режим будет работать внутри этого проекта.']
 });
 function programCopy(topic='energy',lang='en'){
  const ru=lang==='ru',c=aiProgramTopics[topic]||aiProgramTopics.energy,p=aiProgram,charge=typeof module==='object'&&module.exports?require('./charge-model.js'):globalThis.EcoChargeModel;
   const chargeProgram=topic==='charge';
   return {
   title:c[ru?1:0],body:topic==='charge'?charge.copy('ai',lang):c[ru?3:2],
   price:ru?`Планируемая единица: ${p.cost} EcoCoin · ${p.days} дней`:`Planned unit: ${p.cost} EcoCoin · ${p.days} days`,
    gift:ru?`Планируемый пример Академии: будущая выдача ${p.gift} EcoCoin покрыла бы один ${p.days}-дневный период и оставила ${p.gift-p.cost} EcoCoin. В этой сборке монеты не выпущены и не зачислены.`:`Academy planning example: a future ${p.gift} EcoCoin allocation would cover one ${p.days}-day period and leave ${p.gift-p.cost} EcoCoin. No coins are issued or credited in this build.`,
   rules:ru?'Это описание планируемого продукта, а не текущий подарок, баланс или средство платежа. Фактическое использование возможно только после запуска EcoCoin, утверждения условий и отдельного подтверждения услуги.':'This describes a planned product, not a current gift, balance or payment method. Actual use requires an EcoCoin launch, finalized terms and separate confirmation of the service.',
    supplement:chargeProgram?(ru?`Для Charge активный AI-режим добавляет ровно +${charge.policy.aiRateBonus} процентный пункт к фиксированному обязательству компании на ${p.days} дней. Надбавка действует только после серверной активации и увеличивает сумму, которую должна профинансировать компания.`:`For Charge, an active AI period adds exactly +${charge.policy.aiRateBonus} percentage point to the fixed company obligation for ${p.days} days. The uplift applies only after server activation and increases the amount the company must fund.`):ru?'Ставка и AI-надбавка Charge на Solar или Mining не переносятся. Любая дополнительная AI-услуга для них требует отдельного предложения и договора.':'The Charge rate and AI uplift do not apply to Solar or Mining. Any additional AI service for those projects requires a separate proposal and agreement.',
   distinction:ru?'Инструменты управления оборудованием использует команда. Дополнительный AI-режим для участника сравнивает доступные варианты размещения его участия внутри выбранного проекта. Это отдельная услуга, а не плата за обычную эксплуатацию.':'The team uses tools to operate equipment. The optional member AI mode compares eligible allocations of your participation within the selected project. This is separate from normal project operation.',
    renewal:chargeProgram?(ru?'Новый 30-дневный период начинается только после индивидуального подтверждения условий AI и связанного платежа. После отдельного запуска EcoCoin правила могут также предусмотреть подтверждённое зачисление, но в этой сборке монеты не выпускаются и не зачисляются. Автоматического продления и списания нет. После окончания периода ставка возвращается к базовой.':'A new 30-day period starts only after individual confirmation of the AI terms and the related payment. After a separate EcoCoin launch, the rules may also allow a confirmed coin credit, but no coins are issued or credited in this build. There is no automatic renewal or charge. When the period ends, the rate returns to the base rate.'):ru?'Условия для Solar или Mining определяются только отдельным предложением и договором выбранного проекта; подтверждение не запускает автоматическое продление или списание.':'Terms for Solar or Mining are defined only in the selected project’s separate proposal and agreement; confirmation never starts an automatic renewal or charge.',
   availability:topic==='charge'?charge.copy('aiEvidence',lang):ru?'AI-режим готовится к запуску. Подключение станет доступно только после утверждения условий; EcoCoin в этой сборке не выпускаются и не зачисляются.':'AI mode is in development. Activation will become available only after its terms are finalized; this build does not issue or credit EcoCoin.'
  };
 }
 function ai(topic='energy',lang='en'){const c=aiContent[topic]||aiContent.energy,i=lang==='ru'?1:0;return {title:c.title[i],body:c.body[i]};}
 const pct=n=>Math.round(n*100)+'%';
 function labels(lang='en'){return lang==='ru'?{solar:'Солнечные объекты',storage:'Накопители',ev:'Зарядки EV',commercial:'Коммерческая энергетика',grid:'Общая сеть'}:{solar:'Solar sites',storage:'Battery storage',ev:'EV chargers',commercial:'Commercial energy',grid:'The grid'};}
 function copy(lang='en'){return lang==='ru'?'Модель EcoGrid объединяет солнечную генерацию в США и Канаде, накопители и три независимых направления использования энергии: зарядки электромобилей, коммерческие договоры и продажу энергии в общую сеть. Фактический маршрут энергии зависит от объекта, спроса, тарифа, ограничений сети и договоров; единой постоянной процентной разбивки для экосистемы нет. Накопители переносят часть дневной выработки на вечер и ночь.':'The EcoGrid model combines solar generation in the U.S. and Canada, battery storage and three independent energy channels: EV charging, commercial energy agreements and grid sales. Actual routing depends on the site, demand, tariffs, grid constraints and contracts; there is no single fixed percentage split across the ecosystem. Storage shifts part of daytime generation into the evening and night.';}
 function evidence(lang='en'){return lang==='ru'?'Документы по солнечным объектам, накопителям, правам на активы, коммерческим договорам и продаже в общую сеть ещё не загружены в проект. Справочник станций не подтверждает владение или партнёрство.':'Documents for solar sites, battery storage, asset rights, commercial contracts and grid sales have not yet been added to this project. The station directory does not establish ownership or a partnership.';}
 function chargeRule(lang='en'){const ru=lang==='ru',charge=typeof module==='object'&&module.exports?require('./charge-model.js'):globalThis.EcoChargeModel;return `<aside class="business-charge-rule"><h3>${ru?'Отдельное правило EcoGrid Charge':'A separate EcoGrid Charge rule'}</h3><p>${charge.copy('split',lang)}</p><p>${charge.copy('formula',lang)}</p></aside>`;}
 function cadence(lang='en'){return (typeof module==='object'&&module.exports?require('./charge-model.js'):globalThis.EcoChargeModel).copy('cadence',lang);}
 function legacyCadence(lang='en'){return cadence(lang);}
 function flow(lang='en'){const ru=lang==='ru',l=labels(lang);return `<section class="business-flow" data-business-model="${config.version}" translate="no" aria-label="${ru?'Как движется энергия':'How the energy flows'}"><div class="business-flow-heading"><div><h2>${ru?'Как движется энергия':'How the energy flows'}</h2></div><small>${ru?'Модель, не телеметрия':'Model, not telemetry'}</small></div><p>${copy(lang)}</p><h3 translate="no">EcoGrid AI</h3><p>${ai('energy',lang).body}</p><div class="business-flow-map"><div class="business-source"><strong>${l.solar}</strong><span>${ru?'Дневная генерация':'Daytime generation'}</span></div><span class="business-flow-arrow" aria-hidden="true">→</span><div class="business-source"><strong>${l.storage}</strong><span>${ru?'Энергия для вечера и ночи':'Energy for evening and night'}</span></div><span class="business-flow-arrow" aria-hidden="true">→</span><div class="business-outlets"><div><span data-business-direct>${ru?'По спросу':'By demand'}</span><strong>${l.ev} + ${l.commercial}</strong></div><div><span data-business-grid>${ru?'По условиям сети':'By grid conditions'}</span><strong>${l.grid}</strong></div></div></div><small>${ru?'Маршруты показаны без постоянной процентной разбивки и не задают ставку или выплату клиенту.':'Channels are shown without a fixed percentage split and do not set a client rate or payment.'}</small>${chargeRule(lang)}<h3>${ru?'Кто покупает энергию':'Who buys our energy'}</h3><div class="business-buyers"><article><h4>${ru?'Водители':'Drivers'}</h4><p>${ru?'Оплата зарядки электромобилей.':'Payments for EV charging.'}</p></article><article><h4>${ru?'Коммерческие потребители':'Commercial customers'}</h4><p>${ru?'Долгосрочные договоры с ТЦ, бизнес-парками, отелями и автопарками; цена ниже местного тарифа — условие модели.':'Long-term contracts with shopping centers, business parks, hotels and fleets; pricing below the local tariff is a model assumption.'}</p></article><article><h4>${l.grid}</h4><p>${ru?'Продажа части выработки в общую сеть.':'Sales of a portion of production to the grid.'}</p></article></div></section>`;}
 function dispatch(hour=18,peak=false,budget=config.dispatchLimitKw){hour=Number.isFinite(hour)?Math.max(0,Math.min(24,hour)):18;budget=Math.max(0,Number.isFinite(budget)?budget:config.dispatchLimitKw);const day=Math.max(0,Math.sin((hour-6)/12*Math.PI)),solar=day*config.solarPeakKw,total=budget*(.48+.32*day+(peak?.2:0)),evRatio=Math.min(.8,.42+(peak?.18:0)+.12*Math.cos((hour-19)/12*Math.PI)),gridRatio=Math.max(.12,Math.min(.4,.33+.07*day-(peak?.09:0))),grid=total*gridRatio,ev=(total-grid)*evRatio,commercial=total-grid-ev;const rows=[['ev',ev],['commercial',commercial],['grid',grid]].map(([id,allocated])=>({id,allocated,weight:total?allocated/total:0}));return {hour,peak,solar,storage:solar-total,allocated:total,sites:rows};}
 function session(kwh){const round=n=>Math.round((n+Number.EPSILON)*100)/100,receipts=round(kwh*config.chargingPrice),electricity=round(kwh*config.solarStorageCost);return {energyKwh:kwh,chargingRate:config.chargingPrice,electricityRate:config.solarStorageCost,receipts,electricity,beforeOtherCosts:round(receipts-electricity)};}
 return Object.freeze({ai,aiContent,aiProgram,programCopy,config,pct,labels,copy,evidence,chargeRule,cadence,flow,dispatch,session});
});

},
"dist/demand-rhythm.js":function(module,exports,require){
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.EcoDemandRhythm=factory();})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const DAY_MS=86400000,VERSION='demand-v1';
 const hours=Object.freeze([0,6,9,12,17,21,24]);
 const sites=Object.freeze([
  {id:'city',ports:6,kwPerPort:60,profile:[15,30,78,50,90,55,15]},
  {id:'highway',ports:4,kwPerPort:150,profile:[22,42,60,80,75,40,22]},
  {id:'retail',ports:4,kwPerPort:120,profile:[5,10,35,72,95,45,5]}
 ].map(s=>Object.freeze({...s,profile:Object.freeze(s.profile)})));
 const demand=hours.map((_,i)=>sites.reduce((sum,s)=>sum+s.ports*s.kwPerPort*s.profile[i]/100,0));
 // Split at the 900 kW cap so integration is exact for the piecewise-linear Lab curve.
 const segments=[];
 for(let i=0;i<hours.length-1;i++){
  const a=hours[i],b=hours[i+1],u=demand[i],v=demand[i+1],cross=a+(900-u)*(b-a)/(v-u);
  const cuts=[a,...(cross>a&&cross<b?[cross]:[]),b];
  for(let j=0;j<cuts.length-1;j++){const x=cuts[j],y=cuts[j+1],at=h=>Math.min(900,u+(v-u)*(h-a)/(b-a));segments.push({a:x,b:y,u:at(x),v:at(y)});}
 }
 const energy=segments.reduce((n,s)=>n+(s.u+s.v)*(s.b-s.a)/2,0);
 function integral(hour){let sum=0;for(const s of segments){const length=Math.max(0,Math.min(s.b,hour)-s.a);sum+=s.u*length+(s.v-s.u)*length*length/(2*(s.b-s.a));}return sum/energy;}
 function cumulative(time){const day=Math.floor(time/DAY_MS);return day+integral((time-day*DAY_MS)/3600000);}
 function fraction(start,end){if(!Number.isFinite(start)||!Number.isFinite(end)||end<=start)return 0;return Math.max(0,cumulative(end)-cumulative(start));}
 function pace(time){const hour=((time%DAY_MS)+DAY_MS)%DAY_MS/3600000,s=segments.find(s=>hour>=s.a&&hour<s.b)||segments[0];return (s.u+(s.v-s.u)*(hour-s.a)/(s.b-s.a))*24/energy;}
 return Object.freeze({DAY_MS,VERSION,hours,sites,fraction,pace});
});

},
"dist/account-finance.js":function(module,exports,require){
(function(root,factory){const model=factory(typeof module==='object'&&module.exports?require('./calendar-yield.js'):root.EcoCalendarYield);if(typeof module==='object'&&module.exports)module.exports=model;else root.EcoFinance=model;})(typeof window==='undefined'?globalThis:window,function(calendar){
 'use strict';
 const tiers=Object.freeze([{id:'single',name:'Single',count:3,rate:13,minimum:250},{id:'network',name:'Network',count:3,rate:14,minimum:500},{id:'portfolio',name:'Portfolio',count:5,rate:15,minimum:800},{id:'scale',name:'Custom',count:10,rate:16,minimum:1000}].map(Object.freeze));
 const presets=Object.freeze([250,500,800]),minimum=250,maximum=10000000,paymentMaximum=100000,paymentMinimum=1,companyFee=0;
 const settlementDays=4,settlementPeriodMs=settlementDays*calendar.DAY,aiRateBonus=1,aiDays=30,aiPeriodMs=aiDays*calendar.DAY;
 const round=n=>Math.round(n*100)/100;
 const monthly=(capital,rate)=>calendar.monthCents(capital,rate)/100;
 const weekly=(capital,rate,start=Date.now(),basis=calendar.BASIS)=>basis==='week'?Math.round(capital*rate)/100:calendar.centsBetween(capital,rate,typeof start==='number'?start:Date.parse(start),(typeof start==='number'?start:Date.parse(start))+calendar.WEEK)/100;
 const eligible=(capital,tierId)=>{const tier=tiers.find(t=>t.id===tierId);return !!tier&&valid(capital)&&capital>=tier.minimum;};
 const periodTerms=(plan,start)=>plan?.rateTransition&&(typeof start==='number'?start:Date.parse(start))<Date.parse(plan.rateTransition.at)?{rate:plan.rateTransition.rate,ratePeriod:'week'}:{rate:plan?.rate||0,ratePeriod:plan?.ratePeriod||'week'};
 function aiWindow(plan){const start=Date.parse(plan?.ai?.activatedAt),requestedEnd=Date.parse(plan?.ai?.expiresAt),limit=start+aiPeriodMs;if(plan?.ai?.status!=='active'||!Number.isFinite(start))return null;const end=Number.isFinite(requestedEnd)?Math.min(requestedEnd,limit):limit;return end>start?{start,end}:null;}
 function aiActive(plan,at=Date.now()){const time=typeof at==='number'?at:Date.parse(at),window=aiWindow(plan);return !!window&&Number.isFinite(time)&&time>=window.start&&time<window.end;}
 function effectiveRate(plan,at=Date.now()){const terms=periodTerms(plan,at);return terms.rate+(aiActive(plan,at)?aiRateBonus:0);}
 function planAccrual(plan,from,to){let start=typeof from==='number'?from:Date.parse(from),end=typeof to==='number'?to:Date.parse(to);if(!plan||!Number.isFinite(start)||!Number.isFinite(end)||end<=start||!valid(plan.capital))return 0;const ai=aiWindow(plan),cuts=[start,end];if(ai){if(ai.start>start&&ai.start<end)cuts.push(ai.start);if(ai.end>start&&ai.end<end)cuts.push(ai.end);}cuts.sort((a,b)=>a-b);let total=0;for(let i=0;i<cuts.length-1;i++){const a=cuts[i],b=cuts[i+1],terms=periodTerms(plan,a);if(terms.ratePeriod===calendar.BASIS)total+=calendar.centsBetween(plan.capital,terms.rate+(aiActive(plan,a)?aiRateBonus:0),a,b);else total+=Math.round(weekly(plan.capital,terms.rate,a,'week')*100*(b-a)/calendar.WEEK);}return total/100;}
 const planSettlement=(plan,start=Date.now())=>planAccrual(plan,start,(typeof start==='number'?start:Date.parse(start))+settlementPeriodMs);
 // Kept for older callers; the current model settles a continuously accrued 4-day period.
 const planWeekly=planSettlement;
 function sessionBounds(s){if(!s||!['week','accrual'].includes(s.period))return null;const begin=Date.parse(s.periodStart||(s.weekStart?s.weekStart+'T00:00:00.000Z':s.date)),fallback=s.period==='week'?calendar.WEEK:(Number(s.settlementDays)||settlementDays)*calendar.DAY,end=Date.parse(s.periodEnd);return Number.isFinite(begin)?{begin,end:Number.isFinite(end)?end:begin+fallback}:null;}
 function nextPeriodStart(a){let from=Date.parse(a.plan?.appliedAt);if(!Number.isFinite(from))return NaN;for(let guard=0;guard<10000;guard++){const ends=(a.sessions||[]).map(sessionBounds).filter(Boolean).filter(p=>p.begin<=from&&p.end>from).map(p=>p.end);if(!ends.length)return from;from=Math.max(...ends);}throw Error('Too many overlapping accrual records.');}
 const valid=n=>Number.isFinite(n)&&n>=0&&n<=maximum&&Math.abs(n*100-Math.round(n*100))<.00001;
 // Accept unambiguous US or Russian amounts; reject mixed/invalid groupings.
 function parseAmount(value){
  if(typeof value==='number')return valid(value)?value:NaN;
  if(typeof value!=='string')return NaN;
  let s=value.trim().replace(/[\u00a0\u202f]/g,' ');if(!s)return NaN;
  if(/^\d{1,3}( \d{3})+([.,]\d{1,2})?$/.test(s))s=s.replaceAll(' ','').replace(',','.');
  else if(/^\d{1,3}(,\d{3})+(\.\d{1,2})?$/.test(s))s=s.replaceAll(',','');
  else if(/^\d+([.,]\d{1,2})?$/.test(s))s=s.replace(',','.');
  else return NaN;
  const n=Number(s);return valid(n)?n:NaN;
 }
 function profitState(a){
  const balance=round(Number(a.balance)||0),requests=Array.isArray(a.requests)?a.requests:[],sessions=Array.isArray(a.sessions)?a.sessions:[];
  const reserved=round(requests.filter(r=>r.type==='withdraw'&&r.status==='Pending').reduce((s,r)=>s+(Number(r.amount)||0),0));
  const approved=round(requests.filter(r=>r.type==='withdraw'&&r.status==='Approved').reduce((s,r)=>s+(Number(r.amount)||0),0));
  const recorded=round(sessions.reduce((s,r)=>s+(Number(r.payout)||0),0));
  const explicit=Number(a.profit?.settled),settled=Math.min(balance,Math.max(0,round(Number.isFinite(explicit)?explicit:recorded-approved)));
  const companyPayable=Math.max(0,round(Number(a.profit?.companyPayable)||0));
  return {settled,reserved,available:Math.max(0,round(settled-reserved)),freeBalance:Math.max(0,round(balance-settled)),recorded,companyPayable};
 }
 function summary(a){
  const active=a.plan?.status==='active'?a.plan:null,draft=a.planDraft||null;
  const balance=round(Number(a.balance)||0),capital=active?.capital||0,profit=profitState(a);
  const reserved=profit.reserved;
  const available=Math.max(0,round(balance-reserved));
  const recorded=profit.recorded;
  const pending=(a.requests||[]).filter(r=>r.type==='topup'&&r.status==='Pending');
  const gap=draft?Math.max(0,round(draft.capital-capital-available)):null;
  const stage=active?'active':pending.length?'pending':draft&&gap===0?'ready':draft?'draft':available>0?'funded':'new';
  const next=Number.isFinite(nextPeriodStart(a))?nextPeriodStart(a):Date.now(),accrual=planSettlement(active,next);
  return {balance,capital,reserved,available,withdrawable:profit.available,settledProfit:profit.settled,freeBalance:profit.freeBalance,companyPayable:profit.companyPayable,recorded,total:round(balance+capital),active,draft,pending,gap,stage,accrual,settlement:accrual,weekly:accrual,monthly:active&&active.ratePeriod===calendar.BASIS?monthly(active.capital,effectiveRate(active,next)):null};
 }
 const stationSelectable=(station,plan)=>!!station&&(!station.selectionClosed||(plan?.status==='active'&&plan.stationIds?.includes(station.id)));
 return Object.freeze({stationSelectable,version:5,settlementModel:'fixed-company-obligation',period:'accrual',ratePeriod:calendar.BASIS,calendar,settlementDays,settlementPeriodMs,aiRateBonus,aiDays,aiPeriodMs,monthly,eligible,periodTerms,aiWindow,aiActive,effectiveRate,planAccrual,planSettlement,planWeekly,nextPeriodStart,tiers,presets,minimum,maximum,paymentMinimum,paymentMaximum,companyFee,round,weekly,valid,parseAmount,profitState,summary});
});

},
"dist/funding-policy.js":function(module,exports,require){
(function(root,factory){
  const policy=factory(typeof module==='object'&&module.exports?require('./account-finance.js'):root.EcoFinance);
  if(typeof module==='object'&&module.exports)module.exports=policy;
  else root.EcoFunding=policy;
})(typeof window==='undefined'?globalThis:window,function(finance){
  'use strict';
  const offers=Object.freeze(finance.presets.map(capital=>Object.freeze({id:'start-'+capital,capital,fee:finance.companyFee,total:capital+finance.companyFee}))); 
  const offer=id=>offers.find(item=>item.id===id)||null;
  function state(account){
    const requests=(Array.isArray(account.requests)?account.requests:[]).filter(r=>r.type==='topup'&&Number.isFinite(r.amount)&&r.amount>0);
    const approved=requests.filter(r=>r.status==='Approved'&&r.payment?.method!=='manual').sort((a,b)=>(Date.parse(a.reviewedAt||a.date)||0)-(Date.parse(b.reviewedAt||b.date)||0));
    const pending=requests.filter(r=>r.status==='Pending');
    const first=approved[0]||null;
    const verified=approved.filter(r=>r.payment?.mode==='live'&&r.reviewSource==='provider_verified');
    return {first,pending,approved,hasFirstDeposit:!!first,hasVerifiedDeposit:verified.length>0,department:first?'retention':'ftd',stage:first?'funded':pending.length?'pending':offer(account.starterSelection?.id)?'selected':'new'};
  }
  function pricing(request){
    const net=Number(request.amount)||0;
    const fee=Number(request.payment?.companyFeeUSD)||0;
    return {net,fee,total:Math.round((net+fee)*100)/100};
  }
  function removePendingFees(account){let changed=false;for(const r of account.requests||[]){if(r.type==='topup'&&r.status==='Pending'&&r.payment?.starterId&&Number(r.payment.companyFeeUSD)>0){r.payment={...r.payment,companyFeeUSD:0,totalUSD:r.amount,creditedUSD:r.amount};changed=true;}}return changed;}
  // This is a funding intent, not a plan change or a balance entry.
  function intent(account){
    const s=finance.summary(account),history=state(account),draft=s.draft;
    const visible=!s.active&&!s.pending.length&&(draft?s.gap>0:s.balance===0&&!history.hasFirstDeposit);
    const required=draft&&s.gap>0?s.gap:finance.minimum;
    return {visible,amount:Math.max(finance.paymentMinimum,Math.min(required,finance.paymentMaximum)),required,remaining:Math.max(0,finance.round(required-finance.paymentMaximum)),draft,managerDraft:visible&&draft?.savedBy==='manager',available:s.available,collapseLab:visible};
  }
  function amountChips(amount){
    const anchors=[250,500,1000,2500,5000,10000,15000,20000,25000,50000,100000];
    const x=finance.valid(amount)?amount:finance.minimum;
    const lower=anchors.filter(n=>n<x).at(-1),upper=anchors.find(n=>n>x);
    return [...new Set([finance.minimum,lower,x,upper])].filter(n=>finance.valid(n)&&n>=finance.paymentMinimum&&n<=finance.paymentMaximum).sort((a,b)=>a-b);
  }
  function activation(account){
    const s=finance.summary(account),p=s.draft;
    const ready=!!(!s.active&&p&&finance.valid(p.capital)&&p.capital>=finance.minimum&&s.available>=p.capital);
    return {visible:ready,draft:p,available:s.available,reserved:s.reserved,after:ready?finance.round(s.available-p.capital):null};
  }
  function previewNotice(lang='en'){return lang==='ru'?'Превью оплаты: отправка заявки уведомит менеджера и администратора. Автоматического зачисления нет.':'Payment preview: submitting a request notifies your manager and administrator. No automatic credit.';}
  return Object.freeze({offers,offer,state,pricing,removePendingFees,intent,activation,amountChips,previewNotice});
});

},
"dist/withdrawal-policy.js":function(module,exports,require){
(function(root,factory){
 const policy=factory();
 if(typeof module==='object'&&module.exports)module.exports=policy;
 else root.EcoWithdrawals=policy;
})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const days=4,interval=days*24*60*60*1000;
 const timestamp=value=>{if(typeof value!=='string')return null;const n=Date.parse(value);return Number.isFinite(n)?n:null;};
 function activation(account){return timestamp(account.firstPlanActivatedAt)??(account.plan?.status==='active'?timestamp(account.plan.appliedAt):null);}
 function markActivation(account,now=Date.now()){
  const start=activation(account)??now;
  account.firstPlanActivatedAt=new Date(start).toISOString();
  return account.firstPlanActivatedAt;
 }
 function settledProfit(account){
  const balance=Math.max(0,Number(account.balance)||0),explicit=Number(account.profit?.settled);
  if(Number.isFinite(explicit))return Math.min(balance,Math.max(0,Math.round(explicit*100)/100));
  const recorded=(Array.isArray(account.sessions)?account.sessions:[]).reduce((n,r)=>n+(Number(r.payout)||0),0);
  const withdrawn=(Array.isArray(account.requests)?account.requests:[]).filter(r=>r.type==='withdraw'&&r.status==='Approved').reduce((n,r)=>n+(Number(r.amount)||0),0);
  return Math.min(balance,Math.max(0,Math.round((recorded-withdrawn)*100)/100));
 }
 function state(account,now=Date.now()){
  const requests=Array.isArray(account.requests)?account.requests:[];
  const withdrawals=requests.filter(r=>r.type==='withdraw');
  const start=activation(account);
  const completed=withdrawals.filter(r=>r.status==='Approved').map(r=>timestamp(r.reviewedAt)??timestamp(r.date)).filter(n=>n!==null);
  const last=completed.length?Math.max(...completed):null;
  const eligibleAt=start===null?null:Math.max(start,last??start)+interval;
  const pending=withdrawals.filter(r=>r.status==='Pending');
  const reserved=pending.reduce((n,r)=>n+(Number(r.amount)||0),0);
  const settled=settledProfit(account),available=Math.max(0,Math.round((settled-reserved)*100)/100);
  const timingReady=eligibleAt!==null&&now>=eligibleAt;
  const reason=start===null?'activate':pending.length?'pending':!timingReady?'waiting':available<1?'profit':'ready';
  return {days,start,last,eligibleAt,timingReady,pending:pending.length,reserved,settledProfit:settled,available,totalBalance:Math.max(0,Number(account.balance)||0),reason,canRequest:reason==='ready'};
 }
 return Object.freeze({days,interval,activation,markActivation,settledProfit,state});
});

},
"dist/live-accrual.js":function(module,exports,require){
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./demand-rhythm.js'),require('./calendar-yield.js'));else root.EcoLiveAccrual=factory(root.EcoDemandRhythm,root.EcoCalendarYield);})(typeof window==='undefined'?globalThis:window,function(rhythm,calendar){
 'use strict';
 const SETTLEMENT_DAYS=4,PERIOD_MS=SETTLEMENT_DAYS*24*60*60*1000;
 const cents=value=>Math.round(value*100);
 // Plan rates have at most two decimal places. Integer numerator, half-up USD rounding.
 function weeklyCents(capital,rate){
  if(!Number.isFinite(capital)||!Number.isFinite(rate)||capital<=0||rate<=0)return 0;
  const principal=cents(capital),basis=Math.round(rate*100);
  if(!Number.isSafeInteger(principal)||!Number.isSafeInteger(basis))return 0;
  const result=Number((BigInt(principal)*BigInt(basis)+5000n)/10000n);
  return Number.isSafeInteger(result)?result:0;
 }
 const timestamp=value=>typeof value==='number'?value:Date.parse(value);
 function liveAccrual({capital=0,weeklyRatePercent=0,periodStartedAt,periodEndsAt,now=Date.now(),active=true,curve,period,ratePeriod,monthlyRatePercent,aiRateBonus=0,aiActiveFrom,aiActiveUntil}={}){
  const start=timestamp(periodStartedAt),requestedEnd=timestamp(periodEndsAt),basis=ratePeriod||'week',legacyWeek=period==='week'||ratePeriod===undefined,end=Number.isFinite(requestedEnd)&&requestedEnd>start?requestedEnd:start+(legacyWeek?calendar.WEEK:PERIOD_MS),time=timestamp(now),monthly=basis===calendar.BASIS,rate=monthly?(monthlyRatePercent??weeklyRatePercent):weeklyRatePercent;
  const aiStart=timestamp(aiActiveFrom),aiEnd=timestamp(aiActiveUntil),amountTo=to=>{if(!monthly)return Math.round(weeklyCents(capital,rate)*(to-start)/calendar.WEEK);const cuts=[start,to];if(Number.isFinite(aiStart)&&aiStart>start&&aiStart<to)cuts.push(aiStart);if(Number.isFinite(aiEnd)&&aiEnd>start&&aiEnd<to)cuts.push(aiEnd);cuts.sort((a,b)=>a-b);let cents=0;for(let i=0;i<cuts.length-1;i++){const from=cuts[i],until=cuts[i+1],boost=Number.isFinite(aiStart)&&Number.isFinite(aiEnd)&&from>=aiStart&&from<aiEnd?aiRateBonus:0;cents+=calendar.centsBetween(capital,rate+boost,from,until,curve);}return cents;};
  const earnedCents=amountTo(end);
  if(!active||!earnedCents||!Number.isFinite(start)||!Number.isFinite(end)||!Number.isFinite(time))return {periodEarn:0,weeklyEarn:0,liveEarned:0,progress:0,msRemaining:0};
  const duration=end-start,elapsed=Math.max(0,Math.min(duration,time-start)),progress=elapsed/duration;
  const earnedFraction=curve===rhythm?.VERSION?Math.min(1,rhythm.fraction(start,start+elapsed)/7):progress;
  const liveCents=Math.min(earnedCents,Math.max(0,monthly?amountTo(start+elapsed):Math.round(earnedCents*earnedFraction)));
  return {periodEarn:earnedCents/100,weeklyEarn:earnedCents/100,liveEarned:liveCents/100,progress,msRemaining:duration-elapsed};
 }
 return Object.freeze({SETTLEMENT_DAYS,PERIOD_MS,cents,weeklyCents,liveAccrual});
});

},
"dist/crm-store.js":function(module,exports,require){
(function(root,factory){const store=factory();if(typeof module==='object'&&module.exports)module.exports=store;else root.EcoCrmStore=store;})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const key='ecocharge-demo-v1';
 function normalize(value){const a=value&&typeof value==='object'?value:{};a.balance=Number.isFinite(a.balance)?a.balance:0;for(const k of ['portfolio','requests','tickets','activity','adjustments','sessions'])if(!Array.isArray(a[k]))a[k]=[];a.client={name:'Lox',email:'lox@example.com',status:'Active',note:'',...a.client};a.manager={name:'Alexander Brown',...a.manager};return a;}
 const validAmount=n=>Number.isFinite(n)&&n>0&&n<=1e7&&Math.abs(n*100-Math.round(n*100))<.00001;
 const reserved=a=>a.requests.filter(r=>r.type==='withdraw'&&r.status==='Pending').reduce((s,r)=>s+r.amount,0);
 function changeBalance(a,operation,now=new Date().toISOString()){
  if(!['ftd','admin'].includes(operation.role))throw Error('This action requires a team account.');
  if(!['credit','debit'].includes(operation.kind)||!validAmount(operation.amount))throw Error('Enter a positive amount with at most two decimal places.');
  if(!operation.reason||operation.reason.trim().length<3)throw Error('Add a reason of at least 3 characters.');
  if(a.adjustments.some(v=>v.operationId===operation.id))throw Error('This operation was already saved.');
  if(operation.corrects){const old=a.adjustments.find(v=>v.operationId===operation.corrects);if(!old||!['credit','debit'].includes(old.kind)||old.requestId||a.miningPositions?.some(p=>p.status==='active'&&p.id===old.operationId)||old.amount!==operation.amount||old.kind===operation.kind||operation.requestId||a.adjustments.some(v=>v.corrects===operation.corrects))throw Error('This entry cannot be corrected again.');}
  if(a.balance!==operation.expectedBalance)throw Error('The balance changed in another tab. Reopen the operation to review it.');
  let request=null;
  if(operation.requestId){request=a.requests.find(r=>r.id===operation.requestId);if(!request||request.status!=='Pending'||request.type!=='topup'||operation.kind!=='credit'||request.amount!==operation.amount)throw Error('This funding request has changed or was already reviewed.');}
  const next=Math.round((a.balance+(operation.kind==='credit'?operation.amount:-operation.amount))*100)/100;
  if(next<reserved(a)||next>1e7)throw Error('Keep reserved withdrawals covered and the balance within the allowed range.');
  const before={balance:a.balance,capital:a.plan?.capital||0,stations:a.portfolio.length,tariff:a.plan?.name||'None'};
  if(operation.kind==='credit'){
   if(request){request.status='Approved';request.reviewedAt=now;request.reviewedBy=operation.actor;request.reviewSource='manual_demo';request.payment={...request.payment,mode:'preview'};}
  }
  a.balance=next;
  a.adjustments.unshift({operationId:operation.id,kind:operation.kind,amount:operation.amount,date:now,actor:operation.actor,reason:operation.reason.trim(),before,after:{...before,balance:next},requestId:request?.id||null,...(operation.corrects?{corrects:operation.corrects}:{})});
  a.activity.unshift({date:now,text:operation.actor+': '+operation.kind+' $'+operation.amount.toFixed(2)+' · '+operation.reason.trim()});
  return a;
 }
 return Object.freeze({key,normalize,validAmount,reserved,changeBalance});
});

},
"dist/central/workspace-model.js":function(module,exports,require){
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
   if(tier&&finance.valid(value.capital)&&finance.eligible(value.capital,tier.id)&&ids.length<=tier.count)Object.assign(c,{tierId:tier.id,plan:tier.name,capital:value.capital,rate:tier.rate,ratePeriod:finance.ratePeriod,weekly:finance.planSettlement({capital:value.capital,rate:tier.rate,ratePeriod:finance.ratePeriod,tierId:tier.id}),stationCount:tier.count});
  if(value.lesson)c.lesson=session(value.lesson.energyKwh);
  if(value.energy){const e=value.energy;if(!['city','highway','retail','ev','commercial','grid'].includes(e.location)||!Number.isFinite(e.hour)||e.hour<0||e.hour>24||typeof e.peak!=='boolean')throw Error('Invalid model scenario.');c.energy={location:e.location,hour:Math.round(e.hour*100)/100,peak:e.peak,modelVersion:['ev','commercial','grid'].includes(e.location)?business.config.version:'demand-v1'};}
  return c;
 }
 function rows(c,lang='en'){if(!c)return [];const ru=lang==='ru',money=n=>new Intl.NumberFormat(ru?'ru-RU':'en-US',{style:'currency',currency:'USD'}).format(n),r=[];
   if(c.plan)r.push([ru?'Выбор на момент вопроса':'Selection when sent',c.plan+' · '+money(c.capital)],[ru?'Обязательство за 4 дня':'4-day obligation',money(c.weekly??finance.planSettlement({capital:c.capital,rate:c.rate,ratePeriod:c.ratePeriod||finance.ratePeriod,tierId:c.tierId}))+' · '+c.rate+'%']);
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

},
"dist/central/energy-model.js":function(module,exports,require){
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('../demand-rhythm.js'));else root.EcoEnergyModel=factory(root.EcoDemandRhythm);})(typeof globalThis!=='undefined'?globalThis:this,function(rhythm){
 'use strict';
 // Illustrative demand profiles, not station telemetry or a production AI prediction.
 const {hours,sites}=rhythm;
 function sample(hour=18,peak=false,budget=900){hour=Number.isFinite(hour)?Math.max(0,Math.min(24,hour)):18;budget=Number.isFinite(budget)?Math.max(0,budget):900;
  const index=Math.min(hours.length-2,Math.max(0,hours.findIndex((h,i)=>hours[i+1]>=hour))),ratio=(hour-hours[index])/(hours[index+1]-hours[index]);
  const rows=sites.map(s=>{const load=Math.min(100,(s.profile[index]+(s.profile[index+1]-s.profile[index])*ratio)*(peak?({city:1.35,highway:1.65,retail:1.15}[s.id]):1));const capacity=s.ports*s.kwPerPort;return {...s,load,capacity,demand:capacity*load/100};});
  const demand=rows.reduce((n,s)=>n+s.demand,0),factor=demand?Math.min(1,budget/demand):0;
  const allocated=Math.min(demand,budget),result=rows.map(s=>({...s,allocated:s.demand*factor,displayAllocated:Math.floor(s.demand*factor)}));
  // Whole-kW labels add up to the displayed total without rounding drift.
  const remainder=Math.round(allocated)-result.reduce((n,s)=>n+s.displayAllocated,0);
  result.slice().sort((a,b)=>(b.allocated-b.displayAllocated)-(a.allocated-a.displayAllocated)).slice(0,remainder).forEach(s=>s.displayAllocated++);
  return {hour,peak,budget,demand,allocated,limited:demand>budget,sites:result};
 }
 return {sample};
});

},
"dist/central/energy-journal-model.js":function(module,exports,require){
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('../live-accrual.js'),require('../demand-rhythm.js'),require('./energy-model.js'));else root.EcoEnergyJournalModel=factory(root.EcoLiveAccrual,root.EcoDemandRhythm,root.EcoEnergyModel);})(typeof window==='undefined'?globalThis:window,function(live,rhythm,energy){
 'use strict';
 const business=typeof module==='object'&&module.exports?require('../business-model.js'):globalThis.EcoBusiness,legacyIds=['city','highway','retail'];
 const DAY=rhythm.DAY_MS,ids=['ev','commercial','grid'];
 // This is an inverse teaching illustration, not measured receipts or ownership.
 const assumptions=Object.freeze({share:business.config.inverseShare,costRatio:business.config.inverseCostRatio,kwhPrice:business.config.inverseKwhPrice});
 function split(total,weights){const sum=weights.reduce((a,b)=>a+b,0);if(!sum)return weights.map(()=>0);const exact=weights.map(w=>total*w/sum),values=exact.map(Math.floor);exact.map((v,i)=>({i,rest:v-values[i]})).sort((a,b)=>b.rest-a.rest||a.i-b.i).slice(0,total-values.reduce((a,b)=>a+b,0)).forEach(v=>values[v.i]++);return values;}
 function chain(cents){const netCents=Math.round(cents/assumptions.share),revenueCents=Math.round(netCents/(1-assumptions.costRatio));return {clientCents:cents,netCents,revenueCents,costCents:revenueCents-netCents,kwh:revenueCents/100/assumptions.kwhPrice,...assumptions};}
 function between(payload,from,to){if(to<=from)return 0;const value=now=>Math.round(live.liveAccrual({...payload,now}).liveEarned*100);return Math.max(0,value(to)-value(from));}
 function view(payload={},now=Date.now(),hour,peak=false){const v=live.liveAccrual({...payload,now}),start=Date.parse(payload.periodStartedAt),dayStart=Math.floor(now/DAY)*DAY,dayEnd=dayStart+DAY,active=!!(payload.active&&v.weeklyEarn>0);
  const todayCents=active?between(payload,dayStart,now):0,targetCents=active?between(payload,dayStart,dayEnd):0,sample=business.dispatch(hour??((now-dayStart)/3600000),peak),parts=split(todayCents,sample.sites.map(s=>s.allocated));
  return {...v,active,todayCents,targetCents,periodCents:Math.round(v.liveEarned*100),dayStart,dayEnd,pace:active?rhythm.pace(now):0,chain:chain(todayCents),sites:sample.sites.map((s,i)=>({id:s.id,cents:parts[i],weight:sample.allocated?s.allocated/sample.allocated:0})),startedToday:active&&start>dayStart};
 }
function windows(account,payload){const closed=(account.sessions||[]).filter(s=>['week','accrual'].includes(s.period)).map(s=>({active:true,capital:s.capital,weeklyRatePercent:s.rate,monthlyRatePercent:s.ratePeriod==='calendar-month'?s.rate:undefined,ratePeriod:s.ratePeriod||'week',period:s.period,periodStartedAt:s.periodStart,periodEndsAt:s.periodEnd,curve:rhythm.VERSION}));return [...closed,...(payload?.active?[payload]:[])];}
 function daily(account,payload,date){const from=Math.floor(date/DAY)*DAY,to=from+DAY;let cents=0;for(const p of windows(account,payload))cents+=between(p,from,to);const weights=ids.map(id=>{let sum=0;for(let h=.25;h<24;h+=.5)sum+=business.dispatch(h).sites.find(s=>s.id===id).allocated;return sum;});const parts=split(cents,weights);return {from,to,cents,sites:ids.map((id,i)=>({id,cents:parts[i]})),illustrative:true};}
 function report(account,now=Date.now()){const settled=(account.sessions||[]).filter(s=>s.period==='accrual'&&Date.parse(s.periodEnd)<=now&&Date.parse(s.date||s.periodEnd)<=now).sort((a,b)=>Date.parse(a.periodEnd)-Date.parse(b.periodEnd)),latest=settled.at(-1);const end=latest?Date.parse(latest.periodEnd):Math.floor(now/DAY)*DAY,start=latest?Date.parse(latest.periodStart):end-4*DAY,credits=settled.filter(s=>Date.parse(s.periodEnd)>start&&Date.parse(s.periodEnd)<=end);return {id:'SETTLEMENT-'+new Date(end).toISOString().slice(0,10),start,end,credits:credits.map(s=>s.id),cents:credits.reduce((n,s)=>n+Math.round(s.payout*100),0),settlementDays:4};}
 function milestones(account,payload,now=Date.now()){const credits=(account.sessions||[]).reduce((n,s)=>n+Math.round((s.payout||0)*100),0),p=live.liveAccrual({...payload,now}),first=(account.planHistory||[]).map(h=>Date.parse(h.plan?.appliedAt||h.date)).filter(Number.isFinite).sort((a,b)=>a-b)[0]??Date.parse(account.plan?.appliedAt);return [
  {id:'dollar',done:credits+Math.round(p.liveEarned*100)>=100},
  {id:'settlement',done:(account.sessions||[]).some(s=>s.period==='accrual')},
  {id:'withdrawal',done:(account.requests||[]).some(r=>r.type==='withdraw'&&r.status==='Approved')},
  {id:'month',done:Number.isFinite(first)&&now-first>=30*DAY}
 ];}
 function scenario(value){if(!value||![...ids,...legacyIds].includes(value.location)||!Number.isFinite(value.hour)||value.hour<0||value.hour>24||typeof value.peak!=='boolean')throw Error('Choose a valid model scenario.');return {location:value.location,hour:Math.round(value.hour*100)/100,peak:value.peak,modelVersion:ids.includes(value.location)?business.config.version:rhythm.VERSION};}
 function recommendation(payload,location,percent){if(![...ids,...legacyIds].includes(location)||!Number.isInteger(percent)||percent<10||percent>80)throw Error('Choose a model share between 10 and 80%.');const weeklyCents=Math.round(live.liveAccrual({...payload,now:Date.parse(payload?.periodStartedAt)+live.PERIOD_MS}).weeklyEarn*100),before=(legacyIds.includes(location)?energy.sample(18):business.dispatch(18)).sites,weights=before.map(s=>s.allocated),total=weights.reduce((a,b)=>a+b,0),index=before.findIndex(s=>s.id===location),newWeights=weights.map((w,i)=>i===index?percent:(100-percent)*w/(total-weights[index])),old=split(weeklyCents,weights),next=split(weeklyCents,newWeights);return {location,percent,weeklyCents,beforeCents:old[index],afterCents:next[index],deltaCents:next[index]-old[index],totalDeltaCents:0};}
 return Object.freeze({assumptions,split,chain,view,between,daily,report,milestones,scenario,recommendation});
});

},
"dist/central/plan-document.js":function(module,exports,require){
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('../account-finance.js'):root.EcoFinance);if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoPlanDocument=api;})(typeof window==='undefined'?globalThis:window,function(finance){
 'use strict';
 const business=typeof module==='object'&&module.exports?require('../business-model.js'):globalThis.EcoBusiness;
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function snapshot(account,directory=[],selection='auto',now=new Date().toISOString()){
  if(!['auto','active','draft'].includes(selection))throw Error('Invalid document selection.');
  const state=account.state,active=finance.summary(state).active;
  const plan=selection==='draft'?state.planDraft:selection==='active'?active:active||state.planDraft;
  if(selection!=='auto'&&!plan)throw Error('This plan is no longer available.');
  const kind=plan===active&&active?'active':plan?'draft':'none';
  let timezone=state.ecosystem?.timezone||'UTC';try{new Intl.DateTimeFormat('en-US',{timeZone:timezone});}catch{timezone='UTC';}
  // Deliberately exclude identity uploads, document numbers, internal notes and balances.
  const next=kind==='active'?(account.nextAccrual||account.nextWeek):null,estimate=plan?(Number.isFinite(next?.payout)?next.payout:finance.planSettlement(plan,Date.parse(now))):null;
  return {schema:1,id:'EC-PLAN-'+account.client.id.replace(/[^a-zA-Z0-9-]/g,'').slice(-12)+'-v'+account.version+'-'+kind,version:account.version,clientId:account.client.id,kind,generatedAt:now,timezone,
   client:{name:account.client.name,email:account.client.email||'',phone:account.client.phone||''},
   plan:plan?{name:plan.name,tierId:plan.tierId,capital:plan.capital,rate:plan.rate,ratePeriod:plan.ratePeriod||'week',rateTransition:plan.rateTransition||null,monthly:plan.ratePeriod===finance.ratePeriod?finance.monthly(plan.capital,plan.rate):null,settlement:estimate,weekly:estimate,date:kind==='active'?plan.appliedAt:plan.savedAt||null,
    stations:plan.stationIds.map(id=>{const s=directory.find(s=>s.id===id);return {id,name:s?.name||'AFDC '+id,location:s?[s.city,s.state].filter(Boolean).join(', '):''};})}:null,
   period:next?{type:next.period||'accrual',settlementDays:next.settlementDays||finance.settlementDays,start:next.periodStart,end:next.periodEnd}:null};
 }
 function content(d,language='en'){
  const ru=language==='ru',t=(en,ruText)=>ru?ruText:en,locale=ru?'ru-RU':'en-US';
  const money=v=>new Intl.NumberFormat(locale,{style:'currency',currency:'USD'}).format(v);
  const date=v=>v&&Number.isFinite(Date.parse(v))?new Intl.DateTimeFormat(locale,{dateStyle:'medium',timeStyle:'short',timeZone:d.timezone}).format(new Date(v)):'—';
  const status=d.kind==='active'?t('Active plan','Активный план'):d.kind==='draft'?t('Saved selection · not activated','Сохранённый выбор · не активирован'):t('No plan selected','План не выбран');
  const p=d.plan,legacy=d.period?.type==='week',sections=[{title:t('Energy business model','Модель энергетического бизнеса'),body:business.copy(language)+' '+business.evidence(language)},{title:t('Account details','Данные аккаунта'),rows:[[t('Client','Клиент'),d.client.name],[t('Email','Почта'),d.client.email||'—'],[t('Phone','Телефон'),d.client.phone||'—'],[t('Document reference','Номер образца'),d.id],[t('Prepared','Сформирован'),date(d.generatedAt)+' · '+d.timezone]]},
   {title:t('Your plan terms','Условия вашего плана'),rows:[[t('Status','Статус'),status],[t('Station group','Группа станций'),p?.name||'—'],[t('Plan amount','Сумма плана'),p?money(p.capital):'—'],[p?.ratePeriod===finance.ratePeriod?t('Calendar-month model rate','Ставка модели за календарный месяц'):t('Preserved earlier model rate','Сохранённая ставка по прежним условиям'),p?new Intl.NumberFormat(locale).format(p.rate)+'%':'—'],[d.period?legacy?t('Model amount for the preserved earlier period','Расчёт за сохранённый прежний период'):t('Model amount for the current 4-day period','Расчёт за текущий период 4 дня'):t('Model amount for the next 4 days','Расчёт на следующие 4 дня'),p?money(p.settlement):'—'],[d.kind==='active'?t('Current terms effective from','Текущие условия действуют с'):t('Selection saved','Выбор сохранён'),date(p?.date)],...(p?.rateTransition?[[t('Monthly rate starts','Месячная ставка действует с'),date(p.rateTransition.at)]]:[]),...(d.period?[[t('Current period starts','Начало текущего периода'),date(d.period.start)],[t('Current period ends','Конец текущего периода'),date(d.period.end)]]:[])],body:p?p.ratePeriod===finance.ratePeriod?t('Calculation: capital × monthly rate, prorated by UTC calendar days in each month (28–31). Full calendar months reach the stated rate exactly. Accrual is continuous; available profit is fixed every 4 days. Any preserved open earlier period keeps its original terms until the transition date.','Расчёт: капитал × месячная ставка, пропорционально календарным дням UTC в каждом месяце (28–31). За полный календарный месяц получается ровно указанная ставка. Начисление идёт непрерывно; открытый прежний период сохраняет исходные условия до даты перехода, а доступная прибыль по текущей модели фиксируется раз в 4 дня.'):t('Calculation: plan amount × the preserved earlier model rate. No compounding or extra credit per vehicle.','Расчёт: сумма плана × сохранённая ставка по прежним условиям. Без капитализации и дополнительных начислений за автомобили.'):t('Choose and save a plan to include its amount and 4-day calculation.','Выберите и сохраните план, чтобы включить сумму и расчёт за 4 дня.')},
   {title:t('Reference stations','Справочные станции'),rows:p?p.stations.map(s=>['AFDC '+s.id,s.name+(s.location?' · '+s.location:'')]):[],body:t('Source: US Department of Energy / AFDC public directory. A listing or selection does not establish EcoGrid ownership, affiliation or your legal rights to a station.','Источник: публичный каталог Минэнерго США / AFDC. Запись или выбор станции не подтверждают владение EcoGrid, партнёрство или ваши юридические права на станцию.')},
   {title:t('How the model account works','Как работает модельный счёт'),body:legacy?t('Funding and plan activation are separate steps. This preserved earlier period keeps its original terms until the transition date. The open-period counter is illustrative and cannot be withdrawn before the period is recorded. New periods use the current 4-day settlement model.','Пополнение и активация плана — отдельные шаги. Сохранённый прежний период действует по исходным условиям до даты перехода. Счётчик незавершённого периода является иллюстрацией и недоступен для вывода до записи периода. Новые периоды работают по текущей 4-дневной модели.'):t('Funding and plan activation are separate steps. Activation moves the selected amount from available funds into the plan. Accrual is continuous, and each complete 4-day period fixes available profit as a recorded model credit. The open-period counter is illustrative and cannot be withdrawn before it is recorded. Changing the plan starts a new 4-day period: completed periods are credited first; an unfinished period is not credited.','Пополнение и активация плана — отдельные шаги. При активации выбранная сумма переводится из свободного остатка в план. Начисление идёт непрерывно, а каждый полный период в 4 дня фиксирует доступную прибыль как модельное начисление. Счётчик незавершённого периода является иллюстрацией и недоступен для вывода до записи начисления. Смена плана начинает новый период на 4 дня: завершённые периоды зачисляются, незавершённый период не зачисляется.')},
   {title:t('Withdrawal schedule','Порядок заявки на вывод'),body:t('A first request becomes eligible 4 × 24 hours after the first plan activation. Approval starts the next 4-day interval; rejection releases the reservation without a new interval. Requests use available funds, excluding active plan capital, pending withdrawal reservations and the open period. The request range is $1–$100,000, subject to available funds. A settlement date is not a payout date. No real transfer is performed in this build.','Первая заявка доступна через 4 × 24 часа после первой активации плана. Подтверждение начинает следующие 4 суток; отказ снимает резерв без нового ожидания. Используется свободный остаток: капитал активного плана, резервы заявок и незавершённый период в него не входят. Диапазон заявки — от 1 до 100 000 USD в пределах свободного остатка. Дата фиксации начисления не является датой выплаты. Реальных переводов в этой сборке нет.')},
   {title:t('Document status','Статус документа'),body:t('This is a personalized sample of the saved account terms, not an executed agreement or an investment offer. It does not verify identity, promise returns or create ownership, payment or withdrawal rights. Contracting entity, jurisdiction, asset rights, costs, loss risk and exit terms require verified documents and legal review before any real agreement. No signature or seal is included.','Это персональный образец сохранённых условий счёта, а не заключённый договор или инвестиционное предложение. Он не подтверждает личность, не обещает доходность и не создаёт права собственности, выплаты или вывода. Юридическое лицо, юрисдикция, права на активы, расходы, риск потерь и условия выхода требуют подтверждённых документов и юридической проверки до реального договора. Подписей и печатей нет.')}
  ];
  const charge=typeof module==='object'&&module.exports?require('../charge-model.js'):globalThis.EcoChargeModel;sections.push({title:t('Charge · proposed revenue distribution','Charge · предлагаемое распределение выручки'),body:charge.copy('split',language)+' '+charge.copy('formula',language)+' '+charge.copy('allocation',language)+' '+charge.copy('rights',language)});
  return {lang:ru?'ru':'en-US',title:t('Personal plan record','Персональные условия плана'),badge:t('SAMPLE · NOT A SIGNED AGREEMENT','ОБРАЗЕЦ · НЕ ПОДПИСАННЫЙ ДОГОВОР'),intro:t('A snapshot of your saved account terms. Keep the reference and preparation date when discussing it with your manager.','Снимок сохранённых условий аккаунта. При обсуждении с менеджером укажите номер образца и дату формирования.'),status,sections,footer:t('EcoGrid · PLAN DOCUMENT','EcoGrid · УСЛОВИЯ ПЛАНА'),print:t('Print / Save as PDF','Печать / Сохранить PDF')};
 }
 function html(d,lang){const c=content(d,lang);return `<article class="plan-paper" lang="${c.lang}" translate="no"><header><span class="plan-paper-brand">EcoGrid</span><small>${esc(c.badge)}</small><h1>${esc(c.title)}</h1><p>${esc(c.intro)}</p></header>${c.sections.map(s=>`<section><h2>${esc(s.title)}</h2>${s.rows?.length?`<table><tbody>${s.rows.map(([k,v])=>`<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table>`:''}${s.body?`<p>${esc(s.body)}</p>`:''}</section>`).join('')}<footer>${esc(c.footer)} · ${esc(d.id)}</footer></article>`;}
 const paperCSS=`*{box-sizing:border-box}.plan-paper{font:14px/1.6 Arial,sans-serif;color:#18373d;background:#fff;padding:32px;max-width:820px;margin:auto;overflow-wrap:anywhere}.plan-paper header{border-bottom:2px solid #187669;padding-bottom:20px}.plan-paper-brand{display:block;font-size:18px;font-weight:700;letter-spacing:1px}.plan-paper header small{display:block;font-size:11px;color:#42665f;margin-top:16px}.plan-paper h1{font-size:28px;line-height:1.25;margin:12px 0}.plan-paper h2{font-size:17px;line-height:1.4;margin:24px 0 10px;break-after:avoid}.plan-paper p{font:inherit;color:#42606a;margin:10px 0}.plan-paper table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:13px}.plan-paper th,.plan-paper td{padding:9px 0;border-bottom:1px solid #dce6e5;vertical-align:top;text-align:left;overflow-wrap:anywhere}.plan-paper th{width:42%;padding-right:16px;font-weight:400;color:#42606a}.plan-paper td{font-weight:600}.plan-paper tr{break-inside:avoid}.plan-paper footer{border-top:1px solid #c4d6d3;margin-top:28px;padding-top:12px;font-size:10px}.plan-print-toolbar{max-width:820px;margin:16px auto;font:14px Arial,sans-serif}.plan-print-toolbar button{padding:13px 20px;background:#183e43;color:#fff;border:0;border-radius:6px;font:inherit;cursor:pointer}@media(max-width:600px){.plan-paper{padding:20px;font-size:13px}.plan-paper h1{font-size:23px}.plan-paper table{font-size:12px}.plan-paper th{width:40%}}@page{size:A4;margin:16mm}@media print{body{margin:0;background:#fff}.plan-print-toolbar{display:none}.plan-paper{padding:0;max-width:none;font-size:10pt}.plan-paper h1{font-size:22pt}.plan-paper h2{font-size:12pt;margin-top:18px}.plan-paper table{font-size:9pt}.plan-paper th,.plan-paper td{padding:6px 0}.plan-paper th{padding-right:12px}}`;
 function printHTML(d,lang){const c=content(d,lang);return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(c.title)} · ${esc(d.id)}</title><style>${paperCSS}</style></head><body><div class="plan-print-toolbar"><button onclick="window.print()">${esc(c.print)}</button></div>${html(d,lang)}</body></html>`;}
 function pdf(d,lang,jsPDF,fonts){
  const c=content(d,lang),out=new jsPDF({unit:'pt',format:'a4',compress:true});
  for(const [style,data]of Object.entries(fonts)){out.addFileToVFS(style+'.ttf',data);out.addFont(style+'.ttf','EcoPlan',style);}
  out.setProperties({title:c.title,subject:d.id,author:'EcoGrid'});let y=44;const left=44,right=551,width=507,bottom=778;
  const face=(size=10,bold=false,color='#18373d')=>{out.setFont('EcoPlan',bold?'bold':'normal');out.setFontSize(size);out.setTextColor(color);};
  function ensure(height){if(y+height>bottom){out.addPage();y=44;face(9,true,'#42665f');out.text('EcoGrid  /  '+d.id,left,y);y+=28;}}
  function paragraph(text,size=10,color='#42606a'){face(size,false,color);for(const line of out.splitTextToSize(text,width)){ensure(size*1.5);face(size,false,color);out.text(line,left,y);y+=size*1.5;}y+=9;}
  face(15,true);out.text('EcoGrid',left,y);y+=30;paragraph(c.badge,9,'#187669');paragraph(c.title,23,'#18373d');paragraph(c.intro);
  for(const [index,s]of c.sections.entries()){ensure(index===2?200:65);face(13,true);out.text(s.title,left,y);y+=24;
   for(const [k,v]of s.rows||[]){face(9);const labels=out.splitTextToSize(k,188);face(10,true);const values=out.splitTextToSize(String(v),295);const height=Math.max(labels.length,values.length)*14+20;ensure(height);face(9,false,'#42606a');out.text(labels,left,y,{lineHeightFactor:14/9});face(10,true);out.text(values,256,y,{lineHeightFactor:1.4});y+=height-14;out.setDrawColor('#dce6e5');out.line(left,y,right,y);y+=14;}
   if(s.body)paragraph(s.body);y+=10;
  }
  const pages=out.getNumberOfPages();for(let i=1;i<=pages;i++){out.setPage(i);face(8,false,'#42665f');out.text(c.footer,left,807);out.text(i+' / '+pages,right,807,{align:'right'});}
  return out;
 }
 return {snapshot,content,html,printHTML,paperCSS,pdf,filename:(d,lang)=>'ECO-CHARGE-plan-v'+d.version+'-'+d.kind+'-'+(lang==='ru'?'ru':'en')+'.pdf'};
});

},
"dist/central/funnel-model.js":function(module,exports,require){
'use strict';
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoFunnel=api;})(typeof window==='object'?window:globalThis,()=>{
 const reasons={no_budget:['No available funds','Нет свободных денег'],no_trust:['Needs more trust / evidence','Не доверяет'],unreachable:['Could not reach','Недозвон'],not_fit:['Not a fit','Не целевой'],thinking:['Needs time to consider','Подумает'],do_not_contact:['Asked not to be contacted','Просит не связываться'],other:['Other · explain in comment','Другое · уточнить в комментарии']};
 const outcomes={note:['Note only · no call','Только заметка · без звонка'],no_answer:['Called · no answer','Позвонили · не ответил'],connected:['Called · conversation held','Позвонили · разговор состоялся'],wrong_number:['Called · wrong number','Позвонили · неверный номер']};
 const consentVersion='followup-v1';
 const consentText={sms:'I agree to receive automated follow-up texts from EcoGrid at the number provided about my registration request. Up to 2 messages in the first 24 hours. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is optional and is not a condition of purchase.',email:'I agree to receive follow-up emails from EcoGrid about this registration request. This is optional; I can unsubscribe at any time.'};
 const consentTextRu={sms:'Я согласен получать от EcoGrid автоматические SMS по указанному номеру по моей заявке: до 2 сообщений в первые 24 часа. Оператор может взимать плату за сообщения и трафик. Для отказа — ответ STOP, для помощи — HELP. Согласие необязательно и не является условием покупки.',email:'Я согласен получать от EcoGrid письма по этой заявке. Это необязательно; я могу отказаться от таких писем в любое время.'};
 function sla(record,time=Date.now()){const journey=record.context?.journey||record.journey;if(journey?.route==='nurture')return {waiting:false,ageMs:null,minutes:null,overdue:false,fast:false};const start=Date.parse(journey?.consultationAt||record.created),attempt=Date.parse(record.funnel?.firstAttemptAt),ageMs=Number.isFinite(start)?Math.max(0,(Number.isFinite(attempt)?attempt:time)-start):null,waiting=!Number.isFinite(attempt)&&!['not_qualified','do_not_contact'].includes(record.crm?.status)&&!record.duplicateOf&&!record.needsReview;return {waiting,ageMs,minutes:ageMs===null?null:Math.floor(ageMs/60000),overdue:waiting&&ageMs>=900000,fast:Number.isFinite(attempt)&&ageMs<=300000};}
 function queue(rows,time=Date.now()){return rows.map(r=>({...r,sla:sla(r,time)})).filter(r=>r.sla.waiting).sort((a,b)=>(b.sla.ageMs||0)-(a.sla.ageMs||0)||a.id.localeCompare(b.id));}
 function firstWithdrawal(state,time=Date.now()){return (state?.requests||[]).filter(r=>r.type==='withdraw'&&r.status==='Approved'&&r.amount>0&&Number.isFinite(Date.parse(r.reviewedAt))&&Date.parse(r.reviewedAt)<=time).sort((a,b)=>a.reviewedAt.localeCompare(b.reviewedAt)||String(a.id).localeCompare(String(b.id)))[0]||null;}
 const stages=['leads','accounts','connected','qualified','plan_saved','ftd','activated','repeat_deposit','club_invited'];
 function aggregate(rows,group){const result=new Map();for(const r of rows){const key=group==='caller'?r.callerId||'unassigned':group==='landing_caller'?(r.landing||'unknown')+'|'+(r.callerId||'unassigned'):r.landing||'unknown';let g=result.get(key);if(!g){g={key,landing:r.landing||'unknown',callerId:r.callerId||null,...Object.fromEntries(stages.map(k=>[k,0])),ftdCents:0,fundingCents:0,attempted:0,within5:0,totalWaitMs:0,reasons:{}};result.set(key,g);}for(const stage of stages)if(r.stages[stage])g[stage]++;g.ftdCents+=r.ftdCents||0;g.fundingCents+=r.fundingCents||0;if(r.firstAttemptMs!==null&&r.firstAttemptMs!==undefined){g.attempted++;g.within5+=r.firstAttemptMs<=300000?1:0;g.totalWaitMs+=r.firstAttemptMs;}if(r.closeReason)g.reasons[r.closeReason]=(g.reasons[r.closeReason]||0)+1;}
 return [...result.values()].map(g=>({...g,ftdRate:g.leads?g.ftd/g.leads:0,averageFirstCallMinutes:g.attempted?g.totalWaitMs/g.attempted/60000:null})).sort((a,b)=>b.ftd-a.ftd||b.leads-a.leads||a.key.localeCompare(b.key));}
 return {reasons,outcomes,consentVersion,consentText,consentTextRu,sla,queue,firstWithdrawal,stages,aggregate};
});

},
"server/finance.cjs":function(module,exports,require){
const finance=require('../dist/account-finance.js'),withdrawals=require('../dist/withdrawal-policy.js'),charge=require('../dist/charge-model.js');
const live=require('../dist/live-accrual.js');
const fail=message=>{const e=Error(message);e.status=400;throw e;};
const day=86400000;
function checkedPlan(value,stationIds,now=new Date().toISOString()){
 const chargeVersions=new Set([charge.policy.version,charge.policy.legacyVersion,...(charge.policy.legacyVersions||[])]);
 if(chargeVersions.has(value?.economyModel)){if(!finance.eligible(value.capital,value.tierId))fail('Choose a valid plan amount and station group.');try{return {...charge.selection(value,stationIds),tierId:value.tierId,name:finance.tiers.find(t=>t.id===value.tierId)?.name||'Charge',rate:finance.tiers.find(t=>t.id===value.tierId)?.rate||13,allocations:charge.allocate(value.capital,value.stationIds),appliedAt:now};}catch(e){fail(e.message);}}
 const tier=finance.tiers.find(t=>t.id===value?.tierId);
 if(!tier||!finance.valid(value.capital)||!finance.eligible(value.capital,tier.id)||!Array.isArray(value.stationIds)||value.stationIds.length!==tier.count&&!(tier.id==='single'&&value.stationIds.length===1)||new Set(value.stationIds).size!==value.stationIds.length||value.stationIds.some(id=>!stationIds.has(id)))fail('Choose a valid plan amount and station group.');
 return {tierId:tier.id,name:tier.name,rate:tier.rate,ratePeriod:finance.ratePeriod,calculationVersion:finance.calendar.VERSION,period:'accrual',settlementDays:finance.settlementDays,capital:value.capital,stationIds:value.stationIds.slice(),appliedAt:now};
}
function ensureProfit(a,now=new Date().toISOString()){const state=finance.profitState(a);if(!a.profit||!Number.isFinite(Number(a.profit.settled))){a.profit={settled:state.settled,companyPayable:state.companyPayable,migratedAt:now};}else{a.profit.settled=Math.min(Math.max(0,finance.round(Number(a.profit.settled)||0)),Math.max(0,finance.round(Number(a.balance)||0)));a.profit.companyPayable=Math.max(0,finance.round(Number(a.profit.companyPayable)||0));}return a.profit;}
function values(a){const s=finance.summary(a);return {balance:s.balance,freeBalance:s.freeBalance,settledProfit:s.settledProfit,withdrawable:s.withdrawable,companyPayable:s.companyPayable,available:s.available,reserved:s.reserved,capital:s.capital,stations:s.active?.stationIds.length||0,tariff:s.active?.name||'None',rate:s.active?.rate||0};}
function fundingCents(value){if(!Number.isFinite(value)||value<0||value>1e10||Math.abs(value*100-Math.round(value*100))>1e-4)fail('Verified funding contains an invalid USD amount.');return Math.round(value*100);}
function verifiedCoverage(obligation,op){
 const funding=op.verifiedFunding;
 if(!funding){if(['verifiedRevenue','companyReserve'].some(key=>op[key]!==undefined&&Number(op[key])!==0))fail('Allocate verified funding through the shared funding ledger.');return charge.coverage({obligation});}
 const due=fundingCents(obligation),pool=fundingCents(Number(funding.participantPool)||0),poolTotal=fundingCents(Number(funding.participantPoolTotal??funding.participantPool)||0),reserve=fundingCents(Number(funding.companyReserve)||0),gross=fundingCents(Number(funding.verifiedRevenue)||0);
 if(pool>poolTotal||poolTotal>gross)fail('The verified revenue pool is inconsistent with its source.');
 const revenueApplied=Math.min(due,pool),reserveApplied=Math.min(due-revenueApplied,reserve),funded=revenueApplied+reserveApplied,payable=due-funded;
 return {obligation:due/100,revenue:gross/100,participantPool:pool/100,companyRevenue:(gross-poolTotal)/100,revenueApplied:revenueApplied/100,reserveApplied:reserveApplied/100,funded:funded/100,companyPayable:payable/100,status:payable===0?'funded':funded?'partially-funded':'payable'};
}
function record(a,op,before,now,extra={}){
 const entry={operationId:op.id,kind:op.kind,date:now,actor:op.actor,reason:op.reason,before,after:values(a),...extra};
 a.adjustments.unshift(entry);return entry;
}
function validateOperation(a,op){
 if(!['admin','ftd','client','system'].includes(op.role)||!/^[-\w]{3,100}$/.test(op.id||''))fail('Enter a valid operation and reason.');
 if(typeof op.reason!=='string'||op.reason.trim().length<3||op.reason.length>250)fail('Add a reason of at least 3 characters.');
 op.reason=op.reason.trim();if(a.adjustments.some(x=>x.operationId===op.id))fail('This operation was already saved.');
}
function assertSelectable(value,stationIds,previous){
 const retained=previous?.status==='active'?previous.stationIds:[];
 if(value?.stationIds?.some(id=>stationIds.closed?.has(id)&&!retained.includes(id)))fail('Enrollment is closed for a selected station. Choose another location.');
}
function activate(a,value,stationIds,op,now=new Date().toISOString()){
 assertSelectable(value,stationIds,a.plan);
 validateOperation(a,op);const p=checkedPlan(value,stationIds,now),before=values(a),s=finance.summary(a),profit=ensureProfit(a,now);
 const balance=finance.round(s.balance+s.capital-p.capital);
 if(balance<s.reserved)fail('The plan needs additional available funds.');
 if(balance>finance.maximum)fail('The balance exceeds the allowed range.');
 const previous=a.plan?structuredClone(a.plan):null,additionalCapital=Math.max(0,finance.round(p.capital-s.capital)),profitSpent=Math.min(s.withdrawable,Math.max(0,finance.round(additionalCapital-s.freeBalance)));
 profit.settled=finance.round(profit.settled-profitSpent);
 a.balance=balance;withdrawals.markActivation(a,Date.parse(now));a.plan={...p,status:'active'};a.portfolio=p.stationIds.slice();delete a.planDraft;
 a.planHistory??=[];a.planHistory.push({date:now,actor:op.actor,reason:op.reason,previous,plan:structuredClone(a.plan)});
 return record(a,{...op,kind:'plan'},before,now);
}
function nextAccrual(a){
 const start=Date.parse(a.plan?.appliedAt);if(a.plan?.status!=='active'||!Number.isFinite(start)||a.plan.capital<=0)return null;
 // Historical weekly records remain immutable and advance the first new period.
 const from=finance.nextPeriodStart(a);
 const terms=finance.periodTerms(a.plan,from),legacyWeek=terms.ratePeriod==='week',transition=Date.parse(a.plan.rateTransition?.at),end=legacyWeek?Math.min(from+finance.calendar.WEEK,Number.isFinite(transition)&&transition>from?transition:from+finance.calendar.WEEK):from+finance.settlementPeriodMs,baseRate=terms.rate,obligation=legacyWeek?finance.round(finance.weekly(a.plan.capital,baseRate,from,'week')*(end-from)/finance.calendar.WEEK):finance.planAccrual(a.plan,from,end),window=finance.aiWindow(a.plan),aiApplied=!legacyWeek&&!!window&&window.start<end&&window.end>from;return {period:legacyWeek?'week':'accrual',settlementDays:legacyWeek?7:finance.settlementDays,periodStart:new Date(from).toISOString(),periodEnd:new Date(end).toISOString(),capital:a.plan.capital,rate:legacyWeek?baseRate:finance.effectiveRate(a.plan,from),baseRate,aiRateBonus:aiApplied?finance.aiRateBonus:0,aiApplied,ratePeriod:terms.ratePeriod,obligation,payout:obligation};
}
function creditAccrual(a,op,now=new Date().toISOString()){
 validateOperation(a,op);if(op.role==='client')fail('Team access required.');
 const w=nextAccrual(a);if(!w||Date.parse(w.periodEnd)>Date.parse(now))fail(w?.period==='week'?'The preserved legacy week is not complete yet.':'A complete uncredited 4-day accrual period is required.');
 if(op.periodStart!==w.periodStart)fail('The accrual period changed. Review it again.');
 const obligation=w.obligation??w.payout,covered=verifiedCoverage(obligation,op),nextCents=live.cents(a.balance)+Math.round(covered.funded*100);
 if(nextCents>live.cents(finance.maximum))fail('The balance exceeds the allowed range.');
 const before=values(a),profit=ensureProfit(a,now),session={id:op.id,...w,payout:covered.funded,obligation:covered.obligation,funded:covered.funded,companyPayable:covered.companyPayable,participantPool:covered.revenueApplied,revenueApplied:covered.revenueApplied,reserveApplied:covered.reserveApplied,settlementStatus:covered.status,stationIds:a.plan.stationIds.slice(),planName:a.plan.name,date:now,actor:op.actor,source:op.role==='system'?'automatic_obligation':'manual_verified_settlement'};a.sessions.push(session);
 a.balance=nextCents/100;profit.settled=finance.round(profit.settled+covered.funded);profit.companyPayable=finance.round(profit.companyPayable+covered.companyPayable);return record(a,{...op,kind:w.period==='week'?'weekly':'accrual'},before,now,{amount:covered.funded,obligation:covered.obligation,funded:covered.funded,companyPayable:covered.companyPayable,revenueApplied:covered.revenueApplied,reserveApplied:covered.reserveApplied,periodStart:w.periodStart,periodEnd:w.periodEnd});
}
function fundPayable(a,op,now=new Date().toISOString()){
 validateOperation(a,op);if(op.role==='client'||op.role==='system')fail('Verified team access required.');
 const session=a.sessions.find(s=>s.id===op.sessionId),outstanding=Number(session?.companyPayable)||0;if(!session||outstanding<=0)fail('Choose an unpaid obligation.');
 const covered=verifiedCoverage(outstanding,op);if(covered.funded<=0)fail('Add verified revenue or company reserve funding.');
 const nextCents=live.cents(a.balance)+Math.round(covered.funded*100);if(nextCents>live.cents(finance.maximum))fail('The balance exceeds the allowed range.');
 const before=values(a),profit=ensureProfit(a,now);session.funded=finance.round((Number(session.funded)||0)+covered.funded);session.payout=session.funded;session.companyPayable=finance.round(outstanding-covered.funded);session.participantPool=finance.round((Number(session.participantPool)||0)+covered.revenueApplied);session.revenueApplied=finance.round((Number(session.revenueApplied)||0)+covered.revenueApplied);session.reserveApplied=finance.round((Number(session.reserveApplied)||0)+covered.reserveApplied);session.settlementStatus=session.companyPayable===0?'funded':'partially-funded';session.fundingEntries??=[];session.fundingEntries.push({operationId:op.id,date:now,verifiedRevenue:covered.revenue,participantPoolAvailable:covered.participantPool,revenueApplied:covered.revenueApplied,reserveApplied:covered.reserveApplied,funded:covered.funded});
 a.balance=nextCents/100;profit.settled=finance.round(profit.settled+covered.funded);profit.companyPayable=Math.max(0,finance.round(profit.companyPayable-covered.funded));return record(a,{...op,kind:'obligation_funding'},before,now,{amount:covered.funded,sessionId:session.id,companyPayable:session.companyPayable,revenueApplied:covered.revenueApplied,reserveApplied:covered.reserveApplied});
}
function review(a,op,now=new Date().toISOString()){
 validateOperation(a,op);if(op.role==='client')fail('Team access required.');
 const r=a.requests.find(r=>r.id===op.requestId);if(!r||r.status!=='Pending'||!['approve','reject'].includes(op.decision))fail('This request was already reviewed or is unavailable.');
 if(r.type==='topup'&&r.payment?.reportedByClient&&op.decision==='approve'&&op.receiptChecked!==true)fail('Confirm receipt verification before crediting this request.');
 const before=values(a),profit=ensureProfit(a,now);let balance=a.balance;
 if(op.decision==='approve'){
  if(r.type==='withdraw'){const state=withdrawals.state(a,Date.parse(now));if(r.amount>state.settledProfit||r.amount>a.balance)fail('Only settled profit can be withdrawn.');balance=finance.round(a.balance-r.amount);profit.settled=finance.round(profit.settled-r.amount);}
  else if(r.type==='topup')balance=finance.round(a.balance+r.amount);
  else fail('Invalid payment request.');
  if(!finance.valid(balance))fail('The balance exceeds the allowed range.');
 }
 a.balance=balance;Object.assign(r,{status:op.decision==='approve'?'Approved':'Rejected',reviewedAt:now,reviewedBy:op.actor,reviewSource:'manual_demo',reviewReason:op.reason});
 if(r.type==='topup'){r.payment={...r.payment,mode:'preview'};if(op.decision==='approve'&&op.receiptChecked===true)r.receiptChecked=true;}
 return record(a,{...op,kind:r.type+'_'+op.decision},before,now,{amount:r.amount,requestId:r.id,source:'manual_demo'});
}
const nextWeek=nextAccrual,creditWeek=creditAccrual;
module.exports={assertSelectable,checkedPlan,ensureProfit,values,activate,nextAccrual,creditAccrual,fundPayable,nextWeek,creditWeek,review};

},
"server/account-policy.cjs":function(module,exports,require){
const funding=require('../dist/funding-policy.js'),withdrawals=require('../dist/withdrawal-policy.js');
const model=require('../dist/account-finance.js'),{tiers}=model,finance=require('./finance.cjs');
const workspace=require('../dist/central/workspace-model.js');
const clean=(v,max=200)=>typeof v==='string'?v.trim().slice(0,max):'';
const cents=n=>Number.isFinite(n)&&n>=0&&n<=1e7&&Math.abs(n*100-Math.round(n*100))<.00001;
const fail=(message,status=400)=>{const e=Error(message);e.status=status;throw e;};
function initial(client,manager){return {balance:0,profit:{settled:0,companyPayable:0},portfolio:[],plan:null,requests:[],tickets:[],sessions:[],activity:[],adjustments:[],client:{name:client.name,email:client.email,status:'Active',note:''},manager:{name:manager.name,title:'Account Manager',email:'',whatsapp:'',telegram:'',photo:''},tariffs:tiers,tariffModelVersion:5,monthlyTermsVersion:1,legacyWeeklyModelVersion:1,accrualModelVersion:3,settlementModel:'fixed-company-obligation',chargePolicy:'charge-fixed-obligation-v3'};}
function plan(value,stationIds){if(!value)return null;return {...finance.checkedPlan(value,stationIds),...(funding.offer(value.starterId)?{starterId:value.starterId}:{})};}
function draft(value,previous,stationIds,source='client',activePlan=null){
 if(!value)fail('Choose a valid plan amount and station group.');
 const next=plan(value,stationIds);
 const key=p=>p&&JSON.stringify([p.tierId,p.capital,p.stationIds,p.starterId]);
 if(source==='client'&&previous&&key(next)===key(previous))return structuredClone(previous);
 finance.assertSelectable(value,stationIds,activePlan);
 return {...next,savedBy:source,savedAt:new Date().toISOString()};
}
function mergeClient(previous,submitted,stationIds,now=new Date().toISOString()){
 if(!submitted||typeof submitted!=='object')fail('Account data is required.');const a=structuredClone(previous);
 // Server owns balances, rates, approvals, audit history, manager and identity.
 const oldPlan=a.plan?.status==='active'?a.plan:null;
 const nextPlan=submitted.plan?.status==='active'?submitted.plan:null;
 const changedPlan=JSON.stringify(nextPlan&&[nextPlan.tierId,nextPlan.capital,nextPlan.stationIds])!==JSON.stringify(oldPlan&&[oldPlan.tierId,oldPlan.capital,oldPlan.stationIds]);
 if(!changedPlan&&oldPlan&&JSON.stringify(nextPlan?.ai||null)!==JSON.stringify(oldPlan.ai||null))fail('Charge AI activation is controlled by the server.',403);
 if(changedPlan){if(!nextPlan)fail('An active plan cannot be removed through the client form.');
  finance.activate(a,nextPlan,stationIds,{id:'PLAN-'+require('node:crypto').randomUUID(),actor:'client',role:'client',reason:'Client confirmed plan'},now);
 }else if(submitted.balance!==previous.balance)fail('Only your manager can change the available balance.',403);
 // Activation consumes the draft; do not restore a stale draft from the submitted snapshot.
 if(!changedPlan){if(submitted.planDraft)a.planDraft=draft(submitted.planDraft,a.planDraft,stationIds,'client',a.plan);else delete a.planDraft;}
 if(submitted.starterSelection&&funding.offer(submitted.starterSelection.id))a.starterSelection={id:submitted.starterSelection.id,selectedAt:now};
 const incoming=Array.isArray(submitted.requests)?submitted.requests:[];const additions=incoming.filter(r=>!a.requests.some(old=>old.id===r.id));
 if(additions.length>1)fail('Send one payment request at a time.');
 for(const r of additions){if(!['topup','withdraw'].includes(r.type)||!cents(r.amount)||r.amount<model.paymentMinimum||r.amount>model.paymentMaximum||r.status!=='Pending'||!/^[-\w]{3,100}$/.test(r.id))fail('Invalid payment request.');
  if(a.requests.some(old=>old.type===r.type&&old.status==='Pending'))fail('A request is already awaiting review.');
  if(r.type==='withdraw'){const w=withdrawals.state(a,Date.parse(now));if(!w.canRequest||r.amount>w.available)fail('The withdrawal window or settled profit does not allow this request.');}
  let payment;if(r.payment){const p=r.payment;payment={mode:'preview',method:p.method==='crypto'?'crypto':'card',currency:'USD'};if(p.method==='crypto'){const nets={'usdt-trc20':['USDT','TRC20'],'usdt-erc20':['USDT','ERC20'],'usdc-base':['USDC','Base'],btc:['BTC','Bitcoin']};const net=nets[p.networkId];if(!net)fail('Invalid payment network.');Object.assign(payment,{networkId:p.networkId,asset:net[0],network:net[1]});}const offer=funding.offer(p.starterId);if(offer){if(offer.capital!==r.amount)fail('Starting amount does not match the plan.');Object.assign(payment,{starterId:offer.id,companyFeeUSD:0,totalUSD:offer.total,creditedUSD:offer.capital});}}
  if(r.type==='topup')payment={...payment,mode:'preview',reportedByClient:true};
  a.requests.push({id:r.id,type:r.type,amount:r.amount,status:'Pending',date:now,...(payment?{payment}:{})});
 }
 // Existing tickets retain staff replies; clients can only append their own messages.
 for(const t of Array.isArray(submitted.tickets)?submitted.tickets.slice(0,100):[]){let old=a.tickets.find(x=>x.id===t.id);if(!old){if(!/^[-\w]{3,100}$/.test(t.id)||!clean(t.message,1500))continue;old={id:t.id,subject:clean(t.subject,100),message:clean(t.message,1500),reply:'',date:now,status:'Open',messages:[{from:'client',text:clean(t.message,1500),date:now}]};if(t.context){try{old.context={...workspace.context(t.context,stationIds),capturedAt:now};}catch(e){fail(e.message);}}a.tickets.push(old);}else{const previousCount=old.messages?.length||0,newMessages=(Array.isArray(t.messages)?t.messages:[]).slice(previousCount);for(const msg of newMessages.slice(0,3)){if(msg.from!=='client'||!clean(msg.text,1500))continue;old.messages??=[];old.messages.push({from:'client',text:clean(msg.text,1500),date:now});old.message=clean(msg.text,1500);old.status='Open';}if(t.readReply===old.reply)old.readReply=old.reply;}}
 for(const key of ['journey','preferences','onboarding','savedStations'])if(submitted[key]!==undefined&&JSON.stringify(submitted[key]).length<10000)a[key]=structuredClone(submitted[key]);
 if(submitted.exploration!==undefined)a.exploration=workspace.exploration(submitted.exploration,stationIds);
 if(submitted.ecosystem&&JSON.stringify(submitted.ecosystem).length<12000){const e=submitted.ecosystem;
  let timezone=clean(e.timezone,80)||'UTC';try{new Intl.DateTimeFormat('en-US',{timeZone:timezone});}catch{timezone='UTC';}
  a.ecosystem={read:Array.isArray(e.read)?e.read.filter(x=>typeof x==='string'&&x.length<=2000).slice(-100):[],scenarios:Array.isArray(e.scenarios)?e.scenarios.slice(0,6).map(p=>({...plan(p,stationIds),id:clean(p.id,80),label:clean(p.label,80)})):[],timezone};
 }
 return a;
}
module.exports={tiers,clean,cents,fail,initial,mergeClient,draft};

}},cache={};function load(id){if(id==="node:crypto")return {randomUUID:()=>crypto.randomUUID()};if(cache[id])return cache[id].exports;if(!modules[id])throw Error("Missing domain module "+id);const module={exports:{}};cache[id]=module;modules[id](module,module.exports,name=>{if(name.startsWith("node:"))return load(name);const p=id.split("/");p.pop();for(const s of name.split("/")){if(s==="..")p.pop();else if(s!==".")p.push(s);}return load(p.join("/"));});return module.exports;}window.EcoSandboxDomain={publicPlan:load("dist/public-plan.js"),profile:load("dist/central/profile-model.js"),journey:load("dist/journey-model.js"),finance:load("dist/account-finance.js"),operations:load("server/finance.cjs"),policy:load("server/account-policy.cjs"),crm:load("dist/crm-store.js"),planDocument:load("dist/central/plan-document.js"),funnel:load("dist/central/funnel-model.js"),journal:load("dist/central/energy-journal-model.js")};})();
