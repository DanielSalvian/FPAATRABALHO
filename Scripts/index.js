//Gera elementos da interface do html
const select = document.getElementById('tamanhoEntrada');
for (let i = 1; i <= 10; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    select.appendChild(option);
}
document.getElementById('tamanhoEntrada').addEventListener('change', gerarCampos);
gerarCampos();
function gerarCampos() {
    const container = document.getElementById('camposGerados');
    const quantidade = parseInt(document.getElementById('tamanhoEntrada').value);
    container.innerHTML = '';

    // Gera os novos pares de inputs
    for (let i = 1; i <= quantidade; i++) {
        const numLinha = document.createElement('span');
        numLinha.textContent = `${i} - `;

        const campoA = document.createElement('input');
        campoA.type = 'text';
        campoA.placeholder = `Helena ${i}`;
        campoA.name = `Helena_${i}`;
        campoA.id = `Helena_${i}`;
        campoA.className = `campo`;

        const campoB = document.createElement('input');
        campoB.type = 'text';
        campoB.placeholder = `Marcus ${i}`;
        campoB.name = `Marcus_${i}`;
        campoB.id = `Marcus_${i}`;
        campoB.className = `campo`;

        const br = document.createElement('br');

        container.appendChild(numLinha);
        container.appendChild(campoA);
        container.appendChild(campoB);
        container.appendChild(br);
    }
}

//ação chamada ao clicar no botão de gerar substrings
function definirAnalise() {
    const checkbox = document.getElementById('check');
    const modo = checkbox.checked;

    if (modo == false) {
        analisarSembacktracking();
    }
    else {
        main(formatarEntrada());//chamar função por backtracking
    }
}

function formatarEntrada() {
    let helena = pegarDadosEntradaHelena();
    let marcus = pegarDadosEntradaMarcus();

    if (!helena || !marcus) return null; // em caso de erro nas validações

    let lines = [`${helena.length}`]; //usa o tamanho das entradas helena como tamanho

    for (let i = 0; i < helena.length; i++) {
        lines.push(helena[i]);
        lines.push(marcus[i]);
    }

    return lines
}

//pega os dados das partes da helena
function pegarDadosEntradaHelena() {
    const quantidade = parseInt(document.getElementById('tamanhoEntrada').value);
    const helena = [];

    const regex = /^[a-z]+$/;

    for (let i = 1; i <= quantidade; i++) {
        const campoHelena = document.getElementById(`Helena_${i}`);
        if (!regex.test(campoHelena.value)) {
            alert(`linha ${i} contem characteres invalidos!`);
            return;
        }
        if (campoHelena.value.length < 0 || campoHelena.value.length > 80) {
            alert(`linha ${i} tem um tamanho invalido!`);
            return;
        }
        helena.push(campoHelena ? campoHelena.value : '');
    }
    return helena;
}

//pega os dados das partes do marcus
function pegarDadosEntradaMarcus() {
    const quantidade = parseInt(document.getElementById('tamanhoEntrada').value);
    const marcus = [];

    const regex = /^[a-z]+$/;

    for (let i = 1; i <= quantidade; i++) {
        const campoMarcus = document.getElementById(`Marcus_${i}`);
        if (!regex.test(campoMarcus.value)) {
            alert(`linha ${i} contem characteres invalidos!`);
            return;
        }
        if (campoMarcus.value.length < 0 || campoMarcus.value.length > 80) {
            alert(`linha ${i} tem um tamanho invalido!`);
            return;
        }
        marcus.push(campoMarcus ? campoMarcus.value : '');
    }
    return marcus;
}


const modal = document.getElementById("modalTexto");
const openBtn = document.querySelector(".add-button");
const closeBtn = document.querySelector(".close-button");

// Abrir o modal
openBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

// Fechar o modal ao clicar no botão "X"
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fechar o modal ao clicar fora do conteúdo
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Função que será chamada quando o botão "Enviar" for clicado
function enviarTexto() {
    const texto = document.getElementById("inputTexto").value;
    const modal = document.getElementById("modalTexto");

    const tamanhoEntrada = document.getElementById("tamanhoEntrada");

    if (texto == null || texto == "") {
        alert(`Insira a entrada`);
        return;
    }

    const linhas = texto.split('\n');
    const primeiraLinha = parseInt(linhas[0].trim(), 10);

    if (primeiraLinha < 1 || primeiraLinha > 10) {
        alert(`Tamanho invalido`);
        return;
    }

    tamanhoEntrada.value = primeiraLinha;
    let tamanhoIdeal = tamanhoEntrada.value * 2 + 1;

    if (linhas.length > tamanhoIdeal || linhas.length < tamanhoIdeal) {
        alert(`As entradas fornecidas não batem com as regras`);
        return;
    }


    gerarCampos();

    let campoHelena;
    let campoMarcus;

    for (let i = 0; i < tamanhoEntrada.value; i++) {
        campoHelena = document.getElementById(`Helena_${i + 1}`);
        campoMarcus = document.getElementById(`Marcus_${i + 1}`);
        if (campoHelena) campoHelena.value = linhas[1 + i * 2];
        if (campoMarcus) campoMarcus.value = linhas[2 + i * 2];
    }

    modal.style.display = "none";
}