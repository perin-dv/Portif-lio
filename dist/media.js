const dialog=document.getElementById('media-player-dialog');
const player=document.getElementById('media-player');
const heading=document.getElementById('media-player-title');

if(dialog&&typeof dialog.showModal==='function'){
  document.querySelectorAll('.media-watch').forEach(link=>{
    link.addEventListener('click',event=>{
      if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
      event.preventDefault();
      heading.textContent=link.dataset.title||'Trabalho audiovisual';
      player.poster=link.dataset.poster||'';
      player.src=link.dataset.video||link.getAttribute('href');
      dialog.showModal();
    });
  });
  const close=()=>dialog.close();
  dialog.querySelector('.media-close')?.addEventListener('click',close);
  dialog.addEventListener('close',()=>{
    player.pause();
    player.removeAttribute('src');
    player.removeAttribute('poster');
    player.load();
  });
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const b=dialog.getBoundingClientRect();
    if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)close();
  });
}

const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems=[...document.querySelectorAll('[data-reveal]')];
if(reduced){
  revealItems.forEach(el=>el.classList.add('is-visible'));
}else if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -40px'});
  revealItems.forEach((el,index)=>{
    el.style.transitionDelay=Math.min(index%4,3)*55+'ms';
    observer.observe(el);
  });
}else{
  revealItems.forEach(el=>el.classList.add('is-visible'));
}

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',()=>{
    const href=link.getAttribute('href');
    if(!href||href==='#')return;
    const target=document.querySelector(href);
    if(target) target.setAttribute('tabindex','-1');
  });
});
