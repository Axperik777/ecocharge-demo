// Relationship claims are supplied by the project team, not inferred from a
// company's public website. Keep the review status visible until evidence exists.
const companies = [
  {name:'Walmart', sector:'Retail & home essentials', url:'https://corporate.walmart.com/'},
  {name:'Coca-Cola', sector:'Beverages', url:'https://www.coca-colacompany.com/'},
  {name:'McDonald’s', sector:'Restaurants', url:'https://corporate.mcdonalds.com/corpmcd/home.html'},
  {name:'Ford', sector:'Automotive', url:'https://corporate.ford.com/'},
  {name:'General Motors', sector:'Automotive', detail:'Chevrolet · Cadillac', url:'https://www.gm.com/'},
  {name:'Apple', sector:'Consumer electronics', url:'https://www.apple.com/'},
  {name:'Microsoft', sector:'Software & technology', url:'https://www.microsoft.com/en-us'},
  {name:'Amazon', sector:'Online retail & delivery', url:'https://www.aboutamazon.com/'},
  {name:'Disney', sector:'Entertainment & theme parks', url:'https://thewaltdisneycompany.com/'},
  {name:'Nike', sector:'Sportswear & footwear', url:'https://about.nike.com/en/'},
  {name:'Tesla', sector:'Electric vehicles & energy', url:'https://www.tesla.com/'}
];

function renderPartners({esc, kicker, link}) {
  return `<section class="ec-wrap f-section r-partners" id="partners" aria-labelledby="partners-heading" aria-describedby="partners-status">
    <div class="r-partners-heading"><div>${kicker('PROJECT RELATIONSHIPS')}<h2 id="partners-heading">Our partners</h2></div><span class="r-partners-status">Documentation pending</span></div>
    <p id="partners-status">List provided by the EcoCharge team. Partnership scope and supporting documents are pending review.</p>
    <ul class="r-partner-grid" role="list">${companies.map(company=>`<li><a class="r-partner" href="${esc(company.url)}" target="_blank" rel="noopener noreferrer"><span class="r-partner-sector">${esc(company.sector)}</span><strong translate="no">${esc(company.name)}</strong>${company.detail?`<span class="r-partner-detail" translate="no">${esc(company.detail)}</span>`:''}<span class="r-partner-visit">Official website <span aria-hidden="true">↗</span><span class="r-partner-sr"> (opens in a new tab)</span></span></a></li>`).join('')}</ul>
    <div class="r-partners-footer">${link('Company & documents','resources/#company-documents')}</div>
  </section>`;
}

module.exports={companies, renderPartners};
