import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../../../services/leaderboard.service';

interface LeaderboardEntry {
  name: string;
  score: number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  leaderboardEntries: LeaderboardEntry[] = [];

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.fetchLeaderboardEntries();
  }

  fetchLeaderboardEntries(): void {
    this.leaderboardService.getLeaderboardEntries().subscribe((data) => {
      this.leaderboardEntries = data.sort((a, b) => b.score - a.score);
    });
  }
}
