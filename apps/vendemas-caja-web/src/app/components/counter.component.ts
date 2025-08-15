import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <div class="text-center">
        <h3 class="text-display text-2xl font-bold text-secondary mb-2">
          Counter: {{ count() }}
        </h3>
        <p class="text-body text-gray-600">Double: {{ doubled() }}</p>
      </div>

      <div class="flex justify-center space-x-3">
        <button
          (click)="increment()"
          class="bg-primary hover:bg-primary-600 text-primary-on font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          +
        </button>
        <button
          (click)="decrement()"
          class="bg-secondary hover:bg-secondary-600 text-secondary-on font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
        >
          -
        </button>
        <button
          (click)="reset()"
          class="bg-tertiary hover:bg-tertiary-600 text-tertiary-on font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-tertiary-500 focus:ring-offset-2"
        >
          Reset
        </button>
      </div>
    </div>
  `,
  styles: [],
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
