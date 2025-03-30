const diasTrabalhadosContainer = document.getElementById('diasTrabalhadosContainer');

diasTrabalhadosContainer.addEventListener('click', async function(event){
    
    if (event.target && event.target.classList.contains('removeButton')) {
        const buttonID = event.target.dataset.id;
        console.log(buttonID);
        removerDiaTrabalhado(buttonID);
    }
    if(event.target && event.target.classList.contains('editButton')){
        const buttonID = event.target.dataset.id;
        console.log(buttonID);

        const inputValue = await pegarDadosDoDiaTrabalhado(buttonID);
        if(inputValue){
        const overlay = criarFormularioParaEditarDiaTrabalhado("Editar Dia Trabalhado", inputValue, buttonID);
        main.appendChild(overlay);
        
        // Fechar formulário ao clicar no botão "Fechar"
        const fechar = document.getElementById('fechar');
        if (fechar) {
            fechar.onclick = () => overlay.remove();
        }
    }else{
        alert("Ocorreu um erro ao obter os valores dos Inputs");
    }
}
    })

async function removerDiaTrabalhado(buttonID){
    if(confirm('Tem certeza que deseja remover este dia Trabalhado?')){

        const result = await fetch('/api/removerDiaTrabalhado', {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({diaID: buttonID})
        })
    if(!result.ok){
        const resultado = await result.json();
        alert(resultado.message);
    }else{
        const resultado = await result.json();
        alert(resultado.message);
    }
    
    location.reload(true);
}
}

document.addEventListener('submit', async (e) => {
    if (e.target.id === 'editarDiaTrabalhadoForm') {
        e.preventDefault();
        const formInputs = e.target.querySelectorAll('.formInput');

        const inputObject = Array.from(formInputs).reduce((acc, input) => {
            acc[input.name] = input.value;
            return acc;
        }, {});

        if (Object.keys(inputObject).length > 0) {
            console.log(inputObject);
            const editarDiaTrabalhadoForm = document.getElementById('editarDiaTrabalhadoForm');
            const dataID = editarDiaTrabalhadoForm.dataset.id;
            const result = await fetch('/api/editarDiaTrabalhado', {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({data: { _id: dataID, date: inputObject.date, primeiraEntrada: inputObject.primeiraEntrada, primeiraSaida: inputObject.primeiraSaida, segundaEntrada: inputObject.segundaEntrada, segundaSaida: inputObject.segundaSaida}})
            });

            const resultado = await result.json();
            alert(resultado.message);
            location.reload();
        }
    }
});
async function pegarDadosDoDiaTrabalhado(buttonID){
    const result = await fetch('/api/pegarDiaTrabalhado', {
        method: 'POST', 
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({diaID: buttonID})
    });
    if(!result.ok){
        const resultado = await result.json();
        alert(resultado.message);
    }else{
        const resultado = await result.json();
        return resultado;
    }
}