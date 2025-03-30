const express = require('express');
const { cadastroDiaTrabalhado_service, remocaoDeDiaTrabalhado_service, edicaoDeDiaTrabalhado_service, pegarDiaTrabalhado_service } = require('../service/crud');

//Cadastrar dia Trabalhado
module.exports.cadastroDeDiaTrabalhado = async (req, res)=>{
    try{

        const diaTrabalhado = req.body;
        const novoDiaTrabalhado = await cadastroDiaTrabalhado_service(diaTrabalhado);
        if(novoDiaTrabalhado){
            res.status(200).json({message: 'Dia trabalhado adicionado'});
        }else{
            throw new Error('Erro ao cadastrar ou exibir o dia trabalhado');
        }
    }catch(err){
        res.status(400).json({message: err.message});
    }
    

}
//Remover-Deletar dia trabalhado
module.exports.remocaoDeDiaTrabalhado = async (req, res) => {
    try{
        const { diaID } = req.body;
        const result = await remocaoDeDiaTrabalhado_service(diaID);
        if(!result.deletedCount > 0){
            throw new Error('Erro ao deletar o dia trabalhado');
        }
        res.status(200).json({sucess: true, message: "Deletado com sucesso!"});
    }catch(err){
        res.status(400).json({sucess: false, message: err.message});
    }
}

//Editar dia trabalhado
module.exports.edicaoDeDiaTrabalhado = async (req, res) => {
    try{
        const {data} = req.body;
        const result = await edicaoDeDiaTrabalhado_service(data)

        if(result.modifiedCount > 0){
            res.status(200).json({sucess: true, message: "Atualizado com sucesso!"});
        }else{
            throw new Error("Ocorreu um erro ao atualizar o documento");
        }
    }catch(err){
        res.status(400).json({sucess: false, message: err.message});
    }
}

module.exports.pegarDiaTrabalhado = async (req, res) => {
    try{
        const {diaID} = req.body;
        const diaTrabalhado = await pegarDiaTrabalhado_service(diaID);
        if(diaTrabalhado){
            res.status(200).json({sucess: true, diaTrabalhado: diaTrabalhado});
        }else{
            throw new Error('Ocorreu um erro ao conseguir os dados');
        }
    }catch(err){
        res.status(400). json({sucess: false, message: err.message});
    }
}