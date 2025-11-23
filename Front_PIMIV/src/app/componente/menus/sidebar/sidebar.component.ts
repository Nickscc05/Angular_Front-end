import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Interface interna do componente Sidebar
interface MenuItem {

  title: string;
  icon: string;
  link?: string;
  estadoSubMenu?: boolean;
  subMenu?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true
})

export class SidebarComponent {

  userName: string = 'Usuário';

  // TODO: Puxar nome do usuário e alterar menu de acordo com o tipo de usuário logado
  // MAYBE: Reestruturar menu?
  // Array de itens do menu
  menuItems: MenuItem[] = [

    // Início
    { title: 'Início', icon: 'assets/img/InicioHome.svg', link: '/homepage' },
    {
      title: 'Gerenciar',
      icon: 'assets/img/user.SVG.svg',
      estadoSubMenu: false,
      subMenu: [
        
        { title: 'Categoria', icon: 'assets/img/relatorio.SVG.svg', link: '/categoria' },
        { title: 'Unidades de medida', icon: 'assets/img/relatorio.SVG.svg', link: '/unid-medida' },
        { title: 'Produto', icon: 'assets/img/produtos.SVG.svg', link: '/produtos/info' },
        { title: 'Cadastrar usuário', icon: 'assets/img/caduser.SVG.svg', link: '/cadastros/usuario' },
        { title: 'Cadastrar fornecedor', icon: 'assets/img/caduser.SVG.svg', link: '/cadastros/fornecedor' },
        { title: 'Cadastrar produtos', icon: 'assets/img/produtos.SVG.svg', link: '/produtos/cadastro' },
        { title: 'Funcionários', icon: 'assets/img/relatorio.SVG.svg', link: '/listagem/funcionarios' },
        { title: 'Histórico de vendas', icon: 'assets/img/Vendas.SVG.svg', link: '/vendas/historico' }
      ]
    },
    {
      title: 'Entrada',
      icon: '',
      estadoSubMenu: false,
      subMenu: [
        { title: 'Nova Venda', icon: 'assets/img/Vendas.SVG.svg', link: '/vendas/nova' },
      ]
    },
    { title: 'Caixa', icon: 'assets/img/caixa.SVG.svg', link: '/caixa' },
    { title: 'Relatórios', icon: 'assets/img/relatorio.SVG.svg', link: '/relatorios' },
    { title: 'Sair', icon: 'assets/img/sair.SVG.svg', link: '/login' }

  ];

  toggleSubMenu(item: MenuItem, event: Event) {

    // Só permite abrir/fechar submenu se o item tiver algum submenu
    if (item.subMenu) {
      event.preventDefault(); // Previne o comportamento padrão do link
        //item.estadoSubMenu = !item.estadoSubMenu;

      // Passa por todos os itens do menu e fecha os submenus abertos, exceto o clicado
      this.menuItems.forEach(menuItem => {
        if (menuItem !== item && menuItem.estadoSubMenu) {
          menuItem.estadoSubMenu = false;
        }
      });

      // Alterna o estado do submenu clicado
      item.estadoSubMenu = !item.estadoSubMenu;
    }
  }
}
