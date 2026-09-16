'use strict';
(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const root = new URL('./', document.baseURI);
  const params = new URL(location.href).searchParams;
  const page = document.documentElement.dataset.page;
  const money = n => new Intl.NumberFormat('en-US', {style:'currency',currency:'USD'}).format(n);
  const escape = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arrow = '<svg class="ec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
  const rates = [{id:'single',name:'Single',count:1,rate:3},{id:'network',name:'Network',count:3,rate:5.6},{id:'portfolio',name:'Portfolio',count:5,rate:7.9},{id:'scale',name:'Scale',count:10,rate:11.2}];
  if (page === 'home' && params.has('view')) {
    // Legacy shared links still open the public home, even with a saved session.
    const clean=new URL(location.href);
    for(const key of ['view','tab','preview'])clean.searchParams.delete(key);
    history.replaceState(null,'',clean);
  }
  // Keep first-touch campaign context locally; this demo sends no analytics events.
  try {
    const context = {};
    for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid']) if(params.has(key)) context[key]=params.get(key).slice(0,300);
    if(Object.keys(context).length && !sessionStorage.getItem('ecocharge-attribution')) sessionStorage.setItem('ecocharge-attribution',JSON.stringify(context));
  } catch {}
  const activeNav = $('.ec-nav [aria-current]');
  if(activeNav && activeNav.getBoundingClientRect().right>innerWidth-20) activeNav.parentElement.scrollLeft = Math.max(0,activeNav.offsetLeft-activeNav.parentElement.offsetLeft-20);
  const menu=$('#site-menu'),menuButton=$('#open-site-menu');
  if(menu&&menuButton){
    menuButton.addEventListener('click',()=>{menu.showModal();menuButton.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';$('#close-site-menu').focus();});
    $('#close-site-menu').addEventListener('click',()=>menu.close());
    menu.addEventListener('close',()=>{menuButton.setAttribute('aria-expanded','false');document.body.style.overflow='';menuButton.focus();});
    menu.addEventListener('click',e=>{if(e.target===menu){const r=menu.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)menu.close();}});
  }
  // Avoid competing with an on-screen main action or the mobile keyboard.
  const mobileAction=$('.ec-mobile-action');
  if(mobileAction && 'IntersectionObserver' in window){
    const visibleActions=new Set();
    const refresh=()=>{mobileAction.hidden=visibleActions.size>0||document.activeElement?.matches('input,select,textarea');};
    const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting&&entry.intersectionRatio>=.4)visibleActions.add(entry.target);else visibleActions.delete(entry.target);}refresh();},{threshold:[0,.4],rootMargin:'0px 0px -80px 0px'});
    $$('main a.ec-button[href*="register/"]').forEach(a=>observer.observe(a));
    document.addEventListener('focusin',refresh);document.addEventListener('focusout',()=>setTimeout(refresh,0));
  }

  function wireTabs(selector, callback) {
    const buttons = $$(selector);
    const activate = button => {buttons.forEach(b=>{const selected=b===button;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});callback(button);};
    buttons.forEach((b,i)=>{
      b.addEventListener('click',()=>activate(b));
      b.addEventListener('keydown',e=>{let j;if(['ArrowRight','ArrowDown'].includes(e.key))j=(i+1)%buttons.length;else if(['ArrowLeft','ArrowUp'].includes(e.key))j=(i-1+buttons.length)%buttons.length;else if(e.key==='Home')j=0;else if(e.key==='End')j=buttons.length-1;else return;e.preventDefault();activate(buttons[j]);buttons[j].focus();});
    });
  }
  const preview = $('#preview-panel');
  if(preview){
    let heroAmount=250;
    const original=preview.innerHTML;
    const views={plan:original,stations:`<div class="ec-preview-list"><span aria-hidden="true">⌖</span><div><strong>Clermont, Florida</strong><small>6 DC ports · Public location reference</small></div></div><div class="ec-preview-bottom"><span>Photos, address and a checkable source</span><a class="ec-text-link" href="stations/">Browse stations ${arrow}</a></div>`,documents:`<div class="ec-preview-list"><span aria-hidden="true">▤</span><div><strong>Your participation summary</strong><small>Amount · Plan · Weekly illustration</small></div></div><div class="ec-preview-bottom"><span>Sample available to preview and print</span><a class="ec-text-link" href="resources/">Read the sample ${arrow}</a></div>`};
    function syncHeroAmount(){
      const capital=$('#hero-example-capital'),credit=$('#hero-example-credit');
      if(capital)capital.innerHTML=`$${heroAmount}<span>.00</span>`;
      if(credit){const [whole,cents]=(heroAmount*.03).toFixed(2).split('.');credit.innerHTML=`$${whole}<span>.${cents}</span>`;}
      $$('[data-hero-amount]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.heroAmount)===heroAmount)));
      $('#hero-build-plan').href=new URL(`register/?next=tariffs&amount=${heroAmount}&tier=single`,root);
      const compare=$('#hero-calculation-link');if(compare)compare.href=new URL(`plans/?amount=${heroAmount}&tier=single`,root);
    }
    preview.addEventListener('click',e=>{const b=e.target.closest('[data-hero-amount]');if(b){heroAmount=Number(b.dataset.heroAmount);syncHeroAmount();}});
    wireTabs('[data-preview]',b=>{preview.innerHTML=views[b.dataset.preview];preview.setAttribute('aria-labelledby',b.id);syncHeroAmount();});
    syncHeroAmount();
  }
  const model=$('#model-panel');
  if(model){
    const original=model.innerHTML;
    const views={drivers:original,company:`<span class="ec-kicker">PROPOSED COMPANY INTEREST</span><h2>The demo assumes a 43% company participation.</h2><p>This figure describes an assumed interest in a proposed charging network. The network scope, legal issuer, asset rights and ownership documents still need verification.</p><div class="ec-formula">43% <span>company model assumption</span></div><small>It is not a US market-share claim or proof that the public stations shown belong to EcoCharge.</small>`,account:`<span class="ec-kicker">YOUR WEEKLY ILLUSTRATION</span><h2>One calculation you can follow.</h2><p>The demo multiplies invested capital by your selected weekly plan rate. Charging sessions illustrate the proposed source of revenue, but do not create an additional per-car credit.</p><div class="ec-formula">$250 × 3% = $7.50 <span>one illustrative week</span></div><small>These rates are not verified operating results. No real money is credited.</small>`};
    wireTabs('[data-model]',b=>{model.innerHTML=views[b.dataset.model];model.setAttribute('aria-labelledby',b.id);});
  }

  const amount=$('#public-amount');
  if(amount){
    const cta=$('.ec-calculator-result .ec-button');
    const update=()=>{
      const value=Number(amount.value),valid=amount.value.trim()!==''&&Number.isFinite(value)&&value>=1&&value<=100000&&Math.abs(value*100-Math.round(value*100))<.00001;
      const tier=rates.find(t=>t.id===$('input[name="public-plan"]:checked').value);
      $('#amount-error').textContent=valid?'':'Enter $1–$100,000, with no more than two decimal places.';
      amount.setAttribute('aria-invalid',String(!valid));
      $('#public-weekly').textContent=valid?money(Math.round(value*tier.rate)/100):'—';
      $('#public-equation').textContent=valid?`${money(value)} × ${tier.rate}% per week`:'Choose a valid demo amount to see the illustration.';
      $('#result-plan').textContent=`${tier.name} · ${tier.count} ${tier.count===1?'station':'stations'}`;
      $$('[data-amount]').forEach(b=>b.setAttribute('aria-pressed',String(valid&&Number(b.dataset.amount)===value)));
      cta.setAttribute('aria-disabled',String(!valid));
      if(valid)cta.href=new URL(`register/?next=tariffs&amount=${value}&tier=${tier.id}`,root);else cta.removeAttribute('href');
    };
    amount.addEventListener('input',update);
    $$('[name="public-plan"]').forEach(r=>r.addEventListener('change',update));
    $$('[data-amount]').forEach(b=>b.addEventListener('click',()=>{amount.value=b.dataset.amount;update();}));
    cta.addEventListener('click',e=>{if(cta.getAttribute('aria-disabled')==='true'){e.preventDefault();amount.focus();}});
    const tier=rates.find(t=>t.id===params.get('tier'));if(tier)$(`[name="public-plan"][value="${tier.id}"]`).checked=true;
    const requested=Number(params.get('amount'));if(params.has('amount')&&requested>=1&&requested<=100000&&Number.isFinite(requested))amount.value=String(requested);
    update();
  }

  const search=$('#public-station-search'),state=$('#public-state-filter');
  if(search){
    let imageType='all',limit=12;
    const filter=()=>{const q=search.value.trim().toLowerCase();let count=0,shown=0;$$('[data-station-card]').forEach(card=>{const match=(!state.value||card.dataset.state===state.value)&&(imageType==='all'||card.dataset.kind===imageType)&&card.dataset.search.includes(q);if(match)count++;const show=match&&count<=limit;card.hidden=!show;if(show)shown++;});$('#public-station-count').textContent=`${count} matching ${count===1?'location':'locations'}`;$('#station-empty').hidden=count!==0;$('#load-more-stations').hidden=shown>=count;$('#load-more-stations').textContent=`Show ${Math.min(12,count-shown)} more locations`;$('#station-page-count').textContent=count?`Showing ${shown} of ${count} locations`:'';};
    const reset=()=>{limit=12;filter();};
    search.addEventListener('input',reset);state.addEventListener('change',reset);
    $$('[data-visual-filter]').forEach(b=>b.addEventListener('click',()=>{imageType=b.dataset.visualFilter;$$('[data-visual-filter]').forEach(t=>t.setAttribute('aria-pressed',String(t===b)));reset();}));
    $('#load-more-stations').addEventListener('click',()=>{limit+=12;filter();});
    $('#clear-station-search').addEventListener('click',()=>{search.value='';state.value='';imageType='all';$$('[data-visual-filter]').forEach(t=>t.setAttribute('aria-pressed',String(t.dataset.visualFilter==='all')));reset();search.focus();});
    filter();
  }

  const dialog=$('#site-dialog');
  let lastFocus;
  function openDialog(html){lastFocus=document.activeElement;$('#site-dialog-content').innerHTML=html;dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';$('#close-site-dialog').focus();}
  $('#close-site-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';lastFocus?.focus();});
  let catalogPromise;
  async function catalogs(){
    if(!catalogPromise)catalogPromise=Promise.all(['stations.json','station-photos.json'].map(path=>fetch(new URL(path,root)).then(r=>{if(!r.ok)throw Error('Directory unavailable');return r.json();}))).catch(e=>{catalogPromise=null;throw e;});
    return catalogPromise;
  }
  $$('[data-station]').forEach(b=>b.addEventListener('click',async()=>{
    const id=b.dataset.station;
    openDialog('<div class="ec-dialog-body"><h2 id="site-dialog-title">Loading station details…</h2><p>Please wait while the public record loads.</p></div>');
    try{
      const [directory,photos]=await catalogs();
      if(!dialog.open)return;
      const s=directory.stations.find(s=>s.id===Number(id)),p=photos[id]||window.ECOCHARGE_STATION_VISUALS?.illustrations[id],gallery=[p,...(p.gallery||[])];let index=0;
      $('#site-dialog-content').innerHTML=`<div class="ec-dialog-photo"><img id="gallery-image" src="${escape(p.path)}" alt="${escape(p.alt)}" width="900" height="600"></div><div class="ec-gallery-controls"><button id="gallery-prev" aria-label="Previous photo">←</button><span id="gallery-index" role="status"></span><button id="gallery-next" aria-label="Next photo">→</button></div><div class="ec-photo-credit" id="gallery-credit"></div><div class="ec-dialog-body"><span class="ec-kicker">PUBLIC STATION RECORD · ${s.id}</span><h2 id="site-dialog-title">${escape(s.city)}, ${escape(s.state)}</h2><p>${escape(s.name)}<br>${escape(s.address)}, ${escape(s.city)}, ${escape(s.state)} ${escape(s.zip)}</p><dl class="ec-dialog-specs"><div><dt>Operator listing</dt><dd>${escape(s.network)}</dd></div><div><dt>DC charging ports</dt><dd>${s.ports}</dd></div><div><dt>Maximum listed power</dt><dd>${s.maxKw?s.maxKw+' kW':'Not listed'}</dd></div><div><dt>Directory snapshot</dt><dd>${escape(directory.fetchedAt.slice(0,10))}</dd></div></dl><div class="ec-dialog-note">Public location reference. Ownership and live occupancy are not verified by this demo. ${p.operationalNote?escape(p.operationalNote):'Check the operator for current availability.'}</div><div class="ec-dialog-actions"><a class="ec-button ec-button-outline" href="${escape(s.source)}" target="_blank" rel="noopener">Open public source ↗</a><a class="ec-button" href="register/?next=map">Explore in my demo account ${arrow}</a></div></div>`;
      const renderPhoto=()=>{const item=gallery[index];$('#gallery-image').src=item.path;$('#gallery-image').alt=item.alt;$('#gallery-image').style.objectPosition=item.position||'center';$('#gallery-index').textContent=item.kind==='illustration'?'Concept illustration · not a photograph':`Photo ${index+1} of ${gallery.length}`;$('#gallery-prev').disabled=index===0;$('#gallery-next').disabled=index===gallery.length-1;$('#gallery-credit').innerHTML=item.kind==='illustration'?`EcoCharge concept illustration. This image does not depict the actual location.<br><a href="${escape(item.source)}" target="_blank" rel="noopener">View the public station record ↗</a>`:`Photographed ${escape(item.dateTaken||'date not listed')} · ${escape(item.credit)}<br><a href="${escape(item.source)}" target="_blank" rel="noopener">Original photo ↗</a> · <a href="${escape(item.licenseUrl)}" target="_blank" rel="noopener">License ↗</a>`;};
      $('#gallery-prev').addEventListener('click',()=>{if(index>0){index--;renderPhoto();}});$('#gallery-next').addEventListener('click',()=>{if(index<gallery.length-1){index++;renderPhoto();}});renderPhoto();
    }catch{if(dialog.open)$('#site-dialog-content').innerHTML='<div class="ec-dialog-body"><h2 id="site-dialog-title">The station record could not load.</h2><p>Close this window and open the location again to retry. The photos and addresses on the page remain available.</p></div>';}
  }));
  const documents={
    summary:`<div class="ec-dialog-body"><span class="ec-kicker">DOCUMENT PREVIEW</span><h2 id="site-dialog-title">Sample participation summary</h2><p>A readable example of the plan information. This is not a signed contract or proof of an investment.</p><article class="ec-document-paper"><header><b>ECOCHARGE / ALT-INFRA</b><span>ILLUSTRATIVE SAMPLE</span></header><h3>Participation summary</h3><dl><div><dt>Client</dt><dd>Sample client</dd></div><div><dt>Demo allocation</dt><dd>$250.00 USD</dd></div><div><dt>Selected model</dt><dd>Single · 1 reference station</dd></div><div><dt>Weekly assumption</dt><dd>3%</dd></div><div><dt>One-week illustration</dt><dd>$250 × 3% = $7.50</dd></div><div><dt>Additional per-car credit</dt><dd>None</dd></div></dl><p><b>Proposed model.</b> Driver payments are the proposed source of company revenue. The company’s 43% participation figure is an unverified assumption with no confirmed network scope.</p><p><b>Pending terms.</b> Legal issuer, ownership evidence, eligibility, fees, withdrawal rules, client rights and risk disclosures require verified documentation. The weekly rate is not supported by operating data in this demo.</p><footer>SAMPLE ONLY · NO SIGNATURE · NO REAL TRANSACTION</footer></article><div class="ec-dialog-actions"><button class="ec-button" id="print-summary">Print sample / save as PDF ${arrow}</button><a class="ec-text-link" href="register/?next=documents">Explore account documents ${arrow}</a></div></div>`,
    ownership:`<div class="ec-dialog-body"><span class="ec-kicker">DOCUMENTS NOT YET PROVIDED</span><h2 id="site-dialog-title">Company & ownership verification</h2><p>Before considering a real investment, request documents that connect the legal issuer to the specific business and assets.</p><ul class="ec-review-list"><li>Registered company name, registration number, jurisdiction and authorized representatives.</li><li>The exact network and assets covered by the proposed 43% interest.</li><li>Ownership and participation records showing what the company owns and what rights a client receives.</li><li>Evidence connecting financial reports to the stated network.</li><li>Final offering documents and investor eligibility requirements.</li></ul><div class="ec-dialog-note">Public directory listings, station photos and the ALT-INFRA brand do not establish ownership, endorsement or an investment right.</div></div>`,
    terms:`<div class="ec-dialog-body"><span class="ec-kicker">QUESTIONS BEFORE REAL FUNDING</span><h2 id="site-dialog-title">Understand the terms and risks</h2><p>These conditions are not finalized in the demo. Get written answers before making a real-money decision.</p><ul class="ec-review-list"><li>What supports the weekly rate, and what happens if charging revenue falls short?</li><li>Which operating costs, fees, reserves and taxes reduce distributions?</li><li>Can the invested capital be lost, and which party bears each risk?</li><li>When can funds be withdrawn? Are there locks, limits, delays or charges?</li><li>What legal rights and recourse does a client have?</li><li>Who may participate, and which offering rules apply?</li></ul><div class="ec-dialog-note">The calculator is illustrative. It does not establish guaranteed income, liquidity, insurance or capital protection.</div></div>`
  };
  $$('[data-document]').forEach(b=>b.addEventListener('click',()=>{openDialog(documents[b.dataset.document]);$('#print-summary')?.addEventListener('click',()=>window.print());}));
  function showPrivacy(){if(page==='resources'&&location.hash==='#privacy'){const detail=$('#privacy');if(detail){detail.open=true;requestAnimationFrame(()=>detail.scrollIntoView());}}}
  showPrivacy();window.addEventListener('hashchange',showPrivacy);

  const form=$('#registration-form');
  if(form){
    const next=$('#register-next');
    if(['dashboard','tariffs','map','documents'].includes(params.get('next')))next.value=params.get('next');
    const tier=rates.find(t=>t.id===params.get('tier')),capital=Number(params.get('amount'));
    const intent=tier&&capital>=1&&capital<=100000&&Number.isFinite(capital)?{tierId:tier.id,capital:Math.round(capital*100)/100}:null;
    if(intent){$('#registration-plan').hidden=false;$('#registration-plan').textContent=`Your example: ${tier.name} · ${money(intent.capital)} · ${tier.rate}% per week. No funds have been allocated.`;}
    try{
      const saved=JSON.parse(localStorage.getItem('ecocharge-demo-v1'));
      if(saved?.client){$('#register-name').value=saved.client.name==='Lox'?'':saved.client.name;$('#register-email').value=saved.client.email==='lox@example.com'?'':saved.client.email;}
      if(saved?.registration){form.insertAdjacentHTML('beforebegin','<div class="ec-continue">You already have a demo profile on this device. Your balance, plan and messages will be kept.<a class="ec-button ec-button-outline" href="login/">Continue with demo sign-in '+arrow+'</a></div>');}
    }catch{}
    form.addEventListener('submit',e=>{
      e.preventDefault();const name=$('#register-name').value.trim(),email=$('#register-email').value.trim();
      if(name.length<2){$('#registration-error').textContent='Enter a display name with at least two characters.';$('#register-name').focus();return;}
      if(!form.reportValidity())return;
      try{
        const raw=localStorage.getItem('ecocharge-demo-v1');let demo=raw?JSON.parse(raw):null;
        if(demo&&(!Number.isFinite(demo.balance)||!['portfolio','requests','tickets','activity'].every(k=>Array.isArray(demo[k]))))throw Error('saved-data');
        if(!demo)demo={balance:0,portfolio:[],requests:[],tickets:[],activity:[]};
        demo.client={...demo.client,name,email:email||'demo@example.com',status:demo.client?.status||'Active',note:demo.client?.note||''};
        demo.registration={at:demo.registration?.at||new Date().toISOString(),mode:'local-demo'};
        const attribution=sessionStorage.getItem('ecocharge-attribution');if(attribution&&!demo.attribution)demo.attribution=JSON.parse(attribution);
        sessionStorage.setItem('ecocharge-entry:client',JSON.stringify({role:'client',user:'lox',at:Date.now()}));
        if(intent)sessionStorage.setItem('ecocharge-explore',JSON.stringify(intent));
        localStorage.setItem('ecocharge-demo-v1',JSON.stringify(demo));
        form.querySelector('[type=submit]').disabled=true;
        location.assign(new URL('client/?tab='+next.value,root));
      }catch(error){$('#registration-error').textContent=error.message==='saved-data'?'Existing demo data could not be read. Use client sign-in to review it before creating a profile.':'Browser storage is unavailable. Allow site storage, then try again. No account was created on a server.';}
    });
  }
})();
