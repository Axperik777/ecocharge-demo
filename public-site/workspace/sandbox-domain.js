/* Pure browser-side preview models only; no server, database or authentication. */
(()=>{const modules={"dist/charge-model.js":function(module,exports,require){
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoChargeModel=api;})(typeof window==='object'?window:globalThis,()=>{
 'use strict';
  const policy=Object.freeze({version:'charge-fixed-obligation-v3',legacyVersion:'charge-revenue-v2',legacyVersions:['charge-revenue-v2','charge-revenue-v1'],termsVersion:3,participantShare:.42,minimumStations:3,minimumAmount:250,currency:'USD',baseAllocationIncluded:true,aiDays:30,aiRateBonus:1,settlementDays:4,executionStatus:'not-connected',settlementModel:'fixed-company-obligation'});
 const pairs={
  who:['EcoGrid is an energy and technology project. Charge focuses on EV charging infrastructure. The agreement must identify the full legal name and registration number of the contracting entity.','EcoGrid — проект в сфере энергетики и технологий. Charge связан с зарядной инфраструктурой для электромобилей. В договоре должны быть указаны полное юридическое название и регистрационный номер стороны договора.'],
  where:['Charge targets the United States. Before participation, review the company jurisdiction and address, each site address, its operator and evidence of the right to receive its revenue. These documents are not yet supplied here.','Целевой рынок Charge — США. До участия нужно проверить юрисдикцию и адрес компании, адрес каждого объекта, оператора и документы на право получать его выручку. Эти документы пока не предоставлены.'],
  work:['The proposed model covers financing and operation: site selection, equipment, connection, maintenance and driver payments. The proposal must specify the responsibilities of EcoGrid, the operator and contractors.','Предлагаемая модель объединяет финансирование и эксплуатацию: выбор площадки, оборудование, подключение, обслуживание и оплату водителями. Предложение должно определять обязанности EcoGrid, оператора и подрядчиков.'],
  source:['Drivers pay for EV charging. Forty-two percent of verified Charge revenue is the primary funding pool for participant payment obligations; the company reserve covers an eligible shortfall. A calculation or station photograph does not confirm revenue or reserve funding.','Водители оплачивают зарядку электромобилей. 42% подтверждённой выручки Charge — основной источник покрытия обязательств по выплатам участникам; допустимый дефицит покрывает резерв компании. Расчёт или фотография станции не подтверждают выручку и наличие резерва.'],
  rights:['After activation, the signed agreement must define the company payment obligation, reporting, four-day settlement schedule and exit conditions. The site and complete funding budget must be known. Choosing a directory location does not create ownership or a direct right to station revenue.','После активации подписанный договор должен определять обязательство компании по выплате, отчётность, расчёт каждые 4 дня и условия выхода. Объект и полный бюджет финансирования должны быть известны. Выбор локации в справочнике не создаёт собственность или прямое право на выручку станции.'],
  split:['42% of verified Charge revenue is applied first to the fixed company payment obligations. If that amount is insufficient, an eligible company reserve covers the shortfall; any uncovered amount remains recorded as company payable and is never silently written off. This rule does not present the remainder as a client or company ownership share.','42% подтверждённой выручки Charge в первую очередь направляются на покрытие фиксированных обязательств компании по выплатам. Если этой суммы недостаточно, допустимый дефицит покрывает резерв компании; непокрытая сумма остаётся зафиксированной задолженностью компании и не списывается скрыто. Остаток не обозначается как доля собственности клиента или компании.'],
  formula:['After agreement activation, the selected Charge plan creates a fixed company payment obligation of 13–16% per UTC calendar month, accrued continuously by time. The obligation is not reduced by weak station revenue, but its fulfilment depends on the company and its reserve; it is not a guarantee of capital repayment.','После активации договора выбранный план Charge создаёт фиксированное обязательство компании по выплате 13–16% за календарный месяц UTC с непрерывным начислением пропорционально времени. Слабая выручка станции не уменьшает обязательство, но его исполнение зависит от компании и её резерва; это не гарантия возврата капитала.'],
  allocation:['Choose at least three eligible chargers. Basic allocation across them is included. Changes apply to future periods under the agreement; completed distributions are never moved between clients. More chargers diversify demand exposure but cannot guarantee a payout.','Выберите минимум три доступные для участия зарядки. Базовое распределение между ними включено. Изменения применяются к будущим периодам по договору; завершённые выплаты между клиентами не перераспределяются. Несколько зарядок распределяют риск загрузки, но не гарантируют выплату.'],
 ai:['Charge AI is an optional service. While a server-confirmed 30-day connection is active, it adds exactly +1 percentage point to the selected Charge monthly rate. Connection requires individual confirmation of the AI terms and the related payment. There is no automatic renewal. Base Charge terms continue without AI.','AI для Charge — дополнительная услуга. Пока действует подтверждённое сервером подключение на 30 дней, оно добавляет ровно +1 процентный пункт к месячной ставке выбранного плана Charge. Подключение требует индивидуального подтверждения условий AI и связанного платежа. Автоматического продления нет. Без AI продолжают действовать базовые условия Charge.'],
 aiEvidence:['The +1 percentage point applies only inside a server-recorded active Charge AI interval and increases the company payment obligation for that interval. A client-side flag cannot activate it. AI does not create missing revenue or remove company liability.','Надбавка +1 процентный пункт действует только внутри зафиксированного сервером активного периода AI для Charge и увеличивает обязательство компании за этот интервал. Клиентская отметка не может её включить. AI не создаёт отсутствующую выручку и не снимает ответственность компании.'],
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
  if(capital>budget*count)throw Error('Amount exceeds the configured funding limit.');
  return {capital,count,budget:Math.round(budget*count*100)/100,assumptions:a,rows:[5,10,20].map((sessions,i)=>{const revenue=sessions*a.kwhPerSession*a.days*a.pricePerKwh;return {id:['conservative','base','strong'][i],sessionsPerDay:sessions,revenue:Math.round(revenue*count*100)/100,...portfolio(allocations.map(r=>({id:r.id,revenue:Math.round(revenue*100)/100,obligation:periodOffer(r.capital,13).baseAmount,companyReserve:0})))}})};
 }
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function html(lang='en',{compact=false}={}){const ru=lang==='ru';return `<section class="charge-policy" data-charge-policy="${policy.version}" translate="no"><p class="charge-policy-label">EcoGrid Charge · ${ru?'МОДЕЛЬ УЧАСТИЯ':'PARTICIPATION MODEL'}</p><h2>${ru?'Фиксированное обязательство компании. Расчёт каждые 4 дня.':'Fixed company obligation. Settlement every 4 days.'}</h2><div class="charge-policy-split"><div><strong>42%</strong><span>${ru?'подтверждённой выручки сначала покрывают обязательства':'of verified revenue funds obligations first'}</span></div><div><strong>${ru?'Резерв':'Reserve'}</strong><span>${ru?'покрывает допустимый дефицит':'covers an eligible shortfall'}</span></div><div><strong translate="no">companyPayable</strong><span>${ru?'фиксирует непокрытую сумму':'records any uncovered amount'}</span></div></div><p>${escape(copy('formula',lang))}</p><p>${escape(copy('allocation',lang))}</p>${compact?'':`<details><summary>${ru?'Ответы перед решением':'Answers before you decide'}</summary>${faq(lang).map(r=>`<h3>${escape(r.question)}</h3><p>${escape(r.answer)}</p>`).join('')}<p>${escape(copy('proof',lang))}</p></details>`}</section>`;}
 return Object.freeze({policy,settlementReference,periodOffer,weeklyReference,weeklyOffer,copy,faq,selection,allocate,coverage,settlement,portfolio,scenarios,assumptions,html});
});

},
"dist/compute-model.js":function(module,exports,require){
'use strict';
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoCompute=api;})(typeof window==='object'?window:globalThis,()=>{
 const pair=(en,ru)=>Object.freeze([en,ru]);
 const intents=Object.freeze({capacity:pair('Managed GPU service for a business workload','GPU-сервис для задачи бизнеса'),participation:pair('Participation in a specific infrastructure project','Участие в конкретном инфраструктурном проекте')});
 const workloads=Object.freeze({inference:pair('AI inference and agents','AI-инференс и агенты'),'fine-tuning':pair('Model fine-tuning','Дообучение моделей'),training:pair('Model training','Обучение моделей'),rendering:pair('Rendering and media','Рендеринг и медиа'),'data-processing':pair('Data processing / HPC','Обработка данных / HPC'),other:pair('Another workload','Другая задача')});
 const acceleratorClasses=Object.freeze({undecided:pair('Select with a specialist','Подобрать со специалистом'),'general-gpu':pair('General-purpose GPU','Универсальные GPU'),'high-memory-gpu':pair('High-memory GPU','GPU с большой памятью'),'dedicated-node':pair('Dedicated GPU node','Выделенный GPU-сервер'),'dedicated-rack':pair('Dedicated rack / AI pod','Выделенная стойка / AI-модуль')});
 const runtimes=Object.freeze({batch:pair('Batch jobs','Пакетные задачи'),'on-demand':pair('On demand','По запросу'),reserved:pair('Reserved capacity','Зарезервированная мощность'),'24x7':pair('Continuous 24/7','Постоянно 24/7')});
 const terms=Object.freeze({pilot:pair('Pilot','Пилот'),monthly:pair('Month to month','Помесячно'),quarterly:pair('3 months','3 месяца'),annual:pair('12 months','12 месяцев'),custom:pair('Custom term','Индивидуальный срок')});
 const regions=Object.freeze({either:pair('United States or Canada','США или Канада'),US:pair('United States','США'),CA:pair('Canada','Канада')});
 const residency=Object.freeze({'no-preference':pair('No fixed requirement','Нет строгого требования'),US:pair('Data stays in the United States','Данные остаются в США'),CA:pair('Data stays in Canada','Данные остаются в Канаде'),discuss:pair('Review with security team','Уточнить с безопасностью')});
 const serviceLevels=Object.freeze({standard:pair('Standard availability','Стандартная доступность'),'99.5':pair('Target 99.5%','Цель 99,5%'),'99.9':pair('Target 99.9%','Цель 99,9%'),custom:pair('Custom SLA review','Индивидуальный SLA')});
 const securityLevels=Object.freeze({standard:pair('Standard account isolation','Стандартная изоляция'),'private-network':pair('Private network','Частная сеть'),dedicated:pair('Dedicated hardware','Выделенное оборудование'),'regulated-review':pair('Regulated workload review','Проверка регулируемой нагрузки')});
 const participationFocus=Object.freeze({undecided:pair('I first want to understand the model','Пока хочу понять модель'),'defined-project':pair('A specific EcoGrid project','Конкретный проект EcoGrid'),'site-equipment':pair('The site and equipment','Площадку и оборудование'),'demand-economics':pair('Demand and project economics','Спрос и экономику проекта'),'risk-contract-exit':pair('Risks, agreement and exit terms','Риски, договор и условия выхода'),'gpu-infrastructure':pair('GPU equipment and utilization','GPU-оборудование и загрузка'),'energy-cooling':pair('Energy and cooling infrastructure','Энергия и охлаждение'),'data-center-capacity':pair('Data-center capacity','Мощности дата-центра'),portfolio:pair('Combined infrastructure format','Комплексный формат инфраструктуры')});
 const timelines=Object.freeze({exploring:pair('Exploring the model','Изучаю модель'),'this-quarter':pair('This quarter','В этом квартале'),'three-six-months':pair('In 3–6 months','Через 3–6 месяцев'),'six-twelve-months':pair('In 6–12 months','Через 6–12 месяцев')});
 const publicAcceleratorClasses=Object.freeze({undecided:pair('Recommendation needed','Нужна рекомендация'),'specific-model-memory':pair('Specific model or memory requirement','Есть конкретная модель или объём памяти'),'dedicated-system':pair('Dedicated GPU system','Нужна выделенная GPU-система'),'no-preference':pair('No preference','Нет предпочтений'),'not-sure':pair('Help me choose','Помогите выбрать'),inference:pair('Inference','Инференс'),training:pair('Training / fine-tuning','Обучение / дообучение'),rendering:pair('Rendering / media','Рендеринг / медиа'),dedicated:pair('Dedicated GPU system','Выделенная GPU-система')});
 const publicTerms=Object.freeze({'under-1-month':pair('Under 1 month','До 1 месяца'),'1-3-months':pair('1–3 months','1–3 месяца'),'3-12-months':pair('3–12 months','3–12 месяцев'),'12-plus-months':pair('12+ months','12+ месяцев')});
 const label=(group,key,lang='en')=>(group[key]||['—','—'])[lang==='ru'?1:0];
 function enumValue(value,group,message){if(typeof value!=='string'||!Object.hasOwn(group,value))throw Error(message);return value;}
 function optionalText(value,max,message){const out=typeof value==='string'?value.trim():'';if(out.length>max)throw Error(message);return out||null;}
 function requiredText(value,max,missing,message){const out=optionalText(value,max,message);if(!out)throw Error(missing);return out;}
 function budget(value){if(value===null||value===undefined||value==='')return null;if(typeof value!=='number'&&(typeof value!=='string'||!/^(?:\d+)(?:\.\d{1,2})?$/.test(value)))throw Error('Enter a budget from $1 to $100,000,000, or leave it blank.');const result=Number(value);if(!Number.isFinite(result)||result<1||result>100000000)throw Error('Enter a budget from $1 to $100,000,000, or leave it blank.');return result;}
 function storedPublicInquiry(value={}){
  if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid Compute request.');
  const intent=enumValue(value.intent,intents,'Choose a Compute route.'),country=enumValue(value.country,{US:1,CA:1},'Choose the United States or Canada.'),company=optionalText(value.company,160,'Keep the company name under 160 characters.'),budgetUsd=budget(value.budgetUsd),note=optionalText(value.note??value.notes,1000,'Keep the EcoGrid Compute note under 1000 characters.'),base={version:'compute-inquiry-v1',requestType:'compute',intent,country,company,budgetUsd,note};
  if(intent==='participation')return {...base,term:null,region:null,dataResidency:null,sla:null,security:null,focus:value.focus?enumValue(value.focus,participationFocus,'Choose an infrastructure focus.'):null,timeline:value.timeline?enumValue(value.timeline,timelines,'Choose a planning timeline.'):null,workload:null,acceleratorClass:null,requestedCapacity:null};
  return {...base,term:value.term?enumValue(value.term,publicTerms,'Choose a valid project term.'):null,region:value.region?enumValue(value.region,regions,'Choose a preferred region.'):'either',dataResidency:value.dataResidency?enumValue(value.dataResidency,residency,'Choose a data residency preference.'):'no-preference',sla:value.sla?enumValue(value.sla,serviceLevels,'Choose an SLA preference.'):'standard',security:value.security?enumValue(value.security,securityLevels,'Choose a security preference.'):'standard',workload:requiredText(value.workload,200,'Describe the Compute workload.','Describe the workload in 200 characters or fewer.'),acceleratorClass:value.acceleratorClass||value.gpuClass?enumValue(value.acceleratorClass||value.gpuClass,publicAcceleratorClasses,'Choose a GPU-capacity class.'):'undecided',requestedCapacity:requiredText(value.requestedCapacity??value.capacity,120,'Describe the required GPU capacity.','Describe requested capacity in 120 characters or less.'),focus:null,timeline:null};
 }
 function publicInquiry(value={}){const request=storedPublicInquiry(value);if(request.intent!=='participation')throw Error('Only Compute infrastructure participation is available.');return request;}
 function storedInquiry(value={}){
  if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid Compute request.');
  const intent=enumValue(value.intent||value.computeIntent,intents,'Choose a Compute route.'),country=enumValue(value.country||value.computeCountry,{US:1,CA:1},'Choose the United States or Canada.'),region=enumValue(value.region||value.computeRegion,regions,'Choose a preferred region.'),budgetUsd=budget(value.budgetUsd??value.computeBudget),note=optionalText(value.note,1000,'Keep the EcoGrid Compute note under 1000 characters.'),base={version:'compute-workspace-v1',requestType:'compute',intent,country,region,budgetUsd,note};
  if(intent==='participation')return {...base,focus:enumValue(value.focus||value.computeParticipationFocus,participationFocus,'Choose an infrastructure focus.'),timeline:enumValue(value.timeline||value.computeTimeline,timelines,'Choose a planning timeline.')};
  return {...base,workload:enumValue(value.workload||value.computeWorkload,workloads,'Choose a workload.'),acceleratorClass:enumValue(value.acceleratorClass||value.computeAccelerator,acceleratorClasses,'Choose an accelerator class.'),requestedCapacity:requiredText(value.requestedCapacity??value.computeCapacity,120,'Describe the capacity you need.','Describe requested capacity in 120 characters or less.'),runtime:enumValue(value.runtime||value.computeRuntime,runtimes,'Choose a runtime mode.'),term:enumValue(value.term||value.computeTerm,terms,'Choose a service term.'),dataResidency:enumValue(value.dataResidency||value.computeResidency,residency,'Choose a data residency preference.'),sla:enumValue(value.sla||value.computeSla,serviceLevels,'Choose an SLA preference.'),security:enumValue(value.security||value.computeSecurity,securityLevels,'Choose a security preference.')};
 }
 function inquiry(value={}){const request=storedInquiry(value);if(request.intent!=='participation')throw Error('Only Compute infrastructure participation is available.');return request;}
 function rows(value,lang='en'){
  const request=storedInquiry(value),t=(en,ru)=>lang==='ru'?ru:en,money=n=>new Intl.NumberFormat(lang==='ru'?'ru-RU':'en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n),result=[[t('Compute request','Запрос Compute'),label(intents,request.intent,lang)],[t('Client country','Страна клиента'),request.country==='CA'?t('Canada','Канада'):t('United States','США')],[t('Preferred region','Предпочтительный регион'),label(regions,request.region,lang)]];
  if(request.intent==='capacity')result.push([t('Workload','Задача'),label(workloads,request.workload,lang)],[t('Accelerator class','Класс ускорителей'),label(acceleratorClasses,request.acceleratorClass,lang)],...(request.requestedCapacity?[[t('Requested capacity','Требуемая мощность'),request.requestedCapacity]]:[]),[t('Runtime mode','Режим использования'),label(runtimes,request.runtime,lang)],[t('Term','Срок'),label(terms,request.term,lang)],[t('Data residency','Размещение данных'),label(residency,request.dataResidency,lang)],[t('SLA','SLA'),label(serviceLevels,request.sla,lang)],[t('Security','Безопасность'),label(securityLevels,request.security,lang)]);
  else result.push([t('Infrastructure focus','Фокус инфраструктуры'),label(participationFocus,request.focus,lang)],[t('Timeline','Срок принятия решения'),label(timelines,request.timeline,lang)]);
  if(request.budgetUsd)result.push([t('Budget · USD','Бюджет · USD'),money(request.budgetUsd)]);if(request.note)result.push([t('Note','Комментарий'),request.note]);return result;
 }
 function nextStep(request,lang='en'){const ru=lang==='ru';return request.intent==='capacity'?(ru?'Архивная запись прежнего запроса GPU-мощности: не готовить предложение, регистрацию или повторный контакт. Для участия нужен новый явный запрос клиента.':'Archived earlier GPU-capacity request: do not prepare a quote, registration or follow-up. Infrastructure participation requires a new explicit client request.'):(ru?'Уточнить ожидаемый результат участия, площадку, подтверждённое оборудование, заказчиков оплачиваемых вычислительных нагрузок, расходы, риски, права, отчётность и договор; не использовать условия Charge.':'Clarify the result sought from participation, site, confirmed equipment, customers paying for compute workloads, costs, risks, rights, reporting and agreement; do not reuse Charge terms.');}
 const consentVersion='compute-inquiry-v1',consentText={sms:'I agree to receive automated follow-up texts from EcoGrid at the number provided about my EcoGrid Compute request. Up to 2 messages in the first 24 hours. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is optional and is not a condition of service or participation.',email:'I agree to receive follow-up emails from EcoGrid about this EcoGrid Compute request. This is optional; I can unsubscribe at any time.'},consentTextRu={sms:'Я согласен получать автоматические SMS от EcoGrid на указанный номер по моему запросу EcoGrid Compute. До 2 сообщений в первые 24 часа. Возможна плата оператора. STOP — отказ, HELP — помощь. Согласие необязательно и не является условием услуги или участия.',email:'Я согласен получать письма от EcoGrid по моему запросу EcoGrid Compute. Это необязательно; я могу отказаться в любое время.'};
 const operatingFormula=Object.freeze({revenue:'paid GPU capacity under confirmed service terms',costs:['hardware and financing','electricity','cooling','network, storage and software','service and repair','downtime and reserve','taxes and agreed fees'],result:'variable project operating result'});
 return {intents,workloads,acceleratorClasses,runtimes,terms,regions,residency,serviceLevels,securityLevels,participationFocus,timelines,publicAcceleratorClasses,publicTerms,label,publicInquiry,inquiry,workspaceRequest:inquiry,storedPublicInquiry,storedInquiry,rows,nextStep,consentVersion,consentText,consentTextRu,operatingFormula,checkedAt:'2026-10-14'};
});

},
"dist/solar-catalog.js":function(module,exports,require){
'use strict';
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoSolar=api;})(typeof window==='object'?window:globalThis,()=>{
 const brandModels={"qcells-440":["EcoGrid Solar","ET153"],"rec-470":["EcoGrid Solar","ET Alpha mod 2.0"],"canadian-470":["EcoGrid Solar","ET-42 MAX"],"silfab-440":["EcoGrid Solar","ET Prime 440"],"silfab-420":["EcoGrid Solar","ET Elite 420"],"trina-450":["EcoGrid Solar","ET Vertex 450"],"enphase-5p":["EcoGrid Solar Storage","ES5"],"tesla-3":["EcoGrid Solar Storage","ES13.5"],"franklin-2":["EcoGrid Solar Storage","ES15 MAX"],"enphase-10c":["EcoGrid Solar Storage","ES10"],"sonnen-10":["EcoGrid Solar Storage","ES10 Core"],"sonnen-20":["EcoGrid Solar Storage","ES20 MAX"],"tesla-mobile":["EcoGrid Charge","ECH Mobile 32"],"dewalt-16":["EcoGrid Charge","ECH Portable 16"],"tesla-universal":["EcoGrid Charge","ECH Home 48"],"chargepoint-flex":["EcoGrid Charge","ECH Flex 50"],"chargepoint-cpf50":["EcoGrid Charge","ECH Pro 50"]};
 const brandName=p=>p?(p.brand&&p.brandModel?p.brand+' '+p.brandModel:p.manufacturer+' '+p.model):'';
 const version='energy-2026-10-v5',siteFitVersion='site-fit-v1';
 const moduleSpec=Object.freeze({manufacturer:'Qcells',model:'Q.TRON BLK M-G2+',powerW:440,efficiency:22.5,widthMm:1134,heightMm:1722,depthMm:30,weightKg:21.2,productYears:25,performanceYears:25,source:'https://us.qcells.com/q-tron-blk-m-g2/',datasheet:'https://media.qcells.com/v/1FhTENgd/'});
 const systems=Object.freeze([{id:'home-5',name:'EcoGrid Solar 5',nominalKw:5,estimateUsd:16800,panels:12},{id:'home-7',name:'EcoGrid Solar 7',nominalKw:7,estimateUsd:21490,panels:16},{id:'home-10',name:'EcoGrid Solar 10',nominalKw:10,estimateUsd:28600,panels:23}].map(s=>Object.freeze({...s,arrayKw:s.panels*moduleSpec.powerW/1000,pricePerNominalW:s.estimateUsd/(s.nominalKw*1000),panelAreaM2:Math.round(s.panels*moduleSpec.widthMm*moduleSpec.heightMm/100000)/10})));
 const find=id=>systems.find(s=>s.id===id);
 const panels=Object.freeze([
  {id:'qcells-440',...moduleSpec,image:'solar-qcells-440.jpg',technology:'N-type Q.ANTUM NEO',use:'The reference for Home 5 / 7 / 10',warranty:'25-year product and performance terms'},
  {id:'rec-470',manufacturer:'REC',model:'Alpha Pure-RX',powerW:470,efficiency:22.6,widthMm:1205,heightMm:1728,depthMm:30,technology:'Heterojunction (HJT)',image:'solar-rec-470.webp',use:'HJT technology in an all-black module',warranty:'20-year product / 25-year performance terms; ProTrust eligibility checked separately',source:'https://www.recgroup.com/en/rec-alpha-pure-rx',datasheet:'https://www.recgroup.com/sites/default/files/2025-04/Web_DS_REC%20Alpha%20Pure-RX_EN%20US_042025.pdf'},
  {id:'canadian-470',manufacturer:'Canadian Solar',model:'TOPHiKu6 · CS6.2-48TM-470H',powerW:470,efficiency:23.5,widthMm:1134,heightMm:1762,depthMm:35,technology:'N-type TOPCon',image:'solar-canadian-470.webp',use:'470 W in a 1,762 × 1,134 mm footprint',warranty:'25-year product coverage for eligible rooftop regions / 30-year performance terms',source:'https://www.csisolar.com/na/module/',datasheet:'https://static.csisolar.com/wp-content/uploads/sites/3/2025/05/09130713/CS-Datasheet-TOPHiKu6_All-Black_CS6.2-48TM-H_v1.0C25_F23_D1_NA-1.pdf'}
 ,{id:'silfab-440',manufacturer:'Silfab',model:'Prime · SIL-440 QD',powerW:440,efficiency:22.6,widthMm:1133,heightMm:1721,depthMm:35,technology:'N-type · 108 half cells',image:'solar-silfab-440.webp',use:'All-black N-type design',warranty:'12-year product warranty, extendable to 25 years with registration; 30-year performance terms',source:'https://silfabsolar.com/our-solar-panels/silfab-prime/sil-440-qd/',datasheet:'https://silfabsolar.com/wp-content/uploads/2026/09/Silfab-SIL-440-QD-Data-Generic-20260804-Final.pdf'},
  {id:'silfab-420',manufacturer:'Silfab',model:'Elite · SIL-420 BG',powerW:420,efficiency:21.9,widthMm:1029,heightMm:1864,depthMm:35,technology:'Back-contact · mono-PERC MWT',image:'solar-silfab-420.webp',photoDetail:true,use:'Back-contact design with a conductive backsheet',warranty:'12-year product warranty, extendable to 25 years with registration; 30-year performance terms',source:'https://silfabsolar.com/our-solar-panels/silfab-elite/sil-420-bg/',datasheet:'https://silfabsolar.com/wp-content/uploads/2025/12/Silfab-SIL-420-BG-Data-Final.pdf'},
  {id:'trina-450',manufacturer:'Trina Solar',model:'Vertex S+ · TSM-450 NEG9R.28',powerW:450,efficiency:22.5,widthMm:1134,heightMm:1762,depthMm:30,technology:'Dual glass · N-type i-TOPCon',image:'solar-trina-450.webp',use:'Dual-glass module for rooftop systems',warranty:'25-year product / 30-year power terms; regional availability and approval checked in the quote',source:'https://pages.trinasolar.com/NEG9R.28.html',datasheet:'https://static.trinasolar.com/sites/default/files/Datasheet_Vertex%20S%2B_NEG9R.28_EN_2024_A_S1_web.pdf'}
 ].map(p=>Object.freeze({...p,brand:brandModels[p.id][0],brandModel:brandModels[p.id][1]})));
 const batteries=Object.freeze([
  {id:'enphase-5p',manufacturer:'Enphase',model:'IQ Battery 5P',capacityKWh:5,continuousKW:3.84,image:'storage-enphase-5p.webp',use:'A modular starting point',architecture:'AC-coupled · LFP',warranty:'15-year limited warranty',source:'https://enphase.com/store/storage/gen3/iq-battery-5p'},
  {id:'tesla-3',manufacturer:'Tesla',model:'Powerwall 3',capacityKWh:13.5,continuousKW:11.5,image:'storage-tesla-3.webp',use:'Integrated solar inverter',architecture:'Integrated PV inverter · U.S. configuration',warranty:'10-year limited warranty',source:'https://energylibrary.tesla.com/docs/Public/EnergyStorage/Powerwall/3/Datasheet/en-us/Powerwall-3-Datasheet.pdf'},
  {id:'franklin-2',manufacturer:'FranklinWH',model:'aPower 2',capacityKWh:15,continuousKW:10,image:'storage-franklin-poster.webp',use:'Higher capacity per unit',architecture:'AC-coupled · LFP · aGate required',warranty:'15 years or 60 MWh throughput, subject to terms',source:'https://www.franklinwh.com/document/apower-2-datasheet'}
 ,{id:'enphase-10c',manufacturer:'Enphase',model:'IQ Battery 10C',capacityKWh:10,continuousKW:7.08,image:'storage-enphase-10c.webp',use:'10 kWh with a compact wall-mounted design',architecture:'AC-coupled · LFP · fourth-generation system',warranty:'15-year limited warranty, up to 6,000 cycles; manufacturer terms apply',source:'https://enphase.com/store/storage/gen4/iq-battery-10c'},
  {id:'sonnen-10',manufacturer:'sonnen',model:'sonnenCore+ · SCORE-P10',capacityKWh:10,continuousKW:4.8,image:'storage-sonnen-core.webp',photoDetail:true,photoCaption:'Manufacturer installation example: three units',use:'Indoor storage for everyday energy management',architecture:'AC-coupled · LFP · indoor installation only',warranty:'10 years or 10,000 cycles; manufacturer terms apply',source:'https://media.sonnengroup.com/ce4d12c8-d0db-4ffb-9274-5017a8fcb6b4-en-download'},
  {id:'sonnen-20',manufacturer:'sonnen',model:'sonnenCore+ · SCORE-P20',capacityKWh:20,continuousKW:4.8,image:'storage-sonnen-core.webp',photoDetail:true,photoCaption:'Manufacturer installation example: three units',use:'More stored energy in the same cabinet size',architecture:'AC-coupled · LFP · indoor installation only',warranty:'10 years or 10,000 cycles; manufacturer terms apply',source:'https://media.sonnengroup.com/ce4d12c8-d0db-4ffb-9274-5017a8fcb6b4-en-download'}
 ].map(p=>Object.freeze({...p,brand:brandModels[p.id][0],brandModel:brandModels[p.id][1]})));
 // User-defined equipment price: 19% below the listed U.S. reference model.
 // This is a planning offer, not verified procurement cost or an installed-site valuation.
 const chargerPricePolicy=Object.freeze({version:'charge-equipment-us-2026-10-03',currency:'USD',market:'US',discount:.19,checkedAt:'2026-10-03',installationIncluded:false});
 const chargerReferences=Object.freeze({
  'tesla-mobile':{priceUsd:300,url:'https://shop.tesla.com/category/configurator-charging',configuration:'Mobile Connector, NEMA 5-15 and 14-50 adapters'},
  'dewalt-16':{priceUsd:299.97,url:'https://www.homedepot.com/p/326991301',configuration:'DXPAEV016, 16 A, 25-foot cable'},
  'tesla-universal':{priceUsd:600,url:'https://shop.tesla.com/product/universal-wall-connector',configuration:'Universal Wall Connector, NACS and J1772'},
  'chargepoint-flex':{priceUsd:549,url:'https://www.alliantenergymarketplace.com/Electric-Vehicle-Chargers/I-CHARGFLEX-01-HARD-WIRE-V1.html',configuration:'CPH50-HARDWIRE-L23-K, J1772, 50 A'},
  'chargepoint-cpf50':{priceUsd:899,url:'https://smartchargeamerica.com/electric-car-chargers/commercial/chargepoint-cpf50/',configuration:'CPF50 standalone charger; pedestal, activation and network scope quoted separately'}
 });
 const chargers=Object.freeze([
  {id:'tesla-mobile',manufacturer:'Tesla',model:'Mobile Connector',kind:'portable',maxKW:7.7,amps:32,connector:'NACS',image:'ev-tesla-mobile.webp',use:'A portable option for home and travel',detail:'120 / 240 V · compatible outlet and adapter required',source:'https://shop.tesla.com/product/mobile-connector'},
  {id:'dewalt-16',manufacturer:'DEWALT',model:'DXPAEV016',kind:'portable',maxKW:3.84,amps:16,connector:'J1772',image:'ev-dewalt-16.webp',use:'Portable charging with a 25-foot cable',detail:'120 / 240 V · Tesla requires a compatible adapter',source:'https://www.dewalt.com/en-us/product/dxpaev016/portable-electric-vehicle-ev-120-240v-level-2-charger-16-amps-csa-certified'},
  {id:'tesla-universal',manufacturer:'Tesla',model:'Universal Wall Connector',kind:'fixed',maxKW:11.5,amps:48,connector:'NACS + J1772',image:'ev-tesla-universal.webp',use:'One wall unit for Tesla and J1772 vehicles',detail:'Hardwired · integrated J1772 adapter · 24-foot cable',source:'https://shop.tesla.com/product/universal-wall-connector'},
  {id:'chargepoint-flex',manufacturer:'ChargePoint',model:'Home Flex · CPH50',kind:'fixed',maxKW:12,amps:50,connector:'NACS or J1772',image:'ev-chargepoint-flex.webp',use:'Scheduled charging for your home',detail:'Connector selected with the quote · 50 A requires hardwiring',source:'https://www.chargepoint.com/drivers/home/installation/flex'},
  {id:'chargepoint-cpf50',manufacturer:'ChargePoint',model:'CPF50',kind:'commercial',maxKW:12,amps:50,connector:'NACS or J1772',image:'ev-chargepoint-cpf50.webp',use:'Charging for workplaces and shared parking',detail:'Wall or pedestal · up to 12 kW per port at 240 V',source:'https://www.chargepoint.com/products/stations/cpf50'}
 ].map(p=>Object.freeze({...p,brand:brandModels[p.id][0],brandModel:brandModels[p.id][1]})));
 const panel=id=>panels.find(p=>p.id===id),battery=id=>batteries.find(b=>b.id===id),charger=id=>chargers.find(c=>c.id===id);
 function chargerPricing(id){const ref=chargerReferences[id],item=charger(id);if(!ref||!item)return null;return {...chargerPricePolicy,referencePriceUsd:ref.priceUsd,equipmentPriceUsd:Math.round(ref.priceUsd*(1-chargerPricePolicy.discount)*100)/100,referenceUrl:ref.url,referenceModel:item.manufacturer+' '+item.model,referenceConfiguration:ref.configuration};}
 function chargerPriceText(id,lang='en'){const p=chargerPricing(id);return p?new Intl.NumberFormat(lang==='ru'?'ru-RU':'en-US',{minimumFractionDigits:2,maximumFractionDigits:2}).format(p.equipmentPriceUsd)+' USD':'';}
 function arrayFor(systemId,panelId='qcells-440'){const s=find(systemId),p=panel(panelId);if(!s||!p)return null;const count=Math.ceil(s.nominalKw*1000/p.powerW);return {panels:count,arrayKw:count*p.powerW/1000};}
 const fitText=(value,max)=>String(value??'').trim().slice(0,max);
 function validate(v){const kind=v.solarRequestType||'solar',country=v.solarCountry||'US',fit=v.solarFitVersion===siteFitVersion;if(v.solarFitVersion&&v.solarFitVersion!==siteFitVersion)return 'Refresh the page and try the property review again.';if(!['solar','storage','charging','consultation'].includes(kind))return 'Choose an inquiry type.';if(!['US','CA'].includes(country))return 'Choose the United States or Canada.';if(kind==='solar'&&!find(v.solarSystem))return 'Choose a solar system.';const zip=String(v.solarZip||'').trim().toUpperCase();if(country==='US'&&!/^\d{5}$/.test(zip))return 'Enter a five-digit U.S. ZIP code.';if(country==='CA'&&!/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d$/.test(zip))return 'Enter a Canadian postal code, for example M5V 2T6.';if(fit){const region=String(v.solarRegion||'').trim(),address=String(v.solarAddress||'').trim(),utility=String(v.solarUtility||'').trim(),rate=String(v.solarRate??'').trim();if(region.length<2||region.length>60||/[<>\u0000-\u001f]/.test(region))return 'Enter the state or province.';if(address.length<5||address.length>180||/[<>\u0000-\u001f]/.test(address))return 'Enter the service address.';if(!['roof','ground','carport','balcony','unsure'].includes(v.solarPlacement))return 'Choose an installation location.';if(!['bill','storage','backup','both','business'].includes(v.solarGoal))return 'Choose the main energy goal.';if(utility.length>120||/[<>\u0000-\u001f]/.test(utility))return 'Keep the utility or rate plan under 120 characters.';if(rate&&(!/^\d{1,3}(\.\d{1,2})?$/.test(rate)||Number(rate)>200))return 'Enter an electricity rate from 0 to 200 cents per kWh, or leave it blank.';}if(!['owner','planning','business','other'].includes(v.solarProperty))return 'Tell us about the property.';if(kind==='solar'&&!['yes','no','undecided'].includes(v.solarBattery))return 'Choose a battery preference.';if(v.solarPanel&&!panel(v.solarPanel))return 'Choose a listed panel model.';if(v.solarBatteryModel&&(!battery(v.solarBatteryModel)||v.solarBattery!=='yes'&&kind!=='storage'))return 'Choose a listed battery model or clear the preference.';if(v.solarCharger&&!charger(v.solarCharger))return 'Choose a listed charger or ask for help.';if(String(v.solarVehicle||'').length>100)return 'Keep vehicle details under 100 characters.';const bill=String(v.solarBill??'').trim();if(bill&&(!/^\d{1,5}(\.\d{1,2})?$/.test(bill)||Number(bill)>10000))return 'Enter a monthly electricity bill from $0 to $10,000, or leave it blank.';return '';}
 function invalidField(error){if(error.includes('ZIP code')||error.includes('postal code'))return 'solarZip';if(error.includes('state or province'))return 'solarRegion';if(error.includes('service address'))return 'solarAddress';if(error.includes('installation location'))return 'solarPlacement';if(error.includes('main energy goal'))return 'solarGoal';if(error.includes('utility or rate plan'))return 'solarUtility';if(error.includes('electricity rate'))return 'solarRate';if(error.includes('property'))return 'solarProperty';if(error.includes('battery preference'))return 'solarBattery';if(error.includes('panel model'))return 'solarPanel';if(error.includes('battery model'))return 'solarBatteryModel';if(error.includes('monthly electricity bill'))return 'solarBill';if(error.includes('solar system'))return 'solarSystem';return 'request';}
 function inquiry(v){const error=validate(v);if(error)throw new Error(error);const kind=v.solarRequestType||'solar',country=v.solarCountry||'US',fit=v.solarFitVersion===siteFitVersion,s=kind==='solar'?find(v.solarSystem):null,p=s?panel(v.solarPanel||'qcells-440'):null,b=s||kind==='storage'?battery(v.solarBatteryModel):null,c=kind==='charging'?charger(v.solarCharger):null;let zip=String(v.solarZip).trim().toUpperCase().replace(/\s/g,'');if(country==='CA')zip=zip.slice(0,3)+' '+zip.slice(3);return {catalogVersion:version,fitVersion:fit?siteFitVersion:null,requestType:kind,country,systemId:s?.id||null,name:s?.name||(kind==='charging'?'EcoGrid EV charging':kind==='storage'?'EcoGrid energy storage':'EcoGrid specialist consultation'),nominalKw:s?.nominalKw||null,arrayKw:s?.arrayKw||null,panels:s?.panels||null,module:s?moduleSpec.model:null,moduleW:s?moduleSpec.powerW:null,estimateUsd:s?.estimateUsd||null,preferredPanel:p?{id:p.id,brandName:brandName(p),manufacturer:p.manufacturer,model:p.model,powerW:p.powerW,...arrayFor(s.id,p.id)}:null,preferredBattery:b?{id:b.id,brandName:brandName(b),manufacturer:b.manufacturer,model:b.model,capacityKWh:b.capacityKWh,continuousKW:b.continuousKW}:null,preferredCharger:c?{id:c.id,brandName:brandName(c),manufacturer:c.manufacturer,model:c.model,kind:c.kind,maxKW:c.maxKW,connector:c.connector,pricing:chargerPricing(c.id)}:null,vehicle:kind==='charging'?String(v.solarVehicle||'').trim():'',requote:fit||!s||country==='CA'||p.id!=='qcells-440'||v.solarBattery==='yes',zip,region:fit?fitText(v.solarRegion,60):null,address:fit?fitText(v.solarAddress,180):null,placement:fit?v.solarPlacement:null,goal:fit?v.solarGoal:null,utility:fit?fitText(v.solarUtility,120):null,rateCentsKwh:fit&&String(v.solarRate??'').trim()!==''?Number(v.solarRate):null,property:v.solarProperty,battery:kind==='storage'?'yes':s?v.solarBattery:'undecided',billCurrency:country==='CA'?'CAD':'USD',billMonthly:String(v.solarBill??'').trim()===''?null:Number(v.solarBill)};}
 const consentVersion='energy-equipment-v2';
 const consentText={sms:'I agree to receive automated follow-up texts from EcoGrid at the number provided about my energy equipment request. Up to 2 messages in the first 24 hours. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is optional and is not a condition of purchase.',email:'I agree to receive follow-up emails from EcoGrid about this energy equipment request. This is optional; I can unsubscribe at any time.'};
 const consentTextRu={sms:'Я согласен получать от EcoGrid автоматические SMS по указанному номеру по заявке на энергетическое оборудование: до 2 сообщений за первые 24 часа. Возможна плата оператора. Для отказа — STOP, для помощи — HELP. Согласие необязательно и не является условием покупки.',email:'Я согласен получать от EcoGrid письма по этой заявке на энергетическое оборудование. Это необязательно; отказаться можно в любое время.'};
 return {version,siteFitVersion,brandName,moduleSpec,systems,find,panels,batteries,chargers,panel,battery,charger,chargerPricePolicy,chargerPricing,chargerPriceText,arrayFor,validate,invalidField,inquiry,consentVersion,consentText,consentTextRu};
});

},
"dist/central/equipment-model.js":function(module,exports,require){
'use strict';
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('../solar-catalog.js'):root.EcoSolar);if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoEquipment=api;})(typeof window==='object'?window:globalThis,solar=>{
 const names={solar:['Solar panels','Солнечные панели'],storage:['Energy storage','Накопители'],charging:['EV charging','Зарядки EV'],consultation:['Specialist help','Помощь специалиста']};
 const title=(kind,lang='en')=>(names[kind]||names.consultation)[lang==='ru'?1:0];
 function request(input={}){
  if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Choose an inquiry type.');
  const kind=input.solarRequestType;if(!names[kind])throw Error('Choose an inquiry type.');
  const common={solarRequestType:kind,solarCountry:input.solarCountry,solarZip:input.solarZip,solarProperty:input.solarProperty,solarBill:input.solarBill};
  const selection=kind==='solar'?{solarSystem:input.solarSystem,solarPanel:input.solarPanel,solarBattery:input.solarBattery,solarBatteryModel:input.solarBattery==='yes'?input.solarBatteryModel:''}:kind==='storage'?{solarBattery:'yes',solarBatteryModel:input.solarBatteryModel}:kind==='charging'?{solarCharger:input.solarCharger,solarVehicle:input.solarVehicle}:{};
  const value=solar.inquiry({...common,...selection}),note=typeof input.note==='string'?input.note.trim():'';
  if(note.length>1000)throw Error('Keep your equipment note under 1000 characters.');
  return {...value,note};
 }
 function rows(q,lang='en'){
  const t=(en,ru)=>lang==='ru'?ru:en,p=q.preferredPanel,b=q.preferredBattery,c=q.preferredCharger;
  return [
   [t('Request','Заявка'),title(q.requestType,lang)],
   [t('Country','Страна'),q.country==='CA'?t('Canada','Канада'):t('United States','США')],
   [t('Postal code','Почтовый индекс'),q.zip],
   [t('Property','Объект'),({owner:t('My home','Мой дом'),planning:t('Home being planned','Планируемый дом'),business:t('Business property','Коммерческий объект'),other:t('Discuss with a specialist','Уточню со специалистом')})[q.property]],
   ...(q.systemId?[[t('System','Система'),q.name]]:[]),
   ...(p?[[t('Panels','Панели'),`${p.brandName||solar.brandName(solar.panel(p.id))} · ${p.panels} × ${p.powerW} W · ${p.arrayKw} kW`]]:[]),
   ...(b?[[t('Storage','Накопитель'),`${b.brandName||solar.brandName(solar.battery(b.id))} · ${b.capacityKWh} kWh`]]:q.battery==='yes'?[[t('Storage','Накопитель'),t('Help me choose','Помогите выбрать')]]:[]),
   ...(c?[[t('Charger','Зарядка'),`${c.brandName||solar.brandName(solar.charger(c.id))} · ${c.maxKW} kW · ${c.connector}`]]:q.requestType==='charging'?[[t('Charger','Зарядка'),t('Help me choose','Помогите выбрать')]]:[]),
   ...(c?.pricing?[[t('Equipment estimate · USD','Ориентир оборудования · USD'),c.pricing.equipmentPriceUsd.toFixed(2)+' USD · '+t('installation, delivery and taxes separate','монтаж, доставка и налоги отдельно')],[t('Price reference','Основание цены'),c.pricing.referenceModel+' · '+c.pricing.referencePriceUsd.toFixed(2)+' USD × 0.81 · '+c.pricing.checkedAt]]:[]),
   ...(q.vehicle?[[t('Vehicle','Автомобиль'),q.vehicle]]:[]),
   ...(q.billMonthly!==null?[[t('Monthly electricity bill','Счёт за электричество в месяц'),`${q.billMonthly} ${q.billCurrency}`]]:[]),
   ...(q.note?[[t('Your note','Комментарий'),q.note]]:[])
  ];
 }
 const message=(q,lang)=>rows(q,lang).map(([k,v])=>k+': '+v).join('\n');
 return {names,title,request,rows,message};
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
   ['US','America/New_York','New York'],['US','America/Chicago','Chicago'],['US','America/Denver','Denver'],['US','America/Los_Angeles','Los Angeles'],['US','America/Phoenix','Phoenix, Arizona'],['US','America/Anchorage','Anchorage, Alaska'],['US','America/Adak','Adak, Aleutian Islands'],['US','Pacific/Honolulu','Honolulu, Hawaii'],
   ['CA','America/Toronto','Toronto / Montreal'],['CA','America/Winnipeg','Winnipeg'],['CA','America/Edmonton','Edmonton / Calgary'],['CA','America/Vancouver','Vancouver'],['CA','America/Halifax','Halifax'],['CA','America/St_Johns',"St. John’s, Newfoundland"],['CA','America/Regina','Regina, Saskatchewan'],['CA','America/Whitehorse','Whitehorse, Yukon'],['CA','America/Dawson_Creek','Dawson Creek'],['CA','America/Creston','Creston'],['CA','America/Atikokan','Atikokan'],['CA','America/Blanc-Sablon','Blanc-Sablon']
  ].map(([country,id,en])=>Object.freeze({country,id,en})));
 const canonical=value=>{try{return new Intl.DateTimeFormat('en-US',{timeZone:value}).resolvedOptions().timeZone;}catch{return '';}};
 function selectedZone(value){if(typeof value!=='string'||!value||value.length>80)return '';const id=canonical(value);return timeZones.find(z=>canonical(z.id)===id)?.id||'';}
 function zone(value){return !!selectedZone(value);}
  function zoneGroups(){return ['US','CA'].map(country=>({country,label:country==='US'?'United States':'Canada',zones:timeZones.filter(z=>z.country===country).map(z=>({id:z.id,label:z.en}))}));}
 function profile(input){
   const value={name:text(input.name),email:text(input.email).toLowerCase(),phone:text(input.phone),language:'en',timezone:input.timezone},errors={};
  if(value.name.length<2||value.name.length>100||/[\x00-\x1f]/.test(value.name))errors.name='name';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)||value.email.length>160)errors.email='email';
  if(value.phone&&(!/^[+\d\s().-]+$/.test(value.phone)||value.phone.replace(/\D/g,'').length<7||value.phone.replace(/\D/g,'').length>15||value.phone.length>40))errors.phone='phone';
   if(!zone(value.timezone))errors.timezone='timezone';
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
 const version='journey-v2-compute',legacyProjectKey='min'+'ing',legacyPositionsKey=legacyProjectKey+'Positions';
 const topics={academy:['EcoGrid Academy','EcoGrid Academy'],energy:['Energy projects','Энергетические проекты'],solar:['Solar & storage','Солнце и накопители'],charge:['EV charging','Зарядные станции'],compute:['AI compute infrastructure','AI-вычисления и дата-центры'],[legacyProjectKey]:['EcoGrid support','Сопровождение EcoGrid'],ai:['EcoGrid AI technology','Технология EcoGrid AI'],ecocoin:['EcoCoin','EcoCoin'],club:['EcoGrid Club community','Сообщество EcoGrid Club']};
 // The legacy key remains readable only for retained attribution and historical records.
 // New project selection exposes Charge, Solar and Compute.
 const projectTopics=Object.fromEntries(['charge','solar','compute'].map(id=>[id,topics[id]]));
 const purposes={participation:['Project participation','Участие в проекте'],equipment:['Equipment for my property','Оборудование для своего объекта'],capacity:['GPU capacity for my workload','GPU-мощность для моей задачи'],business:['Business partnership','Деловое партнёрство'],updates:['Explore and follow updates','Изучить и следить за новостями']};
 const projectPurposes={energy:['participation','equipment','business'],charge:['participation'],solar:['participation','equipment','business'],compute:['participation']};
 const routes={fast:['Consultation','Консультация'],nurture:['Explore first','Знакомство с проектом']};
 const acquisitionPaths={direct_project:['Direct project campaign','Прямая реклама проекта'],community_interest:['Community by shared interest','Сообщество по интересам'],academy_education:['Academy education','Обучение в Академии']};
 const projectIds=new Set(['charge','solar','compute']);
 const readableProjectIds=new Set([...projectIds,legacyProjectKey]);
 const communityArticleIds=new Set(['policy-household-budget','ai-physical-infrastructure','digital-assets-infrastructure','responsible-energy']);
 const keys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','gclid','msclkid','ttclid','landing_id','landing_host','lead_route','aff','partner_id','sub_id','ref'];
 function attribution(input={}){const v={};for(const k of keys)if(typeof input[k]==='string')v[k]=input[k].slice(0,300);return v;}
 function normalize(input){if(!input)return null;const route=input.route,topic=input.topic,purpose=input.purpose,country=input.country;if(!Object.hasOwn(routes,route)||!Object.hasOwn(topics,topic)||!Object.hasOwn(purposes,purpose)||!['US','CA'].includes(country))throw Error('Choose a route, topic, purpose and country.');if(topic===legacyProjectKey)throw Error('Choose a current EcoGrid direction.');if(purpose==='capacity')throw Error('Only Compute infrastructure participation is available.');if(route==='nurture'&&purpose!=='updates')throw Error('Choose exploration to follow project updates.');if(route==='fast'&&!projectIds.has(topic))throw Error('Choose Charge, Solar or Compute for a consultation.');if(route==='fast'&&projectPurposes[topic]&&!projectPurposes[topic].includes(purpose))throw Error('Choose an objective available for this project.');return {route,topic,purpose,country};}
 function merge(previous,input,source={},at=new Date().toISOString()){
  const next=normalize(input);if(!next)return previous||null;
  const archivedComputeCapacity=previous?.topic==='compute'&&previous?.purpose==='capacity'&&['fast','consult'].includes(previous?.route);
  const first=previous?.entryRoute||next.route;
  // A newsletter request never cancels an already requested consultation.
  const route=!archivedComputeCapacity&&['fast','consult'].includes(previous?.route)?'fast':next.route;
  const current=route==='fast'&&next.route==='nurture'&&previous?{topic:previous.topic,purpose:previous.purpose}:next;
  const touch=attribution(source),history=(previous?.history||[]).slice(-19);
  const event={route:next.route,topic:next.topic,purpose:next.purpose,country:next.country,at,source:touch};
  if(!history.length||JSON.stringify({...history.at(-1),at:''})!==JSON.stringify({...event,at:''}))history.push(event);
  const nextProject=readableProjectIds.has(next.topic)?next.topic:null;
  const previousProject=!archivedComputeCapacity?(readableProjectIds.has(previous?.currentProject)?previous.currentProject:(readableProjectIds.has(previous?.topic)?previous.topic:null)):null;
  // entryProject is immutable attribution. currentProject is the direction being explored,
  // while requestedProject changes only after an explicit consultation request.
  const legacyEntryProject=previous&&(['fast','consult'].includes(previous.entryRoute)||!previous.entryRoute&&['fast','consult'].includes(previous.route))?previousProject:null;
  const entryProject=previous?.entryProject||legacyEntryProject||(!previous&&next.route==='fast'?nextProject:null);
  const currentProject=nextProject||previousProject;
  const requestedProject=next.route==='fast'&&nextProject?nextProject:(!archivedComputeCapacity?(previous?.requestedProject||(['fast','consult'].includes(previous?.route)?previousProject:null)):null);
  const merged={...previous,...next,...current,route,entryRoute:first,enteredAt:previous?.enteredAt||at,firstSource:previous?.firstSource||touch,lastSource:touch,consultationAt:previous?.consultationAt||(next.route==='fast'?at:null),history,...(entryProject?{entryProject}:{}),...(currentProject?{currentProject}:{}),...(requestedProject?{requestedProject}:{})};
  if(archivedComputeCapacity&&!currentProject)delete merged.currentProject;
  if(archivedComputeCapacity&&!requestedProject)delete merged.requestedProject;
  return merged;
 }
 function requestConversation(state,chosen,language,id,at=new Date().toISOString()){
  const j=normalize(chosen);if(j.route!=='fast')throw Error('Request a consultation first.');state.tickets??=[];const prior=state.tickets.find(t=>t.journeyTopic===j.topic&&t.status!=='Resolved'&&!t.service?.closed);if(prior)return prior;
  const ru=language==='ru',name=label(topics,j.topic,language),subject=(ru?'Обсудить проект · ':'Project discussion · ')+name,message=(ru?'Хочу обсудить направление: ':'I would like to discuss: ')+name+'. '+label(purposes,j.purpose,language)+'. '+(j.country==='CA'?(ru?'Канада':'Canada'):(ru?'США':'United States'));
  const ticket={id,subject,message,reply:'',date:at,status:'Open',journeyTopic:j.topic,messages:[{id,from:'client',text:message,date:at}],service:{closed:false}};state.tickets.push(ticket);return ticket;
 }
 function clientPreferenceInput(previous,values,language='en'){
  if(!['updates','participation'].includes(values.purpose)||!Object.hasOwn(projectTopics,values.topic))throw Error('Choose a project and next step.');
  const purpose=values.purpose;
  const consultationRequested=purpose!=='updates',route=consultationRequested?'fast':'nurture';
  return {consultationRequested,journey:normalize({route,topic:values.topic,purpose,country:values.country}),marketingConsent:values.marketingConsent==='on',language:language==='ru'?'ru':'en'};
 }
 function entry(record){return record.context?.journey||record.journey||record.state?.journey||null;}
 function archivedComputeCapacity(record={}){const state=record.state||record,content=record.context||{},j=entry(record)||{},compute=content.compute||record.compute||state.computeInquiry||record.computeInquiry,activeRequest=projectIds.has(j.requestedProject)?j.requestedProject:(['fast','consult'].includes(j.route)&&projectIds.has(j.topic)?j.topic:null),explicitActive=activeRequest&&(activeRequest!=='compute'||j.purpose==='participation');return (compute?.intent==='capacity'||(j.topic==='compute'&&j.purpose==='capacity'))&&!explicitActive&&!state.plan&&!state.planDraft;}
 function projectContext(record={}){
  const state=record.state||record,content=record.context?.content||state.content||{},j=entry(record)||{};
  const firstHistory=Array.isArray(j.history)?j.history.find(item=>projectIds.has(item?.topic)):null;
  const entryProject=projectIds.has(j.entryProject)?j.entryProject:(projectIds.has(content.entryProject)?content.entryProject:(['fast','consult'].includes(j.entryRoute)?(projectIds.has(firstHistory?.topic)?firstHistory.topic:(projectIds.has(j.topic)?j.topic:null)):null));
  const rawCapacity=(record.context?.compute||record.compute||state.computeInquiry||record.computeInquiry)?.intent==='capacity'||(j.topic==='compute'&&j.purpose==='capacity'),explicitProject=projectIds.has(j.requestedProject)?j.requestedProject:(['fast','consult'].includes(j.route)&&projectIds.has(j.topic)?j.topic:null),explicitActive=Boolean(explicitProject&&(explicitProject!=='compute'||j.purpose==='participation'));
  if(archivedComputeCapacity(record))return {entryProject:entryProject||'compute',currentProject:null,requestedProject:null};
  if(rawCapacity&&!explicitActive&&(state.plan||state.planDraft))return {entryProject:entryProject||'compute',currentProject:'charge',requestedProject:'charge'};
  const currentProject=projectIds.has(j.currentProject)?j.currentProject:(projectIds.has(j.topic)?j.topic:null);
  const requestedProject=projectIds.has(j.requestedProject)?j.requestedProject:(['fast','consult'].includes(j.route)?currentProject:null);
  return {entryProject:entryProject||null,currentProject:currentProject||null,requestedProject:requestedProject||null};
 }
 function activeCompute(record={}){const state=record?.state||record||{},position=state.computeParticipation,capital=Number(position?.capital);return position?.project==='compute'&&position?.route==='participation'&&position?.status==='active'&&Number.isFinite(capital)&&capital>0;}
 function activeProjectIds(record={}){const state=record?.state||record||{},ids=[];if(state.plan?.status==='active')ids.push('charge');if(activeCompute(record))ids.push('compute');return ids;}
 function newRequestAfterActivation(record={},project){
  if(!projectIds.has(project)||projectContext(record).requestedProject!==project)return false;
  const state=record?.state||record||{},activatedAt=project==='compute'?state.computeParticipation?.activatedAt:project==='charge'?state.plan?.appliedAt:null,activated=Date.parse(activatedAt);
  if(!Number.isFinite(activated))return false;
  const j=entry(record)||{},history=Array.isArray(j.history)?j.history:[];
  return history.some(item=>item?.route==='fast'&&item.topic===project&&(project!=='compute'||item.purpose==='participation')&&Number.isFinite(Date.parse(item.at))&&Date.parse(item.at)>activated);
 }
 function acquisition(record={}){
  const state=record.state||record,content=record.context?.content||state.content||{},j=entry(record)||{};
  const entryArticle=typeof content.entryId==='string'&&/^[a-z0-9][a-z0-9-]{0,79}$/.test(content.entryId)?content.entryId:'';
  const firstHistory=Array.isArray(j.history)?j.history.find(item=>item&&Object.hasOwn(topics,item.topic)):null,entryTopic=firstHistory?.topic||j.topic;
  const inferred=entryArticle?(communityArticleIds.has(entryArticle)?'community_interest':'academy_education'):['fast','consult'].includes(j.entryRoute)?'direct_project':['academy','ai','ecocoin'].includes(entryTopic)?'academy_education':'community_interest';
  const path=Object.hasOwn(acquisitionPaths,content.acquisitionPath)?content.acquisitionPath:inferred;
  const projects=projectContext(record),project=projects.requestedProject||projects.currentProject;
  return {path,articleAssist:content.articleAssist===true,entryArticle,project,...projects,purpose:j.purpose||null};
 }
 function communityEntry(state={}){const j=entry(state);return j?.route==='nurture'&&['club','academy','ecocoin'].includes(j.topic)&&!state.plan&&!state.planDraft&&!state.requests?.some(r=>r.type==='topup');}
 function academyStage(state={}){
  if(activeProjectIds(state).length||state[legacyPositionsKey]?.some(p=>p.status!=='closed'&&p.capital>0))return 'active';
  const context=projectContext(state),project=context.requestedProject||(state.plan||state.planDraft?'charge':null),presentationProject=projectIds.has(state.academy?.presentationProject)?state.academy.presentationProject:null;
  const exactPresentation=state.academy?.presentationComplete===true&&project&&presentationProject===project,managerChargeDraft=state.planDraft?.savedBy==='manager'&&project==='charge';
  if(exactPresentation||managerChargeDraft)return 'proposal';
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
 return {needsAcademy,clientPreferenceInput,academyStage,communityEntry,requestConversation,projectContext,activeCompute,activeProjectIds,newRequestAfterActivation,archivedComputeCapacity,version,topics,projectTopics,purposes,projectPurposes,routes,acquisitionPaths,keys,attribution,normalize,merge,entry,acquisition,exploring,label,cohorts,projectIds,readableProjectIds};
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
 const config=Object.freeze({version:'energy-routing-v3-compute',dispatchLimitKw:900,solarPeakKw:1800,chargingPrice:.45,utilityPrice:.18,solarStorageCost:.12,sessionKwh:30,sessionsPerDay:20,exampleDays:30,monthlyOperatingCost:3000,exampleReceipts:1000,lowerReceipts:600,siteCosts:150,serviceCosts:120,reserves:80,inverseShare:.004,inverseCostRatio:.35,inverseKwhPrice:.25});
 // Product narrative only; this module does not connect a live AI service or change financial calculations.
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
  "compute": {
    "title": [
      "Control the cost of computing",
      "Контролировать себестоимость вычислений"
    ],
    "body": [
      "EcoGrid AI compares electricity prices, paid workload schedules, accelerator utilization, temperature and cooling demand. Where service commitments allow it, operators can schedule flexible workloads around equipment and energy constraints while preserving contracted service levels.",
      "EcoGrid AI сопоставляет тарифы на электричество, графики оплачиваемых задач, загрузку ускорителей, температуру и нагрузку на охлаждение. Там, где это допускают условия сервиса, команда может планировать гибкие задачи с учётом оборудования и энергосистемы, сохраняя согласованный уровень обслуживания."
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
 const aiProgram=Object.freeze({days:30});
 const aiProgramTopics=Object.freeze({
  charge:['Compare charging sites','Сравнение зарядных площадок','The planned mode compares usage, electricity costs and downtime across eligible charging sites to guide allocation within the project.','Планируемый режим сравнивает загрузку, стоимость электричества и простои доступных зарядных площадок для распределения участия внутри проекта.'],
  solar:['Compare solar sites','Сравнение солнечных объектов','The planned mode compares generation, energy sales and operating costs across eligible solar sites, including storage operation where available.','Планируемый режим сравнивает выработку, продажу энергии и расходы доступных солнечных объектов, включая работу накопителей там, где они предусмотрены.'],
  compute:['Compare AI-compute operating scenarios','Сравнение режимов AI-вычислений','The planned mode compares paid workload demand, accelerator utilization, energy and cooling costs and service commitments inside the selected Compute participation proposal.','Планируемый режим сопоставляет оплачиваемый спрос, загрузку ускорителей, стоимость энергии и охлаждения и уровень сервиса в рамках выбранного предложения об участии в Compute.'],
  energy:['AI mode for your selected project','AI-режим для выбранного проекта','Choose Charge, Solar or Compute and review how the proposed AI mode would work within that project.','Выберите Charge, Solar или Compute и изучите, как предлагаемый AI-режим будет работать внутри этого проекта.']
 });
 function programCopy(topic='energy',lang='en'){
  const ru=lang==='ru',c=aiProgramTopics[topic]||aiProgramTopics.energy,p=aiProgram,charge=typeof module==='object'&&module.exports?require('./charge-model.js'):globalThis.EcoChargeModel;
   const chargeProgram=topic==='charge';
   return {
   title:c[ru?1:0],body:topic==='charge'?charge.copy('ai',lang):c[ru?3:2],
    price:chargeProgram?(ru?`${p.days} дней · условия и связанный платёж подтверждаются индивидуально`:`${p.days}-day period · terms and related payment are confirmed individually`):ru?'Отдельная услуга · требуется предложение выбранного проекта':'Separate service · a proposal for the selected project is required',
     gift:ru?'Услуга не создаёт автоматическое зачисление или доступный баланс.':'The service does not create an automatic credit or available balance.',
    rules:ru?'Это отдельная дополнительная услуга. Она не заменяет обычную эксплуатацию проекта и не гарантирует выплату.':'This is a separate optional service. It does not replace normal project operation or guarantee a payout.',
    supplement:chargeProgram?(ru?`Для Charge активный AI-режим добавляет ровно +${charge.policy.aiRateBonus} процентный пункт к фиксированному обязательству компании на ${p.days} дней. Надбавка действует только после серверной активации и увеличивает сумму, которую должна профинансировать компания.`:`For Charge, an active AI period adds exactly +${charge.policy.aiRateBonus} percentage point to the fixed company obligation for ${p.days} days. The uplift applies only after server activation and increases the amount the company must fund.`):ru?'Ставка и AI-надбавка Charge на Solar или Compute не переносятся. Любая дополнительная AI-услуга для них требует отдельного предложения и договора.':'The Charge rate and AI uplift do not apply to Solar or Compute. Any additional AI service for those projects requires a separate proposal and agreement.',
   distinction:ru?'Инструменты управления оборудованием использует команда. Дополнительный AI-режим для участника сравнивает доступные варианты размещения его участия внутри выбранного проекта. Это отдельная услуга, а не плата за обычную эксплуатацию.':'The team uses tools to operate equipment. The optional member AI mode compares eligible allocations of your participation within the selected project. This is separate from normal project operation.',
     renewal:chargeProgram?(ru?'Новый 30-дневный период начинается только после индивидуального подтверждения условий AI и связанного платежа. Автоматического продления и списания нет. После окончания периода ставка возвращается к базовой.':'A new 30-day period starts only after individual confirmation of the AI terms and the related payment. There is no automatic renewal or charge. When the period ends, the rate returns to the base rate.'):ru?'Условия для Solar или Compute определяются только отдельным предложением и договором выбранного проекта; подтверждение не запускает автоматическое продление или списание.':'Terms for Solar or Compute are defined only in the selected project’s separate proposal and agreement; confirmation never starts an automatic renewal or charge.',
    availability:topic==='charge'?charge.copy('aiEvidence',lang):ru?'Условия, доступность и подключение подтверждаются только отдельным предложением выбранного проекта.':'Terms, availability and activation are confirmed only in a separate proposal for the selected project.'
  };
 }
 function ai(topic='energy',lang='en'){const c=aiContent[topic]||aiContent.energy,i=lang==='ru'?1:0;return {title:c.title[i],body:c.body[i]};}
 const pct=n=>Math.round(n*100)+'%';
 function labels(lang='en'){return lang==='ru'?{solar:'EcoGrid Solar',storage:'Накопители',ev:'EcoGrid Charge',compute:'EcoGrid Compute',commercial:'Коммерческая энергетика',grid:'Общая сеть'}:{solar:'EcoGrid Solar',storage:'Battery storage',ev:'EcoGrid Charge',compute:'EcoGrid Compute',commercial:'Commercial energy',grid:'The grid'};}
 function copy(lang='en'){return lang==='ru'?'EcoGrid вырос из электротехнической и энергетической компетенции. Первым практическим направлением стала Charge: опыт подключений, распределённой нагрузки, пиков и стоимости энергии привёл к развитию Solar и накопителей. Следующим развитием стал Compute, где к энергии добавляются GPU, охлаждение, сеть и эксплуатация дата-центра. Общая инфраструктура может снижать часть капитальных и операционных расходов, но выручка, затраты, риски, условия и договор каждого проекта считаются отдельно.':'EcoGrid grew from electrical and energy engineering. Charge was the first practical direction: interconnection, distributed-load, peak and energy-cost experience led to Solar and storage. Compute is the next step, adding GPUs, cooling, networking and data-center operations. Shared infrastructure may reduce some capital and operating costs, but revenue, expenses, risks, terms and agreements are calculated separately for each project.';}
 function evidence(lang='en'){return lang==='ru'?'Права на объекты, наличие оборудования, условия подключения и договоры подтверждаются документами соответствующего направления.':'Site rights, equipment availability, interconnection terms and agreements are confirmed in the relevant project documents.';}
 function chargeRule(lang='en'){const ru=lang==='ru',charge=typeof module==='object'&&module.exports?require('./charge-model.js'):globalThis.EcoChargeModel;return `<aside class="business-charge-rule"><h3>${ru?'Отдельное правило EcoGrid Charge':'A separate EcoGrid Charge rule'}</h3><p>${charge.copy('split',lang)}</p><p>${charge.copy('formula',lang)}</p></aside>`;}
 function cadence(lang='en'){return (typeof module==='object'&&module.exports?require('./charge-model.js'):globalThis.EcoChargeModel).copy('cadence',lang);}
 function legacyCadence(lang='en'){return cadence(lang);}
 function flow(lang='en'){
  const ru=lang==='ru',l=labels(lang);
  return `<section class="business-flow" data-business-model="${config.version}" translate="no" aria-label="${ru?'Как связаны проекты':'How the projects connect'}"><div class="business-flow-heading"><div><h2>${ru?'Одна инфраструктура. Три продукта.':'One infrastructure. Three products.'}</h2></div><small>${ru?'Модель, не телеметрия':'Model, not telemetry'}</small></div><p>${copy(lang)}</p><h3 translate="no">EcoGrid AI</h3><p>${ai('energy',lang).body}</p><div class="business-flow-map"><div class="business-source"><strong>${l.solar}</strong><span>${ru?'Генерация · накопление · управление':'Generation · storage · control'}</span></div><span class="business-flow-arrow" aria-hidden="true">→</span><div class="business-outlets"><div><span>${ru?'Транспортный сервис':'Transport service'}</span><strong>${l.ev}</strong></div><div><span>${ru?'AI-вычисления':'AI compute service'}</span><strong>${l.compute}</strong></div><div><span>${ru?'Контрактная продажа':'Contracted energy'}</span><strong>${l.commercial} · ${l.grid}</strong></div></div></div><small>${ru?'Физический маршрут энергии зависит от объекта, подключения, тарифа, нагрузки и договора. Compute не обещает круглосуточную работу только от солнца; сеть и накопители учитываются в проекте.':'The physical energy path depends on the site, interconnection, tariff, load and agreement. Compute does not promise 24/7 solar-only operation; grid supply and storage are part of project planning.'}</small><aside class="business-charge-rule"><h3>${ru?'Общая база — отдельная экономика':'Shared foundation — separate economics'}</h3><p>${ru?'Проекты могут использовать общие площадки, подключение, трансформаторы, накопители, мониторинг и эксплуатационную команду. Но источники выручки, расходы, риски, предложение и договор у Charge, Solar и Compute разные.':'Projects may share sites, interconnection, transformers, storage, monitoring and an operating team. But Charge, Solar and Compute have different revenue sources, expenses, risks, offers and agreements.'}</p></aside>${chargeRule(lang)}<h3>${ru?'Кто платит за результат':'Who pays for the result'}</h3><div class="business-buyers"><article><h4>${ru?'Водители EV':'EV drivers'}</h4><p>${ru?'Оплачивают завершённые зарядные сессии Charge.':'Pay for completed Charge sessions.'}</p></article><article><h4>${ru?'Клиенты Solar':'Solar customers'}</h4><p>${ru?'Покупают оборудование, проектирование и установку либо обсуждают отдельное участие в энергетическом проекте.':'Buy equipment, design and installation or discuss separate participation in an energy project.'}</p></article><article><h4>${ru?'Клиенты Compute':'Compute customers'}</h4><p>${ru?'Оплачивают выполненные AI-задачи и согласованный уровень сервиса; это формирует выручку инфраструктуры, а результат участия рассчитывается только по отдельной модели проекта.':'Pay for completed AI workloads and an agreed service level; this creates infrastructure revenue, while any participation result is calculated only under a separate project model.'}</p></article></div></section>`;
 }
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
  function previewNotice(lang='en'){return lang==='ru'?'Заявка на пополнение поступит менеджеру и администратору. Баланс изменится только после проверки фактического поступления. Оплата на сайте станет доступна после подключения платёжного провайдера.':'The funding request goes to your manager and administrator. The balance changes only after the actual receipt is verified. Website payment becomes available after the payment provider is connected.';}
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
  if(operation.corrects){const old=a.adjustments.find(v=>v.operationId===operation.corrects),legacyPositions=a['min'+'ingPositions'];if(!old||!['credit','debit'].includes(old.kind)||old.requestId||legacyPositions?.some(p=>p.status==='active'&&p.id===old.operationId)||old.amount!==operation.amount||old.kind===operation.kind||operation.requestId||a.adjustments.some(v=>v.corrects===operation.corrects))throw Error('This entry cannot be corrected again.');}
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
  const p=d.plan,legacy=d.period?.type==='week',sections=[{title:t('Energy business model','Модель энергетического бизнеса'),body:business.copy(language)},{title:t('Account details','Данные аккаунта'),rows:[[t('Client','Клиент'),d.client.name],[t('Email','Почта'),d.client.email||'—'],[t('Phone','Телефон'),d.client.phone||'—'],[t('Document reference','Номер документа'),d.id],[t('Prepared','Сформирован'),date(d.generatedAt)+' · '+d.timezone]]},
   {title:t('Your plan terms','Условия вашего плана'),rows:[[t('Status','Статус'),status],[t('Station group','Группа станций'),p?.name||'—'],[t('Plan amount','Сумма плана'),p?money(p.capital):'—'],[p?.ratePeriod===finance.ratePeriod?t('Calendar-month model rate','Ставка модели за календарный месяц'):t('Preserved earlier model rate','Сохранённая ставка по прежним условиям'),p?new Intl.NumberFormat(locale).format(p.rate)+'%':'—'],[d.period?legacy?t('Model amount for the preserved earlier period','Расчёт за сохранённый прежний период'):t('Model amount for the current 4-day period','Расчёт за текущий период 4 дня'):t('Model amount for the next 4 days','Расчёт на следующие 4 дня'),p?money(p.settlement):'—'],[d.kind==='active'?t('Current terms effective from','Текущие условия действуют с'):t('Selection saved','Выбор сохранён'),date(p?.date)],...(p?.rateTransition?[[t('Monthly rate starts','Месячная ставка действует с'),date(p.rateTransition.at)]]:[]),...(d.period?[[t('Current period starts','Начало текущего периода'),date(d.period.start)],[t('Current period ends','Конец текущего периода'),date(d.period.end)]]:[])],body:p?p.ratePeriod===finance.ratePeriod?t('Calculation: capital × monthly rate, prorated by UTC calendar days in each month (28–31). Full calendar months reach the stated rate exactly. Accrual is continuous; available profit is fixed every 4 days. Any preserved open earlier period keeps its original terms until the transition date.','Расчёт: капитал × месячная ставка, пропорционально календарным дням UTC в каждом месяце (28–31). За полный календарный месяц получается ровно указанная ставка. Начисление идёт непрерывно; открытый прежний период сохраняет исходные условия до даты перехода, а доступная прибыль по текущей модели фиксируется раз в 4 дня.'):t('Calculation: plan amount × the preserved earlier model rate. No compounding or extra credit per vehicle.','Расчёт: сумма плана × сохранённая ставка по прежним условиям. Без капитализации и дополнительных начислений за автомобили.'):t('Choose and save a plan to include its amount and 4-day calculation.','Выберите и сохраните план, чтобы включить сумму и расчёт за 4 дня.')},
   {title:t('Reference stations','Справочные станции'),rows:p?p.stations.map(s=>['AFDC '+s.id,s.name+(s.location?' · '+s.location:'')]):[],body:t('Source: US Department of Energy / AFDC public directory. Station rights and client rights are defined by the applicable signed agreement.','Источник: публичный каталог Минэнерго США / AFDC. Права на станции и права клиента определяются применимым подписанным договором.')},
   {title:t('How the account calculation works','Как работает расчёт счёта'),body:legacy?t('Funding and plan activation are separate steps. This preserved earlier period keeps its original terms until the transition date. An open period is not available for withdrawal before it is recorded. New periods use the current 4-day settlement schedule.','Пополнение и активация плана — отдельные шаги. Сохранённый прежний период действует по исходным условиям до даты перехода. Незавершённый период недоступен для вывода до фиксации. Новые периоды работают по текущему четырёхдневному графику.'):t('Funding and plan activation are separate steps. Activation moves the selected amount from available funds into the plan. Accrual is calculated continuously, and each complete 4-day period fixes the amount available under the plan terms. An open period is not available for withdrawal before it is recorded. Changing the plan starts a new 4-day period: completed periods are recorded first; an unfinished period is not credited.','Пополнение и активация плана — отдельные шаги. При активации выбранная сумма переводится из свободного остатка в план. Начисление рассчитывается непрерывно, а каждый полный период в 4 дня фиксирует сумму, доступную по условиям плана. Незавершённый период недоступен для вывода до фиксации. Смена плана начинает новый период на 4 дня: завершённые периоды записываются, незавершённый период не зачисляется.')},
   {title:t('Withdrawal schedule','Порядок заявки на вывод'),body:t('A first request becomes eligible 4 × 24 hours after the first plan activation. Approval starts the next 4-day interval; rejection releases the reservation without a new interval. Requests use available funds, excluding active plan capital, pending withdrawal reservations and the open period. The request range is $1–$100,000, subject to available funds. A settlement date is not a payout date. Transfers become available only after the server, payment provider and recipient verification are connected. Until then, a request remains pending and must not be described as paid.','Первая заявка доступна через 4 × 24 часа после первой активации плана. Подтверждение начинает следующие 4 суток; отказ снимает резерв без нового ожидания. Используется свободный остаток: капитал активного плана, резервы заявок и незавершённый период в него не входят. Диапазон заявки — от 1 до 100 000 USD в пределах свободного остатка. Дата фиксации начисления не является датой выплаты. Переводы станут доступны только после подключения сервера, платёжного провайдера и проверки получателя. До этого заявка остаётся на рассмотрении и не обозначается как выплаченная.')},
   {title:t('Document status','Статус документа'),body:t('This is a personalized unsigned draft of the saved account terms, not an executed agreement or an investment offer. It does not verify identity, promise returns or create ownership, payment or withdrawal rights. The contracting entity, jurisdiction, asset rights, costs, loss risk and exit terms must be confirmed in the applicable signed agreement. No signature or seal is included.','Это персональный неподписанный черновик сохранённых условий счёта, а не заключённый договор или инвестиционное предложение. Он не подтверждает личность, не обещает доходность и не создаёт права собственности, выплаты или вывода. Юридическое лицо, юрисдикция, права на активы, расходы, риск потерь и условия выхода должны быть закреплены в применимом подписанном договоре. Подписей и печатей нет.')}
  ];
  const charge=typeof module==='object'&&module.exports?require('../charge-model.js'):globalThis.EcoChargeModel;sections.push({title:t('Charge · proposed revenue distribution','Charge · предлагаемое распределение выручки'),body:charge.copy('split',language)+' '+charge.copy('formula',language)+' '+charge.copy('allocation',language)+' '+charge.copy('rights',language)});
  return {lang:ru?'ru':'en-US',title:t('Personal plan record','Персональные условия плана'),badge:t('DRAFT · NOT A SIGNED AGREEMENT','ЧЕРНОВИК · НЕ ПОДПИСАННЫЙ ДОГОВОР'),intro:t('A personal draft of your saved account terms. Keep the reference and preparation date when discussing it with your manager.','Персональный черновик сохранённых условий аккаунта. При обсуждении с менеджером укажите номер документа и дату формирования.'),status,sections,footer:t('EcoGrid · PLAN DOCUMENT','EcoGrid · УСЛОВИЯ ПЛАНА'),print:t('Print / Save as PDF','Печать / Сохранить PDF')};
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
 function aggregate(rows,group){const result=new Map();for(const r of rows){const key=group==='caller'?r.callerId||'unassigned':group==='landing_caller'?(r.landing||'unknown')+'|'+(r.callerId||'unassigned'):group==='project'?r.requestedProject||'unknown':r.landing||'unknown';let g=result.get(key);if(!g){g={key,landing:r.landing||'unknown',callerId:r.callerId||null,...Object.fromEntries(stages.map(k=>[k,0])),ftdCents:0,fundingCents:0,attempted:0,within5:0,totalWaitMs:0,reasons:{}};result.set(key,g);}for(const stage of stages)if(r.stages[stage])g[stage]++;g.ftdCents+=r.ftdCents||0;g.fundingCents+=r.fundingCents||0;if(r.firstAttemptMs!==null&&r.firstAttemptMs!==undefined){g.attempted++;g.within5+=r.firstAttemptMs<=300000?1:0;g.totalWaitMs+=r.firstAttemptMs;}if(r.closeReason)g.reasons[r.closeReason]=(g.reasons[r.closeReason]||0)+1;}
 return [...result.values()].map(g=>({...g,ftdRate:g.leads?g.ftd/g.leads:0,averageFirstCallMinutes:g.attempted?g.totalWaitMs/g.attempted/60000:null})).sort((a,b)=>b.ftd-a.ftd||b.leads-a.leads||a.key.localeCompare(b.key));}
 return {reasons,outcomes,consentVersion,consentText,consentTextRu,sla,queue,firstWithdrawal,stages,aggregate};
});

},
"dist/central/club-model.js":function(module,exports,require){
'use strict';
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoClubModel=api;})(typeof window==='object'?window:globalThis,()=>{
 const DAY=86400000;
 const levels=[{id:'member',en:'Member',ru:'Участник',active:0,days:0}];
 const defaults={enabled:false,minimumCents:25000,referrerCents:5000,welcomeCents:0,monthlyBudgetCents:0,campaign:null,goal:null};
 function rank(active,joined,now=Date.now()){const days=Math.max(0,Math.floor((now-Date.parse(joined))/DAY)||0);let index=0;levels.forEach((l,i)=>{if(active>=l.active&&days>=l.days)index=i;});return {index,days,level:levels[index],next:levels[index+1]||null};}
 function firstFunding(state){return (state.requests||[]).filter(r=>r.type==='topup'&&r.status==='Approved'&&r.amount>0&&Number.isFinite(Date.parse(r.reviewedAt))).sort((a,b)=>a.reviewedAt.localeCompare(b.reviewedAt)||a.id.localeCompare(b.id))[0]||null;}
 function active(state){const f=firstFunding(state);return state.plan?.status==='active'&&state.plan.capital>0&&!!f&&f.receiptChecked===true&&Math.round(f.amount*100)>=25000;}
 function month(date){return new Date(date).toISOString().slice(0,7);}
 function amount(config,time){const c=config.campaign,inSeason=!!(c&&time>=c.start&&time<c.end);return {referrerCents:config.referrerCents*(inSeason?c.multiplier:1),welcomeCents:config.welcomeCents,campaignId:inSeason?c.id:null};}
 const errors={
 'The monthly referral budget is exhausted.':'Месячный бюджет программы приглашений исчерпан.',
 'The seasonal referral budget is exhausted.':'Бюджет сезонной программы приглашений исчерпан.',
 'Referral rewards are paused. Set a budget before enabling.':'Бонусы за приглашения приостановлены. Задайте бюджет перед включением.',
 'Available funds do not allow this referral adjustment.':'Доступного остатка недостаточно для этой операции программы приглашений.',
 'Referral settings changed. Reload before saving.':'Настройки программы приглашений изменились. Обновите страницу перед сохранением.',
 'Budget must cover at least one complete reward.':'Бюджет должен покрывать хотя бы один полный бонус.',
 'Budget cannot be below rewards already credited this month.':'Бюджет не может быть меньше уже зачисленных за месяц бонусов.',
 'Create a new campaign ID to change seasonal terms.':'Для изменения условий акции задайте новый ID.',
 'Use an invitation alias of 3–24 letters or digits.':'Код приглашения должен содержать 3–24 буквы или цифры.',
 'This invitation alias is already used.':'Этот код приглашения уже занят.',
 'Enter a valid seasonal campaign and budget.':'Проверьте даты, ID и бюджет сезонной акции.',
 'Enter a team goal and target.':'Укажите цель команды и число активных клиентов.',
 'Enter valid referral amounts in cents.':'Проверьте суммы программы приглашений.',
 'Verify the first funding receipt before crediting.':'Перед зачислением проверьте поступление первого платежа.',
 'This referral reward cannot be credited.':'Этот бонус за приглашение нельзя зачислить.',
 'Referral reward not found.':'Бонус за приглашение не найден.',
 'Choose a referral review action.':'Выберите действие для проверки бонуса за приглашение.',
 'The monthly Club budget is exhausted.':'Месячный бюджет программы приглашений исчерпан.',
 'The seasonal Club budget is exhausted.':'Бюджет сезонной программы приглашений исчерпан.',
 'Club rewards are paused. Set a budget before enabling.':'Бонусы за приглашения приостановлены. Задайте бюджет перед включением.',
 'Available funds do not allow this Club adjustment.':'Доступного остатка недостаточно для этой операции программы приглашений.',
 'Club settings changed. Reload before saving.':'Настройки программы приглашений изменились. Обновите страницу перед сохранением.',
 'Enter valid Club amounts in cents.':'Проверьте суммы программы приглашений.',
 'This Club reward cannot be credited.':'Этот бонус за приглашение нельзя зачислить.',
 'Program paused':'Программа приостановлена',
 'Awaiting credit':'Ожидает зачисления',
 'Contact match requires review':'Совпадение контактов требует проверки',
 'First funding below minimum':'Первое пополнение ниже минимума',
 'Credited from acquisition budget':'Зачислено из бюджета привлечения'
 };
 const legacyEnglish={
  'The monthly Club budget is exhausted.':'The monthly referral budget is exhausted.',
  'The seasonal Club budget is exhausted.':'The seasonal referral budget is exhausted.',
  'Club rewards are paused. Set a budget before enabling.':'Referral rewards are paused. Set a budget before enabling.',
  'Available funds do not allow this Club adjustment.':'Available funds do not allow this referral adjustment.',
  'Club settings changed. Reload before saving.':'Referral settings changed. Reload before saving.',
  'Enter valid Club amounts in cents.':'Enter valid referral amounts in cents.',
  'This Club reward cannot be credited.':'This referral reward cannot be credited.',
  'Club reward reversed':'Referral reward reversed',
 };
 const message=(text,language)=>language==='ru'?(errors[text]||legacyEnglish[text]||text):(legacyEnglish[text]||text);
 return {levels,defaults,rank,firstFunding,active,month,amount,message};
});

},
"dist/central/call-scripts.js":function(module,exports,require){
'use strict';
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('../account-finance.js'):root.EcoFinance,typeof module==='object'&&module.exports?require('./club-model.js'):root.EcoClubModel);if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoCallScripts=api;})(typeof window==='object'?window:globalThis,(finance,club)=>{
 const business=typeof module==='object'&&module.exports?require('../business-model.js'):globalThis.EcoBusiness;
 const journeyModel=typeof module==='object'&&module.exports?require('../journey-model.js'):globalThis.EcoJourney;
 const funnel=typeof module==='object'&&module.exports?require('./funnel-model.js'):window.EcoFunnel,legacyProjectKey='min'+'ing';
 const zones=['America/Toronto','America/Vancouver','America/Halifax','America/Regina','America/St_Johns','America/New_York','America/Chicago','America/Denver','America/Los_Angeles','America/Phoenix','America/Anchorage','Pacific/Honolulu'];
 function parts(time,zone){return Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(time)).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));}
 function clock(zone,time=Date.now()){if(!zone)return {known:false,within:false};try{const p=parts(time,zone);return {known:true,within:Number(p.hour)>=9&&Number(p.hour)<20,local:`${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}`,hour:Number(p.hour)};}catch{return {known:false,within:false};}}
 function callback(local,zone){if(!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(local)||!clock(zone).known)throw Error('Confirm the client timezone and callback time.');const target=Date.parse(local+'Z');if(!Number.isFinite(target)||new Date(target).toISOString().slice(0,16)!==local)throw Error('Enter a valid callback time.');const offsets=new Set();for(const d of [-36,-12,0,12,36]){const time=target+d*3600000,p=parts(time,zone);offsets.add(Date.parse(`${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:00Z`)-time);}const matches=[...offsets].map(o=>target-o).filter(time=>clock(zone,time).local===local.replace('T',' '));if(matches.length!==1)throw Error('This local time is missing or ambiguous due to daylight saving. Choose another time.');if(!clock(zone,matches[0]).within)throw Error('Choose a callback between 09:00 and 20:00 client time.');return new Date(matches[0]).toISOString();}
 const computeMaximum=100000000,chargeAvailabilityStatuses=new Set(['unconfirmed','available_for_review','not_available']);
 function computeAmount(value){if(typeof value==='number')return Number.isFinite(value)&&value>=0&&value<=computeMaximum&&Math.abs(value*100-Math.round(value*100))<.00001?value:NaN;if(typeof value!=='string')return NaN;let s=value.trim().replace(/[\u00a0\u202f]/g,' ');if(!s)return NaN;if(/^\d{1,3}( \d{3})+([.,]\d{1,2})?$/.test(s))s=s.replaceAll(' ','').replace(',','.');else if(/^\d{1,3}(,\d{3})+(\.\d{1,2})?$/.test(s))s=s.replaceAll(',','');else if(/^\d+([.,]\d{1,2})?$/.test(s))s=s.replace(',','.');else return NaN;const n=Number(s);return Number.isFinite(n)&&n>=0&&n<=computeMaximum&&Math.abs(n*100-Math.round(n*100))<.00001?n:NaN;}
 function notes(input,options={}){if(!input||typeof input!=='object')throw Error('Complete the call notes.');const out={};for(const key of ['region','situation','problem','implication','needPayoff']){if(typeof input[key]!=='string'||input[key].length>(key==='region'?80:600))throw Error('Call notes are too long.');out[key]=input[key].trim();}const scripts=['ftd','club','referral','retention','solar','compute','academy','expansion'];if(!scripts.includes(input.script)||!['unknown','interested','later','declined','issue'].includes(input.clubInterest))throw Error('Choose a call script and referral interest.');if(typeof input.timezone!=='string'||input.timezone.length>80||input.timezone&&!clock(input.timezone).known)throw Error('Choose a valid client timezone.');const parsedAmount=input.script==='ftd'||input.amount===null||input.amount===''?null:input.script==='compute'?computeAmount(input.amount):finance.parseAmount(input.amount),maximum=input.script==='compute'?computeMaximum:finance.maximum;if(parsedAmount!==null&&(!Number.isFinite(parsedAmount)||parsedAmount<0||parsedAmount>maximum))throw Error('Enter a valid discussed amount.');const amount=parsedAmount,chargeAvailabilityStatus=input.script==='ftd'?(input.chargeAvailabilityStatus??'unconfirmed'):null;if(input.script==='ftd'&&!chargeAvailabilityStatuses.has(chargeAvailabilityStatus))throw Error('Choose a valid Charge project availability status.');const nextAction=typeof input.nextAction==='string'?input.nextAction.trim():'',nextOwner=typeof input.nextOwner==='string'?input.nextOwner.trim():'',nextTime=input.nextDueAt?Date.parse(input.nextDueAt):NaN,nextDueAt=Number.isFinite(nextTime)?new Date(nextTime).toISOString():null;if(nextAction.length>600||nextOwner.length>120||input.nextDueAt&&!nextDueAt)throw Error('Enter a valid agreed next step.');if(!['support','plan','referral','none'].includes(input.retentionPath||'none'))throw Error('Choose one retention path.');if(options.requireSpin&&['situation','problem','implication','needPayoff'].some(key=>!out[key]))throw Error('Complete Situation, Problem, Implication and Need-payoff before qualification.');if(options.requireNext&&(!nextAction||!nextOwner||!nextDueAt||input.clientConfirmed!==true))throw Error('Record the agreed action, owner, date and client confirmation before qualification.');return {...out,spinVersion:1,script:input.script,timezone:input.timezone,amount,...(input.script==='ftd'?{chargeAvailabilityStatus}:{}),clubInterest:input.clubInterest,nextAction,nextOwner,nextDueAt,clientConfirmed:input.clientConfirmed===true,retentionPath:input.retentionPath||'none',serviceIssue:input.serviceIssue===true,textSent:input.textSent===true,seenWeek:input.seenWeek===true,seenWithdrawal:input.seenWithdrawal===true};}
 const projectIds=new Set(['charge','solar','compute']);
 function projectRequest(context={}){context=context||{};const j=context.journey||context.state?.journey||{},request=projectIds.has(j.requestedProject)?j.requestedProject:(['fast','consult'].includes(j.route)&&projectIds.has(j.topic)?j.topic:null);if(journeyModel.archivedComputeCapacity(context))return null;return request;}
 function initialMode(record,context){const requested=projectRequest(context),state=context?.state||{};if(context?.solar&&(!requested||requested==='solar'))return 'solar';if(context?.compute&&(!requested||requested==='compute'))return 'compute';if(journeyModel.activeCompute(context)&&(!requested||requested==='compute'))return 'compute';if(requested==='charge')return 'ftd';if(requested==='solar')return 'solar';if(requested==='compute')return 'compute';if(['club','referral','retention'].includes(record?.script))return record.script;if(state.plan||state.planDraft)return 'ftd';if(record?.script==='academy')return 'academy';return 'academy';}
 function providerConfirmedWithdrawal(record){if(!record)return false;const payment=record.payment||record.provider||{},confirmed=record.providerConfirmed===true||payment.providerConfirmed===true,reference=record.providerReference||payment.providerReference||payment.reference,confirmedAt=record.providerConfirmedAt||payment.providerConfirmedAt;return confirmed&&typeof reference==='string'&&reference.trim().length>=3&&Number.isFinite(Date.parse(confirmedAt));}
 function referralReadiness(state={},crm={},time=Date.now()){state=state||{};crm=crm||{};if(crm.status==='do_not_contact')return 'do_not_contact';if(crm.callData?.serviceIssue||crm.callData?.clubInterest==='issue')return 'issue';if(crm.callData?.clubInterest==='declined')return 'declined';const f=club.firstFunding(state);if(!f||f.receiptChecked!==true)return 'no_funding';const withdrawal=funnel.firstWithdrawal(state,time);if(!withdrawal)return 'no_withdrawal';if(!providerConfirmedWithdrawal(withdrawal))return 'no_provider_receipt';return 'ready';}
 const clubReadiness=referralReadiness;
 function expansionReadiness(state={},crm={},journey={}){if(crm?.status==='do_not_contact')return 'do_not_contact';const requested=['solar','compute'].includes(projectRequest({journey}))||(!journey.route&&['solar','compute'].includes(journey.topic));if(crm?.callData?.serviceIssue&&!requested)return 'issue';return 'ready';}
 function baseScripts(kind,language='en',context={}){const ru=language==='ru',t=(en,r)=>ru?r:en,amount=context.crm?.callData?.amount||context.state?.planDraft?.capital,amountText=amount?new Intl.NumberFormat(ru?'ru-RU':'en-US',{style:'currency',currency:'USD'}).format(amount):t('[agreed amount]','[согласованная сумма]'),r=context.rules||{},bonus=new Intl.NumberFormat(ru?'ru-RU':'en-US',{style:'currency',currency:'USD'}).format((r.referrerCents||5000)*(r.campaign?.multiplier||1)/100),routeJourney=context.journey||context.state?.journey||{};
 const layers={open:'hook',objective:'story',situation:'story',qualify:'story',model:'story',economics:'story',details:'story',evidence:'proof',terms:'proof',permission:'proof',decision:'proof',risk:'proof',archive:'proof',close:'next',next:'next',wrap:'next'};
 const section=(id,en,rus,textEn,textRu)=>({id,title:t(en,rus),text:t(textEn,textRu),note:id==='economics'?business.evidence(language):'',layer:layers[id]||'depth'});
 if(kind==='expansion'){
 const journey=context.journey||context.state?.journey||{},readiness=expansionReadiness(context.state,context.crm,journey),names={charge:'EcoGrid Charge',solar:'EcoGrid Solar',compute:'EcoGrid Compute'},selected=names[projectRequest(context)||journey.currentProject||journey.topic]||t('EcoGrid','EcoGrid');
 if(readiness==='do_not_contact')return [section('wait','Do not contact','Не связываться','The client opted out of contact. Do not call or send a project offer unless the client initiates a new request.','Клиент отказался от связи. Не звоните и не отправляйте предложение, пока клиент сам не создаст новый запрос.')];
 if(readiness==='issue')return [section('wait','Resolve the service issue first','Сначала решить сервисный вопрос','Resolve the active service issue before an outbound offer. If the client independently requests Solar or Compute, answer that specific request without sales pressure.','Сначала решите активную сервисную проблему до исходящего предложения. Если клиент сам запросит Solar или Compute, ответьте на конкретный запрос без давления.')];
 const solarRow=section('solar-project','Solar participation','Участие в Solar','For Solar, review the site, generation, energy buyer or use, equipment, grid connection, operating costs, rights and exit terms. Request a separate written proposal. Home equipment purchase is a different technical-quote route.','Для Solar разберите площадку, генерацию, покупателя или использование энергии, оборудование, подключение к сети, расходы, права и выход. Подготовьте отдельное письменное предложение. Покупка системы для дома — другой маршрут, с технической сметой.');
 const computeRow=section('compute-project','EcoGrid Compute','EcoGrid Compute','Review participation in Compute infrastructure: actually paid workload revenue, hardware, power, cooling, network and operating costs, utilization, rights, reporting and exit. The project-specific proposal and agreement must confirm the evidence and terms. Charge rates do not apply.','Разберите участие в инфраструктуре Compute: фактически оплаченную выручку от задач, оборудование, энергию, охлаждение, сеть и эксплуатационные расходы, загрузку, права, отчётность и выход. Данные и условия должны быть подтверждены отдельными предложением и договором проекта. Ставки Charge не применяются.');
 const requested=projectRequest(context),projectRows=requested==='solar'?[solarRow]:requested==='compute'?[computeRow]:[solarRow,computeRow];
 return [
 section('open','Confirm the selected request','Подтвердить выбранный запрос',`You requested ${selected}. Let’s confirm the purpose and review that direction now.`,`Вы запросили ${selected}. Уточним цель и сразу разберём это направление.`),
 section('permission','A separate proposal','Отдельное предложение','Charge, Solar and Compute use separate proposals, agreements and financial models. We will follow the project and purpose saved in the request; no prior Charge deposit is required.','Для Charge, Solar и Compute используются отдельные предложения, договоры и финансовые модели. Следуем проекту и цели из заявки; предыдущий депозит в Charge не требуется.'),
 ...projectRows,
 section('decision','Review the separate terms','Проверить отдельные условия','What question remains about this proposal? Review its documents, risks, costs and exit terms before deciding. Never move capital between projects without the client’s separate instruction and the applicable written terms.','Какой вопрос остался по этому предложению? До решения проверьте документы, риски, расходы и выход. Не переводите капитал между проектами без отдельного указания клиента и применимых письменных условий.'),
 section('next','Record the chosen next step','Записать следующий шаг','Record the selected project, purpose, questions and dated follow-up. If the client declines, close this proposal while preserving support for any existing project.','Запишите выбранный проект, цель, вопросы и дату контакта. При отказе закройте это предложение, сохранив сопровождение любого действующего проекта.')];
 }
 if(kind==='academy')return (typeof module==='object'&&module.exports?require('./academy-script.js'):window.EcoAcademyScript).scripts(language,context);
 const j=context.journey||context.state?.journey,requested=projectRequest(context),legacyCharge=!requested&&Boolean(context.state?.plan||context.state?.planDraft);
 if(kind==='ftd'&&!legacyCharge&&requested!=='charge'){const names={charge:'EcoGrid Charge',solar:'EcoGrid Solar',compute:'EcoGrid Compute',ai:t('EcoGrid technology','технологии EcoGrid'),club:'EcoGrid Club',energy:'EcoGrid'},name=names[j?.currentProject||j?.topic]||'EcoGrid';
 if(j?.route==='nurture')return [section('explore','Exploration preference','Самостоятельное знакомство','This person saved an interest in '+name+'. They did not request a sales call. Use the relevant guide; wait for a consultation request before entering the call queue.','Человек сохранил интерес к '+name+'. Он не запрашивал звонка продавца. Ориентируйте на материал по теме; в очередь звонка переводите после запроса консультации.')];
 return [section('open','Confirm the request','Подтвердить запрос','Hi [name], this is [manager] with EcoGrid. You requested details about '+name+'. Is now a good time to discuss that specific direction?','Здравствуйте, [имя]. Это [менеджер] EcoGrid. Вы запросили информацию по '+name+'. Удобно сейчас обсудить именно это направление?'),
 section('objective','Understand the objective','Уточнить задачу','What would you like to understand before making a decision? Confirm the selected project: Charge participation, a Solar project or property system, Compute infrastructure participation, or a business partnership.','Что хотите понять до принятия решения? Подтвердите выбранное направление: участие в Charge, проект или система Solar для объекта, участие в инфраструктуре Compute либо деловое партнёрство.'),
 section('context','Keep the original context','Сохранить контекст входа','Which guide or page brought you here, and what questions remain? Do not make the person repeat information already recorded in the request.','Какая страница или материал привели вас сюда и какие вопросы остались? Не просите повторять сведения, которые уже есть в заявке.'),
 section('details','Discuss the selected project','Обсудить выбранный проект','Review the relevant site, equipment, operating stage, responsible team and proposed terms. Separate confirmed information from estimates and planned features.','Разберите площадку, оборудование, стадию работы, ответственную команду и условия. Отделяйте подтверждённые сведения от расчётов и планируемых возможностей.'),
 section('next','Agree one useful next step','Согласовать полезный следующий шаг','Would project information, a technical discussion or account access be useful next? Confirm the contact channel and timing. Record a qualified lead only after confirming the need and next step.','Что полезнее дальше: сведения о проекте, техническая консультация или доступ в кабинет? Согласуйте канал связи и время. Квалифицируйте заявку после подтверждения задачи и следующего шага.')];}
 if(kind==='solar'){
const property=routeJourney.purpose==='equipment'||(!routeJourney.purpose&&Boolean(context.solar)),participation=routeJourney.purpose==='participation';
 return [
 section('open','EcoGrid Solar inquiry','Заявка EcoGrid Solar',property?'Hi [name], this is [manager] with EcoGrid. Solar starts with your property, not a panel brand. Let’s confirm the inputs that determine the configuration and written quote.':participation?'Hi [name], this is [manager] with EcoGrid. Your Solar request concerns participation in a separate project. Let’s review the actual site, energy buyer and costs behind that model.':'Hi [name], this is [manager] with EcoGrid. Do you need a Solar system for your property or a review of participation in a separate Solar project?',''+(property?'Здравствуйте, [имя], это [менеджер] EcoGrid. Solar начинается не с марки панели, а с вашего объекта. Уточним данные, от которых зависят конфигурация и письменная смета.':participation?'Здравствуйте, [имя], это [менеджер] EcoGrid. Ваш запрос Solar касается участия в отдельном проекте. Разберём конкретную площадку, покупателя энергии и расходы этой модели.':'Здравствуйте, [имя], это [менеджер] EcoGrid. Вам нужна Solar-система для своего объекта или разбор участия в отдельном проекте Solar?')),
 section('qualify','Define the task','Определить задачу',property?'Confirm the country, address, utility tariff and bill, property type, installation area, consumption pattern, storage need and budget.':'Confirm the site, generation, energy buyer or use, interconnection, operating costs, rights, reporting and exit terms that must be verified.',property?'Уточните страну, адрес, тариф и счёт, тип объекта, место установки, график потребления, нужен ли накопитель, и бюджет.':'Уточните площадку, выработку, покупателя или использование энергии, подключение, расходы, права, отчётность и условия выхода.'),
 section('model','How Solar creates value','Как Solar создаёт ценность',property?'Panels generate electricity; storage shifts when it is used. The result depends on generation, consumption, tariff, export rules, configuration, installation and service costs.':'A project result begins with documented energy sales or use, then accounts for equipment, interconnection, storage, service, tax, reserve and downtime costs. Charge rates, 42%, four-day settlement and the Charge AI uplift do not apply.',property?'Панели производят энергию, а накопитель переносит её использование. Результат зависит от выработки, потребления, тарифа, правил отдачи в сеть, конфигурации, монтажа и сервиса.':'Результат проекта начинается с подтверждённой продажи или использования энергии, затем учитываются оборудование, подключение, накопители, сервис, налоги, резерв и простои. Ставки Charge, 42%, четырёхдневный расчёт и AI-надбавка Charge не применяются.'),
 section('terms',property?'What the written quote proves':'What the Solar proposal must prove',property?'Что подтверждает письменная смета':'Что должно подтвердить предложение Solar',property?'The quote records verified site inputs, available configuration, installation scope, interconnection, permits, generation assumptions, complete price, timing, warranties and exclusions.':'The proposal records the actual site, buyer or use, generation assumptions, operating evidence, costs, rights, reporting, risks and exit terms needed to assess the project.',property?'Смета фиксирует проверенные данные объекта, доступную конфигурацию, объём монтажа, подключение, разрешения, допущения по выработке, полную цену, срок, гарантии и исключения.':'Предложение фиксирует конкретную площадку, покупателя или использование энергии, допущения по выработке, операционные данные, расходы, права, отчётность, риски и условия выхода, необходимые для оценки проекта.'),
 section('close','Agree one next step','Согласовать один шаг',property?'Next is a technical site review and a complete written quote. When should we review the result together?':'Next is verification of the project evidence and a separate written Solar proposal. Which question should we resolve first?',property?'Следующий шаг — техническая проверка объекта и полная письменная смета. Когда удобно вместе разобрать результат?':'Следующий шаг — проверка данных проекта и отдельное письменное предложение Solar. Какой вопрос закрыть сначала?')
 ];}
 if(kind==='compute'){
  const archived=journeyModel.archivedComputeCapacity(context);
  if(archived)return [section('archive','Archived Compute request · read only','Архивный запрос Compute · только чтение','This earlier GPU-capacity request is preserved for history. Do not quote, register, follow up or reinterpret it as infrastructure participation. A new participation conversation requires a separate explicit request from the client.','Прежний запрос GPU-мощности сохранён для истории. Не готовьте по нему предложение, регистрацию или повторный контакт и не переоформляйте его в участие. Для нового обсуждения участия нужен отдельный явный запрос клиента.')];
  return [
 section('open','EcoGrid Compute inquiry','Заявка EcoGrid Compute','Hi [name], this is [manager] with EcoGrid. You requested a review of Compute infrastructure participation. The goal is to show who pays, which costs come first and how the agreement defines the participant result.','Здравствуйте, [имя], это [менеджер] EcoGrid. Вы запросили разбор участия в инфраструктуре Compute. Цель разговора — показать, кто платит, какие расходы учитываются первыми и как договор определяет результат участника.'),
 section('qualify','Define the first question','Определить первый вопрос','Confirm what the client wants to verify first: the energy system, paid demand, full project costs, participant rights, reporting or exit.','Уточните, что клиент хочет проверить сначала: энергосистему, оплачиваемый спрос, все расходы проекта, права участника, отчётность или выход.'),
 section('model','How Compute creates value','Как Compute создаёт ценность','EcoGrid connects energy, cooling, network and hardware into a computing service. Business customers pay for delivered workloads; after every project cost, the written proposal defines the variable participant result. Charge terms do not apply.','EcoGrid объединяет энергию, охлаждение, сеть и оборудование в вычислительный сервис. Бизнес-клиенты оплачивают выполненные задачи; после всех расходов проекта письменное предложение определяет переменный результат участника. Условия Charge не применяются.'),
 section('terms','What the proposal must prove','Что должно подтвердить предложение','The proposal records one project: site and energy, hardware, paid-demand evidence, all costs, participant rights, reporting, risks and exit. It does not promise utilization, revenue or capital preservation.','Предложение фиксирует один проект: площадку и энергосистему, оборудование, подтверждение оплачиваемого спроса, все расходы, права участника, отчётность, риски и выход. Оно не обещает загрузку, выручку или сохранность капитала.'),
 section('close','Agree one next step','Согласовать один шаг','Choose one next step: verify a specific point or prepare the project-specific participation review. Record the owner and date.','Выберите один следующий шаг: проверить конкретный вопрос или подготовить разбор участия по проекту. Зафиксируйте ответственного и срок.')
 ];}
 if(kind==='retention'&&referralReadiness(context.state,context.crm)!=='ready')return [
 section('wait','Provider receipt required','Нужно подтверждение платёжного провайдера','Do not start a retention, additional-funding or referral conversation. Record the withdrawal as unresolved until the payment provider confirms receipt with a reference and confirmation date. Resolve the payment issue first; an internal Approved status is not enough.','Не начинайте разговор о сопровождении, дополнительном пополнении или приглашениях. Считайте вывод нерешённым, пока платёжный провайдер не подтвердит получение с номером операции и датой. Сначала решите платёжный вопрос: внутреннего статуса Approved недостаточно.')];
 if(kind==='retention')return [
 section('open','Third call · after withdrawal','Третий звонок · после вывода','Hi [name], this is [manager] with EcoGrid. Is this a good time to review your first withdrawal experience?','Здравствуйте, [имя], это [менеджер] из EcoGrid. Удобно обсудить опыт первого вывода?'),
 section('confirm','Confirm receipt and context','Уточнить получение и контекст','The payment provider has confirmed receipt for the first withdrawal and recorded its reference and date. Did the client receive the expected amount through the expected channel? If the client reports any mismatch, record the withdrawal as unresolved and do not discuss additional funding or referrals.','Платёжный провайдер подтвердил получение первого вывода и зафиксировал номер операции и дату. Клиент получил ожидаемую сумму по согласованному каналу? Если есть расхождение, отметьте вывод как нерешённый и не обсуждайте дополнительное пополнение или приглашения.'),
 section('service','Resolve issues first','Сначала решить вопросы','Was anything slow, unclear or inconvenient? If money has not arrived or there is an unresolved issue, I will record it and focus on fixing it. We will not discuss funding or referrals today.','Что было долго, непонятно или неудобно? Если средства не поступили или есть нерешённый вопрос, зафиксирую его и займусь решением. Сегодня пополнение и рекомендации не обсуждаем.'),
 section('permission','Permission for the next topic','Разрешение перейти дальше','If everything is clear, would you prefer to leave things as they are, review your current plan, or hear about the optional referral program? Any of those is fine.','Если всё понятно, как вам удобнее: оставить всё как есть, посмотреть текущий план или узнать про необязательную программу приглашений? Подходит любой вариант.'),
 section('club','Optional referral program','Необязательная программа приглашений','If you want to share the information with someone, we can review the referral program terms together. Rewards apply to direct referrals only. The referral trigger remains first checked funding of at least $250; your withdrawal changes the timing of this conversation, not the reward rules. Check the current program status and budget before quoting a bonus. Club membership is separate.','Если хотите поделиться информацией со знакомым, можем вместе посмотреть условия программы приглашений. Денежный бонус — только за личное приглашение. Условие остаётся прежним: первое подтверждённое пополнение друга от $250. Ваш вывод меняет время этого разговора, а не правило бонуса. Перед озвучиванием бонуса проверяем состояние программы и бюджет. Членство в Club ведётся отдельно.'),
 section('repeat','Optional additional funding','Необязательное повторное пополнение','Would you like to compare your current plan with an additional amount you already intended to allocate? There is no need to increase it. I will not suggest using borrowed money, emergency savings, or an amount you need for expenses.','Хотите сравнить текущий план с дополнительной суммой, которую вы и так рассматривали для участия? Увеличивать её не обязательно. Я не предлагаю использовать кредит, резерв на непредвиденные расходы или деньги на текущие нужды.'),
 section('compare','Compare before deciding','Сравнить до решения','Tell me the amount you want to compare. I will show current capital, additional funds, total capital, the selected monthly model rate and its calendar-based estimate. A higher amount does not automatically mean a different tariff. Preparing a draft neither funds nor activates it.','Назовите сумму для сравнения. Покажу текущий капитал, добавление, общий капитал, ставку выбранного тарифа за месяц и календарный расчёт. Большая сумма сама по себе не переключает тариф. Подготовка черновика не пополняет и не активирует план.'),
 section('limits','Keep risks visible','Сохранить границы','One completed withdrawal does not guarantee future returns or protect capital. The Energy Lab and displayed rates are models, not verified station revenue. You can review the terms independently or stop without changing the plan.','Один завершённый вывод не гарантирует будущую доходность и сохранность капитала. Energy Lab и ставки на экране — модель, не подтверждённая выручка станций. Можно самостоятельно проверить условия или закончить разговор без изменения плана.'),
 section('close','Agree one next step','Согласовать один шаг','What would be useful now: keep the current plan, receive the comparison, or review the personal invitation link? I will only prepare what you asked for. If you want more time, let’s agree a callback in your time zone.','Что сейчас полезнее: оставить текущий план, получить сравнение или посмотреть личную ссылку приглашения? Подготовлю только то, что вы попросили. Если нужно время, согласуем перезвон по вашему часовому поясу.'),
 section('wrap','Record the outcome','Записать итог','Confirm the agreed next step, any service issue and the callback time. Mark a referral invitation only if it was actually discussed during a connected call. No deposit, message, or plan change is created by these notes.','Подтвердите согласованный шаг, сервисный вопрос и время перезвона. Приглашение по реферальной программе отмечайте только если действительно обсудили его при дозвоне. Эти заметки не создают депозит, сообщение или изменение плана.')];
 if(kind==='referral'){
  const readiness=referralReadiness(context.state,context.crm);
  if(readiness!=='ready')return [section('wait','Referral conversation unavailable','Обсуждение приглашений недоступно','Do not discuss the referral program until the payment provider has confirmed the client’s first withdrawal and every account issue is resolved. Club membership is separate and remains non-financial.','Не обсуждайте программу приглашений, пока платёжный провайдер не подтвердил первый вывод клиента и не решены вопросы по кабинету. Членство в Club ведётся отдельно и остаётся нефинансовым.')];
  return [
   section('open','Optional referral program','Необязательная программа приглашений','Hi [name], you asked about the optional referral program. Is now a good time to check whether its current terms fit what you want to do?','Здравствуйте, [имя]. Вы спросили о необязательной программе приглашений. Удобно сейчас проверить, подходят ли её действующие условия вашей задаче?'),
   section('terms','Current referral terms','Действующие условия приглашений',`Rewards apply only to direct referrals whose first checked funding is at least $250. Check the current program status and budget before quoting the ${bonus} reward. Club membership is separate and does not change project terms.`,`Бонус относится только к личному приглашению, если первое подтверждённое пополнение приглашённого составляет не менее $250. Перед озвучиванием бонуса ${bonus} проверьте состояние программы и бюджет. Членство в Club ведётся отдельно и не меняет условия проектов.`),
   section('next','Agree one next step','Согласовать один шаг','If the client chooses to continue, review the personal link and current written terms. Otherwise, close the referral topic without changing the client’s project or Club status.','Если клиент решил продолжить, разберите личную ссылку и действующие письменные условия. Иначе закройте тему приглашений, не меняя проект или статус клиента в Club.')
  ];
 }
 if(kind==='club')return [
 section('open','EcoGrid Club interest','Интерес к EcoGrid Club','Hi [name], this is [manager] with EcoGrid. You asked about EcoGrid Club, our optional non-financial community. Is now a good time to understand what you would like from it?','Здравствуйте, [имя], это [менеджер] EcoGrid. Вы интересовались EcoGrid Club — добровольным нефинансовым сообществом. Удобно уточнить, что именно вы хотите от Клуба?'),
 section('interest','Topics and format','Темы и формат','Which topics are useful to you: responsible energy, project engineering, AI infrastructure, lawful operating costs, or meeting people with similar interests? Would you rather read materials, join discussions or attend a local meeting when dates are confirmed?','Что вам полезнее: ответственная энергетика, инженерия проектов, AI-инфраструктура, законные операционные расходы или знакомство с людьми со схожими интересами? Предпочитаете материалы, обсуждения или локальные встречи после публикации дат?'),
 section('values','Community culture','Культура сообщества','EcoGrid Club is built around truthful communication, respect for law, family responsibility and practical help for people in need. These principles reflect the founder’s Protestant Christian convictions, but membership is open to people of any faith and to those who follow none.','EcoGrid Club строится на честном общении, соблюдении закона, ответственности перед семьёй и практической помощи нуждающимся. Эти принципы связаны с протестантскими христианскими убеждениями основателя, но Клуб открыт людям любой веры и тем, кто не относит себя ни к одной религии.'),
 section('boundary','Separate from project terms','Отдельно от условий проектов','Club membership does not change Charge, Solar or Compute rates, rights, risks or access. It is not an investment product, a wallet, a token program or a condition of participation. Project questions and proposals are handled separately.','Членство в Клубе не меняет ставки, права, риски или доступ к Charge, Solar и Compute. Это не инвестиционный продукт, не кошелёк, не токен-программа и не условие участия. Проектные вопросы и предложения оформляются отдельно.'),
 section('next','Choose one next step','Выбрать следующий шаг','Record the topics and preferred format. Offer only a confirmed channel, published material or dated event. If the client also wants a project proposal, create a separate request for that project without changing the Club interest.','Зафиксируйте темы и удобный формат. Предлагайте только подтверждённый канал, опубликованный материал или мероприятие с датой. Если клиент отдельно хочет предложение по проекту, создайте отдельный запрос по этому проекту, не подменяя интерес к Клубу.'),
 section('close','Close','Завершение','I have recorded your Club interests and preferred contact channel. We will share only confirmed materials or event dates. Would you like anything clarified before we finish?','Я зафиксировал ваши интересы в Клубе и удобный канал связи. Будем отправлять только подтверждённые материалы или даты мероприятий. Остался вопрос, который нужно уточнить сейчас?')];
 return [
section('open','Confirm the Charge application','Подтвердить заявку Charge','Hi [name], [manager] from EcoGrid. You applied to learn how participation in EcoGrid Charge works. Can we talk now?','Здравствуйте, [имя]. Это [менеджер] EcoGrid. Вы оставили заявку, чтобы узнать, как работает участие в EcoGrid Charge. Удобно сейчас?'),
section('situation','Start with the client’s interest','Начать с интереса клиента','What stood out to you first—the physical charging infrastructure, the paid-session model, or how the result appears in the account?','Что вы заметили первым: физическую зарядную инфраструктуру, модель оплаченных сессий или то, как результат отражается в кабинете?'),
section('economics','Explain the operating model','Объяснить операционную модель','EcoGrid Charge is built around company-owned charging infrastructure. Drivers pay for completed sessions; EcoGrid accounts for operating costs before the project result is reported in the client account.','EcoGrid Charge построен вокруг собственной зарядной инфраструктуры компании. Водители оплачивают завершённые сессии; EcoGrid учитывает операционные расходы, после чего результат проекта отражается в кабинете клиента.'),
section('evidence','Connect the explanation to the next screen','Связать объяснение со следующим экраном','If Charge is available and the client continues, complete secure registration. Then use the same Aberdeen site shown on the landing page to trace one paid session through operations, costs and account reporting—in the client account or by phone.','Если Charge доступен и клиент продолжает, завершите защищённую регистрацию. Затем на той же площадке Aberdeen, которую клиент видел на лендинге, проведите одну оплаченную сессию через эксплуатацию, расходы и отчётность — в кабинете или по телефону.'),
section('risk','Keep the decision realistic','Сохранить реалистичность решения','Do not promise results. Answer the stated question; the client decides after the presentation.','Не обещайте результат. Ответьте на вопрос; клиент принимает решение после презентации.'),
section('close','Agree the registration step','Согласовать регистрацию','If the client continues, issue the secure registration link. Then record an account walkthrough or phone explanation and return to the client’s decision.','Если клиент продолжает, выпустите защищённую ссылку регистрации. Затем зафиксируйте разбор кабинета или объяснение по телефону и вернитесь к решению клиента.'),
 section('objections','If the client has an objection','Если у клиента возражение','“Is it guaranteed?” — No. Assess the agreement, coverage and risks; full loss of capital is possible.\n“I need to think.” — Which document or unanswered question would help?\n“I have no spare funds.” — Then we stop before any funding discussion.\n“Do not call again.” — Understood; I will record that now.','«Есть гарантия?» — Нет. Оцените договор, покрытие и риски; возможна полная потеря капитала.\n«Мне нужно подумать» — Какой документ или ответ поможет?\n«Нет свободных денег» — Тогда о пополнении не говорим.\n«Не звоните» — Понял, зафиксирую это сейчас.'),
 section('ai-questions','Only if the client asks about Charge AI','Только если клиент спрашивает о Charge AI','Charge AI is optional and applies only to Charge. A confirmed active 30-day period adds exactly +1 percentage point to the selected Charge plan rate. There is no automatic renewal. The uplift is not a share of revenue and does not guarantee payment.','Charge AI — добровольная услуга только для Charge. Подтверждённый активный период длится 30 дней и добавляет ровно +1 процентный пункт к ставке выбранного Charge-плана. Автопродления нет. Надбавка не является долей выручки и не гарантирует выплату.')];
 }

 const phaseLayers={hook:'hook',situation:'story',problem:'story',implication:'story',needPayoff:'story',solution:'story',proof:'proof',next:'next',optional:'depth'};
 const withPhase=(row,phase)=>({...row,phase,layer:phaseLayers[phase]||'depth'});
 function ecoCoinWalletRow(language='en'){
  const ru=language==='ru';
  return {id:'ecocoin-wallet',phase:'optional',layer:'depth',title:ru?'Только по вопросу или при показе «Кошелька»':'Only if asked or while showing Wallet',text:ru?'EcoCoin — отдельный актив EcoGrid в Stellar. После подтверждения типа токена и публикации точных идентификаторов клиент сможет проверить его состояние в публичном реестре. Это не проект, не доля в EcoGrid, не баланс проекта, не способ оплаты или активации Charge, Solar или Compute и не обещание дохода. Подготовленный экран поддерживает только классический актив Stellar; для токена Soroban нужен отдельный контрактный маршрут. При подключении передаётся только публичный G-адрес; при отправке кошелёк возвращает подписанный конверт, но не seed-фразу или приватный ключ. Сначала посмотрите экран EcoCoin: если тип и реквизиты подтверждены и подключение доступно, согласуйте один шаг — открыть «Кошелёк» → «EcoCoin · Stellar». Если реквизиты ещё не включены, согласуйте вместо этого один шаг — открыть «Материалы» → «EcoCoin · Stellar». Не просите подключать кошелёк до подтверждения типа и публикации реквизитов. Если клиент не хочет менять тему, сохраните уже согласованный шаг по проекту.':'EcoCoin is a separate EcoGrid asset on Stellar. After EcoGrid confirms the token type and publishes the exact identifiers, the client can verify its state in the public ledger. It is not a project, equity in EcoGrid, a project balance, a way to pay for or activate Charge, Solar or Compute, or a promise of income. The prepared screen supports a classic Stellar asset only; a Soroban token needs a separate contract route. Connection shares only the public G-address; sending returns a signed envelope, never a seed phrase or private key. Check the EcoCoin screen first: if the type and details are confirmed and connection is available, agree on one step—open Wallet → EcoCoin · Stellar. If the details are not enabled yet, agree instead on one step—open Resources → EcoCoin · Stellar. Do not ask the client to connect a wallet before the type is confirmed and the identifiers are published. If the client does not want to change the topic, keep the already agreed project step.',note:''};
 }
 function spinize(kind,language,context,rows){
  if(rows.length===1&&['wait','archive','explore'].includes(rows[0].id))return [withPhase(rows[0],rows[0].id==='archive'?'proof':'next')];
  if(kind==='academy')return rows;
  if(kind==='ftd'&&projectRequest(context)!=='charge'&&!context.state?.plan&&!context.state?.planDraft)return rows.map((item,index)=>withPhase(item,index===0?'hook':item.id==='next'?'next':item.id==='details'?'proof':'solution'));
  const ru=language==='ru',t=(en,r)=>ru?r:en,row=(id,phase,enTitle,ruTitle,enText,ruText,note='')=>({id,phase,layer:phaseLayers[phase],title:t(enTitle,ruTitle),text:t(enText,ruText),note}),amount=context.crm?.callData?.amount||context.state?.planDraft?.capital,amountText=amount?new Intl.NumberFormat(ru?'ru-RU':'en-US',{style:'currency',currency:'USD'}).format(amount):t('[agreed amount]','[согласованная сумма]'),requested=projectRequest(context),journey=context.journey||context.state?.journey||{},project=kind==='expansion'?(requested||journey.currentProject||journey.topic):kind==='ftd'?'charge':kind,solarPurpose=journey.purpose||'participation',activeComputeSupport=(kind==='compute'||kind==='expansion'&&project==='compute')&&journeyModel.activeCompute(context)&&!journeyModel.newRequestAfterActivation(context,'compute');
  const computeRequest=context.compute||context.state?.computeInquiry||{},computeFocus={undecided:t('to be defined together','определить вместе'),'defined-project':t('a defined project','конкретный проект'),'site-equipment':t('the site and equipment','площадка и оборудование'),'demand-economics':t('demand and economics','спрос и экономика'),'risk-contract-exit':t('risk, agreement and exit','риски, договор и выход')}[computeRequest.focus],computeTimeline={exploring:t('exploring the model','изучаю модель'),'this-quarter':t('this quarter','в этом квартале'),'three-six-months':t('in 3–6 months','через 3–6 месяцев'),'six-twelve-months':t('in 6–12 months','через 6–12 месяцев')}[computeRequest.timeline],computeKnown=Boolean(computeFocus||computeTimeline),computeSituation=computeKnown?t(`Your request records “${computeFocus||'focus not selected'}” and “${computeTimeline||'timeline not selected'}.” What is already clear, and what needs verification first?`,`В заявке указаны «${computeFocus||'фокус не выбран'}» и «${computeTimeline||'срок не выбран'}». Что уже понятно, а что нужно проверить первым?`):t('What have you reviewed about Compute economics and participation terms?','Что вы уже посмотрели по экономике Compute и условиям участия?');
  const chargeQuestions=[['What stood out to you first—the physical charging infrastructure, the paid-session model, or how the result appears in the account?','Что вы заметили первым: физическую зарядную инфраструктуру, модель оплаченных сессий или то, как результат отражается в кабинете?'],['What do you still need to verify before you can judge whether Charge fits you?','Что вам ещё нужно проверить, прежде чем понять, подходит ли вам Charge?'],['If you cannot trace one session through operations, costs and reporting, what would stop you from considering the project?','Если вы не сможете проследить одну сессию через эксплуатацию, расходы и отчётность, что помешает вам рассматривать проект?'],['Would it help if I opened the same Aberdeen site shown on the landing page and walked you from the driver’s payment to the account record?','Поможет ли, если я открою ту же площадку Aberdeen с лендинга и проведу вас от оплаты водителя до записи в кабинете?']];
  const computeQuestions=[[computeSituation,computeSituation],['Which proof is missing: workload buyers, full costs, rights, reporting or exit?','Чего не хватает: подтверждения заказчиков задач, всех расходов, прав, отчётности или выхода?'],['If unverified, what can’t you decide: continue, timing or amount?','Без подтверждения что вы не сможете решить: продолжать, в какой срок или с какой суммой?'],['Open Projects → Real AI Workload Map. Which use case would make the economics clearest?','Откройте «Проекты» → «Карта реальных AI-задач». Какой сценарий поможет понятнее разобрать экономику?']];
  const computeSupportQuestions=[['Which current Compute cycle and recorded events have you already reviewed?','Какой текущий цикл Compute и какие записанные события вы уже посмотрели?'],['What is unclear in this cycle: the customer payment, workload step, confirmed cost, checkpoint or written result?','Что непонятно в этом цикле: оплата заказчика, этап нагрузки, подтверждённый расход, контрольная точка или письменный результат?'],['How does that gap affect your understanding of the current cycle or the action you can take now?','Как этот пробел влияет на понимание текущего цикла или действие, которое вы можете выполнить сейчас?'],['Which exact record, report or support answer would resolve the current-cycle question?','Какая конкретная запись, отчёт или ответ поддержки закроет вопрос по текущему циклу?']];
  const refinedSolarQuestions=solarPurpose==='equipment'?[['What should Solar solve for this property?','Какую задачу должен решить Solar для этого объекта?'],['Which input is missing: address, bill, tariff, consumption pattern, installation area, storage or budget?','Какого параметра не хватает: адреса, счёта, тарифа, профиля потребления, места установки, накопителя или бюджета?'],['If that site input stays unverified, what could go wrong: the configuration, full price or installation timing?','Если этот параметр объекта не подтвердить, где возможна ошибка: в конфигурации, полной цене или сроке монтажа?'],['How would a verified site review and written quote help you choose the next step?','Как проверка объекта и письменная смета помогут выбрать следующий шаг?']]:solarPurpose==='business'?[['What commercial outcome and role are you considering in the Solar partnership?','Какой коммерческий результат и роль вы рассматриваете в партнёрстве Solar?'],['What is unclear: site, demand or buyer, responsibilities, costs, timeline, reporting or exit?','Что неясно: объект, спрос или покупатель, ответственность сторон, расходы, сроки, отчётность или выход?'],['If the role, buyer or cost allocation remains unclear, what does it prevent you from deciding?','Если роль, покупатель или распределение расходов останутся неясными, что вы не сможете решить?'],['How would verified inputs and written partnership terms help you choose the next step?','Как подтверждённые данные и письменные условия партнёрства помогут выбрать следующий шаг?']]:[['What result and time horizon are you considering from Solar project participation?','Какой результат и срок вы рассматриваете от участия в проекте Solar?'],['What is unclear: the site, energy buyer or use, generation evidence, interconnection, costs, rights, reporting or exit?','Что неясно: объект, покупатель или использование энергии, подтверждение выработки, подключение, расходы, права, отчётность или выход?'],['If that evidence or term remains unclear, what does it prevent you from deciding: project fit, timing, amount or exit?','Если это подтверждение или условие останется неясным, что вы не сможете решить: подходит ли проект, срок, сумму или выход?'],['How would project evidence and written terms help you choose the next step?','Как подтверждения проекта и письменные условия помогут выбрать следующий шаг?']];
  let openText=activeComputeSupport?[`Hi [name], this is [manager] from EcoGrid Compute. Is now a good time to review your current cycle and the recorded events that need attention?`,`Здравствуйте, [имя]. Это [менеджер] EcoGrid Compute. Удобно разобрать текущий цикл и записанные события, которые требуют внимания?`]:({
    ftd:[`Hi [name], [manager] from EcoGrid Charge. You applied to learn how participation in EcoGrid Charge works. I’ll first understand what interested you and confirm whether Charge is available for your jurisdiction. Can we talk now?`,`Здравствуйте, [имя]. Это [менеджер] EcoGrid Charge. Вы оставили заявку, чтобы узнать, как работает участие в EcoGrid Charge. Сначала уточню, что вас заинтересовало, и подтвержу, доступен ли Charge в вашей юрисдикции. Удобно сейчас?`],
   compute:[`Hi [name], this is [manager] from EcoGrid Compute. Can we review your participation request now?`,`Здравствуйте, [имя]. Это [менеджер] EcoGrid Compute. Удобно разобрать ваш запрос на участие?`],
   solar:[`Hi [name], this is [manager] with EcoGrid Solar. Is now a good time to review your specific request?`,`Здравствуйте, [имя]. Это [менеджер] EcoGrid Solar. Удобно сейчас разобрать вашу задачу?`],
   expansion:[`Hi [name], this is [manager] with EcoGrid. You requested ${project==='solar'?'EcoGrid Solar':'EcoGrid Compute'}. Is now a good time?`,`Здравствуйте, [имя]. Это [менеджер] EcoGrid. Вы запросили ${project==='solar'?'EcoGrid Solar':'EcoGrid Compute'}. Удобно сейчас?`],
   club:[`Hi [name], this is [manager] with EcoGrid. You asked about EcoGrid Club. Is now a good time?`,`Здравствуйте, [имя]. Это [менеджер] EcoGrid. Вы интересовались EcoGrid Club. Удобно сейчас?`],
   referral:[`Hi [name], you asked about the optional referral program. Is now a good time?`,`Здравствуйте, [имя]. Вы спросили о необязательной программе приглашений. Удобно сейчас?`],
   retention:[`Hi [name], this is [manager] with EcoGrid. Is now a good time to review your first withdrawal experience?`,`Здравствуйте, [имя]. Это [менеджер] EcoGrid. Удобно обсудить опыт первого вывода?`]
  }[kind]||[`Hi [name], this is [manager] with EcoGrid. Is now a good time?`,`Здравствуйте, [имя]. Это [менеджер] EcoGrid. Удобно сейчас?`]);
  if(kind==='ftd')openText=['Hi [name], [manager] from EcoGrid. You applied to learn how participation in EcoGrid Charge works. Can we talk?','Здравствуйте, [имя]. Это [менеджер] EcoGrid. Вы оставили заявку, чтобы узнать, как работает участие в EcoGrid Charge. Удобно сейчас?'];
  const questions=activeComputeSupport?computeSupportQuestions:({
   ftd:chargeQuestions,
   compute:computeQuestions,
   solar:refinedSolarQuestions,
   expansion:[
    [`What outcome do you want from ${project==='solar'?'Solar':'Compute'}?`,`Какой результат вы хотите получить от ${project==='solar'?'Solar':'Compute'}?`],
    ['Which condition or evidence is still missing?','Какого условия или подтверждения пока не хватает?'],
    ['How does that gap affect your decision or timing?','Как этот пробел влияет на решение или срок?'],
    ['What must the separate proposal confirm for you?','Что должно подтвердить отдельное предложение?']],
   club:[
    ['Which Club topic or format interests you now?','Какая тема или форма участия в Club вам интересна сейчас?'],
    ['What has been difficult to find in existing materials or communities?','Чего вам не хватает в доступных материалах или сообществах?'],
    ['How does that limit your learning or useful connections?','Как это ограничивает обучение или полезные знакомства?'],
    ['What material, discussion or confirmed event would be useful next?','Какой материал, обсуждение или подтверждённое событие будет полезно дальше?']],
   referral:[
    ['Whom do you want to invite, and why is the information relevant to them?','Кого вы хотите пригласить и почему им это может быть актуально?'],
    ['Which term of the referral program is unclear?','Какое условие программы приглашений непонятно?'],
    ['What could go wrong if that term is misunderstood?','Что может пойти не так, если условие понять неверно?'],
    ['Which written rule do you need before sharing the link?','Какое письменное правило нужно проверить до отправки ссылки?']],
   retention:[
    ['Did the first withdrawal arrive in the expected amount and channel?','Первый вывод поступил в ожидаемой сумме и по согласованному каналу?'],
    ['Was anything slow, unclear or inconvenient?','Что было долго, непонятно или неудобно?'],
    ['How does that affect trust or your next action?','Как это влияет на доверие или следующий шаг?'],
    ['What must we resolve or show for the experience to be complete?','Что нужно решить или показать, чтобы закрыть этот опыт?']]
  }[kind]||[
   ['What have you already reviewed?','Что вы уже посмотрели?'],['What remains unclear?','Что осталось непонятно?'],['How does it affect the decision?','Как это влияет на решение?'],['What would help next?','Что поможет дальше?']
  ]);
  const result=[row('open','hook','Open and ask permission','Начать и спросить разрешение',openText[0],openText[1])];
  for(const [id,index,enTitle,ruTitle] of [['situation',0,'Situation','Ситуация'],['problem',1,'Problem','Проблема'],['implication',2,'Implication','Последствие'],['need-payoff',3,'Need-payoff','Ценность решения']])result.push(row(id,id==='need-payoff'?'needPayoff':id,enTitle,ruTitle,questions[index][0],questions[index][1]));
  result.push(kind==='ftd'?row('recap','solution','Confirm the diagnosis','Подтвердить вывод','You need [need] before deciding. Correct?','До решения вам нужно [ценность]. Верно?'):row('recap','solution','Confirm the diagnosis','Подтвердить вывод','Let me confirm: [situation], blocked by [problem], which creates [implication]. You need [need]. Correct?','Правильно понял: сейчас [ситуация], мешает [проблема], из-за этого [последствие]. Для решения нужно [ценность]. Верно?'));
  if(kind==='ftd')result.push(
    row('availability','solution','Confirm project availability first','Сначала подтвердить доступность проекта','Confirm Charge availability in the client’s jurisdiction. If unavailable, stop.','Подтвердите доступность Charge в юрисдикции клиента. Если проект недоступен, остановитесь.'),
    row('economics','solution','Explain the operating model','Объяснить операционную модель','EcoGrid Charge is built around company-owned charging infrastructure. Drivers pay for completed sessions; EcoGrid accounts for operating costs before the project result is reported in the client account.','EcoGrid Charge построен вокруг собственной зарядной инфраструктуры компании. Водители оплачивают завершённые сессии; EcoGrid учитывает операционные расходы, после чего результат проекта отражается в кабинете клиента.',business.evidence(language)),
    row('evidence','proof','Continue the same operating-site walkthrough','Продолжить тот же разбор площадки','After secure registration, trace the Aberdeen session through operations, costs and account reporting—in the client account or by phone. Do not restart. Aberdeen and Clermont remain operating-site references; public catalog records do not define proposal economics.','После защищённой регистрации проведите сессию Aberdeen через эксплуатацию, расходы и отчётность — в кабинете или по телефону. Не начинайте заново. Aberdeen и Clermont — примеры действующих площадок; публичные записи каталога не определяют экономику предложения.'),
    row('risk','proof','Keep the decision realistic','Сохранить реалистичность решения','Do not promise results. Answer the stated question; the client decides after the presentation.','Не обещайте результат. Ответьте на вопрос; клиент принимает решение после презентации.'),
    row('next','next','Agree exactly one next step','Согласовать ровно один шаг','If the client continues, issue the secure registration link. Then record an account walkthrough or phone explanation and return to the client’s decision.','Если клиент продолжает, выпустите защищённую ссылку регистрации. Затем зафиксируйте разбор кабинета или объяснение по телефону и вернитесь к решению клиента.'),
   row('objections','optional','Only for the stated objection','Только по названному возражению','Answer only the objection stated by the client; then return to the agreed evidence or next step.','Ответьте только на названное клиентом возражение и вернитесь к согласованному подтверждению или шагу.'),
   row('ai-questions','optional','Only if the client asks about Charge AI','Только если клиент спрашивает о Charge AI','A separately confirmed active 30-day Charge AI period adds exactly +1 percentage point to the selected Charge rate. It does not renew automatically or guarantee payment.','Отдельно подтверждённый активный 30-дневный период Charge AI добавляет ровно +1 процентный пункт к ставке Charge. Автопродления и гарантии выплаты нет.'));
   else if(activeComputeSupport)result.push(
    row('cycle','solution','Review the current Compute cycle','Разобрать текущий цикл Compute','Open Projects → Compute Pulse and trace the recorded customer payment, workload step, confirmed cost and checkpoint for this cycle. Review only recorded facts.','Откройте «Проекты» → Compute Pulse и разберите записанные для этого цикла оплату заказчика, этап нагрузки, подтверждённый расход и контрольную точку. Используйте только зафиксированные факты.'),
    row('records','proof','Check the supporting record','Проверить подтверждающую запись','Compare the event, cost or cycle result with the project-specific activity, report and documents. If a record is missing or disputed, route that item to support; do not replace it with an estimate.','Сверьте событие, расход или результат цикла с операциями, отчётом и документами именно этого проекта. Если запись отсутствует или оспаривается, передайте этот пункт в поддержку; не заменяйте его расчётом.'),
    row('boundary','proof','Keep support separate from a new offer','Не смешивать сопровождение с новым предложением','The current participation remains on its existing terms. Discuss a new participation proposal only after a separate explicit client request recorded after activation.','Текущее участие продолжается на действующих условиях. Новое предложение об участии обсуждайте только после отдельного явного запроса клиента, зафиксированного после активации.'),
    row('next','next','Agree one current-cycle action','Согласовать одно действие по текущему циклу','Agree one action only: verify one recorded event, confirmed cost, checkpoint or written cycle result. Record the owner and date.','Согласуйте только одно действие: проверить одно записанное событие, подтверждённый расход, контрольную точку или письменный результат цикла. Зафиксируйте ответственного и срок.'));
   else if(kind==='compute'||kind==='expansion'&&project==='compute')result.push(
    row('model','solution','Trace one real-world AI workload','Разобрать одну реальную AI-задачу','For that case: the customer pays for completed work → compute load → project costs → variable remainder. The map explains the mechanism, not a current client, order, utilization, revenue or income.','На выбранном сценарии: заказчик платит за выполненную задачу → вычислительная нагрузка → расходы проекта → переменный остаток. Карта объясняет механизм, но не подтверждает текущего клиента, заказ, загрузку, выручку или доход.'),
    row('terms','proof','What the proposal must prove','Что должно подтвердить предложение','The proposal confirms site, energy, paid demand, full costs, rights, reporting, risks and exit. It promises neither utilization nor revenue.','Предложение подтверждает площадку, энергию, оплачиваемый спрос, все расходы, права, отчётность, риски и выход. Оно не обещает загрузку или выручку.'),
   row('risk','proof','Objection and risk boundary','Возражение и граница риска','Demand and utilization may fall; power, cooling and downtime costs may rise; exit follows the agreement. What evidence do you need?','Спрос и загрузка могут снизиться; расходы на энергию, охлаждение и простои — вырасти; выход определяет договор. Какое подтверждение вам нужно?'),
    row('next','next','Agree one next step','Согласовать один шаг','Agree one action: verify the missing evidence or prepare the written participation proposal. Record the owner and date.','Согласуйте одно действие: проверить недостающее подтверждение или подготовить письменное предложение об участии. Зафиксируйте ответственного и срок.'));
  else if(kind==='solar'||kind==='expansion'&&project==='solar'){
   const property=journey.purpose==='equipment'||(!journey.purpose&&Boolean(context.solar));
   const businessPurpose=journey.purpose==='business',risk=property?row('risk','proof','Objection and risk boundary','Возражение и граница риска','The final price, permits, equipment availability, delivery, installation scope and warranty apply only after specialist review and a written quote. Which confirmation do you need before proceeding?','Финальная цена, разрешения, наличие оборудования, поставка, объём монтажа и гарантия определяются после проверки специалистом и письменной сметы. Какое подтверждение нужно вам до продолжения?'):businessPurpose?row('risk','proof','Objection and risk boundary','Возражение и граница риска','The partnership needs a defined subject, responsibilities, economics and agreement; none should be assumed from another EcoGrid project. Which confirmation do you need before proceeding?','Для партнёрства нужно отдельно определить предмет, ответственность сторон, экономику и договор; их нельзя переносить из другого проекта EcoGrid. Какое подтверждение нужно вам до продолжения?'):row('risk','proof','Objection and risk boundary','Возражение и граница риска','Generation or sales may fall; costs may rise; rights and exit follow the Solar agreement. What evidence do you need?','Выработка или продажи могут снизиться; расходы — вырасти; права и выход определяет договор Solar. Какое подтверждение вам нужно?');
   result.push(
    row('model','solution',property?'How the property system is selected':'How Solar creates value',property?'Как подбирается система для объекта':'Как Solar создаёт ценность',property?'A specialist verifies the address, tariff, consumption, installation area and storage need before selecting equipment and installation scope.':'The project result begins with documented energy sales or use after equipment, interconnection, storage, service, tax, reserve and downtime costs.',property?'Специалист проверяет адрес, тариф, потребление, место установки и потребность в накопителе до подбора оборудования и объёма монтажа.':'Результат проекта начинается с подтверждённой продажи или использования энергии после расходов на оборудование, подключение, накопители, сервис, налоги, резерв и простои.'),
    row('terms','proof',property?'What the quote must prove':'What the proposal must prove',property?'Что должна подтвердить смета':'Что должно подтвердить предложение',property?'The written quote confirms the verified inputs, available configuration, installation, permits, interconnection, assumptions, full price, timing, warranties and exclusions.':'The separate Solar proposal confirms the site, buyer or use, generation assumptions, costs, rights, reporting, risks and exit. Charge terms do not apply.',property?'Письменная смета фиксирует проверенные данные, доступную конфигурацию, монтаж, разрешения, подключение, допущения, полную цену, срок, гарантии и исключения.':'Отдельное предложение Solar подтверждает объект, покупателя или использование энергии, допущения по выработке, расходы, права, отчётность, риски и выход. Условия Charge не применяются.'),
    risk,
    row('next','next','Agree one next step','Согласовать один шаг',property?'Choose one: a technical site review or resolution of one missing input. Record the owner and date.':'Choose one: verify a specific point or prepare the separate Solar proposal. Record the owner and date.',property?'Выберите одно: техническая проверка объекта или уточнение одного недостающего параметра. Зафиксируйте ответственного и срок.':'Выберите одно: проверить конкретный вопрос или подготовить отдельное предложение Solar. Зафиксируйте ответственного и срок.'));
  }else if(kind==='club')result.push(
   row('model','solution','Club format','Формат Club','EcoGrid Club is an optional non-financial community about responsible energy, technology and practical experience.','EcoGrid Club — добровольное нефинансовое сообщество об ответственной энергетике, технологиях и практическом опыте.'),
   row('boundary','proof','Separate from projects','Отдельно от проектов','Membership does not change Charge, Solar or Compute rates, rights, risks or access and is not an investment, wallet or token program.','Членство не меняет ставки, права, риски или доступ к Charge, Solar и Compute и не является инвестицией, кошельком или токен-программой.'),
   row('next','next','Choose one next step','Выбрать один шаг','Offer only one confirmed channel, published material or dated event matching the stated interest.','Предложите один подтверждённый канал, опубликованный материал или событие с датой по названному интересу.'));
  else if(kind==='referral')result.push(
   row('terms','solution','Current referral terms','Действующие условия','Rewards apply only to direct referrals whose first checked funding is at least $250. Check current program status and budget before quoting any reward.','Бонус относится только к личному приглашению, если первое подтверждённое пополнение приглашённого составляет не менее $250. До озвучивания бонуса проверьте состояние программы и бюджет.'),
   row('boundary','proof','Keep Club separate','Не смешивать с Club','Club membership is separate, non-financial and does not change project or referral terms.','Членство в Club ведётся отдельно, остаётся нефинансовым и не меняет условия проектов или приглашений.'),
   row('next','next','Agree one next step','Согласовать один шаг','Review the personal link and written terms only if the client chooses to continue; otherwise close the topic.','Разберите личную ссылку и письменные условия только если клиент решил продолжить; иначе закройте тему.'));
  else if(kind==='retention'){
   const path=context.crm?.callData?.retentionPath||'none',copy={support:['Resolve the reported issue first; do not discuss additional funding or referrals until it is closed.','Сначала решите названный вопрос; до его закрытия не обсуждайте дополнительное пополнение или приглашения.'],plan:['Compare only the current plan and the additional amount the client explicitly asked to review. Do not suggest borrowing or using essential savings.','Сравните только текущий план и дополнительную сумму, которую клиент сам попросил рассмотреть. Не предлагайте заёмные или необходимые на жизнь деньги.'],referral:['Review only the referral program the client explicitly chose. Keep Club membership and project terms separate.','Разберите только программу приглашений, которую клиент выбрал сам. Не смешивайте её с Club и условиями проектов.'],none:['Keep the current plan unchanged and close the call after confirming that no issue remains.','Оставьте текущий план без изменений и завершите звонок после подтверждения, что вопросов не осталось.']}[path];
   result.push(row('branch','solution','Use the chosen branch only','Только выбранная ветка',copy[0],copy[1]),row('proof','proof','Keep the boundary visible','Сохранить границу','One completed withdrawal does not guarantee future payment or protect capital.','Один завершённый вывод не гарантирует будущую выплату или сохранность капитала.'),row('next','next','Agree one next step','Согласовать один шаг','Record one action, one owner and one date. If an issue remains, the next step is support only.','Запишите одно действие, одного ответственного и одну дату. Если вопрос не решён, следующий шаг — только сопровождение.'));
  }
  else return rows.map(item=>withPhase(item,item.phase||({hook:'hook',story:'solution',proof:'proof',next:'next',depth:'optional'}[item.layer]||'optional')));
  return result;
 }
 // Scripts are ordered as hook → Situation → Problem → Implication → Need-payoff → solution → proof → agreed next step; optional depth follows.
 function scripts(kind,language='en',context={}){
  if(kind===legacyProjectKey)kind='academy';
  let rows=baseScripts(kind,language,context),journey=context.journey||context.state?.journey||{},requested=projectRequest(context);
  rows=spinize(kind,language,context,rows);
  const archived=journeyModel.archivedComputeCapacity(context),hasCharge=requested==='charge'||Boolean(context.state?.plan||context.state?.planDraft),hasProjectContext=projectIds.has(requested)||projectIds.has(journey.currentProject)||projectIds.has(journey.topic),showEcoCoin=!archived&&(kind==='solar'||kind==='compute'||kind==='ftd'&&hasCharge||kind==='academy'&&hasProjectContext||kind==='expansion'&&hasProjectContext),addEcoCoin=()=>{if(showEcoCoin&&!rows.some(row=>row.id==='ecocoin-wallet'))rows.push(ecoCoinWalletRow(language));};
  if(archived||['academy','club','referral','expansion'].includes(kind)||kind==='ftd'&&!hasCharge){addEcoCoin();return rows;}
  const ru=language==='ru',topic=kind==='solar'?'solar':kind==='compute'?'compute':requested||((kind==='retention'||kind==='ftd')&&(context.state?.plan||context.state?.planDraft)?'charge':'energy');
  const environment={
   charge:ru?'Наша цель — развивать зарядную инфраструктуру для транспорта без выхлопа во время движения. Это не означает отсутствия воздействия на всём жизненном цикле: нужно раскрывать энергомикс площадки, загрузку, эффективность, обслуживание и срок службы оборудования. Экологические результаты конкретного проекта нужно подтверждать документами.':'Our goal is charging infrastructure for transport with no tailpipe emissions while driving. That does not make the full life cycle impact-free: the site needs transparent data on its electricity mix, utilization, efficiency, maintenance and equipment life. Project-specific environmental results need supporting evidence.',
   solar:ru?'Наша цель — производить солнечную энергию без сжигания топлива на площадке и одновременно учитывать материалы, выработку, срок службы, ремонт и дальнейшее обращение с панелями и батареями. Экологические результаты конкретного проекта нужно подтверждать документами.':'Our goal is solar generation without burning fuel on site, while also accounting for materials, output, service life, repair and end-of-life handling for panels and batteries. Project-specific environmental results need supporting evidence.',
   compute:ru?'Compute использует энергию, охлаждение, сеть и оборудование, поэтому не является «виртуальным» или безвредным сам по себе. Наша задача — проектировать эффективную инфраструктуру, использовать Solar и накопители там, где это технически и экономически оправдано, измерять энергопотребление и ответственно управлять сроком службы оборудования и электронными отходами. Результаты подтверждаются данными конкретного объекта.':'Compute uses power, cooling, network and hardware, so it is neither purely virtual nor impact-free. Our task is to design efficient infrastructure, use Solar and storage where technically and economically sound, measure energy use and manage equipment life and electronic waste responsibly. Results require site-specific evidence.',
   energy:ru?'Наша цель — рассматривать экономическую ценность и ответственность перед планетой вместе: источник энергии, эффективность, срок службы, ремонт и дальнейшее обращение с оборудованием. Экологические результаты конкретного проекта нужно подтверждать документами.':'Our goal is to consider economic value and responsibility to the planet together: energy source, efficiency, equipment life, repair and end-of-life handling. Project-specific environmental results need supporting evidence.'
  }[topic];
  if(environment)rows.push({id:'environment',title:ru?'Экономика и воздействие':'Economics and impact',text:environment,note:'',phase:'optional',layer:'depth'});
  addEcoCoin();
  return rows;
 }
 function shareText(language='en'){return language==='ru'?'Я изучаю кабинет EcoGrid: там можно посмотреть модель распределения нагрузки и расчёт плана. Это не подтверждение реального дохода и не моя рекомендация вкладывать деньги. Если интересно, вот ссылка на информацию: [моя личная ссылка приглашения]. Условия и документы лучше проверить самостоятельно.':'I’m exploring the EcoGrid workspace and its charging-load and plan models. This does not verify real returns and is not my recommendation to invest. If you want to review the information: [my personal invitation link]. Please assess the terms and documents independently.';}
 return {zones,clock,callback,notes,projectRequest,initialMode,providerConfirmedWithdrawal,referralReadiness,clubReadiness,expansionReadiness,scripts,shareText};
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
 op.reason=op.reason.trim();if(/[А-Яа-яЁё]/.test(op.reason))fail('Client-visible finance notes must be written in English.');if(a.adjustments.some(x=>x.operationId===op.id))fail('This operation was already saved.');
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
function hasChargeRequest(state={}){
 const j=state.journey||{},fast=value=>value?.topic==='charge'&&['fast','consult'].includes(value.route);
 return j.requestedProject==='charge'||fast(j)||Array.isArray(j.history)&&j.history.some(fast)||state.tickets?.some(ticket=>ticket.journeyTopic==='charge');
}
function hasChargeRecord(state={}){
 return Boolean(state.plan||state.planDraft||state.firstPlanActivatedAt||state.planHistory?.length||state.sessions?.length||state.requests?.some(request=>['topup','withdraw'].includes(request.type))||state.adjustments?.some(entry=>['plan','accrual','weekly','obligation_funding','topup_approve','topup_reject','withdraw_approve','withdraw_reject'].includes(entry.kind))||Number(state.profit?.settled)>0||Number(state.profit?.companyPayable)>0);
}
function chargeFinanceAllowed(state={}){return hasChargeRequest(state)||hasChargeRecord(state);}
function requireChargeFinance(state={}){if(!chargeFinanceAllowed(state))fail('Charge financial operations require an explicit EcoGrid Charge request or an existing Charge record.',403);}
function requireChargeFundingReady(state={},request={}){
 const draft=state.planDraft;
 if(state.registrationStatus!=='reviewed')fail('The account registration must be reviewed before a Charge funding request.',409);
 if(state.academy?.presentationComplete!==true||state.academy?.presentationProject!=='charge')fail('Complete the current Charge presentation before a funding request.',409);
 if(!draft||draft.savedBy!=='manager')fail('A manager must save the Charge plan before a funding request.',409);
 if(request.amount!==draft.capital||request.payment?.planTierId!==draft.tierId)fail('The funding request must match the manager-saved Charge plan.',409);
}
function plan(value,stationIds){if(!value)return null;return {...finance.checkedPlan(value,stationIds),...(funding.offer(value.starterId)?{starterId:value.starterId}:{})};}
function draft(value,previous,stationIds,source='client',activePlan=null){
 if(!value)fail('Choose a valid plan amount and station group.');
 const next=plan(value,stationIds);
 const key=p=>p&&JSON.stringify([p.tierId,p.capital,p.stationIds,p.starterId]);
 if(source==='client'&&previous&&key(next)===key(previous))return structuredClone(previous);
 finance.assertSelectable(value,stationIds,activePlan);
 return {...next,savedBy:source,savedAt:new Date().toISOString()};
}
function mergeClient(previous,submitted,stationIds,now=new Date().toISOString(),allowLegacyCharging=false){
 if(!submitted||typeof submitted!=='object')fail('Account data is required.');const a=structuredClone(previous);
 // Server owns balances, rates, approvals, audit history, manager and identity.
 const oldPlan=a.plan?.status==='active'?a.plan:null;
 const nextPlan=submitted.plan?.status==='active'?submitted.plan:null;
 const changedPlan=JSON.stringify(nextPlan&&[nextPlan.tierId,nextPlan.capital,nextPlan.stationIds])!==JSON.stringify(oldPlan&&[oldPlan.tierId,oldPlan.capital,oldPlan.stationIds]);
 const changedDraft=JSON.stringify(submitted.planDraft||null)!==JSON.stringify(previous.planDraft||null),incoming=Array.isArray(submitted.requests)?submitted.requests:[],additions=incoming.filter(r=>!a.requests.some(old=>old.id===r.id));
 if(!allowLegacyCharging&&(changedPlan||changedDraft||additions.some(request=>['topup','withdraw'].includes(request.type))))requireChargeFinance(previous);
 if(changedPlan)fail('Only your manager can activate or change a Charge plan after the required review and confirmed funding.',403);
 if(!allowLegacyCharging&&changedDraft)fail('Only a manager can save the Charge plan used for funding.',403);
 if(!allowLegacyCharging)for(const request of additions)if(request.type==='topup')requireChargeFundingReady(previous,request);
 if(!changedPlan&&oldPlan&&JSON.stringify(nextPlan?.ai||null)!==JSON.stringify(oldPlan.ai||null))fail('Charge AI activation is controlled by the server.',403);
 if(submitted.balance!==previous.balance)fail('Only your manager can change the available balance.',403);
 // Activation consumes the draft; do not restore a stale draft from the submitted snapshot.
 if(!changedPlan){if(submitted.planDraft)a.planDraft=draft(submitted.planDraft,a.planDraft,stationIds,'client',a.plan);else delete a.planDraft;}
 if(submitted.starterSelection&&funding.offer(submitted.starterSelection.id))a.starterSelection={id:submitted.starterSelection.id,selectedAt:now};
 if(additions.length>1)fail('Send one payment request at a time.');
 for(const r of additions){if(!['topup','withdraw'].includes(r.type)||!cents(r.amount)||r.amount<model.paymentMinimum||r.amount>model.paymentMaximum||r.status!=='Pending'||!/^[-\w]{3,100}$/.test(r.id))fail('Invalid payment request.');
  if(a.requests.some(old=>old.type===r.type&&old.status==='Pending'))fail('A request is already awaiting review.');
  if(r.type==='withdraw'){const w=withdrawals.state(a,Date.parse(now));if(!w.canRequest||r.amount>w.available)fail('The withdrawal window or settled profit does not allow this request.');}
  let payment;if(r.payment){const p=r.payment;payment={mode:'preview',method:p.method==='crypto'?'crypto':'card',currency:'USD'};if(tiers.some(tier=>tier.id===p.planTierId))payment.planTierId=p.planTierId;if(p.method==='crypto'){const nets={'usdt-trc20':['USDT','TRC20'],'usdt-erc20':['USDT','ERC20'],'usdc-base':['USDC','Base'],btc:['BTC','Bitcoin']};const net=nets[p.networkId];if(!net)fail('Invalid payment network.');Object.assign(payment,{networkId:p.networkId,asset:net[0],network:net[1]});}const offer=funding.offer(p.starterId);if(offer){if(offer.capital!==r.amount)fail('Starting amount does not match the plan.');Object.assign(payment,{starterId:offer.id,companyFeeUSD:0,totalUSD:offer.total,creditedUSD:offer.capital});}}
  if(r.type==='topup')payment={...payment,mode:'preview',reportedByClient:true};
  a.requests.push({id:r.id,type:r.type,amount:r.amount,status:'Pending',date:now,...(payment?{payment}:{})});
 }
 // Existing tickets retain staff replies; clients can only append their own messages.
 for(const t of Array.isArray(submitted.tickets)?submitted.tickets.slice(0,100):[]){let old=a.tickets.find(x=>x.id===t.id);if(!old){if(!/^[-\w]{3,100}$/.test(t.id)||!clean(t.message,1500))continue;old={id:t.id,subject:clean(t.subject,100),message:clean(t.message,1500),reply:'',date:now,status:'Open',messages:[{from:'client',text:clean(t.message,1500),date:now}]};if(t.context){try{old.context={...workspace.context(t.context,stationIds),capturedAt:now};}catch(e){fail(e.message);}}a.tickets.push(old);}else{const previousCount=old.messages?.length||0,newMessages=(Array.isArray(t.messages)?t.messages:[]).slice(previousCount);for(const msg of newMessages.slice(0,3)){if(msg.from!=='client'||!clean(msg.text,1500))continue;old.messages??=[];old.messages.push({from:'client',text:clean(msg.text,1500),date:now});old.message=clean(msg.text,1500);old.status='Open';}if(t.readReply===old.reply)old.readReply=old.reply;}}
 // Journey is changed only by the dedicated, normalized journey endpoint. A whole-account
 // save cannot forge a Charge request and thereby unlock Charge financial operations.
 for(const key of ['preferences','onboarding','savedStations'])if(submitted[key]!==undefined&&JSON.stringify(submitted[key]).length<10000)a[key]=structuredClone(submitted[key]);
 a.preferences={...(a.preferences||{}),language:'en'};
 if(submitted.exploration!==undefined)a.exploration=workspace.exploration(submitted.exploration,stationIds);
 if(submitted.ecosystem&&JSON.stringify(submitted.ecosystem).length<12000){const e=submitted.ecosystem;
  let timezone=clean(e.timezone,80)||'UTC';try{new Intl.DateTimeFormat('en-US',{timeZone:timezone});}catch{timezone='UTC';}
  a.ecosystem={read:Array.isArray(e.read)?e.read.filter(x=>typeof x==='string'&&x.length<=2000).slice(-100):[],scenarios:Array.isArray(e.scenarios)?e.scenarios.slice(0,6).map(p=>({...plan(p,stationIds),id:clean(p.id,80),label:clean(p.label,80)})):[],timezone};
 }
 return a;
}
module.exports={tiers,clean,cents,fail,initial,mergeClient,draft,hasChargeRequest,hasChargeRecord,chargeFinanceAllowed,requireChargeFinance,requireChargeFundingReady};

}},cache={};function load(id){if(id==="node:crypto")return {randomUUID:()=>crypto.randomUUID()};if(cache[id])return cache[id].exports;if(!modules[id])throw Error("Missing domain module "+id);const module={exports:{}};cache[id]=module;modules[id](module,module.exports,name=>{if(name.startsWith("node:"))return load(name);const p=id.split("/");p.pop();for(const s of name.split("/")){if(s==="..")p.pop();else if(s!==".")p.push(s);}return load(p.join("/"));});return module.exports;}window.EcoSandboxDomain={publicPlan:load("dist/public-plan.js"),compute:load("dist/compute-model.js"),solar:load("dist/solar-catalog.js"),equipment:load("dist/central/equipment-model.js"),profile:load("dist/central/profile-model.js"),journey:load("dist/journey-model.js"),calls:load("dist/central/call-scripts.js"),finance:load("dist/account-finance.js"),operations:load("server/finance.cjs"),policy:load("server/account-policy.cjs"),crm:load("dist/crm-store.js"),planDocument:load("dist/central/plan-document.js"),funnel:load("dist/central/funnel-model.js"),journal:load("dist/central/energy-journal-model.js")};})();
