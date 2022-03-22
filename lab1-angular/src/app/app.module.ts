import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScramblerComponent } from './components/scrambler/scrambler.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { FileSaverModule } from 'ngx-filesaver';
import { HttpClientModule } from '@angular/common/http';
import { ColumnComponent } from './view/column/column.component';
import { VigenerComponent } from './view/vigener/vigener.component';
import { PlayfairComponent } from './view/playfair/playfair.component';
import { MainComponent } from './view/main/main.component';

@NgModule({
  declarations: [AppComponent, ScramblerComponent, ColumnComponent, VigenerComponent, PlayfairComponent, MainComponent],
  imports: [
    HttpClientModule,
    FileSaverModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
