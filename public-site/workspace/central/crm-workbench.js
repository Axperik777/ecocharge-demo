'use strict';
((root)=>{
 const active=r=>!['not_qualified','do_not_contact'].includes(r.crm?.status);
 function derive(data,now=Date.now()){
  const leads=(data.leads||[]).filter(r=>!r.client_id&&active(r));
  const records=[...leads.map(r=>({...r,kind:'lead'})),...(data.clients||[]).filter(active).map(r=>({...r,kind:'client'}))];
  const end=new Date(now);end.setHours(23,59,59,999);
  const scheduled=records.filter(r=>Number.isFinite(Date.parse(r.crm?.nextContact))).sort((a,b)=>Date.parse(a.crm.nextContact)-Date.parse(b.crm.nextContact));
  const needsCall=r=>r.context?.journey?.route!=='nurture'&&r.journey?.route!=='nurture'&&active(r)&&!Number.isFinite(Date.parse(r.crm?.funnel?.firstAttemptAt))&&!r.duplicateOf&&!r.needsReview;
  const callRecords=[...(data.leads||[]),...(data.clients||[]).filter(c=>!(data.leads||[]).some(l=>l.client_id===c.id))];
  return {open:leads,unassigned:leads.filter(r=>!r.owner),nurture:leads.filter(r=>r.context?.journey?.route==='nurture'),firstCall:leads.filter(needsCall),allFirstCalls:callRecords.filter(needsCall),scheduled,due:scheduled.filter(r=>Date.parse(r.crm.nextContact)<=end.getTime()),overdue:scheduled.filter(r=>Date.parse(r.crm.nextContact)<now),documents:(data.clients||[]).filter(r=>r.identityStatus==='submitted')};
 }
 function filter(leads,scope,now=Date.now()){
  if(scope==='nurture')return leads.filter(r=>r.context?.journey?.route==='nurture'&&active(r));
  if(scope==='fast')return leads.filter(r=>r.context?.journey?.route==='fast'&&active(r));
  if(scope==='first')return derive({leads},now).firstCall;
  if(scope==='unassigned')return derive({leads},now).unassigned;
  if(scope==='callback')return leads.filter(r=>!r.client_id&&active(r)&&r.crm?.nextContact);
  return leads;
 }
 const api={derive,filter};if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoCRMWorkbench=api;
})(typeof window==='object'?window:globalThis);
