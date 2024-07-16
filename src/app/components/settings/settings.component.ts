import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  difficultyOptions = ['5 secs', '10 secs', '15 secs'];
  selectedDifficulty = '5 secs';
  theme = 'Light Mode';

  constructor() { }

  ngOnInit(): void {
    this.theme = localStorage.getItem('theme') || 'Light Mode';
    this.applyTheme(this.theme);
  }

  setDifficulty(option: string) {
    this.selectedDifficulty = option;
    console.log('Selected difficulty:', this.selectedDifficulty);
  }

  toggleTheme() {
    this.theme = this.theme === 'Light Mode' ? 'Dark Mode' : 'Light Mode';
    localStorage.setItem('theme', this.theme);
    this.applyTheme(this.theme);
  }

  applyTheme(theme: string) {
    if (theme === 'Dark Mode') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

}
