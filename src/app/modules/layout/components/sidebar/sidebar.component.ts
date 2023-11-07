import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MenuService} from 'src/app/modules/layout/services/menu.service';
import {environment} from 'src/environments/environment';
import {ThemeService} from "../../../../core/services/theme.service";
import {MenuItem} from "../../../../core/models/menu.model";
import {AuthService} from "../../../../core/services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  appName: string = environment.name;
  public showSideBar$: Observable<boolean> = new Observable<boolean>();
  public pagesMenu$: Observable<MenuItem[]> = new Observable<MenuItem[]>();

  constructor(public themeService: ThemeService,
              private router : Router,
              private menuService: MenuService, private _authService: AuthService) {
    this.showSideBar$ = this.menuService.showSideBar$;
    this.pagesMenu$ = this.menuService.pagesMenu$;
  }

  ngOnInit(): void {
  }

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }

  toggleTheme() {
    this.themeService.theme = !this.themeService.isDark ? 'dark' : 'light';
  }

  public onSignOut(): void {
    this._authService.logout();
  }
}
