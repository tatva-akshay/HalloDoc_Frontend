import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkMode = false;

  constructor() {
    this.darkMode = typeof window==undefined && localStorage?.getItem('darkMode') === 'true';
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', this.darkMode ? 'true' : 'false');
  }

  get isDarkMode() {
    return this.darkMode;
  }
}
