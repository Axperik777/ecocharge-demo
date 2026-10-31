'use strict';
// GitHub Pages uses the isolated browser workspace; no external lead API.
(() => {
 if(!window.ECO_PLATFORM_CONFIG?.websiteOnly)return;
 const base=new URL('./',document.baseURI);
 function canonicalizeLanguage(){const current=new URL(location.href);if(!current.searchParams.has('lang'))return;current.searchParams.delete('lang');history.replaceState(history.state,'',current);}
 function links(root){
  for(const a of [...(root.matches?.('a[href]')?[root]:[]),...(root.querySelectorAll?.('a[href]')||[])]){
   const u=new URL(a.getAttribute('href'),base);if(u.origin!==base.origin||!u.pathname.startsWith(base.pathname))continue;
   const rel=u.pathname.slice(base.pathname.length);if(/^(?:client|login|register)(?:\/|$)/.test(rel)){const target=rel.startsWith('register')?'workspace/register/':'workspace/login/',next=new URL(target+u.search,base);next.searchParams.set('lang','en');a.href=next.href;}
   if(/^(?:team|staff|crm)(?:\/|$)/.test(rel))a.href=new URL('workspace/crm/?role=admin',base).href;
  }
 }
 function update(){
  links(document);
 }
 canonicalizeLanguage();update();
 new MutationObserver(rows=>rows.forEach(row=>row.addedNodes.forEach(links))).observe(document.body,{childList:true,subtree:true});
})();
