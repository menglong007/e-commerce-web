import { Injectable, EventEmitter } from '@angular/core';

const themeKey: string = 'system-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public defaultTheme = 'light';
  public themeChanged = new EventEmitter<string>();

  constructor() {}

  public get theme(): string {
    return localStorage.getItem(themeKey) || this.defaultTheme;
  }

  public set theme(value: string) {
    localStorage.setItem(themeKey, value);
    this.themeChanged.emit(value);
  }

  public get isDark(): boolean {
    return this.theme === 'dark';
  }
}
