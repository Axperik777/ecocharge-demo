'use strict';
(() => {
  const $=s=>document.querySelector(s);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);

  window.EcoChargeTrust={stationEvidence:s=>`<section class="ec-station-evidence" aria-label="Station details"><h3>Charging location</h3><dl><div><dt>Location & equipment</dt><dd>Source-linked location record</dd></div><div><dt>Charging format</dt><dd>DC fast charging</dd></div><div><dt>Revenue, costs & account result</dt><dd>Project reporting</dd></div></dl><details><summary>What appears in project reporting?</summary><p>Charging revenue, electricity and site costs, service expenses, reserves and the account result are recorded together for the applicable project period.</p></details><a class="ec-text-link" href="resources/">Company & project documents →</a></section>`};

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
