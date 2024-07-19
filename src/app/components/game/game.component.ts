import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../shared/track.service';
import { LeaderboardService } from '../../../services/leaderboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  tracks: any[] = [];
  questions: any[] = [];
  answers: string[] = [];
  userAnswers: string[][] = [];
  feedback: string[][] = [];
  maxGuesses: number = 5;
  currentGuess = 0;
  gameOverMessage: string = '';
  score: number = 0;
  isGameOver: boolean = false;

  constructor(
    private trackService: TrackService,
    private leaderboardService: LeaderboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.trackService.tracks$.subscribe(tracks => {
      this.tracks = tracks;
      if (this.tracks.length > 0) {
        this.initializeQuestionsAndAnswers();
        this.initializeCurrentGuess();
      }
    });
  }

  initializeQuestionsAndAnswers() {
    this.questions = this.tracks.slice(0, 5).map((track, index) => ({
      id: index + 1,
      name: track.name,
      preview_url: track.preview_url
    }));

    this.answers = this.tracks.slice(0, 10).map(track => track.name);
    this.answers = this.answers.sort();
  }

  submitAnswers() {
    const currentFeedback = this.userAnswers[this.currentGuess].map((answer, index) => {
      if (answer === this.questions[index].name) {
        return 'green';
      } else if (this.questions.some(q => q.name === answer)) {
        return 'yellow';
      } else {
        return 'red';
      }
    });

    this.feedback.push(currentFeedback);

    if (!this.isGameOver) {
      this.currentGuess++;
      this.initializeCurrentGuess();
      this.checkGameState();
    } else {
      this.calculateScore();
      this.displayGameOverMessage();
    }
  }

  checkGameState() {
    const allGreen = this.feedback.some(f => f.every(box => box === 'green'));
    const maxGuessesReached = this.currentGuess >= this.maxGuesses;

    if (allGreen || maxGuessesReached) {
      this.calculateScore();
      this.isGameOver = true;
    }
  }

  calculateScore() {
    this.score = this.feedback.reduce((total, feedbackRow) => {
      return total + feedbackRow.filter(box => box === 'green').length * 10;
    }, 0);
  }

  displayGameOverMessage() {
    const correctGuessCount = this.feedback.findIndex(f => f.every(box => box === 'green')) + 1;

    if (correctGuessCount > 0) {
      const titles = ['Maestro!', 'Virtuoso!', 'Wunderkind!', 'Expert!', 'Prodigy!'];
      this.gameOverMessage = `You got it in ${correctGuessCount} guesses! You're a ${titles[correctGuessCount - 1]}. Your score is ${this.score}.`;
    } else {
      this.gameOverMessage = `Game over! Your score is ${this.score}. Better luck next time.`;
    }
  }

  initializeCurrentGuess() {
    if (!this.userAnswers[this.currentGuess]) {
      const previousGuess = this.userAnswers[this.currentGuess - 1] || new Array(this.questions.length).fill('');
      this.userAnswers[this.currentGuess] = [...previousGuess];
    }
  }

  handleGameoverClose() {
    this.router.navigate(['/']); // Navigate to home page
  }

  handleScoreSaved() {
    this.router.navigate(['/']); // Navigate to home page
  }
}
