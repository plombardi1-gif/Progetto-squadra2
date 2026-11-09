# Smart Campus Space Finder
## Documentazione Tecnica Completa

---

> **Titolo:** Smart Campus Space Finder — Documentazione Tecnica  
> **Sottotitolo:** Sistema di Gestione e Visualizzazione degli Spazi del Campus  
> **Evento:** Python Innovation Hackathon – Challenge 1 · Smart Campus  
> **Team:** Alessandro Matrigiano, Giuseppe Ragno, Pietro Lombardi, Gabriel Loconte  
> **Data:** Novembre 2026  
> **Versione documento:** 1.0  
> **Stato:** Documento Finale

---

## Indice

1. [Introduzione e Contesto](#1-introduzione-e-contesto)
2. [Architettura del Sistema](#2-architettura-del-sistema)
3. [Guida all'Installazione e Avvio](#3-guida-allinstallazione-e-avvio)
4. [Manuale della CLI Python](#4-manuale-della-cli-python)
5. [Manuale della Dashboard Web](#5-manuale-della-dashboard-web)
6. [Modello dei Dati](#6-modello-dei-dati)
7. [Flusso Operativo](#7-flusso-operativo)
8. [Gestione degli Errori](#8-gestione-degli-errori)
9. [Sicurezza e Considerazioni](#9-sicurezza-e-considerazioni)
10. [Test e Qualità](#10-test-e-qualità)
11. [Roadmap e Sviluppi Futuri](#11-roadmap-e-sviluppi-futuri)
12. [Glossario](#12-glossario)
13. [Appendice](#13-appendice)

---

## 1. Introduzione e Contesto

### 1.1 Panoramica del Progetto

**Smart Campus Space Finder** è un sistema software sviluppato per la **Python Innovation Hackathon – Challenge 1**, con l'obiettivo di risolvere un problema concreto e quotidiano nella vita universitaria: la difficoltà di trovare in modo rapido e affidabile uno spazio disponibile (aula, laboratorio, sala studio) all'interno del campus universitario.

Il sistema nasce dall'osservazione diretta delle criticità organizzative tipiche degli ambienti universitari italiani: assenza di informazioni centralizzate e aggiornate, dispersione delle comunicazioni, inefficienza nell'utilizzo degli spazi disponibili e mancanza di strumenti accessibili tanto agli studenti quanto al personale.

### 1.2 Obiettivo del Documento

Questa documentazione tecnica è il riferimento ufficiale per:
- **Sviluppatori** che vogliono comprendere, estendere o manutenere il sistema.
- **Operatori** (personale universitario, docenti) che usano la CLI per aggiornare i dati.
- **Utenti finali** (studenti) che usano la dashboard web per trovare spazi disponibili.
- **Commissione hackathon** che valuta il progetto in sede di demo.

### 1.3 Contesto del Problema

La gestione degli spazi universitari presenta le seguenti sfide:

**Dal punto di vista degli studenti:**
- Non sanno dove ci sono posti disponibili senza girare fisicamente per il campus.
- Le informazioni disponibili (sito web, app di terze parti) sono spesso non aggiornate.
- In periodi di sessione d'esame o eventi particolari, la pressione sugli spazi aumenta notevolmente.

**Dal punto di vista del personale:**
- Non esiste uno strumento semplice per comunicare aggiornamenti in tempo reale.
- I sistemi informativi esistenti sono complessi, poco flessibili o richiedono accesso a reti universitarie dedicate.
- L'aggiornamento manuale di bacheche fisiche è dispendioso in termini di tempo.

**Dal punto di vista dell'istituzione:**
- Le soluzioni commerciali per la gestione degli spazi sono costose e richiedono infrastrutture server significative.
- I dati sull'utilizzo degli spazi non sono facilmente aggregabili per analisi e pianificazione.

### 1.4 La Risposta: Smart Campus Space Finder

Il sistema propone un approccio radicalmente semplice:

1. Un **file JSON** (`data.json`) come unica fonte di verità per i dati degli spazi.
2. Una **CLI Python** per la gestione operativa dei dati (inserimento, modifica, cancellazione, prenotazioni).
3. Una **dashboard web SPA** per la visualizzazione intuitiva e il filtraggio delle informazioni.
4. Zero dipendenze esterne: solo Python stdlib e tecnologie web native.

Questo approccio permette di avere un sistema funzionante in qualsiasi contesto, senza bisogno di server, database, connessione internet o competenze tecniche avanzate per l'installazione.

### 1.5 Scope del Sistema

**Incluso:**
- Gestione CRUD completa delle aule (Create, Read, Update, Delete).
- Prenotazione e occupazione posti.
- Calcolo di KPI aggregati.
- Visualizzazione interattiva con filtri.
- Export dei dati in formato CSV.
- Presentazione del progetto (9 slide).

**Non incluso:**
- Autenticazione e autorizzazione utenti.
- Sincronizzazione automatica multi-dispositivo.
- Integrazione con sistemi informativi universitari esistenti.
- Notifiche push o alert automatici.
- Gestione avanzata dei conflitti di prenotazione.

---

## 2. Architettura del Sistema

### 2.1 Principi Architetturali

Il sistema è progettato seguendo i seguenti principi:

| Principio | Descrizione | Implementazione |
|-----------|-------------|-----------------|
| **Offline-First** | Funziona senza connessione | Tutti i dati sono locali |
| **Zero-Config** | Nessuna configurazione richiesta | Avvio diretto con Python |
| **Single Source of Truth** | Un solo file dati | `data.json` |
| **Separation of Concerns** | Moduli indipendenti | CLI ≠ Dashboard |
| **Fail Safe** | Nessun dato perso involontariamente | Autosave all'uscita |
| **Minimal Dependencies** | Zero dipendenze esterne | stdlib only |

### 2.2 Componenti del Sistema

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    SMART CAMPUS SPACE FINDER                             │
│                     Architettura Completa                                │
└─────────────────────────────────────────────────────────────────────────┘

LAYER PRESENTAZIONE
┌──────────────────────────┐    ┌────────────────────────────────────────┐
│   CLI PYTHON (main.py)   │    │     DASHBOARD WEB (index.html)         │
│                          │    │                                        │
│  ┌─────────────────────┐ │    │  ┌─────────────────────────────────┐  │
│  │  Menu Interattivo   │ │    │  │  Single Page Application (SPA)  │  │
│  │  (8 voci)           │ │    │  │                                 │  │
│  └─────────────────────┘ │    │  │  ┌──────────┐  ┌────────────┐  │  │
│  ┌─────────────────────┐ │    │  │  │ Sezione  │  │  Sezione   │  │  │
│  │  Input Validator    │ │    │  │  │ Aule &   │  │ Analytics  │  │  │
│  │  (tutti i campi)    │ │    │  │  │  Posti   │  │  & KPI     │  │  │
│  └─────────────────────┘ │    │  │  └──────────┘  └────────────┘  │  │
│  ┌─────────────────────┐ │    │  │  ┌──────────┐  ┌────────────┐  │  │
│  │  Business Logic     │ │    │  │  │ Bacheca  │  │    Info    │  │  │
│  │  (KPI, prenot.)     │ │    │  │  │  Avvisi  │  │   Campus   │  │  │
│  └─────────────────────┘ │    │  │  └──────────┘  └────────────┘  │  │
│  ┌─────────────────────┐ │    │  └─────────────────────────────────┘  │
│  │  File I/O           │ │    │                                        │
│  │  (json, csv, os)    │ │    │  ┌─────────────────────────────────┐  │
│  └─────────────────────┘ │    │  │  FileReader API (caric. JSON)   │  │
└──────────┬───────────────┘    │  └─────────────────────────────────┘  │
           │                    └──────────────────┬─────────────────────┘
           │ Scrittura                             │ Lettura
           ▼                                       │
LAYER DATI ▼                                       │
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│    ┌─────────────────────┐         ┌─────────────────────────────┐    │
│    │     data.json       │◄───────►│         data.csv            │    │
│    │  (Array JSON aule)  │         │  (Export piatto per Excel)  │    │
│    │  Fonte di verità    │         │  Generato da CLI             │    │
│    └─────────────────────┘         └─────────────────────────────┘    │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘

LAYER AVVIO
┌────────────────────────────────────────────────────────────────────────┐
│    AVVIA.bat (Windows) → python main.py                                │
│    Browser → apri index.html (file://)                                 │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Struttura della Repository

```
SmartCampus/
├── AVVIA.bat                     # Script avvio rapido da root (Windows)
├── .gitignore                    # Regole di esclusione Git
├── README.md                     # Guida rapida e documentazione iniziale
│
├── frontend/                     # Interfaccia Utente e Presentazione
│   ├── index.html                # Dashboard SPA (entry point principale)
│   ├── style.css                 # Foglio di stile responsive della dashboard
│   ├── app.js                    # Logica client-side (FileReader API)
│   └── presentazione/            # Modulo presentazione slide deck
│       ├── presentazione.html    # Slideshow interattiva
│       ├── presentazione.css     # Stile presentazione
│       └── presentazione.js      # Navigazione slide
│
├── backend/                      # Logica di elaborazione dati e CLI
│   ├── main.py                   # CLI Python (backend & gestione dataset)
│   └── AVVIA.bat                 # Script avvio locale Windows
│
├── dati/                         # Dataset e persistenza
│   ├── data.json                 # Dataset aule (fonte di verità JSON)
│   └── data.csv                  # Export CSV (generato da CLI)
│
└── output/                       # Documentazione, report e deliverable
    ├── pdf_project_brief.html    # Brief grafico impaginato per stampa/PDF
    ├── project_brief.md          # Project brief completo
    ├── test.md                   # Piano di test e casi di collaudo
    ├── monitoraggio.md           # Monitoraggio progetto, log sprint e metriche
    └── documentazione_completa.md# Questo documento di specifica tecnica
```

### 2.4 Flusso dei Dati

#### 2.4.1 Flusso CLI → JSON

```
Utente
  │
  │ Input (numero menu)
  ▼
Menu Handler (main.py)
  │
  │ Dispatch alla funzione corretta
  ▼
Business Function
  │  (es. prenota_posto, aggiungi_aula, elimina_aula)
  │
  ├── Legge da: lista_aule (in-memory, caricata da data.json all'avvio)
  │
  ├── Valida input utente (try/except, controlli logici)
  │
  ├── Modifica lista_aule in memoria
  │
  └── Al salvataggio: serializza → data.json e data.csv
```

#### 2.4.2 Flusso JSON → Dashboard

```
Utente seleziona data.json tramite <input type="file">
  │
  ▼
FileReader API (app.js → handleFileLoad)
  │
  │ readAsText() → onload callback
  ▼
JSON.parse() → array di oggetti aula
  │
  ├── renderKPI() → aggiorna 3 KPI Cards
  │
  ├── renderAule() → genera HTML card per ogni aula
  │
  └── renderAnalytics() → calcola e mostra dati aggregati
       │
       └── Filtri applicati in tempo reale su input/change
```

### 2.5 Tecnologie e Moduli Utilizzati

#### Python (main.py)

| Modulo | Uso |
|--------|-----|
| `json` | Parsing e serializzazione del file data.json |
| `csv` | Generazione del file data.csv |
| `os` | Verifica esistenza file, gestione percorsi |
| `datetime` | Generazione timestamp ISO 8601 per data_aggiornamento |
| `re` | Validazione formato ID (SC-\d{3}) e orario (HH:MM) |
| `sys` | Gestione uscita dal programma |

#### JavaScript (app.js)

| API/Feature | Uso |
|-------------|-----|
| `FileReader API` | Lettura del file JSON selezionato dall'utente |
| `JSON.parse()` | Deserializzazione del JSON letto |
| `Array.filter()` | Implementazione dei filtri in tempo reale |
| `Array.reduce()` | Calcolo KPI aggregati |
| `DOM Manipulation` | Rendering dinamico delle card e dei KPI |
| `Event Listeners` | Gestione input utente (input, change, click) |
| `Template Literals` | Generazione HTML dinamico |

---

## 3. Guida all'Installazione e Avvio

### 3.1 Prerequisiti

Prima di avviare il sistema, verificare che siano soddisfatti i seguenti requisiti:

#### Requisiti Hardware
- PC con Windows 10 o superiore (o macOS/Linux per uso avanzato)
- Almeno 50 MB di spazio disco libero
- Schermo con risoluzione minima 1024×768

#### Requisiti Software

| Software | Versione Minima | Verifica |
|----------|-----------------|----------|
| Python | 3.6+ | `python --version` nel terminale |
| Browser | Chrome 80+ / Firefox 75+ / Edge 80+ | Versionamento nel menu del browser |

> [!IMPORTANT]
> Python deve essere nel PATH di sistema. Se il comando `python --version` non funziona, aggiungere Python al PATH dalle impostazioni di sistema Windows oppure usare `py --version` (Python Launcher per Windows).

### 3.2 Installazione

Non è richiesta alcuna installazione nel senso tradizionale. Il progetto è una cartella auto-contenuta.

**Passo 1:** Verificare che la struttura della cartella sia corretta:

```
smart-campus-space-finder/
├── main.py          ← deve essere presente
├── data.json        ← deve essere presente (con i 6 record demo)
├── index.html       ← deve essere presente
├── style.css        ← deve essere presente
├── app.js           ← deve essere presente
└── AVVIA.bat        ← deve essere presente (Windows)
```

**Passo 2:** Verificare l'installazione di Python:

```powershell
# Aprire PowerShell o il Prompt dei Comandi
python --version
# Output atteso: Python 3.x.x (dove x ≥ 6)
```

**Passo 3:** Il sistema è pronto. Nessun altro passo richiesto.

### 3.3 Avvio della CLI

#### Metodo 1 — Script Batch (Consigliato per Windows)

1. Aprire Esplora File e navigare alla cartella `smart-campus-space-finder`.
2. Fare doppio click su `AVVIA.bat`.
3. Si aprirà una finestra del terminale con il menu della CLI.

```bat
@echo off
REM Contenuto di AVVIA.bat
cd /d "%~dp0"
python main.py
pause
```

#### Metodo 2 — Terminale Manuale

```powershell
# Navigare alla directory del progetto
cd "c:\Users\A968apulia\Desktop\SmartCampus\smart-campus-space-finder"

# Avviare la CLI
python main.py
```

#### Metodo 3 — PowerShell con percorso completo

```powershell
python "c:\Users\A968apulia\Desktop\SmartCampus\smart-campus-space-finder\main.py"
```

### 3.4 Avvio della Dashboard Web

#### Metodo 1 — Apertura Diretta (Consigliato)

1. Aprire Esplora File e navigare alla cartella `smart-campus-space-finder`.
2. Fare doppio click su `index.html`.
3. Il file si aprirà nel browser predefinito.

> [!TIP]
> Se il browser predefinito non è Chrome o Edge, fare click destro su `index.html` → "Apri con" → selezionare Google Chrome o Microsoft Edge.

#### Metodo 2 — Trascinamento nel Browser

1. Aprire Google Chrome.
2. Trascinare il file `index.html` nella barra degli indirizzi del browser.
3. La dashboard si aprirà.

#### Metodo 3 — Server HTTP Locale (per Firefox)

Se si usa Firefox e si riscontrano problemi con `file://`:

```powershell
cd "c:\Users\A968apulia\Desktop\SmartCampus\smart-campus-space-finder"
python -m http.server 8080
```

Poi aprire nel browser: `http://localhost:8080/index.html`

### 3.5 Avvio della Presentazione

1. Navigare alla cartella `smart-campus-presentazione`.
2. Aprire `presentazione.html` nel browser (doppio click o trascinamento).
3. Navigare le slide con:
   - Freccia destra / click bottone "Avanti"
   - Freccia sinistra / click bottone "Indietro"
   - Tasto `F` per modalità fullscreen (se implementato)

---

## 4. Manuale della CLI Python

### 4.1 Panoramica della CLI

La CLI (Command Line Interface) di Smart Campus Space Finder è implementata nel file `main.py`. Fornisce un'interfaccia testuale guidata con menu numerato per la gestione completa delle aule del campus.

**Avvio e schermata iniziale:**

```
=============================================================
        SMART CAMPUS SPACE FINDER — Gestione Aule
=============================================================

Dati caricati: 6 aule trovate in data.json

--- MENU PRINCIPALE ---
  1. Mostra tutte le aule
  2. Inserisci / Aggiorna aula
  3. Elimina aula
  4. Prenota / Occupa un posto
  5. Filtra aule libere per edificio
  6. Mostra KPI aggregati
  7. Salva JSON e CSV manualmente
  8. Esci (con salvataggio automatico)

Scelta (1-8): _
```

### 4.2 Funzioni Python — Riferimento Tecnico

#### `carica_dati(filepath)` — Caricamento JSON

```python
def carica_dati(filepath):
    """
    Carica il file data.json dal percorso indicato.
    Se il file non esiste, restituisce una lista vuota.
    
    Args:
        filepath (str): Percorso al file data.json
    Returns:
        list: Lista di dizionari (aule)
    """
```

**Comportamento:**
- Se `data.json` esiste: lo legge, effettua il parsing JSON e restituisce la lista.
- Se `data.json` non esiste: mostra un avviso e restituisce `[]` (lista vuota).
- Se `data.json` è corrotto (JSON non valido): mostra un errore e termina il programma.

---

#### `salva_dati(filepath, lista_aule)` — Salvataggio JSON

```python
def salva_dati(filepath, lista_aule):
    """
    Salva la lista di aule nel file data.json con indentazione.
    
    Args:
        filepath (str): Percorso al file data.json
        lista_aule (list): Lista aggiornata di dizionari aula
    """
```

**Comportamento:**
- Serializza `lista_aule` in JSON con `indent=2` e `ensure_ascii=False`.
- Sovrascrive il file esistente.
- Mostra messaggio di conferma.

---

#### `salva_csv(filepath, lista_aule)` — Export CSV

```python
def salva_csv(filepath, lista_aule):
    """
    Esporta la lista aule in formato CSV.
    
    Args:
        filepath (str): Percorso al file data.csv
        lista_aule (list): Lista di dizionari aula
    """
```

**Formato CSV generato:**

```csv
id,edificio,aula,stato,capienza_totale,posti_disponibili,posti_occupati,prese_elettriche,libera_fino_a,docente_referente,data_aggiornamento
SC-001,Edificio A - Ingegneria,Aula A101,Libera,40,10,30,True,16:30,Prof. Rossi,2026-11-09T08:00:00
...
```

---

#### `mostra_aule(lista_aule)` — Voce 1

```python
def mostra_aule(lista_aule):
    """
    Stampa la lista di tutte le aule in formato tabellare allineato.
    """
```

**Esempio output:**

```
ID       EDIFICIO               AULA          STATO           DISP  TOT  PRESE  FINO
-------- ---------------------- ------------- --------------- ----- ---- ------ -----
SC-001   Edificio A - Ingegn.   Aula A101     Libera            10   40  Sì     16:30
SC-002   Edificio A - Ingegn.   Lab 3         In Lezione         0   32  Sì     N/D
SC-003   Edificio B - Economia  Aula B204     Libera            18   24  No     N/D
SC-004   Biblioteca Centrale    Sala Studio 2 Occupata Studio    6   20  Sì     N/D
SC-005   Edificio C - Lettere   Aula C012     Libera            32   40  Sì     N/D
SC-006   Edificio B - Economia  Aula B110     Libera            12   16  No     N/D
```

---

#### `inserisci_aggiorna_aula(lista_aule)` — Voce 2

```python
def inserisci_aggiorna_aula(lista_aule):
    """
    Interfaccia guidata per inserire una nuova aula o aggiornare una esistente.
    Se l'ID inserito esiste già, propone di aggiornare i dati.
    """
```

**Flusso di esecuzione:**

```
1. Chiedi ID → Valida formato (SC-\d{3})
2. Cerca ID in lista_aule
   ├── Trovato → Chiedi conferma aggiornamento
   └── Non trovato → Nuova aula
3. Chiedi edificio (stringa non vuota)
4. Chiedi nome aula (stringa non vuota)
5. Chiedi stato (mostra opzioni: 1=Libera, 2=In Lezione, 3=Occupata Studio)
6. Chiedi capienza totale (intero > 0)
7. Chiedi posti disponibili (intero, 0 ≤ x ≤ capienza)
8. Calcola automaticamente posti_occupati = capienza - disponibili
9. Chiedi prese elettriche (s/n → True/False)
10. Chiedi libera_fino_a (HH:MM o N/D)
11. Chiedi docente referente (stringa, opzionale)
12. Imposta data_aggiornamento = datetime.now().isoformat()
13. Aggiunge/aggiorna in lista_aule
```

**Esempio interazione:**

```
Inserisci/Aggiorna aula
-----------------------
ID aula (formato SC-XXX): SC-007
Edificio: Edificio D - Scienze
Nome aula: Laboratorio Informatica D1
Stato (1=Libera, 2=In Lezione, 3=Occupata Studio): 1
Capienza totale: 25
Posti disponibili: 20
Prese elettriche (s/n): s
Libera fino a (HH:MM o N/D): 18:00
Docente referente: Prof. Bianchi

✅ Aula SC-007 inserita/aggiornata con successo.
```

---

#### `elimina_aula(lista_aule)` — Voce 3

```python
def elimina_aula(lista_aule):
    """
    Elimina un'aula dalla lista previa conferma dell'utente.
    """
```

**Flusso di esecuzione:**

```
1. Chiedi ID aula da eliminare
2. Cerca ID in lista_aule
   └── Non trovato → messaggio errore, torna al menu
3. Mostra dettagli aula trovata
4. Chiedi conferma: "Sei sicuro di voler eliminare questa aula? (s/n)"
   ├── n → "Operazione annullata.", torna al menu
   └── s → rimuovi dalla lista, mostra conferma
```

**Esempio interazione:**

```
Elimina aula
------------
ID aula da eliminare: SC-007

Aula trovata:
  ID: SC-007 | Laboratorio Informatica D1 | Edificio D - Scienze

Sei sicuro di voler eliminare questa aula? (s/n): s
✅ Aula SC-007 eliminata con successo.
```

---

#### `prenota_posto(lista_aule)` — Voce 4

```python
def prenota_posto(lista_aule):
    """
    Decrementa di 1 il numero di posti disponibili nell'aula indicata.
    Aggiorna lo stato se i posti disponibili raggiungono 0.
    """
```

**Flusso di esecuzione:**

```
1. Chiedi ID aula
2. Cerca ID → non trovato: errore
3. Controlla posti_disponibili > 0 → se 0: "Nessun posto disponibile"
4. Decrementa posti_disponibili di 1
5. Incrementa posti_occupati di 1
6. Se posti_disponibili == 0:
   └── Aggiorna stato → se era "Libera": diventa "In Lezione" (o "Occupata Studio")
7. Aggiorna data_aggiornamento
8. Mostra conferma con nuovo stato
```

**Esempio interazione:**

```
Prenota/Occupa un posto
------------------------
ID aula: SC-003

✅ Posto prenotato in Aula B204 (Edificio B - Economia)
   Posti disponibili: 17/24  (prima: 18)
   Stato: Libera
```

---

#### `filtra_per_edificio(lista_aule)` — Voce 5

```python
def filtra_per_edificio(lista_aule):
    """
    Mostra solo le aule con stato 'Libera' nell'edificio selezionato.
    """
```

**Esempio interazione:**

```
Filtra aule libere per edificio
--------------------------------
Edifici disponibili:
  1. Edificio A - Ingegneria
  2. Edificio B - Economia
  3. Biblioteca Centrale
  4. Edificio C - Lettere

Seleziona edificio (1-4): 2

Aule libere in Edificio B - Economia:
  SC-003 | Aula B204     | 18/24 posti | No prese
  SC-006 | Aula B110     | 12/16 posti | No prese
```

---

#### `mostra_kpi(lista_aule)` — Voce 6

```python
def mostra_kpi(lista_aule):
    """
    Calcola e visualizza i KPI aggregati del campus.
    """
```

**Esempio output:**

```
KPI Aggregati — Smart Campus
==============================
Aule totali:              6
Aule libere:              4  (66.7%)
Aule in lezione:          1  (16.7%)
Aule occupate studio:     1  (16.7%)

Capienza totale campus:   172 posti
Posti attualmente occupati: 70 posti
Posti disponibili (aule libere): 72 posti
Occupazione globale:      40.7%

Edificio con più posti liberi:
  → Edificio C - Lettere (32 posti disponibili)
```

---

### 4.3 Gestione del Ciclo di Vita della CLI

#### Avvio
```python
if __name__ == "__main__":
    lista_aule = carica_dati(DATA_FILE)   # Carica da disco
    menu_principale(lista_aule)            # Entra nel loop
```

#### Loop Principale
```python
def menu_principale(lista_aule):
    while True:
        mostra_menu()
        scelta = input("Scelta (1-8): ").strip()
        if scelta == "1": mostra_aule(lista_aule)
        elif scelta == "2": inserisci_aggiorna_aula(lista_aule)
        # ... etc
        elif scelta == "8":
            salva_dati(DATA_FILE, lista_aule)
            salva_csv(CSV_FILE, lista_aule)
            print("Arrivederci!")
            break
        else:
            print("Scelta non valida. Inserisci un numero tra 1 e 8.")
```

---

## 5. Manuale della Dashboard Web

### 5.1 Panoramica

La dashboard web è una **Single Page Application (SPA)** completamente statica, composta da tre file:

| File | Ruolo |
|------|-------|
| `index.html` | Struttura HTML della SPA, layout delle 4 sezioni |
| `style.css` | Stile visuale, colori, layout responsive, animazioni |
| `app.js` | Logica JavaScript: caricamento dati, rendering, filtri |

### 5.2 Primo Avvio e Caricamento Dati

Alla prima apertura nel browser, la dashboard mostra una schermata di benvenuto con un'area di caricamento file.

```html
<!-- Elemento HTML per caricamento file -->
<div id="upload-area">
  <p>Seleziona il file <strong>data.json</strong> per visualizzare i dati</p>
  <input type="file" id="file-input" accept=".json">
  <label for="file-input" class="btn-upload">📂 Sfoglia...</label>
</div>
```

```javascript
// Gestione caricamento file (app.js)
document.getElementById('file-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            renderAll(data);  // Popola tutta la dashboard
        } catch (err) {
            showError("File JSON non valido: " + err.message);
        }
    };
    reader.readAsText(file);
});
```

**Passi per l'utente:**
1. Cliccare il bottone "📂 Sfoglia...".
2. Selezionare il file `data.json` dalla cartella `smart-campus-space-finder`.
3. La dashboard si popola automaticamente.

### 5.3 Sezione 1 — Aule & Posti

Questa è la sezione principale, visibile subito dopo il caricamento dei dati.

#### KPI Cards

Tre card in evidenza mostrano:

| Card | Valore Demo | Calcolato da |
|------|-------------|-------------|
| 🟢 Aule Libere | 4 | `aule.filter(a => a.stato === "Libera").length` |
| 🔵 Posti Disponibili | 72 | Somma `posti_disponibili` delle sole aule "Libera" |
| 🏆 Edificio Top | Edificio C - Lettere | Edificio con la somma maggiore di `posti_disponibili` |

```javascript
// Calcolo KPI (app.js)
function calcolaKPI(aule) {
    const libere = aule.filter(a => a.stato === "Libera");
    const postiDisp = libere.reduce((sum, a) => sum + a.posti_disponibili, 0);
    
    // Edificio con più posti liberi
    const perEdificio = {};
    libere.forEach(a => {
        perEdificio[a.edificio] = (perEdificio[a.edificio] || 0) + a.posti_disponibili;
    });
    const edificioTop = Object.entries(perEdificio)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || "N/D";
    
    return { numLibere: libere.length, postiDisp, edificioTop };
}
```

#### Card Aula

Ogni aula è rappresentata da una card HTML con:

```
┌─────────────────────────────────────────┐
│ [Badge Stato: LIBERA]            SC-001 │
│                                         │
│  Aula A101                              │
│  📍 Edificio A - Ingegneria             │
│                                         │
│  ████████████░░░░░░░  10/40 posti       │
│  Occupazione: 75%                       │
│                                         │
│  🔌 Prese elettriche: Sì               │
│  🕐 Libera fino alle: 16:30            │
└─────────────────────────────────────────┘
```

**Colori barra di occupazione:**
- Verde (`#4caf50`): occupazione < 50%
- Arancione (`#ff9800`): occupazione 50%–85%
- Rosso (`#f44336`): occupazione > 85%

```javascript
// Calcolo colore barra (app.js)
function getBarColor(occupazione) {
    if (occupazione < 50) return '#4caf50';   // Verde
    if (occupazione < 85) return '#ff9800';   // Arancione
    return '#f44336';                          // Rosso
}
```

**Colori badge stato:**

| Stato | Colore CSS | Classe |
|-------|-----------|--------|
| Libera | Verde | `.badge-libera` |
| In Lezione | Rosso | `.badge-in-lezione` |
| Occupata Studio | Arancione | `.badge-occupata` |

### 5.4 Sezione Filtri

Tre filtri disponibili per raffinare la visualizzazione delle card:

#### Filtro 1 — Ricerca Testuale

```html
<input type="text" id="search-input" placeholder="Cerca per nome o ID...">
```

Funziona in tempo reale (evento `input`). Confronta il testo inserito con `aula.aula` e `aula.id` (case-insensitive).

```javascript
// Filtro ricerca (app.js)
document.getElementById('search-input').addEventListener('input', applicaFiltri);

function applicaFiltri() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const edificio = document.getElementById('filter-edificio').value;
    const soloPrese = document.getElementById('filter-prese').checked;
    
    const risultati = auleGlobali.filter(a => {
        const matchSearch = !query || 
            a.aula.toLowerCase().includes(query) || 
            a.id.toLowerCase().includes(query);
        const matchEdificio = !edificio || a.edificio === edificio;
        const matchPrese = !soloPrese || a.prese_elettriche === true;
        return matchSearch && matchEdificio && matchPrese;
    });
    
    renderCards(risultati);
}
```

#### Filtro 2 — Filtro Edificio

```html
<select id="filter-edificio">
  <option value="">Tutti gli edifici</option>
  <!-- Opzioni generate dinamicamente da JavaScript -->
</select>
```

Il menu a tendina viene popolato dinamicamente al caricamento dei dati, estraendo i valori unici del campo `edificio`.

#### Filtro 3 — Prese Elettriche

```html
<input type="checkbox" id="filter-prese">
<label for="filter-prese">Solo con prese elettriche</label>
```

Se attivo, mostra solo le aule con `prese_elettriche === true`.

### 5.5 Sezione Analytics & KPI

Pannello con dati aggregati sull'intero campus:

| Metrica | Calcolo | Demo |
|---------|---------|------|
| Capienza totale | `SUM(capienza_totale)` | 172 posti |
| Posti occupati | `SUM(posti_occupati)` | 70 posti |
| Occupazione globale | `posti_occupati / capienza_totale * 100` | 40.7% |

La barra di occupazione globale usa la stessa logica di colorazione delle card aula.

### 5.6 Sezione Bacheca Avvisi

Visualizza avvisi e comunicazioni relative al campus. Gli avvisi sono definiti staticamente nella pagina HTML (non provengono dal JSON).

**Avvisi inclusi:**
- Orario ridotto biblioteca durante sessione d'esame (dicembre 2026)
- Manutenzione straordinaria Aula B110 nei weekend di novembre
- Nuovi posti studio aggiunti in Sala Studio 2 — apertura estesa fino alle 22:00

### 5.7 Sezione Info Campus & Orari

Informazioni statiche sul campus:

**Orari apertura:**
- Edificio A - Ingegneria: 7:30–21:00 (Lun–Sab)
- Edificio B - Economia: 8:00–20:00 (Lun–Ven)
- Edificio C - Lettere: 8:00–19:30 (Lun–Ven)
- Biblioteca Centrale: 8:00–22:00 (Lun–Sab), 10:00–18:00 (Dom)

**Contatti:**
- Segreteria Studenti: segreteria@campus.edu | interno 100
- Portineria Edificio A: interno 201
- Portineria Edificio B: interno 301

---

## 6. Modello dei Dati

### 6.1 Schema Completo

Il file `data.json` contiene un **array JSON** di oggetti aula. Ogni oggetto rappresenta un'aula o uno spazio del campus.

```json
[
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
]
```

### 6.2 Descrizione Approfondita dei Campi

#### `id` (string, obbligatorio)

Identificatore univoco dell'aula nel sistema. Formato: `SC-` seguito da tre cifre decimali.

- **Validazione:** Regex `^SC-\d{3}$`
- **Esempio validi:** `SC-001`, `SC-042`, `SC-999`
- **Esempio non validi:** `SC1`, `A-001`, `SC-01`, `SC-0001`
- **Unicità:** Garantita dalla CLI al momento dell'inserimento.
- **Note:** Il prefisso `SC` sta per "Smart Campus". Supporta fino a 999 aule.

#### `edificio` (string, obbligatorio)

Nome completo dell'edificio o struttura in cui si trova l'aula.

- **Validazione:** Stringa non vuota.
- **Convenzione nomenclatura:** "Nome Edificio - Dipartimento" (es. "Edificio A - Ingegneria")
- **Uso nella dashboard:** Usato per il filtro edificio e per il raggruppamento nei KPI.
- **Esempio validi:** "Edificio A - Ingegneria", "Biblioteca Centrale", "Palazzo del Rettorato"

#### `aula` (string, obbligatorio)

Nome identificativo dell'aula all'interno dell'edificio.

- **Validazione:** Stringa non vuota.
- **Convenzione:** Può essere un codice alfanumerico (es. "A101") o un nome (es. "Sala Studio 2").
- **Visualizzazione:** Usato come titolo della card nella dashboard.

#### `stato` (string, obbligatorio)

Stato corrente dell'aula. Deve essere uno dei tre valori del dominio.

| Valore | Significato | Badge dashboard |
|--------|-------------|-----------------|
| `"Libera"` | L'aula è disponibile per utilizzo | Verde |
| `"In Lezione"` | È in corso una lezione, nessun posto disponibile | Rosso |
| `"Occupata Studio"` | Utilizzata per studio autonomo, posti parzialmente disponibili | Arancione |

- **Aggiornamento automatico:** La CLI aggiorna automaticamente lo stato da "Libera" a "In Lezione" quando `posti_disponibili` scende a 0 tramite prenotazione.

#### `capienza_totale` (integer, obbligatorio)

Numero massimo di persone che possono occupare simultaneamente l'aula.

- **Validazione:** Intero positivo (> 0).
- **Range tipico:** 10–300 posti per aule universitarie.
- **Invariante:** `capienza_totale` = `posti_disponibili` + `posti_occupati`.

#### `posti_disponibili` (integer, obbligatorio)

Numero di posti attualmente liberi nell'aula.

- **Validazione:** Intero non negativo (≥ 0), ≤ `capienza_totale`.
- **Aggiornamento:** Decrementato di 1 dalla funzione `prenota_posto`.
- **KPI:** Sommato per calcolare il totale dei posti disponibili nel campus.

#### `posti_occupati` (integer, obbligatorio)

Numero di posti attualmente occupati.

- **Validazione:** Deve essere = `capienza_totale` - `posti_disponibili`.
- **Calcolo:** Mai inserito direttamente dall'utente; calcolato automaticamente dalla CLI.
- **Formula:** `posti_occupati = capienza_totale - posti_disponibili`

#### `prese_elettriche` (boolean, obbligatorio)

Indica se l'aula è dotata di prese elettriche accessibili agli studenti.

- **Valori:** `true` (sì) o `false` (no).
- **Input CLI:** L'utente inserisce `s` (→ `true`) o `n` (→ `false`).
- **Filtro dashboard:** Il filtro "Solo con prese elettriche" usa questo campo.

#### `libera_fino_a` (string, opzionale)

Orario previsto fino al quale l'aula rimane libera.

- **Formato:** `HH:MM` (es. "16:30") o `"N/D"` se non disponibile.
- **Validazione:** Regex `^\d{2}:\d{2}$` oppure stringa "N/D".
- **Nota:** Puramente informativo, non c'è logica automatica di scadenza.
- **Display:** Visualizzato nella card come "🕐 Libera fino alle: HH:MM".

#### `docente_referente` (string, opzionale)

Nome del docente o referente amministrativo responsabile dello spazio.

- **Validazione:** Nessuna (campo libero opzionale).
- **Uso attuale:** Non visualizzato nella dashboard (disponibile per sviluppi futuri).

#### `data_aggiornamento` (string, obbligatorio)

Timestamp dell'ultima modifica al record.

- **Formato:** ISO 8601 datetime senza fuso orario (es. `"2026-11-09T08:00:00"`).
- **Generazione:** Automatica dalla CLI: `datetime.datetime.now().isoformat()`
- **Uso:** Permette di identificare record obsoleti; base per audit trail futuro.

### 6.3 Invarianti e Regole di Business

```
INVARIANTI DEL MODELLO:
  1. posti_occupati == capienza_totale - posti_disponibili
  2. posti_disponibili >= 0
  3. posti_disponibili <= capienza_totale
  4. id è unico nell'array
  5. stato IN ["Libera", "In Lezione", "Occupata Studio"]

REGOLE DI BUSINESS:
  R1. Se posti_disponibili == 0 → stato NON PUÒ essere "Libera"
  R2. Se stato == "In Lezione" → si assume posti_disponibili == 0
  R3. La CLI calcola sempre posti_occupati, non lo chiede all'utente
  R4. data_aggiornamento viene sempre impostata al timestamp corrente dalla CLI
```

---

## 7. Flusso Operativo

### 7.1 Workflow Standard Giornaliero

**Mattina — Apertura Campus:**

```
1. L'operatore apre la CLI (AVVIA.bat o python main.py)
2. Voce 1: verifica lo stato attuale di tutte le aule
3. Per ogni aula il cui stato è cambiato rispetto al giorno precedente:
   → Voce 2: aggiorna stato e posti disponibili
4. Voce 7: salva manualmente (o lascia alla chiusura automatica)
5. Gli studenti aprono la dashboard (index.html) nel browser
6. Selezionano data.json aggiornato
7. Navigano tra le aule, applicano filtri, trovano posto
```

**Durante la giornata:**

```
1. All'inizio di ogni lezione/evento:
   → CLI Voce 2: aggiorna stato → "In Lezione", posti_disponibili → 0
2. Quando uno studente occupa un posto in un'aula libera:
   → CLI Voce 4: prenota posto (decrementa automaticamente)
3. Alla fine di una lezione:
   → CLI Voce 2: aggiorna stato → "Libera", ripristina posti disponibili
4. Gli studenti ricaricano data.json nella dashboard per vedere aggiornamenti
```

**Sera — Chiusura:**

```
1. L'operatore aggiorna lo stato di tutte le aule a "Libera"
2. Ripristina tutti i posti disponibili
3. Voce 8: esce con salvataggio automatico
4. data.json e data.csv aggiornati per il giorno successivo
```

### 7.2 Scenario: Studente Cerca Posto con Presa

```
Studente: "Ho bisogno di un posto con la presa elettrica nell'Edificio A"

1. Apre index.html nel browser
2. Clicca "Sfoglia" e seleziona data.json
3. Nella sezione Aule & Posti:
   a. Seleziona "Edificio A - Ingegneria" dal filtro edificio
   b. Attiva il toggle "Solo con prese elettriche"
4. Risultato: vede SC-001 (Aula A101, 10 posti disponibili, presa: sì, libera fino alle 16:30)
5. Si reca in Aula A101
   → Tempo impiegato: < 30 secondi
```

### 7.3 Scenario: Operatore Registra Nuova Aula

```
Operatore: "Devo aggiungere un nuovo laboratorio al sistema"

1. Avvia CLI (python main.py o AVVIA.bat)
2. Seleziona Voce 2 (Inserisci/Aggiorna aula)
3. Inserisce dati:
   - ID: SC-007
   - Edificio: Edificio D - Scienze
   - Aula: Laboratorio Informatica D1
   - Stato: Libera
   - Capienza: 25
   - Disponibili: 25
   - Prese: s (sì)
   - Libera fino a: 18:00
   - Docente referente: Prof. Fermi
4. Voce 7: Salva
5. Riaprire dashboard e ricaricare data.json → SC-007 visibile
   → Tempo impiegato: < 2 minuti
```

---

## 8. Gestione degli Errori

### 8.1 Errori CLI Python

| Situazione | Errore | Gestione |
|------------|--------|---------|
| `data.json` non trovato all'avvio | FileNotFoundError | Creato array vuoto, avviso all'utente |
| `data.json` corrotto (JSON invalido) | json.JSONDecodeError | Messaggio errore, terminazione sicura |
| Input non numerico dove atteso intero | ValueError | try/except → messaggio errore, re-input |
| Capienza inserita ≤ 0 | — | Controllo esplicito → messaggio errore |
| Posti disponibili > capienza | — | Controllo logico → messaggio errore |
| ID non trovato per elimina/prenota | — | Messaggio "Aula non trovata" |
| Formato ID non valido | — | Validazione regex → messaggio errore |
| Formato orario non valido | — | Validazione regex → messaggio errore |
| Posti_disponibili già 0 alla prenotazione | — | Messaggio "Nessun posto disponibile" |
| Errore scrittura file (disco pieno) | IOError/OSError | Messaggio errore, dati in memoria intatti |

### 8.2 Errori Dashboard Web

| Situazione | Comportamento | Messaggio Utente |
|------------|---------------|-----------------|
| Nessun file selezionato | Nessuna azione | — |
| File non è JSON valido | try/catch su JSON.parse | "File JSON non valido. Seleziona data.json" |
| JSON valido ma array vuoto | Rendering vuoto | "Nessuna aula trovata nel file selezionato" |
| JSON con campi mancanti | Valori default (N/D, 0, false) | Nessun messaggio (graceful degradation) |
| FileReader non supportato (browser antico) | — | "Browser non supportato. Usa Chrome, Firefox o Edge" |
| Nessun risultato dai filtri | Griglia vuota | "Nessuna aula corrisponde ai filtri selezionati" |

### 8.3 Messaggi di Errore — Standard Comunicativo

La CLI usa il seguente standard per i messaggi:

```
✅ Operazione riuscita
❌ Errore: descrizione dell'errore
⚠️  Avviso: informazione importante
ℹ️  Info: informazione neutra
```

---

## 9. Sicurezza e Considerazioni

### 9.1 Modello di Sicurezza

Il sistema non è progettato per ambienti multi-utente o con dati sensibili. Il modello di sicurezza è semplice per design:

**Dati locali:**
- `data.json` e `data.csv` sono file locali, accessibili solo agli utenti con accesso al filesystem della macchina.
- Nessun dato viene trasmesso in rete.
- Nessuna comunicazione con server esterni.

**Nessuna autenticazione:**
- La CLI è accessibile a chiunque possa avviare il programma.
- La dashboard è accessibile a chiunque abbia accesso al file HTML e al browser.

**Dati non sensibili:**
- Il dataset contiene solo informazioni sugli spazi fisici (aule, posti, orari).
- Nessun dato personale degli studenti è memorizzato.
- I nomi dei docenti referenti sono informazioni pubbliche o semi-pubbliche.

### 9.2 Considerazioni per l'Uso in Produzione

> [!CAUTION]
> Le seguenti considerazioni sono essenziali prima di adottare il sistema in un contesto reale (non hackathon).

1. **Backup regolari:** Implementare backup automatici di `data.json` (es. con uno script schedulato).
2. **Accesso al filesystem:** Limitare chi può modificare `data.json` tramite i permessi del filesystem.
3. **Validazione avanzata:** Aggiungere sanitizzazione input per prevenire injection in JSON.
4. **Audit trail:** Conservare la `data_aggiornamento` e aggiungere un campo `aggiornato_da` per tracciare chi ha effettuato modifiche.
5. **Gestione concorrenza:** Il sistema non è thread-safe. Se più operatori lavorano simultaneamente, potrebbero sovrascrivere le modifiche dell'altro.

### 9.3 Privacy

- Il sistema non raccoglie dati personali degli studenti.
- Non esistono log di accesso o session tracking.
- La dashboard è completamente client-side: nessun dato viene inviato a server.

---

## 10. Test e Qualità

### 10.1 Approccio ai Test

Tutti i test sono **manuali** (nessun framework di test automatizzato, in linea con il vincolo Python stdlib only). Il piano di test completo è documentato nel file `test.md`.

### 10.2 Riepilogo Risultati Test

| Categoria | Test Totali | PASS | FAIL | PARTIAL |
|-----------|-------------|------|------|---------|
| CLI — Avvio e Menu | 5 | 5 | 0 | 0 |
| CLI — Visualizzazione | 3 | 3 | 0 | 0 |
| CLI — Inserimento | 9 | 7 | 1 | 1 |
| CLI — Eliminazione | 3 | 3 | 0 | 0 |
| CLI — Prenotazione | 4 | 4 | 0 | 0 |
| CLI — Filtri e KPI | 4 | 4 | 0 | 0 |
| CLI — Salvataggio | 4 | 4 | 0 | 0 |
| Dashboard — Caricamento | 4 | 3 | 0 | 1 |
| Dashboard — KPI e Aule | 9 | 9 | 0 | 0 |
| Dashboard — Filtri | 7 | 6 | 0 | 1 |
| Dashboard — Sezioni | 4 | 4 | 0 | 0 |
| Integrazione | 4 | 4 | 0 | 0 |
| Compatibilità Browser | 6 | 4 | 0 | 2 |
| **TOTALE** | **66** | **60** | **1** | **5** |

**Tasso di successo: 91% (PASS) — 9% parziali o con workaround noti**

### 10.3 Metriche di Qualità del Codice

| Metrica | Valore |
|---------|--------|
| Linee di codice (LOC) | ~1440 |
| Linee di commento | ~111 (7.7%) |
| Funzioni/blocchi definiti | ~31 |
| Profondità massima annidamento | 3 livelli |
| Funzioni > 50 righe | 2 (accettabile) |
| Duplicazione codice stimata | < 5% |
| Copertura funzionalità | 100% (29/29) |

---

## 11. Roadmap e Sviluppi Futuri

### 11.1 Fase 2 — Backend Leggero (Q1 2027)

| Feature | Descrizione | Complessità |
|---------|-------------|-------------|
| SQLite database | Sostituisce JSON con DB relazionale | Media |
| REST API (Flask) | Espone dati tramite HTTP API | Media |
| Auth base | Login operatore vs. utente | Media |
| Aggiornamento real-time | Polling regolare nella dashboard | Bassa |
| Multi-operatore | Gestione concorrenza con lock | Alta |

### 11.2 Fase 3 — Integrazione Sistemi (Q2 2027)

| Feature | Descrizione | Complessità |
|---------|-------------|-------------|
| Integrazione calendario accademico | Import automatico orari lezioni | Alta |
| Sensori IoT | Contatori persone automatici | Molto Alta |
| Notifiche push | Alert disponibilità aule | Media |
| App mobile PWA | Dashboard installabile su smartphone | Media |
| SSO universitario | Login con credenziali ateneo | Alta |

### 11.3 Fase 4 — Analytics Avanzati (Q3 2027)

| Feature | Descrizione | Complessità |
|---------|-------------|-------------|
| Report storici | Trend utilizzo nel tempo | Media |
| Heatmap utilizzo | Visualizzazione grafica dell'occupazione | Media |
| Previsione disponibilità | ML per prevedere picchi di utilizzo | Alta |
| Dashboard amministrativa | Pannello per direzione campus | Media |
| Export report PDF | Generazione automatica report | Bassa |

---

## 12. Glossario

| Termine | Definizione |
|---------|-------------|
| **Aula** | Spazio fisico del campus (aula, laboratorio, sala studio) tracciato nel sistema |
| **Badge** | Etichetta colorata che indica lo stato di un'aula nella dashboard |
| **Capienza** | Numero massimo di persone che possono occupare simultaneamente uno spazio |
| **CLI** | Command Line Interface — interfaccia a riga di comando per la gestione dati |
| **CSV** | Comma-Separated Values — formato di file per dati tabulari |
| **Dashboard** | Interfaccia web visuale per la visualizzazione e il filtraggio dei dati |
| **Dataset demo** | Insieme di 6 record di aule usati per la dimostrazione del sistema |
| **FileReader API** | API JavaScript per la lettura di file locali nel browser |
| **JSON** | JavaScript Object Notation — formato di dati strutturati usato come database |
| **KPI** | Key Performance Indicator — metrica aggregata di sintesi (es. aule libere, occupazione) |
| **Offline-first** | Approccio di progettazione che privilegia il funzionamento senza connessione internet |
| **Posti disponibili** | Numero di posti attualmente non occupati in un'aula |
| **Posti occupati** | Numero di posti attualmente occupati (capienza - disponibili) |
| **Prenotazione** | Azione di occupare un posto in un'aula tramite CLI (decrementa posti_disponibili) |
| **SPA** | Single Page Application — applicazione web a pagina singola senza ricaricamenti |
| **Stato** | Condizione corrente di un'aula: "Libera", "In Lezione", "Occupata Studio" |
| **stdlib** | Standard Library — librerie incluse di default in Python, senza installazione pip |
| **Timestamp ISO 8601** | Formato standard internazionale per date e orari (es. 2026-11-09T08:00:00) |

---

## 13. Appendice

### A. Struttura Completa della Repository

```
SmartCampus/                               # Radice del progetto
│
├── smart-campus-space-finder/             # Modulo principale
│   ├── main.py                            # CLI Python (~350 righe)
│   ├── data.json                          # Dataset aule (array JSON, 6 record)
│   ├── data.csv                           # Export CSV (generato da CLI)
│   ├── index.html                         # Dashboard SPA (~180 righe)
│   ├── style.css                          # Stile dashboard (~220 righe)
│   ├── app.js                             # Logica JavaScript (~280 righe)
│   ├── AVVIA.bat                          # Script avvio Windows
│   └── README.md                          # Guida rapida utente
│
├── smart-campus-presentazione/            # Modulo presentazione hackathon
│   ├── presentazione.html                 # Slideshow 9 slide (~200 righe)
│   ├── presentazione.css                  # Stile presentazione (~150 righe)
│   └── presentazione.js                   # Navigazione slide (~60 righe)
│
├── project_brief.md                       # Project brief completo
├── test.md                                # Piano di test (66 test cases)
├── monitoraggio.md                        # Monitoraggio progetto e team
└── documentazione_completa.md             # Questo documento
```

### B. Dataset Demo Completo

| ID | Edificio | Aula | Stato | Cap. | Disp. | Occ. | Prese | Fino | Docente |
|----|----------|------|-------|------|-------|------|-------|------|---------|
| SC-001 | Edificio A - Ingegneria | Aula A101 | Libera | 40 | 10 | 30 | ✅ | 16:30 | Prof. Rossi |
| SC-002 | Edificio A - Ingegneria | Lab 3 | In Lezione | 32 | 0 | 32 | ✅ | N/D | Prof. Verdi |
| SC-003 | Edificio B - Economia | Aula B204 | Libera | 24 | 18 | 6 | ❌ | N/D | Prof. Neri |
| SC-004 | Biblioteca Centrale | Sala Studio 2 | Occupata Studio | 20 | 6 | 14 | ✅ | N/D | Sig. Bianchi |
| SC-005 | Edificio C - Lettere | Aula C012 | Libera | 40 | 32 | 8 | ✅ | N/D | Prof. Ferrari |
| SC-006 | Edificio B - Economia | Aula B110 | Libera | 16 | 12 | 4 | ❌ | N/D | Prof. Conti |

**Totali:**
- Capienza complessiva: 172 posti
- Posti occupati: 94 *(nota: include "In Lezione" e "Occupata Studio")*
- Posti disponibili (solo aule "Libera"): 72
- Occupazione globale: 70/172 = 40.7% *(posti_occupati calcolati sulla somma dei record)*

### C. Contenuto AVVIA.bat

```bat
@echo off
title Smart Campus Space Finder — CLI
echo ============================================
echo   Smart Campus Space Finder
echo   Python Innovation Hackathon - Challenge 1
echo ============================================
echo.
cd /d "%~dp0"
python main.py
echo.
echo Programma terminato. Premi un tasto per chiudere.
pause > nul
```

### D. Convenzioni di Codice

#### Python (main.py)
- **Nomi funzioni:** snake_case (es. `carica_dati`, `mostra_aule`)
- **Nomi variabili:** snake_case (es. `lista_aule`, `posti_disponibili`)
- **Costanti:** UPPER_CASE (es. `DATA_FILE`, `CSV_FILE`)
- **Stringhe:** f-string per interpolazione
- **Gestione errori:** try/except con messaggi user-friendly
- **Encoding file:** UTF-8 (gestione caratteri speciali italiani)

#### JavaScript (app.js)
- **Nomi funzioni:** camelCase (es. `renderKPI`, `applicaFiltri`)
- **Nomi variabili:** camelCase (es. `auleGlobali`, `fileInput`)
- **Costanti globali:** camelCase con prefisso (es. `auleGlobali`)
- **Template HTML:** Template literals con backtick
- **DOM:** Accesso tramite `getElementById` e `querySelector`

#### HTML/CSS (index.html, style.css)
- **ID:** kebab-case (es. `upload-area`, `filter-edificio`)
- **Classi CSS:** kebab-case (es. `kpi-card`, `badge-libera`)
- **Colori:** Variabili CSS custom (es. `--color-success: #4caf50`)

---

### E. Comandi Rapidi di Riferimento

```powershell
# Avviare la CLI
python main.py

# Avviare server HTTP locale (per Firefox)
python -m http.server 8080

# Verificare validità JSON (PowerShell)
python -c "import json; json.load(open('data.json', encoding='utf-8')); print('JSON valido')"

# Backup dataset demo
copy data.json data.json.backup

# Contare le aule nel JSON (PowerShell)
python -c "import json; d=json.load(open('data.json',encoding='utf-8')); print(f'{len(d)} aule nel dataset')"
```

---

*Documento redatto dal team Smart Campus Space Finder*  
*Python Innovation Hackathon – Challenge 1 · Smart Campus · Novembre 2026*  
*Team: Alessandro Matrigiano, Giuseppe Ragno, Pietro Lombardi, Gabriel Loconte*  
*Versione 1.0 — Documento Finale*
