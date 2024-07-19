import { Injectable } from '@angular/core';
import fetchFromSpotify from '../services/api';

const seeds: string[] = [
  "acoustic",
  "afrobeat",
  "alt-rock",
  "alternative",
  "ambient",
  "anime",
  "black-metal",
  "bluegrass",
  "blues",
  "bossanova",
  "brazil",
  "breakbeat",
  "british",
  "cantopop",
  "chicago-house",
  "children",
  "chill",
  "classical",
  "club",
  "comedy",
  "country",
  "dance",
  "dancehall",
  "death-metal",
  "deep-house",
  "detroit-techno",
  "disco",
  "disney",
  "drum-and-bass",
  "dub",
  "dubstep",
  "edm",
  "electro",
  "electronic",
  "emo",
  "folk",
  "forro",
  "french",
  "funk",
  "garage",
  "german",
  "gospel",
  "goth",
  "grindcore",
  "groove",
  "grunge",
  "guitar",
  "happy",
  "hard-rock",
  "hardcore",
  "hardstyle",
  "heavy-metal",
  "hip-hop",
  "holidays",
  "honky-tonk",
  "house",
  "idm",
  "indian",
  "indie",
  "indie-pop",
  "industrial",
  "iranian",
  "j-dance",
  "j-idol",
  "j-pop",
  "j-rock",
  "jazz",
  "k-pop",
  "kids",
  "latin",
  "latino",
  "malay",
  "mandopop",
  "metal",
  "metal-misc",
  "metalcore",
  "minimal-techno",
  "movies",
  "mpb",
  "new-age",
  "new-release",
  "opera",
  "pagode",
  "party",
  "philippines-opm",
  "piano",
  "pop",
  "pop-film",
  "post-dubstep",
  "power-pop",
  "progressive-house",
  "psych-rock",
  "punk",
  "punk-rock",
  "r-n-b",
  "rainy-day",
  "reggae",
  "reggaeton",
  "road-trip",
  "rock",
  "rock-n-roll",
  "rockabilly",
  "romance",
  "sad",
  "salsa",
  "samba",
  "sertanejo",
  "show-tunes",
  "singer-songwriter",
  "ska",
  "sleep",
  "songwriter",
  "soul",
  "soundtracks",
  "spanish",
  "study",
  "summer",
  "swedish",
  "synth-pop",
  "tango",
  "techno",
  "trance",
  "trip-hop",
  "turkish",
  "work-out",
  "world-music"
];





interface FetchParams {
  market: string;
//  available_markets: string[];
//  is_playable : boolean; 
  //restrictions: Object[];
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



  private getRandomGenres(count: number): string[] {
    const shuffled = seeds.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async getRandomSong(token: String): Promise<any> {
    // console.log('printing token');
    // console.log(token);

    const endpoint = 'recommendations';
    const params: FetchParams = {
      market: "US",
     // available_markets: ["US"],
     // restrictions: [reason: "market"],
      limit: 35,
      seed_genres: ['anime'],
      //seed_genres: this.getRandomGenres(5)
    };
    const response = await fetchFromSpotify({ token, endpoint, params });
    return response
  }

  // private async fetchWithRetry({ token, endpoint, params }: FetchOptions, retries: number = 3): Promise<any> {

  //   console.log("fetching with retry...");

  //   for (let i = 0; i < retries; i++) {
  //     try {

  //       console.log("trying a fetch");

  //       const response = await fetchFromSpotify({ token, endpoint, params });
  //       return response;
  //     } catch (error: any) {

  //       console.log(error.status);
  //       console.log("entering catch statement");

  //       if (error.status === 429) {
  //         const retryAfter = error.headers?.get('Retry-After');
  //         const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : 3000; // default to 3 seconds if header not present
  //         console.warn(`Rate limited. Retrying in ${waitTime / 1000} seconds...`);
  //         await this.delay(waitTime);
  //       } else {
  //         throw error;
  //       }
  //     }
  //   }
  //   throw new Error('Max retries reached');
  // }

  // private delay(ms: number): Promise<void> {

  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
}
