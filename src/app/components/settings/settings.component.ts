import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @Output() closeSettings = new EventEmitter<void>();
  difficultyOptions = ['3', '5', '7'];
  selectedDifficulty = '5';
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

  close() {
    this.closeSettings.emit();
  }
}
