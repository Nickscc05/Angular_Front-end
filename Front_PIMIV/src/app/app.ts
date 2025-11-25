import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './componente/menus/navbar/navbar.component';
import { SidebarComponent } from './componente/menus/sidebar/sidebar.component';
import { AlertComponent } from './componente/shared/alert/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent, AlertComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
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
