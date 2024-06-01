export function formatDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedDate = `${formattedMonth}/${formattedDay}/${year}`;
  return formattedDate;
}

export const spanishMonths: { [key: number]: string } = {
  0: 'Enero', 1: 'Febrero', 2: 'Marzo', 3: 'Abril', 4: 'Mayo', 5: 'Junio',
  6: 'Julio', 7: 'Agosto', 8: 'Septiembre', 9: 'Octubre', 10: 'Noviembre', 11: 'Diciembre'
};

export const spanishDaysOfWeek: { [key: number]: string } = {
  0: 'Domingo', 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado'
};

export function formatDateSpanish(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = spanishMonths[date.getMonth()];
  const year = date.getFullYear();
  const dayOfWeek = spanishDaysOfWeek[date.getDay()];

  return `${dayOfWeek} ${day} de ${month} del ${year}`;
}
export function obtenerFechaAvance(fechaFin: string): number {
  let band = 0;
  const fFin = new Date(fechaFin);
  const fActual = new Date();
  const diasDiferencia = calcularRangoDeDias(fFin);

  if (fActual > fFin) {
    band = 1;
  } else {
    if (diasDiferencia <= 3) {
      band = 3;
    } else {
      band = 2;
    }
  }
  return band;
}

export function calcularRangoDeDias(fechaTermino: Date) {
  var fechaActual = new Date();
  var tiempoTermino = fechaTermino.getTime();
  var tiempoActual = fechaActual.getTime();
  var diferenciaEnMilisegundos = tiempoTermino - tiempoActual;
  var diferenciaEnDias = Math.ceil(
    diferenciaEnMilisegundos / (1000 * 3600 * 24)
  );

  return diferenciaEnDias;
}
