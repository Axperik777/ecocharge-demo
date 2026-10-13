'use strict';
(() => {
  const $=s=>document.querySelector(s);
  const content=window.ECOCHARGE_TRUST_CONTENT;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const open=html=>window.EcoChargePublic.openDialog(html);
  const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
  const envelope=(tag,title,body)=>`<div class="ec-dialog-body"><span class="ec-kicker">${tag}</span><h2 id="site-dialog-title">${title}</h2>${body}</div>`;

  window.EcoChargeTrust={stationEvidence:s=>`<section class="ec-station-evidence" aria-label="Station evidence"><h3>Station data</h3><dl><div><dt>Location & equipment</dt><dd>Public directory record</dd></div><div><dt>Listed operator</dt><dd>${esc(s.network)}</dd></div><div><dt>Revenue, costs & distributions</dt><dd>Project reporting</dd></div></dl><details><summary>What belongs in the operating report?</summary><p>Charging revenue, electricity and site costs, service expenses, reserves and distributable proceeds are recorded separately from the public location directory.</p></details><a class="ec-text-link" href="resources/#company-documents">Company & project documents →</a></section>`};

  const introduction=()=>open(envelope('WRITTEN INTRODUCTION · EcoGrid','Company overview',`<ol class="ec-intro-reading"><li><h3>The operating business</h3><p>EcoGrid develops Solar, Charge and Compute as three separate directions built on one engineering and operating foundation.</p></li><li><h3>Your account</h3><p>Follow the selected project, documents, account operations and conversation with the manager responsible for the next step.</p></li><li><h3>Before signing or paying</h3><p>Review the project proposal, agreement, operating economics, fees, access rules and risks. The signed project documents govern the commercial relationship.</p></li></ol><div class="ec-dialog-note">Website payments open after the applicable agreement, official payment instructions and payment-provider connection.</div><div class="ec-dialog-actions"><a class="ec-button" href="register/">Open your account →</a><a class="ec-text-link" href="resources/#company-documents">Review the document register →</a></div>`));

  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-trust],[data-trust-document],[data-cash-scenario]');
    if(!target)return;
    if(target.dataset.trust==='intro')introduction();
    if(target.dataset.trust==='contact')open(envelope('TEAM CONTACT','Contact your assigned manager',`<p>Your client account keeps the selected project, documents and conversation with the manager responsible for the next step.</p><div class="ec-dialog-actions"><a class="ec-button" href="login/?next=dashboard">Open your account →</a><a class="ec-text-link" href="about/#team">How the team supports you →</a></div>`));
    if(target.dataset.trustDocument){
      const doc=content.documents.find(d=>d.id===target.dataset.trustDocument);if(!doc)return;
      open(envelope('DOCUMENT STATUS',esc(doc.title),`<p>${esc(doc.description)}</p><div class="ec-document-placeholder"><span>PREPARING FOR PUBLICATION</span><h3>Final file in preparation</h3><p>The approved document will appear in this register.</p></div><div class="ec-dialog-actions"><a class="ec-text-link" href="terms/">Read access, fees & risks →</a></div>`));
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
