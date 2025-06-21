// Linha de entrada com X conjunto de dados
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

  const memo = new Map();

  function backtrack(i, j) {
    const key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key);

    if (i === 0 || j === 0) return new Set([""]);

    const result = new Set();

    if (a[i - 1] === b[j - 1]) {
      for (const s of backtrack(i - 1, j - 1)) {
        result.add(s + a[i - 1]);
      }
    } else {
      if (dp[i - 1][j] >= dp[i][j - 1]) {
        for (const s of backtrack(i - 1, j)) result.add(s);
      }
      if (dp[i][j - 1] >= dp[i - 1][j]) {
        for (const s of backtrack(i, j - 1)) result.add(s);
      }
    }

    memo.set(key, result);
    return result;
  }

  const result = Array.from(backtrack(n, m));
  result.sort();
  return result;
}

function imprimir(input) {
  const lines = input.trim().split('\n');
  let index = 0;
  const D = quant(lines); 
  index++; 
  const results = [];

  for (let d = 0; d < D; d++) {
    const a = lines[index++].trim(); //Helena
    const b = lines[index++].trim(); //Marcos

    const subsequences = matriz(a, b);
    results.push(subsequences.join('\n'));
  }

  return results.join('\n\n');
}


//Exemlo
const input = `2
fsdokfdksfsd
fsdokfdksfsd
fsdd`;

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

