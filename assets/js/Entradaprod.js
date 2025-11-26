// assets/js/Entradaprod.js

// --- 1. SELEÇÃO DE ELEMENTOS DO DOM ---
// Elementos de Cabeçalho e Lista Principal
const entryHeaderForm = document.getElementById('entryHeaderForm');
const entryItemsBody = document.getElementById('entryItemsBody');
const noEntryItemsMessage = document.getElementById('noEntryItems');

// Elementos do Modal
const openModalButton = document.getElementById('openItemModalButton');
const itemModal = document.getElementById('itemModal');
const closeItemModalButton = document.getElementById('closeItemModalButton');
const itemForm = document.getElementById('itemForm');
const modalBarcodeInput = document.getElementById('modalBarcode');
const modalProductNameInput = document.getElementById('modalProductName');
const modalItemsBody = document.getElementById('modalItemsBody'); // Tabela dentro do modal
const modalItemCount = document.getElementById('modalItemCount'); // Contador de itens no modal


// --- 2. ESTRUTURA DE DADOS ---
let entryItems = []; // Array PRINCIPAL (Itens Confirmados e Prontos para Envio)
let currentModalItems = []; // Array TEMPORÁRIO (Itens em Edição/Adição no Modal)

const mockInventory = [
    { code: '7891234567890', name: "Maçã Fuji (Kg)", lastCost: 4.00, unit: "Kg" },
    { code: '7890001112223', name: "Banana Prata (Kg)", lastCost: 1.50, unit: "Kg" },
    { code: '1234567890123', name: "Pêra Williams (Un.)", lastCost: 3.50, unit: "Unidade" },
];


// --- FUNÇÃO PARA BLOQUEAR/DESBLOQUEAR O CABEÇALHO ---

/**
 * Controla o estado dos campos de cabeçalho (Motivo, Nota, Fornecedor, Data).
 * @param {boolean} disableState - true para desabilitar, false para habilitar.
 */
function toggleHeaderFields(disableState) {
    const headerFields = document.querySelectorAll('#entryHeaderForm input, #entryHeaderForm select');
    
    headerFields.forEach(field => {
        field.disabled = disableState;
        
        // Adiciona/Remove uma classe para feedback visual (se existir no CSS)
        if (disableState) {
            field.classList.add('locked-field');
        } else {
            field.classList.remove('locked-field');
        }
    });
}


// --- 3. LÓGICA DO MODAL ---

function openItemModal() {
    // Ao abrir, o array de itens atuais da nota é COPIADO para o modal para edição
    currentModalItems = [...entryItems]; 
    renderModalItemsTable(); // Carrega os itens na mini-tabela
    
    itemModal.classList.add('active'); // Torna o modal visível
    itemForm.reset(); 
    modalProductNameInput.value = ''; 
    modalBarcodeInput.focus();
}

function closeItemModal() {
    // Ao fechar pelo "Cancelar", o array temporário é descartado (e o array principal permanece intacto)
    itemModal.classList.remove('active'); 
}

/**
 * Busca o produto pelo código de barras e preenche o nome e custo no modal.
 */
function searchProductInModal() {
    const code = modalBarcodeInput.value.trim();
    const product = mockInventory.find(p => p.code === code);
    
    if (product) {
        modalProductNameInput.value = product.name;
        document.getElementById('modalUnitCost').value = product.lastCost ? product.lastCost.toFixed(2) : '';
        document.getElementById('modalQuantity').focus();
    } else {
        modalProductNameInput.value = 'Produto não encontrado.';
        document.getElementById('modalUnitCost').value = '';
    }
}


// --- 4. LÓGICA DE ITENS E TABELA ---

/**
 * Adiciona um item à lista TEMPORÁRIA (acionado pelo botão "Salvar Item" no modal).
 */
function addItemToEntry(e) {
    e.preventDefault();
    
    if (modalProductNameInput.value === 'Produto não encontrado.' || modalProductNameInput.value === '') {
        alert("Por favor, informe um Código de Barras válido.");
        return;
    }
    
    const itemData = Object.fromEntries(new FormData(itemForm).entries());
    
    const quantity = parseFloat(itemData.quantity.toString().replace(',', '.'));
    const unitCost = parseFloat(itemData.unitCost.toString().replace(',', '.'));
    
    // Validação de valores
    if (isNaN(quantity) || quantity <= 0 || isNaN(unitCost) || unitCost <= 0) {
        alert("Quantidade e Custo Unitário devem ser valores positivos.");
        return;
    }
    
    // Adiciona ao array TEMPORÁRIO
    currentModalItems.push({
        code: itemData.barcode,
        name: modalProductNameInput.value,
        quantity: quantity,
        unitCost: unitCost,
        totalCost: quantity * unitCost
    });

    renderModalItemsTable(); // Atualiza a mini-tabela no modal
    
    // Limpa o formulário para adicionar o próximo item rapidamente
    itemForm.reset();
    modalProductNameInput.value = '';
    modalBarcodeInput.focus(); 
}

/**
 * Remove um item do array principal (chamado na tabela principal).
 */
function removeItemFromEntry(index) {
    if (confirm("Deseja realmente remover este item da lista de entrada?")) {
        entryItems.splice(index, 1); // Remove o item pelo índice
        
        // Verifica se é o último item para desbloquear o cabeçalho
        if (entryItems.length === 0) {
            toggleHeaderFields(false); // Desbloqueia os campos
        }
        
        renderEntryItemsTable();
    }
}

/**
 * Remove um item do array temporário (chamado dentro do modal).
 */
function removeModalItem(index) {
    if (confirm("Deseja realmente remover este item da lista temporária?")) {
        currentModalItems.splice(index, 1); // Remove o item pelo índice
        renderModalItemsTable();
    }
}


/**
 * Renderiza a mini-tabela DE CONFERÊNCIA DENTRO do modal.
 */
function renderModalItemsTable() {
    modalItemsBody.innerHTML = '';
    
    currentModalItems.forEach((item, index) => {
        const row = modalItemsBody.insertRow();
        
        row.insertCell().textContent = item.name; 
        row.insertCell().textContent = item.quantity;
        row.insertCell().textContent = `R$ ${item.unitCost.toFixed(2).replace('.', ',')}`;
        
        const actionCell = row.insertCell();
        actionCell.innerHTML = `<button class="btn-action btn-delete" data-index="${index}"><span class="material-symbols-sharp">delete</span></button>`;
        actionCell.querySelector('.btn-delete').addEventListener('click', () => removeModalItem(index));
    });

    modalItemCount.textContent = currentModalItems.length;
}


/**
 * Renderiza a lista de itens adicionados na tabela PRINCIPAL.
 */
function renderEntryItemsTable() {
    entryItemsBody.innerHTML = '';
    
    if (entryItems.length === 0) {
        noEntryItemsMessage.style.display = 'block';
        return;
    }
    
    noEntryItemsMessage.style.display = 'none';

    entryItems.forEach((item, index) => {
        const row = entryItemsBody.insertRow();
        
        row.insertCell().textContent = item.code;
        row.insertCell().textContent = item.name;
        row.insertCell().textContent = item.quantity;
        row.insertCell().textContent = `R$ ${item.unitCost.toFixed(2).replace('.', ',')}`;
        row.insertCell().textContent = `R$ ${item.totalCost.toFixed(2).replace('.', ',')}`;
        
        const actionCell = row.insertCell();
        actionCell.innerHTML = `
            <button class="btn-action btn-delete" type="button" data-index="${index}">
                <span class="material-symbols-sharp">delete</span>
            </button>
        `;
        actionCell.querySelector('.btn-delete').addEventListener('click', (e) => {
            const indexToRemove = parseInt(e.currentTarget.dataset.index);
            removeItemFromEntry(indexToRemove);
        });
    });
}


/**
 * Confirma os itens adicionados no modal, atualiza o array principal e fecha.
 */
function confirmAndClose() {
    // 1. O array principal da nota (entryItems) recebe o conteúdo do array temporário.
    entryItems = [...currentModalItems]; 
    
    // 2. Atualiza a tabela da página principal com os itens confirmados.
    renderEntryItemsTable(); 
    
    // 3. NOVO: Bloqueia os campos do cabeçalho se houver itens
    if (entryItems.length > 0) {
        toggleHeaderFields(true); 
    }
    
    // 4. Limpa o estado temporário e fecha
    currentModalItems = []; 
    closeItemModal();
}


// --- 5. LÓGICA FINAL: SUBMISSÃO DA NOTA COMPLETA ---

function handleFinalEntrySubmit(e) {
    e.preventDefault();

    const headerData = Object.fromEntries(new FormData(entryHeaderForm).entries());

    // 1. Validação do Cabeçalho
    if (!headerData.motivoMovimentacaoId || !headerData.numeroNota || !headerData.dataCompra || !headerData.fornecedorId) {
        alert("Por favor, preencha todas as informações de cabeçalho (Motivo, Nota, Data e Fornecedor).");
        return;
    }

    if (entryItems.length === 0) {
        alert("A Nota de Entrada deve ter pelo menos um item. Adicione itens antes de finalizar.");
        return;
    }

    // 2. Estrutura final a ser enviada para a API
    const finalApiData = {
        fornecedorId: headerData.fornecedorId,
        motivoMovimentacaoId: headerData.motivoMovimentacaoId,
        dataCompra: headerData.dataCompra, 
        numeroNota: headerData.numeroNota,
        
        // Mapeia os itens adicionados para o formato que a API espera
        itens: entryItems.map(item => ({
            codigoProduto: item.code,
            quantidade: item.quantity,
            custoUnitario: item.unitCost
        }))
    };

    console.log("NOTA DE ENTRADA FINALIZADA:", finalApiData);
    
    // Simulação de envio bem-sucedido
    alert(`Nota Fiscal ${finalApiData.numeroNota} com ${finalApiData.itens.length} itens registrada com sucesso!`);
    
    // 3. Resetar o estado da tela após o envio
    entryItems = [];
    entryHeaderForm.reset();
    toggleHeaderFields(false); // Desbloqueia o cabeçalho
    renderEntryItemsTable(); 
}


// --- 6. INICIALIZAÇÃO E LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. LISTENERS DO MODAL
    const confirmModalItemsButton = document.getElementById('confirmModalItems');
    const entryDateInput = document.getElementById('entryDate'); 

    openModalButton.addEventListener('click', openItemModal);
    closeItemModalButton.addEventListener('click', closeItemModal); 
    confirmModalItemsButton.addEventListener('click', confirmAndClose); 
    
    // 2. BUSCA E ADIÇÃO DE ITEM
    modalBarcodeInput.addEventListener('change', searchProductInModal);
    itemForm.addEventListener('submit', addItemToEntry);
    
    // 3. FINALIZAR NOTA
    entryHeaderForm.addEventListener('submit', handleFinalEntrySubmit);
    
    // 4. INICIALIZAÇÃO
    renderEntryItemsTable(); 
    entryDateInput.valueAsDate = new Date();
    
    // 5. Garante que os campos estejam desbloqueados no carregamento se o carrinho estiver vazio
    toggleHeaderFields(entryItems.length > 0);
});