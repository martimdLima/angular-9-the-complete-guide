import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output() intervalFired = new EventEmitter<number>();
  interval;
  stopTime = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onGameStart() {
    this.interval = setInterval(() => {
      this.intervalFired.emit(this.stopTime + 1);
      this.stopTime++;
    }, 1000);
  }

  onGameStop() {
    clearInterval(this.interval);
  }
}
