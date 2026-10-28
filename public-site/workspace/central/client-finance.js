'use strict';
// Shared accounts use server balances and actual account state, not the first receipt.
if(window.ECO_SHARED_CONTEXT){
 if(demo.planDraft){chosenTier=demo.planDraft.tierId;investmentDraft=demo.planDraft.capital;chosenStations=demo.planDraft.stationIds.slice();}
 const ft=(en,ru)=>window.EcoLocale?.language==='ru'?ru:en;
 const money=value=>new Intl.NumberFormat(window.EcoLocale?.locale||'en-US',{style:'currency',currency:'USD'}).format(value);
 const tierName=name=>window.EcoLocale?.t(name)||name;
 const safeText=s=>escapeHtml(s);
 const settlement=(capital,rate,start=Date.now())=>EcoFinance.planSettlement({capital,rate,ratePeriod:EcoFinance.ratePeriod},start);
 const entryContext=EcoNavigation.context('client',new URL(location).searchParams);
 tab=entryContext.get('tab')||'dashboard';
 const current=demo.planDraft||demo.plan;
 if(current){chosenTier=current.tierId;investmentDraft=current.capital;chosenStations=current.stationIds.slice();}
 demo.tariffs=EcoFinance.tiers.map(t=>({...t}));
 if(!current){if(entryContext.has('tier'))chosenTier=entryContext.get('tier');if(entryContext.has('amount'))investmentDraft=Number(entryContext.get('amount'));}
 const entryInit=init;init=async function(){await entryInit();const url=new URL(location);url.searchParams.delete('tier');url.searchParams.delete('amount');history.replaceState(history.state,'',url);};
 const oldNumbers=renderNumbers;
 renderNumbers=function(){oldNumbers();$('#balance').textContent=money(EcoFinance.summary(demo).freeBalance);};
 function financialFacts(){const s=EcoFinance.summary(demo),w=EcoWithdrawals.state(demo);
  return `<section class="panel cab-summary shared-finance" translate="no"><div class="cab-section-heading"><h2>${ft('Account snapshot','Финансовая сводка')}</h2><button class="text-button" data-action="history">${ft('Activity','Операции')} →</button></div><dl class="cab-summary-values"><div><dt>${ft('Free balance for participation','Свободно для участия')}</dt><dd>${money(s.freeBalance)}</dd><small>${ft('Not funded profit','Не профинансированная прибыль')}</small></div><div><dt>${ft('In active plan','В активном плане')}</dt><dd>${money(s.capital)}</dd><small>${s.active?safeText(tierName(s.active.name)):ft('No active plan','Нет активного плана')}</small></div><div><dt>${ft('Funded profit','Профинансированная прибыль')}</dt><dd>${money(s.settledProfit)}</dd><small>${ft('Recorded total','Всего зафиксировано')}: ${money(s.recorded)} · ${ft('reserved','в резерве')}: ${money(s.reserved)}</small></div><div><dt>${ft('Available to withdraw now','Можно запросить сейчас')}</dt><dd>${money(w.canRequest?s.withdrawable:0)}</dd><small>${w.reason==='pending'?ft('Request under review','Заявка на проверке'):w.eligibleAt?new Date(w.eligibleAt).toLocaleString(window.EcoLocale?.locale||'en-US',{dateStyle:'short',timeStyle:'short'}):ft('4 days after activation','Через 4 дня после активации')}</small></div><div><dt>${ft('Company payable','Задолженность компании')}</dt><dd>${money(s.companyPayable)}</dd><small>${ft('Not withdrawable until funded','Не доступна к выводу до покрытия')}</small></div></dl><div class="cab-summary-actions"><button class="button primary" data-action="topup">${ft('Add funds','Пополнить')}</button><button class="button secondary" data-action="withdraw">${ft('Withdraw funded profit','Вывести профинансированную прибыль')}</button><button class="text-button" data-action="sessions">${ft('Settlement history','История расчётов')}</button></div></section>`;
 }
 function nextStep(){const s=EcoFinance.summary(demo),p=s.active||s.draft;
  const states={
   new:[ft('Choose your stations and amount.','Выберите станции и сумму.'),ft('Build a plan and review the 4-day estimate with your manager.','Соберите план и обсудите расчёт за 4 дня с менеджером.'),'journey-resume',ft('Build my plan','Собрать план')],
   draft:[ft('Your selection is saved.','Ваш выбор сохранён.'),ft('Review your stations and the amount needed to activate this plan.','Проверьте станции и сумму, необходимую для активации плана.'),'journey-my-plan',ft('Review saved plan','Посмотреть черновик')],
   pending:[ft('Your payment request is under review.','Заявка на пополнение проверяется.'),ft('Your balance updates after approval. Your selection stays saved.','Остаток обновится после подтверждения. Выбранный план сохранён.'),'payment-pending-status',ft('View request status','Статус заявки')],
   funded:[ft('Funds are available. Choose a plan.','Средства доступны. Выберите план.'),ft('Review a station group and amount before activation.','Выберите группу станций и сумму перед активацией.'),'journey-resume',ft('Choose my plan','Выбрать план')],
   ready:[ft('Your saved plan is ready to activate.','Сохранённый план готов к активации.'),ft('Review the selection. Activation moves funds from your balance into the plan.','Проверьте выбор. При активации средства переходят из остатка в план.'),'activate-draft',ft('Activate plan','Активировать план')],
   active:[ft('Your active plan. Your account activity.','Ваш активный план и операции.'),ft('Follow recorded credits, available funds, and your withdrawal requests.','Проверяйте записанные начисления, свободные средства и заявки на вывод.'),'journey-my-plan',ft('View my plan','Открыть мой план')]
  };
  const [title,copy,action,label]=states[s.stage];
  return `<div class="life-hero-copy" translate="no"><h1>${title}</h1><p>${copy}</p>${p?`<p><strong>${safeText(tierName(p.name))} · ${money(p.capital)}</strong> · ${ft('Stations','Станции')}: ${p.stationIds.length}</p>`:''}<div class="life-hero-actions"><button class="button primary" data-action="${action}">${label} →</button><button class="text-button" data-action="manager">${ft('Ask my manager','Написать менеджеру')}</button></div></div>`;
 }
 renderLifecycle=function(){if(workspaceRole!=='client'||tab!=='dashboard')return;const root=$('#journey-dashboard'),welcome=$('#client-next-step');if(!root||!welcome)return;
  document.body.dataset.fundingStage=EcoFinance.summary(demo).stage;
  welcome.className='panel client-next-step life-hero shared-account-step';welcome.innerHTML=nextStep();
  root.querySelectorAll('.life-dashboard-panel,.cab-summary').forEach(el=>el.remove());root.insertAdjacentHTML('afterbegin',financialFacts());
  refreshWithdrawalPolicy();
 };
 // Expose the existing full builder from the first visit; presets are shortcuts.
 renderTariffs=function(){tariffsBeforeLifecycle();const field=$('#investment-amount');if(field){field.type='text';field.inputMode='decimal';field.maxLength=20;
   field.closest('.investment-field').insertAdjacentHTML('afterend',`<div id="eco-amount-preview" class="eco-amount-preview" translate="no" role="status" aria-live="polite"></div>`);updateTariffMath();}
  document.body.classList.add('r-builder-open');$('#decision-plan-tabs')?.removeAttribute('hidden');
  $('#tariffs-section [data-action="apply-plan"]')?.insertAdjacentHTML('afterend',`<button class="button secondary" data-action="save-plan-draft" translate="no" ${validDemoInvestment(investmentDraft)?'':'disabled'}>${ft('Save selection','Сохранить подборку')}</button>`);
 };
 actions['save-plan-draft']=()=>{updateTariffMath();const tier=EcoFinance.tiers.find(v=>v.id===chosenTier);
  if(!tier||!validDemoInvestment(investmentDraft)||chosenStations.length!==tier.count)return toast(ft('Check the amount and station selection.','Проверьте сумму и выбранные станции.'));
  demo.planDraft={tierId:tier.id,name:tier.name,rate:tier.rate,ratePeriod:EcoFinance.ratePeriod,capital:investmentDraft,stationIds:chosenStations.slice()};persist();actions['journey-my-plan']();
 };
 const mathBeforeLive=updateTariffMath;
 updateTariffMath=function(){mathBeforeLive();const box=$('#eco-amount-preview'),tier=EcoFinance.tiers.find(p=>p.id===chosenTier);if(!box||!tier)return;const valid=validDemoInvestment(investmentDraft);
   document.querySelectorAll('.tariff-card[data-tier]').forEach(card=>{const choice=EcoFinance.tiers.find(t=>t.id===card.dataset.tier),node=card.querySelector('.tier-weekly');if(choice&&node)node.textContent=EcoFinance.eligible(investmentDraft,choice.id)?money(settlement(investmentDraft,choice.rate)):'—';});
  document.querySelectorAll('[data-action="apply-plan"], [data-action="save-plan-draft"]').forEach(button=>button.disabled=!valid);
   box.innerHTML=valid?`<small>${ft('Your 4-day model estimate','Ваш расчёт за 4 дня')}</small><strong>${money(settlement(investmentDraft,tier.rate))}</strong><span>${money(investmentDraft)} · ${tier.rate}% / ${ft('calendar month','календарный месяц')} · ${safeText(tierName(tier.name))}</span><small>${ft('Continuous accrual · available profit fixed every 4 days','Непрерывное начисление · доступная прибыль фиксируется раз в 4 дня')}</small><small>${ft('Estimate for a new 4-day settlement period starting now.','Расчёт нового 4-дневного периода, начинающегося сейчас.')}</small>`:`<span>${tier.id==='scale'?ft('Enter your amount from $1,000 to see the calculation at 16% per calendar month.','Введите сумму от $1 000, чтобы увидеть расчёт под 16% за календарный месяц.'):ft('Enter an amount that meets the selected tier minimum.','Введите сумму не ниже минимума выбранного тарифа.')}</span>`;
 };
 const renderBeforeSharedFinance=renderClientTab;
 renderClientTab=function(){renderBeforeSharedFinance();if(tab==='tariffs'){document.body.classList.add('r-builder-open');$('#decision-plan-tabs')?.removeAttribute('hidden');}renderLifecycle();};
 paymentModal=function(type){if(type==='topup'&&EcoFunding.state(demo).pending.length)return showPaymentReceipt(EcoFunding.state(demo).pending[0].id);return fundingModalBeforeLifecycle(type);};
 actions['request-plan-funding']=()=>openFundingAmount(EcoFunding.intent(demo).amount);
 // A funding choice saves the reviewed selection and opens checkout directly.
 // Already funded activation keeps its existing explicit confirmation.
 let savingPaymentPlan=false;
 async function activateSharedPlan(){
  if(savingPaymentPlan||!planIsComplete())return;savingPaymentPlan=true;const b=$('#modal [data-action="confirm-plan"]');if(b)b.disabled=true;
  try{const result=await window.EcoClientAccount.activate(planTerms());if(!result)return;try{sessionStorage.removeItem('ecocharge-working-plan');}catch{}
    const s=EcoFinance.summary(result.state),p=s.active,w=result.nextAccrual||result.nextWeek;tab='dashboard';renderClientTab();
   const date=v=>new Date(v).toLocaleString(window.EcoLocale?.locale||'en-US',{dateStyle:'medium',timeStyle:'short',timeZone:result.state.ecosystem?.timezone||'UTC'});
    openModal(`<section class="payment-result" translate="no"><span class="payment-preview-label">${ft('PLAN','ПЛАН')}</span><h2>${ft('Your plan is active','Ваш план активен')}</h2><p>${safeText(tierName(p.name))} · ${ft('Stations','Станций')}: ${p.stationIds.length}</p><dl class="payment-result-details"><div><dt>${ft('In plan','В плане')}</dt><dd>${money(p.capital)}</dd></div><div><dt>${ft('Available balance','Свободный остаток')}</dt><dd>${money(s.available)}</dd></div><div><dt>${ft('Estimated 4-day accrual','Расчётное начисление за 4 дня')}</dt><dd>${money(s.accrual)} · ${p.rate}% / ${ft('calendar month','календарный месяц')}</dd></div><div><dt>${ft('Period started','Начало периода')}</dt><dd>${date(w.periodStart)}</dd></div><div><dt>${ft('First 4-day settlement','Первая фиксация за 4 дня')}</dt><dd>${date(w.periodEnd)}</dd></div></dl><small>${safeText(result.state.ecosystem?.timezone||'UTC')}</small><button class="button primary" data-action="back-overview">${ft('Go to overview','Перейти к обзору')}</button></section>`);
  }finally{savingPaymentPlan=false;if(b?.isConnected)b.disabled=false;}
 }
 actions['confirm-plan']=async()=>{if(savingPaymentPlan)return;if(availableForPlan()>=investmentDraft)return activateSharedPlan();
  if(!planIsComplete())return toast(ft('Check the amount and station selection.','Проверьте сумму и выбранные станции.'));
  savingPaymentPlan=true;const b=$('#modal [data-action="confirm-plan"]');if(b)b.disabled=true;
  try{demo.planDraft=planTerms();const saved=await persist();if(!saved)return;try{sessionStorage.removeItem('ecocharge-working-plan');}catch{}paymentDraft=null;paymentModal('topup');}
  finally{savingPaymentPlan=false;if(b?.isConnected)b.disabled=false;}
 };
 document.addEventListener('ecocharge:locale',()=>{renderNumbers();renderLifecycle();});
 actions['preview-contract']=()=>{tab='documents';renderClientTab();};
 // Explicit review before an already funded draft is activated.
  actions['activate-draft']=()=>{const p=demo.planDraft;if(!p)return;chosenTier=p.tierId;investmentDraft=p.capital;chosenStations=p.stationIds.slice();openModal(`<h2 translate="no">${ft('Activate your saved plan','Активация сохранённого плана')}</h2><p translate="no">${safeText(tierName(p.name))} · ${money(p.capital)} · ${p.rate}% / ${ft('calendar month','календарный месяц')}</p><p translate="no">${ft('Estimated 4-day accrual','Расчётное начисление за 4 дня')}: ${money(EcoFinance.planSettlement(p))}</p><p translate="no">${ft('Available balance after activation','Свободный остаток после активации')}: ${money(availableForPlan()-p.capital)}</p><button class="button primary" data-action="confirm-plan" translate="no">${ft('Confirm activation','Подтвердить активацию')}</button>`);};
 function addUpgradeReview(){const current=EcoFinance.summary(demo).active,tier=EcoFinance.tiers.find(p=>p.id===chosenTier),confirm=$('#modal [data-action="confirm-plan"]');if(!tier||!confirm||!$('#modal').open)return;
   const gap=Math.max(0,investmentDraft-availableForPlan()),note=$('#modal .modal-note');if(gap>0){confirm.setAttribute('translate','no');confirm.textContent=ft('Choose payment method','Выбрать способ пополнения');}if(note){note.setAttribute('translate','no');note.textContent=gap>0?ft('Funding needed: '+money(gap)+'. Your selection stays saved.','Нужно пополнить: '+money(gap)+'. Подборка сохранится.'):ft('Activation moves the confirmed account balance into the plan. Funding is recognized only after provider verification.','Активация переводит подтверждённый остаток счёта в план. Пополнение учитывается только после проверки платёжным провайдером.');}if(!current)return;const comparison=EcoParticipation.compare(demo,{tierId:tier.id,capital:investmentDraft});confirm.insertAdjacentHTML('beforebegin',`<section class="eco-upgrade-review" translate="no"><h3>${ft('Your plan change','Изменение плана')}</h3>${comparison.issue?`<p>${ft('You have an outstanding request. It stays open when you change plans. Contact your manager if it needs attention.','У вас есть открытый вопрос. Изменение плана не закроет его. При необходимости обсудите его с менеджером.')}</p>`:''}<dl><div><dt>${ft('In plan · now → after','В плане · сейчас → после')}</dt><dd>${money(current.capital)} → ${money(investmentDraft)}</dd></div><div><dt>${ft('Monthly rate · now → after','Ставка в месяц · сейчас → после')}</dt><dd>${current.rate}% → ${tier.rate}%</dd></div><div><dt>${ft('Available after funding and activation','Свободно после пополнения и активации')}</dt><dd>${money(comparison.after.available)}</dd></div><div><dt>${ft('Withdrawal reserve kept','Резерв вывода сохранится')}</dt><dd>${money(comparison.reserved)}</dd></div><div><dt>${ft('Current 4-day estimate','Текущий расчёт за 4 дня')}</dt><dd>${money(EcoFinance.planSettlement(current))}</dd></div><div><dt>${ft('New 4-day estimate','Новый расчёт за 4 дня')}</dt><dd>${money(settlement(investmentDraft,tier.rate))}</dd></div><div><dt>${ft('Additional funding needed','Нужно добавить')}</dt><dd>${money(gap)}</dd></div></dl><p>${ft('Activation starts a new 4-day settlement period. Completed periods are credited first. The unfinished period is not credited; its live counter restarts at zero.','Активация начинает новый 4-дневный период. Завершённые периоды зачисляются до перехода. Незавершённый период не зачисляется: его счётчик начинается с нуля.')}</p></section>`);
 }
 for(const name of ['apply-plan','activate-draft']){const previous=actions[name];actions[name]=()=>{previous();addUpgradeReview();};}
}
