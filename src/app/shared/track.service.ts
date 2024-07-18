import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpotifyService } from '../spotify.service';


@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private tracksSubject = new BehaviorSubject<any[]>([]);
  tracks$ = this.tracksSubject.asObservable();

  constructor(private spotifyService: SpotifyService) {}

  fetchTracks(token: String): void {
    this.spotifyService.getRandomSong(token).then((response:any) => {
      const validTracks = response.tracks.filter((track:any) => track.preview_url !== null);
      this.tracksSubject.next(validTracks);
    }).catch((error:any) => {
      console.error('Error fetching tracks', error);
    });
  }
}
