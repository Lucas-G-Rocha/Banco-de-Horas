function criarFormularioParaAdicionarDiaTrabalhado() {
    const form = document.createElement('form');
    form.id = 'adicionarDiaTrabalhadoForm';

    // Botão Fechar
    const fechar = document.createElement('button');
    fechar.id = 'fechar';
    fechar.textContent = 'Fechar';
    form.appendChild(fechar);

    // Criar título
    const title = document.createElement("h2");
    title.textContent = "Adicionar Dia Trabalhado";
    title.id = 'titleDiaTrabalhadoForm';
    form.appendChild(title);

    // Dados do formulário
    const campos = [
        { label: "Data", type: "date", name: "date", id: "date", required: true },
        { label: "Primeira Entrada", type: "time", name: "primeiraEntrada", id: "primeiraEntrada", required: true },
        { label: "Primeira Saída", type: "time", name: "primeiraSaida", id: "primeiraSaida", required: true  },
        { label: "Segunda Entrada", type: "time", name: "segundaEntrada", id: "segundaEntrada", required: true  },
        { label: "Segunda Saída", type: "time", name: "segundaSaida", id: "segundaSaida", required: true  }
    ];

    // Criar os inputs e labels
    campos.forEach(campo => {
        const div = document.createElement("div");
        div.classList.add("inputContainer");

        const label = document.createElement("label");
        label.textContent = campo.label;
        label.setAttribute("for", campo.id);
        label.classList.add("formLabel");

        const input = document.createElement("input");
        input.type = campo.type;
        input.name = campo.name;
        input.id = campo.id;
        input.required = campo.required;
        input.classList.add("formInput");

        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
    });

    // Criar botão de submit
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Salvar";
    button.classList.add("formSubmitButton");
    form.appendChild(button);

    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.appendChild(form);

    return overlay;
}

function criarFormularioParaEditarDiaTrabalhado(titulo) {
    const form = document.createElement('form');
    form.id = 'adicionarDiaTrabalhadoForm';

    // Botão Fechar
    const fechar = document.createElement('button');
    fechar.id = 'fechar';
    fechar.textContent = 'Fechar';
    form.appendChild(fechar);

    // Criar título
    const title = document.createElement("h2");
    title.textContent = titulo;
    title.id = 'titleDiaTrabalhadoForm';
    form.appendChild(title);

    // Dados do formulário
    const campos = [
        { label: "Data", type: "date", name: "date", id: "date" },
        { label: "Primeira Entrada", type: "time", name: "primeiraEntrada", id: "primeiraEntrada" },
        { label: "Primeira Saída", type: "time", name: "primeiraSaida", id: "primeiraSaida" },
        { label: "Segunda Entrada", type: "time", name: "segundaEntrada", id: "segundaEntrada" },
        { label: "Segunda Saída", type: "time", name: "segundaSaida", id: "segundaSaida" }
    ];

    // Criar os inputs e labels
    campos.forEach(campo => {
        const div = document.createElement("div");
        div.classList.add("inputContainer");

        const label = document.createElement("label");
        label.textContent = campo.label;
        label.setAttribute("for", campo.id);
        label.classList.add("formLabel");

        const input = document.createElement("input");
        input.type = campo.type;
        input.name = campo.name;
        input.id = campo.id;
        input.classList.add("formInput");

        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
    });

    // Criar botão de submit
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Salvar";
    button.classList.add("formSubmitButton");
    form.appendChild(button);

    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.appendChild(form);

    return overlay;
}