// assets/js/Caixa.js

// 1. Seleção de Elementos do DOM
const movementForm = document.getElementById('movementForm');
const closingForm = document.getElementById('closingForm');
const movementTableBody = document.getElementById('movementTableBody');
const countedAmountInput = document.getElementById('countedAmount');

// Elementos de Resumo
const saldoInicialElement = document.getElementById('saldoInicial');
const vendasDinheiroElement = document.getElementById('vendasDinheiro');
const totalSaidasElement = document.getElementById('totalsaida'); // Usando o ID do HTML
const saldoEsperadoElement = document.getElementById('saldoEsperado');
const differenceAmountElement = document.getElementById('differenceAmount');

// 2. Dados e Variáveis de Controle (MOCK DATA)
let currentBalance = 100.00; // Saldo inicial (Troco)
let salesInCash = 500.00;    // Total de vendas em dinheiro
let movements = [
    // Movimentação inicial de exemplo
    { type: 'saída', value: 50.00, obs: 'Retirada de troco', time: new Date().toLocaleTimeString('pt-BR') },
];

// --- 3. FUNÇÕES DE CÁLCULO E RENDERIZAÇÃO ---

/**
 * Calcula o saldo esperado do caixa (Sistema).
 */
function calculateExpectedBalance() {
    let totalSaidas = 0;
    let totalSuprimentos = 0;

    // 1. Calcula totais de movimentação
    for (const move of movements) {
        if (move.type === 'saída') {
            totalSaidas += move.value;
        } else if (move.type === 'suprimento') {
            totalSuprimentos += move.value;
        }
    }

    // 2. FÓRMULA CORRETA: Saldo Inicial + Vendas + Suprimentos - Saídas
    const expected = currentBalance + salesInCash + totalSuprimentos - totalSaidas;

    // 3. Atualiza o DOM
    totalSaidasElement.textContent = `- R$ ${totalSaidas.toFixed(2).replace('.', ',')}`;
    totalSaidasElement.classList.toggle('red', totalSaidas > 0);
    saldoEsperadoElement.textContent = `R$ ${expected.toFixed(2).replace('.', ',')}`;

    return expected;
}

/**
 * Renderiza o histórico de movimentações na tabela.
 */
function renderMovementHistory() {
    movementTableBody.innerHTML = ''; // Limpa a tabela

    // Renderiza cada movimentação
    movements.forEach(move => {
        const row = movementTableBody.insertRow();

        row.insertCell().textContent = move.time.substring(0, 5); // Apenas Hora:Minuto

        const typeCell = row.insertCell();
        typeCell.textContent = move.type === 'suprimento' ? 'Suprimento' : 'Saída';

        // Adiciona a classe CSS para a cor (status-saída ou status-suprimento)
        typeCell.classList.add(`status-${move.type}`); 

        row.insertCell().textContent = `R$ ${move.value.toFixed(2).replace('.', ',')}`;
        row.insertCell().textContent = move.obs;
    });

    calculateExpectedBalance(); // Recalcula o saldo após a renderização
}

/**
 * Calcula e exibe a diferença entre o esperado e o contado.
 */
function calculateDifference() {
    const expected = calculateExpectedBalance();
    // Usa 0 se o campo estiver vazio
    // O .replace(',', '.') é essencial se o usuário digitar vírgula como separador decimal
    const counted = parseFloat(countedAmountInput.value.replace(',', '.')) || 0; 
    const difference = counted - expected;

    const formattedDiff = `R$ ${Math.abs(difference).toFixed(2).replace('.', ',')}`;
    differenceAmountElement.textContent = difference >= 0 ? formattedDiff : `- ${formattedDiff}`;

    // Estiliza a diferença
    differenceAmountInput.classList.remove('red', 'green');
    if (difference !== 0) {
        differenceAmountElement.classList.add(difference < 0 ? 'red' : 'green'); 
    }
}

// --- 4. FUNÇÕES DE AÇÃO DO USUÁRIO ---

/**
 * Adiciona uma Saída ou Suprimento ao histórico.
 */
function handleMovement(e) {
    e.preventDefault();

    // Pega o tipo de movimentação a partir do atributo data-type do botão clicado
    const type = e.submitter.getAttribute('data-type');
    
    const valueInput = document.getElementById('moveValue');
    const obsInput = document.getElementById('moveObs');

    // Remove vírgula para garantir que o parseFloat funcione
    const value = parseFloat(valueInput.value.replace(',', '.')); 
    const obs = obsInput.value.trim() || (type === 'saída' ? 'Retirada padrão' : 'Adição de troco');

    if (isNaN(value) || value <= 0) {
        alert("O valor da movimentação deve ser maior que zero.");
        return;
    }

    // 1. Adiciona a movimentação
    movements.push({
        type: type,
        value: value,
        obs: obs,
        time: new Date().toLocaleTimeString('pt-BR')
    });

    // 2. Atualiza a interface
    renderMovementHistory();

    // 3. Limpa o formulário
    valueInput.value = '';
    obsInput.value = '';
    valueInput.focus();
}

/**
 * Finaliza o fechamento de caixa.
 */
function handleClosing(e) {
    e.preventDefault();

    const counted = parseFloat(countedAmountInput.value);
    const expected = calculateExpectedBalance();
    const difference = counted - expected;

    if (difference !== 0 && !confirm(`A diferença de caixa é de R$ ${difference.toFixed(2).replace('.', ',')}. Deseja fechar assim mesmo?`)) {
        return;
    }

    alert(`Fechamento de caixa concluído! Saldo Final: R$ ${counted.toFixed(2).replace('.', ',')}`);
    // AQUI VOCÊ ENVIARIA OS DADOS DO FECHAMENTO PARA O BACKEND
}


// --- 5. INICIALIZAÇÃO E LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa o Resumo Estático
    saldoInicialElement.textContent = `R$ ${currentBalance.toFixed(2).replace('.', ',')}`;
    vendasDinheiroElement.textContent = `R$ ${salesInCash.toFixed(2).replace('.', ',')}`;

    // 2. Adiciona Listeners
    movementForm.addEventListener('submit', handleMovement);
    closingForm.addEventListener('submit', handleClosing);

    // Listener para calcular a diferença ao digitar
    countedAmountInput.addEventListener('input', calculateDifference);

    // 3. Renderiza o histórico inicial
    renderMovementHistory();
});

