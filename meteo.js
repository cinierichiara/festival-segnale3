const contenitoreMeteo = document.querySelector("#dati-meteo");

async function caricaMeteo() {
  if (!contenitoreMeteo) return;

  const indirizzo =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=45.0703" +
    "&longitude=7.6869" +
    "&current=temperature_2m,wind_speed_10m" +
    "&timezone=Europe%2FRome";

  try {
    const risposta = await fetch(indirizzo);

    if (!risposta.ok) {
      throw new Error("La richiesta meteo non è riuscita.");
    }

    const dati = await risposta.json();
    const attuali = dati.current;
    const unita = dati.current_units;

    if (!attuali || !unita) {
      throw new Error("I dati meteo ricevuti non sono completi.");
    }

    const [data, ora] = attuali.time.split("T");
    const [anno, mese, giorno] = data.split("-");
    const dataOra = new Date(
      Number(anno),
      Number(mese) - 1,
      Number(giorno)
    );

    const dataFormattata = new Intl.DateTimeFormat("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(dataOra);

    const temperatura = document.createElement("p");
    temperatura.textContent =
      `Temperatura: ${attuali.temperature_2m} ${unita.temperature_2m}`;

    const vento = document.createElement("p");
    vento.textContent =
      `Vento: ${attuali.wind_speed_10m} ${unita.wind_speed_10m}`;

    const orarioDato = document.createElement("p");
    orarioDato.textContent = `Dato aggiornato alle ${ora} del ${dataFormattata}`;

    contenitoreMeteo.replaceChildren(temperatura, vento, orarioDato);
  } catch (errore) {
    console.error("Errore nel caricamento del meteo:", errore);

    const messaggio = document.createElement("p");
    messaggio.setAttribute("role", "status");
    messaggio.textContent =
      "Al momento non è possibile caricare i dati meteo.";

    contenitoreMeteo.replaceChildren(messaggio);
  }
}

caricaMeteo();
