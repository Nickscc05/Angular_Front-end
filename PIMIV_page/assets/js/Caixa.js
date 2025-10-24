document.addEventListener("DOMContentLoaded", () => {
    const hamb = document.querySelector(".hamb");
    const menu = document.querySelector(".menu");
    const overlay = document.querySelector(".overlay");
    const submenus = document.querySelectorAll(".has-submenu");

    // Abre/fecha menu lateral
    hamb.addEventListener("click", () => {
        hamb.classList.toggle("active");
        menu.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    // Fecha menu ao clicar no overlay
    overlay.addEventListener("click", () => {
        hamb.classList.remove("active");
        menu.classList.remove("active");
        overlay.classList.remove("active");
    });

    // Submenus por clique (desktop e mobile)
    submenus.forEach(item => {
        const trigger = item.querySelector(".menu-header");
        trigger.addEventListener("click", (e) => {
            e.preventDefault();

            // Fecha outros submenus abertos
            submenus.forEach(other => {
                if (other !== item) {
                    other.classList.remove("open");
                }
            });

            // Alterna o submenu clicado
            item.classList.toggle("open");
        });
    });

    // Links do submenu funcionam normalmente
    document.querySelectorAll(".submenu a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    });
});
// Aguarda o DOM ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para o Carrossel de Alertas de Estoque ---

    const alertsList = document.querySelector('.alerts-list');
    const scrollUpBtn = document.getElementById('alert-scroll-up');
    const scrollDownBtn = document.getElementById('alert-scroll-down');

    // Verifica se os elementos existem na página antes de continuar
    if (alertsList && scrollUpBtn && scrollDownBtn) {

        const alertItems = alertsList.querySelectorAll('.item');
        const totalItems = alertItems.length;
        const visibleItems = 3; // Quantos itens são visíveis de uma vez

        let itemHeight = 0;
        if (totalItems > 0) {
            // Calcula a altura de um item dinamicamente
            // getBoundingClientRect() inclui padding e borda, mas não margem.
            const itemStyle = window.getComputedStyle(alertItems[0]);
            const itemMarginBottom = parseFloat(itemStyle.marginBottom);
            itemHeight = alertItems[0].getBoundingClientRect().height + itemMarginBottom;
        }

        let currentIndex = 0; // Índice do primeiro item visível

        // Função para atualizar a posição da lista
        function updatePosition() {
            const newY = -currentIndex * itemHeight;
            alertsList.style.transform = `translateY(${newY}px)`;
            updateButtonStates();
        }

        // Função para habilitar/desabilitar os botões
        function updateButtonStates() {
            // Desabilita o botão 'para cima' se já estiver no topo
            scrollUpBtn.disabled = (currentIndex === 0);

            // Desabilita o botão 'para baixo' se os últimos itens já estiverem visíveis
            scrollDownBtn.disabled = (currentIndex >= totalItems - visibleItems);
        }

        // Evento de clique para rolar para baixo
        scrollDownBtn.addEventListener('click', () => {
            if (currentIndex < totalItems - visibleItems) {
                currentIndex++;
                updatePosition();
            }
        });

        // Evento de clique para rolar para cima
        scrollUpBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updatePosition();
            }
        });

        // Inicia o estado dos botões assim que a página carrega
        updateButtonStates();
    }

});

// src/Caixa.js

// 1. Seleção de Elementos do DOM
const movementForm = document.getElementById('movementForm');
const closingForm = document.getElementById('closingForm');
const movementTableBody = document.getElementById('movementTableBody');
const countedAmountInput = document.getElementById('countedAmount');

// Elementos de Resumo
const saldoInicialElement = document.getElementById('saldoInicial');
const vendasDinheiroElement = document.getElementById('vendasDinheiro');
const totalSaidasElement = document.getElementById('totalSangrias'); // ID do HTML ainda é 'totalSangrias'
const saldoEsperadoElement = document.getElementById('saldoEsperado');
const differenceAmountElement = document.getElementById('differenceAmount');

// 2. Dados e Variáveis de Controle (MOCK DATA)
// Estes valores viriam do seu Backend em um sistema real
let currentBalance = 100.00; // Saldo inicial (Troco)
let salesInCash = 500.00;    // Total de vendas em dinheiro
let movements = [
    // MUDANÇA AQUI: 'saída'
    { type: 'saída', value: 50.00, obs: 'Retirada de troco', time: new Date().toLocaleTimeString('pt-BR') },
];

// --- 3. FUNÇÕES DE CÁLCULO E RENDERIZAÇÃO ---

/**
 * Calcula o saldo esperado do caixa (Sistema).
 */
function calculateExpectedBalance() {
    let totalSaidas = 0; // MUDANÇA AQUI: Variável interna renomeada
    let totalSuprimentos = 0;

    // Calcula totais de movimentação
    for (const move of movements) {
        if (move.type === 'saída') { // MUDANÇA AQUI
            totalSaidas += move.value;
        } else if (move.type === 'suprimento') {
            totalSuprimentos += move.value;
        }
    }

    // Saldo Esperado = Inicial + Vendas em Dinheiro + Suprimentos - Saídas
    const expected = currentBalance + salesInCash + totalSuprimentos - totalSaidas;

    // Atualiza o DOM (Usando o valor de totalSaidas)
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
        // MUDANÇA AQUI: Exibição 'Saída'
        typeCell.textContent = move.type === 'suprimento' ? 'Suprimento' : 'Saída';

        // MUDANÇA AQUI: Adiciona a classe status-saída
        typeCell.classList.add(`status-${move.type}`);

        row.insertCell().textContent = `R$ ${move.value.toFixed(2).replace('.', ',')}`;
        row.insertCell().textContent = move.obs;
    });

    calculateExpectedBalance();
}

/**
 * Adiciona uma Saída ou Suprimento ao histórico.
 */
function handleMovement(e) {
    e.preventDefault();

    const buttonId = e.submitter.id;
    // MUDANÇA AQUI: 'saída'
    const type = buttonId.includes('Suprimento') ? 'suprimento' : 'saída';

    const valueInput = document.getElementById('moveValue');
    const obsInput = document.getElementById('moveObs');

    const value = parseFloat(valueInput.value);
    // MUDANÇA AQUI: 'saída'
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