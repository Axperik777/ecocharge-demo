/* Progressive enhancement: photo links still open the originals without JS. */
(()=>{
 'use strict';
 function ready(){
  // Keep the selected language and avoid reloading the page for chapter links.
  const chapters=[...document.querySelectorAll('.story a[href*="#"]')].filter(a=>new URL(a.href).pathname===location.pathname);
  const chapterLinks=()=>chapters.forEach(a=>{const url=new URL(location.href);url.hash=new URL(a.href).hash;a.href=url.href;});
  chapterLinks();document.addEventListener('ecocharge:locale',chapterLinks);
  const viewer=document.querySelector('#story-photo-viewer');if(!viewer||!viewer.showModal)return;
  const links=[...document.querySelectorAll('[data-story-photo]')],photos=new Map();
  links.forEach(a=>photos.set(Number(a.dataset.storyPhoto),{src:a.href,caption:a.dataset.storyCaption,alt:a.querySelector('img').alt}));
  const full=viewer.querySelector('#story-photo-full'),caption=viewer.querySelector('#story-photo-caption'),counter=viewer.querySelector('#story-photo-counter');
  let current=0,opener=null,startX=null;
  function show(index){current=(index+photos.size)%photos.size;const photo=photos.get(current);full.src=photo.src;full.alt=photo.alt;caption.textContent=photo.caption;counter.textContent=`${current+1} / ${photos.size}`;window.EcoLocale?.localize(viewer);}
  links.forEach(a=>a.addEventListener('click',e=>{if(e.button||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();opener=a;show(Number(a.dataset.storyPhoto));viewer.showModal();document.body.classList.add('story-viewer-open');}));
  viewer.querySelector('[data-story-close]').addEventListener('click',()=>viewer.close());
  viewer.querySelector('[data-story-previous]').addEventListener('click',()=>show(current-1));
  viewer.querySelector('[data-story-next]').addEventListener('click',()=>show(current+1));
  viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(current+(e.key==='ArrowLeft'?-1:1));}});
  viewer.addEventListener('click',e=>{if(e.target!==viewer)return;const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close();});
  const stage=viewer.querySelector('.story-viewer-image');
  stage.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')startX=e.clientX;});
  stage.addEventListener('pointerup',e=>{if(startX!==null){const delta=e.clientX-startX;if(Math.abs(delta)>60)show(current+(delta<0?1:-1));}startX=null;});
  stage.addEventListener('pointercancel',()=>{startX=null;});
  viewer.addEventListener('close',()=>{document.body.classList.remove('story-viewer-open');opener?.focus({preventScroll:true});});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
