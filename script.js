// menangkap beberapa element html
let modal = document.getElementById('modal');
let button_floating = document.getElementById('button_floating');
let modal_bg = document.getElementById('modal_bg');
let addlist_form = document.getElementById('addlist_form');
let root = document.getElementById('root');
let subtitle = document.getElementById('subtitle');
let time = document.getElementById("time");

// menambahkan data ke subtitle
subtitle.innerHTML = new Date().toLocaleDateString();
time.innerHTML = new Date().toLocaleTimeString();

// list data belanja
let data_list_belanja = [];

// menambahkan event listener ke floating button
button_floating.addEventListener('click', () => {
  // console.info('mencoba apakah keluar hasilnya');

  // memunculkan modal
  if (modal.style.display == 'none') {
    showModal();
    return;
  }
  hideModal();
});

// menambahkan event listener ke modal bg
modal_bg.addEventListener('click', () => {
  // tidak memunculkan modal
  hideModal();
});

// menambahkan event listener ke addlist form
addlist_form.addEventListener('submit', (event) => {
  // stop reload page
  event.preventDefault();

  // menangkap masing-masing input field
  let barang = event.target.barang.value;
  let harga = event.target.harga.value;

  // push data ke data list belanja
  data_list_belanja.push({
    nama_barang: barang,
    harga_barang: harga,
    tanggal: new Date().toLocaleDateString(),
    waktu: new Date().toLocaleTimeString(),
  });

  console.info(data_list_belanja);

  // menghapus inputan yang sudah diinput sebelumnya
  event.target.barang.value = '';
  event.target.harga.value = '';

  hideModal();

  renderToHtml();
});

// menampilkan modal
function showModal() {
  modal.style.display = 'flex';
  button_floating.style.backgroundColor = 'gray';
  button_floating.style.transform = 'rotate(45deg)';
  return;
}

// menyembunyikan modal
function hideModal() {
  // tidak memunculkan modal
  modal.style.display = 'none';
  button_floating.style.backgroundColor = 'tomato';
  button_floating.style.transform = 'rotate(0deg)';
}

// Menampilkan hasilnya menggunakan JS di html
function renderToHtml() {
  // clear element div
  root.innerHTML = '';

  // melakukan perulangan
  data_list_belanja.forEach((e, i) => {
    root.innerHTML += `
      <div class="card">
        <small> ${e.tanggal} </small>
        <small> ${e.waktu}</small>
        <div>
          ${e.nama_barang} <span> Rp. ${e.harga_barang} </span>
        </div>
        <button onClick="handleDelete(${i})">Selesai</button>
      </div>
    `;
  });
}

// menghapus item untuk detail belanja
function handleDelete(index) {
  data_list_belanja.splice(index, 1);

  renderToHtml();
}
