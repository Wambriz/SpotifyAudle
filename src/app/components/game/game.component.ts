import { Component, AfterViewInit, QueryList, ViewChildren, OnInit, ElementRef, Renderer2} from '@angular/core';
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
    private router: Router,
    private renderer: Renderer2

  ) { }

  ngOnInit(): void {
    this.leaderboardService.deleteInvalidEntries(); 
    this.trackService.tracks$.subscribe(tracks => {
      this.tracks = tracks;
      if (this.tracks.length > 0) {
        this.initializeQuestionsAndAnswers();
        this.initializeCurrentGuess();
      }
    });
  }

  @ViewChildren('audioPlayer') audioPlayers!: QueryList<ElementRef<HTMLAudioElement>>;

  ngAfterViewInit(): void {
    this.audioPlayers.changes.subscribe((players: QueryList<ElementRef<HTMLAudioElement>>) => {
      players.forEach(audioPlayer => {
        this.renderer.setProperty(audioPlayer.nativeElement, 'volume', 0.1); // Set volume to 10%
      });
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
    this.score = this.feedback.reduce((total, feedbackRow, guessIndex) => {
      const baseScore = Math.pow(10, 5 - guessIndex); // Calculate the base score for each attempt
      return total + feedbackRow.reduce((rowTotal, box) => {
        if (box === 'green') {
          return rowTotal + (2 * baseScore);
        } else if (box === 'yellow') {
          return rowTotal + (1 * baseScore);
        } else {
          return rowTotal;
        }
      }, 0);
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
  
  setVolume(audioPlayer: HTMLAudioElement) {
    audioPlayer.volume = 0.5;
  }

  //display non standard length characters properly
  //like Japanese
  getDisplayText(answer: string): string {
    const isAlphanumeric = /^[a-zA-Z0-9]+$/.test(answer);
    return isAlphanumeric ? answer.slice(0, 3) : answer.slice(0, 2);
  }


}
