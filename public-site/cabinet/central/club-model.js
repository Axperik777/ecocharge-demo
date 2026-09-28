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
 'The monthly Club budget is exhausted.':'Бюджет Club на этот месяц исчерпан.',
 'The seasonal Club budget is exhausted.':'Бюджет сезонной акции исчерпан.',
 'Club rewards are paused. Set a budget before enabling.':'Бонусы Club приостановлены. Задайте бюджет перед включением.',
 'Available funds do not allow this Club adjustment.':'Доступного остатка недостаточно для этой операции Club.',
 'Club settings changed. Reload before saving.':'Настройки Club изменились. Обновите страницу перед сохранением.',
 'Budget must cover at least one complete reward.':'Бюджет должен покрывать хотя бы один полный бонус.',
 'Budget cannot be below rewards already credited this month.':'Бюджет не может быть меньше уже зачисленных за месяц бонусов.',
 'Create a new campaign ID to change seasonal terms.':'Для изменения условий акции задайте новый ID.',
 'Use a club alias of 3–24 letters or digits.':'Псевдоним должен содержать 3–24 буквы или цифры.',
 'This club alias is already used.':'Этот псевдоним уже занят.',
 'Enter a valid seasonal campaign and budget.':'Проверьте даты, ID и бюджет сезонной акции.',
 'Enter a team goal and target.':'Укажите цель команды и число активных клиентов.',
 'Enter valid Club amounts in cents.':'Проверьте суммы Club.',
 'Verify the first funding receipt before crediting.':'Перед зачислением проверьте поступление первого платежа.',
 'This Club reward cannot be credited.':'Этот бонус Club нельзя зачислить.',
 'Program paused':'Программа приостановлена',
 'Awaiting credit':'Ожидает зачисления',
 'Contact match requires review':'Совпадение контактов требует проверки',
 'First funding below minimum':'Первое пополнение ниже минимума',
 'Credited from acquisition budget':'Зачислено из бюджета привлечения'
 };
 const message=(text,language)=>language==='ru'?(errors[text]||text):text;
 return {levels,defaults,rank,firstFunding,active,month,amount,message};
});
