// Team-provided claims stay attributed. Public NVIDIA pages do not verify
// EcoCharge's equipment, capacity, capabilities or partnership status.
module.exports=({icon,kicker})=>`<section class="ec-wrap v-technology" id="technology" aria-labelledby="technology-heading">
  <div class="v-technology-copy">
    ${kicker('ECO CHARGE · AI & COMPUTE')}
    <h2 id="technology-heading"><span translate="no">ECO AI</span><br>Analysis & forecasting.</h2>
    <p>ECO AI is the project's analytics concept: connect charging-session data, explore station demand and support operating decisions.</p>
    <span class="v-technology-status">Team-provided overview · Technical details pending</span>
    <div class="v-technology-actions"><a class="ec-button" href="client/?guest=1&tab=dashboard&contact=manager">Ask about ECO AI ${icon('chat')}</a><a class="ec-text-link" href="https://www.nvidia.com/en-us/data-center/" target="_blank" rel="noopener noreferrer">NVIDIA computing technology ↗</a></div>
    <p class="v-technology-note">AI concept for the academic project. No live AI service or computing cluster is connected to this website.</p>
  </div>
  <div class="v-technology-panel">
    <div class="v-technology-panel-heading"><span>TECHNOLOGY OVERVIEW</span><span class="v-ai-chip" aria-hidden="true">AI</span></div>
    <details class="v-tech-detail" open><summary><span class="v-tech-icon">${icon('grid')}</span><span>Charging-session analysis</span><span class="v-tech-expand" aria-hidden="true">+</span></summary><p>The concept groups sessions by time, energy use and location to help explain operating activity.</p></details>
    <details class="v-tech-detail"><summary><span class="v-tech-icon">${icon('bolt')}</span><span>Station demand forecasting</span><span class="v-tech-expand" aria-hidden="true">+</span></summary><p>Demand forecasting is a proposed use case. This project does not generate or validate live forecasts.</p></details>
    <details class="v-tech-detail" open><summary><span class="v-tech-icon">${icon('file')}</span><span>Compute & NVIDIA hardware</span><span class="v-tech-expand" aria-hidden="true">+</span></summary><p>NVIDIA accelerated computing is an industry reference for the concept. No equipment purchase, deployment or partnership is established by this project.</p></details>
    <div class="v-technology-vendor"><img src="assets/partners/nvidia.svg" width="72" height="48" loading="lazy" alt=""><div><strong translate="no">NVIDIA</strong><small>Computing technology reference</small></div></div>
  </div>
</section>`;
