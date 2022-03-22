import { Component, OnInit } from '@angular/core';
import { Method } from 'src/app/components/scrambler/scrambler.component';

@Component({
  selector: 'app-vigener',
  templateUrl: './vigener.component.html',
  styleUrls: ['./vigener.component.scss']
})
export class VigenerComponent implements OnInit {
  method = Method;
  constructor() { }

  ngOnInit(): void {
  }

}
