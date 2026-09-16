'use strict';
(() => {
  const $=s=>document.querySelector(s);
  const content=window.ECOCHARGE_TRUST_CONTENT;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const open=html=>window.EcoChargePublic.openDialog(html);
  const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
  const envelope=(tag,title,body)=>`<div class="ec-dialog-body"><span class="ec-kicker">${tag}</span><h2 id="site-dialog-title">${title}</h2>${body}</div>`;

  window.EcoChargeTrust={stationEvidence:s=>`<section class="ec-station-evidence" aria-label="Station evidence"><h3>What this record establishes</h3><dl><div><dt>Location & equipment</dt><dd>Public directory record</dd></div><div><dt>Listed operator</dt><dd>${esc(s.network)}</dd></div><div><dt>EcoCharge ownership or affiliation</dt><dd>Not established</dd></div><div><dt>Revenue, costs & distributions</dt><dd>Not connected</dd></div></dl><details><summary>Which operating figures are still missing?</summary><p>Charging receipts, electricity and site costs, service expenses, reserves and distributable proceeds. Missing data is not a zero balance.</p></details><a class="ec-text-link" href="resources/#company-documents">Company & ownership documents →</a></section>`};

  const introduction=()=>open(envelope('WRITTEN INTRODUCTION · PRODUCT DEMO','Understand the proposed model.',`<p>The company introduction video has not been supplied. This written overview is available now.</p><ol class="ec-intro-reading"><li><h3>The proposed business</h3><p>EcoCharge explores participation in an EV-charging business. Driver payments are the proposed revenue source. The legal issuer, asset rights and scope of the 43% company assumption remain unverified.</p></li><li><h3>The account experience</h3><p>Browse public station records, build a sample plan, inspect a weekly calculation and try document and manager workflows.</p></li><li><h3>Before a real commitment</h3><p>Review the legal instrument, company and ownership evidence, operating results, fees, withdrawal conditions and risks. The demo's weekly rates are not verified returns.</p></li></ol><div class="ec-dialog-note">No money is accepted. Demo registration creates a profile on this device; it does not purchase shares or create a secure server account.</div><div class="ec-dialog-actions"><a class="ec-button" href="register/">Explore the demo account →</a><a class="ec-text-link" href="resources/#company-documents">Review the document register →</a></div>`));

  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-trust],[data-trust-document],[data-cash-scenario]');
    if(!target)return;
    if(target.dataset.trust==='intro')introduction();
    if(target.dataset.trust==='contact')open(envelope('TEAM CONTACT · NOT CONNECTED','The real team profile is coming soon.',`<p>The team name, photo, corporate email, messaging channels and meeting calendar have not been supplied. This preview does not contact a live person or reserve a meeting.</p><ul class="ec-review-list"><li>Verified team member and role</li><li>Working hours and time zone</li><li>Corporate email, WhatsApp and Telegram</li><li>A real video meeting calendar</li></ul><div class="ec-dialog-actions"><a class="ec-button" href="register/?next=dashboard">Try the local demo inbox →</a><a class="ec-text-link" href="about/#team">Review the team section →</a></div>`));
    if(target.dataset.trustDocument){
      const doc=content.documents.find(d=>d.id===target.dataset.trustDocument);if(!doc)return;
      open(envelope('AWAITING DOCUMENT',esc(doc.title),`<p>${esc(doc.description)}</p><div class="ec-document-placeholder"><span>FILE NOT SUPPLIED</span><h3>A place for the actual document.</h3><p>The file, issuing party, document date and scope will be shown here when provided. There is no official document to download yet.</p></div><div class="ec-dialog-note">Page updated ${esc(content.updatedAt)}. An uploaded document will still need review; publication alone does not establish accuracy, ownership or regulatory approval.</div><div class="ec-dialog-actions"><a class="ec-text-link" href="terms/">Read access, fees & risks →</a></div>`));
    }
    if(target.dataset.cashScenario){
      const scenarios={example:{revenue:1000,electricity:350},lower:{revenue:600,electricity:210},offline:{revenue:0,electricity:0}};
      const scenario=scenarios[target.dataset.cashScenario];if(!scenario)return;
      const result=scenario.revenue-scenario.electricity-150-120-80;
      document.querySelectorAll('[data-cash-scenario]').forEach(b=>b.setAttribute('aria-pressed',String(b===target)));
      $('#cash-revenue').textContent=money(scenario.revenue);$('#cash-electricity').textContent='−'+money(scenario.electricity);$('#cash-result').textContent=money(result);
      $('#cash-result').classList.toggle('ec-shortfall',result<0);
      $('#cash-explanation').textContent=result<0?`A ${money(-result)} shortfall remains in this example. No funds are available for distribution. The actual responsibility for losses must be set out in the agreement.`:`The ${money(result)} balance is not a client payout. Company and client distribution rules are not defined.`;
    }
  });
})();
