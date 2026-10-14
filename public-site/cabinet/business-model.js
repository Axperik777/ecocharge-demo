(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.EcoBusiness=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 // Narrative/teaching inputs only. Never import this module into account credit math.
 // Teaching inputs only. Channel routing is illustrative and changes with the scenario;
 // it is never a fixed company/client or revenue split.
 const config=Object.freeze({version:'energy-routing-v3-compute',dispatchLimitKw:900,solarPeakKw:1800,chargingPrice:.45,utilityPrice:.18,solarStorageCost:.12,sessionKwh:30,sessionsPerDay:20,exampleDays:30,monthlyOperatingCost:3000,exampleReceipts:1000,lowerReceipts:600,siteCosts:150,serviceCosts:120,reserves:80,inverseShare:.004,inverseCostRatio:.35,inverseKwhPrice:.25});
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
