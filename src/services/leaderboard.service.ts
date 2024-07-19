import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface LeaderboardEntry {
  name: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private localStorageKey = 'leaderboard-data';

  constructor() {
    this.initializeDemoData();
  }

  getLeaderboardEntries(): Observable<LeaderboardEntry[]> {
    const data = localStorage.getItem(this.localStorageKey);
    const leaderboardEntries = data ? JSON.parse(data) : [];
    return of(leaderboardEntries);
  }

  saveLeaderboardEntry(entry: LeaderboardEntry): void {
    const data = localStorage.getItem(this.localStorageKey);
    const leaderboardEntries = data ? JSON.parse(data) : [];
    leaderboardEntries.push(entry);
    localStorage.setItem(this.localStorageKey, JSON.stringify(leaderboardEntries));
    console.log('Saving leaderboard entry:', entry);
  }

  private initializeDemoData(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (!data) {
      const demoEntries: LeaderboardEntry[] = [
        { name: 'Alice', score: 30 },
        { name: 'Bob', score: 20 },
        { name: 'Charlie', score: 10 },
      ];
      localStorage.setItem(this.localStorageKey, JSON.stringify(demoEntries));
      console.log('Initialized demo leaderboard data');
    }
  }

  deleteInvalidEntries(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) {
      let leaderboardEntries: LeaderboardEntry[] = JSON.parse(data);
     // leaderboardEntries = leaderboardEntries.filter(entry => entry.score >= 10000 && entry.score <= 1000000);
      localStorage.setItem(this.localStorageKey, JSON.stringify(leaderboardEntries));
      console.log('Deleted high score entries');
    }
  }

}
