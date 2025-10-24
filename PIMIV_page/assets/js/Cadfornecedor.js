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