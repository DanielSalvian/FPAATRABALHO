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

        const campoB = document.createElement('input');
        campoB.type = 'text';
        campoB.placeholder = `Marcus ${i}`;
        campoB.name = `Marcus_${i}`;
        campoB.id = `Marcus_${i}`;

        const br = document.createElement('br');

        container.appendChild(numLinha);
        container.appendChild(campoA);
        container.appendChild(campoB);
        container.appendChild(br);
    }
}
