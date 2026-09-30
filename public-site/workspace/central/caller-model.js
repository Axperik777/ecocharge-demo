(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('../account-finance.js'):root.EcoFinance);if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoCallerModel=api;})(typeof window==='object'?window:globalThis,finance=>{
 'use strict';
 const steps=['stations','compare','terms','funding','activation','next_contact'];
 function route(mode){return [mode==='draft'?'entry_draft':'entry_new',...steps];}
 function choice(amount,tierId){const capital=finance.parseAmount(amount),tier=finance.tiers.find(t=>t.id===tierId);if(!tier||!Number.isFinite(capital)||!finance.eligible(capital,tierId))return null;return {capital,tierId:tier.id,rate:tier.rate,weekly:finance.weekly(capital,tier.rate),count:tier.count};}
 function comparison(amount,tierId,otherAmount,otherTierId){const base=choice(amount,tierId),alternative=choice(otherAmount,otherTierId);if(!base||!alternative)return null;return {base,alternative,capitalDelta:finance.round(alternative.capital-base.capital),weeklyDelta:finance.round(alternative.weekly-base.weekly)};}
 function context(state={}){const summary=finance.summary(state),plan=summary.draft||summary.active;return {mode:summary.draft?'draft':'new',stage:summary.stage,planKind:summary.draft?'draft':summary.active?'active':null,plan,available:summary.available};}
 return {route,choice,comparison,context};
});
