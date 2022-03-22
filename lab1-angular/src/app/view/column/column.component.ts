import { Component, OnInit } from '@angular/core';
import { Method } from 'src/app/components/scrambler/scrambler.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  method = Method;
  constructor() { }

  ngOnInit(): void {
  }

}
