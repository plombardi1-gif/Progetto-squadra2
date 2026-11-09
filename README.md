# Smart Campus Space Finder

**Challenge 1 – Smart Campus | Python Innovation Hackathon**

Smart Campus Space Finder è una soluzione integrata progettata per supportare gli studenti universitari nella ricerca rapida di aule studio e spazi liberi nel campus, visualizzando informazioni su disponibilità, capienza, presenza di prese elettriche e orari.

---

## 📁 Struttura del Progetto

Il progetto è organizzato in quattro aree tematiche principali:

```text
SmartCampus/
├── AVVIA.bat                     # Avvio rapido della CLI backend da root
├── .gitignore                    # Regole di esclusione Git
├── README.md                     # Guida generale al progetto
│
├── frontend/                     # Applicazione Web e Presentazione
│   ├── index.html                # Dashboard Web SPA interattiva
│   ├── style.css                 # Fogli di stile della dashboard
│   ├── app.js                    # Logica client-side & FileReader API
│   └── presentazione/            # Slide deck interattivo per il pitch
│       ├── presentazione.html    # Presentazione HTML
│       ├── presentazione.css     # Stile presentazione
│       └── presentazione.js      # Controller slide & navigazione
│
├── backend/                      # Logica di elaborazione dati e CLI
│   ├── main.py                   # Script Python CLI per gestione dataset
│   └── AVVIA.bat                 # Script batch per avvio CLI da cartella
│
├── dati/                         # Dataset e persistenza
│   ├── data.json                 # Fonte di verità principale (JSON)
│   └── data.csv                  # Dataset esportato in formato tabellare (CSV)
│
└── output/                       # Documentazione, report e artefatti di progetto
    ├── pdf_project_brief.html    # Report grafico formattato (esportabile in PDF)
    ├── project_brief.md          # Project Brief ufficiale
    ├── documentazione_completa.md# Documentazione tecnica completa del sistema
    ├── monitoraggio.md           # Log delle attività, sprint e metriche di qualità
    └── test.md                   # Piano di test, casi di test e checklist pre-demo
```

---

## 🚀 Istruzioni per l'Avvio

### 1. Backend (CLI Python)
Per gestire le aule (aggiungere, modificare, eliminare, consultare KPI ed esportare i dati):
- Fai doppio clic su `AVVIA.bat` nella cartella principale oppure dentro `backend/`.
- In alternativa, da terminale:
  ```bash
  cd backend
  python main.py
  ```
- *I dati modificati dalla CLI verranno automaticamente salvati nella cartella `dati/`.*

### 2. Frontend (Dashboard Web)
1. Apri `frontend/index.html` con un doppio clic nel tuo browser preferito.
2. Clicca sul pulsante **"Scegli JSON"** in alto a destra.
3. Seleziona il file `dati/data.json`.
4. Utilizza i filtri per edificio, prese elettriche e la barra di ricerca per trovare il tuo spazio ideale.

### 3. Presentazione (Pitch Hackathon)
- Apri `frontend/presentazione/presentazione.html` con il browser per accedere allo slide deck animato con controlli tastiera e navigazione rapida.

### 4. Documentazione e Output
- Tutti i report, il piano di test e la documentazione tecnica sono consultabili nella cartella `output/`.
- Il file `output/pdf_project_brief.html` può essere aperto nel browser e stampato (Ctrl+P / Salva come PDF) per ottenere il brief impaginato per la commissione.
