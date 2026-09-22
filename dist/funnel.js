'use strict';
(() => {
  const $=s=>document.querySelector(s),track=(...args)=>window.EcoChargeFunnel?.track(...args);
  const calc=$('#station-economics');
  if(calc){
    const fmt=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}),num=new Intl.NumberFormat('en-US');
    const read=id=>Number($('#econ-'+id).value);
    const scenarios={quiet:[5,30,.45,.18,3000],example:[20,30,.45,.18,3000],busy:[45,30,.45,.18,3000]};
    const fields=['sessions','energy','price','cost','fixed'];
    let timer;
    function render(){
      const sessions=read('sessions'),energy=read('energy'),price=read('price'),cost=read('cost'),fixed=read('fixed');
      const kwh=sessions*energy*30,revenue=kwh*price,electricity=kwh*cost,result=revenue-electricity-fixed;
      for(const [name,value] of Object.entries({sessions:num.format(sessions),energy:energy+' kWh',price:fmt.format(price),cost:fmt.format(cost),fixed:fmt.format(fixed)}))$('#econ-'+name+'-value').textContent=value;
      $('#econ-total-sessions').textContent=num.format(sessions*30);$('#econ-total-energy').textContent=num.format(kwh);
      $('#econ-receipts').textContent=fmt.format(revenue);$('#econ-electricity').textContent='−'+fmt.format(electricity);$('#econ-other').textContent='−'+fmt.format(fixed);
      $('#econ-result').textContent=fmt.format(result);$('#econ-result-label').textContent=result<0?'Operating shortfall':result===0?'Operating break-even':'Operating surplus';
      $('.f-econ-bottom').dataset.negative=String(result<0);
      $('#econ-explanation').textContent=result<0?'Receipts do not cover the assumed costs. This example leaves no operating surplus to distribute.':result===0?'Receipts exactly cover the assumed costs. There is no operating surplus before other obligations.':'This operating surplus is not a client payout. An agreement would determine any distribution.';
      const total=Math.max(revenue,electricity+fixed,1);
      for(const [id,value] of [['electricity',electricity],['fixed',fixed],['result',Math.max(0,result)]])$('#econ-bar-'+id).style.width=(value/total*100)+'%';
    }
    calc.addEventListener('input',e=>{if(!e.target.matches('input[type=range]'))return;calc.querySelectorAll('[data-econ-scenario]').forEach(b=>b.setAttribute('aria-pressed','false'));render();clearTimeout(timer);timer=setTimeout(()=>track('model_explored',{page:'inside-a-station',scenario:'custom'}),500);});
    calc.addEventListener('click',e=>{const b=e.target.closest('[data-econ-scenario]');if(!b)return;const data=scenarios[b.dataset.econScenario];fields.forEach((name,i)=>$('#econ-'+name).value=data[i]);calc.querySelectorAll('[data-econ-scenario]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render();track('model_explored',{page:'inside-a-station',scenario:b.dataset.econScenario});});
    render();
  }
  document.addEventListener('click',e=>{
    const station=e.target.closest('[data-station]');if(station)track('station_viewed',{stationId:Number(station.dataset.station)});
    const link=e.target.closest('a');if(!link)return;
    if(link.href.includes('/terms/'))track('terms_viewed',{page:'terms'});
  });
  if($('#registration-form')){
    try{
      const pending=JSON.parse(sessionStorage.getItem('ecocharge-plan-review')||'null');
      if(pending&&['single','network','portfolio','scale'].includes(pending.tierId)&&Number.isFinite(pending.capital)&&Array.isArray(pending.stationIds)){
        const box=document.createElement('div');box.className='f-registration-selection';
        const title=document.createElement('strong');title.textContent='Your example is ready to save';
        const detail=document.createElement('div');detail.textContent=`${pending.stationIds.length} ${pending.stationIds.length===1?'reference station':'reference stations'} · ${new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(pending.capital)}`;
        const note=document.createElement('p');note.textContent='Your selection stays with you. This creates a local demo profile, not an investment or a server account.';
        box.append(title,detail,note);$('#registration-form').before(box);
        $('.ec-registration-card h2').textContent='Save your demo plan';
        $('#registration-form [type=submit]').firstChild.textContent='Save plan & open my account ';
      }
    }catch{}
  }
})();
