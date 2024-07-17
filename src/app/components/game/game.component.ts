import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() tracks: any;
  timestamp: number = Date.now();



  constructor() { }

  ngOnInit(): void {
  }

}
