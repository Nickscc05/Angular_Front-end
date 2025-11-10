// assets/js/Categoria.js

// 1. Elementos do DOM
const categoryForm = document.getElementById('categoryForm');
const categoriesTableBody = document.getElementById('categoriesTableBody');
const noCategoriesMessage = document.getElementById('noCategories');
const categoryNameInput = document.getElementById('categoryName');

// Dados Mock (Simulação do que a API retornaria)
let mockCategories = [
    { id: 1, nome: "Frutas" },
    { id: 2, nome: "Legumes" },
    { id: 3, nome: "Verduras" },
];

/**
 * Renderiza a lista de categorias na tabela.
 * @param {Array} categories - Lista de categorias a serem exibidas.
 */
function renderCategoriesTable(categories) {
    categoriesTableBody.innerHTML = ''; // Limpa resultados
    
    if (categories.length === 0) {
        noCategoriesMessage.style.display = 'block';
        return;
    }

    noCategoriesMessage.style.display = 'none';

    categories.forEach(category => {
        const row = categoriesTableBody.insertRow();
        
        row.insertCell().textContent = category.id;
        row.insertCell().textContent = category.nome;
        
        // Célula de Ações (Editar/Excluir)
        const actionsCell = row.insertCell();
        actionsCell.innerHTML = `
            <button class="btn-action btn-edit" data-id="${category.id}" title="Editar">
                <span class="material-symbols-sharp">edit</span>
            </button>
            <button class="btn-action btn-delete" data-id="${category.id}" title="Excluir">
                <span class="material-symbols-sharp">delete</span>
            </button>
        `;
        
        // Adiciona listeners para os botões de ação (Lógica de API seria aqui)
        actionsCell.querySelector('.btn-delete').addEventListener('click', () => handleDelete(category.id));
    });
}

/**
 * Lida com o envio de uma nova categoria (simulando POST para /api/Categoria).
 */
function handleCategorySubmit(e) {
    e.preventDefault();

    const formData = new FormData(categoryForm);
    const categoryData = Object.fromEntries(formData.entries());
    
    const categoryName = categoryData.nome.trim(); // Nome é o campo requerido pela API

    if (categoryName.length < 3) {
        alert("O nome da categoria deve ter pelo menos 3 caracteres.");
        return;
    }

    // Simulação: Enviar para a API e receber o novo ID
    const newId = mockCategories.length > 0 ? Math.max(...mockCategories.map(c => c.id)) + 1 : 1;
    
    const newCategory = { id: newId, nome: categoryName };
    
    // Adiciona ao array mock
    mockCategories.push(newCategory);
    
    console.log("NOVA CATEGORIA REGISTRADA:", newCategory);
    alert(`Categoria "${categoryName}" cadastrada com ID ${newId}!`);

    // Atualiza a tabela e limpa o formulário
    renderCategoriesTable(mockCategories);
    categoryForm.reset();
    categoryNameInput.focus();
}

/**
 * Simula a exclusão de uma categoria (simulando DELETE para /api/Categoria/{id}).
 */
function handleDelete(id) {
    if (confirm(`Deseja realmente excluir a Categoria ID ${id}?`)) {
        mockCategories = mockCategories.filter(c => c.id !== id);
        renderCategoriesTable(mockCategories);
        console.log(`Categoria ID ${id} excluída.`);
    }
}


// --- INICIALIZAÇÃO E LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Carrega a lista inicial (simulando a chamada GET /api/Categoria)
    renderCategoriesTable(mockCategories);
    
    // 2. Liga a submissão do formulário à função de cadastro
    categoryForm.addEventListener('submit', handleCategorySubmit);
});