# Smart Campus Space Finder
## Project Brief — Documento di Progetto Ufficiale

**Evento:** Python Innovation Hackathon – Challenge 1 · Smart Campus  
**Data:** Novembre 2026  
**Team:** Alessandro Matrigiano, Giuseppe Ragno, Pietro Lombardi, Gabriel Loconte  
**Versione documento:** 1.0  
**Stato:** Finale

---

## Indice

1. [Executive Summary](#executive-summary)
2. [Il Problema](#il-problema)
3. [La Soluzione](#la-soluzione)
4. [Obiettivi del Progetto](#obiettivi-del-progetto)
5. [Stack Tecnologico](#stack-tecnologico)
6. [Architettura del Sistema](#architettura-del-sistema)
7. [Funzionalità Principali](#funzionalità-principali)
8. [Modello dei Dati](#modello-dei-dati)
9. [KPI Dimostrativi](#kpi-dimostrativi)
10. [Vincoli e Assunzioni](#vincoli-e-assunzioni)
11. [Roadmap Futura](#roadmap-futura)
12. [Team e Ruoli](#team-e-ruoli)
13. [Conclusioni](#conclusioni)

---

## Executive Summary

**Smart Campus Space Finder** è una soluzione software sviluppata nell'ambito della *Python Innovation Hackathon – Challenge 1*, concepita per rispondere a una delle esigenze più concrete e quotidiane della vita universitaria: sapere in tempo reale dove trovare un posto a sedere, uno spazio di studio o un'aula disponibile all'interno del campus.

Il progetto nasce dall'osservazione diretta di una problematica diffusa in quasi tutti gli atenei italiani: l'assenza di un sistema centralizzato, accessibile e aggiornabile in modo semplice, che permetta a studenti, docenti e personale amministrativo di conoscere la disponibilità delle aule e degli spazi comuni. Gli studenti si trovano spesso a girare per i corridoi del campus alla ricerca di un posto libero, con una perdita di tempo significativa e una fruizione inefficiente degli spazi disponibili.

La soluzione proposta si distingue per la sua semplicità architetturale e la totale assenza di dipendenze esterne: l'intero sistema è costruito utilizzando esclusivamente **Python 3 con la libreria standard** per il backend CLI e **HTML5/CSS3/JavaScript Vanilla** per il frontend web. Non è richiesto alcun server, framework, database o connessione a Internet. Questo approccio garantisce la massima portabilità, facilità di installazione e compatibilità con ambienti a risorse limitate, caratteristiche fondamentali per un prototipo hackathon ma anche per una prima adozione in ambienti istituzionali.

Il sistema si compone di due moduli principali: una **CLI Python** per la gestione e l'aggiornamento dei dati (inserimento, modifica, cancellazione, prenotazione posti, esportazione) e una **dashboard web SPA** (Single Page Application) per la visualizzazione interattiva, filtraggio e analisi dei dati. I due moduli comunicano attraverso un file JSON condiviso, rendendo il flusso operativo intuitivo e trasparente.

---

## Il Problema

La gestione degli spazi universitari rappresenta una sfida organizzativa complessa. I problemi principali identificati durante la fase di analisi sono i seguenti:

### 1. Mancanza di visibilità in tempo reale
Gli studenti non hanno accesso a informazioni aggiornate sulla disponibilità delle aule. I tabelloni fisici, quando presenti, sono spesso obsoleti o non aggiornati in modo sistematico.

### 2. Dispersione delle informazioni
Le informazioni sugli orari delle lezioni, la capienza delle aule e lo stato di occupazione sono frammentate tra diverse fonti: sito web dell'ateneo, bacheche fisiche, app di terze parti, comunicazioni informali tra studenti.

### 3. Inefficienza nell'uso degli spazi
In molti casi, aule con posti liberi rimangono inutilizzate perché gli studenti non sanno che sono disponibili, mentre zone frequentate come le aree comuni o le biblioteche risultano sovraffollate.

### 4. Assenza di strumenti accessibili per il personale
Il personale amministrativo e i docenti non dispongono di strumenti semplici per aggiornare rapidamente lo stato delle aule o comunicare informazioni urgenti (es. un'aula che si libera prima del previsto).

### 5. Costi di infrastruttura elevati
Le soluzioni commerciali esistenti per la gestione degli spazi universitari richiedono infrastrutture server, licenze software e manutenzione continua, rendendole inaccessibili per molti atenei o istituti con budget limitati.

### 6. Scarsa adattabilità ai contesti locali
Le soluzioni generaliste non tengono conto delle specificità di ogni campus: nomi degli edifici, layout degli spazi, abitudini degli utenti, orari particolari.

---

## La Soluzione

**Smart Campus Space Finder** propone un approccio pragmatico e immediatamente utilizzabile:

### Approccio Offline-First
Il sistema funziona completamente offline, senza necessità di connessione a Internet o server remoti. I dati sono memorizzati in un file JSON locale (`data.json`) che rappresenta la "fonte di verità" del sistema.

### Doppia Interfaccia Complementare
- **CLI Python (`main.py`):** Strumento per gli operatori (personale, docenti) che necessitano di aggiornare i dati in modo rapido e preciso. Offre un'interfaccia testuale guidata con menu interattivo.
- **Dashboard Web (`index.html`):** Interfaccia visuale per gli utenti finali (studenti) che vogliono visualizzare le informazioni in modo immediato e intuitivo, con filtri, grafici e indicatori visivi.

### Flusso Dati Semplice e Trasparente
```
Operatore → CLI Python → data.json ←→ Dashboard Web → Studente
```

### Nessuna Dipendenza Esterna
Tutto il necessario è incluso nel repository. Non servono `pip install`, configurazioni di ambienti virtuali complesse o connessioni a servizi cloud.

### Avvio Immediato
Un file batch (`AVVIA.bat`) su Windows permette di avviare la CLI con un doppio click, abbassando la barriera di accesso anche per utenti non tecnici.

---

## Obiettivi del Progetto

### Obiettivi Primari (Must Have)

| # | Obiettivo | Metrica di Successo |
|---|-----------|---------------------|
| O1 | Implementare una CLI funzionante per CRUD aule | Tutte e 8 le voci di menu operative |
| O2 | Implementare una dashboard web funzionante | Tutte e 4 le sezioni visualizzabili |
| O3 | Garantire persistenza dei dati in JSON e CSV | File salvati correttamente dopo ogni operazione |
| O4 | Mostrare KPI aggregati corretti | Calcoli verificati sul dataset demo |
| O5 | Realizzare la presentazione in 9 slide | Presentazione completata e navigabile |

### Obiettivi Secondari (Should Have)

| # | Obiettivo | Metrica di Successo |
|---|-----------|---------------------|
| O6 | Validazione degli input nella CLI | Nessun crash su input errati |
| O7 | Filtri funzionanti nella dashboard | Almeno 3 filtri operativi |
| O8 | Visualizzazione barre di occupazione | Colore corretto in base alla percentuale |
| O9 | Compatibilità con apertura file:// nel browser | Dashboard apribile senza server |
| O10 | Dataset demo rappresentativo con 6 aule | Dati realistici e diversificati |

### Obiettivi Terziari (Nice to Have)

| # | Obiettivo | Metrica di Successo |
|---|-----------|---------------------|
| O11 | Sezione Bacheca Avvisi nella dashboard | Almeno 3 avvisi visualizzati |
| O12 | Sezione Info Campus & Orari | Informazioni campus presenti |
| O13 | Animazioni e transizioni nella presentazione | Slide con effetti di transizione |
| O14 | Script AVVIA.bat per avvio semplificato | File funzionante su Windows |

---

## Stack Tecnologico

| Componente | Tecnologia | Versione | Ruolo |
|------------|------------|----------|-------|
| Backend CLI | Python | 3.x | Gestione dati, CRUD, esportazione |
| Serializzazione | json (stdlib) | — | Lettura/scrittura data.json |
| Esportazione | csv (stdlib) | — | Generazione data.csv |
| Data/Ora | datetime (stdlib) | — | Timestamp aggiornamenti |
| I/O File | os, pathlib (stdlib) | — | Gestione percorsi file |
| Frontend | HTML5 | — | Struttura SPA dashboard |
| Stile | CSS3 | — | Layout, animazioni, responsive |
| Logica frontend | JavaScript Vanilla | ES6+ | FileReader API, filtraggio, KPI |
| Dati | JSON | — | Formato di scambio dati |
| Avvio | Windows Batch (.bat) | — | Script di avvio semplificato |
| Presentazione | HTML5/CSS3/JS | — | Slideshow 9 slide |

> [!NOTE]
> La scelta di utilizzare esclusivamente la libreria standard di Python e tecnologie web native è una decisione deliberata che garantisce massima portabilità e zero dipendenze da installare.

---

## Architettura del Sistema

### Diagramma ad Alto Livello

```
┌─────────────────────────────────────────────────────────────────┐
│                     SMART CAMPUS SPACE FINDER                    │
│                        Sistema Completo                          │
└─────────────────────────────────────────────────────────────────┘

  ┌──────────────────┐          ┌──────────────────┐
  │   OPERATORE      │          │    STUDENTE       │
  │ (Personale/      │          │  (Utente finale)  │
  │  Docente)        │          │                   │
  └────────┬─────────┘          └────────┬──────────┘
           │                             │
           │ Interazione testuale        │ Interazione visuale
           ▼                             ▼
  ┌──────────────────┐          ┌──────────────────┐
  │   CLI Python     │          │  Dashboard Web   │
  │   (main.py)      │          │  (index.html)    │
  │                  │          │                  │
  │  ┌────────────┐  │          │  ┌────────────┐  │
  │  │ Menu CRUD  │  │          │  │ KPI Cards  │  │
  │  │ Validazione│  │          │  │ Filtri     │  │
  │  │ Prenotaz.  │  │          │  │ Avvisi     │  │
  │  │ Filtri     │  │          │  │ Analytics  │  │
  │  │ KPI Calc.  │  │          │  └────────────┘  │
  │  └────────────┘  │          │                  │
  └────────┬─────────┘          └────────┬──────────┘
           │                             │
           │ Scrittura                   │ Lettura (FileReader API)
           ▼                             ▼
  ┌─────────────────────────────────────────────────┐
  │                 LAYER DATI                       │
  │                                                  │
  │   ┌─────────────┐      ┌─────────────────────┐  │
  │   │  data.json  │◄────►│      data.csv        │  │
  │   │  (primario) │      │   (export/backup)    │  │
  │   └─────────────┘      └─────────────────────┘  │
  │                                                  │
  └─────────────────────────────────────────────────┘
```

### Descrizione dei Componenti

#### Layer CLI — `main.py`
Il modulo Python è il cuore operativo del sistema. Gestisce:
- **Lettura/scrittura JSON:** Caricamento all'avvio, salvataggio su richiesta o all'uscita.
- **Menu interattivo:** 8 voci di menu, navigazione con input numerici.
- **CRUD completo:** Create, Read, Update, Delete su oggetti aula.
- **Business logic:** Calcolo KPI, validazione input, gestione prenotazioni (decremento posti).
- **Export CSV:** Generazione automatica di `data.csv` alla chiusura o su richiesta.

#### Layer Dati — `data.json` / `data.csv`
- `data.json`: Array JSON di oggetti aula. È il file condiviso tra CLI e dashboard.
- `data.csv`: Export piatto per analisi con strumenti esterni (Excel, LibreOffice Calc).

#### Layer Dashboard — `index.html` + `style.css` + `app.js`
La SPA (Single Page Application) web è completamente statica:
- **Nessun server:** Apribile direttamente con `file://` nel browser.
- **FileReader API:** Caricamento del JSON tramite `<input type="file">`, senza fetch().
- **JavaScript puro:** Nessun framework, nessuna libreria esterna.
- **4 sezioni:** Navigazione SPA con scroll o menu.

#### Presentazione — `presentazione.html`
Slideshow HTML/CSS/JS auto-contenuto con 9 slide per la presentazione del progetto al hackathon.

### Flusso Operativo Tipico

```
1. [Operatore] Avvia main.py (o AVVIA.bat)
       │
       ▼
2. [CLI] Carica data.json dal disco
       │
       ▼
3. [Operatore] Seleziona operazione dal menu
   (es. aggiorna stato aula, prenota posto)
       │
       ▼
4. [CLI] Esegue operazione con validazione input
       │
       ▼
5. [CLI] Salva data.json aggiornato (+ CSV opzionale)
       │
       ▼
6. [Studente] Apre index.html nel browser
       │
       ▼
7. [Dashboard] Chiede di selezionare data.json
       │
       ▼
8. [FileReader API] Legge e parsa il JSON
       │
       ▼
9. [Dashboard] Visualizza KPI, aule, filtri, analytics
```

---

## Funzionalità Principali

### CLI Python (`main.py`)

#### Voce 1 — Mostra tutte le aule
Visualizza un elenco formattato di tutte le aule presenti nel dataset, con colonne allineate che mostrano: ID, Edificio, Nome Aula, Stato, Posti Disponibili / Totali, Prese Elettriche, Libera Fino A.

```
ID       EDIFICIO               AULA          STATO           DISP/TOT  PRESE  LIBERA FINO
-------- ---------------------- ------------- --------------- --------- ------ -----------
SC-001   Edificio A - Ingegn.   Aula A101     Libera          10/40     Sì     16:30
SC-002   Edificio A - Ingegn.   Lab 3         In Lezione       0/32     Sì     N/D
SC-003   Edificio B - Economia  Aula B204     Libera          18/24     No     N/D
SC-004   Biblioteca Centrale    Sala Studio 2 Occupata Studio  6/20     Sì     N/D
SC-005   Edificio C - Lettere   Aula C012     Libera          32/40     Sì     N/D
SC-006   Edificio B - Economia  Aula B110     Libera          12/16     No     N/D
```

#### Voce 2 — Inserisci / Aggiorna aula
Interfaccia guidata per la creazione di una nuova aula o la modifica di una esistente. La CLI chiede:
- ID (formato SC-XXX, validato con regex)
- Nome edificio
- Nome aula
- Stato (selezione da lista: Libera / In Lezione / Occupata Studio)
- Capienza totale (intero positivo)
- Posti disponibili (intero, ≤ capienza totale)
- Prese elettriche (s/n)
- Libera fino a (formato HH:MM o N/D)
- Docente referente

La data di aggiornamento viene impostata automaticamente al timestamp corrente (ISO 8601).

#### Voce 3 — Elimina aula
Chiede l'ID dell'aula da eliminare, mostra i dettagli e richiede conferma esplicita (`s` per confermare). Protegge da eliminazioni accidentali.

#### Voce 4 — Prenota / Occupa un posto
Chiede l'ID dell'aula e decrementa `posti_disponibili` di 1. Se `posti_disponibili` scende a 0, lo stato viene aggiornato automaticamente a "In Lezione" o "Occupata Studio". Aggiorna `posti_occupati` e il timestamp.

#### Voce 5 — Filtra aule libere per edificio
Mostra un elenco degli edifici disponibili, permette di selezionarne uno e visualizza solo le aule con stato "Libera" in quell'edificio.

#### Voce 6 — Mostra KPI aggregati
Calcola e visualizza in formato tabellare:
- Numero totale di aule
- Aule libere (count e percentuale)
- Posti totali (somma capienza)
- Posti disponibili (nelle aule libere)
- Posti occupati
- Occupazione globale (%)
- Edificio con più posti liberi

#### Voce 7 — Salva JSON e CSV manualmente
Forza il salvataggio immediato di `data.json` e `data.csv` senza uscire dal programma. Utile dopo modifiche importanti.

#### Voce 8 — Esci
Salva automaticamente `data.json` e `data.csv`, mostra un messaggio di conferma e termina il programma.

---

### Dashboard Web (`index.html` + `app.js`)

#### Caricamento Dati
La dashboard mostra all'avvio un'area di caricamento file con bottone `Sfoglia`. L'utente seleziona `data.json` dal proprio filesystem. L'API `FileReader` legge il file, lo parsa come JSON e popola tutte le sezioni della dashboard.

> [!TIP]
> Questo approccio con FileReader API è stato scelto deliberatamente per consentire l'apertura della dashboard direttamente dal filesystem (`file://`) senza necessità di un server HTTP locale.

#### Sezione 1 — Aule & Posti
- **KPI Cards:** 3 card in evidenza: Aule Libere, Posti Disponibili, Edificio Top.
- **Griglia Aule:** Card visuale per ogni aula con:
  - Badge di stato colorato (verde=Libera, rosso=In Lezione, arancione=Occupata Studio)
  - Nome e ID aula
  - Edificio di appartenenza
  - Barra di occupazione con colore dinamico:
    - Verde: occupazione < 50%
    - Arancione: occupazione 50%–85%
    - Rosso: occupazione > 85%
  - Contatore posti disponibili / totali
  - Icona prese elettriche
  - Orario "libera fino a"

#### Sezione 2 — Bacheca Avvisi
Visualizza avvisi e comunicazioni relative al campus. Avvisi inclusi nel dataset demo:
- Orario ridotto biblioteca durante sessione d'esame
- Manutenzione straordinaria Aula B110 (weekend)
- Nuovi posti studio aggiunti in Sala Studio 2

#### Sezione 3 — Info Campus & Orari
Informazioni statiche sul campus:
- Orari di apertura degli edifici
- Contatti amministrativi
- Regole di utilizzo degli spazi
- Mappa testuale degli edifici

#### Sezione 4 — Analytics & KPI
Pannello analitico con:
- Capienza totale campus
- Posti attualmente occupati
- Occupazione globale con progress bar
- Distribuzione per edificio (lista ordinata)
- Riepilogo stati (Libere / In Lezione / Occupate Studio)

#### Filtri
- **Ricerca testuale:** Filtra le card per nome aula o ID (ricerca in tempo reale).
- **Filtro Edificio:** Menu a tendina con tutti gli edifici disponibili.
- **Filtro Prese Elettriche:** Toggle per visualizzare solo le aule con prese.

---

## Modello dei Dati

### Schema JSON — Oggetto Aula

```json
{
  "id": "SC-001",
  "edificio": "Edificio A - Ingegneria",
  "aula": "Aula A101",
  "stato": "Libera",
  "capienza_totale": 40,
  "posti_disponibili": 10,
  "posti_occupati": 30,
  "prese_elettriche": true,
  "libera_fino_a": "16:30",
  "docente_referente": "Prof. Rossi",
  "data_aggiornamento": "2026-11-09T08:00:00"
}
```

### Descrizione dei Campi

| Campo | Tipo | Obbligatorio | Validazione | Descrizione |
|-------|------|--------------|-------------|-------------|
| `id` | string | ✅ | Formato `SC-\d{3}` | Identificatore univoco aula |
| `edificio` | string | ✅ | Non vuoto | Nome completo dell'edificio |
| `aula` | string | ✅ | Non vuoto | Nome/numero dell'aula |
| `stato` | string | ✅ | Enum: "Libera", "In Lezione", "Occupata Studio" | Stato corrente dell'aula |
| `capienza_totale` | int | ✅ | > 0 | Numero massimo di posti |
| `posti_disponibili` | int | ✅ | ≥ 0, ≤ capienza_totale | Posti attualmente liberi |
| `posti_occupati` | int | ✅ | = capienza_totale - posti_disponibili | Posti attualmente occupati |
| `prese_elettriche` | bool | ✅ | true / false | Presenza di prese elettriche |
| `libera_fino_a` | string | ❌ | Formato `HH:MM` o "N/D" | Orario di liberazione previsto |
| `docente_referente` | string | ❌ | — | Nome del docente responsabile |
| `data_aggiornamento` | string | ✅ | ISO 8601 datetime | Timestamp ultimo aggiornamento |

### Invarianti del Modello

1. `posti_occupati` = `capienza_totale` - `posti_disponibili`
2. Se `posti_disponibili` = 0 e `stato` = "Libera", la CLI lo corregge automaticamente.
3. `posti_disponibili` non può essere negativo.
4. L'`id` deve essere univoco nell'array.

---

## KPI Dimostrativi

Calcolati sul dataset demo composto da 6 aule:

| KPI | Valore | Note |
|-----|--------|------|
| Aule totali | 6 | — |
| Aule libere | 4 (67%) | SC-001, SC-003, SC-005, SC-006 |
| Aule in lezione | 1 (17%) | SC-002 |
| Aule occupate studio | 1 (17%) | SC-004 |
| Capienza totale | 172 posti | Somma capienza_totale |
| Posti occupati | 70 posti | Somma posti_occupati |
| Posti disponibili (aule libere) | 72 posti | SC-001:10, SC-003:18, SC-005:32, SC-006:12 |
| Occupazione globale | ~41% | 70/172 |
| Edificio top (più posti liberi) | Edificio C - Lettere | 32 posti (SC-005) |
| Aule con prese elettriche | 4 (67%) | SC-001, SC-002, SC-004, SC-005 |

### Dettaglio Dataset Demo

| ID | Aula | Edificio | Stato | Disp/Tot | Prese | Libera Fino |
|----|------|----------|-------|----------|-------|-------------|
| SC-001 | Aula A101 | Edificio A - Ingegneria | Libera | 10/40 | ✅ | 16:30 |
| SC-002 | Lab 3 | Edificio A - Ingegneria | In Lezione | 0/32 | ✅ | N/D |
| SC-003 | Aula B204 | Edificio B - Economia | Libera | 18/24 | ❌ | N/D |
| SC-004 | Sala Studio 2 | Biblioteca Centrale | Occupata Studio | 6/20 | ✅ | N/D |
| SC-005 | Aula C012 | Edificio C - Lettere | Libera | 32/40 | ✅ | N/D |
| SC-006 | Aula B110 | Edificio B - Economia | Libera | 12/16 | ❌ | N/D |

---

## Vincoli e Assunzioni

### Vincoli Tecnici

| Vincolo | Descrizione | Motivazione |
|---------|-------------|-------------|
| Python stdlib only | Nessun pacchetto pip | Regola hackathon, massima portabilità |
| Nessun server | Nessun Flask, Django, FastAPI | Funzionamento offline, semplicità |
| Nessun database | File JSON/CSV come storage | Zero configurazione |
| Nessun framework JS | Vanilla JS puro | Nessuna dipendenza npm |
| File:// compatibility | Dashboard apribile senza server | Accessibilità immediata |
| Windows batch script | AVVIA.bat per avvio semplificato | Target OS principale |

### Assunzioni

1. **Python 3.6+** è installato sulla macchina dell'operatore (necessario per f-string).
2. **Un browser moderno** (Chrome 80+, Firefox 75+, Edge 80+) è disponibile per la dashboard.
3. **Gli aggiornamenti sono manuali:** Non esiste sincronizzazione automatica tra CLI e dashboard (l'utente deve ricaricare il file JSON nella dashboard dopo ogni aggiornamento CLI).
4. **Dataset piccolo:** Il sistema è progettato per campus con un numero gestibile di aule (< 1000). Performance non ottimizzata per dataset molto grandi.
5. **Utente singolo:** Non è prevista la gestione concorrente del file JSON da parte di più operatori simultaneamente.
6. **Nessuna autenticazione:** Il sistema non gestisce utenti, ruoli o permessi. Chiunque abbia accesso al file può modificarlo.

### Limitazioni Note

- La dashboard mostra dati statici: riflette il JSON al momento del caricamento, non si aggiorna automaticamente.
- Non esiste meccanismo di rollback: le modifiche alla CLI sovrascrivono il file senza versionamento.
- Il formato orario "libera fino a" è puramente informativo: non esiste logica automatica di sblocco all'orario indicato.

---

## Roadmap Futura

### Fase 2 — Backend Leggero (Q1 2027)

- **Integrazione database SQLite:** Migrazione da JSON a SQLite per gestione concorrente e query avanzate.
- **API REST con Flask/FastAPI:** Esposizione dei dati tramite API RESTful per consentire aggiornamenti da più client simultaneamente.
- **Autenticazione base:** Sistema di login semplice per differenziare operatori e studenti.
- **Aggiornamento in tempo reale:** WebSocket o polling regolare nella dashboard per aggiornamento automatico.

### Fase 3 — Integrazione IoT (Q2 2027)

- **Sensori di occupazione:** Integrazione con sensori PIR o contatori di persone per aggiornamento automatico dei posti occupati.
- **Feed automatico da calendari:** Integrazione con sistemi di gestione orari accademici (es. ESSE3, Moodle) per importare automaticamente gli orari delle lezioni.
- **Notifiche push:** Sistema di alert per studenti quando un'aula di interesse diventa libera.

### Fase 4 — App Mobile e Scalabilità (Q3-Q4 2027)

- **Progressive Web App (PWA):** Dashboard trasformata in PWA installabile su smartphone.
- **Multi-campus:** Supporto per più campus con aggregazione dati centralizzata.
- **Dashboard amministrativa avanzata:** Report storici, analytics avanzate, heatmap di utilizzo.
- **Integrazione con servizi universitari:** SSO con credenziali ateneo, integrazione con segreteria online.

### Considerazioni di Scalabilità

```
Prototipo (attuale)     Fase 2              Fase 3+
─────────────────────── ──────────────────  ─────────────────────
JSON file locale        SQLite + REST API   PostgreSQL + microservizi
Nessuna auth            Auth base           SSO universitario
Dati statici            Polling/WebSocket   IoT real-time
1 campus, <100 aule     1 campus, <500      Multi-campus, illimitato
```

---

## Team e Ruoli

| Membro | Ruolo Principale | Responsabilità |
|--------|-----------------|----------------|
| **Alessandro Matrigiano** | Team Lead & Backend Dev | Architettura sistema, sviluppo `main.py`, gestione repository, coordinamento team |
| **Giuseppe Ragno** | Frontend Dev | Sviluppo `index.html`, `style.css`, `app.js`; design UI/UX dashboard |
| **Pietro Lombardi** | Data & Testing | Definizione modello dati, generazione dataset demo, test funzionali, documentazione |
| **Gabriel Loconte** | Presentazione & DevOps | Sviluppo presentazione 9 slide, `AVVIA.bat`, documentazione utente, demo live |

### Suddivisione del Lavoro

```
Alessandro    ████████████████████░░░░  Backend CLI (60%), Architettura (20%)
Giuseppe      ████████████████████████  Frontend Dashboard (80%), UI Design (20%)
Pietro        ████████████░░░░░░░░░░░░  Data modeling (40%), Testing (60%)
Gabriel       ████████████████░░░░░░░░  Presentazione (50%), DevOps (20%), Docs (30%)
```

### Comunicazione e Collaborazione

- **Repository:** Struttura condivisa con cartelle separate per ogni modulo
- **Review:** Revisione incrociata del codice prima della demo
- **Stand-up:** Allineamenti rapidi all'inizio di ogni sessione di lavoro
- **Documentazione:** Redatta in parallelo allo sviluppo

---

## Conclusioni

**Smart Campus Space Finder** dimostra che è possibile costruire una soluzione utile, funzionale e ben strutturata rispettando vincoli tecnologici severi come l'assenza di framework, database e connettività. Il progetto raggiunge tutti gli obiettivi primari definiti nella fase di analisi e offre una base solida per evoluzioni future.

Il valore principale del progetto non è solo tecnico, ma metodologico: la semplicità dell'architettura permette a chiunque — studente, docente, amministrativo — di comprendere immediatamente come funziona il sistema, di modificarlo, estenderlo e adattarlo alle proprie esigenze.

L'approccio "offline-first" con file JSON locale è una scelta consapevole che permette un'adozione immediata in qualsiasi contesto, senza requisiti infrastrutturali. Questo lo rende adatto non solo a grandi atenei con risorse IT dedicate, ma anche a piccole scuole, istituti di formazione professionale o qualsiasi realtà che necessiti di gestire spazi condivisi in modo semplice ed efficace.

Il team è convinto che questo prototipo, pur nella sua semplicità, rappresenti un punto di partenza reale e concreto per un prodotto che potrebbe fare la differenza nella vita quotidiana degli studenti universitari italiani.

---

*Documento redatto dal team Smart Campus Space Finder per la Python Innovation Hackathon – Challenge 1 · Novembre 2026*  
*Versione 1.0 — Tutti i diritti riservati al team*
