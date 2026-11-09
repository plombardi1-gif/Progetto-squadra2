#!/usr/bin/env python3
"""Smart Campus Space Finder: CLI locale, senza backend o database."""
import csv
import json
from datetime import datetime
from pathlib import Path

BASE = Path(__file__).resolve().parent
# Percorso cartella dati (preferibilmente '../dati', con fallback su cartella corrente)
if (BASE.parent / "dati").exists():
    DATA_DIR = BASE.parent / "dati"
elif (BASE / "dati").exists():
    DATA_DIR = BASE / "dati"
else:
    DATA_DIR = BASE.parent / "dati"
    DATA_DIR.mkdir(parents=True, exist_ok=True)

JSON_FILE, CSV_FILE = DATA_DIR / "data.json", DATA_DIR / "data.csv"
STATI = ("Libera", "In Lezione", "Occupata Studio")
CSV_FIELDS = ("id", "edificio", "aula", "stato", "capienza_totale", "posti_disponibili",
              "posti_occupati", "prese_elettriche", "libera_fino_a", "docente_referente", "data_aggiornamento")

DEMO = [
 {"id":"SC-001","edificio":"Edificio A - Ingegneria","aula":"Aula A101","stato":"Libera","capienza_totale":40,"posti_disponibili":12,"prese_elettriche":True,"libera_fino_a":"16:30","docente_referente":"Prof. Mario Rossi - Algoritmi"},
 {"id":"SC-002","edificio":"Edificio A - Ingegneria","aula":"Lab 3","stato":"In Lezione","capienza_totale":32,"posti_disponibili":0,"prese_elettriche":True,"libera_fino_a":"12:00","docente_referente":"Prof.ssa Laura Bianchi - Basi di Dati"},
 {"id":"SC-003","edificio":"Edificio B - Economia","aula":"Aula B204","stato":"Libera","capienza_totale":24,"posti_disponibili":18,"prese_elettriche":False,"libera_fino_a":"18:00","docente_referente":"Prof. Andrea Verdi - Economia Digitale"},
 {"id":"SC-004","edificio":"Biblioteca Centrale","aula":"Sala Studio 2","stato":"Occupata Studio","capienza_totale":20,"posti_disponibili":6,"prese_elettriche":True,"libera_fino_a":"20:00","docente_referente":"Dott.ssa Elena Neri - Tutorato"},
 {"id":"SC-005","edificio":"Edificio C - Lettere","aula":"Aula C012","stato":"Libera","capienza_totale":40,"posti_disponibili":32,"prese_elettriche":True,"libera_fino_a":"17:15","docente_referente":"Prof.ssa Marta Gallo - Letteratura Italiana"},
 {"id":"SC-006","edificio":"Edificio B - Economia","aula":"Aula B110","stato":"Libera","capienza_totale":16,"posti_disponibili":12,"prese_elettriche":False,"libera_fino_a":"15:45","docente_referente":"Prof. Luca Ferri - Statistica"},
]

def now():
    return datetime.now().astimezone().isoformat(timespec="seconds")

def to_bool(value):
    if isinstance(value, bool):
        return value
    return str(value).strip().casefold() in {"si", "sì", "s", "yes", "true", "1"}

def normalize(room):
    state = next((s for s in STATI if s.casefold() == str(room.get("stato", "")).strip().casefold()), None)
    if not state:
        raise ValueError(f"Stato non valido: {room.get('stato')}")
    available = int(room.get("posti_disponibili", room.get("posti", -1)))
    if room.get("capienza_totale") is not None:
        capacity = int(room["capienza_totale"])
    elif room.get("posti_occupati") is not None:
        capacity = available + int(room["posti_occupati"])
    else:
        capacity = available + 10  # fallback per i vecchi JSON
    if capacity <= 0 or available < 0 or available > capacity:
        raise ValueError("Capienza/posti non coerenti: i posti liberi devono essere tra 0 e la capienza.")
    return {
        "id": str(room.get("id", "")).strip(),
        "edificio": str(room.get("edificio", "")).strip(),
        "aula": str(room.get("aula", "")).strip(),
        "stato": state,
        "capienza_totale": capacity,
        "posti_disponibili": available,
        "posti_occupati": capacity - available,
        "prese_elettriche": to_bool(room.get("prese_elettriche", False)),
        "libera_fino_a": str(room.get("libera_fino_a", "N/D")),
        "docente_referente": str(room.get("docente_referente") or "Non assegnato"),
        "data_aggiornamento": str(room.get("data_aggiornamento") or now()),
    }

def save_rooms(rooms):
    normalized = [normalize(r) for r in rooms]
    JSON_FILE.write_text(json.dumps(normalized, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    with CSV_FILE.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_FIELDS)
        writer.writeheader()
        for row in normalized:
            row = row.copy()
            row["prese_elettriche"] = "Sì" if row["prese_elettriche"] else "No"
            writer.writerow(row)

def load_rooms():
    if not JSON_FILE.exists():
        save_rooms(DEMO)
    try:
        data = json.loads(JSON_FILE.read_text(encoding="utf-8"))
        if not isinstance(data, list):
            raise ValueError("Il JSON deve contenere una lista.")
        rooms = [normalize(r) for r in data]
        ids = [r["id"] for r in rooms]
        if len(ids) != len(set(ids)):
            raise ValueError("ID duplicati nel file.")
        return rooms
    except (OSError, ValueError, TypeError, json.JSONDecodeError) as exc:
        print(f"Errore in data.json: {exc}. Carico i dati demo.")
        return [normalize(r) for r in DEMO]

def ask(prompt, default=None):
    while True:
        suffix = f" [{default}]" if default is not None else ""
        value = input(f"{prompt}{suffix}: ").strip()
        if value:
            return value
        if default is not None:
            return str(default)
        print("Campo obbligatorio.")

def ask_int(prompt, minimum=0, maximum=None, default=None):
    while True:
        suffix = f" [{default}]" if default is not None else ""
        raw = input(f"{prompt}{suffix}: ").strip()
        if not raw and default is not None:
            return default
        try:
            value = int(raw)
        except ValueError:
            print("Inserisci un numero intero.")
            continue
        if value < minimum or (maximum is not None and value > maximum):
            print(f"Valore ammesso: da {minimum} a {maximum if maximum is not None else 'oltre'}.")
            continue
        return value

def ask_state(default=None):
    while True:
        raw = input(f"Stato {STATI}{f' [{default}]' if default else ''}: ").strip()
        if not raw and default:
            return default
        for state in STATI:
            if raw.casefold() == state.casefold():
                return state
        print("Stato non valido.")

def ask_bool(default=None):
    suffix = f" [{'s' if default else 'n'}]" if default is not None else ""
    while True:
        raw = input(f"Prese elettriche? s/n{suffix}: ").strip().casefold()
        if not raw and default is not None:
            return default
        if raw in {"s", "si", "sì", "y", "yes"}:
            return True
        if raw in {"n", "no"}:
            return False
        print("Rispondi s oppure n.")

def ask_capacity(cap_default=None, occupied_default=None):
    capacity = ask_int("Capienza totale dell'aula", 1, default=cap_default)
    occupied = ask_int("Posti attualmente occupati", 0, capacity, default=occupied_default)
    return capacity, capacity - occupied

def print_rooms(rooms):
    print(f"\n{'ID':<9} {'EDIFICIO':<25} {'AULA':<17} {'STATO':<17} {'LIBERI':>7} {'OCCUPATI':>9} {'TOTALE':>7}  DOCENTE")
    print("-" * 135)
    for r in rooms:
        print(f"{r['id']:<9} {r['edificio'][:23]:<25} {r['aula'][:15]:<17} {r['stato']:<17} {r['posti_disponibili']:>7} {r['posti_occupati']:>9} {r['capienza_totale']:>7}  {r['docente_referente']}")

def insert_update(rooms):
    rid = ask("ID aula")
    old = next((r for r in rooms if r["id"].casefold() == rid.casefold()), None)
    if old:
        print("Invio mantiene il valore corrente.")
        cap, free = ask_capacity(old["capienza_totale"], old["posti_occupati"])
        row = {"id":old["id"], "edificio":ask("Edificio",old["edificio"]), "aula":ask("Nome aula",old["aula"]),
               "stato":ask_state(old["stato"]), "capienza_totale":cap, "posti_disponibili":free,
               "prese_elettriche":ask_bool(old["prese_elettriche"]), "libera_fino_a":ask("Libera fino a",old["libera_fino_a"]),
               "docente_referente":ask("Docente referente",old["docente_referente"]), "data_aggiornamento":now()}
        rooms[rooms.index(old)] = normalize(row)
        print("Aula aggiornata.")
    else:
        cap, free = ask_capacity()
        row = {"id":rid, "edificio":ask("Edificio"), "aula":ask("Nome aula"), "stato":ask_state(),
               "capienza_totale":cap, "posti_disponibili":free, "prese_elettriche":ask_bool(),
               "libera_fino_a":ask("Libera fino a"), "docente_referente":ask("Docente referente"), "data_aggiornamento":now()}
        rooms.append(normalize(row))
        print("Aula inserita.")

def occupy_seat(rooms):
    rid = ask("ID aula in cui occupare un posto")
    room = next((r for r in rooms if r["id"].casefold() == rid.casefold()), None)
    if not room:
        print("Aula non trovata.")
        return False
    if room["posti_disponibili"] <= 0:
        print("Aula piena: nessun posto disponibile.")
        return False
    room["posti_disponibili"] -= 1
    room["posti_occupati"] += 1
    if room["posti_disponibili"] == 0 and room["stato"] == "Libera":
        room["stato"] = "Occupata Studio"
    room["data_aggiornamento"] = now()
    print(f"Prenotazione registrata. Posti rimasti: {room['posti_disponibili']}.")
    return True

def show_kpis(rooms):
    capacity = sum(r["capienza_totale"] for r in rooms)
    occupied = sum(r["posti_occupati"] for r in rooms)
    building_free = {}
    for r in rooms:
        building_free[r["edificio"]] = building_free.get(r["edificio"], 0) + r["posti_disponibili"]
    top = max(building_free.items(), key=lambda x: x[1]) if building_free else None
    print(f"Aule monitorate: {len(rooms)} | Capienza: {capacity} | Occupati: {occupied} | Occupazione: {round(occupied/capacity*100) if capacity else 0}%")
    print(f"Edificio con più posti liberi: {top[0]} ({top[1]})" if top else "Nessun dato edificio.")

def main():
    rooms = load_rooms()
    while True:
        print("\n=== SMART CAMPUS SPACE FINDER ===\n1. Mostra tutte le aule\n2. Inserisci / aggiorna aula\n3. Elimina aula\n4. Prenota / occupa un posto\n5. Filtra aule libere\n6. Mostra KPI\n7. Salva JSON e CSV\n8. Esci")
        choice = input("Scelta [1-8]: ").strip()
        try:
            changed = False
            if choice == "1": print_rooms(rooms)
            elif choice == "2": insert_update(rooms); changed = True
            elif choice == "3":
                rid = ask("ID aula da eliminare")
                found = next((r for r in rooms if r["id"].casefold() == rid.casefold()), None)
                if found and input(f"Eliminare {found['aula']}? s/n: ").strip().casefold() in {"s","si","sì"}:
                    rooms.remove(found); changed = True
                elif not found: print("Aula non trovata.")
            elif choice == "5":
                term = input("Edificio (Invio=tutti): ").strip().casefold()
                print_rooms([r for r in rooms if r["stato"] == "Libera" and r["posti_disponibili"] > 0 and (not term or term in r["edificio"].casefold())])
            elif choice == "4": changed = occupy_seat(rooms)
            elif choice == "6": show_kpis(rooms)
            elif choice == "7": save_rooms(rooms); print("JSON e CSV esportati.")
            elif choice == "8": save_rooms(rooms); print("Dati salvati. Arrivederci!"); break
            else: print("Scelta non valida.")
            if changed:
                save_rooms(rooms)
                print("Salvataggio automatico completato.")
        except (ValueError, OSError) as exc:
            print(f"Operazione non completata: {exc}")
        except (EOFError, KeyboardInterrupt):
            print("\nInterruzione: salvo i dati.")
            save_rooms(rooms)
            break

if __name__ == "__main__":
    main()
