import { Component } from '@angular/core';
import { Method } from './components/scrambler/scrambler.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  method = Method;
}
