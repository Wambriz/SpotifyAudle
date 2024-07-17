import { Injectable } from '@angular/core';
import fetchFromSpotify from '../services/api';

interface FetchParams {
  available_markets: string[];
  limit: number;
  seed_genres: string[];
}

interface FetchOptions {
  token: String;
  endpoint: string;
  params: FetchParams;
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor() {}

  async getRandomSong(token: String): Promise<any> {
    console.log('printing token');
    console.log(token);

    const endpoint = 'recommendations';
    const params: FetchParams = {
      available_markets: ['US'],
      limit: 1,
      seed_genres: ["alternative", "samba"]
    };

    return await this.fetchWithRetry({ token, endpoint, params });
  }

  private async fetchWithRetry({ token, endpoint, params }: FetchOptions, retries: number = 3): Promise<any> {

    console.log("fetching with retry...");

    for (let i = 0; i < retries; i++) {
      try {

        console.log("trying a fetch");

        const response = await fetchFromSpotify({ token, endpoint, params });
        return response;
      } catch (error: any) {

        console.log(error.status);
        console.log("entering catch statement");

        if (error.status === 429) {
          const retryAfter = error.headers?.get('Retry-After');
          const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : 3000; // default to 3 seconds if header not present
          console.warn(`Rate limited. Retrying in ${waitTime / 1000} seconds...`);
          await this.delay(waitTime);
        } else {
          throw error;
        }
      }
    }
    throw new Error('Max retries reached');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
