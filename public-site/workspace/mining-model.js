'use strict';
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoMining=api;})(typeof window==='object'?window:globalThis,()=>{
 const miners=Object.freeze([
  {
    "id": "s21",
    "manufacturer": "BITMAIN",
    "model": "EcoMiner ONE 10",
    "hashrate": 200,
    "powerW": 3500,
    "efficiency": 17.5,
    "source": "https://assets-product.bitmain.com.cn/shop-product-s3/firmware/c17a60d7-51c8-41a3-8365-b7e5d1506caa/2025/04/10/14/S21%20User%20Guide-V1.2.5.pdf",
    "coinId": "btc",
    "algorithm": "SHA-256",
    "unit": "TH/s",
    "image": "assets/ecominer-industrial.webp",
    "cooling": "air",
    "referenceModel": "ANTMINER S21"
  },
  {
    "id": "s21-pro",
    "manufacturer": "BITMAIN",
    "model": "EcoMiner ONE 11",
    "hashrate": 234,
    "powerW": 3510,
    "efficiency": 15,
    "source": "https://assets-product.bitmain.com.cn/shop-product-s3/firmware/793d284c-4b4c-4c00-bb6b-30f0a4902c96/2025/03/20/17/S21%20Pro%20User%20Guide-V1.1.9.pdf",
    "coinId": "btc",
    "algorithm": "SHA-256",
    "unit": "TH/s",
    "image": "assets/ecominer-one11.webp",
    "cooling": "air",
    "referenceModel": "ANTMINER S21 Pro"
  },
  {
    "id": "s21-xp",
    "manufacturer": "BITMAIN",
    "model": "EcoMiner ONE 12",
    "hashrate": 270,
    "powerW": 3645,
    "efficiency": 13.5,
    "source": "https://support.bitmain.com/hc/en-us/article_attachments/38059219790617",
    "coinId": "btc",
    "algorithm": "SHA-256",
    "unit": "TH/s",
    "image": "assets/ecominer-one12.webp",
    "cooling": "air",
    "referenceModel": "ANTMINER S21 XP"
  },
  {
    "id": "ks0-ultra",
    "manufacturer": "ICERIVER",
    "model": "EcoMiner K 21",
    "coinId": "kas",
    "algorithm": "kHeavyHash",
    "hashrate": 400,
    "unit": "GH/s",
    "powerW": 100,
    "efficiency": 0.25,
    "cooling": "air",
    "image": "assets/ecominer-compact.webp",
    "source": "https://www.iceriver.io/product/iceriver-kas-ks0-ultra-2/",
    "referenceModel": "ICERIVER KS0 Ultra"
  },
  {
    "id": "ks5l",
    "manufacturer": "ICERIVER",
    "model": "EcoMiner K 22",
    "coinId": "kas",
    "algorithm": "kHeavyHash",
    "hashrate": 12,
    "unit": "TH/s",
    "powerW": 3400,
    "efficiency": 283.3333333333333,
    "cooling": "air",
    "image": "assets/ecominer-industrial.webp",
    "source": "https://www.iceriver.io/product/iceriver-kas-ks5l/",
    "referenceModel": "ICERIVER KS5L"
  },
  {
    "id": "ks5m",
    "manufacturer": "ICERIVER",
    "model": "EcoMiner K 23",
    "coinId": "kas",
    "algorithm": "kHeavyHash",
    "hashrate": 15,
    "unit": "TH/s",
    "powerW": 3400,
    "efficiency": 226.66666666666666,
    "cooling": "air",
    "image": "assets/ecominer-industrial.webp",
    "source": "https://www.iceriver.io/product/iceriver-kas-ks5m/",
    "referenceModel": "ICERIVER KS5M"
  },
  {
    "id": "ks7-lite",
    "manufacturer": "ICERIVER",
    "model": "EcoMiner K 24",
    "coinId": "kas",
    "algorithm": "kHeavyHash",
    "hashrate": 4.2,
    "unit": "TH/s",
    "powerW": 500,
    "efficiency": 119.04761904761904,
    "cooling": "air",
    "image": "assets/ecominer-desktop.webp",
    "source": "https://www.iceriver.io/product/iceriver-kas-ks7-lite/",
    "referenceModel": "ICERIVER KS7 Lite"
  },
  {
    "id": "ks7",
    "manufacturer": "ICERIVER",
    "model": "EcoMiner K 25",
    "coinId": "kas",
    "algorithm": "kHeavyHash",
    "hashrate": 30,
    "unit": "TH/s",
    "powerW": 3500,
    "efficiency": 116.66666666666667,
    "cooling": "air",
    "image": "assets/ecominer-industrial.webp",
    "source": "https://www.iceriver.io/product/iceriver-kas-ks7/",
    "referenceModel": "ICERIVER KS7"
  },
  {
    "id": "al0",
    "manufacturer": "ICERIVER",
    "model": "EcoMiner A 31",
    "coinId": "alph",
    "algorithm": "Blake3",
    "hashrate": 400,
    "unit": "GH/s",
    "powerW": 100,
    "efficiency": 0.25,
    "cooling": "air",
    "image": "assets/ecominer-compact.webp",
    "source": "https://www.iceriver.io/product/iceriver-alph-al0/",
    "referenceModel": "ICERIVER AL0"
  },
  {
    "id": "al2-lite",
    "manufacturer": "ICERIVER",
    "model": "EcoMiner A 32",
    "coinId": "alph",
    "algorithm": "Blake3",
    "hashrate": 2,
    "unit": "TH/s",
    "powerW": 500,
    "efficiency": 250,
    "cooling": "air",
    "image": "assets/ecominer-desktop.webp",
    "source": "https://www.iceriver.io/product/iceriver-alph-al2-lite/",
    "referenceModel": "ICERIVER AL2 Lite"
  },
  {
    "id": "al3",
    "manufacturer": "ICERIVER",
    "model": "EcoMiner A 33",
    "coinId": "alph",
    "algorithm": "Blake3",
    "hashrate": 15,
    "unit": "TH/s",
    "powerW": 3500,
    "efficiency": 233.33333333333334,
    "cooling": "air",
    "image": "assets/ecominer-industrial.webp",
    "source": "https://www.iceriver.io/product/iceriver-alph-al3/",
    "referenceModel": "ICERIVER AL3"
  },
  {
    "id": "ae0",
    "manufacturer": "ICERIVER",
    "model": "EcoMiner Z 41",
    "coinId": "aleo",
    "algorithm": "zkSNARK",
    "hashrate": 60,
    "unit": "MH/s",
    "powerW": 100,
    "efficiency": 1.6666666666666667,
    "cooling": "air",
    "image": "assets/ecominer-compact.webp",
    "source": "https://www.iceriver.io/product/iceriver-aleo-ae0/",
    "referenceModel": "ICERIVER AE0"
  },
  {
    "id": "ae1-lite",
    "manufacturer": "ICERIVER",
    "model": "EcoMiner Z 42",
    "coinId": "aleo",
    "algorithm": "zkSNARK",
    "hashrate": 300,
    "unit": "MH/s",
    "powerW": 500,
    "efficiency": 1.6666666666666667,
    "cooling": "air",
    "image": "assets/ecominer-desktop.webp",
    "source": "https://www.iceriver.io/product/iceriver-aleo-ae1-lite/",
    "referenceModel": "ICERIVER AE1 Lite"
  },
  {
    "id": "ae3",
    "manufacturer": "ICERIVER",
    "model": "EcoMiner Z 43",
    "coinId": "aleo",
    "algorithm": "zkSNARK",
    "hashrate": 2,
    "unit": "GH/s",
    "powerW": 3400,
    "efficiency": 1700,
    "cooling": "air",
    "image": "assets/ecominer-industrial.webp",
    "source": "https://www.iceriver.io/product/iceriver-aleo-ae3/",
    "referenceModel": "ICERIVER AE3"
  },
  {
    "id": "mini-doge-iii",
    "manufacturer": "Goldshell",
    "model": "EcoMiner DUO 51",
    "coinId": "ltc-doge",
    "algorithm": "Scrypt",
    "hashrate": 700,
    "unit": "MH/s",
    "powerW": 400,
    "efficiency": 0.5714285714285714,
    "cooling": "air",
    "image": "assets/ecominer-desktop.webp",
    "source": "https://www.goldshell.com/product/goldshell-mini-doge-iii/",
    "referenceModel": "Goldshell MINI DOGE III"
  },
  {
    "id": "mini-doge-iii-plus",
    "manufacturer": "Goldshell",
    "model": "EcoMiner DUO 52",
    "coinId": "ltc-doge",
    "algorithm": "Scrypt",
    "hashrate": 810,
    "unit": "MH/s",
    "powerW": 500,
    "efficiency": 0.6172839506172839,
    "cooling": "air",
    "image": "assets/ecominer-desktop.webp",
    "source": "https://www.goldshell.com/product/goldshell-mini-doge-iii-plus/",
    "referenceModel": "Goldshell MINI DOGE III PLUS"
  },
  {
    "id": "ks0-pro",
    "manufacturer": "ICERIVER",
    "model": "EcoMiner K 20",
    "coinId": "kas",
    "algorithm": "kHeavyHash",
    "hashrate": 200,
    "unit": "GH/s",
    "powerW": 100,
    "efficiency": 0.5,
    "cooling": "air",
    "image": "assets/ecominer-compact.webp",
    "source": "https://www.iceriver.io/product/iceriver-ks0-pro/",
    "referenceModel": "ICERIVER KS0 PRO"
  },
  {
    "id": "rx0",
    "manufacturer": "ICERIVER",
    "model": "EcoMiner R 61",
    "coinId": "rxd",
    "algorithm": "SHA512256d",
    "hashrate": 260,
    "unit": "GH/s",
    "powerW": 100,
    "efficiency": 0.38461538461538464,
    "cooling": "air",
    "image": "assets/ecominer-compact.webp",
    "source": "https://www.iceriver.io/product/iceriver-rxd-rx0/",
    "referenceModel": "ICERIVER RX0"
  }
].map(Object.freeze));
 const coins=Object.freeze(Object.fromEntries(Object.entries({"btc":{"name":"Bitcoin","ticker":"BTC","algorithm":"SHA-256","revenueUnit":"PH/s","exampleHashprice":50},"ltc-doge":{"name":"Litecoin + Dogecoin","ticker":"LTC + DOGE","algorithm":"Scrypt","revenueUnit":"GH/s","exampleHashprice":8},"kas":{"name":"Kaspa","ticker":"KAS","algorithm":"kHeavyHash","revenueUnit":"TH/s","exampleHashprice":1},"alph":{"name":"Alephium","ticker":"ALPH","algorithm":"Blake3","revenueUnit":"TH/s","exampleHashprice":2},"aleo":{"name":"Aleo","ticker":"ALEO","algorithm":"zkSNARK","revenueUnit":"GH/s","exampleHashprice":15},"rxd":{"name":"Radiant","ticker":"RXD","algorithm":"SHA512256d","revenueUnit":"TH/s","exampleHashprice":1}}).map(([k,v])=>[k,Object.freeze(v)])));
 const hashScales={"MH/s":1e6,"GH/s":1e9,"TH/s":1e12,"PH/s":1e15};
 const hashLabel=m=>m.hashrate+" "+m.unit;
 const revenuePower=m=>m.hashrate*hashScales[m.unit]/hashScales[coins[m.coinId].revenueUnit];
 const routes={participation:['Project participation','Участие в проекте'],hosted:['My miner with hosting','Мой майнер с размещением'],purchase:['Equipment purchase','Покупка оборудования'],advice:['Help me choose','Помогите выбрать']};
 const find=id=>miners.find(m=>m.id===id)||null;
 const title=(id,lang='en')=>(routes[id]||routes.advice)[lang==='ru'?1:0];
 function number(v,min,max,label,optional=false){if(optional&&(v==null||v===''))return null;if(typeof v!=='number'&&(typeof v!=='string'||!/^\d+(?:\.\d+)?$/.test(v)))throw Error(label);const n=Number(v);if(!Number.isFinite(n)||n<min||n>max)throw Error(label);return n;}
 function calculate(input={}){
  const m=find(input.minerId);if(!m)throw Error('Choose a listed miner model.');if(input.coinId&&input.coinId!==m.coinId)throw Error('The selected miner does not mine this coin.');
  const count=number(input.units,1,10000,'Enter a whole number of miners from 1 to 10000.');if(!Number.isInteger(count))throw Error('Enter a whole number of miners from 1 to 10000.');
  const hashprice=number(input.hashprice,0,1000,'Enter revenue per reference hash unit per day from 0 to 1000 USD.'),electricity=number(input.electricity,0,2,'Enter electricity cost from 0 to 2 USD per kWh.'),uptime=number(input.uptime,0,100,'Enter uptime from 0 to 100%.'),poolFee=number(input.poolFee,0,100,'Enter pool fee from 0 to 100%.'),service=number(input.service,0,10000,'Enter service cost from 0 to 10000 USD per miner per day.'),share=number(input.share,0,100,'Enter an illustrative share from 0 to 100%.');
  const gross=revenuePower(m)*count*hashprice*uptime/100,kwh=m.powerW/1000*count*24*uptime/100,energy=kwh*electricity,fee=gross*poolFee/100,maintenance=count*service,net=gross-energy-fee-maintenance;
  return {gross,kwh,energy,fee,maintenance,net,shareNet:net*share/100,breakEvenHashprice:uptime>0&&poolFee<100?(energy+maintenance)/(revenuePower(m)*count*uptime/100*(1-poolFee/100)):null};
 }
 const scenarios=input=>{const base=calculate(input);return [.75,1,1.25].map((factor,index)=>{const gross=base.gross*factor,fee=base.fee*factor,net=gross-base.energy-fee-base.maintenance;return {...base,id:['conservative','base','strong'][index],factor,gross,fee,net,shareNet:net*Number(input.share)/100};});};
 function inquiry(v={}){
  if(!v||typeof v!=='object'||Array.isArray(v)||!Object.hasOwn(routes,v.route))throw Error('Choose a mining format.');
  if(!['US','CA'].includes(v.country))throw Error('Choose the United States or Canada.');
  const minerId=typeof v.minerId==='string'?v.minerId:'';if(minerId&&!find(minerId))throw Error('Choose a listed miner model.');
  const coinId=v.coinId|| (minerId?find(minerId).coinId:null);if(coinId&&!Object.hasOwn(coins,coinId))throw Error('Choose a listed coin.');if(minerId&&coinId!==find(minerId).coinId)throw Error('The selected miner does not mine this coin.');
  const budgetUsd=number(v.budgetUsd,1,100000000,'Enter a budget from 1 to 100000000 USD, or leave it blank.',true);
  const units=v.route==='purchase'||v.route==='hosted'?number(v.units,1,1000,'Enter 1 to 1000 miners, or leave it blank.',true):null;
  if(units!==null&&!Number.isInteger(units))throw Error('Enter 1 to 1000 miners, or leave it blank.');
  const note=typeof v.note==='string'?v.note.trim():'';if(note.length>1000)throw Error('Keep your mining note under 1000 characters.');
  let calculation=null;if(v.calculation!=null){const i=v.calculation;if(!i||typeof i!=='object'||Array.isArray(i))throw Error('Invalid mining calculation.');const assumptions={};for(const k of ['minerId','coinId','units','hashprice','electricity','uptime','poolFee','service','share'])assumptions[k]=i[k];calculate(assumptions);assumptions.coinId=find(assumptions.minerId).coinId;if((coinId&&coinId!==assumptions.coinId)||(minerId&&minerId!==assumptions.minerId))throw Error('Update the attached calculation to match your selection.');calculation={assumptions,scenarios:scenarios(assumptions),kind:'illustrative-not-live',period:'day',currency:'USD'};}
  return {version:'mining-inquiry-v1',requestType:'mining',coinId,route:v.route,country:v.country,minerId:minerId||null,miner:minerId?{...find(minerId)}:null,budgetUsd,units,note,calculation};
 }
 function rows(q,lang='en'){const t=(en,ru)=>lang==='ru'?ru:en,m=find(q.minerId)||q.miner,coin=coins[q.coinId||m?.coinId],calc=q.calculation,i=calc?.assumptions,c=coins[i?.coinId||find(i?.minerId)?.coinId],money=n=>new Intl.NumberFormat(lang==='ru'?'ru-RU':'en-US',{style:'currency',currency:'USD'}).format(n);return [[t('Mining format','Формат майнинга'),title(q.route,lang)],[t('Coin / algorithm','Монета / алгоритм'),coin?coin.ticker+' · '+coin.algorithm:t('Select with a specialist','Подбор со специалистом')],[t('Client country','Страна клиента'),q.country==='CA'?t('Canada','Канада'):t('United States','США')],[t('Equipment','Оборудование'),m?m.model+' · '+hashLabel(m)+' · '+m.powerW+' W':t('Select with a specialist','Подбор со специалистом')],...(q.units?[[t('Miners','Майнеров'),String(q.units)]]:[]),[t('Budget · USD','Бюджет · USD'),q.budgetUsd==null?t('To discuss','Обсудить'):String(q.budgetUsd)],...(calc?[[t('Illustrative assumptions','Допущения расчёта'),(find(i.minerId)?.model||i.minerId)+' · '+i.units+' miner · '+i.hashprice+' USD/'+(c?.revenueUnit||'PH/s')+'/day · '+i.electricity+' USD/kWh · uptime '+i.uptime+'% · pool '+i.poolFee+'% · service '+i.service+' USD/miner/day · share '+i.share+'%'],[t('Daily project scenarios · conservative / base / strong','Сценарии проекта за сутки · консервативный / базовый / сильный'),calc.scenarios.map(s=>money(s.net)).join(' / ')]]:[]),...(q.note?[[t('Note','Комментарий'),q.note]]:[])];}
 function nextStep(route,lang='en'){const texts={participation:['Agree budget, coin and project terms; send the cost breakdown before discussing funding.','Уточнить бюджет, монету и условия проекта; отправить состав расходов до обсуждения пополнения.'],hosted:['Confirm ownership, model, quantity and hosting costs; prepare an equipment and hosting quote.','Уточнить владение, модель, количество и тариф размещения; подготовить смету оборудования и хостинга.'],purchase:['Confirm model, quantity, power supply and delivery; prepare an equipment quote.','Уточнить модель, количество, электропитание и доставку; подготовить смету оборудования.'],advice:['Clarify the objective and budget, then compare participation and ownership.','Уточнить задачу и бюджет, затем сравнить участие и собственное оборудование.']};return (texts[route]||texts.advice)[lang==='ru'?1:0];}
 const consentVersion='mining-inquiry-v1';
 const consentText={sms:'I agree to receive automated follow-up texts from EcoGrid at the number provided about my mining request. Up to 2 messages in the first 24 hours. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is optional and is not a condition of purchase.',email:'I agree to receive follow-up emails from EcoGrid about this mining request. This is optional; I can unsubscribe at any time.'};
 const consentTextRu={sms:'Я согласен получать автоматические SMS от EcoGrid на указанный номер по моей заявке о майнинге. До 2 сообщений в первые 24 часа. Возможна плата оператора. STOP — отказ, HELP — помощь. Согласие необязательно и не является условием покупки.',email:'Я согласен получать письма от EcoGrid по этой заявке о майнинге. Это необязательно; я могу отказаться в любое время.'};
 return {miners,coins,hashLabel,revenuePower,nextStep,find,routes,title,calculate,scenarios,inquiry,rows,consentVersion,consentText,consentTextRu,checkedAt:'2026-09-28'};
});
