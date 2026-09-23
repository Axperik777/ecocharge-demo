'use strict';
(()=>{
 const config=window.ECO_PLATFORM_CONFIG||{},base=new URL('./',document.baseURI),app=document.documentElement.dataset.app||'website';
 const keys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','gclid','landing_id','landing_host','lead_route'];
 const bases={website:config.websiteBase||base.href,account:config.accountBase||base.href,crm:config.crmBase||base.href};
 const params=new URL(location).searchParams;
 let attribution={};try{const saved=JSON.parse(sessionStorage.getItem('ecocharge-attribution')||'{}');if(saved&&typeof saved==='object')for(const key of keys)if(typeof saved[key]==='string')attribution[key]=saved[key].slice(0,300);}catch{}
 for(const key of keys)if(!attribution[key]&&params.has(key))attribution[key]=params.get(key).slice(0,300);
 if(app==='website'){attribution.landing_id ||= config.landingId||'main';attribution.landing_host ||= location.host;attribution.lead_route ||= 'website';}
 try{if(Object.keys(attribution).length)sessionStorage.setItem('ecocharge-attribution',JSON.stringify(attribution));}catch{}
 function target(path){const name=path.replace(/^\.\//,'').split(/[/?#]/)[0];if(['client','login','register'].includes(name))return 'account';if(['staff','team','crm'].includes(name))return 'crm';return 'website';}
 function url(surface,path=''){
  if(!Object.hasOwn(bases,surface))throw Error('Unknown app destination');const next=new URL(path,bases[surface]);
  if(next.origin!==new URL(bases[surface]).origin)throw Error('Unexpected app destination');
  let language=params.get('lang');try{language=window.EcoLocale?.language||language||localStorage.getItem('ecocharge-locale');}catch{}
  if(['en','ru'].includes(language))next.searchParams.set('lang',language);
  if(surface==='account')for(const key of keys)if(attribution[key]&&!next.searchParams.has(key))next.searchParams.set(key,attribution[key]);
  return next.href;
 }
 function rewrite(link){
  const ref=link.getAttribute('href');if(!ref||ref.startsWith('#')||link.hasAttribute('download')||/^(mailto:|tel:|javascript:)/i.test(ref))return;
  let u;try{u=new URL(ref,base);}catch{return;}
  // Exported cross-app links are already absolute; still attach attribution and current language.
  const roots=[base,...Object.values(bases).map(v=>new URL(v))].sort((a,b)=>b.pathname.length-a.pathname.length);
  const source=roots.find(r=>u.origin===r.origin&&u.pathname.startsWith(r.pathname));if(!source)return;
  const path=u.pathname.slice(source.pathname.length);if(/\.[a-z0-9]+$/i.test(path)&&!path.endsWith('index.html'))return;
  const next=url(target(path),path+u.search+u.hash);if(link.href!==next)link.href=next;
 }
 const scan=root=>{if(root?.matches?.('a[href]'))rewrite(root);root?.querySelectorAll?.('a[href]').forEach(rewrite);};
 function ready(){scan(document);const observer=new MutationObserver(rows=>rows.forEach(row=>row.addedNodes.forEach(scan)));observer.observe(document.body,{childList:true,subtree:true});}
 document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(a)rewrite(a);},true);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
 window.EcoPlatform={url,target,attribution:()=>({...attribution}),bases:Object.freeze({...bases})};
})();
