import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isSettingsOpen = false
  constructor() { }

  ngOnInit(): void {
  }

  toggleSettings(): void {
    this.isSettingsOpen = !this.isSettingsOpen;
  }

  closeSettings(): void {
    this.isSettingsOpen = false;
  }
}
