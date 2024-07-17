import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { SettingsComponent } from './components/settings/settings.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { LeaderboardService } from '../services/leaderboard.service';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "leaderboard", component: LeaderboardComponent }
];

@NgModule({
  declarations: [AppComponent, HomeComponent, SettingsComponent, LeaderboardComponent, GameComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), HttpClientModule],
  providers: [LeaderboardService],
  bootstrap: [AppComponent],
})
export class AppModule { }
