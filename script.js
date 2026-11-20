const pages=[...document.querySelectorAll('.page')];
const navButtons=[...document.querySelectorAll('.nav-btn')];
const nav=document.querySelector('.nav');
const menu=document.querySelector('.menu-toggle');
function showPage(id,updateHash=true){
 const target=document.getElementById(id); if(!target||!target.classList.contains('page'))return;
 pages.forEach(p=>{const active=p===target;p.classList.toggle('active',active);p.setAttribute('aria-hidden',String(!active));if(active)p.scrollTop=0;});
 navButtons.forEach(b=>b.classList.toggle('active',b.dataset.page===id));
 nav.classList.remove('open');menu.textContent='☰';window.scrollTo({top:0,behavior:'smooth'});
 if(updateHash&&location.hash!=='#'+id) history.replaceState(null,'','#'+id);
}
navButtons.forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.go)));
menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.textContent=nav.classList.contains('open')?'×':'☰'});
window.addEventListener('hashchange',()=>showPage(location.hash.slice(1)||'home',false));
showPage(location.hash.slice(1)||'home',false);
// Expandable objectives.
document.querySelectorAll('.objective-list article').forEach(card=>{
 card.setAttribute('role','button');card.setAttribute('tabindex','0');card.setAttribute('aria-expanded','false');
 const toggle=()=>{const opening=!card.classList.contains('expanded');card.classList.toggle('expanded',opening);card.setAttribute('aria-expanded',String(opening));};
 card.addEventListener('click',toggle);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
});
// Gallery lightbox.
const items=[...document.querySelectorAll('.gallery-item')],box=document.querySelector('.lightbox'),lightImg=box.querySelector('img'),title=box.querySelector('.lightbox-title');let current=0;
function openImage(i){current=(i+items.length)%items.length;const item=items[current];lightImg.src=item.querySelector('img').src;lightImg.alt=item.querySelector('img').alt;title.textContent=item.dataset.title;box.classList.add('open');box.setAttribute('aria-hidden','false')}
function closeImage(){box.classList.remove('open');box.setAttribute('aria-hidden','true');lightImg.src=''}
items.forEach((item,i)=>item.addEventListener('click',()=>openImage(i)));
box.querySelector('.lightbox-close').addEventListener('click',closeImage);box.querySelector('.lightbox-prev').addEventListener('click',()=>openImage(current-1));box.querySelector('.lightbox-next').addEventListener('click',()=>openImage(current+1));box.addEventListener('click',e=>{if(e.target===box)closeImage()});
document.addEventListener('keydown',e=>{if(!box.classList.contains('open'))return;if(e.key==='Escape')closeImage();if(e.key==='ArrowLeft')openImage(current-1);if(e.key==='ArrowRight')openImage(current+1)});

// Interactive eight-week project timeline: click or keyboard to reveal details.
document.querySelectorAll('.week-card').forEach(card=>{
 const toggleWeek=()=>{
  const open=!card.classList.contains('expanded');
  document.querySelectorAll('.week-card').forEach(other=>{
   other.classList.remove('expanded');other.setAttribute('aria-expanded','false');
  });
  if(open){card.classList.add('expanded');card.setAttribute('aria-expanded','true');}
 };
 card.addEventListener('click',toggleWeek);
 card.addEventListener('keydown',event=>{
  if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleWeek();}
 });
});

// About topics: reveal details only after a visitor clicks a topic.
document.querySelectorAll('.topic-toggle').forEach(button=>{
 button.addEventListener('click',()=>{
  const card=button.closest('.topic-item');
  const shouldOpen=!card.classList.contains('expanded');
  document.querySelectorAll('.topic-item').forEach(item=>{
   item.classList.remove('expanded');
   item.querySelector('.topic-toggle').setAttribute('aria-expanded','false');
  });
  if(shouldOpen){card.classList.add('expanded');button.setAttribute('aria-expanded','true');}
 });
});
