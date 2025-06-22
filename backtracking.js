// Linha de entrada pra vetores com X dados
function quant(lines) {
  return parseInt(lines[0], 10);
}

function matriz(a, b) {
  const n = a.length;
  const m = b.length;

  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (a[i] === b[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }
 //Tava uma função não funcional de backtracking q testei da internet, que a matriz com os valores tá montado
  return dp.map(row => row.join(' '));
}

function imprimir(input) {
  const lines = input.trim().split('\n');
  let index = 0;
  const D = quant(lines);
  index++;
  const results = [];

  for (let d = 0; d < D; d++) {
    const a = lines[index++].trim(); // Helena
    const b = lines[index++].trim(); // Marcos

    const matrizFormatada = matriz(a, b);
    results.push(matrizFormatada.join('\n'));
  }

  return results.join('\n\n');
}

// Exemplo de teste direto:
const input = `1
abcbdab
bdcaba`;
console.log(imprimir(input));

function executar() {
  const input = document.getElementById('inputText').value.trim();
  const lines = input.split('\n').map(line => line.trim());
  const D = parseInt(lines[0], 10);

  const output = document.getElementById('output');

  // Valida D
  if (isNaN(D) || D < 1 || D > 10) {
    output.textContent = 'Erro: o número de conjuntos D deve estar entre 1 e 10.';
    return;
  }

  // Espera 2 linhas por conjunto após a primeira
  if (lines.length !== 1 + D * 2) {
    output.textContent = `Erro: esperadas ${D * 2} linhas após a primeira, mas foram fornecidas ${lines.length - 1}.`;
    return;
  }

  // Valida cada sequência
  for (let i = 1; i < lines.length; i++) {
    const linha = lines[i];
    if (!/^[a-z]{1,80}$/.test(linha)) {
      output.textContent = `Erro: a linha ${i + 1} deve conter apenas letras minúsculas e ter entre 1 e 80 caracteres.`;
      return;
    }
  }

  // Tudo certo, processa
  const resultado = imprimir(input);
  output.textContent = resultado;
}

