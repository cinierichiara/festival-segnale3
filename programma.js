const contenitore = document.querySelector("#event-grid");

function creaElemento(tag, classe, testo) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (testo) elemento.textContent = testo;
  return elemento;
}

function formattaData(data) {
  const [anno, mese, giorno] = data.split("-");
  const dataLocale = new Date(Number(anno), Number(mese) - 1, Number(giorno));

  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long"
  }).format(dataLocale);
}

async function caricaProgramma() {
  if (!contenitore) {
    console.error('Non trovo il contenitore con id "event-grid".');
    return;
  }

  contenitore.textContent = "Caricamento del programma…";

  try {
    const [rispostaEventi, rispostaSedi] = await Promise.all([
      fetch("dati/eventi.json"),
      fetch("dati/sedi.json")
    ]);

    if (!rispostaEventi.ok || !rispostaSedi.ok) {
      throw new Error("Non è stato possibile leggere uno o più file JSON.");
    }

    const [eventi, sedi] = await Promise.all([
      rispostaEventi.json(),
      rispostaSedi.json()
    ]);

    if (!Array.isArray(eventi) || !Array.isArray(sedi)) {
      throw new Error("Il formato dei file JSON non è valido.");
    }

    contenitore.replaceChildren();

    if (eventi.length === 0) {
      contenitore.textContent = "Non ci sono eventi in programma.";
      return;
    }

    const sediPerId = new Map(
      sedi.map((sede) => [String(sede.id), sede])
    );

    eventi.forEach((evento) => {
      const sede = sediPerId.get(String(evento.sede_id));
      const card = creaElemento("article", "event-card");

      if (evento.immagine) {
        const immagine = document.createElement("img");
        immagine.src = evento.immagine;
        immagine.alt = evento.immagine_alt ?? "";
        immagine.loading = "lazy";
        card.append(immagine);
      }

      const corpo = creaElemento("div", "event-body");
      const categoria = creaElemento("p", "event-meta", evento.categoria ?? "");
      const titolo = creaElemento("h3", "", evento.titolo ?? "Evento");
      const descrizione = creaElemento("p", "", evento.descrizione ?? "");
      const dataOra = [evento.data ? formattaData(evento.data) : "", evento.orario]
        .filter(Boolean)
        .join(" · ");

      const data = creaElemento("p", "event-meta", dataOra);
      const luogo = creaElemento(
        "p",
        "event-place",
        sede
          ? `${sede.nome} — ${sede.indirizzo}`
          : "Sede da definire"
      );

      corpo.append(categoria, titolo, descrizione, data, luogo);
      card.append(corpo);
      contenitore.append(card);
    });
  } catch (errore) {
    console.error("Errore nel caricamento del programma:", errore);
    contenitore.textContent =
      "Non è stato possibile caricare il programma. Controlla i file e riprova.";
  }
}

caricaProgramma();
