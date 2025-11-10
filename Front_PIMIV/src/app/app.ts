import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HomePageComponent } from './componente/homepage/homepage.component';
import { NavbarComponent } from './componente/menus/navbar/navbar.component';
import { SidebarComponent } from './componente/menus/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NavbarComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Front_PIMIV');
  
  // NAVBAR
  estadoMenu: boolean = false;

  onToggleMenu() {
    this.estadoMenu = !this.estadoMenu;
  }

  closeMenu() {
    this.estadoMenu = false;
  }

  // SIDEBAR

}
