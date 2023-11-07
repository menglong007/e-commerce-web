import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../../core/services/auth.service";

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public onSignOut(): void {
    this._authService.logout();
  }
}
