import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css']
})
export class GameoverComponent implements OnInit {

  @Input() score: number = -1;

  constructor() { }

  ngOnInit(): void {
  }
  

}
