document.addEventListener("DOMContentLoaded", () => {
  const hamb = document.querySelector(".hamb");
  const menu = document.querySelector(".menu");
  const overlay = document.querySelector(".overlay");
  const submenus = document.querySelectorAll(".has-submenu");

  // Abre/fecha menu lateral
  hamb.addEventListener("click", () => {
    hamb.classList.toggle("active");
    menu.classList.toggle("active");
    overlay.classList.toggle("active"); // exibe overlay
  });

  // Fecha menu ao clicar no overlay
  overlay.addEventListener("click", () => {
    hamb.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Submenus no desktop
  submenus.forEach(item => {
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        item.classList.add("open");
      }
    });
    item.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        item.classList.remove("open");
      }
    });
  });

  // Submenus no mobile (click)
  submenus.forEach(item => {
    item.querySelector(".link_nav").addEventListener("click", e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle("open");
      }
    });
  });

  // ✅ Permite que os links do submenu funcionem normalmente
  document.querySelectorAll(".submenu a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.stopPropagation(); // não fecha o menu por engano
    });
  });
});
// src/Novavenda.js

// 1. Seleção de Elementos do DOM
const productForm = document.getElementById('productForm');
const saleItemsBody = document.getElementById('saleItemsBody');
const subtotalValueElement = document.getElementById('subtotalValue');
const totalFinalValueElement = document.getElementById('totalFinalValue');
const emptyCartMessage = document.getElementById('emptyCart');

// Array que armazena os itens da venda (o carrinho)
let cartItems = []; 
const DISCOUNT = 0.00; // Desconto fixo por enquanto (0%)

// Dados Mock de Produtos (para simular a busca)
const mockProducts = [
    { id: 101, code: '789111', name: "Banana Prata (Kg)", price: 3.50 },
    { id: 102, code: '789222', name: "Alface Crespa (Un)", price: 2.00 },
    { id: 103, code: '789333', name: "Tomate Italiano (Kg)", price: 5.99 },
];

// --- 2. FUNÇÕES DE CÁLCULO E RENDERIZAÇÃO ---

/**
 * Calcula o subtotal e o total final da venda.
 */
function calculateTotals() {
    // 1. Calcular Subtotal
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // 2. Aplicar Desconto
    const discountAmount = subtotal * DISCOUNT;
    
    // 3. Calcular Total Final
    const totalFinal = subtotal - discountAmount;
    
    // 4. Atualizar o DOM
    subtotalValueElement.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    // Aqui assumimos que você tem um elemento para o desconto se DISCOUNT for > 0
    document.getElementById('discountValue').textContent = `R$ ${discountAmount.toFixed(2).replace('.', ',')}`;
    totalFinalValueElement.textContent = `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;

    // 5. Exibir/Esconder mensagem de carrinho vazio
    emptyCartMessage.style.display = cartItems.length === 0 ? 'block' : 'none';
}


/**
 * Adiciona uma linha (item) na tabela do PDV.
 */
function renderCartItems() {
    saleItemsBody.innerHTML = ''; // Limpa a tabela
    
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
        
        // Adiciona o listener para remover
        removeCell.querySelector('.remove-item').addEventListener('click', () => removeItem(index));
    });

    calculateTotals();
}

// --- 3. FUNÇÕES DE AÇÃO DO USUÁRIO ---

/**
 * Lida com o clique no botão Adicionar.
 */
function handleAddItem(e) {
    e.preventDefault();
    
    const code = document.getElementById('productCode').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);

    if (!code || quantity <= 0) {
        alert("Preencha o código/nome e a quantidade corretamente.");
        return;
    }

    // 1. Simular Busca do Produto (com base no código/nome)
    const foundProduct = mockProducts.find(p => 
        p.code === code || p.name.toLowerCase().includes(code.toLowerCase())
    );

    if (!foundProduct) {
        alert(`Produto com código/nome "${code}" não encontrado.`);
        return;
    }

    // 2. Verificar se o item já existe no carrinho
    const existingItemIndex = cartItems.findIndex(item => item.id === foundProduct.id);

    if (existingItemIndex > -1) {
        // Se existir, apenas atualiza a quantidade
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        // Se não existir, adiciona como um novo item
        cartItems.push({
            id: foundProduct.id,
            code: foundProduct.code,
            name: foundProduct.name,
            price: foundProduct.price,
            quantity: quantity
        });
    }

    // 3. Renderiza e Limpa
    renderCartItems();
    document.getElementById('productCode').value = '';
    document.getElementById('quantity').value = '1';
    document.getElementById('productCode').focus(); // Foca no campo para adicionar rápido
}

/**
 * Remove um item do carrinho pelo seu índice.
 */
function removeItem(index) {
    if (confirm("Deseja realmente remover este item da venda?")) {
        cartItems.splice(index, 1); // Remove 1 item no índice especificado
        renderCartItems();
    }
}

// --- 4. INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    productForm.addEventListener('submit', handleAddItem);
    
    // Inicializa os totais (R$ 0,00)
    calculateTotals();
});