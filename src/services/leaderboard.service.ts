import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LeaderboardEntry {
  name: string
  score: number
}


@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private jsonURL = 'assets/leaderboard-data.json'
  constructor(private http: HttpClient) { }

  getLeaderboardEntries(): Observable<LeaderboardEntry[]> {
    return this.http.get<LeaderboardEntry[]>(this.jsonURL)
  }
}
