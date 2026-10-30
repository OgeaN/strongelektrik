(() => {
  'use strict';

  const STORAGE_KEY = 'strong-teklif-v1';
  const LOGO = window.LOGO_SRC || '';

  // Belgenin altında görünen firma bilgileri (Google işletme kaydından)
  const COMPANY = {
    unvan: 'STRONG ELEKTRİK',
    adres: 'İstiklal, Bezmialem Cad. No:37, 42020 Karatay / KONYA',
    tel: '0536 652 53 70',
    saat: '7/24 Açık',
    bolge: 'Konya',
  };

  const UNITS = ['AD', 'MT', 'M²', 'KG', 'TK', 'MKR', 'DAİRE', 'GÖTÜRÜ', 'HİZMET'];

  // Dummy ürün / hizmet kataloğu (inşaat elektrik tesisatı)
  const CATALOG = [
    { g: 'Kablolar', kod: 'KB-NYM315', ad: 'NYM (NVV) 3x1,5 mm² Antigron Kablo', birim: 'MT', fiyat: 26.9 },
    { g: 'Kablolar', kod: 'KB-NYM325', ad: 'NYM (NVV) 3x2,5 mm² Antigron Kablo', birim: 'MT', fiyat: 38.4 },
    { g: 'Kablolar', kod: 'KB-NYM540', ad: 'NYM (NVV) 5x4 mm² Antigron Kablo', birim: 'MT', fiyat: 92.5 },
    { g: 'Kablolar', kod: 'KB-H07V6', ad: 'H07V-U (NYA) 6 mm² Tek Damar İletken', birim: 'MT', fiyat: 21.75 },
    { g: 'Kablolar', kod: 'KB-NYY510', ad: 'NYY 5x10 mm² Yeraltı Enerji Kablosu', birim: 'MT', fiyat: 268 },
    { g: 'Kablolar', kod: 'KB-CAT6', ad: 'CAT6 U/UTP Data Kablosu (305 m Makara)', birim: 'MKR', fiyat: 3450 },
    { g: 'Boru & Kanal', kod: 'BR-SP16', ad: '16 mm Gri Spiral Tesisat Borusu', birim: 'MT', fiyat: 4.6 },
    { g: 'Boru & Kanal', kod: 'BR-SP20', ad: '20 mm Gri Spiral Tesisat Borusu', birim: 'MT', fiyat: 6.1 },
    { g: 'Boru & Kanal', kod: 'BR-PVC25', ad: '25 mm Sert PVC Boru (3 m)', birim: 'AD', fiyat: 38 },
    { g: 'Boru & Kanal', kod: 'KN-4060', ad: '40x60 mm PVC Kablo Kanalı (2 m)', birim: 'AD', fiyat: 84 },
    { g: 'Boru & Kanal', kod: 'KN-TV200', ad: '200x60 mm Galvaniz Delikli Kablo Tavası', birim: 'MT', fiyat: 415 },
    { g: 'Kasa & Buat', kod: 'BT-SA60', ad: 'Sıva Altı Derin Buat Ø60', birim: 'AD', fiyat: 3.9 },
    { g: 'Kasa & Buat', kod: 'BT-BK100', ad: 'Sıva Altı Buat Kutusu 100x100', birim: 'AD', fiyat: 14.5 },
    { g: 'Sigorta & Pano', kod: 'SG-B16', ad: 'Otomatik Sigorta B16A 1P 6kA', birim: 'AD', fiyat: 82 },
    { g: 'Sigorta & Pano', kod: 'SG-C25-3', ad: 'Otomatik Sigorta C25A 3P 6kA', birim: 'AD', fiyat: 355 },
    { g: 'Sigorta & Pano', kod: 'KA-2P25', ad: 'Kaçak Akım Rölesi 2P 25A 30mA', birim: 'AD', fiyat: 690 },
    { g: 'Sigorta & Pano', kod: 'KA-4P40', ad: 'Kaçak Akım Rölesi 4P 40A 30mA', birim: 'AD', fiyat: 1480 },
    { g: 'Sigorta & Pano', kod: 'PN-SA24', ad: '24 Modül Sıva Altı Daire Dağıtım Panosu', birim: 'AD', fiyat: 1150 },
    { g: 'Sigorta & Pano', kod: 'PN-SAYAC', ad: 'Sayaç Panosu (8 Daire, Montajlı)', birim: 'AD', fiyat: 9800 },
    { g: 'Sigorta & Pano', kod: 'PN-ADP', ad: 'Ana Dağıtım Panosu (Montajlı, Tip Testli)', birim: 'AD', fiyat: 18500 },
    { g: 'Anahtar & Priz', kod: 'AP-ANH', ad: 'Sıva Altı Anahtar (Mekanizma + Kapak) Beyaz', birim: 'AD', fiyat: 64 },
    { g: 'Anahtar & Priz', kod: 'AP-VAV', ad: 'Sıva Altı Vavien Anahtar Beyaz', birim: 'AD', fiyat: 72 },
    { g: 'Anahtar & Priz', kod: 'AP-PRZ', ad: 'Sıva Altı Topraklı Priz Beyaz', birim: 'AD', fiyat: 71 },
    { g: 'Anahtar & Priz', kod: 'AP-NEM', ad: 'Nemli Ortam Kapaklı Topraklı Priz IP44', birim: 'AD', fiyat: 118 },
    { g: 'Aydınlatma', kod: 'AY-PNL', ad: 'LED Panel 60x60 40W 4000K', birim: 'AD', fiyat: 690 },
    { g: 'Aydınlatma', kod: 'AY-SPT', ad: 'Sıva Altı LED Spot 7W 3000K', birim: 'AD', fiyat: 145 },
    { g: 'Aydınlatma', kod: 'AY-SNS', ad: 'Hareket Sensörlü Tavan Armatürü E27', birim: 'AD', fiyat: 235 },
    { g: 'Aydınlatma', kod: 'AY-ACL', ad: 'Acil Aydınlatma Armatürü 3 Saat', birim: 'AD', fiyat: 540 },
    { g: 'Topraklama', kod: 'TP-CBK', ad: 'Bakır Kaplı Topraklama Çubuğu 1,5 m', birim: 'AD', fiyat: 430 },
    { g: 'Topraklama', kod: 'TP-SRT', ad: 'Galvaniz Topraklama Şeridi 30x3,5 mm', birim: 'MT', fiyat: 96 },
    { g: 'Topraklama', kod: 'TP-PDB', ad: 'Potansiyel Dengeleme Barası', birim: 'AD', fiyat: 310 },
    { g: 'Zayıf Akım', kod: 'ZA-DFN', ad: 'Görüntülü Diafon Daire Ünitesi 4,3"', birim: 'AD', fiyat: 1650 },
    { g: 'Zayıf Akım', kod: 'ZA-ZIL', ad: 'Görüntülü Diafon Zil Paneli (8 Daire)', birim: 'AD', fiyat: 5200 },
    { g: 'Zayıf Akım', kod: 'ZA-DMN', ad: 'Duman Dedektörü (Konvansiyonel)', birim: 'AD', fiyat: 285 },
    { g: 'İşçilik & Hizmet', kod: 'IS-DAIRE', ad: 'Daire İç Tesisat İşçiliği', birim: 'DAİRE', fiyat: 7500 },
    { g: 'İşçilik & Hizmet', kod: 'IS-ORTAK', ad: 'Ortak Alan & Kolon Hattı İşçiliği', birim: 'GÖTÜRÜ', fiyat: 24000 },
    { g: 'İşçilik & Hizmet', kod: 'IS-TOPR', ad: 'Topraklama Ölçümü ve Raporlama', birim: 'HİZMET', fiyat: 3500 },
    { g: 'İşçilik & Hizmet', kod: 'IS-PROJE', ad: 'Elektrik Projesi Çizimi ve Onay Takibi', birim: 'HİZMET', fiyat: 12500 },
  ];

  const DEFAULT_NOTES = [
    '• Fiyatlara KDV dahil değildir, KDV ayrıca gösterilmiştir.',
    '• Ödeme: %40 sipariş avansı, kalan tutar hakediş usulü ile.',
    '• Malzemeler TSE / CE belgelidir; işçilik 2 yıl garantilidir.',
    '• Kaba inşaat kaynaklı ek işler ayrıca fiyatlandırılır.',
  ].join('\n');

  // ---------- Yardımcılar ----------
  const $ = (s) => document.querySelector(s);
  const uid = () => Math.random().toString(36).slice(2, 10);
  const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
  const fmt = (n) => (Number(n) || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const toInput = (n) => (n === '' || n == null ? '' : String(n).replace('.', ','));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // "1.250,50" ve "1250.5" biçimlerinin ikisini de kabul eder
  function parseNum(v) {
    let s = String(v ?? '').trim().replace(/\s/g, '');
    if (!s) return 0;
    if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  }

  function todayISO() {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }
  function fmtDate(d) {
    return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
  }
  function isoToTR(iso) {
    return iso ? fmtDate(new Date(iso + 'T00:00:00')) : '';
  }
  function addDays(iso, n) {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    d.setDate(d.getDate() + (Number(n) || 0));
    return fmtDate(d);
  }

  // Tutarı Türkçe yazıya çevirir: 19535.63 -> "on dokuz bin beş yüz otuz beş TL altmış üç Kr."
  function yaziyla(amount) {
    const birler = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
    const onlar = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
    const gruplar = ['', 'bin', 'milyon', 'milyar', 'trilyon'];
    const uc = (x) => {
      const p = [];
      const y = Math.floor(x / 100), o = Math.floor((x % 100) / 10), b = x % 10;
      if (y) p.push((y > 1 ? birler[y] + ' ' : '') + 'yüz');
      if (o) p.push(onlar[o]);
      if (b) p.push(birler[b]);
      return p.join(' ');
    };
    const tam = (x) => {
      if (x === 0) return 'sıfır';
      const parts = [];
      for (let i = 0; x > 0; i++, x = Math.floor(x / 1000)) {
        const g = x % 1000;
        if (!g) continue;
        parts.unshift(i === 1 && g === 1 ? 'bin' : uc(g) + (gruplar[i] ? ' ' + gruplar[i] : ''));
      }
      return parts.join(' ');
    };
    const kurusToplam = Math.round(Math.abs(amount) * 100);
    const lira = Math.floor(kurusToplam / 100), kurus = kurusToplam % 100;
    return `${tam(lira)} TL${kurus ? ' ' + tam(kurus) + ' Kr' : ''}.`;
  }

  // ---------- Veri ----------
  function fromCatalog(kod, miktar, aciklama = '') {
    const c = CATALOG.find((x) => x.kod === kod);
    return { id: uid(), kod: c.kod, ad: c.ad, aciklama, miktar, birim: c.birim, fiyat: c.fiyat };
  }

  function sampleState() {
    return {
      firma: 'YILDIZ YAPI İNŞAAT TAAH. A.Ş.',
      proje: 'Yıldız Konutları B Blok — 8 Daire + Ortak Alanlar',
      adres: 'Örnek Mah. Yeni Sk. No:4 Çekmeköy / İSTANBUL',
      telefon: '0 (532) 000 00 00',
      eposta: 'satinalma@ornekyapi.com',
      belgeNo: 'STR-2026-0147',
      tarih: todayISO(),
      gecerlilik: 15,
      hazirlayan: 'Mehmet Güçlü',
      iskonto: 5,
      kdv: 20,
      notlar: DEFAULT_NOTES,
      items: [
        fromCatalog('KB-NYM315', 900, 'Aydınlatma hatları'),
        fromCatalog('KB-NYM325', 1200, 'Priz hatları'),
        fromCatalog('KB-NYM540', 180, 'Daire panosu besleme'),
        fromCatalog('KB-NYY510', 75, 'Kolon hattı'),
        fromCatalog('KB-H07V6', 160, 'Topraklama iletkeni'),
        fromCatalog('BR-SP16', 1400),
        fromCatalog('BT-SA60', 420, 'Anahtar / priz'),
        fromCatalog('SG-B16', 80),
        fromCatalog('KA-2P25', 8, 'Daire başı 1 adet'),
        fromCatalog('PN-SA24', 8),
        fromCatalog('PN-ADP', 1, 'Bina girişi'),
        fromCatalog('AP-ANH', 136),
        fromCatalog('AP-PRZ', 192),
        fromCatalog('AP-NEM', 24, 'Banyo & balkon'),
        fromCatalog('AY-SNS', 16, 'Merdiven & koridor'),
        fromCatalog('AY-ACL', 12, 'Kaçış yolları'),
        fromCatalog('TP-CBK', 4),
        fromCatalog('ZA-DFN', 8),
        fromCatalog('ZA-ZIL', 1),
        fromCatalog('IS-DAIRE', 8, 'Malzeme hariç'),
        fromCatalog('IS-ORTAK', 1, 'Malzeme hariç'),
        fromCatalog('IS-TOPR', 1, 'Ölçüm raporu dahil'),
      ],
    };
  }

  function emptyState() {
    const year = new Date().getFullYear();
    return {
      firma: '', proje: '', adres: '', telefon: '', eposta: '',
      belgeNo: `STR-${year}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      tarih: todayISO(), gecerlilik: 15, hazirlayan: '',
      iskonto: 0, kdv: 20, notlar: DEFAULT_NOTES, items: [],
    };
  }

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return s && Array.isArray(s.items) ? s : null;
    } catch { return null; }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* yoksay */ }
  }

  function totals() {
    const ara = round2(state.items.reduce((s, it) => s + round2(it.miktar * it.fiyat), 0));
    const isk = round2((ara * (Number(state.iskonto) || 0)) / 100);
    const net = round2(ara - isk);
    const kdv = round2((net * (Number(state.kdv) || 0)) / 100);
    return { ara, isk, net, kdv, genel: round2(net + kdv) };
  }

  let state = load() || sampleState();

  // ---------- Editör ----------
  const itemsBody = $('#itemsBody');
  const fieldEls = document.querySelectorAll('[data-f]');
  const NUMERIC_FIELDS = ['gecerlilik', 'iskonto', 'kdv'];

  function fillFields() {
    fieldEls.forEach((el) => { el.value = state[el.dataset.f] ?? ''; });
  }

  fieldEls.forEach((el) => {
    el.addEventListener('input', () => {
      const f = el.dataset.f;
      state[f] = NUMERIC_FIELDS.includes(f) ? parseNum(el.value) : el.value;
      changed();
    });
  });

  function unitOptions(current) {
    const list = UNITS.includes(current) || !current ? UNITS : [current, ...UNITS];
    return list.map((u) => `<option${u === current ? ' selected' : ''}>${esc(u)}</option>`).join('');
  }

  const fmtQty = (n) => (Number(n) || 0).toLocaleString('tr-TR', { maximumFractionDigits: 2 });
  const itemTitle = (it) => it.ad || 'Yeni kalem';
  const itemSub = (it) => `${it.kod ? it.kod + ' · ' : ''}${fmtQty(it.miktar)} ${it.birim} × ${fmt(it.fiyat)} TL`;

  function renderItems() {
    $('#itemCount').textContent = `(${state.items.length})`;
    syncAllOpen();
    if (!state.items.length) {
      itemsBody.innerHTML = '<div class="empty">Henüz kalem yok. Katalogdan ekleyin veya boş satır oluşturun.</div>';
      return;
    }
    itemsBody.innerHTML = state.items.map((it, i) => `
      <div class="item${it.open ? ' open' : ''}" data-id="${it.id}">
        <div class="item-head">
          <div class="item-no">${i + 1}</div>
          <div class="item-title" data-act="toggle" title="Aç / kapat">
            <b>${esc(itemTitle(it))}</b>
            <small>${esc(itemSub(it))}</small>
          </div>
          <div class="item-total">${fmt(it.miktar * it.fiyat)} TL</div>
          <div class="seg sm">
            <label><input type="radio" name="open-${it.id}" value="1" data-open${it.open ? ' checked' : ''}><span>Açık</span></label>
            <label><input type="radio" name="open-${it.id}" value="0" data-open${it.open ? '' : ' checked'}><span>Kapalı</span></label>
          </div>
        </div>
        <div class="item-body">
          <div class="item-grid">
            <label>Kod<input data-k="kod" value="${esc(it.kod)}" placeholder="Ürün kodu"></label>
            <label class="w4">Malzemenin Cinsi<input data-k="ad" value="${esc(it.ad)}" placeholder="Malzeme / hizmet adı"></label>
            <label class="w6">Açıklama<input data-k="aciklama" value="${esc(it.aciklama)}" placeholder="Örn. priz hatları"></label>
            <label class="num">Miktar<input data-k="miktar" inputmode="decimal" value="${esc(toInput(it.miktar))}"></label>
            <label>Birim<select data-k="birim">${unitOptions(it.birim)}</select></label>
            <label class="num">Birim Fiyat (TL)<input data-k="fiyat" inputmode="decimal" value="${esc(toInput(it.fiyat))}"></label>
          </div>
          <div class="item-foot">
            <span class="line-total">Satır tutarı: <b>${fmt(it.miktar * it.fiyat)} TL</b></span>
            <div class="item-actions">
              <button data-act="up" title="Yukarı taşı">▲</button>
              <button data-act="down" title="Aşağı taşı">▼</button>
              <button data-act="dup">Kopyala</button>
              <button data-act="del" class="danger">Sil</button>
            </div>
          </div>
        </div>
      </div>`).join('');
  }

  // Genel "Tümü Açık / Tümü Kapalı" radiosunu kartların durumuna göre işaretle (karışıksa ikisi de boş)
  function syncAllOpen() {
    const openCount = state.items.filter((it) => it.open).length;
    const val = !state.items.length ? null : openCount === state.items.length ? '1' : openCount === 0 ? '0' : null;
    document.querySelectorAll('input[name="allOpen"]').forEach((r) => { r.checked = r.value === val; });
  }

  function setOpen(row, it, open) {
    it.open = open;
    row.classList.toggle('open', open);
    row.querySelector(`input[data-open][value="${open ? 1 : 0}"]`).checked = true;
    syncAllOpen();
    save();
  }

  $('#allOpen').addEventListener('change', (e) => {
    const open = e.target.value === '1';
    state.items.forEach((it) => { it.open = open; });
    renderItems();
    save();
  });

  function onItemEdit(e) {
    const row = e.target.closest('.item');
    if (!row) return;
    const it = state.items.find((x) => x.id === row.dataset.id);
    if (!it) return;
    if (e.target.matches('[data-open]')) {
      if (e.type === 'change') setOpen(row, it, e.target.value === '1');
      return;
    }
    const el = e.target.closest('[data-k]');
    if (!el) return;
    const k = el.dataset.k;
    it[k] = k === 'miktar' || k === 'fiyat' ? parseNum(el.value) : el.value;
    const tutar = fmt(it.miktar * it.fiyat) + ' TL';
    row.querySelector('.item-title b').textContent = itemTitle(it);
    row.querySelector('.item-title small').textContent = itemSub(it);
    row.querySelector('.item-total').textContent = tutar;
    row.querySelector('.line-total b').textContent = tutar;
    changed();
  }
  itemsBody.addEventListener('input', onItemEdit);
  itemsBody.addEventListener('change', onItemEdit);

  itemsBody.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const row = btn.closest('.item');
    const idx = state.items.findIndex((x) => x.id === row.dataset.id);
    const items = state.items;
    if (btn.dataset.act === 'toggle') { setOpen(row, items[idx], !items[idx].open); return; }
    switch (btn.dataset.act) {
      case 'up': if (idx > 0) [items[idx - 1], items[idx]] = [items[idx], items[idx - 1]]; break;
      case 'down': if (idx < items.length - 1) [items[idx + 1], items[idx]] = [items[idx], items[idx + 1]]; break;
      case 'dup': items.splice(idx + 1, 0, { ...items[idx], id: uid() }); break;
      case 'del': items.splice(idx, 1); break;
    }
    renderItems();
    changed();
  });

  // Katalog seçimi
  const catalogEl = $('#catalog');
  const groups = [...new Set(CATALOG.map((c) => c.g))];
  catalogEl.innerHTML = groups.map((g) => `<optgroup label="${esc(g)}">${
    CATALOG.filter((c) => c.g === g).map((c) => `<option value="${c.kod}">${esc(c.ad)} — ${fmt(c.fiyat)} TL/${esc(c.birim)}</option>`).join('')
  }</optgroup>`).join('');

  // Yeni eklenen kalem açık kartla gelir
  function addItem(item) {
    item.open = true;
    state.items.push(item);
    renderItems();
    changed();
    const last = itemsBody.lastElementChild;
    last.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    last.querySelector(item.ad ? '[data-k="miktar"]' : '[data-k="ad"]').select();
  }
  $('#btnAddCatalog').addEventListener('click', () => addItem(fromCatalog(catalogEl.value, 1)));
  $('#btnAddEmpty').addEventListener('click', () => addItem({ id: uid(), kod: '', ad: '', aciklama: '', miktar: 1, birim: 'AD', fiyat: 0 }));

  function renderSummary() {
    const t = totals();
    const rows = [['Ara Toplam', t.ara]];
    if (t.isk) rows.push([`İskonto (%${state.iskonto})`, -t.isk], ['Net Toplam', t.net]);
    rows.push([`KDV (%${state.kdv})`, t.kdv]);
    $('#summary').innerHTML = rows.map(([k, v]) => `<span>${k}</span><span class="v">${fmt(v)} TL</span>`).join('')
      + `<span class="grand">Genel Toplam</span><span class="grand v">${fmt(t.genel)} TL</span>`;
  }

  // ---------- Önizleme / sayfalama ----------
  const preview = $('#preview');

  function headerHtml(first) {
    return `
      <div class="doc-header${first ? '' : ' compact'}">
        <img class="doc-logo" src="${LOGO}" alt="Strong Elektrik">
        <div class="doc-head-right">
          <div class="doc-tagline">${first ? 'Güçlü tesisat, güvenli yarın.' : `Belge No: ${esc(state.belgeNo)} · devamı`}</div>
          <div class="doc-title">FİYAT <span>TEKLİF</span> FORMU</div>
        </div>
      </div>`;
  }

  function infoHtml() {
    return `
      <table class="doc-info">
        <colgroup><col style="width:112px"><col><col style="width:90px"><col></colgroup>
        <tr><th>Firma İsmi</th><td colspan="3" class="strong">${esc(state.firma)}</td></tr>
        <tr><th>Proje / Şantiye</th><td colspan="3">${esc(state.proje)}</td></tr>
        <tr class="demo-hide"><th>Adres</th><td colspan="3" class="tall">${esc(state.adres)}</td></tr>
        <tr class="demo-hide"><th>Telefon</th><td>${esc(state.telefon)}</td><th>E-posta</th><td>${esc(state.eposta)}</td></tr>
        <tr><th>Belge No</th><td class="strong">${esc(state.belgeNo)}</td><th>Tarih</th><td class="strong">${isoToTR(state.tarih)}</td></tr>
        <tr class="demo-hide"><th>Hazırlayan</th><td>${esc(state.hazirlayan)}</td><th>Geçerlilik</th><td>${addDays(state.tarih, state.gecerlilik)}</td></tr>
        <tr class="demo-only"><td colspan="4" class="ph">Buraya adres, telefon, e-posta, hazırlayan ve geçerlilik bilgileri gelecek</td></tr>
      </table>`;
  }

  const TABLE_HEAD = `
    <table class="doc-table">
      <colgroup>
        <col style="width:34px"><col style="width:74px"><col><col style="width:112px">
        <col style="width:58px"><col style="width:48px"><col style="width:76px"><col style="width:88px">
      </colgroup>
      <thead><tr>
        <th>SIRA</th><th>KOD</th><th>MALZEMENİN CİNSİ</th><th>AÇIKLAMA</th>
        <th>MİKTAR</th><th>BİRİM</th><th>FİYAT</th><th>TUTAR</th>
      </tr></thead>
      <tbody></tbody>
    </table>`;

  function rowHtml(it, i) {
    return `<tr>
      <td class="c">${i + 1}</td>
      <td class="c">${esc(it.kod)}</td>
      <td>${esc(it.ad)}</td>
      <td class="acik">${esc(it.aciklama)}</td>
      <td class="r">${fmt(it.miktar)}</td>
      <td class="c">${esc(it.birim)}</td>
      <td class="r">${fmt(it.fiyat)}</td>
      <td class="r tutar">${fmt(it.miktar * it.fiyat)}</td>
    </tr>`;
  }

  function tailHtml() {
    const t = totals();
    let rows = `<tr><th>TOPLAM</th><td>${fmt(t.ara)}</td></tr>`;
    if (t.isk) {
      rows += `<tr class="minus"><th>İSKONTO %${esc(state.iskonto)}</th><td>-${fmt(t.isk)}</td></tr>`;
      rows += `<tr><th>NET TOPLAM</th><td>${fmt(t.net)}</td></tr>`;
    }
    rows += `<tr><th>KDV %${esc(state.kdv)}</th><td>${fmt(t.kdv)}</td></tr>`;
    rows += `<tr class="grand"><th>G. TOPLAM</th><td>${fmt(t.genel)} TL</td></tr>`;
    return `
      <div class="doc-tail">
        <div class="doc-sum-row">
          <div class="doc-notes demo-hide">
            <div class="doc-notes-title">TEKLİF NOTLARI</div>
            <div class="doc-notes-body">${esc(state.notlar)}</div>
          </div>
          <div class="ph ph-block demo-only">Buraya teklif notları gelecek<br><small>(ödeme, teslim ve garanti koşulları)</small></div>
          <table class="doc-totals">${rows}</table>
        </div>
        <div class="doc-yazi"><b>Yalnız:</b> ${yaziyla(t.genel)}</div>
        <div class="doc-closing">SİPARİŞLERİNİZİ BEKLER, İŞLERİNİZDE BAŞARILAR DİLERİZ.</div>
        <div class="doc-sign demo-hide">
          <div><div class="sign-title">MÜŞTERİ ONAYI</div><div class="sign-box">Ad Soyad · Kaşe · İmza</div></div>
          <div><div class="sign-title">TEDARİKÇİ FİRMA</div><div class="sign-box">${esc(COMPANY.unvan)}<br>Kaşe · İmza</div></div>
        </div>
        <div class="ph ph-block ph-sign demo-only">Buraya müşteri onayı ile firma kaşe ve imza alanı gelecek</div>
      </div>`;
  }

  function footerHtml() {
    return `
      <div class="doc-footer">
        <div><b>${esc(COMPANY.unvan)}</b><br>${esc(COMPANY.adres)}</div>
        <div>Tel: ${esc(COMPANY.tel)} · ${esc(COMPANY.saat)}<br>Hizmet bölgesi: ${esc(COMPANY.bolge)}</div>
        <div class="page-no"></div>
      </div>`;
  }

  function makePage(first) {
    const page = document.createElement('div');
    page.className = 'page';
    page.innerHTML = headerHtml(first) + `<div class="page-content">${first ? infoHtml() : ''}${TABLE_HEAD}</div>` + footerHtml();
    preview.appendChild(page);
    return { page, content: page.querySelector('.page-content'), tbody: page.querySelector('.doc-table tbody') };
  }
  const overflows = (p) => p.content.scrollHeight > p.content.clientHeight + 1;

  // Satırları ölçerek A4 sayfalara dağıtır; taşan satır / toplam bloğu yeni sayfaya geçer
  function renderPreview() {
    preview.innerHTML = '';
    let p = makePage(true);
    state.items.forEach((it, i) => {
      p.tbody.insertAdjacentHTML('beforeend', rowHtml(it, i));
      if (overflows(p) && p.tbody.children.length > 1) {
        const tr = p.tbody.lastElementChild;
        tr.remove();
        p = makePage(false);
        p.tbody.appendChild(tr);
      }
    });

    // Toplam bloğu sığmazsa yeni sayfaya geçer; yalnız kalmaması için son birkaç satırı da yanında götürür
    p.content.insertAdjacentHTML('beforeend', tailHtml());
    if (overflows(p)) {
      const tail = p.content.lastElementChild;
      tail.remove();
      const prev = p;
      p = makePage(false);
      const carry = Math.min(3, prev.tbody.children.length - 1);
      for (let i = 0; i < carry; i++) p.tbody.prepend(prev.tbody.lastElementChild);
      if (!p.tbody.children.length) p.content.querySelector('.doc-table').remove();
      p.content.appendChild(tail);
    }

    const pages = preview.querySelectorAll('.page');
    pages.forEach((pg, i) => { pg.querySelector('.page-no').textContent = `Sayfa ${i + 1} / ${pages.length}`; });
    $('#pageCount').textContent = `(${pages.length} sayfa)`;
  }

  let timer = null;
  function changed() {
    save();
    renderSummary();
    clearTimeout(timer);
    timer = setTimeout(renderPreview, 120);
  }

  function renderAll() {
    fillFields();
    renderItems();
    renderSummary();
    renderPreview();
  }

  // ---------- Yakınlaştırma ----------
  let zoom = 1;
  function setZoom(z) {
    zoom = Math.min(1.5, Math.max(0.4, Math.round(z * 100) / 100));
    preview.style.zoom = zoom;
    $('#zoomVal').textContent = `${Math.round(zoom * 100)}%`;
  }
  function fitZoom() {
    const w = $('#previewScroll').clientWidth - 48;
    setZoom(Math.min(1, w / 794));
  }
  $('#zoomIn').addEventListener('click', () => setZoom(zoom + 0.1));
  $('#zoomOut').addEventListener('click', () => setZoom(zoom - 0.1));
  $('#zoomFit').addEventListener('click', fitZoom);

  // ---------- Dışa aktarma ----------
  const toastEl = $('#toast');
  let toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  const fileBase = () => `Teklif_${(state.belgeNo || 'belge').replace(/[^\w-]+/g, '_')}`;

  async function capturePages() {
    if (!window.html2canvas) throw new Error('html2canvas yüklenemedi (internet bağlantısını kontrol edin).');
    clearTimeout(timer);
    renderPreview();
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const prevZoom = zoom;
    preview.style.zoom = 1;
    preview.classList.add('exporting'); // html2canvas box-shadow'u gri katman olarak basıyor
    try {
      const canvases = [];
      for (const page of preview.querySelectorAll('.page')) {
        canvases.push(await html2canvas(page, { scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false }));
      }
      return canvases;
    } finally {
      preview.classList.remove('exporting');
      preview.style.zoom = prevZoom;
    }
  }

  function download(href, name) {
    const a = document.createElement('a');
    a.href = href;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function busy(btn, label, fn) {
    const old = btn.textContent;
    btn.disabled = true;
    btn.textContent = label;
    try { await fn(); } catch (err) { console.error(err); toast('Hata: ' + err.message); } finally {
      btn.disabled = false;
      btn.textContent = old;
    }
  }

  $('#btnPdf').addEventListener('click', (e) => busy(e.currentTarget, 'Hazırlanıyor…', async () => {
    if (!window.jspdf) throw new Error('jsPDF yüklenemedi (internet bağlantısını kontrol edin).');
    const canvases = await capturePages();
    const pdf = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
    canvases.forEach((c, i) => {
      if (i) pdf.addPage();
      pdf.addImage(c.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, 210, 297);
    });
    pdf.setProperties({ title: `Fiyat Teklif Formu ${state.belgeNo}`, author: 'Strong Elektrik' });
    pdf.save(fileBase() + '.pdf');
    toast(`PDF indirildi (${canvases.length} sayfa).`);
  }));

  // Çok sayfalı tekliflerde sayfalar alt alta tek PNG'de birleştirilir
  $('#btnPng').addEventListener('click', (e) => busy(e.currentTarget, 'Hazırlanıyor…', async () => {
    const canvases = await capturePages();
    const gap = canvases.length > 1 ? 24 : 0;
    const out = document.createElement('canvas');
    out.width = canvases[0].width;
    out.height = canvases.reduce((h, c) => h + c.height, 0) + gap * (canvases.length - 1);
    const ctx = out.getContext('2d');
    ctx.fillStyle = '#d9dce2';
    ctx.fillRect(0, 0, out.width, out.height);
    let y = 0;
    canvases.forEach((c) => { ctx.drawImage(c, 0, y); y += c.height + gap; });
    download(out.toDataURL('image/png'), fileBase() + '.png');
    toast('PNG indirildi.');
  }));

  $('#btnPrint').addEventListener('click', () => {
    clearTimeout(timer);
    renderPreview();
    window.print();
  });

  $('#btnSample').addEventListener('click', () => {
    state = sampleState();
    save();
    renderAll();
    toast('Örnek inşaat teklifi yüklendi.');
  });
  $('#btnNew').addEventListener('click', () => {
    if (state.items.length && !confirm('Mevcut teklif silinip boş bir teklif açılacak. Devam edilsin mi?')) return;
    state = emptyState();
    save();
    renderAll();
    toast('Yeni boş teklif oluşturuldu.');
  });

  // ---------- Başlat ----------
  $('#topLogo').src = LOGO;
  renderAll();
  fitZoom();
  window.addEventListener('resize', () => { clearTimeout(window.__fz); window.__fz = setTimeout(fitZoom, 150); });
  // Web fontu yüklenince satır yükseklikleri değişebilir; sayfalamayı tazele
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(renderPreview);
})();
