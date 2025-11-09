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

const passwordIcons = document.querySelectorAll('.password-icon');

passwordIcons.forEach(icon => {
  icon.addEventListener('click', function() {
    const input = this.parentElement.querySelector('.form-control');
    console.log(input); // corrigido
    
    if (input.type === 'password') {
      input.type = 'text';
      this.classList.remove('fa-eye-slash');
      this.classList.add('fa-eye');
    } else {
      input.type = 'password';
      this.classList.remove('fa-eye');
      this.classList.add('fa-eye-slash');
    }
  });
});



const telefone = document.getElementById("telefone");

telefone.addEventListener("input", function(e) {
  let valor = e.target.value.replace(/\D/g, ""); // só números
  if (valor.length > 11) valor = valor.slice(0, 11);

  if (valor.length > 6) {
    valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
  } else if (valor.length > 2) {
    valor = valor.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
  } else {
    valor = valor.replace(/^(\d*)$/, "($1");
  }
  e.target.value = valor;
});

