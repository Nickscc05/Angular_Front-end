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