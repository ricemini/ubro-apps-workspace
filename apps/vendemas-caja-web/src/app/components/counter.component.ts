import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="p-6 border border-gray-300 rounded-lg m-4 text-center bg-white shadow-md"
    >
      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        Zoneless Counter Demo
      </h2>
      <p class="text-lg text-gray-600 mb-2">
        Count: <span class="font-semibold text-blue-600">{{ count() }}</span>
      </p>
      <p class="text-lg text-gray-600 mb-4">
        Doubled:
        <span class="font-semibold text-green-600">{{ doubled() }}</span>
      </p>
      <div class="space-x-2">
        <button
          (click)="increment()"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Increment
        </button>
        <button
          (click)="decrement()"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Decrement
        </button>
        <button
          (click)="reset()"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
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
