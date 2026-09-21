// A rounded C with a separate conducting bar reads as an E/C monogram.
const paths='<path class="charge-shell" d="M53 9H29C15.75 9 5 19.75 5 33s10.75 24 24 24h24V46H29c-7.18 0-13-5.82-13-13s5.82-13 13-13h24Z"/><path class="charge-core" d="M28 28h29l-6 10H28Z"/>';
function brand({dark=false,portal=false}={}){
  return `<a class="${portal?'brand ':''}charge-brand" href="./" aria-label="EcoCharge home"${dark?' data-brand-theme="dark"':''}><svg class="charge-symbol" viewBox="0 0 64 64" aria-hidden="true">${paths}</svg><span class="charge-wordmark" translate="no">ECO <span>CHARGE</span><small>AN ALT-INFRA PROJECT</small></span></a>`;
}
const favicon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="18" fill="#0b2330"/><g transform="translate(8 7)" fill="#f3f8f6">${paths.replace('class="charge-core"','fill="#d0f279"')}</g></svg>`;
module.exports={brand,favicon};
