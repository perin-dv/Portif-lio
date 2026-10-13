const dialog=document.getElementById('media-player-dialog');
const player=document.getElementById('media-player');
const heading=document.getElementById('media-player-title');
const fallback=document.getElementById('media-player-fallback');

document.querySelectorAll('.media-watch').forEach(link=>{
  link.addEventListener('click',event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    const videoUrl=link.dataset.video||link.getAttribute('href');
    if(!videoUrl)return;

    if(!dialog||!player||typeof dialog.showModal!=='function'){
      return;
    }

    event.preventDefault();
    heading.textContent=link.dataset.title||'Trabalho audiovisual';
    player.poster=link.dataset.poster||'';
    player.src=videoUrl;
    player.load();

    if(fallback){
      fallback.href=videoUrl;
      fallback.hidden=true;
    }

    if(!dialog.open) dialog.showModal();

    const attempt=player.play();
    if(attempt&&typeof attempt.catch==='function'){
      attempt.catch(()=>{});
    }
  });
});

if(dialog&&player){
  const close=()=>{
    if(dialog.open) dialog.close();
  };

  dialog.querySelector('.media-close')?.addEventListener('click',close);

  player.addEventListener('error',()=>{
    if(fallback) fallback.hidden=false;
  });

  dialog.addEventListener('close',()=>{
    player.pause();
    player.removeAttribute('src');
    player.removeAttribute('poster');
    player.load();
    if(fallback){
      fallback.hidden=true;
      fallback.removeAttribute('href');
    }
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
