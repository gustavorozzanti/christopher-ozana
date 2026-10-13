// Gera as páginas em clubes/*.html. Rodar: node tools/gen-clubes.js
const fs = require('fs');
const CDN = 'https://pub-e25fdf6abf634a238ada18f781b71621.r2.dev/';
const OGOL = 'https://www.ogol.com.br/jogador/christopher/943616';
const clubs = [
 { slug:'paulista', nome:'Paulista FC', sub:'Jundiaí/SP · o clube de casa', periodo:'2015 até hoje',
  resumo:'Entrou na base aos 11 anos, em 2015 já vestia a camisa do Galo e virou profissional em 2024. É o clube dos títulos, do acesso duplo e dos gols.',
  stats:[['42','jogos'],['17','gols'],['2','acessos'],['1','título']],
  blocos:[
   ['Base (2015 a 2022)','Categorias sub-13, sub-15, sub-17 e sub-20. Em 2013 fez excursão a Portugal com a garotada do clube e em 2022 disputou a Copa São Paulo de Futebol Júnior (3 jogos pelo sub-20 no ogol).'],
   ['2024 · Campeão da Segundona e acesso à A4','14 jogos e 5 gols. O Paulista foi campeão da Segunda Divisão (Série A5) e subiu para a A4. Ele marcou na vitória por 4 a 0 sobre o Colorado Caieiras na ida da final.'],
   ['2025 · Artilheiro da A4 e acesso à A3','16 jogos e 7 gols entre Série A4 e Copa Paulista, segundo o ogol. Golaço do meio-campo contra o Penapolense, gol no 3 a 0 sobre o Nacional que carimbou o acesso à Série A3, e gols contra Joseense e São Bento.'],
   ['2026 · Série A3','Na A3: 11 jogos, 761 minutos, 5 gols e 1 assistência. O Paulista caiu nas quartas de final, nos pênaltis, para a Portuguesa Santista. Na Copa Paulista foi 1 jogo (63 minutos). Segue como maior goleador do time.']],
  videos:['M0bZu6ocF3g','mgtYVwBzPWA','tUDn3QRbugE','wxUTvQVBBzQ'],
  fotos:['jogadores/1784519213549-9e6210923bb1.webp','partidas/1784675005429-8b0c2926282d.webp','jogadores/1784604836532-51b717951f5c.webp','biblioteca/1788575477852-27f869a8cac4.webp','biblioteca/1788575461196-f090e3481c3a.webp','biblioteca/1788575464013-72464284c6fa.webp'],
  credito:'Fotos: JP Fotos Sports e Gustavo Amorim / Paulista FC',
  fontes:[['Ficha no arquivo do Paulista FC','https://arquivo.paulistadejundiai.com.br/jogador/28-christopher-henrique-ozana-christopher-el-tanque'],['ogol',OGOL],['Tribuna de Jundiaí: 3 a 0 no Nacional','https://tribunadejundiai.com.br/mais/esportes/paulista-de-jundiai-vence-nacional-por-3-a-0-e-garante-acesso-a-serie-a3-do-paulistao-2026/']] },
 { slug:'aimore', nome:'Aimoré', sub:'Rio Grande do Sul · Divisão de Acesso do Gauchão', periodo:'jul a ago/2025',
  resumo:'Foi o primeiro clube profissional fora de casa. O Aimoré anunciou o centroavante em 18/07/2025 para a reta final da Divisão de Acesso (Série A2) do Campeonato Gaúcho.',
  stats:[['5','jogos'],['166','minutos'],['6','relacionado em']],
  blocos:[
   ['A chegada','O vice de futebol disse que ele estava nos planos do clube desde abril. O presidente o definiu como um centroavante com presença na área e qualidade na finalização e no jogo aéreo.'],
   ['Os jogos','Estreou em 20/07/2025 contra a União Frederiquense, entrando nos minutos finais. Depois jogou contra Lajeadense (primeira fase e quartas) e Novo Hamburgo (semifinal).']],
  jogos:[['20/07/2025','Primeira fase','União Frederiquense','7 min'],['23/07/2025','Primeira fase','Lajeadense','28 min'],['31/07/2025','Quartas de final','Lajeadense','Relacionado, não entrou'],['05/08/2025','Quartas de final','Lajeadense','70 min'],['10/08/2025','Semifinal','Novo Hamburgo','16 min'],['17/08/2025','Semifinal','Novo Hamburgo','45 min']],
  fotosAbs:['https://midia.gruposinos.com.br/_midias/jpg/2025/07/18/800x500/1_chris-22451557.jpg'],
  credito:'Foto: Aimoré / GZH',
  fontes:[['ABC+: Aimoré apresenta reforço','https://www.abcmais.com/esportes/futebol/aimore/aimore-apresenta-reforco-pro-ataque-para-a-reta-final-da-divisao-de-acesso/'],['ogol: jogos pelo Aimoré',OGOL+'/jogos?tpstats=club&epoca_id=154&equipa_id=24900']] },
 { slug:'ponte-preta-agapeama', nome:'Ponte Preta do Agapeama', sub:'Jundiaí/SP · futebol amador', periodo:'2023',
  resumo:'Em 2023 foi destaque do Campeonato Amador de Jundiaí defendendo a Ponte Preta do Agapeama, antes de chegar ao profissional do Paulista.',
  stats:[['2023','temporada'],['1','destaque do campeonato']],
  blocos:[['O amador de Jundiaí','Futebol de várzea, jogado com a comunidade. O destaque no amador antecedeu a contratação para o profissional do Paulista em 2024.']],
  fontes:[['Jornal de Jundiaí: elenco do Paulista','https://sampi.net.br/jundiai/noticias/2827861/esporte/2024/04/elenco-completo-conheca-todos-os-jogadores-do-paulista-para-a-disputa-da-bezinha']] },
 { slug:'athletic-mg', nome:'Athletic Clube', sub:'Minas Gerais · categoria sub-20', periodo:'2022',
  resumo:'Em 2022 passou pelo sub-20 do Athletic, de Minas Gerais, e disputou 10 jogos.',
  stats:[['10','jogos sub-20'],['2022','temporada']],
  blocos:[['Sub-20','Experiência longe de casa no futebol de base, no mesmo ano em que também atuou pelo sub-20 do Paulista.']],
  fontes:[['ogol',OGOL]] },
 { slug:'ska-brasil', nome:'SKA Brasil', sub:'categoria sub-20', periodo:'2021',
  resumo:'Passou pelo sub-20 do SKA Brasil em 2021.',
  stats:[['2021','temporada']],
  blocos:[['Sub-20','Passagem registrada no ogol e citada pela imprensa. Não há números de jogos disponíveis.']],
  fontes:[['ogol',OGOL]] },
 { slug:'metropolitano', nome:'Metropolitano FC', sub:'Santa Catarina · categoria sub-17', periodo:'2019',
  resumo:'Defendeu o sub-17 do Metropolitano em 2019.',
  stats:[['2019','temporada']],
  blocos:[['Sub-17','Passagem registrada no ogol e citada pela imprensa. Não há números de jogos disponíveis.']],
  fontes:[['ogol',OGOL]] },
];
const head = (t,d)=>`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${t} | Christopher "El Tanque"</title><meta name="description" content="${d}"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Anton&family=Permanent+Marker&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="../style.css"></head><body>
<header class="nav"><a href="../index.html" class="logo">EL TANQUE<span>#VZP</span></a><nav><a href="../index.html#clubes">← Todos os clubes</a></nav></header><main>`;
const foot = `</main><footer><p class="marker">Da quebrada pro gol. O gol é de todo mundo.</p><small>Site não oficial. Dados do ogol, do arquivo do Paulista FC e da imprensa local.</small></footer></body></html>`;
fs.mkdirSync('clubes',{recursive:true});
clubs.forEach((c,i)=>{
 const prev=clubs[(i+clubs.length-1)%clubs.length], next=clubs[(i+1)%clubs.length];
 let h = head(c.nome,c.resumo);
 h+=`<section class="club-hero"><p class="tag">${c.sub}</p><h1>${c.nome}</h1><p class="marker per">${c.periodo}</p><p class="lead2">${c.resumo}</p></section>`;
 h+=`<section class="sec"><div class="stats lite">${c.stats.map(s=>`<div><strong>${s[0]}</strong><span>${s[1]}</span></div>`).join('')}</div>`;
 h+=`<div class="blocos">${c.blocos.map(b=>`<article><h3>${b[0]}</h3><p>${b[1]}</p></article>`).join('')}</div>`;
 if(c.jogos) h+=`<h2 class="sub">Os <b>jogos</b></h2><div class="tbl"><table><tr><th>Data</th><th>Fase</th><th>Adversário</th><th>Tempo</th></tr>${c.jogos.map(j=>`<tr>${j.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</table></div><p class="note">O ogol registra 0 gol pelo Aimoré.</p>`;
 if(c.videos) h+=`<h2 class="sub">Os <b>gols</b></h2><div class="videos">${c.videos.map(v=>`<figure><iframe loading="lazy" src="https://www.youtube.com/embed/${v}" title="Gol" allowfullscreen></iframe></figure>`).join('')}</div>`;
 const ph=(c.fotos||[]).map(p=>CDN+p).concat(c.fotosAbs||[]);
 if(ph.length) h+=`<h2 class="sub">Em <b>campo</b></h2><div class="gallery">${ph.map(u=>`<figure><img loading="lazy" src="${u}" alt="Christopher em campo" onerror="this.closest('figure').remove()"></figure>`).join('')}</div><p class="note">${c.credito}</p>`;
 else h+=`<div class="cards"><article class="empty"><span>em breve</span><h4>Fotos e vídeos</h4><p>Nenhum registro público encontrado deste período. Mande as fotos e entram aqui.</p></article></div>`;
 h+=`<p class="note fontes">Fontes: ${c.fontes.map(f=>`<a href="${f[1]}" target="_blank" rel="noopener">${f[0]}</a>`).join(' · ')}</p>`;
 h+=`<div class="pn"><a href="${prev.slug}.html">← ${prev.nome}</a><a href="${next.slug}.html">${next.nome} →</a></div></section>`;
 fs.writeFileSync(`clubes/${c.slug}.html`, h+foot);
});
console.log(clubs.length+' páginas');
