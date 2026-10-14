'use strict';
(() => {
  const $=s=>document.querySelector(s);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);

  window.EcoChargeTrust={stationEvidence:s=>`<section class="ec-station-evidence" aria-label="Station evidence"><h3>Station data</h3><dl><div><dt>Location & equipment</dt><dd>Public directory record</dd></div><div><dt>Listed operator</dt><dd>${esc(s.network)}</dd></div><div><dt>Revenue, costs & distributions</dt><dd>Project reporting</dd></div></dl><details><summary>What belongs in the operating report?</summary><p>Charging revenue, electricity and site costs, service expenses, reserves and distributable proceeds are recorded separately from the public location directory.</p></details><a class="ec-text-link" href="resources/#company-documents">Company & project documents →</a></section>`};

  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-cash-scenario]');
    if(!target)return;
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
