

// 1. Seleção de Elementos do DOM
const searchFornecedorForm = document.getElementById('searchFornecedorForm');
const fornecedoresTableBody = document.getElementById('fornecedoresTableBody');
const clearFornecedorFilters = document.getElementById('clearFornecedorFilters');
const noResultsMessage = document.getElementById('noResults'); 

// Dados Mock de Fornecedores
const mockFornecedores = [
    { 
        id: 1, 
        nomeFantasia: "Fazenda Verde", 
        cadastroPessoa: "00.000.000/0001-00", 
        telefone: "(61) 9999-0000", 
        status: "Ativo" 
    },
    { 
        id: 2, 
        nomeFantasia: "Horti Mais", 
        cadastroPessoa: "111.222.333-44", 
        telefone: "(11) 9888-1111", 
        status: "Inativo" 
    },
    { 
        id: 3, 
        nomeFantasia: "Grãos do Cerrado", 
        cadastroPessoa: "22.333.444/5555-66", 
        telefone: "(31) 9777-2222", 
        status: "Ativo" 
    },
];

/**
 * Função para redirecionar para a entrada de produtos com o ID do fornecedor.
 * @param {number} fornecedorId 
 */
function initiateProductEntry(fornecedorId) {
    // Redireciona para Entradaprod.html, passando o ID do fornecedor na URL
    window.location.href = `Entradaprod.html?fornecedorId=${fornecedorId}`;
}


/**
 * Renderiza a lista de fornecedores na tabela.
 */
function renderFornecedoresTable(fornecedores) {
    fornecedoresTableBody.innerHTML = '';
    
    // Lógica para exibir/esconder a mensagem de "Nenhum resultado"
    if (fornecedores.length === 0) {
        noResultsMessage.style.display = 'block'; 
        return;
    }
    
    noResultsMessage.style.display = 'none';

    fornecedores.forEach(fornecedor => {
        const row = fornecedoresTableBody.insertRow();
        
        row.insertCell().textContent = fornecedor.nomeFantasia;
        row.insertCell().textContent = fornecedor.cadastroPessoa;
        row.insertCell().textContent = fornecedor.telefone;
        
        // Célula do Status com classe CSS
        const statusCell = row.insertCell();
        statusCell.textContent = fornecedor.status;
        statusCell.classList.add(`status-${fornecedor.status.toLowerCase()}`); 
        
        // Célula de Ações (Editar/Entrada)
        const actionsCell = row.insertCell();
        
        // Estrutura de botões
        actionsCell.innerHTML = `
            <button class="btn-action btn-edit" data-id="${fornecedor.id}" title="Editar">
                <span class="material-symbols-sharp">edit</span>
            </button>
            <button class="btn-default btn-small" data-id="${fornecedor.id}" title="Entrada de Produtos">
                <span class="material-symbols-sharp">inventory_2</span> Entrada
            </button>
        `;
        
        // Ligar o botão de Entrada à função de redirecionamento
        actionsCell.querySelector('.btn-small').addEventListener('click', () => {
            initiateProductEntry(fornecedor.id);
        });

        // Adicionar listener ao botão de edição (simulação)
        actionsCell.querySelector('.btn-edit').addEventListener('click', () => {
            alert(`Ação de Edição para ${fornecedor.nomeFantasia} (ID: ${fornecedor.id})`);
        });
    });
}

/**
 * Lida com a busca/filtragem de fornecedores.
 */
function handleFornecedorSearch(e) {
    if (e) e.preventDefault();
    
    const formData = new FormData(searchFornecedorForm);
    const filters = Object.fromEntries(formData.entries());

    const filteredFornecedores = mockFornecedores.filter(f => {
        const empresaMatch = !filters.empresa || f.nomeFantasia.toLowerCase().includes(filters.empresa.toLowerCase());
        const cnpjMatch = !filters.cnpj || f.cadastroPessoa.includes(filters.cnpj);
        const statusMatch = !filters.status || filters.status === "" || f.status.toLowerCase() === filters.status.toLowerCase();
        
        return empresaMatch && cnpjMatch && statusMatch;
    });

    renderFornecedoresTable(filteredFornecedores);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Liga o formulário de busca ao handler
    searchFornecedorForm.addEventListener('submit', handleFornecedorSearch);
    
    // Liga o botão de limpar filtros
    clearFornecedorFilters.addEventListener('click', () => {
        searchFornecedorForm.reset();
        handleFornecedorSearch();
    });
    
    // Carrega a lista inicial (exibe todos)
    renderFornecedoresTable(mockFornecedores);
});