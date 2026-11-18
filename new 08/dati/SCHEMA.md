# Scheda dati — Segnale

## Entità

### Evento

| Campo | Tipo | Esempio |
|---|---|---|
| `id` | numero intero | `1` |
| `titolo` | stringa | `"Lettere in movimento"` |
| `data` | data in formato `AAAA-MM-GG` | `"2026-06-12"` |
| `orario` | stringa, formato `HH:MM` | `"10:00"` |
| `categoria` | stringa | `"Incontro"` |
| `descrizione` | stringa | `"Come cambia un messaggio quando cambiano le lettere?"` |
| `immagine` | stringa, percorso del file | `"assets/lettere-in-movimento.svg"` |
| `immagine_alt` | stringa | `"Lettere geometriche disposte su una griglia"` |
| `sede_id` | numero intero | `1` |

**Chiave primaria:** `id`. È numerica, univoca tra gli eventi e stabile: non va cambiata quando si aggiorna il contenuto dell’evento.

### Sede

| Campo | Tipo | Esempio |
|---|---|---|
| `id` | numero intero | `1` |
| `nome` | stringa | `"Officina Nord — Sede centrale"` |
| `indirizzo` | stringa | `"Corso Duca degli Abruzzi 24, Torino"` |

**Chiave primaria:** `id`. È numerica, univoca tra le sedi e stabile: non va cambiata quando si aggiorna il contenuto della sede.

## Relazione

Una sede può ospitare più eventi; ogni evento si svolge in una sola sede. `Evento.sede_id` fa riferimento a `Sede.id`.

## Quantità

Il dataset contiene **sei eventi** e **tre sedi**.

## Aggiornamento e pubblicazione

Il responsabile del progetto aggiorna i dati modificando i file JSON nella repository, mantenendo corretti gli ID e i riferimenti tra `sede_id` e `id`. Le modifiche vengono salvate nella repository e poi pubblicate tramite il processo di pubblicazione del sito.

## Contenuto mostrato dal sito

La pagina Programma mostra gli eventi con titolo, data, orario, categoria, descrizione e immagine. La pagina Info e luoghi mostra le sedi e i relativi indirizzi. La sede associata a ciascun evento viene individuata tramite `sede_id`.

## Schema Evento–Sede

```mermaid
erDiagram
    SEDE ||--o{ EVENTO : ospita
    SEDE {
        int id PK
        string nome
        string indirizzo
    }
    EVENTO {
        int id PK
        string titolo
        date data
        string orario
        string categoria
        string descrizione
        string immagine
        string immagine_alt
        int sede_id FK
    }
