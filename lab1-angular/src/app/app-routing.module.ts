import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColumnComponent } from './view/column/column.component';
import { MainComponent } from './view/main/main.component';
import { PlayfairComponent } from './view/playfair/playfair.component';
import { VigenerComponent } from './view/vigener/vigener.component';

const routes: Routes = [
  {
    path: 'column',
    component: ColumnComponent,
  },
  {
    path: 'vigener',
    component: VigenerComponent,
  },
  {
    path: 'playfair',
    component: PlayfairComponent,
  },
  {
    path: '',
    component: MainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
