import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  questions = [
    { id: 1, song: 'Song 1' },
    { id: 2, song: 'Song 2' },
    { id: 3, song: 'Song 3' },
    { id: 4, song: 'Song 4' },
    { id: 5, song: 'Song 5' }
  ];

  answers = [
    'Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5',
    'Red Herring 1', 'Red Herring 2', 'Red Herring 3', 'Red Herring 4', 'Red Herring 5'
  ];

  userAnswers: string[][] = [];
  feedback: string[][] = [];
  maxGuesses = 5;
  currentGuess = 0;
  gameOverMessage: string = '';

  ngOnInit(): void {
    this.initializeCurrentGuess();
  }

  submitAnswers() {
    const currentFeedback = this.userAnswers[this.currentGuess].map((answer, index) => {
      if (answer === this.questions[index].song) {
        return 'green';
      } else if (this.questions.some(q => q.song === answer)) {
        return 'yellow';
      } else {
        return 'red';
      }
    });

    if (!this.isGameOver) {
      this.feedback.push(currentFeedback);
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
      this.gameOverMessage = `You got it in ${correctGuessCount}! You're a ${titles[correctGuessCount - 1]}`;
    } else {
      this.gameOverMessage = 'Game over! Better luck next time.';
    }
  }

  initializeCurrentGuess() {
    if (this.userAnswers.length <= this.currentGuess) {
      this.userAnswers.push(new Array(this.questions.length).fill(''));
    }
  }
}


