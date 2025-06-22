class Elemento {
    constructor(_direcao, _valor) {
        this.direcao = _direcao;
        this.valor = _valor;
    }
}
//Direções
// 0 1 2
// 3 4 5
// 6 7 8
//Valor
// Sua posição na sequencia 1, 2, 3 .....

//valores teste professora
//ijkijkii
//ikjikji

function gerenciarEntradas(tamanhoEntrada, helena, marcus) {
    let matriz = [];
    let resposta = [];

    for (let i = 0; i < tamanhoEntrada; i++) {
        matriz = instanciarMariz(helena[i].length, marcus[i].length);
        matriz = avaliarMatriz(matriz, helena[i], marcus[i])
        resposta.push(...gerarSubstringDaMatriz(matriz, helena[i], marcus[i]).sort());
    }
    return resposta;
}

function instanciarMariz(tamX, tamY) {
    let matriz = [];

    for (let i = 0; i < tamX; i++) {
        matriz[i] = [];
        for (let j = 0; j < tamY; j++) {
            matriz[i][j] = new Elemento(4, 0);
        }
    }

    return matriz;
}

function avaliarMatriz(matriz, stringX, stringY) {
    let tamX = stringX.length;
    let tamY = stringY.length;

    for (let i = 0; i < tamX; i++) {
        for (let j = 0; j < tamY; j++) {
            if (stringX[i] === stringY[j]) {
                let valorDiagonal = (i > 0 && j > 0) ? matriz[i - 1][j - 1].valor : 0;
                matriz[i][j].valor = valorDiagonal + 1;
                matriz[i][j].direcao = 0; // diagonal (↖)
            }
            else {
                // Cima ou Esquerda — pegar o maior
                let cima = i > 0 ? matriz[i - 1][j].valor : 0;
                let esquerda = j > 0 ? matriz[i][j - 1].valor : 0;

                if (cima >= esquerda) {
                    matriz[i][j].valor = cima;
                    matriz[i][j].direcao = 1; // cima
                } else {
                    matriz[i][j].valor = esquerda;
                    matriz[i][j].direcao = 3; // esquerda
                }
            }
        }
    }

    return matriz;

}

//verificar
function gerarSubstringDaMatriz(matriz, stringX, stringY) {
    const stack = [{
        i: stringX.length - 1,
        j: stringY.length - 1,
        lcs: ''
    }];

    const resultados = new Set();

    while (stack.length > 0) {
        const { i, j, lcs } = stack.pop();

        if (i < 0 || j < 0) {
            resultados.add(lcs.split('').reverse().join(''));
            continue;
        }

        const elemento = matriz[i][j];

        if (stringX[i] === stringY[j]) {
            // Diagonal
            stack.push({
                i: i - 1,
                j: j - 1,
                lcs: lcs + stringX[i]
            });
        } else {
            const cima = i > 0 ? matriz[i - 1][j].valor : -1;
            const esquerda = j > 0 ? matriz[i][j - 1].valor : -1;

            if (i > 0 && cima >= esquerda) {
                stack.push({
                    i: i - 1,
                    j: j,
                    lcs: lcs
                });
            }

            if (j > 0 && esquerda >= cima) {
                stack.push({
                    i: i,
                    j: j - 1,
                    lcs: lcs
                });
            }
        }
    }

    return [...resultados];
}

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

function analisarSembacktracking() {
    let helena = pegarDadosEntradaHelena();
    let marcus;

    if (helena != null && helena != undefined) {
        marcus = pegarDadosEntradaMarcus();
    }

    if (marcus != null && marcus != undefined) {
        let resposta = gerenciarEntradas(helena.length, helena, marcus);

        const campoResultado = document.getElementById("resultado");

        // Limpa conteúdo anterior
        campoResultado.innerHTML = "";

        if (resposta.length === 0 || resposta[0] == "") {
            campoResultado.textContent = "Nenhuma substring comum encontrada.";
        } else {
            const lista = document.createElement("ul");

            for (let count = 0; count < resposta.length; count++) {
                if (count === 1000) {
                    alert("O limite de 1000 foi atingido, as respostas acima de 1000 foram ocultadas");
                    break;
                }
                const item = document.createElement("li");
                item.textContent = resposta[count];
                lista.appendChild(item);
            }

            campoResultado.appendChild(lista);
        }

        console.log(resposta);
    }

}