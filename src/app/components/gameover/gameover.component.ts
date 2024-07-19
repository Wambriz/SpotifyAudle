import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LeaderboardService } from '../../../services/leaderboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css'],
})
export class GameoverComponent implements OnInit {
  @Input() score: number = -1;
  @Output() closeGameover = new EventEmitter<void>();
  @Output() scoreSaved = new EventEmitter<void>();
  username: string = '';

  constructor(
    private leaderboardService: LeaderboardService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  saveScore() {
    if (this.username.trim()) {
      this.leaderboardService.saveLeaderboardEntry({
        name: this.username,
        score: this.score,
      });
      this.scoreSaved.emit();
      this.router.navigate(['/']); // Navigate to home page
    } else {
      alert('Please enter a valid username.');
    }
  }

  close() {
    this.closeGameover.emit();
    this.router.navigate(['/']); // Navigate to home page
  }
}
