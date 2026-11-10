(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const nav = $('#nav'), toggle = $('#menuToggle');
  toggle?.addEventListener('click', () => nav.classList.toggle('open'));
  $$('#nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  $('#year').textContent = new Date().getFullYear();
  const progress = $('#progress'), backTop = $('#backTop');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
    backTop.classList.toggle('show', scrollY > 500);
  };
  addEventListener('scroll', onScroll, {passive:true}); onScroll();
  backTop.addEventListener('click', () => scrollTo({top:0,behavior:'smooth'}));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  }), {threshold:.12});
  $$('.reveal').forEach(el => observer.observe(el));
  const card = $('#tiltCard');
  if(card && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    card.addEventListener('pointermove', e => {const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;card.style.transform=`rotateY(${x*9}deg) rotateX(${-y*9}deg) translateZ(5px)`});
    card.addEventListener('pointerleave',()=>card.style.transform='rotateY(0) rotateX(0)');
  }
  const icons = () => window.lucide?.createIcons?.();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',icons); else icons();
})();
