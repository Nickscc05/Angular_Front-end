// assets/js/Entradaprod.js

// 1. Seleção de Elementos do DOM
const productEntryForm = document.getElementById('productEntryForm');
const barcodeInput = document.getElementById('barcode');
const productNameInput = document.getElementById('productName');
const quantityInput = document.getElementById('quantity');
const unitCostInput = document.getElementById('unitCost'); // Novo seletor
const entryDateInput = document.getElementById('entryDate'); 

// Tabela e Resumo
const entryItemsBody = document.getElementById('entryItemsBody');
const noEntryItemsMessage = document.getElementById('noEntryItems');
const finalRegisterButton = document.getElementById('finalRegisterButton'); // Se você tiver um botão de registro final fora do form

// Array para armazenar os itens da entrada (o "carrinho" da entrada)
let entryItems = [];

// Dados Mock de Produtos no Estoque
const mockInventory = [
    { code: '7891234567890', name: "Banana Prata (Kg)", unit: "Kg", currentStock: 50 },
    { code: '7890001112223', name: "Maçã Fuji (Kg)", unit: "Kg", currentStock: 120 },
];


// --- FUNÇÕES DE CÁLCULO E RENDERIZAÇÃO ---

/**
 * Renderiza a lista de itens na tabela de entrada.
 */
function renderEntryItemsTable() {
    entryItemsBody.innerHTML = ''; // Limpa a tabela
    
    if (entryItems.length === 0) {
        noEntryItemsMessage.style.display = 'block';
        return;
    }

    noEntryItemsMessage.style.display = 'none';

    entryItems.forEach((item, index) => {
        const totalItemCost = item.quantity * item.unitCost;
        const row = entryItemsBody.insertRow();
        
        row.insertCell().textContent = item.code;
        row.insertCell().textContent = item.productName;
        row.insertCell().textContent = item.quantity;
        row.insertCell().textContent = `R$ ${item.unitCost.toFixed(2).replace('.', ',')}`;
        row.insertCell().textContent = `R$ ${totalItemCost.toFixed(2).replace('.', ',')}`;
        
        // Célula de Ação (Remover)
        const actionsCell = row.insertCell();
        actionsCell.innerHTML = `
            <button class="btn-action btn-delete remove-entry-item" data-index="${index}" title="Remover">
                <span class="material-symbols-sharp">delete</span>
            </button>
        `;
        
        // Adiciona o listener para remover
        actionsCell.querySelector('.remove-entry-item').addEventListener('click', () => removeEntryItem(index));
    });
    
    // Calcula o custo total da entrada (se necessário)
    calculateTotalCost();
}

/**
 * Remove um item do array de entrada.
 */
function removeEntryItem(index) {
    if (confirm("Deseja realmente remover este item da lista de entrada?")) {
        entryItems.splice(index, 1);
        renderEntryItemsTable();
    }
}

/**
 * Calcula o custo total de toda a nota de entrada (soma de todos os itens).
 */
function calculateTotalCost() {
    const totalCost = entryItems.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);
    console.log(`Custo Total da Nota: R$ ${totalCost.toFixed(2)}`);
    // Aqui você pode atualizar um campo de "Custo Total da Nota" no HTML se ele existir
}


// --- 4. FUNÇÃO DE REGISTRO DE ITEM (ITEM POR ITEM) ---

/**
 * Lida com o registro de UM item na nota de entrada.
 */
function handleAddItemToEntry(e) {
    e.preventDefault();

    const code = barcodeInput.value.trim();
    const productName = productNameInput.value.trim();
    const quantity = parseFloat(quantityInput.value.replace(',', '.'));
    const unitCost = parseFloat(unitCostInput.value.replace(',', '.'));

    if (productName === 'Produto não encontrado.' || !code) {
        alert("Por favor, insira um Código de Barras válido e busque o produto.");
        barcodeInput.focus();
        return;
    }
    if (isNaN(quantity) || quantity <= 0 || isNaN(unitCost) || unitCost <= 0) {
        alert("Quantidade e Custo Unitário devem ser valores positivos.");
        return;
    }

    // 1. Adiciona o item ao array de entrada
    entryItems.push({
        code: code,
        productName: productName,
        quantity: quantity,
        unitCost: unitCost
    });

    // 2. Atualiza a interface
    renderEntryItemsTable();

    // 3. Limpa apenas os campos de produto/quantidade/custo para adicionar o próximo
    barcodeInput.value = '';
    productNameInput.value = '';
    quantityInput.value = '1';
    unitCostInput.value = '';
    barcodeInput.focus(); // Pronto para o próximo item
}


// --- 5. FUNÇÃO FINAL: REGISTRAR A NOTA INTEIRA ---

/**
 * Lida com o envio final de TODA a nota (enviado ao backend).
 * (Esta função seria chamada por um botão "Finalizar Nota de Entrada")
 */
function handleFinalEntrySubmit(e) {
    e.preventDefault();

    if (entryItems.length === 0) {
        alert("Adicione pelo menos um item à nota de entrada antes de finalizar.");
        return;
    }

    // Coletar dados globais do formulário (Fornecedor, Nota, Data, Motivo)
    const formData = new FormData(productEntryForm);
    const globalEntryData = Object.fromEntries(formData.entries());
    
    // Objeto final que seria enviado à API (inclui itens e dados globais)
    const finalApiData = {
        ...globalEntryData, // Fornecedor, Data, Número da Nota, etc.
        items: entryItems,  // O array de produtos
        totalCost: calculateTotalCost() // Calcula o custo total final
    };

    console.log("DADOS PRONTOS PARA A API:", finalApiData);
    alert(`Nota de Entrada com ${entryItems.length} itens FINALIZADA com sucesso!`);
    
    // Resetar tudo após sucesso
    entryItems = [];
    renderEntryItemsTable();
    productEntryForm.reset();
    document.getElementById('entryDate').valueAsDate = new Date();
    barcodeInput.focus();
}


// --- 6. BUSCA E INICIALIZAÇÃO ---

/**
 * Simula a busca do produto no estoque pelo código de barras e preenche o nome.
 */
function searchProductByBarcode() {
    const code = barcodeInput.value.trim();
    const product = mockInventory.find(p => p.code === code);

    if (product) {
        productNameInput.value = product.name;
        // Opcional: Pré-preencher o custo unitário com o último custo conhecido (se existisse no mock)
        // unitCostInput.value = product.lastCost.toFixed(2);
        quantityInput.focus();
    } else {
        productNameInput.value = 'Produto não encontrado.';
    }
}


// --- 7. INICIALIZAÇÃO E LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    
    // LIGA A FUNÇÃO DE ADICIONAR ITEM AO BOTÃO DE SUBMISSÃO DO FORMULÁRIO
    productEntryForm.addEventListener('submit', handleAddItemToEntry);
    
    // Liga a função de busca ao evento 'change' (ideal para scanners)
    barcodeInput.addEventListener('change', searchProductByBarcode); 
    
    // Inicializa
    document.getElementById('entryDate').valueAsDate = new Date();
    renderEntryItemsTable(); 
});