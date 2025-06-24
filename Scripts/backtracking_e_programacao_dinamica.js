// Constroi a tabela DP com tamanhos das LCS de prefixos
function construirTabelaDp(sequencia1, sequencia2) {
  const n = sequencia1.length;
  const m = sequencia2.length;
  const dp = Array.from(
    { length: n + 1 },
    () => new Uint16Array(m + 1)
  );

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      // se caracteres iguais, incrementa a partir da diagonal
      if (sequencia1[i - 1] === sequencia2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // caso contrário, pega o maior entre cima e esquerda
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp;
}

// Backtracking memoizado para coletar todas as LCS de tamanho máximo
function coletarTodasLCS(sequencia1, sequencia2, dp) {
  const n = sequencia1.length;
  const m = sequencia2.length;
  const cache = new Map();

  function retroceder(i, j) {
    const key = `${i},${j}`;
    if (cache.has(key)) return cache.get(key);

    const resultados = new Set();

    if (i === 0 || j === 0) {
      // base: sequência vazia
      resultados.add('');
    } else if (sequencia1[i - 1] === sequencia2[j - 1]) {
      // caractere faz parte de todas as LCS
      for (const seq of retroceder(i - 1, j - 1)) {
        resultados.add(seq + sequencia1[i - 1]);
      }
    } else {
      // segue caminhos que mantêm o tamanho máximo
      if (dp[i - 1][j] >= dp[i][j - 1]) {
        for (const seq of retroceder(i - 1, j)) resultados.add(seq);
      }
      if (dp[i][j - 1] >= dp[i - 1][j]) {
        for (const seq of retroceder(i, j - 1)) resultados.add(seq);
      }
    }

    cache.set(key, resultados);
    return resultados;
  }

  // coleta LCS no estado final e filtra strings vazias
  return Array.from(retroceder(n, m))
    .filter(s => s.length > 0)
    .sort();
}

// Função principal: lê input, processa casos e imprime resultados
function main(lines) {
  const D = parseInt(lines[0], 10);
  let ptr = 1;
  const output = [];

  for (let t = 0; t < D; t++) {
    const s1 = lines[ptr++].trim();
    const s2 = lines[ptr++].trim();

    // constrói tabela DP
    const dp = construirTabelaDp(s1, s2);
    // coleta todas as LCS
    const lcsList = coletarTodasLCS(s1, s2, dp);

    // adiciona cada subsequência à saída
    for (const lcs of lcsList) output.push(lcs);
    // separa casos com linha em branco
    if (t < D - 1) output.push('');
  }

  exibirResultadoNaTela(output.join('\n'));
}

function exibirResultadoNaTela(texto) {
  const saida = document.getElementById('resultado');
    saida.innerHTML = ""; // limpa conteúdo anterior

    const lista = document.createElement("ul");
    const linhas = texto.split('\n');

    for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i].trim();

        if (linha === "") {
            const br = document.createElement("br");
            lista.appendChild(br);
        } else {
            const item = document.createElement("li");
            item.textContent = linha;
            lista.appendChild(item);
        }

        if (i >= 1000) {
            alert("O limite de 1000 foi atingido, as respostas acima de 1000 foram ocultadas");
            break;
        }
    }

    saida.appendChild(lista);
}
