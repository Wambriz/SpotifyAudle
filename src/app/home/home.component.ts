import { Component, OnInit } from "@angular/core";
import { SpotifyService } from '../spotify.service';
import { TrackService } from '../shared/track.service';
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

  constructor(
    private spotifyService: SpotifyService,
    private trackService: TrackService // Inject TrackService
  ) { }


  genres: String[] = ["House", "Alternative", "J-Rock", "R&B"];
  selectedGenre: String = "";
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";
  timestamp: number = Date.now();
  isSettingsOpen = false;

  ngOnInit(): void {
    // this.authLoading = true;
    // const storedTokenString = localStorage.getItem(TOKEN_KEY);
    // if (storedTokenString) {
    //   const storedToken = JSON.parse(storedTokenString);
    //   if (storedToken.expiration > Date.now()) {
    //     console.log("Token found in localstorage");
    //     this.authLoading = false;
    //     this.token = storedToken.value;
    //     this.trackService.fetchTracks(this.token);
    //     return;
    //   }
    // }
    // console.log("Sending request to AWS endpoint");
    // request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
    //   const newToken = {
    //     value: access_token,
    //     expiration: Date.now() + (expires_in - 20) * 1000,
    //   };
    //   localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
    //   this.authLoading = false;
    //   this.token = newToken.value;
    //   this.trackService.fetchTracks(this.token);
    // });
  }

  onPlay(): void {
    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;

      //  this.token = "BQBzLzkxG1D-tYx-VgJm6AFe1Pl3B9nm9N5OmmQBA_iS_Jl1VyqpQEOSszcRisBhTfE-34TOOZ0PjYgzCabDFot0x0zMcrSwvoW_9FLZNWlVElVxNuo"

        this.trackService.fetchTracks(this.token);
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
     // this.token = "BQBzLzkxG1D-tYx-VgJm6AFe1Pl3B9nm9N5OmmQBA_iS_Jl1VyqpQEOSszcRisBhTfE-34TOOZ0PjYgzCabDFot0x0zMcrSwvoW_9FLZNWlVElVxNuo"

      this.trackService.fetchTracks(this.token);
    });
  }

  toggleSettings() {
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

