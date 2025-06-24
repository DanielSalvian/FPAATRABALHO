/*=============================================================================
  Arquivo: resolucaoDinamica.js
  Descrição: Aplica programação dinâmica para encontrar
             todas as subsequências comuns mais longas (LCS) entre pares de
             strings inseridas pelo usuário.
  Autor: Yago
  Data: Junho de 2025
  Linguagem: JavaScript
  Observações:
    - Utiliza abordagem dinamica para cálculo  da LCS.
=============================================================================*/

//gerencia as entradas para preparalas para o processo
function gerenciarEntradas(tamanhoEntrada, helena, marcus) {
    let resposta = [];

    for (let i = 0; i < tamanhoEntrada; i++) {
          let sequencias = avaliarMatriz(helena[i], marcus[i]);
          let arraySequencias = Array.from(sequencias).filter(s => s !== '').sort();
          resposta.push(...arraySequencias);
          resposta.push("#");
    }
    return resposta;
}

//monta/avalia a matriz enquanto isso já vai formando a substrings
function avaliarMatriz(stringX, stringY) {
    const tamX = stringX.length;
    const tamY = stringY.length;

    const dpLen = Array.from({ length: tamX + 1 }, () => new Uint16Array(tamY + 1));
    const dpSeq = Array.from({ length: tamX + 1 }, () =>
        Array.from({ length: tamY + 1 }, () => new Set(['']))
    );

    for (let i = 1; i <= tamX; i++) {
        for (let j = 1; j <= tamY; j++) {
            if (stringX[i - 1] === stringY[j - 1]) {
                dpLen[i][j] = dpLen[i - 1][j - 1] + 1;
                dpSeq[i][j] = new Set();
                for (const seq of dpSeq[i - 1][j - 1]) {
                    dpSeq[i][j].add(seq + stringX[i - 1]);
                }
            } else {
                if (dpLen[i - 1][j] > dpLen[i][j - 1]) {
                    dpLen[i][j] = dpLen[i - 1][j];
                    dpSeq[i][j] = new Set(dpSeq[i - 1][j]);
                } else if (dpLen[i - 1][j] < dpLen[i][j - 1]) {
                    dpLen[i][j] = dpLen[i][j - 1];
                    dpSeq[i][j] = new Set(dpSeq[i][j - 1]);
                } else {
                    dpLen[i][j] = dpLen[i - 1][j];
                    dpSeq[i][j] = new Set([
                        ...dpSeq[i - 1][j],
                        ...dpSeq[i][j - 1]
                    ]);
                }
            }
        }
    }

    return dpSeq[tamX][tamY]; // <- Retorna só o conjunto final
}

//controla todo o processo
function analisarSembacktracking() {
    let helena = pegarDadosEntradaHelena();//prenche com todos os dados da "helena"
    let marcus;

    if (helena != null && helena != undefined) {
        marcus = pegarDadosEntradaMarcus();//prenche com todos os dados do "marcus"
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
                if (resposta[count] != "#") {
                    if (count >= 1000) {//avalia se atende ao limite das 1000 substrings de resposta
                        alert("O limite de 1000 foi atingido, as respostas acima de 1000 foram ocultadas");
                        break;
                    }
                    const item = document.createElement("li");
                    item.textContent = resposta[count];
                    lista.appendChild(item);
                }
                else {// atendendo ao requisito do espaço
                    const br = document.createElement('br');
                    lista.appendChild(br);
                }

            }

            campoResultado.appendChild(lista);

        }

    }

}