const { dataFormatada, minutesToHours, numberToTime} = require('./timeFunctions');

module.exports.formatarDiaTrabalhado = (diaTrabalhado) => {
    let diaTrabalhadoFormatado = {};

    const date = new Date(diaTrabalhado.date);
    diaTrabalhadoFormatado.date = dataFormatada(date);
    console.log(diaTrabalhadoFormatado);

    const primeiraEntrada = minutesToHours(diaTrabalhado.primeiraEntrada);
    diaTrabalhadoFormatado.primeiraEntrada = numberToTime(primeiraEntrada);

    //primeira Saida
    const primeiraSaida = minutesToHours(diaTrabalhado.primeiraSaida);
    diaTrabalhadoFormatado.primeiraSaida = numberToTime(primeiraSaida);

    //segunda Entrada
    const segundaEntrada = minutesToHours(diaTrabalhado.segundaEntrada);
    diaTrabalhadoFormatado.segundaEntrada = numberToTime(segundaEntrada);

    //segunda Saida
    const segundaSaida = minutesToHours(diaTrabalhado.segundaSaida);
    diaTrabalhadoFormatado.segundaSaida = numberToTime(segundaSaida);
    
    console.log(diaTrabalhadoFormatado);

    return diaTrabalhadoFormatado;
}