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
