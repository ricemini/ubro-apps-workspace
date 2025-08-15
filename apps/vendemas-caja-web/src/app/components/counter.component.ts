import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="counter-container">
      <h2>Zoneless Counter Demo</h2>
      <p>Count: {{ count() }}</p>
      <p>Doubled: {{ doubled() }}</p>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
      <button (click)="reset()">Reset</button>
    </div>
  `,
  styles: [
    `
      .counter-container {
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        margin: 1rem 0;
        text-align: center;
      }

      button {
        margin: 0 0.5rem;
        padding: 0.5rem 1rem;
        border: 1px solid #007bff;
        background: #007bff;
        color: white;
        border-radius: 4px;
        cursor: pointer;
      }

      button:hover {
        background: #0056b3;
      }
    `,
  ],
})
export class CounterComponent {
  // Signal for reactive state
  protected count = signal(0);

  // Computed signal
  protected doubled = computed(() => this.count() * 2);

  constructor() {
    // Effect to demonstrate reactivity
    effect(() => {
      console.log(`Count changed to: ${this.count()}`);
    });
  }

  increment(): void {
    this.count.update(current => current + 1);
  }

  decrement(): void {
    this.count.update(current => current - 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
