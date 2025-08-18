import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  imports: [IonApp, IonRouterOutlet, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected title = 'vendemas-caja-mobile';

  constructor() {
    console.log('App component initialized');
    console.log('Title:', this.title);
  }
}
