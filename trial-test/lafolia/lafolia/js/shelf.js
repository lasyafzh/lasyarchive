const LANGS = ['Korean','English','Bahasa Indonesia'];
const TITLES = {all:'All books','to-be-read':'To be read','on-progress':'On progress',finish:'Finish'};
const STATUS_LABEL = {'to-be-read':'To be read','on-progress':'On progress',finish:'Finish'};
const status = TITLES[new URLSearchParams(location.search).get('status')] ? new URLSearchParams(location.search).get('status') : 'all';
let lang = null;
const $ = id => document.getElementById(id);

$('section-title').textContent = TITLES[status];

LANGS.forEach(v => {
  const b = document.createElement('button');
  b.className = 'chip'; b.textContent = v; b.setAttribute('aria-pressed','false');
  b.onclick = () => {
    lang = lang === v ? null : v;
    $('f-lang').querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', String(lang === c.textContent)));
    applyFilter();
  };
  $('f-lang').appendChild(b);
});

const modal = $('modal');
BOOKS.forEach(b => {
  const el = document.createElement('button');
  el.className = 'spine';
  el.style.setProperty('--h', b.h+'px');
  el.style.setProperty('--w', b.w+'px');
  el.style.setProperty('--r', b.r+'deg');
  el.setAttribute('aria-label', `${b.t}, ${b.a}`);
  el.innerHTML = '<span></span><span class="au"></span>';
  el.children[0].textContent = b.t;
  el.children[1].textContent = b.a;
  el.onclick = () => openBook(b);
  b.el = el;
  $('shelf').appendChild(el);
});

function applyFilter(){
  let shown = 0;
  BOOKS.forEach(b => {
    const ok = (status === 'all' || b.s === status) && (!lang || b.l === lang);
    b.el.classList.toggle('dim', !ok);
    b.el.tabIndex = ok ? 0 : -1;
    if (ok) shown++;
  });
  $('empty').textContent = shown ? '' : 'Belum ada buku di sini.';
}
applyFilter();

function openBook(b){
  $('m-title').textContent = b.t;
  $('m-author').textContent = b.a;
  $('m-status').textContent = STATUS_LABEL[b.s];
  $('m-lang').textContent = b.l;
  $('m-rate').textContent = '★'.repeat(b.rate) + '☆'.repeat(5-b.rate);
  $('m-note').textContent = b.note;
  modal.showModal();
}
$('m-close').onclick = () => modal.close();
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
