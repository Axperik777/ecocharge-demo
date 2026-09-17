'use strict';
// Browser-generated samples use the selected interface language and an embedded Cyrillic font.
(()=>{
 const contractBeforeLocale=contractContent;
 contractContent=()=>{const name=escapeHtml(demo.client?.name||'Lox');return contractBeforeLocale().replace(name+' (fictional demo profile)',`<span translate="no">${name}</span> <span>(demo profile)</span>`);};
 const original=downloadPdf;let fontPromise;
 async function documentFont(){if(!fontPromise)fontPromise=fetch('assets/manrope-regular.ttf').then(r=>{if(!r.ok)throw Error('font');return r.arrayBuffer()}).then(buffer=>{let binary='';for(const byte of new Uint8Array(buffer))binary+=String.fromCharCode(byte);return btoa(binary)}).catch(e=>{fontPromise=null;throw e});return fontPromise;}
 actions['print-contract']=()=>{const win=window.open('','_blank');if(!win){toast('Allow a new tab to open the print preview.');return}const language=window.EcoLocale?.language||'en',content=window.EcoLocale?.html(contractContent())||contractContent();win.document.write(`<!doctype html><html lang="${language}"><head><meta charset="utf-8"><title>EcoCharge — ${language==='ru'?'Образец договора':'Agreement preview'}</title><style>body{font:14px/1.65 Arial,sans-serif;color:#14253c;max-width:740px;margin:32px auto;padding:0 24px}h1{font-size:25px}h2{font-size:16px;margin-top:24px}.draft-banner{padding:12px;border:1px solid #ba9237;background:#fffaeb;font-size:12px;font-weight:bold}table{width:100%;border-collapse:collapse}td{padding:9px;border-bottom:1px solid #ddd}td:last-child{text-align:right}footer{margin:35px 0;border-top:1px solid #ccc;padding:10px 0;font-size:10px}button{padding:12px 20px;background:#095897;color:white;border:0;border-radius:5px;cursor:pointer}h2,table{break-inside:avoid}h2{break-after:avoid}@page{size:A4;margin:18mm}@media print{body{max-width:none;margin:0;padding:0;font-size:11px}.print-toolbar{display:none}.draft-banner{background:none}h2{margin-top:15px;font-size:13px}h1{font-size:21px}}</style></head><body><div class="print-toolbar"><button onclick="window.print()">${language==='ru'?'Печать / Сохранить PDF':'Print / Save as PDF'}</button></div>${content}</body></html>`);win.document.close();win.opener=null;win.focus();};
 downloadPdf=async function(kind){
  if(window.EcoLocale?.language!=='ru')return original(kind);
  if(!window.jspdf){toast('PDF module is unavailable. Please reload.');return}if(kind==='factsheet'&&!selected){toast('Select a station first.');return}
  // Capture values before the asynchronous font load, so switching stations cannot alter this download.
  const station=selected?{...selected}:null,agreement=kind==='contract'?window.EcoLocale.html(contractContent()):null,confirmedLabel=station?window.EcoLocale.t(station.confirmed):'';
  try{
   const font=await documentFont(),pdf=new window.jspdf.jsPDF({unit:'pt',format:'a4'});pdf.addFileToVFS('Manrope-Regular.ttf',font);pdf.addFont('Manrope-Regular.ttf','Manrope','normal');pdf.setFont('Manrope','normal');pdf.setProperties({title:kind==='contract'?'EcoCharge — Образец договора':'EcoCharge — Паспорт станции',author:'EcoCharge demo',subject:'Демонстрационный документ. Не подтверждает инвестиционные права.'});
   const margin=46,width=503;let y=50;const lineHeight=15;
   const page=()=>{pdf.addPage();y=50;};
   const write=(text,size=10.5,color=[32,52,66],space=10)=>{pdf.setFontSize(size);pdf.setTextColor(...color);const lines=pdf.splitTextToSize(text,width);for(const line of lines){if(y+lineHeight>783)page();pdf.text(line,margin,y);y+=size>16?27:lineHeight;}y+=space;};
   write('ECOCHARGE / ALT-INFRA',10,[24,112,109],12);
   if(kind==='contract'){
    const root=document.createElement('div');root.innerHTML=agreement;root.querySelectorAll('br').forEach(br=>br.replaceWith(document.createTextNode('\n')));for(const el of root.children){if(el.tagName==='TABLE'){for(const tr of el.querySelectorAll('tr'))write([...tr.cells].map(td=>td.textContent.trim()).join(': '));}else if(el.tagName==='H1')write(el.textContent,22);else if(el.tagName==='H2'){if(y>725)page();write(el.textContent,13,[24,112,109],5);}else if(el.classList.contains('draft-banner'))write(el.textContent,10,[131,93,18],14);else if(el.tagName==='FOOTER')continue;else write(el.innerText||el.textContent);}
   }else{
    write('Паспорт зарядной станции',22);write('ПУБЛИЧНЫЙ КАТАЛОГ · НЕ ПОДТВЕРЖДАЕТ ВЛАДЕНИЕ',10,[131,93,18],18);
    const rows=[['Станция',station.name],['Адрес',`${station.address}, ${station.city}, ${station.state} ${station.zip}, USA`],['Сеть / ID AFDC',`${station.network} / ${station.id}`],['Оборудование',`Быстрых разъёмов DC: ${station.ports}. Максимальная указанная мощность: ${station.maxKw||'не указана'} кВт.`],['Разъёмы',station.connectors.join(', ')],['Дата подтверждения',`${confirmedLabel.replace(/\.$/,'')}. Доступность указана в каталоге, занятость не обновляется онлайн.`],['Источник',station.source],['Статус записи','Публичная запись не подтверждает партнёрство, владение или доступность инвестиции.']];
    for(const [label,value] of rows){if(y>718)page();write(label,10,[24,112,109],0);write(value,11,[32,52,66],14);}
   }
   const pages=pdf.getNumberOfPages();for(let n=1;n<=pages;n++){pdf.setPage(n);pdf.setDrawColor(207,220,223);pdf.line(margin,797,549,797);pdf.setTextColor(91,111,120);pdf.setFontSize(8);pdf.text(`ДЕМО · ${new Intl.DateTimeFormat('ru-RU',{timeZone:'UTC'}).format(new Date())} · Страница ${n} из ${pages}`,margin,814);}
   pdf.save(kind==='contract'?'DEMO-agreement-RU.pdf':`AFDC-${station.id}-RU.pdf`);toast(kind==='contract'?'Demo agreement preview downloaded.':'Station fact sheet downloaded.');
  }catch{toast('Не удалось создать PDF. Обновите страницу или воспользуйтесь печатью образца.');}
 };
})();
