const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trabalhadoSchema = new Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    //colocar também um id do usuario para serem relacionados
    primeiraEntrada:{
        type: Number,
        required: true,
    },
    primeiraSaida:{
        type: Number,
        required: true,
    },
    segundaEntrada:{
        type: Number,
        required: true,
    },
    segundaSaida:{
        type: Number,
        required: true,
    },
    horasTrabalhadas: {
        type: Number,
        required: true
    },
    horasExtras: {
        type: Number,
        required: true
    }

}, { timestamps: {createdAt: true, updatedAt: false}});


const Trabalhados = mongoose.model('Trabalhados', trabalhadoSchema,'trabalhados' );

module.exports = Trabalhados;