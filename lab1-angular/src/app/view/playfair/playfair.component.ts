import { Component, OnInit } from '@angular/core';
import { Method } from 'src/app/components/scrambler/scrambler.component';

@Component({
  selector: 'app-playfair',
  templateUrl: './playfair.component.html',
  styleUrls: ['./playfair.component.scss']
})
export class PlayfairComponent implements OnInit {
  method = Method;
  constructor() { }

  ngOnInit(): void {
  }

}
