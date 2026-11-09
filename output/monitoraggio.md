# Smart Campus Space Finder — Monitoraggio del Progetto

**Progetto:** Smart Campus Space Finder  
**Evento:** Python Innovation Hackathon – Challenge 1  
**Periodo:** Ottobre – Novembre 2026  
**Team:** Alessandro Matrigiano, Giuseppe Ragno, Pietro Lombardi, Gabriel Loconte  
**Responsabile Monitoraggio:** Alessandro Matrigiano  
**Versione documento:** 1.0 — Aggiornato al 09/11/2026

---

## Indice

1. [Dashboard del Progetto](#dashboard-del-progetto)
2. [Sprint e Milestone](#sprint-e-milestone)
3. [Log delle Attività](#log-delle-attività)
4. [Tracciamento Task per Membro](#tracciamento-task-per-membro)
5. [Metriche di Qualità del Codice](#metriche-di-qualità-del-codice)
6. [Issue Log](#issue-log)
7. [Rischi Identificati e Mitigazioni](#rischi-identificati-e-mitigazioni)
8. [Retrospettiva del Progetto](#retrospettiva-del-progetto)
9. [KPI di Sviluppo](#kpi-di-sviluppo)

---

## Dashboard del Progetto

### Stato Attuale

| Parametro | Valore |
|-----------|--------|
| **Stato progetto** | ✅ Completato — Pronto per demo |
| **Progressione complessiva** | 100% |
| **Sprint corrente** | Sprint 3 (Demo & Documentazione) |
| **Data ultima revisione** | 09/11/2026 |
| **Rischi aperti** | 1 (bassa priorità) |
| **Issue aperte** | 0 bloccanti, 2 minori |
| **Funzionalità completate** | 23/23 (100%) |
| **Test superati** | 38/42 (90%) |

### Avanzamento per Componente

| Componente | Avanzamento | Stato |
|------------|-------------|-------|
| CLI Python (`main.py`) | ██████████ 100% | ✅ Completo |
| Dataset demo (`data.json`) | ██████████ 100% | ✅ Completo |
| Export CSV (`data.csv`) | ██████████ 100% | ✅ Completo |
| Dashboard HTML (`index.html`) | ██████████ 100% | ✅ Completo |
| Stile dashboard (`style.css`) | ██████████ 100% | ✅ Completo |
| Logica frontend (`app.js`) | ██████████ 100% | ✅ Completo |
| Script avvio (`AVVIA.bat`) | ██████████ 100% | ✅ Completo |
| Presentazione (9 slide) | ██████████ 100% | ✅ Completo |
| Documentazione | ██████████ 100% | ✅ Completo |

---

## Sprint e Milestone

### Panoramica Sprint

```
TIMELINE PROGETTO — Ottobre / Novembre 2026
─────────────────────────────────────────────────────────────────
 Settimana 1   Settimana 2   Settimana 3   Settimana 4   Settimana 5
 (Oct W3)      (Oct W4)      (Nov W1)      (Nov W2)      (Nov W2)
 ─────────────────────────────────────────────────────────────────
 [Sprint 0]    [Sprint 1]    [Sprint 2]    [Sprint 3]
 Kick-off &    Backend CLI   Frontend &    Demo, Docs,
 Setup         Python        Dati          Presentazione
 ─────────────────────────────────────────────────────────────────
     ▼              ▼             ▼              ▼             ▼
 M0:Kick-off   M1:CLI alfa   M2:Dashboard  M3:Beta      M4:DEMO
 19/10/2026    27/10/2026    03/11/2026    07/11/2026   09/11/2026
```

### Milestone Detail

| ID | Milestone | Data Target | Data Effettiva | Stato |
|----|-----------|-------------|----------------|-------|
| M0 | Kick-off, assegnazione ruoli, setup repo | 19/10/2026 | 19/10/2026 | ✅ |
| M1 | CLI Python alfa (voci 1-4 funzionanti) | 27/10/2026 | 28/10/2026 | ✅ (+1g) |
| M2 | Dashboard web alfa + dataset demo | 03/11/2026 | 03/11/2026 | ✅ |
| M3 | Beta completa (tutti i moduli integrati) | 07/11/2026 | 06/11/2026 | ✅ (-1g) |
| M4 | Demo e presentazione finale | 09/11/2026 | 09/11/2026 | ✅ |

### Sprint 0 — Kick-off & Setup (19–21 ottobre 2026)

**Obiettivo:** Definire architettura, assegnare ruoli, creare struttura directory.

| Task | Assegnato | Stato |
|------|-----------|-------|
| Definizione architettura sistema | Alessandro | ✅ |
| Creazione struttura directory progetto | Alessandro | ✅ |
| Definizione modello dati JSON | Pietro | ✅ |
| Assegnazione ruoli e responsabilità | Tutti | ✅ |
| Setup README iniziale | Gabriel | ✅ |

**Velocity:** 5/5 task completati.

---

### Sprint 1 — Backend CLI (22–28 ottobre 2026)

**Obiettivo:** Implementare la CLI Python con tutte le funzionalità core.

| Task | Assegnato | Stato | Note |
|------|-----------|-------|------|
| Struttura menu principale | Alessandro | ✅ | |
| Voce 1: lista aule tabellare | Alessandro | ✅ | |
| Voce 2: inserimento/aggiornamento | Alessandro | ✅ | Validazione aggiunta in seconda iterazione |
| Voce 3: eliminazione con conferma | Alessandro | ✅ | |
| Voce 4: prenotazione posto | Alessandro | ✅ | Bug su decremento risolto il 26/10 |
| Voce 5: filtro per edificio | Alessandro | ✅ | |
| Voce 6: KPI aggregati | Pietro | ✅ | Calcoli verificati da tutto il team |
| Voce 7: salvataggio manuale | Alessandro | ✅ | |
| Voce 8: uscita con autosave | Alessandro | ✅ | |
| Generazione CSV | Pietro | ✅ | |
| Validazione input (tutti i campi) | Alessandro | ✅ | Completata il 28/10 |
| Creazione dataset demo (6 aule) | Pietro | ✅ | |

**Velocity:** 12/12 task completati. Ritardo di 1 giorno su M1 recuperato.

---

### Sprint 2 — Frontend & Integrazione (29 ottobre – 5 novembre 2026)

**Obiettivo:** Implementare la dashboard web e integrare con il layer dati.

| Task | Assegnato | Stato | Note |
|------|-----------|-------|------|
| Struttura HTML SPA | Giuseppe | ✅ | |
| Layout CSS responsive | Giuseppe | ✅ | |
| FileReader API (caricamento JSON) | Giuseppe | ✅ | Testato su Chrome e Edge |
| KPI Cards dinamiche | Giuseppe | ✅ | |
| Griglia card aule | Giuseppe | ✅ | |
| Badge stato colorato | Giuseppe | ✅ | |
| Barra occupazione colorata | Giuseppe | ✅ | Soglie: <50% verde, 50-85% arancione, >85% rosso |
| Filtro ricerca testuale | Giuseppe | ✅ | |
| Filtro per edificio | Giuseppe | ✅ | |
| Filtro prese elettriche | Giuseppe | ✅ | |
| Sezione Bacheca Avvisi | Giuseppe | ✅ | |
| Sezione Info Campus & Orari | Gabriel | ✅ | |
| Sezione Analytics & KPI | Giuseppe | ✅ | |
| Test integrazione CLI→JSON→Dashboard | Pietro | ✅ | |
| `AVVIA.bat` Windows | Gabriel | ✅ | |

**Velocity:** 15/15 task completati. M2 rispettato esattamente.

---

### Sprint 3 — Demo, Presentazione & Documentazione (6–9 novembre 2026)

**Obiettivo:** Finalizzare presentazione, documentazione e preparare demo.

| Task | Assegnato | Stato | Note |
|------|-----------|-------|------|
| Presentazione HTML (9 slide) | Gabriel | ✅ | |
| CSS presentazione | Gabriel | ✅ | |
| JS navigazione slide | Gabriel | ✅ | |
| Test funzionali CLI (gruppi A-G) | Pietro | ✅ | 4 test falliti, 2 risolti, 2 accettati |
| Test dashboard (gruppi H-K) | Pietro | ✅ | |
| Test compatibilità browser | Pietro | ✅ | Chrome e Edge ✅, Firefox ⚠️ |
| `README.md` aggiornato | Gabriel | ✅ | |
| `project_brief.md` | Tutti | ✅ | |
| `test.md` | Pietro | ✅ | |
| `monitoraggio.md` | Alessandro | ✅ | |
| `documentazione_completa.md` | Tutti | ✅ | |
| Rehearsal demo | Tutti | ✅ | 08/11 sera |

**Velocity:** 12/12 task completati. M3 anticipato di 1 giorno.

---

## Log delle Attività

### Ottobre 2026

| Data | Attività | Membro | Ore | Artefatto Prodotto |
|------|----------|--------|-----|--------------------|
| 19/10 | Kick-off meeting, definizione architettura | Tutti | 2h | Note architettura |
| 19/10 | Setup struttura directory progetto | Alessandro | 0.5h | Struttura cartelle |
| 20/10 | Definizione schema JSON modello dati | Pietro | 1.5h | Bozza schema |
| 20/10 | Stesura README iniziale | Gabriel | 1h | README.md (bozza) |
| 21/10 | Review architettura + approvazione | Tutti | 1h | — |
| 22/10 | Inizio sviluppo CLI: menu principale + voce 1 | Alessandro | 3h | main.py (parziale) |
| 23/10 | CLI: voce 2 (inserimento/aggiornamento) | Alessandro | 4h | main.py |
| 24/10 | CLI: voce 3 (eliminazione) + voce 4 (prenotazione) | Alessandro | 3h | main.py |
| 24/10 | Creazione dataset demo 6 aule | Pietro | 2h | data.json (bozza) |
| 25/10 | CLI: voce 5 (filtro edificio) + voce 6 (KPI) | Alessandro | 3h | main.py |
| 26/10 | Bug fix: decremento posti prenotazione | Alessandro | 1h | main.py |
| 26/10 | Revisione e validazione dataset demo | Pietro | 1h | data.json (finale) |
| 27/10 | CLI: voce 7-8 (salvataggio, uscita) | Alessandro | 2h | main.py |
| 27/10 | Implementazione generazione CSV | Pietro | 2h | main.py (integrato) |
| 28/10 | Validazione input completa CLI | Alessandro | 3h | main.py (finale) |
| 28/10 | Test iniziali CLI | Pietro | 2h | Note test |
| 29/10 | Inizio struttura HTML dashboard | Giuseppe | 3h | index.html (struttura) |
| 30/10 | CSS layout responsive | Giuseppe | 4h | style.css |
| 31/10 | FileReader API + caricamento JSON | Giuseppe | 3h | app.js |

### Novembre 2026

| Data | Attività | Membro | Ore | Artefatto Prodotto |
|------|----------|--------|-----|--------------------|
| 01/11 | KPI Cards + griglia card aule | Giuseppe | 4h | app.js, index.html |
| 02/11 | Badge stato + barra occupazione | Giuseppe | 3h | app.js, style.css |
| 02/11 | Sezione Info Campus & Orari | Gabriel | 2h | index.html |
| 03/11 | Filtri (ricerca, edificio, prese) | Giuseppe | 3h | app.js |
| 03/11 | Sezione Analytics & KPI | Giuseppe | 2h | app.js, index.html |
| 03/11 | Sezione Bacheca Avvisi | Giuseppe | 1h | index.html |
| 04/11 | Test integrazione CLI→Dashboard | Pietro | 3h | Note test |
| 04/11 | Creazione AVVIA.bat | Gabriel | 0.5h | AVVIA.bat |
| 05/11 | Bug fix dashboard: filtri combinati | Giuseppe | 2h | app.js |
| 05/11 | Test funzionali completi CLI | Pietro | 3h | test.md (bozza) |
| 06/11 | Inizio presentazione HTML (slide 1-4) | Gabriel | 4h | presentazione.html |
| 06/11 | CSS + JS navigazione presentazione | Gabriel | 2h | presentazione.css/js |
| 07/11 | Presentazione HTML (slide 5-9) | Gabriel | 3h | presentazione.html |
| 07/11 | Test dashboard tutti i browser | Pietro | 2h | Note compatibilità |
| 07/11 | Review finale codice CLI | Alessandro | 2h | main.py (refactor) |
| 08/11 | Rehearsal demo (simulazione completa) | Tutti | 2h | — |
| 08/11 | Redazione documentazione | Tutti | 4h | *.md files |
| 09/11 | Finalizzazione documentazione | Pietro, Gabriel | 3h | Tutti i *.md |
| 09/11 | **DEMO HACKATHON** | Tutti | — | — |

**Totale ore stimate:** ~80 ore team (20 ore/persona media)

---

## Tracciamento Task per Membro

### Alessandro Matrigiano — Team Lead & Backend Dev

| Task | Priorità | Stato | Data Inizio | Data Fine | Ore |
|------|----------|-------|-------------|-----------|-----|
| Definizione architettura | Alta | ✅ | 19/10 | 19/10 | 2h |
| Menu CLI principale | Alta | ✅ | 22/10 | 22/10 | 1h |
| CLI Voce 1: lista aule | Alta | ✅ | 22/10 | 22/10 | 2h |
| CLI Voce 2: inserimento | Alta | ✅ | 23/10 | 23/10 | 4h |
| CLI Voce 3: eliminazione | Alta | ✅ | 24/10 | 24/10 | 1.5h |
| CLI Voce 4: prenotazione | Alta | ✅ | 24/10 | 26/10 | 2.5h |
| CLI Voce 5: filtro edificio | Media | ✅ | 25/10 | 25/10 | 1.5h |
| CLI Voce 7-8: salvataggio/uscita | Alta | ✅ | 27/10 | 27/10 | 2h |
| Validazione input completa | Alta | ✅ | 28/10 | 28/10 | 3h |
| Refactor finale CLI | Media | ✅ | 07/11 | 07/11 | 2h |
| Coordinamento team | Continua | ✅ | 19/10 | 09/11 | 4h |
| **Totale** | | | | | **~25h** |

### Giuseppe Ragno — Frontend Dev

| Task | Priorità | Stato | Data Inizio | Data Fine | Ore |
|------|----------|-------|-------------|-----------|-----|
| Struttura HTML SPA | Alta | ✅ | 29/10 | 29/10 | 3h |
| Layout CSS responsive | Alta | ✅ | 30/10 | 30/10 | 4h |
| FileReader API | Alta | ✅ | 31/10 | 31/10 | 3h |
| KPI Cards dinamiche | Alta | ✅ | 01/11 | 01/11 | 2h |
| Griglia card aule | Alta | ✅ | 01/11 | 01/11 | 2h |
| Badge stato colorato | Media | ✅ | 02/11 | 02/11 | 1.5h |
| Barra occupazione | Media | ✅ | 02/11 | 02/11 | 1.5h |
| Filtri (3 tipi) | Alta | ✅ | 03/11 | 03/11 | 3h |
| Sezione Analytics | Media | ✅ | 03/11 | 03/11 | 2h |
| Sezione Bacheca Avvisi | Bassa | ✅ | 03/11 | 03/11 | 1h |
| Bug fix filtri combinati | Media | ✅ | 05/11 | 05/11 | 2h |
| **Totale** | | | | | **~25h** |

### Pietro Lombardi — Data & Testing

| Task | Priorità | Stato | Data Inizio | Data Fine | Ore |
|------|----------|-------|-------------|-----------|-----|
| Definizione schema JSON | Alta | ✅ | 20/10 | 20/10 | 1.5h |
| Creazione dataset demo | Alta | ✅ | 24/10 | 24/10 | 2h |
| Revisione/validazione dati | Alta | ✅ | 26/10 | 26/10 | 1h |
| Implementazione CSV export | Media | ✅ | 27/10 | 27/10 | 2h |
| CLI Voce 6: calcolo KPI | Alta | ✅ | 25/10 | 25/10 | 1.5h |
| Test iniziali CLI | Alta | ✅ | 28/10 | 28/10 | 2h |
| Test integrazione | Alta | ✅ | 04/11 | 04/11 | 3h |
| Test funzionali completi | Alta | ✅ | 05/11 | 05/11 | 3h |
| Test compatibilità browser | Media | ✅ | 07/11 | 07/11 | 2h |
| Redazione test.md | Alta | ✅ | 08/11 | 09/11 | 4h |
| **Totale** | | | | | **~22h** |

### Gabriel Loconte — Presentazione & DevOps

| Task | Priorità | Stato | Data Inizio | Data Fine | Ore |
|------|----------|-------|-------------|-----------|-----|
| README.md iniziale | Media | ✅ | 20/10 | 20/10 | 1h |
| Sezione Info Campus dashboard | Bassa | ✅ | 02/11 | 02/11 | 2h |
| Creazione AVVIA.bat | Alta | ✅ | 04/11 | 04/11 | 0.5h |
| Presentazione slide 1-4 | Alta | ✅ | 06/11 | 06/11 | 4h |
| CSS + JS presentazione | Alta | ✅ | 06/11 | 06/11 | 2h |
| Presentazione slide 5-9 | Alta | ✅ | 07/11 | 07/11 | 3h |
| README.md finale | Media | ✅ | 08/11 | 08/11 | 1h |
| Redazione documentazione | Alta | ✅ | 08/11 | 09/11 | 3h |
| Organizzazione rehearsal | Alta | ✅ | 08/11 | 08/11 | 0.5h |
| **Totale** | | | | | **~17h** |

---

## Metriche di Qualità del Codice

### Statistiche File

| File | Righe | Commenti | Funzioni/Blocchi | Complessità |
|------|-------|----------|-----------------|-------------|
| `main.py` | ~350 | ~40 | 12 funzioni | Medio |
| `app.js` | ~280 | ~25 | 15 funzioni | Medio |
| `index.html` | ~180 | ~10 | — | Bassa |
| `style.css` | ~220 | ~15 | — | Bassa |
| `presentazione.html` | ~200 | ~5 | — | Bassa |
| `presentazione.css` | ~150 | ~8 | — | Bassa |
| `presentazione.js` | ~60 | ~8 | 4 funzioni | Bassa |
| **Totale** | **~1440** | **~111** | **~31** | — |

### Copertura Funzionalità

| Categoria | Funzionalità Pianificate | Funzionalità Implementate | Copertura |
|-----------|--------------------------|---------------------------|-----------|
| CLI — CRUD | 4 | 4 | 100% |
| CLI — Utilities | 4 | 4 | 100% |
| Dashboard — Dati | 5 | 5 | 100% |
| Dashboard — Filtri | 3 | 3 | 100% |
| Dashboard — Sezioni | 4 | 4 | 100% |
| Presentazione | 9 slide | 9 slide | 100% |
| **Totale** | **29** | **29** | **100%** |

### Standard di Codice

| Standard | CLI Python | Dashboard JS | Rispettato? |
|----------|------------|--------------|-------------|
| Nomi variabili in snake_case / camelCase | ✅ | ✅ | Sì |
| Funzioni con responsabilità singola | ✅ | ✅ | Sì |
| Gestione eccezioni try/except | ✅ | ✅ (try/catch) | Sì |
| Commenti per sezioni logiche | ✅ | ✅ | Sì |
| Nessun codice duplicato | ✅ | ✅ | Sì |
| Costanti definite in cima al file | ✅ | ✅ | Sì |

---

## Issue Log

### Issue Risolte

| ID | Data | Descrizione | Componente | Gravità | Risolto il | Risolto da |
|----|------|-------------|------------|---------|------------|------------|
| ISS-001 | 26/10 | Bug: `posti_disponibili` non decrementava dopo prenotazione per errore di riferimento oggetto | `main.py` | Alta | 26/10 | Alessandro |
| ISS-002 | 28/10 | Validazione: capienza non-intera causava eccezione non gestita | `main.py` | Alta | 28/10 | Alessandro |
| ISS-003 | 02/11 | CSS: card aule si sovrapponevano su viewport < 768px | `style.css` | Media | 02/11 | Giuseppe |
| ISS-004 | 04/11 | FileReader: parsing JSON falliva silenziosamente senza messaggio errore | `app.js` | Alta | 04/11 | Giuseppe |
| ISS-005 | 05/11 | Filtri: combinazione edificio + prese non produceva intersezione corretta | `app.js` | Media | 05/11 | Giuseppe |
| ISS-006 | 07/11 | CLI: colonne tabella si sovrapponevano su nomi edificio molto lunghi | `main.py` | Bassa | 07/11 | Alessandro |

### Issue Aperte (Accettate per Demo)

| ID | Data | Descrizione | Componente | Gravità | Workaround |
|----|------|-------------|------------|---------|------------|
| ISS-007 | 05/11 | Firefox blocca FileReader su file:// per alcune configurazioni | `app.js` | Media | Usare Chrome per demo |
| ISS-008 | 07/11 | Messaggio errore generico su input alfanumerico in campo numerico | `main.py` | Bassa | Inserire solo valori validi |

---

## Rischi Identificati e Mitigazioni

| ID | Rischio | Probabilità | Impatto | Strategia | Stato |
|----|---------|------------|---------|-----------|-------|
| R01 | Python non installato sulla macchina demo | Bassa | Alto | Verificare installazione in checklist pre-demo; backup su macchina personale | ✅ Mitigato |
| R02 | Browser incompatibile (IE11) | Bassa | Alto | Usare Chrome per demo, testato e confermato | ✅ Mitigato |
| R03 | Corruzione del file `data.json` durante demo | Bassa | Alto | Backup multipli: `data.json.demo_backup` su USB e cloud | ✅ Mitigato |
| R04 | Mancanza di connessione internet durante demo | — | Nessuno | Sistema completamente offline by design | ✅ Non applicabile |
| R05 | Tempo insufficiente per completare la presentazione | Media | Alto | Presentazione completata il 07/11 con 2 giorni di margine | ✅ Mitigato |
| R06 | Conflitti nel codice condiviso | Bassa | Medio | Separazione netta dei file per responsabilità (CLI vs Dashboard) | ✅ Mitigato |
| R07 | Bug critico scoperto in demo | Bassa | Molto Alto | Rehearsal il 08/11; piano di contingenza con script fallback | ⚠️ Monitorato |

---

## Retrospettiva del Progetto

### Cosa è Andato Bene ✅

#### 1. Divisione del Lavoro Efficace
La separazione netta delle responsabilità (Alessandro → CLI, Giuseppe → Dashboard, Pietro → Dati/Test, Gabriel → Presentazione) ha permesso a ogni membro di lavorare in parallelo senza bloccarsi. Non ci sono stati colli di bottiglia significativi.

#### 2. Architettura Semplice e Robusta
La scelta di utilizzare solo la stdlib Python e JS vanilla si è rivelata una forza, non una limitazione. Il sistema è stato completato senza perdere tempo in configurazione di ambienti, installazione di dipendenze o debug di framework.

#### 3. File JSON come Interfaccia Condivisa
L'utilizzo di `data.json` come "lingua franca" tra CLI e dashboard ha funzionato perfettamente. Nessuna sincronizzazione complessa, nessun mismatch di formato.

#### 4. Test Sistematici
La decisione di seguire un piano di test strutturato (gruppi A-K) ha permesso di identificare e correggere 6 issue prima della demo, alcune delle quali sarebbero state imbarazzanti durante la presentazione.

#### 5. Comunicazione del Team
Gli allineamenti rapidi all'inizio di ogni sessione hanno mantenuto tutti aggiornati sullo stato. Nessun membro ha lavorato su funzionalità già implementate da un altro.

---

### Cosa Migliorare ⚠️

#### 1. Stima dei Tempi
La voce 2 della CLI (inserimento/aggiornamento) ha richiesto più tempo del previsto per implementare la validazione completa degli input. In futuro, allocare buffer temporale per le validazioni.

#### 2. Test Cross-Browser Prima
Il problema di compatibilità Firefox con FileReader è stato scoperto solo nella Settimana 3. Testare su tutti i browser target fin dalla prima build funzionante.

#### 3. Documentazione Parallela
Parte della documentazione è stata scritta alla fine. Mantenere la documentazione tecnica aggiornata man mano che il codice evolve riduce il rischio di dimenticanze.

#### 4. Versionamento Formale
Il progetto non ha utilizzato Git (vincolo hackathon), ma avere snapshot del codice in punti chiave avrebbe permesso rollback più sicuri. In un progetto reale, Git è indispensabile.

---

### Lezioni Apprese 💡

1. **"Offline-first" è un vantaggio competitivo** in contesti con infrastruttura limitata.
2. **La semplicità tecnica permette più tempo per la UX** — il team ha potuto dedicare attenzione all'aspetto visivo perché la parte tecnica era snella.
3. **I dataset demo devono essere realistici** — aver usato 6 aule diversificate (diversi stati, edifici, caratteristiche) ha reso la demo molto più convincente.
4. **Un rehearsal strutturato vale il tempo investito** — il rehearsal dell'08/11 ha identificato un problema nella navigazione della presentazione che è stato risolto in serata.

---

## KPI di Sviluppo

### Statistiche Generali

| KPI | Valore |
|-----|--------|
| Durata totale sviluppo | 21 giorni (19/10 – 09/11) |
| Ore totali stimate | ~89 ore team |
| Ore medie per membro | ~22 ore |
| Linee di codice totali | ~1440 |
| Linee di codice per ora | ~16 LOC/ora |
| File prodotti | 11 file |
| Issue totali identificate | 8 |
| Issue risolte | 6 (75%) |
| Issue accettate | 2 (25%) |
| Test totali eseguiti | 42 |
| Test superati | 38 (90%) |
| Test falliti (accettati) | 4 (10%) |
| Funzionalità completate | 29/29 (100%) |
| Milestone rispettate | 5/5 (100%) |
| Ritardi accumulati | 1 giorno (recuperato) |

### Distribuzione del Lavoro

```
Alessandro  ████████████████████████░  28% (~25h)
Giuseppe    ████████████████████████░  28% (~25h)
Pietro      ██████████████████████░░░  25% (~22h)
Gabriel     ██████████████████░░░░░░░  19% (~17h)
```

### Trend Qualità nel Tempo

| Data | Test PASS | Bug Aperti | Funzionalità Complete |
|------|-----------|------------|----------------------|
| 28/10 | — | 2 | 12/29 (41%) |
| 03/11 | 15 | 3 | 22/29 (76%) |
| 05/11 | 28 | 3 | 27/29 (93%) |
| 07/11 | 35 | 2 | 29/29 (100%) |
| 09/11 | 38 | 2 (accettati) | 29/29 (100%) |

---

*Documento redatto dal team Smart Campus Space Finder per la Python Innovation Hackathon – Challenge 1 · Novembre 2026*  
*Responsabile Monitoraggio: Alessandro Matrigiano — Versione 1.0*
