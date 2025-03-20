const adicionarDiaTrabalhado = document.getElementById('adicionarDiaTrabalhado');
const main = document.getElementById('main');

adicionarDiaTrabalhado.addEventListener('click', () => {
    if (!document.getElementById('overlay')) {
        const overlay = criarFormularioParaAdicionarDiaTrabalhado("Adicionar Dia Trabalhado");
        main.appendChild(overlay);

        // Fechar formulário ao clicar no botão "Fechar"
        const fechar = document.getElementById('fechar');
        if (fechar) {
            fechar.onclick = () => overlay.remove();
        }
    }
});

// Adiciona evento de submit para qualquer formulário dinâmico
document.addEventListener('submit', async (e) => {
    if (e.target.id === 'adicionarDiaTrabalhadoForm') {
        e.preventDefault();
        const formInputs = e.target.querySelectorAll('.formInput');

        const inputObject = Array.from(formInputs).reduce((acc, input) => {
            acc[input.name] = input.value;
            return acc;
        }, {});

        if (Object.keys(inputObject).length > 0) {
            console.log(inputObject);
            const result = await fetch('/api/adicionarDiaTrabalhado', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ date: inputObject.date, primeiraEntrada: inputObject.primeiraEntrada, primeiraSaida: inputObject.primeiraSaida, segundaEntrada: inputObject.segundaEntrada, segundaSaida: inputObject.segundaSaida})
            });

            const resultado = await result.json();
            alert(resultado.message);
            location.reload();
        }
    }
});
