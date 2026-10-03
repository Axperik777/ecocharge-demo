'use strict';
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoAcademyScript=api;})(typeof window==='object'?window:globalThis,()=>{
 const rows=[
 ['open','Charge request','Заявка на Charge',
  'Hi [name], I’m [specialist] from EcoGrid Academy. You asked about the EcoGrid Charge project. Is now a good time to review how it works and what you need to decide?',
  'Здравствуйте, [имя]. Я [специалист] из EcoGrid Academy. Вы интересовались проектом EcoGrid Charge. Удобно сейчас разобрать, как он работает и что нужно понять для решения?'],
 ['goal','Understand the decision','Уточнить задачу',
  'What caught your attention in Charge? Have you considered similar projects before? What matters most to your decision: the project, its risks, documents or access to funds?',
  'Что заинтересовало в Charge? Раньше рассматривали похожие проекты? Что важнее для решения: понять проект, риски, документы или порядок доступа к деньгам?'],
 ['project','Present Charge','Объяснить Charge',
  'Charging sessions are the project’s revenue source. Electricity, maintenance, site costs and demand affect the operating result. Let’s use one station example, then review the proposed participation and its calculation. The directory and calculation do not prove ownership or actual revenue.',
  'Источник выручки Charge — зарядные сессии. На результат влияют загрузка, электричество, обслуживание и расходы площадки. Покажу одну станцию, затем разберём предложенный формат участия и расчёт. Каталог и расчёт сами по себе не подтверждают владение или фактическую выручку.'],
 ['interest','Check readiness for a proposal','Перейти к предложению',
  'Would you like to review a Charge proposal for an amount you are considering, or do we need to resolve a question first? If you are ready, we can review the terms today. Otherwise, we will agree on the information and next contact you need.',
  'Хотите разобрать предложение Charge на сумму, которую рассматриваете, или сначала закрыть конкретный вопрос? Если готовы, разберём условия сегодня. Если нет — согласуем нужный материал и следующий контакт.'],
 ['register','One EcoGrid account','Один аккаунт EcoGrid',
  'If you already have an account, we will use it. Otherwise, open the official registration page and complete it yourself. A deposit is not required to access the account or join the community. Do not share your password.',
  'Если аккаунт уже есть, используем его. Если нет — откройте официальную регистрацию и заполните её самостоятельно. Для доступа в кабинет и вступления в сообщество пополнение не требуется. Пароль никому не передавайте.'],
 ['account','The relevant account screens','Нужные экраны кабинета',
  'Let’s find your Charge proposal, documents, wallet and support chat. We will continue from your current step. The app can be installed from the account after your first useful action.',
  'Найдём предложение Charge, документы, кошелёк и чат поддержки. Продолжим с вашего текущего шага, без повторной регистрации. Приложение можно установить из кабинета после первого полезного действия.'],
 ['groups','Optional community','Клуб по желанию',
  'The Club is for people interested in energy and technology: discussions, questions and Academy support. Joint AI sessions, local meetups and golf activities are planned; specific events need a confirmed announcement. Would you like the official community links? Club membership is not required to participate in Charge.',
  'Клуб — сообщество людей, которым интересны энергетика и технологии: обсуждения, вопросы и помощь Академии. Совместные AI-сессии, встречи и гольф-активности планируются; конкретное событие предлагаем по подтверждённому анонсу. Хотите официальные ссылки на сообщество? Для участия в Charge вступать в Клуб не обязательно.'],
 ['gift','500 EcoCoin and optional AI','500 EcoCoin и дополнительный AI',
  'The welcome program provides 500 EcoCoin for future project AI use. The planned Charge AI service compares eligible charging options using demand and costs. It would cost 472 EcoCoin for 30 days, leaving 28 coins from the gift. Activation is not available yet; no additional return is confirmed. The service is optional, and we confirm the gift only after actual issuance.',
  'В приветственной программе — 500 EcoCoin для будущего проектного AI. Планируемый AI Charge сравнивает допустимые варианты зарядок с учётом спроса и расходов. Стоимость — 472 EcoCoin на 30 дней; от подарка останется 28. Подключение ещё готовится, дополнительная доходность не подтверждена. Услуга добровольная; выдачу подарка подтверждаем только по факту.'],
 ['wallet','Wallet help when needed','Кошелёк — по необходимости',
  'If a separate wallet is needed for the gift, use the approved guide when available. Create it yourself. Never share a password, recovery phrase or private key. This step can wait and does not hold up a Charge decision.',
  'Если для подарка нужен отдельный кошелёк, пройдём утверждённую инструкцию, когда она доступна. Создаёте его сами. Пароль, фразу восстановления и приватный ключ никому не передавайте. Этот шаг можно отложить; он не задерживает решение по Charge.'],
 ['proposal','Charge terms and the FTD decision','Условия Charge и решение о FTD',
  'Let’s confirm the Charge amount, tariff, costs, risks, documents and exit terms. The displayed monthly rate is a model calculation, not a guarantee or verified station return. Have we resolved your questions? If the terms are complete and you choose to proceed, are you ready for your first Charge deposit of [agreed amount] through the official account?',
  'Сверим сумму Charge, тариф, расходы, риски, документы и условия выхода. Месячная ставка на экране — модельный расчёт, не гарантия и не подтверждённая выручка станции. Все ваши вопросы разобрали? Если условия проверены и вы решили участвовать, готовы перейти к первому депозиту в Charge на [согласованную сумму] через официальный кабинет?'],
 ['objections','Resolve the actual objection','Закрыть конкретное возражение',
  '“I need to think.” — Which point should we clarify: project, documents, funds access or timing? “Is it guaranteed?” — No; we need to assess evidence and risks. “I do not have spare funds.” — Then we will not move to a deposit. “I do not want the Club or AI.” — Both are optional. “I want Solar or Mining.” — I can note that interest and arrange a separate review after we finish the current Charge step.',
  '«Подумаю» — что именно уточнить: проект, документы, доступ к деньгам или срок? «Есть гарантия?» — нет, нужно оценить доказательства и риски. «Нет свободных денег» — тогда к депозиту не переходим. «Не хочу Клуб или AI» — оба предложения добровольные. «Интересен Solar или Mining» — сохраню интерес и предложу отдельный разбор после текущего шага Charge.'],
 ['funding','Confirm the deposit','Подтвердить депозит',
  'Use the official account for the agreed amount. A pending request is not a confirmed deposit. We wait until receipt is checked and approved, then verify the status together. Do not send a second payment just because review takes time. Real payments are not connected in the public preview.',
  'Используйте официальный кабинет и согласованную сумму. Ожидающая заявка не является подтверждённым депозитом. Дождёмся проверки поступления и Approved, затем вместе сверим статус. Не повторяйте перевод из-за ожидания проверки. В публичном просмотре реальные платежи не подключены.'],
 ['activation','Activate Charge separately','Отдельно активировать Charge',
  'After the checked deposit, confirm the amount and tariff and activate the agreed Charge plan. The accrual period begins only after activation. We will check the resulting status and arrange your support contact.',
  'После проверенного депозита сверим сумму и тариф и активируем согласованный Charge-план. Период начислений начинается только после активации. Проверим статус и согласуем контакт для сопровождения.'],
 ['lesson','Support the current project','Помочь с текущим проектом',
  'Let’s open your active project, transactions, documents and support chat. What needs attention? We resolve that before discussing another project.',
  'Откроем действующий проект, операции, документы и чат поддержки. С чем нужна помощь? Сначала решим этот вопрос, затем можно обсуждать другой проект.'],
 ['expansion','Solar and Mining after FTD','Solar и Mining после FTD',
  'Once your Charge setup is clear, would you like a separate review of Solar or Mining? Each has its own costs, risks and terms. Another deposit is not required for support or withdrawal.',
  'Когда по Charge всё понятно, хотите отдельно разобрать Solar или Mining? У каждого проекта свои расходы, риски и условия. Новый депозит не требуется для поддержки или вывода.'],
 ['close','Record one next step','Зафиксировать следующий шаг',
  'Today we completed [actual step]. Next is [one action] with [responsible person] at [time and time zone]. We keep the context in your account. If you do not want further contact, I will record that.',
  'Сегодня сделали [фактический шаг]. Далее — [одно действие] с [ответственный] в [время и часовой пояс]. Контекст сохраняем в кабинете. Если дальнейшая связь не нужна, зафиксирую отказ.']
 ];
 function scripts(language='en',context={}){
  const ru=language==='ru',state=context.state||{},crm=context.crm||{},j=context.journey||context.context?.journey||state.journey||{};
  const active=state.plan?.status==='active'||state.miningPositions?.some(p=>p.status!=='closed'&&p.capital>0),presented=crm.presentationComplete||state.academy?.presentationComplete||state.planDraft?.savedBy==='manager',member=crm.clubMember||state.academy?.clubMember,clubOnly=j.topic==='club'&&j.purpose!=='participation';
  const funded=(state.requests||[]).some(r=>r.type==='topup'&&r.status==='Approved'&&r.receiptChecked===true&&r.amount>0&&Number.isFinite(Date.parse(r.reviewedAt)));
  const mapped=new Map(rows.map(([id,en,r,text,textRu])=>[id,{id,title:ru?r:en,text:ru?textRu:text,note:''}]));
  mapped.get('open').note=ru?'Таргет → Charge → Академия → ЛК и Клуб по желанию → подтверждённый FTD Charge. Solar / Mining — отдельные предложения после FTD. Отмечайте презентацию только по факту. Используйте блоки по текущему этапу клиента.':'Paid traffic → Charge → Academy → account and optional Club → confirmed Charge FTD. Solar / Mining are separate offers after FTD. Mark a presentation only when completed. Use the steps relevant to the client’s current stage.';
  mapped.get('funding').note=ru?'FTD фиксируется проверенным Approved с датой подтверждения. Заявка и скриншот не равны депозиту. После FTD передача в сопровождение — вручную администратором.':'FTD requires checked approval and a confirmation timestamp. A request or screenshot is not a deposit. The administrator manually assigns support after FTD.';
  mapped.get('gift').note=ru?'Диапазон AI 3–6 не подтверждён: нет согласованных единицы, периода и методики. Не обещать надбавку. Клуб объясняем кратко; отдельный кошелёк можно отложить.':'The proposed AI range of 3–6 has no confirmed unit, period or method. Do not promise an uplift. Keep the Club explanation brief; a separate wallet can wait.';
  let ids;
  if(active){mapped.get('open').text=ru?'Здравствуйте, [имя]. Продолжим работу с вашим действующим проектом. Что нужно разобрать в кабинете?':'Hi [name], let’s continue with your active project. What would you like help with?';ids=['open','lesson','account',...(funded?['expansion']:[]),'groups','gift','close'];}
  else if(funded){mapped.get('open').text=ru?'Первое пополнение подтверждено. Проверим согласованный Charge-план и следующий шаг активации.':'Your first deposit is confirmed. Let’s check the agreed Charge plan and the activation step.';ids=['open','account','activation','close'];}
  else if(clubOnly){mapped.get('open').text=ru?'Здравствуйте, [имя]. Вы интересовались сообществом EcoGrid. Помогу с Клубом и доступом в кабинет. Если захотите узнать о Charge, отдельно покажу проект.':'Hi [name], you asked about the EcoGrid community. I can help with Club and account access. If you want to explore Charge, we can arrange a separate walkthrough.';ids=['open','register','groups','account','wallet','gift','close'];}
  else if(presented){mapped.get('open').text=ru?'Здравствуйте, [имя]. Продолжим с обсуждённого предложения Charge. Какой вопрос остался перед решением?':'Hi [name], let’s continue with the Charge proposal we discussed. What question remains before your decision?';ids=['open','account','groups','gift','proposal','objections','funding','activation','close'];}
  else{if(member)mapped.get('open').text=ru?'Вы уже в Клубе и кабинете. Если готовы, разберём Charge и условия первого участия. Что хотите понять сначала?':'You already have Club and account access. If you are ready, let’s review Charge and the terms. What would you like to clarify first?';ids=['open','goal','project','interest',...(!member?['register']:[]),'account','groups','gift','proposal','objections','funding','activation','close'];}
  const charge=typeof module==='object'&&module.exports?require('../charge-model.js'):globalThis.EcoChargeModel;
  const text=(...keys)=>keys.map(k=>charge.copy(k,language)).join(' ');
  mapped.get('project').text=text('who','work','source','split','formula','allocation');
  mapped.get('proposal').text=text('where','rights','proof');
  mapped.get('gift').text=text('ai');mapped.get('gift').note=text('aiEvidence','costs');
  mapped.get('activation').text+=' '+text('allocation','cadence');
  return ids.map(id=>mapped.get(id));
 }
 return {scripts};
});
