
module.exports.timeToNumber = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const inNumber = { hours: hours, minutes: minutes };
    return inNumber;
}
module.exports.numberToTime = (hours) => {
    let minutes = 0;
    if (hours % 1 != 0) {
        const valorQuebrado = (hours % 1);
        hours = hours - valorQuebrado;
        // console.log('\nValor Quebrado' + valorQuebrado);
        // console.log('Horas' + hours);

        minutes = valorQuebrado * 60
        // console.log("NumberToTime: " + "Minutes -> " + minutes);
    }
    if (minutes > 60) {
        hours++;
        minutes = minutes - 60;
        // console.log('\nMinutos' + minutes);
        // console.log('Horas' + hours);
    }
    if (minutes == 60) {
        hours++;
        minutes = 0;
        // console.log('\nMinutos' + minutes);
        // console.log('Horas' + hours);
    }
    minutes = parseInt(minutes);
    let negative = false;
    if (minutes < 0) {
        minutes = Math.abs(minutes)
        negative = true;
    }
    if (hours < 0) {
        hours = Math.abs(hours);
        negative = true;
    }
    if (negative) {
        return `- ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}h`;
    }
    const result = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}h`;
    // console.log(result);
    return result;
}
module.exports.hoursToMinutes = (hours) => {
    const inMinutes = hours * 60;
    return inMinutes;
}
module.exports.minutesToHours = (minutes) => {
    const inHours = minutes / 60;
    // console.log('inHours: ' + inHours);
    return inHours;
}
module.exports.diferencaEntreHorarios = (minutos) => {
    let totalPrimeiroTurno = minutos.primeiraSaida - minutos.primeiraEntrada;
    let totalSegundoTurno = minutos.segundaSaida - minutos.segundaEntrada;
    console.log(minutos);
    console.log(totalPrimeiroTurno);
    console.log(totalSegundoTurno);
    return [totalPrimeiroTurno, totalSegundoTurno];
}
module.exports.somarTodosOsMinutos = (minutos) => {
    let minutosSomados = 0;
    for (let i = 0; i < minutos.length; i++) {
        minutosSomados += minutos[i];
    }
    return minutosSomados;
}

module.exports.dataFormatada = (date) => {
    const dia = String(date.getUTCDate()).padStart(2, "0");
    const mes = String(date.getUTCMonth() + 1).padStart(2, "0"); // Mês começa em 0
    const ano = date.getUTCFullYear();

    return `${dia}/${mes}/${ano}`;
}