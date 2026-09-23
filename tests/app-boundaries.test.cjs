const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const website=require('../apps/website/app.cjs'),account=require('../apps/account/app.cjs'),crm=require('../apps/crm/app.cjs');
test('each application owns a disjoint set of routes',()=>{
 const publicRoutes=Object.keys(website.render()),accountRoutes=Object.keys(account.render()),crmRoutes=Object.keys(crm.render());
 assert.deepEqual(accountRoutes.sort(),['client','login','register']);assert.deepEqual(crmRoutes.sort(),['crm','staff','team']);
 assert.equal(new Set([...publicRoutes,...accountRoutes,...crmRoutes]).size,publicRoutes.length+accountRoutes.length+crmRoutes.length);
 assert.doesNotMatch(website.render()[''],/href="team\//);
});
test('all six landing profiles produce distinct hero headlines',()=>{
 const variants=require('../apps/website/variants.json'),headings=Object.keys(variants).map(variant=>website.render({variant})[''].match(/<h1>(.*?)<\/h1>/s)[1]);
 assert.equal(headings.length,6);assert.equal(new Set(headings).size,6);assert.throws(()=>website.render({variant:'unknown'}));
});
test('landing routes point to central apps and carry only allowed attribution',()=>{
 const saved=new Map(),listeners={},config={websiteBase:'https://landing.example/',accountBase:'https://workspace.example/',crmBase:'https://workspace.example/',landingId:'stations'};
 const context={URL,location:new URL('https://landing.example/?utm_source=meta&utm_campaign=campaign&fbclid=click&phone=private&lang=ru'),window:{ECO_PLATFORM_CONFIG:config},document:{baseURI:'https://landing.example/',documentElement:{dataset:{app:'website'}},readyState:'loading',addEventListener:(key,fn)=>listeners[key]=fn},sessionStorage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)},localStorage:{getItem:()=>null}};
 vm.runInNewContext(fs.readFileSync('dist/platform.js','utf8'),context);
 const api=context.window.EcoPlatform,next=new URL(api.url('account','register/'));
 assert.equal(next.origin,'https://workspace.example');assert.equal(next.pathname,'/register/');assert.equal(next.searchParams.get('utm_source'),'meta');assert.equal(next.searchParams.get('landing_id'),'stations');assert.equal(next.searchParams.get('landing_host'),'landing.example');assert.equal(next.searchParams.get('lang'),'ru');assert.equal(next.searchParams.has('phone'),false);
 assert.equal(api.target('crm/'),'crm');assert.equal(api.target('client/'),'account');assert.equal(api.target('how-it-works/'),'website');
 assert.throws(()=>api.url('account','https://unrelated.example/'),/Unexpected/);
});
