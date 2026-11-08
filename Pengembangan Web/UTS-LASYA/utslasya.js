/* welcome */
function mulai() {
    document.getElementById('entri').classList.add('keluar');
    setTimeout(function () {
    window.location.href = 'about.html'; 
    }, 500);
}


/* collection */
const pilihan = new URLSearchParams(location.search).get('status');

  const nama = {
    'to-be-read': 'To Be Read',
    'on-progress': 'On Progress',
    'finish': 'Finish'
  };

  document.querySelectorAll('.book').forEach(function (buku) {
    buku.hidden = Boolean(pilihan) && buku.dataset.status !== pilihan;
  });

  document.querySelector('.collect h1').textContent =
    'Collection - ' + (nama[pilihan] || 'All');



