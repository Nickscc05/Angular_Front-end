
const searchSalesForm = document.getElementById('searchSalesForm');
const clearSalesFiltersButton = document.getElementById('clearSalesFilters');
const salesTableBody = document.getElementById('salesTableBody');
const noSalesResultsMessage = document.getElementById('noSalesResults');

// Dados Mock de Vendas
const mockSales = [
    { id: 1001, date: "2025-10-18", seller: "Alexandre", items: 5, total: 35.50, status: "Pago" },
    { id: 1002, date: "2025-10-18", seller: "Nicolly", items: 2, total: 12.00, status: "Pago" },
    { id: 1003, date: "2025-10-17", seller: "Alexandre", items: 8, total: 60.99, status: "Pendente" },
    { id: 1004, date: "2025-10-16", seller: "Thiago", items: 1, total: 5.00, status: "Cancelado" },
];

/**
 * Renderiza a lista de vendas na tabela.
 */
function renderSalesTable(sales) {
    salesTableBody.innerHTML = '';
    
    if (sales.length === 0) {
        noSalesResultsMessage.style.display = 'block';
        return;
    }
    
    noSalesResultsMessage.style.display = 'none';

    sales.forEach(sale => {
        const row = salesTableBody.insertRow();
        
        row.insertCell().textContent = sale.id;
        row.insertCell().textContent = new Date(sale.date).toLocaleDateString('pt-BR'); // Formata a data
        row.insertCell().textContent = sale.seller;
        row.insertCell().textContent = sale.items;
        row.insertCell().textContent = `R$ ${sale.total.toFixed(2).replace('.', ',')}`;
        
        // Célula do Status com estilo (se necessário)
        const statusCell = row.insertCell();
        statusCell.textContent = sale.status;
        statusCell.classList.add(`status-${sale.status.toLowerCase()}`); 
        
        // Célula de Ações
        const actionsCell = row.insertCell();
        actionsCell.innerHTML = `
            <button class="btn-action btn-view" data-id="${sale.id}" title="Ver Detalhes">
                <span class="material-symbols-sharp">visibility</span>
            </button>
            <button class="btn-action btn-print" data-id="${sale.id}" title="Imprimir">
                <span class="material-symbols-sharp">print</span>
            </button>
        `;
        
        // Adiciona listeners (apenas para demonstração)
        actionsCell.querySelector('.btn-view').addEventListener('click', () => console.log(`Ver Venda ${sale.id}`));
        actionsCell.querySelector('.btn-print').addEventListener('click', () => console.log(`Imprimir Venda ${sale.id}`));
    });
}

/**
 * Lida com a busca de vendas.
 */
function handleSalesSearch(e) {
    e.preventDefault(); 
    
    const formData = new FormData(searchSalesForm);
    const filters = Object.fromEntries(formData.entries());

    // 1. Lógica de Filtro (MUITO simplificada)
    const filteredSales = mockSales.filter(sale => {
        const idMatch = !filters.saleId || String(sale.id).includes(filters.saleId);
        const sellerMatch = !filters.seller || filters.seller === "" || sale.seller.toLowerCase().includes(filters.seller.toLowerCase());
        const statusMatch = !filters.status || filters.status === "" || sale.status.toLowerCase() === filters.status.toLowerCase();
        
        // Filtros de data seriam implementados aqui comparando new Date(sale.date) com as datas de filtro.
        
        return idMatch && sellerMatch && statusMatch;
    });

    renderSalesTable(filteredSales);
}

// 4. Lógica de Limpar Filtros
function clearSalesFilters() {
    searchSalesForm.reset();
    renderSalesTable(mockSales); // Recarrega todos os dados
}

// 5. Inicialização
document.addEventListener('DOMContentLoaded', () => {
    searchSalesForm.addEventListener('submit', handleSalesSearch);
    clearSalesFiltersButton.addEventListener('click', clearSalesFilters);
    
    // Carrega todos os dados ao iniciar
    renderSalesTable(mockSales);
});