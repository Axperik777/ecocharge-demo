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
      "Project insights for the community",
      "Понятные результаты работы проектов"
    ],
    "body": [
      "EcoGrid AI helps turn project operating data into concise updates: where energy was used, how demand changed and what needs the team’s attention. EcoGrid Club brings these insights and explanations together for members.",
      "EcoGrid AI помогает превращать рабочие данные проектов в понятные обновления: куда направлялась энергия, как менялся спрос и что требует внимания команды. EcoGrid Club объединяет эти материалы и пояснения для участников."
    ]
  }
});
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
 return Object.freeze({ai,aiContent,config,directShare,pct,labels,copy,evidence,cadence,flow,dispatch,session});
});
