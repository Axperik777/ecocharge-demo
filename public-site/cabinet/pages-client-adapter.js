'use strict';
(()=>{
 demo=structuredClone(window.ECO_SHARED_CONTEXT.state);
 ensureClient();ensureManager();ensureTariffs();
 const blocked=async()=>({error:window.EcoPagesMessage(),status:503});
 persist=function(){renderNumbers();return Promise.resolve(null);};
 window.EcoClientAccount={now:()=>Date.now(),refresh:async()=>{},command:blocked,requestWithdrawal:blocked,activate:blocked};
 window.EcoClientAccrual={refresh:async()=>{},closePeriod:async()=>{}};
})();
