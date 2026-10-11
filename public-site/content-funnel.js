'use strict';
// Local demo attribution for public guides. Stores only bounded content identifiers in this browser tab.
(() => {
  const storageKey='ecogrid-content-context-v1',eventKey='ecogrid-content-events-v1';
  const root=document.documentElement;
  const paths=new Set(['direct_project','community_interest','academy_education']);
  const slug=(value,max=80)=>{const text=String(value||'').trim().toLowerCase();return text.length<=max&&/^[a-z0-9][a-z0-9-]*$/.test(text)?text:'';};
  const iso=value=>{const text=String(value||'');return text.length<=32&&!Number.isNaN(Date.parse(text))?new Date(text).toISOString():'';};
  const project=value=>['charge','solar','mining','academy','resources','guides'].includes(value)?value:'';
  const clean=value=>{
    if(!value||typeof value!=='object')return null;
    const out={},fields={entryId:slug(value.entryId),lastId:slug(value.lastId),entryCluster:slug(value.entryCluster,60),cluster:slug(value.cluster,60),ctaId:slug(value.ctaId),ctaPosition:slug(value.ctaPosition,40),entryProject:project(value.entryProject),targetProject:project(value.targetProject),locale:['en','ru'].includes(value.locale)?value.locale:'',acquisitionPath:paths.has(value.acquisitionPath)?value.acquisitionPath:''};
    for(const [key,item]of Object.entries(fields))if(item)out[key]=item;
    if(typeof value.articleAssist==='boolean')out.articleAssist=value.articleAssist;
    for(const key of ['entryAt','lastAt','ctaAt']){const item=iso(value[key]);if(item)out[key]=item;}
    return out.entryId||out.lastId||out.acquisitionPath?out:null;
  };
  const read=()=>{try{return clean(JSON.parse(sessionStorage.getItem(storageKey)||'null'));}catch{return null;}};
  const write=value=>{const next=clean(value);if(!next)return null;try{sessionStorage.setItem(storageKey,JSON.stringify(next));}catch{}return next;};
  const marks=()=>{try{const value=JSON.parse(sessionStorage.getItem(eventKey)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{};}catch{return {};}};
  const mark=id=>{const value=marks();if(value[id])return false;value[id]=true;try{sessionStorage.setItem(eventKey,JSON.stringify(value));}catch{}return true;};
  const now=()=>new Date().toISOString();
  const details=context=>({page:'guides',contentId:context.lastId,cluster:context.cluster,targetProject:context.targetProject,acquisitionPath:context.acquisitionPath,articleAssist:context.articleAssist});
  const track=(name,props)=>window.EcoChargeFunnel?.track(name,props);
  const carryToRegistration=link=>{if(!link||!state)return;try{const url=new URL(link.href,document.baseURI);if(!/(?:^|\/)register\/$/.test(url.pathname))return;const values={acquisition_path:state.acquisitionPath,content_entry:state.entryId,content_last:state.lastId,content_entry_cluster:state.entryCluster,content_cluster:state.cluster,content_entry_project:state.entryProject,content_target_project:state.targetProject,content_locale:state.locale,content_entry_at:state.entryAt,content_last_at:state.lastAt,article_assist:state.articleAssist===true?'1':'0'};for(const[key,value]of Object.entries(values))if(value)url.searchParams.set(key,value);link.href=url.href;}catch{}};
  const currentUrl=(()=>{try{return new URL(location.href);}catch{return null;}})();
  const requestedLocale=currentUrl?.searchParams.get('lang')||'';
  const localeSource=String(requestedLocale||root.lang||'').toLowerCase();
  const current={id:slug(root.dataset.contentId),cluster:slug(root.dataset.contentCluster,60),targetProject:project(root.dataset.contentProject),acquisitionPath:paths.has(root.dataset.contentPath)?root.dataset.contentPath:'',locale:localeSource.startsWith('ru')?'ru':localeSource.startsWith('en')?'en':''};
  let state=read();
  const route=String(root.dataset.route||'').replace(/^\/+|\/+$/g,'');
  const requestedPath=currentUrl&&paths.has(currentUrl.searchParams.get('acquisition_path'))?currentUrl.searchParams.get('acquisition_path'):'';
  const routePath=route.startsWith('participate/')||currentUrl?.searchParams.get('journey')==='fast'?'direct_project':route==='club'?'community_interest':route==='academy'||route==='app'?'academy_education':'';
  const landingPath=requestedPath||current.acquisitionPath||routePath;
  if(!state&&landingPath)state=write({acquisitionPath:landingPath,articleAssist:false,locale:current.locale});
  if(current.id){
    const at=now();
    const acquisitionPath=state?.acquisitionPath||current.acquisitionPath||'academy_education';
    state=write({...state,acquisitionPath,articleAssist:true,entryId:state?.entryId||current.id,entryCluster:state?.entryCluster||current.cluster,entryProject:state?.entryProject||current.targetProject,entryAt:state?.entryAt||at,lastId:current.id,cluster:current.cluster||state?.cluster,targetProject:current.targetProject||state?.targetProject,locale:current.locale||state?.locale,lastAt:at});
    if(state&&mark('view:'+current.id))track('article_viewed',details(state));
    let engaged=false;
    const engage=()=>{if(engaged||!state||!mark('engaged:'+current.id))return;engaged=true;track('article_engaged',details(state));};
    const onScroll=()=>{const page=Math.max(document.body?.scrollHeight||0,root.scrollHeight||0),viewport=window.innerHeight||0;if(page>0&&(window.scrollY+viewport)/page>=.5)engage();};
    window.addEventListener?.('scroll',onScroll,{passive:true});
    setTimeout(engage,45000);
  }
  document.addEventListener?.('click',event=>{
    carryToRegistration(event.target?.closest?.('a[href]'));
    const link=event.target?.closest?.('[data-content-cta]');
    if(!link||!state)return;
    const ctaId=slug(link.dataset.contentCta),ctaPosition=slug(link.dataset.ctaPosition,40),targetProject=project(link.dataset.contentProject)||state.targetProject;
    if(!ctaId)return;
    state=write({...state,ctaId,ctaPosition,targetProject,ctaAt:now()});
    track('article_cta_clicked',{...details(state),ctaId,ctaPosition});
  });
  window.EcoContentFunnel={context:()=>{const value=read();return value?{...value}:null;}};
})();
