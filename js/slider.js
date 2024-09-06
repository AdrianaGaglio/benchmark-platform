const slider = document.getElementById("question-number");
const tooltip = document.getElementById("tooltip");

function updateTooltip() {
  // Imposta il valore attuale del cursore nel tooltip
  tooltip.innerText = slider.value;

  // Calcola la posizione del tooltip in base al valore corrente
  const tooltipWidth = tooltip.offsetWidth; // offsetWidth restituisce la larghezza in pixel dell'elemento tooltip, includendo i bordi ma escludendo margini esterni e scrollbars.
  const min = slider.min; //strae il valore minimo (min) del cursore, definito come attributo nell'HTML (min="5" nel tuo caso).
  const max = slider.max; //Estrae il valore massimo (max) del cursore, definito nell'HTML (max="10" nel tuo caso).
  const value = slider.value;

  // Calcola la percentuale del valore attuale
  const percentage = (value - min) / (max - min); //Calcola la posizione del cursore in termini di percentuale rispetto al suo intervallo totale.
  // Imposta la posizione del tooltip
  tooltip.style.left = `calc(${percentage * 100}% - ${tooltipWidth / 2}px)`; // Imposta la proprietà left del tooltip in modo che il tooltip segua la posizione del cursore. Usa una combinazione di percentuale (percentage * 100%) e un aggiustamento basato sulla larghezza del tooltip (tooltipWidth / 2).
} //La funzione calc() viene utilizzata per combinare unità diverse in CSS, come percentuali e pixel. In questo caso, viene combinata una percentuale (la posizione lungo la barra) e un valore in pixel (per centrare il tooltip).

// Aggiorna il tooltip al caricamento iniziale
updateTooltip();

// Aggiungi un listener per aggiornare il tooltip quando il valore cambia
slider.addEventListener("input", updateTooltip); //Aggiunge un event listener sull'elemento slider che ascolta l'evento input. Questo evento viene attivato ogni volta che l'utente muove il cursore.

/*Come funziona:
Il tooltip viene aggiornato ogni volta che il valore del cursore cambia, utilizzando l'evento input.
La posizione del tooltip è calcolata in percentuale sulla base del valore corrente del cursore.
La funzione updateTooltip si occupa di calcolare la posizione orizzontale del tooltip e posizionarlo sopra il cursore in modo dinamico.*/
