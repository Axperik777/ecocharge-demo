'use strict';
// Demo navigation gate only. Production roles must be enforced by the server.
(()=>{
 const staff=document.documentElement.dataset.portal==='staff',key=staff?'staff':'client';
 const go=(surface,path)=>location.replace(window.EcoPlatform.url(surface,path));
 window.PORTAL_ROLE=staff?'admin':'client';
 try{
  let session=JSON.parse(sessionStorage.getItem('ecocharge-entry:'+key)||'null');
  if(staff){
   if(session?.role==='ftd'){go('crm','crm/');return;}
   if(!['admin','staff'].includes(session?.role)){go('crm','team/');return;}
  }else{
   const params=new URL(location).searchParams;
   if(!session&&params.get('guest')==='1')session={role:'client',guest:true,at:Date.now()};
   if(!session&&params.get('preview')==='1'&&sessionStorage.getItem('ecocharge-entry:staff'))session={role:'client',preview:true,at:Date.now()};
   if(session?.role!=='client'){go('account','login/?next='+encodeURIComponent(params.get('tab')||''));return;}
   sessionStorage.setItem('ecocharge-entry:client',JSON.stringify(session));
  }
 }catch{go(staff?'crm':'account',staff?'team/':'login/');}
})();
