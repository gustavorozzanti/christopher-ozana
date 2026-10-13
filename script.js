const CDN = 'https://pub-e25fdf6abf634a238ada18f781b71621.r2.dev/';
const fotos = [
  ['jogadores/1784519213549-9e6210923bb1.webp', 'JP Fotos Sports/Paulista FC'],
  ['partidas/1784675005429-8b0c2926282d.webp', 'JP Fotos Sports/Paulista FC'],
  ['jogadores/1784604836532-51b717951f5c.webp', 'Gustavo Amorim/Paulista FC'],
  ['biblioteca/1788575477852-27f869a8cac4.webp', 'Gustavo Amorim/Paulista FC'],
  ['biblioteca/1788575461196-f090e3481c3a.webp', 'Gustavo Amorim/Paulista FC'],
  ['biblioteca/1788575464013-72464284c6fa.webp', 'Gustavo Amorim/Paulista FC'],
  ['biblioteca/1788575467079-0d3e12e0ce76.webp', 'Gustavo Amorim/Paulista FC'],
  ['biblioteca/1788575469634-e4805b207ee1.webp', 'Gustavo Amorim/Paulista FC'],
  ['biblioteca/1788575472602-e7764ec99bfc.webp', 'Gustavo Amorim/Paulista FC'],
];
const g = document.getElementById('gallery');
fotos.forEach(([p, c]) => {
  const f = document.createElement('figure');
  const i = new Image();
  i.loading = 'lazy'; i.alt = 'Christopher Ozana em campo pelo Paulista FC';
  i.src = CDN + p;
  i.onerror = () => f.remove();
  f.append(i);
  g.append(f);
});

// ações sociais (data/acoes.js)
if (window.ACOES && window.ACOES.length) {
  const list = document.getElementById('social-list');
  list.innerHTML = '';
  window.ACOES.forEach(a => {
    const el = document.createElement('article');
    el.innerHTML = `<span>${a.data}</span><h4>${a.titulo}</h4><p>${a.texto}</p>`;
    list.append(el);
  });
}

// contadores
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, n = +el.dataset.n; let v = 0;
  const step = Math.max(1, Math.round(n / 60));
  const t = setInterval(() => { v = Math.min(n, v + step); el.textContent = v; if (v >= n) clearInterval(t); }, 20);
  io.unobserve(el);
}), { threshold: .6 });
document.querySelectorAll('[data-n]').forEach(el => io.observe(el));
