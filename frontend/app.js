(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const fileInput = $("#jsonFileInput"), fileStatus = $("#fileStatus");
  const searchInput = $("#searchInput"), buildingFilter = $("#buildingFilter"), outletFilter = $("#outletFilter"), roomsGrid = $("#roomsGrid");
  let rooms = [];
  const pages = {
    rooms: ["Aule & Posti", "Trova uno spazio, controlla i posti e scegli dove studiare.", "DASHBOARD"],
    notices: ["Bacheca Avvisi", "Le ultime comunicazioni e gli appuntamenti del campus.", "COMUNICAZIONI"],
    info: ["Info Campus & Orari", "Tutto quello che ti serve per vivere il campus.", "INFORMAZIONI"],
    analytics: ["Analytics & KPI", "Una panoramica aggregata sull'utilizzo degli spazi.", "ANALYTICS"]
  };
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));

  function normalizeRoom(r, i) {
    if (!r || typeof r !== "object" || Array.isArray(r)) throw Error(`Record ${i+1} non valido.`);
    const states = ["Libera", "In Lezione", "Occupata Studio"];
    const state = states.find(s => s.toLowerCase() === String(r.stato).trim().toLowerCase());
    if (!state) throw Error(`Stato non valido nel record ${i+1}.`);
    const available = Number(r.posti_disponibili ?? r.posti);
    if (!Number.isInteger(available) || available < 0) throw Error(`Posti disponibili non validi nel record ${i+1}.`);
    const capacity = r.capienza_totale != null ? Number(r.capienza_totale) : r.posti_occupati != null ? available + Number(r.posti_occupati) : available + 10;
    if (!Number.isInteger(capacity) || capacity <= 0 || available > capacity) throw Error(`Capienza non valida nel record ${i+1}.`);
    const outlets = typeof r.prese_elettriche === "boolean" ? r.prese_elettriche : ["si","sì","s","yes","true","1"].includes(String(r.prese_elettriche).trim().toLowerCase());
    return { id:String(r.id ?? `ROOM-${i+1}`), edificio:String(r.edificio ?? "Edificio non indicato"), aula:String(r.aula ?? "Aula senza nome"), stato:state, capienza_totale:capacity, posti_disponibili:available, posti_occupati:capacity-available, prese_elettriche:outlets, libera_fino_a:String(r.libera_fino_a ?? "N/D"), docente_referente:String(r.docente_referente ?? "Non assegnato"), data_aggiornamento:String(r.data_aggiornamento ?? "") };
  }
  function switchSection(name) {
    if (!pages[name]) return;
    document.querySelectorAll(".page-section").forEach(s => { const active=s.dataset.page===name; s.classList.toggle("active",active); s.hidden=!active; });
    document.querySelectorAll(".nav-item").forEach(b => { const active=b.dataset.section===name; b.classList.toggle("active",active); if(active)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current"); });
    $("#pageTitle").textContent=pages[name][0]; $("#pageSubtitle").textContent=pages[name][1]; $("#breadcrumbCurrent").textContent=pages[name][2];
  }
  function setStatus(text,error=false){fileStatus.textContent=text;fileStatus.classList.toggle("file-status-error",error);}
  function updateBuildings(){const old=buildingFilter.value, list=[...new Set(rooms.map(r=>r.edificio))].sort((a,b)=>a.localeCompare(b,"it"));buildingFilter.innerHTML='<option value="">Tutti gli edifici</option>'+list.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join("");if(list.includes(old))buildingFilter.value=old;}
  function renderRoom(r){
    const pct=Math.round(((r.capienza_totale-r.posti_disponibili)/r.capienza_totale)*100), lesson=r.stato==="In Lezione", full=r.stato==="Occupata Studio"&&r.posti_disponibili===0, alert=lesson||full;
    const bar=alert||pct>85?"progress-red":pct>=50?"progress-orange":"progress-green", status=r.stato==="Libera"?"status-free":lesson?"status-class":"status-study";
    const badge=lesson?"":full?"AULA PIENA":"";
    return `<article class="room-card ${alert?"room-card-alert":""}"><div class="room-card-top"><span class="room-building">${esc(r.edificio)}</span><div class="room-badges">${badge?`<b class="alert-badge">${badge}</b>`:""}<b class="status ${status}">${esc(r.stato)}</b></div></div>
    <h3>${esc(r.aula)}</h3><div class="capacity-summary"><div><b>${r.capienza_totale}</b><small>posti totali</small></div><div><b>${r.posti_occupati}</b><small>occupati</small></div><div><b>${r.posti_disponibili}</b><small>disponibili</small></div></div>
    <div class="occupancy-heading"><span>Occupazione</span><b>${pct}%</b></div><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="Occupazione ${esc(r.aula)}"><div class="progress-fill ${bar}" style="width: ${pct}%"></div></div>
    <div class="teacher-line"><span>♙</span><div><small>DOCENTE REFERENTE</small><b>${esc(r.docente_referente)}</b></div></div>
    <div class="room-meta"><span>${r.prese_elettriche?"⚡ Prese disponibili":"○ Nessuna presa"}</span><span>◷ Libera fino a ${esc(r.libera_fino_a)}</span></div><footer>Aggiornata ${esc(r.data_aggiornamento)} <span>ID ${esc(r.id)}</span></footer></article>`;
  }
  function renderRooms(){const q=searchInput.value.trim().toLocaleLowerCase("it"),building=buildingFilter.value,plugs=outletFilter.checked;const list=rooms.filter(r=>`${r.aula} ${r.id}`.toLocaleLowerCase("it").includes(q)&&(!building||r.edificio===building)&&(!plugs||r.prese_elettriche));$("#resultsCount").textContent=`${list.length} ${list.length===1?"spazio":"spazi"}`;roomsGrid.innerHTML=list.length?list.map(renderRoom).join(""):'<div class="empty-state">Nessuno spazio trovato. Modifica i filtri.</div>';}
  function updateKPIs(){const free=rooms.filter(r=>r.stato==="Libera"&&r.posti_disponibili>0),seats=free.reduce((n,r)=>n+r.posti_disponibili,0),counts={};free.forEach(r=>counts[r.edificio]=(counts[r.edificio]||0)+1);const top=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];$("#kpiFree").textContent=free.length;$("#kpiSeats").textContent=seats;$("#kpiBuilding").textContent=top?top[0].replace(/^Edificio\s+/i,""):"N/D";}
  function updateAnalytics(){const cap=rooms.reduce((n,r)=>n+r.capienza_totale,0),occ=rooms.reduce((n,r)=>n+r.posti_occupati,0),free=rooms.reduce((n,r)=>n+r.posti_disponibili,0),pct=cap?Math.round(occ/cap*100):0,by={};rooms.forEach(r=>by[r.edificio]=(by[r.edificio]||0)+r.posti_disponibili);const top=Object.entries(by).sort((a,b)=>b[1]-a[1])[0];$("#analyticsRooms").textContent=rooms.length;$("#analyticsCapacity").textContent=cap;$("#analyticsOccupied").textContent=occ;$("#analyticsAvailable").textContent=`${free} posti disponibili`;$("#analyticsOccupancy").textContent=`${pct}%`;$("#analyticsProgress").style.width=`${pct}%`;$("#analyticsTopBuilding").textContent=top?top[0]:"N/D";$("#analyticsTopSeats").textContent=top?`${top[1]} posti disponibili`:"Nessun dato";}
  function loadFile(file){if(!file)return;if(!file.name.toLowerCase().endsWith(".json")&&file.type!=="application/json"){setStatus("Formato non valido: seleziona un JSON.",true);return;}const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(String(reader.result));if(!Array.isArray(parsed))throw Error("Il JSON deve contenere una lista di aule.");const next=parsed.map(normalizeRoom),ids=next.map(r=>r.id);if(new Set(ids).size!==ids.length)throw Error("ID duplicati nel file.");rooms=next;updateBuildings();updateKPIs();renderRooms();updateAnalytics();setStatus(`${file.name} caricato · ${rooms.length} aule disponibili.`);}catch(e){setStatus(`Errore nel file: ${e.message}`,true);}};reader.onerror=()=>setStatus("Impossibile leggere il file.",true);reader.readAsText(file,"UTF-8");}
  document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>switchSection(b.dataset.section)));
  fileInput.addEventListener("change",e=>loadFile(e.target.files[0]));searchInput.addEventListener("input",renderRooms);buildingFilter.addEventListener("change",renderRooms);outletFilter.addEventListener("change",renderRooms);
})();
