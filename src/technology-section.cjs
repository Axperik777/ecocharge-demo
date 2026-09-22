// Team-provided claims stay attributed. Public NVIDIA pages do not verify
// EcoCharge's equipment, capacity, capabilities or partnership status.
module.exports=({icon,kicker})=>`<section class="ec-wrap v-technology" id="technology" aria-labelledby="technology-heading">
  <div class="v-technology-copy">
    ${kicker('ECO CHARGE · AI & COMPUTE')}
    <h2 id="technology-heading"><span translate="no">ECO AI</span><br>Analysis & forecasting.</h2>
    <p>ECO AI analyzes charging sessions and forecasts station demand, according to the EcoCharge team. The team reports its own computing resources using NVIDIA processors.</p>
    <span class="v-technology-status">Team-provided overview · Technical details pending</span>
    <div class="v-technology-actions"><a class="ec-button" href="client/?guest=1&tab=dashboard&contact=manager">Ask about ECO AI ${icon('chat')}</a><a class="ec-text-link" href="https://www.nvidia.com/en-us/data-center/" target="_blank" rel="noopener noreferrer">NVIDIA computing technology ↗</a></div>
    <p class="v-technology-note">This website is a product demo. ECO AI and the team's computing infrastructure are not connected to it.</p>
  </div>
  <div class="v-technology-panel">
    <div class="v-technology-panel-heading"><span>TECHNOLOGY OVERVIEW</span><span class="v-ai-chip" aria-hidden="true">AI</span></div>
    <details class="v-tech-detail" open><summary><span class="v-tech-icon">${icon('grid')}</span><span>Charging-session analysis</span><span class="v-tech-expand" aria-hidden="true">+</span></summary><p>ECO AI analyzes charging-session data. A working demonstration and validation results will be added with the technical documents.</p></details>
    <details class="v-tech-detail"><summary><span class="v-tech-icon">${icon('bolt')}</span><span>Station demand forecasting</span><span class="v-tech-expand" aria-hidden="true">+</span></summary><p>ECO AI forecasts station demand. Forecast horizons and measured accuracy will be provided with documentation.</p></details>
    <details class="v-tech-detail" open><summary><span class="v-tech-icon">${icon('file')}</span><span>Compute & NVIDIA hardware</span><span class="v-tech-expand" aria-hidden="true">+</span></summary><dl class="v-tech-specs"><div><dt>NVIDIA processor model</dt><dd aria-label="Not specified">—</dd></div><div><dt>Computing capacity</dt><dd aria-label="Not specified">—</dd></div></dl><p>Hardware specifications and supporting relationship documents will be added after review.</p></details>
    <div class="v-technology-vendor"><img src="assets/partners/nvidia.svg" width="72" height="48" loading="lazy" alt=""><div><strong translate="no">NVIDIA</strong><small>Hardware brand named by the team</small></div></div>
  </div>
</section>`;
