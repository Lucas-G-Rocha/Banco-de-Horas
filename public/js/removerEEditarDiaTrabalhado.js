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
        const overlay = criarFormularioParaEditarDiaTrabalhado("Editar Dia Trabalhado");
        main.appendChild(overlay);
        
        // Fechar formulário ao clicar no botão "Fechar"
        const fechar = document.getElementById('fechar');
        if (fechar) {
            fechar.onclick = () => overlay.remove();
        }
    }
    })

async function removerDiaTrabalhado(buttonID){
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

async function editarDiaTrabalhado(buttonID){

}
