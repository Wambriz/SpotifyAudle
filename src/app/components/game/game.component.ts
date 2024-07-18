import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../shared/track.service';

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
  maxGuesses = 5;
  currentGuess = 0;
  gameOverMessage: string = '';

  constructor(private trackService: TrackService) {}

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
    } else {
      this.displayGameOverMessage();
    }
  }

  resetGame() {
    this.userAnswers = [];
    this.feedback = [];
    this.currentGuess = 0;
    this.gameOverMessage = '';
    this.initializeCurrentGuess();
  }

  get isGameOver() {
    return this.feedback.some(f => f.every(box => box === 'green')) || this.currentGuess >= this.maxGuesses;
  }

  displayGameOverMessage() {
    const correctGuessCount = this.feedback.findIndex(f => f.every(box => box === 'green')) + 1;

    if (correctGuessCount > 0) {
      const titles = ['Maestro!', 'Virtuoso!', 'Wunderkind!', 'Expert!', 'Prodigy!'];
      this.gameOverMessage = `You got it in ${correctGuessCount} guesses! You're a ${titles[correctGuessCount - 1]}`;
    } else {
      this.gameOverMessage = 'Game over! Better luck next time.';
    }
  }

  initializeCurrentGuess() {
    if (!this.userAnswers[this.currentGuess]) {
      const previousGuess = this.userAnswers[this.currentGuess - 1] || new Array(this.questions.length).fill('');
      this.userAnswers[this.currentGuess] = [...previousGuess];
    }
  }
}
