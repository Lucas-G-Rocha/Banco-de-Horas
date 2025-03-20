const Trabalhados = require('../models/trabalhados');
const {
    dataFormatada,
    minutesToHours,
    numberToTime
} = require('../globalFunctions/timeFunctions');

module.exports.enviarDiasTrabalhadosParaHome = async () => {
    try {
        let diasTrabalhados = await Trabalhados.find().select('_id date primeiraEntrada segundaEntrada primeiraSaida segundaSaida horasTrabalhadas horasExtras').lean();
        if (!diasTrabalhados) {
            throw new Error('Você não possui nenhum dia trabalhado');
        }

        //horas trabalhadas totais
        let minutos_trabalhados = diasTrabalhados.reduce((soma, dia) =>
            soma + dia.horasTrabalhadas, 0
        )
        console.log("minutos_trabalhados "+minutos_trabalhados);
        const horas_trabalhadas = minutesToHours(minutos_trabalhados);
        console.log("horas_trabalhadas "+horas_trabalhadas);
        minutos_trabalhados = numberToTime(horas_trabalhadas);
        console.log("minutos_trabalhados2: " + minutos_trabalhados)


        let minutos_extras = diasTrabalhados.reduce((soma, dia) => soma + dia.horasExtras, 0);
        const horas_extras = minutesToHours(minutos_extras);
        minutos_extras = numberToTime(horas_extras);



        diasTrabalhados.forEach((dia) => {

            const date = new Date(dia.date);
            dia.date = dataFormatada(date);

            //primeira Entrada
            const primeiraEntrada = minutesToHours(dia.primeiraEntrada);
            dia.primeiraEntrada = numberToTime(primeiraEntrada);

            //primeira Saida
            const primeiraSaida = minutesToHours(dia.primeiraSaida);
            dia.primeiraSaida = numberToTime(primeiraSaida);

            //segunda Entrada
            const segundaEntrada = minutesToHours(dia.segundaEntrada);
            dia.segundaEntrada = numberToTime(segundaEntrada);

            //segunda Saida
            const segundaSaida = minutesToHours(dia.segundaSaida);
            dia.segundaSaida = numberToTime(segundaSaida);

            //horas Trabalhadas

            const horasTrabalhadas = minutesToHours(dia.horasTrabalhadas);
            dia.horasTrabalhadas = numberToTime(horasTrabalhadas);

            //horas Extras
            const horasExtras = minutesToHours(dia.horasExtras);
            dia.horasExtras = numberToTime(horasExtras);


        })

        const quantDias_trabalhados = diasTrabalhados.length;


        return {
            diasTrabalhados,
            quantDias_trabalhados,
            minutos_trabalhados,
            minutos_extras
        };

    }
    catch (err) {
        return err.message;
    }
}