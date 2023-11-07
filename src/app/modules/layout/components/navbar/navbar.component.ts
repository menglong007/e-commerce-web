import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import {environment} from "src/environments/environment";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  appName: string = environment.name;
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
