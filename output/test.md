# Smart Campus Space Finder — Piano di Test Completo

**Progetto:** Smart Campus Space Finder  
**Evento:** Python Innovation Hackathon – Challenge 1  
**Data:** Novembre 2026  
**Team:** Alessandro Matrigiano, Giuseppe Ragno, Pietro Lombardi, Gabriel Loconte  
**Responsabile Test:** Pietro Lombardi  
**Versione documento:** 1.0

---

## Indice

1. [Introduzione e Scope](#introduzione-e-scope)
2. [Strategia di Test](#strategia-di-test)
3. [Test Cases — CLI Python](#test-cases--cli-python)
4. [Test Cases — Dashboard Web](#test-cases--dashboard-web)
5. [Test di Integrazione](#test-di-integrazione)
6. [Test di Usabilità](#test-di-usabilità)
7. [Test di Compatibilità Browser](#test-di-compatibilità-browser)
8. [Checklist Pre-Demo](#checklist-pre-demo)
9. [Bug Noti e Workaround](#bug-noti-e-workaround)
10. [Istruzioni per Eseguire i Test](#istruzioni-per-eseguire-i-test)

---

## Introduzione e Scope

Questo documento definisce il piano di test completo per il progetto **Smart Campus Space Finder**. L'obiettivo è garantire che tutte le funzionalità del sistema siano verificate prima della presentazione finale all'hackathon.

### Scope dei Test

Il piano copre i seguenti componenti:

| Componente | File | Tipo di Test |
|------------|------|--------------|
| CLI Python | `main.py` | Funzionale, Edge Case, Input Validation |
| Dashboard Web | `index.html`, `app.js`, `style.css` | Funzionale, UI, Compatibilità |
| Layer Dati | `data.json`, `data.csv` | Integrità, Integrazione |
| Presentazione | `presentazione.html` | Navigabilità, Visualizzazione |
| Script avvio | `AVVIA.bat` | Esecuzione |

### Fuori Scope

- Test di performance ad alto carico (il sistema è progettato per uso mono-utente)
- Test di sicurezza avanzati (nessun dato sensibile, nessuna rete)
- Test su dispositivi mobili fisici (solo browser desktop)
- Test automatizzati (tutti i test sono manuali)

### Ambiente di Test

| Parametro | Valore |
|-----------|--------|
| OS | Windows 10/11 |
| Python | 3.8+ |
| Browser primario | Google Chrome 120+ |
| Browser secondari | Firefox 115+, Microsoft Edge 120+ |
| Directory progetto | `c:\Users\A968apulia\Desktop\SmartCampus\smart-campus-space-finder\` |
| File dati | `data.json` (6 record demo) |

---

## Strategia di Test

### Approccio

Tutti i test sono eseguiti **manualmente** seguendo le istruzioni descritte in ogni test case. Ogni test deve essere eseguito nell'ordine indicato per evitare dipendenze di stato.

### Classificazione dei Test

| Priorità | Descrizione |
|----------|-------------|
| 🔴 P1 — Critico | Il sistema non è demo-ready se questo test fallisce |
| 🟠 P2 — Alto | Funzionalità importante, deve funzionare per la demo |
| 🟡 P3 — Medio | Funzionalità secondaria, preferibile che funzioni |
| 🟢 P4 — Basso | Nice-to-have, può essere tralasciato in caso di tempo limitato |

### Esito dei Test

| Esito | Significato |
|-------|-------------|
| ✅ PASS | Test superato, comportamento conforme all'atteso |
| ❌ FAIL | Test fallito, comportamento non conforme |
| ⚠️ PARTIAL | Test parzialmente superato, con limitazioni note |
| ⏭️ SKIP | Test saltato (dipendenza non soddisfatta) |
| 🔄 RETEST | Test da ripetere dopo una correzione |

---

## Test Cases — CLI Python

> [!IMPORTANT]
> Prima di eseguire i test CLI, assicurarsi che il file `data.json` contenga i 6 record demo originali. Fare una copia di backup: `copy data.json data.json.backup`

### Gruppo A — Avvio e Menu Principale

| ID | Descrizione | Passi | Input | Risultato Atteso | Priorità |
|----|-------------|-------|-------|------------------|----------|
| CLI-A01 | Avvio corretto della CLI | 1. Aprire terminale nella dir del progetto<br>2. Eseguire `python main.py` | — | Menu principale visualizzato con 8 voci numerate, nessun errore | 🔴 P1 |
| CLI-A02 | Avvio tramite AVVIA.bat | 1. Doppio click su `AVVIA.bat` | — | Finestra terminale aperta con menu CLI visualizzato | 🟠 P2 |
| CLI-A03 | Input non numerico al menu | 1. Avviare CLI<br>2. Inserire lettera al prompt menu | `abc` | Messaggio di errore, menu ripresentato senza crash | 🔴 P1 |
| CLI-A04 | Input fuori range al menu | 1. Avviare CLI<br>2. Inserire numero non valido | `9` | Messaggio "Scelta non valida", menu ripresentato | 🟠 P2 |
| CLI-A05 | Input vuoto al menu | 1. Avviare CLI<br>2. Premere Invio senza inserire nulla | `` | Messaggio di errore o menu ripresentato, nessun crash | 🟠 P2 |

### Gruppo B — Voce 1: Visualizzazione Aule

| ID | Descrizione | Passi | Input | Risultato Atteso | Priorità |
|----|-------------|-------|-------|------------------|----------|
| CLI-B01 | Visualizzazione lista completa | 1. Avviare CLI<br>2. Selezionare voce 1 | `1` | Tabella con 6 righe (una per aula), intestazioni visibili | 🔴 P1 |
| CLI-B02 | Correttezza dei dati visualizzati | 1. Visualizzare lista<br>2. Verificare SC-001 | `1` | SC-001: Aula A101, Libera, 10/40, prese: Sì, 16:30 | 🔴 P1 |
| CLI-B03 | Colonne correttamente allineate | 1. Visualizzare lista<br>2. Verificare allineamento visivo | `1` | Colonne visivamente allineate, nessuna sovrapposizione testo | 🟡 P3 |

### Gruppo C — Voce 2: Inserimento e Aggiornamento

| ID | Descrizione | Passi | Input | Risultato Atteso | Priorità |
|----|-------------|-------|-------|------------------|----------|
| CLI-C01 | Inserimento nuova aula valida | 1. Selezionare voce 2<br>2. Inserire dati validi per nuova aula | ID: `SC-007`, Edificio: `Test Edificio`, Aula: `Test Aula`, Stato: `Libera`, Capienza: `20`, Disponibili: `15`, Prese: `s` | Aula aggiunta, visibile nella lista, dati corretti | 🔴 P1 |
| CLI-C02 | Aggiornamento aula esistente | 1. Selezionare voce 2<br>2. Inserire ID esistente con nuovi dati | ID: `SC-001`, nuova capienza: `50` | Dati SC-001 aggiornati, `data_aggiornamento` refresh | 🟠 P2 |
| CLI-C03 | ID in formato non valido | 1. Selezionare voce 2<br>2. Inserire ID malformato | ID: `AULA1` | Messaggio di errore validazione formato ID | 🔴 P1 |
| CLI-C04 | Capienza non numerica | 1. Selezionare voce 2<br>2. Inserire capienza non valida | Capienza: `abc` | Messaggio di errore, richiesta reinput o abort | 🔴 P1 |
| CLI-C05 | Posti disponibili > capienza | 1. Selezionare voce 2<br>2. Capienza 10, disponibili 15 | Capienza: `10`, Disponibili: `15` | Messaggio di errore logico, non accetta dati inconsistenti | 🔴 P1 |
| CLI-C06 | Posti disponibili negativi | 1. Selezionare voce 2<br>2. Inserire valore negativo | Disponibili: `-5` | Messaggio di errore, valore rifiutato | 🟠 P2 |
| CLI-C07 | Stato non valido | 1. Selezionare voce 2<br>2. Inserire stato non in lista | Stato: `Chiusa` | Messaggio di errore o selezione da lista forzata | 🟠 P2 |
| CLI-C08 | Formato orario non valido | 1. Selezionare voce 2<br>2. Inserire orario malformato | Libera fino a: `25:70` | Messaggio di errore validazione orario | 🟡 P3 |
| CLI-C09 | Formato orario "N/D" accettato | 1. Selezionare voce 2<br>2. Inserire N/D come orario | Libera fino a: `N/D` | Valore accettato e salvato correttamente | 🟡 P3 |

### Gruppo D — Voce 3: Eliminazione

| ID | Descrizione | Passi | Input | Risultato Atteso | Priorità |
|----|-------------|-------|-------|------------------|----------|
| CLI-D01 | Eliminazione con conferma | 1. Selezionare voce 3<br>2. Inserire ID esistente<br>3. Confermare | ID: `SC-007`, Conferma: `s` | Aula eliminata, non più visibile nella lista | 🟠 P2 |
| CLI-D02 | Eliminazione con rifiuto | 1. Selezionare voce 3<br>2. Inserire ID esistente<br>3. Rifiutare | ID: `SC-001`, Conferma: `n` | Aula non eliminata, messaggio di operazione annullata | 🔴 P1 |
| CLI-D03 | Eliminazione ID inesistente | 1. Selezionare voce 3<br>2. Inserire ID non esistente | ID: `SC-999` | Messaggio "Aula non trovata", nessun crash | 🔴 P1 |

### Gruppo E — Voce 4: Prenotazione

| ID | Descrizione | Passi | Input | Risultato Atteso | Priorità |
|----|-------------|-------|-------|------------------|----------|
| CLI-E01 | Prenotazione posto valido | 1. Selezionare voce 4<br>2. Inserire ID aula con posti disponibili | ID: `SC-003` (18 disponibili) | `posti_disponibili` decrementato a 17, `posti_occupati` a 7 | 🔴 P1 |
| CLI-E02 | Prenotazione su aula piena | 1. Selezionare voce 4<br>2. Inserire ID aula piena | ID: `SC-002` (0 disponibili) | Messaggio "Nessun posto disponibile", nessuna modifica | 🔴 P1 |
| CLI-E03 | Cambio stato automatico (ultimo posto) | 1. Portare aula a 1 posto disponibile<br>2. Prenotare ultimo posto | ID aula con 1 posto | `posti_disponibili` = 0, stato aggiornato automaticamente | 🟠 P2 |
| CLI-E04 | Prenotazione ID inesistente | 1. Selezionare voce 4<br>2. Inserire ID non esistente | ID: `SC-999` | Messaggio "Aula non trovata", nessun crash | 🔴 P1 |

### Gruppo F — Voce 5 e 6: Filtri e KPI

| ID | Descrizione | Passi | Input | Risultato Atteso | Priorità |
|----|-------------|-------|-------|------------------|----------|
| CLI-F01 | Filtro aule libere per edificio esistente | 1. Selezionare voce 5<br>2. Selezionare Edificio A | `Edificio A - Ingegneria` | Solo SC-001 mostrata (SC-002 è In Lezione) | 🟠 P2 |
| CLI-F02 | Filtro edificio senza aule libere | 1. Selezionare voce 5<br>2. Selezionare edificio con tutte le aule occupate | — | Messaggio "Nessuna aula libera in questo edificio" | 🟡 P3 |
| CLI-F03 | Visualizzazione KPI corretti | 1. Selezionare voce 6 | `6` | KPI: 4 libere, 72 posti disponibili, occupazione ~41% | 🔴 P1 |
| CLI-F04 | KPI aggiornati dopo modifica | 1. Prenotare posto in SC-003<br>2. Visualizzare KPI | — | Posti disponibili aggiornati, percentuale aggiornata | 🟠 P2 |

### Gruppo G — Voce 7 e 8: Salvataggio e Uscita

| ID | Descrizione | Passi | Input | Risultato Atteso | Priorità |
|----|-------------|-------|-------|------------------|----------|
| CLI-G01 | Salvataggio manuale JSON | 1. Fare una modifica<br>2. Selezionare voce 7 | `7` | `data.json` aggiornato su disco, messaggio di conferma | 🔴 P1 |
| CLI-G02 | Generazione CSV al salvataggio | 1. Selezionare voce 7 | `7` | `data.csv` creato/aggiornato con dati corretti | 🟠 P2 |
| CLI-G03 | Uscita con salvataggio automatico | 1. Fare una modifica<br>2. Selezionare voce 8 | `8` | Dati salvati, programma terminato senza crash | 🔴 P1 |
| CLI-G04 | Verifica integrità JSON dopo salvataggio | 1. Salvare<br>2. Aprire data.json con editor | — | JSON valido, struttura corretta, dati aggiornati | 🔴 P1 |

---

## Test Cases — Dashboard Web

> [!IMPORTANT]
> Per testare la dashboard, aprire `index.html` direttamente nel browser (non tramite server HTTP). Usare `data.json` originale o aggiornato dalla CLI.

### Gruppo H — Caricamento e Inizializzazione

| ID | Descrizione | Passi | Input | Risultato Atteso | Priorità |
|----|-------------|-------|-------|------------------|----------|
| DASH-H01 | Apertura dashboard senza file | 1. Aprire `index.html` nel browser | — | Pagina caricata, area di upload visibile, nessun errore JS | 🔴 P1 |
| DASH-H02 | Caricamento file JSON valido | 1. Aprire dashboard<br>2. Cliccare sfoglia<br>3. Selezionare `data.json` | `data.json` (6 record) | Dati caricati, KPI aggiornati, card aule visualizzate | 🔴 P1 |
| DASH-H03 | Caricamento file JSON non valido | 1. Aprire dashboard<br>2. Caricare un file di testo casuale | File non-JSON | Messaggio di errore, nessun crash | 🟠 P2 |
| DASH-H04 | Caricamento file JSON vuoto | 1. Creare file JSON vuoto `{}`<br>2. Caricarlo nella dashboard | `{}` | Messaggio informativo "Nessuna aula trovata" | 🟡 P3 |

### Gruppo I — Sezione KPI e Aule

| ID | Descrizione | Passi | Input | Risultato Atteso | Priorità |
|----|-------------|-------|-------|------------------|----------|
| DASH-I01 | Correttezza KPI Aule Libere | 1. Caricare data.json demo | — | Card "Aule Libere" mostra 4 | 🔴 P1 |
| DASH-I02 | Correttezza KPI Posti Disponibili | 1. Caricare data.json demo | — | Card "Posti Disponibili" mostra 72 | 🔴 P1 |
| DASH-I03 | Correttezza KPI Edificio Top | 1. Caricare data.json demo | — | Card "Edificio Top" mostra "Edificio C - Lettere" | 🔴 P1 |
| DASH-I04 | Visualizzazione 6 card aule | 1. Caricare data.json demo | — | 6 card visibili, una per ogni aula | 🔴 P1 |
| DASH-I05 | Badge stato corretto — Libera | 1. Verificare SC-001 | — | Badge verde con testo "Libera" | 🟠 P2 |
| DASH-I06 | Badge stato corretto — In Lezione | 1. Verificare SC-002 | — | Badge rosso con testo "In Lezione" | 🟠 P2 |
| DASH-I07 | Badge stato corretto — Occupata Studio | 1. Verificare SC-004 | — | Badge arancione con testo "Occupata Studio" | 🟠 P2 |
| DASH-I08 | Barra occupazione colore verde (<50%) | 1. Verificare SC-005 (20% occupazione) | — | Barra di occupazione verde (32/40 = 80%... verifica soglia) | 🟡 P3 |
| DASH-I09 | Icona prese elettriche corretta | 1. Verificare SC-001 (prese: sì) e SC-003 (prese: no) | — | Icona presa presente per SC-001, assente per SC-003 | 🟡 P3 |

### Gruppo J — Filtri

| ID | Descrizione | Passi | Input | Risultato Atteso | Priorità |
|----|-------------|-------|-------|------------------|----------|
| DASH-J01 | Ricerca per nome aula | 1. Digitare "Aula A101" nel campo ricerca | "Aula A101" | Solo SC-001 visibile | 🔴 P1 |
| DASH-J02 | Ricerca per ID | 1. Digitare "SC-003" nel campo ricerca | "SC-003" | Solo SC-003 visibile | 🟠 P2 |
| DASH-J03 | Ricerca senza risultati | 1. Digitare stringa inesistente | "XXXXXX" | Messaggio "Nessun risultato" o griglia vuota | 🟠 P2 |
| DASH-J04 | Filtro edificio | 1. Selezionare "Edificio B - Economia" dal menu | — | Solo SC-003 e SC-006 visibili | 🔴 P1 |
| DASH-J05 | Filtro prese elettriche | 1. Attivare filtro prese elettriche | — | Solo SC-001, SC-002, SC-004, SC-005 visibili | 🟠 P2 |
| DASH-J06 | Combinazione filtri | 1. Selezionare Edificio A<br>2. Attivare filtro prese | — | Solo SC-001 e SC-002 visibili | 🟡 P3 |
| DASH-J07 | Reset filtri | 1. Applicare filtro<br>2. Resettare | — | Tutte le 6 card rivisibili | 🟡 P3 |

### Gruppo K — Sezioni e Analytics

| ID | Descrizione | Passi | Input | Risultato Atteso | Priorità |
|----|-------------|-------|-------|------------------|----------|
| DASH-K01 | Navigazione sezione Analytics | 1. Cliccare tab/link Analytics | — | Sezione analytics visualizzata | 🟠 P2 |
| DASH-K02 | Dati Analytics corretti | 1. Aprire Analytics<br>2. Verificare valori | — | Capienza 172, Occupati 70, ~41% | 🟠 P2 |
| DASH-K03 | Sezione Bacheca Avvisi | 1. Navigare a Bacheca Avvisi | — | Avvisi visualizzati, nessun errore | 🟡 P3 |
| DASH-K04 | Sezione Info Campus | 1. Navigare a Info Campus | — | Informazioni campus visualizzate | 🟡 P3 |

---

## Test di Integrazione

Questi test verificano il flusso completo dall'aggiornamento CLI alla visualizzazione in dashboard.

### INT-01 — Flusso Completo di Aggiornamento

**Obiettivo:** Verificare che una modifica nella CLI sia correttamente riflessa nella dashboard.

**Prerequisiti:** `data.json` con 6 record demo, CLI avviata, dashboard aperta nel browser.

**Passi:**
1. Aprire la dashboard e caricare `data.json` (verificare che SC-003 abbia 18 posti disponibili).
2. Aprire la CLI (`python main.py`).
3. Selezionare Voce 4 (Prenota/Occupa posto).
4. Inserire ID: `SC-003`.
5. Selezionare Voce 7 (Salva manualmente).
6. Tornare alla dashboard nel browser.
7. Cliccare nuovamente "Sfoglia" e ricaricare `data.json`.
8. Verificare che SC-003 mostri 17 posti disponibili.

**Risultato Atteso:** SC-003 aggiornato da 18 a 17 posti disponibili nella dashboard.

**Priorità:** 🔴 P1

---

### INT-02 — Consistenza JSON dopo Multiple Operazioni

**Obiettivo:** Verificare che il JSON rimanga valido dopo multiple operazioni CLI.

**Passi:**
1. Avviare CLI.
2. Aggiungere una nuova aula (SC-007).
3. Modificare SC-001 (cambio capienza).
4. Prenotare un posto in SC-005.
5. Salvare (Voce 7).
6. Aprire `data.json` con un editor di testo.
7. Verificare validità JSON (es. con JSONLint online o validatore locale).
8. Caricare il JSON nella dashboard e verificare che SC-007 appaia.

**Risultato Atteso:** JSON valido, 7 record visibili nella dashboard.

**Priorità:** 🟠 P2

---

### INT-03 — Generazione e Verifica CSV

**Obiettivo:** Verificare che il CSV generato sia correttamente formattato e coerente con il JSON.

**Passi:**
1. Avviare CLI con il dataset demo.
2. Selezionare Voce 7 (Salva).
3. Aprire `data.csv` con un editor di testo o LibreOffice Calc.
4. Verificare che il numero di righe = numero di aule + 1 (intestazione).
5. Verificare che i valori corrispondano al JSON.

**Risultato Atteso:** CSV con 7 righe (1 intestazione + 6 dati), valori corretti.

**Priorità:** 🟠 P2

---

### INT-04 — Ripristino da Backup

**Obiettivo:** Verificare che sia possibile ripristinare i dati originali dal backup.

**Passi:**
1. Fare una copia di backup: `copy data.json data.json.test_backup`
2. Eseguire varie modifiche nella CLI.
3. Salvare.
4. Copiare il backup: `copy data.json.test_backup data.json`
5. Aprire la CLI: verificare che siano tornati i 6 record originali.

**Risultato Atteso:** Dataset originale ripristinato correttamente.

**Priorità:** 🟡 P3

---

## Test di Usabilità

Questi test valutano la facilità d'uso del sistema, in particolare per utenti non tecnici.

### USAB-01 — Prima Esperienza CLI

**Scenario:** Un docente che non ha mai usato la CLI deve aggiornare lo stato di un'aula.

**Metriche:**
- Tempo per completare l'operazione: < 2 minuti
- Numero di errori commessi: ≤ 2
- Necessità di aiuto esterno: Nessuna

**Protocollo:**
1. Fornire all'utente test solo la CLI avviata.
2. Chiedere di cambiare lo stato di "Aula A101" da Libera a In Lezione.
3. Osservare e annotare difficoltà.

**Criteri di Successo:** L'utente completa l'operazione senza assistenza nel tempo limite.

---

### USAB-02 — Prima Esperienza Dashboard

**Scenario:** Uno studente deve trovare un'aula libera con prese elettriche nell'Edificio A.

**Metriche:**
- Tempo per trovare l'informazione: < 30 secondi
- Numero di azioni errate: ≤ 1

**Protocollo:**
1. Fornire all'utente test la dashboard aperta nel browser.
2. Chiedere di trovare un'aula libera con prese in Edificio A.
3. Osservare e annotare.

**Criteri di Successo:** L'utente trova SC-001 (unica aula che soddisfa i criteri) in meno di 30 secondi.

---

### USAB-03 — Chiarezza dei KPI

**Scenario:** Un amministratore vuole sapere quante aule sono libere e quanti posti sono disponibili.

**Protocollo:**
1. Mostrare la dashboard caricata all'utente test.
2. Chiedere: "Quante aule sono libere?" e "Quanti posti sono disponibili?"

**Criteri di Successo:** L'utente risponde correttamente (4 aule, 72 posti) in meno di 10 secondi.

---

## Test di Compatibilità Browser

| ID | Browser | Versione | Test | Risultato Atteso | Eseguito? |
|----|---------|----------|------|------------------|-----------|
| COMPAT-01 | Google Chrome | 120+ | Apertura dashboard, caricamento JSON, filtri | Funziona completamente | ☐ |
| COMPAT-02 | Mozilla Firefox | 115+ | Apertura dashboard, caricamento JSON, filtri | Funziona completamente | ☐ |
| COMPAT-03 | Microsoft Edge | 120+ | Apertura dashboard, caricamento JSON, filtri | Funziona completamente | ☐ |
| COMPAT-04 | Google Chrome | 80-119 | Apertura dashboard, funzionalità base | Funziona con possibili differenze minori di stile | ☐ |
| COMPAT-05 | Internet Explorer | 11 | Apertura dashboard | Non supportato (ES6 non compatibile) — Messaggio di errore atteso | ☐ |
| COMPAT-06 | Chrome (mobile simulato) | — | Responsive layout | Layout adattato, funzionalità base accessibili | ☐ |

> [!NOTE]
> La compatibilità con Internet Explorer 11 non è un requisito del progetto. L'obiettivo minimo è il supporto ai tre browser moderni: Chrome, Firefox, Edge.

---

## Checklist Pre-Demo

Eseguire questa checklist **almeno 30 minuti prima** della presentazione.

### Preparazione Ambiente

- [ ] Python 3.x installato e funzionante (`python --version`)
- [ ] Browser moderno aperto e aggiornato
- [ ] Directory `smart-campus-space-finder` aperta nel file explorer
- [ ] File `data.json` con i 6 record demo originali (non modificati)
- [ ] Backup di `data.json` effettuato (`data.json.demo_backup`)
- [ ] Terminale aperto nella directory del progetto

### Verifica CLI

- [ ] `python main.py` si avvia senza errori
- [ ] Voce 1 mostra correttamente le 6 aule
- [ ] Voce 6 mostra KPI corretti (4 libere, 72 posti, ~41% occupazione)
- [ ] `AVVIA.bat` funziona con doppio click

### Verifica Dashboard

- [ ] `index.html` si apre nel browser senza errori (Console DevTools: nessun errore rosso)
- [ ] Caricamento di `data.json` funziona
- [ ] Tutte e 4 le sezioni sono navigabili
- [ ] I 3 filtri funzionano
- [ ] I KPI mostrano valori corretti

### Verifica Presentazione

- [ ] `presentazione.html` si apre nel browser
- [ ] Tutte e 9 le slide sono navigabili
- [ ] Le slide non hanno errori visivi
- [ ] Font e colori corretti

### Scenario Demo Preparato

- [ ] Flusso 1 pronto: CLI → Voce 1 → Voce 6
- [ ] Flusso 2 pronto: CLI → Voce 4 (prenotazione SC-003) → Salva → Dashboard (ricarica)
- [ ] Dataset ripristinato ai valori originali dopo i test

### Piano di Contingenza

- [ ] In caso di crash CLI: ripristinare `data.json` dal backup e riavviare
- [ ] In caso di errore dashboard: provare con browser alternativo
- [ ] In caso di crash Python: verificare versione Python e riavviare

---

## Bug Noti e Workaround

### BUG-001 — Dashboard Non Aggiorna Automaticamente

**Descrizione:** La dashboard non rileva automaticamente le modifiche al `data.json` apportate dalla CLI. Richiede un ricaricamento manuale del file.

**Impatto:** Basso (comportamento documentato, non è un bug ma una limitazione architetturale)

**Workaround:** Dopo ogni modifica CLI, tornare alla dashboard e ricaricare il file JSON tramite il pulsante Sfoglia.

**Stato:** Accettato (limitazione by design, nella roadmap per Fase 2)

---

### BUG-002 — Messaggio Errore Generico su Input Non Numerico

**Descrizione:** In alcune voci di menu, l'inserimento di input non numerico dove è atteso un intero mostra un messaggio di errore Python generico invece di un messaggio user-friendly.

**Impatto:** Medio (non causa crash, ma scarsa UX)

**Workaround:** Assicurarsi durante la demo di inserire solo valori numerici validi per i campi quantitativi.

**Stato:** Parzialmente risolto — aggiungere try/except con messaggi custom nei casi critici.

---

### BUG-003 — Allineamento Tabella CLI su Terminali Stretti

**Descrizione:** Se la finestra del terminale è troppo stretta (<80 colonne), le colonne della tabella si sovrappongono.

**Impatto:** Basso (puramente visivo)

**Workaround:** Allargare la finestra del terminale a fullscreen o almeno 100 colonne prima della demo.

**Stato:** Accettato per la demo.

---

### BUG-004 — FileReader API in Firefox con file:// su alcuni path

**Descrizione:** Su alcune configurazioni di Firefox, il caricamento di file locali tramite FileReader API potrebbe essere bloccato da restrizioni di sicurezza per i file aperti con il protocollo `file://`.

**Impatto:** Alto (blocca la demo su Firefox)

**Workaround:** Usare Google Chrome o Microsoft Edge per la demo della dashboard. Alternativamente, avviare un server HTTP locale: `python -m http.server 8080` e aprire `http://localhost:8080/index.html`.

**Stato:** Documentato — raccomandato uso di Chrome per la demo.

---

## Istruzioni per Eseguire i Test

### Setup Iniziale

```powershell
# 1. Aprire PowerShell nella directory del progetto
cd "c:\Users\A968apulia\Desktop\SmartCampus\smart-campus-space-finder"

# 2. Creare backup del dataset demo
Copy-Item data.json data.json.test_backup

# 3. Verificare Python installato
python --version

# 4. Avviare la CLI per test
python main.py
```

### Esecuzione Test CLI

Seguire i test cases nell'ordine dei gruppi (A → B → C → ... → G). Per ogni test:
1. Leggere la descrizione e i passi.
2. Eseguire i passi nell'ordine indicato.
3. Confrontare il risultato ottenuto con il risultato atteso.
4. Annotare l'esito (PASS / FAIL / PARTIAL) nella colonna apposita.
5. Per i test FAIL, annotare il comportamento effettivo osservato.

### Esecuzione Test Dashboard

```powershell
# Aprire index.html in Chrome
Start-Process "chrome" "c:\Users\A968apulia\Desktop\SmartCampus\smart-campus-space-finder\index.html"
```

Seguire i test cases nell'ordine dei gruppi (H → I → J → K).

### Ripristino Dataset dopo i Test

```powershell
# Ripristinare il dataset originale
Copy-Item data.json.test_backup data.json
```

### Registrazione dei Risultati

Creare una tabella di esito con le seguenti colonne per ogni test eseguito:

| ID Test | Esito | Note | Data | Testatore |
|---------|-------|------|------|-----------|
| CLI-A01 | ✅ PASS | — | 09/11/2026 | P. Lombardi |
| ... | ... | ... | ... | ... |

---

*Documento redatto dal team Smart Campus Space Finder per la Python Innovation Hackathon – Challenge 1 · Novembre 2026*  
*Responsabile Test: Pietro Lombardi — Versione 1.0*
