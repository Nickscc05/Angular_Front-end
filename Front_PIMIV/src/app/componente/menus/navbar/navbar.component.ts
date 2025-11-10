import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent {

  // Verifica o estado do menu (ativo/inativo)
  @Input() estadoMenu: boolean = false;
  @Output() toggleMenu = new EventEmitter<void>();

  // Alterna o estado do menu
  onToggleMenu() {
    this.toggleMenu.emit();
  }
}
