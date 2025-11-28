function calcularImpacto() {
    const input = document.getElementById('qtd-arvores');
    let qtd = parseInt(input.value);

    if (!qtd || qtd < 1) qtd = 0;

    const fatorCO2 = 15;
    const fatorArea = 1.5;
    const fatorPreco = 9.90;

    const totalCO2 = qtd * fatorCO2;
    const totalArea = qtd * fatorArea;
    const totalPreco = qtd * fatorPreco;

    document.getElementById('res-co2').innerText = totalCO2;
    document.getElementById('res-area').innerText = totalArea.toFixed(1).replace('.', ',');
    document.getElementById('res-custo').innerText = totalPreco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
window.onload = calcularImpacto;