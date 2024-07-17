import { Component, OnInit } from "@angular/core";
import { SpotifyService } from '../spotify.service';
import fetchFromSpotify, { request } from "../../services/api";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {} // Inject SpotifyService

  genres: String[] = ["House", "Alternative", "J-Rock", "R&B"];
  selectedGenre: String = "";
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";
  randomSong: any;
  amount_of_songs: number = 5;

  timestamp: number = Date.now();
  isSettingsOpen = false;
  
  // need a empty list to store song objects
  tracks: any;

  ngOnInit(): void {
    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        // this.loadRandomSong();
        this.fillTracks();

        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
      // this.loadRandomSong();
      this.fillTracks();

    });

  }
  fillTracks() {
    for(let i = 0; i < this.amount_of_songs; i++)
    this.randomSong = null;
    this.loadRandomSong();
    this.tracks.push(this.randomSong)
    console.log("tracks:");
    
    console.log(this.tracks);
    
  }


  loadRandomSong = async () => {
    try {
      console.log("calling random song");
      const response = await this.spotifyService.getRandomSong(this.token);
      this.randomSong = response.tracks[0];
      console.log("found random song");
      console.log(this.randomSong);
    } catch (error) {
      console.error('Error fetching random song', error);
    }
  };

  setGenre(selectedGenre: any) {
    this.selectedGenre = selectedGenre;
    console.log(this.selectedGenre);
    console.log(TOKEN_KEY);
  }

  toggleSettings(){
    this.isSettingsOpen = !this.isSettingsOpen;
  }
  openSettings() {
    console.log("opening");
    this.isSettingsOpen = true;
  }

  closeSettings() {
    console.log("closing");
    this.isSettingsOpen = false;
  }
}
