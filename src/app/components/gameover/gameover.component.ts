import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LeaderboardService } from '../../../services/leaderboard.service';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css']
})
export class GameoverComponent implements OnInit {
  @Input() score: number = -1;
  @Output() closeGameover = new EventEmitter<void>();
  username: string = '';

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void { }

  saveScore() {
    if (this.username.trim()) {
      this.leaderboardService.saveLeaderboardEntry({ name: this.username, score: this.score });
      this.closeGameover.emit();
    } else {
      alert('Please enter a valid username.');
    }
  }
}
