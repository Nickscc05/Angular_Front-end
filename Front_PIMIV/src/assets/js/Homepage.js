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