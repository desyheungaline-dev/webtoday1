(function(){
  // Mobile menu
  var btn=document.getElementById('menuBtn'), nav=document.getElementById('nav');
  btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o);btn.setAttribute('aria-label',o?'Tutup menu':'Buka menu');});
  nav.addEventListener('click',function(e){if(e.target.closest('a')){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');}});

  // Beaufort scale
  var BF=[
    ['Tenang','< 1'],['Udara ringan','1–3'],['Sepoi lemah','4–6'],['Sepoi lembut','7–10'],['Sepoi sedang','11–16'],['Sepoi segar','17–21'],['Angin kuat','22–27'],
    ['Angin ribut lemah','28–33'],['Angin ribut','34–40'],['Badai lemah','41–47'],['Badai','48–55'],['Badai kuat','56–63'],['Topan','≥ 64']];
  function status(i){
    if(i<=6) return {c:'var(--ok)',t:'Operasi normal',d:'Kapal berlayar dan bongkar muat sesuai jadwal.'};
    if(i<=8) return {c:'var(--warn)',t:'Siaga',d:'Lashing kontainer diperkuat, jadwal dipantau tiap jam, pelanggan dikabari bila ada perubahan.'};
    return {c:'var(--stop)',t:'Kapal berlindung',d:'Keselamatan awak dan muatan didahulukan. Tim darat tetap siaga dan menyusun jadwal pengganti.'};
  }
  var scale=document.getElementById('bfScale'), out=document.getElementById('bfReadout'), cells=[];
  BF.forEach(function(b,i){
    var c=document.createElement('button'); c.type='button'; c.className='bf-cell'; c.textContent=i;
    c.style.setProperty('--lvl',status(i).c); c.setAttribute('aria-pressed','false'); c.setAttribute('aria-label','Skala '+i+', '+b[0]);
    c.addEventListener('click',function(){pick(i)}); scale.appendChild(c); cells.push(c);
  });
  function pick(i){
    cells.forEach(function(c,j){c.setAttribute('aria-pressed',String(i===j))});
    var s=status(i);
    out.innerHTML='<strong>Skala '+i+' · '+BF[i][0]+'</strong><span class="mono">'+BF[i][1]+' knot</span><span class="bf-pill" style="--pill:'+s.c+'">'+s.t+'</span><span>'+s.d+'</span>';
  }
  pick(7);

  // Services
  var SVC=[
    {code:'SVC-01',name:'Angkutan peti kemas',lead:'Pengiriman FCL dan LCL untuk rute domestik dan Asia, dari gudang Anda sampai pelabuhan tujuan.',
     inc:['Booking ruang muat dan jadwal kapal','Pengantaran kontainer dengan mitra trucking','Pemantauan posisi muatan sampai tiba'],
     tagT:'Rute rutin',tags:['Surabaya','Makassar','Belawan','Balikpapan','Singapura','Port Klang','Busan']},
    {code:'SVC-02',name:'Keagenan kapal',lead:'Kami mewakili pemilik kapal selama kapal berada di Tanjung Priok: dari rencana kedatangan sampai keberangkatan.',
     inc:['Pengurusan izin kedatangan dan keberangkatan','Koordinasi jadwal sandar dengan terminal','Laporan ETA, sandar, dan berangkat ke principal'],
     tagT:'Terminal',tags:['JICT','KOJA','NPCT1','MAL']},
    {code:'SVC-03',name:'Dokumentasi ekspor-impor',lead:'Dokumen pengapalan disiapkan dan diperiksa sebelum cut-off, sehingga barang tidak tertahan di pelabuhan tujuan.',
     inc:['Penerbitan dan pemeriksaan Bill of Lading','Penyusunan manifest muatan','Dokumen pendukung kepabeanan'],
     tagT:'Dokumen',tags:['B/L','Manifest','Packing list','Invoice']},
    {code:'SVC-04',name:'Koordinasi bongkar muat',lead:'Perencanaan muatan dan koordinasi dengan terminal peti kemas agar kapal tidak menunggu lama di dermaga.',
     inc:['Penyusunan stowage plan','Pemantauan gate-in kontainer dari export list','Laporan realisasi bongkar muat (RBM)'],
     tagT:'Laporan',tags:['Stowage plan','Export list','RBM']}
  ];
  var tabs=document.getElementById('svcTabs'), panels=document.getElementById('svcPanels'), tabEls=[], panelEls=[];
  var chev='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4l6 6-6 6"/></svg>';
  SVC.forEach(function(s,i){
    var t=document.createElement('button'); t.type='button'; t.className='svc-tab'; t.id='tab'+i; t.setAttribute('role','tab'); t.setAttribute('aria-controls','panel'+i);
    t.innerHTML='<span class="code">'+s.code+'</span><span>'+s.name+'</span>'+chev;
    t.addEventListener('click',function(){sel(i)});
    t.addEventListener('keydown',function(e){var k=e.key, n=null; if(k==='ArrowDown'||k==='ArrowRight')n=(i+1)%SVC.length; if(k==='ArrowUp'||k==='ArrowLeft')n=(i-1+SVC.length)%SVC.length; if(k==='Home')n=0; if(k==='End')n=SVC.length-1; if(n!==null){e.preventDefault();sel(n);tabEls[n].focus();}});
    tabs.appendChild(t); tabEls.push(t);
    var p=document.createElement('div'); p.className='svc-panel'; p.id='panel'+i; p.setAttribute('role','tabpanel'); p.setAttribute('aria-labelledby','tab'+i); p.tabIndex=0;
    p.innerHTML='<h3>'+s.name+'</h3><p>'+s.lead+'</p><div class="svc-cols"><div><h4>Yang kami kerjakan</h4><ul>'+s.inc.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div><div><h4>'+s.tagT+'</h4><div class="chips">'+s.tags.map(function(x){return '<span class="chip">'+x+'</span>'}).join('')+'</div></div></div>';
    panels.appendChild(p); panelEls.push(p);
  });
  function sel(i){tabEls.forEach(function(t,j){var on=i===j;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;panelEls[j].hidden=!on;});}
  sel(0);

  // Copy buttons
  document.querySelectorAll('.copy').forEach(function(b){
    b.addEventListener('click',function(){
      var el=document.getElementById(b.dataset.copy), txt=el.textContent;
      function done(m){b.textContent=m;setTimeout(function(){b.textContent='Salin'},1600)}
      function fallback(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);done('Tersorot');}
      try{navigator.clipboard.writeText(txt).then(function(){done('Tersalin')},fallback)}catch(e){fallback()}
    });
  });

  // Quote form
  var f=document.getElementById('quoteForm'), doneBox=document.getElementById('formDone');
  function check(id,msg){var el=document.getElementById(id),err=document.getElementById(id+'Err'),ok=el.value.trim()!=='';el.setAttribute('aria-invalid',String(!ok));err.textContent=ok?'':msg;return ok;}
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var a=check('fName','Isi nama Anda.'), b=check('fTo','Isi pelabuhan tujuan.');
    if(!(a&&b)){(a?document.getElementById('fTo'):document.getElementById('fName')).focus();return;}
    var v=function(id){return document.getElementById(id).value.trim()};
    doneBox.hidden=false;
    doneBox.innerHTML='<strong>Ringkasan siap.</strong> '+v('fService')+', '+v('fCont')+', '+v('fFrom')+' ke '+v('fTo')+'. Kirim ringkasan ini ke info@tahanangin.co.id dan tim kami akan membalas dengan penawaran.';
  });

  document.getElementById('yr').textContent=new Date().getFullYear();
})();
