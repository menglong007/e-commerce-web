import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../../core/services/auth.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {take} from "rxjs";
import {SharedModule} from "../../../../shared/shared.module";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',

})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;

  constructor(private _authService: AuthService,
              private snackBar:MatSnackBar) {}

  ngOnInit(): void {}

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSignOut(): void {
    const ref = this.snackBar.open('Are sure to Sign Out?', 'Yes', {
      duration: 5000,
      verticalPosition: 'top',
    });
    ref
      .onAction()
      .pipe(take(1))
      .subscribe(() => {
        this._authService.signOut();
        window.location.reload();
      });
  }
}
