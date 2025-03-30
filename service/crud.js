const Trabalhados = require('../models/trabalhados');

const { timeToNumber, hoursToMinutes, somarTodosOsMinutos, diferencaEntreHorarios } = require('../globalFunctions/timeFunctions');
const { formatarDiaTrabalhado } = require('../globalFunctions/funcoesCompostas');
module.exports.cadastroDiaTrabalhado_service = async (diaTrabalhado) => {
    console.log("aqui");
    console.log(diaTrabalhado);
    diaTrabalhado.date = new Date(diaTrabalhado.date);
    diaTrabalhado.date.setUTCHours(0, 0, 0, 0);
    const dateExists = await Trabalhados.findOne({ date: diaTrabalhado.date }).select('date'); //Quando adicionar o sistema de usuarios, adicionar o _id como parametro de busca também
    if (!dateExists) {

        //primeira entrada
        let time = timeToNumber(diaTrabalhado.primeiraEntrada);
        let hourToNumber = hoursToMinutes(time.hours);
        diaTrabalhado.primeiraEntrada = hourToNumber + time.minutes;

        //primeira saída
        time = timeToNumber(diaTrabalhado.primeiraSaida);
        hourToNumber = hoursToMinutes(time.hours);
        diaTrabalhado.primeiraSaida = hourToNumber + time.minutes;

        //segunda entrada 
        time = timeToNumber(diaTrabalhado.segundaEntrada);
        hourToNumber = hoursToMinutes(time.hours);
        diaTrabalhado.segundaEntrada = hourToNumber + time.minutes;

        //segunda saída
        time = timeToNumber(diaTrabalhado.segundaSaida);
        hourToNumber = hoursToMinutes(time.hours);
        diaTrabalhado.segundaSaida = hourToNumber + time.minutes;

        const totalDeMinutosPorTurno = diferencaEntreHorarios(diaTrabalhado)
        const totalPrimeiroTurno = totalDeMinutosPorTurno[0];
        const totalSegundoTurno = totalDeMinutosPorTurno[1];
        const minutos = [totalPrimeiroTurno, totalSegundoTurno];
        const totalDeMinutosTrabalhados = somarTodosOsMinutos(minutos);

        //Calcular e verificar as horas trabalhadas e horas extras e armazenar em minutos. Também fazer os erros e adicionar try catch no controller
        const minutosNecessarios = 8 * 60;
        let horasExtras = 0;
        if (totalDeMinutosTrabalhados >= minutosNecessarios) {
            horasExtras = totalDeMinutosTrabalhados - minutosNecessarios;
        }
        if (totalDeMinutosTrabalhados < minutosNecessarios) {
            horasExtras = totalDeMinutosTrabalhados - minutosNecessarios;
        }
        const novoDiaTrabalhado = new Trabalhados({
            date: diaTrabalhado.date,
            primeiraEntrada: diaTrabalhado.primeiraEntrada,
            primeiraSaida: diaTrabalhado.primeiraSaida,
            segundaEntrada: diaTrabalhado.segundaEntrada,
            segundaSaida: diaTrabalhado.segundaSaida,
            horasTrabalhadas: totalDeMinutosTrabalhados,
            horasExtras: horasExtras
            //adicionar o id do usuario no model e aqui para estar vinculado a um usuario
        });
        
        const result = await novoDiaTrabalhado.save();

        return { result, sucess: true };
    } else {
        throw new Error('Essa data já foi cadastrada');
    }
}

module.exports.remocaoDeDiaTrabalhado_service = async (diaID) => {
    const result = await Trabalhados.deleteOne({ _id: diaID });
    return result;
}

module.exports.edicaoDeDiaTrabalhado_service = async (data) => {
    const diaTrabalhado = await Trabalhados.findOne({_id: data._id}).select('date primeiraEntrada primeiraSaida segundaEntrada segundaSaida');
    
    if (!diaTrabalhado) {
        throw new Error('dia trabalhado não encontrado');
    }
    
    let newData = EDICAO_verificacaoETransformacaoDosValores(data, diaTrabalhado);
    
    const minutosPorTurno = diferencaEntreHorarios(newData);
    newData.horasTrabalhadas = minutosPorTurno[0] + minutosPorTurno[1];
    const minutosNecessarios = 480;
    newData.horasExtras = 0;
    if(newData.horasTrabalhadas >= minutosNecessarios){
        newData.horasExtras = newData.horasTrabalhadas - minutosNecessarios;
    }
    if(newData.horasTrabalhadas < minutosNecessarios){
        newData.horasExtras = newData.horasTrabalhadas - minutosNecessarios;
    }
    const result = await Trabalhados.updateOne({ _id: newData._id }, {
        $set: {
            date: newData.date,
            primeiraEntrada: newData.primeiraEntrada,
            primeiraSaida: newData.primeiraSaida,
            segundaEntrada: newData.segundaEntrada,
            segundaSaida: newData.segundaSaida,
            
            horasTrabalhadas: newData.horasTrabalhadas,
            horasExtras: newData.horasExtras
        }
    });
    return result;
}
module.exports.pegarDiaTrabalhado_service = async (diaID) => {
    if(diaID){
        const diaTrabalhado = await Trabalhados.findOne({_id: diaID}).select('date primeiraEntrada primeiraSaida segundaEntrada segundaSaida horasTrabalhadas horasExtras').lean();
        console.log(diaTrabalhado);
        if(diaTrabalhado){
            const diaTrabalhadoFormatado = formatarDiaTrabalhado(diaTrabalhado);
            console.log('passou');
            console.log(diaTrabalhadoFormatado);

            return diaTrabalhadoFormatado;
        }else{
            throw new Error('Erro ao procurar o dia trabalhado');
        }
    }else{
        throw new Error('Erro ao receber o ID');
    }
}


//Funções Locais
function EDICAO_verificacaoETransformacaoDosValores(data, diaTrabalhado) {
    let newData;
    if (data._id) {
        newData = { _id: data._id };
    } else {
        throw new Error('Ocorreu um erro ao encontrar o dia trabalhado');
    }

    if (data.date) {
        newData.date = new Date(data.date);
        newData.date.setUTCHours(0, 0, 0, 0);
    }else{
        newData.date = diaTrabalhado.date;
    }

    if (data.primeiraEntrada) {
        newData.primeiraEntrada = data.primeiraEntrada;
        let primeiraEntradaNumero = timeToNumber(newData.primeiraEntrada);

        primeiraEntradaNumero.hours = hoursToMinutes(primeiraEntradaNumero.hours);
        newData.primeiraEntrada = primeiraEntradaNumero.hours + primeiraEntradaNumero.minutes;
    }else{
        newData.primeiraEntrada = diaTrabalhado.primeiraEntrada;
    }

    if (data.segundaEntrada) {
        newData.segundaEntrada = data.segundaEntrada;
        let segundaEntradaNumero = timeToNumber(newData.segundaEntrada);

        segundaEntradaNumero.hours = hoursToMinutes(segundaEntradaNumero.hours);
        newData.segundaEntrada = segundaEntradaNumero.hours + segundaEntradaNumero.minutes;
    }else{
        newData.segundaEntrada = diaTrabalhado.segundaEntrada;
    }

    if (data.primeiraSaida) {
        newData.primeiraSaida = data.primeiraSaida;
        let primeiraSaidaNumero = timeToNumber(newData.primeiraSaida);

        primeiraSaidaNumero.hours = hoursToMinutes(primeiraSaidaNumero.hours);
        newData.primeiraSaida = primeiraSaidaNumero.hours + primeiraSaidaNumero.minutes;
    }else{
        newData.primeiraSaida = diaTrabalhado.primeiraSaida;
    }

    if (data.segundaSaida) {
        newData.segundaSaida = data.segundaSaida;
        let segundaSaidaNumero = timeToNumber(newData.segundaSaida);

        segundaSaidaNumero.hours = hoursToMinutes(segundaSaidaNumero.hours);
        newData.segundaSaida = segundaSaidaNumero.hours + segundaSaidaNumero.minutes;
    }else{
        newData.segundaSaida = diaTrabalhado.segundaSaida;
    }
    return newData;

}
