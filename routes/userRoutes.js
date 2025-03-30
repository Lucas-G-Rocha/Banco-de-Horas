const express = require('express');
const routes = express.Router();

const { cadastroDeDiaTrabalhado, remocaoDeDiaTrabalhado, edicaoDeDiaTrabalhado, pegarDiaTrabalhado } = require('../controller/crud.js'); ///
const { enviarDiasTrabalhadosParaHome } = require('../sendData/enviarDiasTrabalhadosParaHome.js'); ///

//permitir acessar as páginas apenas se logado
//Inicio
routes.get('/', async (req, res) => {
    const {
        diasTrabalhados, 
        quantDias_trabalhados, 
        minutos_trabalhados,    
        minutos_extras
    } = await enviarDiasTrabalhadosParaHome();
    

    console.log(diasTrabalhados);
    res.render('inicio', {
        title: 'Inicio',
        cssPath: './public/css/inicio.css',
        dias_trabalhados: quantDias_trabalhados,
        horas_trabalhadas: minutos_trabalhados,
        horas_extras: minutos_extras,
        document: diasTrabalhados,
    });
})

//cadastrar dia trabalhado
routes.post('/api/adicionarDiaTrabalhado', (req, res) => {
    cadastroDeDiaTrabalhado(req, res);
});
//Remover-Deletar dia trabalhado
routes.delete('/api/removerDiaTrabalhado', async (req, res) => {
    remocaoDeDiaTrabalhado(req, res);
})
//Editar dia trabalhado
routes.patch('/api/editarDiaTrabalhado', async (req, res) => {
    edicaoDeDiaTrabalhado(req, res);
});
routes.post('/api/pegarDiaTrabalhado', async (req, res) => {
    pegarDiaTrabalhado(req, res);
})


module.exports = routes;

