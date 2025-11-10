// assets/js/Novavenda.js

// 1. Seleção de Elementos Principais
const productForm = document.getElementById('productForm');
const saleItemsBody = document.getElementById('saleItemsBody');
const subtotalValueElement = document.getElementById('subtotalValue');
const totalFinalValueElement = document.getElementById('totalFinalValue');
const emptyCartMessage = document.getElementById('emptyCart');
const cancelButton = document.querySelector('.cancel-button');

// 2. Seleção de Elementos do Modal de Pagamento
const openModalButton = document.getElementById('openPaymentModal');
const paymentModal = document.getElementById('paymentModal');
const closeModalButton = document.getElementById('closePaymentModal');
const paymentOptionButtons = document.querySelectorAll('.payment-option-btn');

// Array que armazena os itens da venda (o carrinho)
let cartItems = []; 
const DISCOUNT = 0.00; // Desconto fixo por enquanto (0%)

// Dados Mock de Produtos (para simular a busca)
const mockProducts = [
    { id: 101, code: '789111', name: "Banana Prata (Kg)", price: 3.50 },
    { id: 102, code: '789222', name: "Alface Crespa (Un)", price: 2.00 },
    { id: 103, code: '789333', name: "Tomate Italiano (Kg)", price: 5.99 },
];


// --- FUNÇÕES DE CÁLCULO E RENDERIZAÇÃO ---

/**
 * Calcula o subtotal e o total final da venda.
 */
function calculateTotals() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = subtotal * DISCOUNT;
    const totalFinal = subtotal - discountAmount;
    
    // Atualiza o DOM
    subtotalValueElement.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('discountValue').textContent = `R$ ${discountAmount.toFixed(2).replace('.', ',')}`;
    totalFinalValueElement.textContent = `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;

    // Exibir/Esconder mensagem de carrinho vazio
    emptyCartMessage.style.display = cartItems.length === 0 ? 'block' : 'none';

    // Desabilita o botão de Finalizar se o carrinho estiver vazio
    openModalButton.disabled = cartItems.length === 0;
}


/**
 * Renderiza a lista de itens da venda na tabela.
 */
function renderCartItems() {
    saleItemsBody.innerHTML = ''; 
    
    cartItems.forEach((item, index) => {
        const totalItem = item.price * item.quantity;
        const row = saleItemsBody.insertRow();
        
        row.insertCell().textContent = item.code;
        row.insertCell().textContent = item.name;
        row.insertCell().textContent = item.quantity;
        row.insertCell().textContent = `R$ ${item.price.toFixed(2).replace('.', ',')}`;
        row.insertCell().textContent = `R$ ${totalItem.toFixed(2).replace('.', ',')}`;
        
        // Célula de Ação (Remover)
        const removeCell = row.insertCell();
        removeCell.innerHTML = `
            <button class="btn-action btn-delete remove-item" data-index="${index}" title="Remover">
                <span class="material-symbols-sharp">delete</span>
            </button>
        `;
        
        removeCell.querySelector('.remove-item').addEventListener('click', () => removeItem(index));
    });

    calculateTotals();
}


// --- FUNÇÕES DE AÇÃO DO USUÁRIO (PDV) ---

/**
 * Lida com o clique no botão Adicionar Produto.
 */
function handleAddItem(e) {
    e.preventDefault(); 

    const code = document.getElementById('productCode').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);

    if (!code || quantity <= 0) {
        alert("Preencha o código e a quantidade corretamente.");
        return;
    }

    const foundProduct = mockProducts.find(p => 
        p.code === code || p.name.toLowerCase().includes(code.toLowerCase())
    );

    if (!foundProduct) {
        alert(`Produto com código/nome "${code}" não encontrado.`);
        return;
    }

    // Verifica se o item já existe
    const existingItemIndex = cartItems.findIndex(item => item.id === foundProduct.id);

    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        cartItems.push({
            id: foundProduct.id,
            code: foundProduct.code,
            name: foundProduct.name,
            price: foundProduct.price,
            quantity: quantity
        });
    }

    // Renderiza e Limpa
    renderCartItems();
    document.getElementById('productCode').value = '';
    document.getElementById('quantity').value = '1';
    document.getElementById('productCode').focus(); 
}

/**
 * Remove um item do carrinho.
 */
function removeItem(index) {
    if (confirm("Realmente deseja remover este item da venda?")) {
        cartItems.splice(index, 1);
        renderCartItems();
    }
}


// --- FUNÇÕES DO MODAL DE PAGAMENTO ---

function openPaymentModal() {
    if (cartItems.length > 0) {
        paymentModal.classList.add('active');
    }
}

function closePaymentModal() {
    paymentModal.classList.remove('active');
}

function handlePaymentSelection(e) {
    const paymentMethod = e.currentTarget.getAttribute('data-method');
    
    const total = document.getElementById('totalFinalValue').textContent;
    
    // LÓGICA DE FINALIZAÇÃO (Aqui você faria a chamada à API)
    console.log(`Método Selecionado: ${paymentMethod}. Valor: ${total}`);
    
    alert(`Pagamento de ${total} processado via ${paymentMethod.toUpperCase()}! Venda Finalizada.`);
    
    // Fechar o modal e limpar o carrinho (simulação)
    closePaymentModal();
    cartItems = []; // Limpa o carrinho
    renderCartItems(); // Atualiza a tabela
}


// --- INICIALIZAÇÃO E LISTENERS GLOBAIS ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Listeners do PDV
    productForm.addEventListener('submit', handleAddItem);
    
    // Listeners do Modal
    openModalButton.addEventListener('click', openPaymentModal);
    closeModalButton.addEventListener('click', closePaymentModal);

    paymentOptionButtons.forEach(button => {
        button.addEventListener('click', handlePaymentSelection);
    });
    // Liga a função de cancelamento ao botão
cancelButton.addEventListener('click', cancelSale);

    // Carrega a tabela (vazia) e calcula os totais iniciais
    calculateTotals();
});
/**
 * Cancela a venda atual, limpando o carrinho e redefinindo a interface.
 */
function cancelSale() {
    if (cartItems.length > 0 && !confirm("Atenção! Caso cancele a venda os itens serão excluidos. Deseja realmente Cancelar esta venda?")) {
        // Se houver itens e o usuário clicar em 'Não', interrompe o cancelamento.
        return;
    }
    
    // 1. Limpar o carrinho
    cartItems = [];
    
    // 2. Atualizar a interface
    renderCartItems(); 
    
    // 3. Notificar (opcional, mas útil)
    console.log("Venda cancelada pelo usuário.");
    alert("Venda Cancelada com Sucesso.");

    // 4. Focar no campo de código para iniciar a próxima venda
    document.getElementById('productCode').focus(); 
}