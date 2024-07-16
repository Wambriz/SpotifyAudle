import { Injectable } from '@angular/core';
import fetchFromSpotify from '../services/api';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor() {}

  async getRandomSong(token: String) {
    const endpoint = 'recommendations';
    const params = {
      limit: 1,
      seed_genres: ["alternative", "samba"]
    }

    return await fetchFromSpotify({ token, endpoint, params });
  } 
}
