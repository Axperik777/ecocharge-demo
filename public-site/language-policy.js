(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoLanguagePolicy=api;})(typeof window==='object'?window:globalThis,()=>({
 allowRussian:({app}={})=>app==='crm',
 resolve(requested,context){return requested==='ru'&&this.allowRussian(context)?'ru':'en';}
}));
