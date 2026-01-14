import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeClass = 'dark-theme';
  constructor() { 
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add(this.darkThemeClass);
    }
  }
  toggleTheme(): void {
    const isDark = document.body.classList.toggle(this.darkThemeClass);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  isDarkTheme(): boolean {
    return document.body.classList.contains(this.darkThemeClass);
  }
}
