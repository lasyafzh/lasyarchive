// Sidebar dipakai semua halaman. Edit menu cukup di file ini.
const BRAND = "Lafolia";
const STATUS = [["all","All"],["to-be-read","To be read"],["on-progress","On progress"],["finish","Finish"]];
const FIND = [
  ["Instagram","https://instagram.com/usernamekamu"],
  ["TikTok","https://tiktok.com/@usernamekamu"],
  ["Contact","mailto:halo@emailkamu.com"]
];
const page = location.pathname.split('/').pop() || 'index.html';
const cur = new URLSearchParams(location.search).get('status') || 'all';
const onCol = page === 'collection.html';

document.body.insertAdjacentHTML('afterbegin', `
<aside class="side">
  <a href="index.html" class="logo script">${BRAND}</a>
  <nav aria-label="Menu utama">
    <a href="about.html" ${page==='about.html' ? 'aria-current="page"' : ''}>About</a>
    <details class="dd" ${onCol ? 'open' : ''}>
      <summary>Collection</summary>
      <div>${STATUS.map(([k,v]) =>
        `<a href="collection.html?status=${k}" ${onCol && cur===k ? 'aria-current="page"' : ''}>${v}</a>`).join('')}</div>
    </details>
    <details class="dd">
      <summary>Find us</summary>
      <div>${FIND.map(([v,u]) =>
        `<a href="${u}" ${u.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${v}</a>`).join('')}</div>
    </details>
  </nav>
</aside>`);
