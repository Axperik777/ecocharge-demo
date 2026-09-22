// Relationship claims are supplied by the project team, not inferred from a
// company's public website. Keep the review status visible until evidence exists.
const companies = [
  {name:'Walmart', sector:'Retail & home essentials', url:'https://corporate.walmart.com/'},
  {name:'Ford', sector:'Automotive', url:'https://corporate.ford.com/'},
  {name:'General Motors', sector:'Automotive', detail:'Chevrolet · Cadillac', url:'https://www.gm.com/'},
  {name:'Apple', sector:'Consumer electronics', url:'https://www.apple.com/'},
  {name:'Microsoft', sector:'Software & technology', url:'https://www.microsoft.com/en-us'},
  {name:'Amazon', sector:'Online retail & delivery', url:'https://www.aboutamazon.com/'},
  {name:'Tesla', sector:'Electric vehicles & energy', url:'https://www.tesla.com/'},
  {name:'NVIDIA', sector:'AI & accelerated computing', url:'https://www.nvidia.com/en-us/'},
  {name:'AMEC', sector:'Semiconductor manufacturing equipment', detail:'Advanced Micro-Fabrication Equipment Inc.', url:'https://www.amec-inc.com/'}
];
const logoFiles=['walmart.svg','ford.svg','generalmotors.svg','apple.svg','microsoft.png','amazon.svg','tesla.svg','nvidia.svg','amec.png'];

function renderPartners({esc, kicker, link}) {
  return `<section class="ec-wrap f-section r-partners" id="partners" aria-labelledby="partners-heading" aria-describedby="partners-status">
    <div class="r-partners-heading"><div>${kicker('PROJECT RELATIONSHIPS')}<h2 id="partners-heading">Our partners</h2></div><span class="r-partners-status">Documentation pending</span></div>
    <p id="partners-status">List provided by the EcoCharge team. Partnership scope and supporting documents are pending review.</p>
    <ul class="r-partner-grid" role="list">${companies.map((company,index)=>`<li><a class="r-partner" href="${esc(company.url)}" target="_blank" rel="noopener noreferrer"><span class="v-partner-logo v-logo-${logoFiles[index].split('.')[0]}"><img src="assets/partners/${logoFiles[index]}" width="140" height="56" loading="lazy" decoding="async" alt=""></span><strong translate="no">${esc(company.name)}</strong><span class="r-partner-sr">Official website (opens in a new tab)</span></a></li>`).join('')}</ul>
    <details class="v-partner-profiles"><summary>Company profiles & sources</summary><ul>${companies.map(company=>`<li><strong translate="no">${esc(company.name)}</strong><span>${esc(company.sector)}</span>${company.detail?`<small translate="no">${esc(company.detail)}</small>`:''}</li>`).join('')}</ul><p>Logos identify the companies. They do not verify a relationship or endorsement.</p><a href="assets/partners/sources.json" target="_blank" rel="noopener">Logo sources ↗</a></details>
    <div class="r-partners-footer">${link('Company & documents','resources/#company-documents')}</div>
  </section>`;
}

module.exports={companies, renderPartners};
