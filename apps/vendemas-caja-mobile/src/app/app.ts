import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { CounterComponent } from './components/counter.component';
import { PosComponent } from './components/pos.component';
import { ThemeToggleComponent } from '../theme/theme-toggle.component';
import { ThemeDemoComponent } from '../theme/theme-demo.component';

@Component({
  imports: [
    NxWelcome,
    RouterModule,
    CounterComponent,
    PosComponent,
    ThemeToggleComponent,
    ThemeDemoComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected title = signal('vendemas-caja-mobile');
}
