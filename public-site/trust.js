'use strict';
(() => {
  const $=s=>document.querySelector(s);
  const content=window.ECOCHARGE_TRUST_CONTENT;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const open=html=>window.EcoChargePublic.openDialog(html);
  const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
  const envelope=(tag,title,body)=>`<div class="ec-dialog-body"><span class="ec-kicker">${tag}</span><h2 id="site-dialog-title">${title}</h2>${body}</div>`;

  window.EcoChargeTrust={stationEvidence:s=>`<section class="ec-station-evidence" aria-label="Station evidence"><h3>Station data</h3><dl><div><dt>Location & equipment</dt><dd>Public directory record</dd></div><div><dt>Listed operator</dt><dd>${esc(s.network)}</dd></div><div><dt>Revenue, costs & distributions</dt><dd>Not connected</dd></div></dl><details><summary>Which operating figures are still missing?</summary><p>Charging revenue, electricity and site costs, service expenses, reserves and distributable proceeds. Missing data is not a zero balance.</p></details><a class="ec-text-link" href="resources/#company-documents">Company & ownership documents →</a></section>`};

  const introduction=()=>open(envelope('WRITTEN INTRODUCTION · EcoGrid','Company overview',`<ol class="ec-intro-reading"><li><h3>The proposed business</h3><p>EcoGrid models solar generation, battery storage, EV charging, long-term commercial energy sales and sales to the grid. Asset rights and operating contracts require documentation.</p></li><li><h3>The account experience</h3><p>Browse public station records, build a sample plan, inspect a weekly calculation and try document and manager workflows.</p></li><li><h3>Before a real commitment</h3><p>Review the legal instrument, company and ownership evidence, operating results, fees, withdrawal conditions and risks. The workspace’s calendar-month rates are not verified returns.</p></li></ol><div class="ec-dialog-note">No money is accepted. An account does not create investment rights.</div><div class="ec-dialog-actions"><a class="ec-button" href="register/">Explore the account →</a><a class="ec-text-link" href="resources/#company-documents">Review the document register →</a></div>`));

  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-trust],[data-trust-document],[data-cash-scenario]');
    if(!target)return;
    if(target.dataset.trust==='intro')introduction();
    if(target.dataset.trust==='contact')open(envelope('TEAM CONTACT · NOT CONNECTED','The real team profile is coming soon.',`<p>The team name, photo, corporate email, messaging channels and meeting calendar have not been supplied. This preview does not contact a live person or reserve a meeting.</p><ul class="ec-review-list"><li>Verified team member and role</li><li>Working hours and time zone</li><li>Corporate email, WhatsApp and Telegram</li><li>A real video meeting calendar</li></ul><div class="ec-dialog-actions"><a class="ec-button" href="register/?next=dashboard">Try the local account inbox →</a><a class="ec-text-link" href="about/#team">Review the team section →</a></div>`));
    if(target.dataset.trustDocument){
      const doc=content.documents.find(d=>d.id===target.dataset.trustDocument);if(!doc)return;
      open(envelope('AWAITING DOCUMENT',esc(doc.title),`<p>${esc(doc.description)}</p><div class="ec-document-placeholder"><span>FILE NOT SUPPLIED</span><h3>Document not available</h3><p>The file has not been provided.</p></div><div class="ec-dialog-note">Page updated ${esc(content.updatedAt)}. An uploaded document will still need review; publication alone does not establish accuracy, ownership or regulatory approval.</div><div class="ec-dialog-actions"><a class="ec-text-link" href="terms/">Read access, fees & risks →</a></div>`));
    }
    if(target.dataset.cashScenario){
      const c=EcoBusiness.config,scenarioFor=revenue=>({revenue,electricity:revenue*c.inverseCostRatio}),scenarios={example:scenarioFor(c.exampleReceipts),lower:scenarioFor(c.lowerReceipts)};
      const scenario=scenarios[target.dataset.cashScenario];if(!scenario)return;
      const result=scenario.revenue-scenario.electricity-c.siteCosts-c.serviceCosts-c.reserves;
      document.querySelectorAll('[data-cash-scenario]').forEach(b=>b.setAttribute('aria-pressed',String(b===target)));
      $('#cash-revenue').textContent=money(scenario.revenue);$('#cash-electricity').textContent='−'+money(scenario.electricity);$('#cash-result').textContent=money(result);
      $('#cash-result').classList.toggle('ec-shortfall',result<0);
    }
  });
})();
