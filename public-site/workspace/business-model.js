(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.EcoBusiness=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 // Narrative/teaching inputs only. Never import this module into account credit math.
 // User confirmed 43% of modeled production to grid on Stage 57; this is not ownership.
 const config=Object.freeze({version:'solar-storage-v1',gridShare:.43,dispatchLimitKw:900,solarPeakKw:1800,chargingPrice:.45,utilityPrice:.18,solarStorageCost:.12,sessionKwh:30,sessionsPerDay:20,exampleDays:30,monthlyOperatingCost:3000,exampleReceipts:1000,lowerReceipts:600,siteCosts:150,serviceCosts:120,reserves:80,inverseShare:.004,inverseCostRatio:.35,inverseKwhPrice:.25});
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
      "Project explanations and product guidance",
      "Разбор проектов и помощь с продуктами"
    ],
    "body": [
      "Club members discuss project data and get help using EcoGrid products. The team uses AI to prepare explanations and updates. Project AI mode is a separate optional service paid in EcoCoin.",
      "В Клубе участники обсуждают данные проектов и получают помощь с продуктами EcoGrid. Команда использует AI для подготовки объяснений и обновлений. Проектный AI-режим — отдельная дополнительная услуга с оплатой в EcoCoin."
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
  const ru=lang==='ru',c=aiProgramTopics[topic]||aiProgramTopics.energy,p=aiProgram;
  return {
   title:c[ru?1:0],body:c[ru?3:2],
   price:ru?`${p.cost} EcoCoin · ${p.days} дней`:`${p.cost} EcoCoin · ${p.days} days`,
   gift:ru?`${p.gift} EcoCoin в подарок — хватит на первые ${p.days} дней AI-режима в выбранном проекте. После оплаты останется ${p.gift-p.cost} EcoCoin.`:`Your ${p.gift} EcoCoin welcome gift covers the first ${p.days} days of AI mode in your selected project, leaving ${p.gift-p.cost} EcoCoin.`,
   rules:ru?'Получение подарка не требует инвестирования. Использование проектного AI-режима предполагает участие в соответствующем проекте. Срок начинается с активации; продление — по подтверждению.':'No investment is required to receive the gift. Project AI mode requires participation in the relevant project. The period starts at activation; renewal requires confirmation.',
   supplement:ru?'AI-режим подключается отдельно от базового плана. Условия дополнительной надбавки разбираются на презентации проекта.':'AI mode is an optional addition to the base plan. The terms of any additional return are reviewed during the project presentation.',
   availability:ru?'AI-режим готовится к запуску. Подключение станет доступно после утверждения условий.':'AI mode is in development. Activation will become available once its terms are finalized.'
  };
 }
 function ai(topic='energy',lang='en'){const c=aiContent[topic]||aiContent.energy,i=lang==='ru'?1:0;return {title:c.title[i],body:c.body[i]};}
 const directShare=1-config.gridShare;
 const pct=n=>Math.round(n*100)+'%';
 function labels(lang='en'){return lang==='ru'?{solar:'Солнечные объекты',storage:'Накопители',ev:'Зарядки EV',commercial:'Коммерческая энергетика',grid:'Общая сеть'}:{solar:'Solar sites',storage:'Battery storage',ev:'EV chargers',commercial:'Commercial energy',grid:'The grid'};}
 function copy(lang='en'){return lang==='ru'?`Модель EcoGrid объединяет солнечную генерацию в США и Канаде, накопители и три направления: зарядки электромобилей, продажу энергии торговым центрам и бизнесу по долгосрочным договорам дешевле тарифа местной энергокомпании и продажу около ${pct(config.gridShare)} выработки в общую сеть. Оставшиеся ${pct(directShare)} направляются на зарядки и коммерческих клиентов. Накопители переносят дневную выработку на вечер и ночь.`:`The EcoGrid model combines solar generation in the U.S. and Canada and battery storage with three revenue streams: EV charging, energy supplied to shopping centers and businesses under long-term contracts below their local utility tariff, and sales of about ${pct(config.gridShare)} of production to the grid. The remaining ${pct(directShare)} serves chargers and commercial clients. Battery storage shifts daytime generation into the evening and night.`;}
 function evidence(lang='en'){return lang==='ru'?'Документы по солнечным объектам, накопителям, правам на активы, коммерческим договорам и продаже в общую сеть ещё не загружены в проект. Справочник станций не подтверждает владение или партнёрство.':'Documents for solar sites, battery storage, asset rights, commercial contracts and grid sales have not yet been added to this project. The station directory does not establish ownership or a partnership.';}
 function cadence(lang='en'){return lang==='ru'?'Ставка за календарный месяц · начисления раз в неделю · модель, не гарантия':'Rate per calendar month · credited weekly · model, not a guarantee';}
 function flow(lang='en'){const ru=lang==='ru',l=labels(lang);return `<section class="business-flow" data-business-model="${config.version}" translate="no" aria-label="${ru?'Как движется энергия':'How the energy flows'}"><div class="business-flow-heading"><div><span>${ru?'ЭНЕРГЕТИЧЕСКАЯ МОДЕЛЬ':'ENERGY MODEL'}</span><h2>${ru?'Как движется энергия':'How the energy flows'}</h2></div><small>${ru?'Модель, не телеметрия':'Model, not telemetry'}</small></div><p>${copy(lang)}</p><h3 translate="no">EcoGrid AI</h3><p>${ai('energy',lang).body}</p><div class="business-flow-map"><div class="business-source"><strong>${l.solar}</strong><span>${ru?'Дневная генерация':'Daytime generation'}</span></div><span class="business-flow-arrow" aria-hidden="true">→</span><div class="business-source"><strong>${l.storage}</strong><span>${ru?'Энергия для вечера и ночи':'Energy for evening and night'}</span></div><span class="business-flow-arrow" aria-hidden="true">→</span><div class="business-outlets"><div><span data-business-direct>${pct(directShare)}</span><strong>${l.ev} + ${l.commercial}</strong></div><div><span data-business-grid>${pct(config.gridShare)}</span><strong>${l.grid}</strong></div></div></div><small>${ru?'Доли собственной выработки в модели, не доли рынка и не ставка плана.':'Shares of the model’s own production, not market share or a plan rate.'}</small><h3>${ru?'Кто покупает энергию':'Who buys our energy'}</h3><div class="business-buyers"><article><h4>${ru?'Водители':'Drivers'}</h4><p>${ru?'Оплата зарядки электромобилей.':'Payments for EV charging.'}</p></article><article><h4>${ru?'Коммерческие потребители':'Commercial customers'}</h4><p>${ru?'Долгосрочные договоры с ТЦ, бизнес-парками, отелями и автопарками; цена ниже местного тарифа — условие модели.':'Long-term contracts with shopping centers, business parks, hotels and fleets; pricing below the local tariff is a model assumption.'}</p></article><article><h4>${l.grid}</h4><p>${ru?'Продажа части выработки в общую сеть.':'Sales of a portion of production to the grid.'}</p></article></div></section>`;}
 function dispatch(hour=18,peak=false,budget=config.dispatchLimitKw){hour=Number.isFinite(hour)?Math.max(0,Math.min(24,hour)):18;budget=Math.max(0,Number.isFinite(budget)?budget:config.dispatchLimitKw);const day=Math.max(0,Math.sin((hour-6)/12*Math.PI)),solar=day*config.solarPeakKw,total=budget*(.48+.32*day+(peak?.2:0)),evRatio=Math.min(.8,.42+(peak?.18:0)+.12*Math.cos((hour-19)/12*Math.PI)),grid=total*config.gridShare,ev=(total-grid)*evRatio,commercial=total-grid-ev;const rows=[['ev',ev],['commercial',commercial],['grid',grid]].map(([id,allocated])=>({id,allocated,weight:total?allocated/total:0}));return {hour,peak,solar,storage:solar-total,allocated:total,sites:rows};}
 function session(kwh){const round=n=>Math.round((n+Number.EPSILON)*100)/100,receipts=round(kwh*config.chargingPrice),electricity=round(kwh*config.solarStorageCost);return {energyKwh:kwh,chargingRate:config.chargingPrice,electricityRate:config.solarStorageCost,receipts,electricity,beforeOtherCosts:round(receipts-electricity)};}
 return Object.freeze({ai,aiContent,aiProgram,programCopy,config,directShare,pct,labels,copy,evidence,cadence,flow,dispatch,session});
});
