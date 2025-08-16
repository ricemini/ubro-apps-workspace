import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from './theme.service';
import { ThemeToggleComponent } from './theme-toggle.component';

@Component({
  selector: 'app-theme-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    ThemeToggleComponent,
  ],
  template: `
    <div class="theme-demo-container p-6">
      <!-- Header with theme toggle -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-display text-secondary">
          Material Design 3 Theme Demo
        </h1>
        <app-theme-toggle />
      </div>

      <!-- Theme information -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <mat-card class="elevation-1">
          <mat-card-header>
            <mat-card-title>Current Theme</mat-card-title>
            <mat-card-subtitle>Active theme configuration</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p><strong>Mode:</strong> {{ themeMode() }}</p>
            <p><strong>Effective:</strong> {{ getEffectiveTheme() }}</p>
            <p><strong>System:</strong> {{ isSystem() ? 'Yes' : 'No' }}</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="elevation-1">
          <mat-card-header>
            <mat-card-title>Color Palette</mat-card-title>
            <mat-card-subtitle>Design system colors</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-primary"></div>
                <span class="text-on-surface">Primary</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-secondary"></div>
                <span class="text-on-surface">Secondary</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-tertiary"></div>
                <span class="text-on-surface">Tertiary</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-error"></div>
                <span class="text-on-surface">Error</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="elevation-1">
          <mat-card-header>
            <mat-card-title>Accessibility</mat-card-title>
            <mat-card-subtitle>WCAG compliance</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p class="text-success">✓ AA Contrast</p>
            <p class="text-success">✓ AAA Where applicable</p>
            <p class="text-success">✓ High contrast support</p>
            <p class="text-success">✓ Reduced motion support</p>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Component showcase -->
      <mat-tab-group>
        <mat-tab label="Buttons & Actions">
          <div class="p-6 space-y-4">
            <div class="flex flex-wrap gap-4">
              <button mat-raised-button color="primary">Primary</button>
              <button mat-raised-button color="accent">Secondary</button>
              <button mat-raised-button color="warn">Error</button>
              <button mat-outlined-button>Outlined</button>
              <button mat-button>Text</button>
              <button mat-icon-button matTooltip="Icon Button">
                <mat-icon>favorite</mat-icon>
              </button>
            </div>

            <div class="flex flex-wrap gap-4">
              <button mat-fab color="primary">
                <mat-icon>add</mat-icon>
              </button>
              <button mat-mini-fab color="accent">
                <mat-icon>edit</mat-icon>
              </button>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Form Controls">
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Text Input</mat-label>
                <input matInput placeholder="Enter text here" />
                <mat-icon matSuffix>edit</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Select Option</mat-label>
                <mat-select>
                  <mat-option value="option1">Option 1</mat-option>
                  <mat-option value="option2">Option 2</mat-option>
                  <mat-option value="option3">Option 3</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <mat-checkbox>Checkbox</mat-checkbox>
                <mat-radio-group>
                  <mat-radio-button value="option1">Radio 1</mat-radio-button>
                  <mat-radio-button value="option2">Radio 2</mat-radio-button>
                </mat-radio-group>
              </div>

              <div class="space-y-4">
                <label>Slider: {{ sliderValue() }}</label>
                <mat-slider [max]="100" [min]="0" [(ngModel)]="sliderValue" />
              </div>

              <mat-slide-toggle>Toggle Switch</mat-slide-toggle>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Data Display">
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <mat-card class="elevation-1">
                <mat-card-header>
                  <mat-card-title>Card Title</mat-card-title>
                  <mat-card-subtitle>Card subtitle</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <p>
                    This is a Material Design card component with elevation and
                    proper theming.
                  </p>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-button>Action 1</button>
                  <button mat-button>Action 2</button>
                </mat-card-actions>
              </mat-card>

              <div class="space-y-4">
                <div class="space-y-2">
                  <label>Progress Bar</label>
                  <mat-progress-bar
                    mode="determinate"
                    [value]="progressValue()"
                  />
                </div>

                <div class="space-y-2">
                  <label>Chips</label>
                  <div class="flex flex-wrap gap-2">
                    <mat-chip>Basic</mat-chip>
                    <mat-chip color="primary" selected>Selected</mat-chip>
                    <mat-chip color="accent">Accent</mat-chip>
                    <mat-chip color="warn">Warning</mat-chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Navigation">
          <div class="p-6 space-y-6">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Tabs</h3>
              <p>
                You're currently viewing the Navigation tab. The tab system
                automatically adapts to the current theme.
              </p>
            </div>

            <mat-divider />

            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Breadcrumbs</h3>
              <nav class="flex" aria-label="Breadcrumb">
                <ol class="flex items-center space-x-2">
                  <li>
                    <a href="#" class="text-primary hover:underline interactive"
                      >Home</a
                    >
                  </li>
                  <li class="text-on-surface-variant">/</li>
                  <li>
                    <a href="#" class="text-primary hover:underline interactive"
                      >Components</a
                    >
                  </li>
                  <li class="text-on-surface-variant">/</li>
                  <li class="text-on-surface" aria-current="page">
                    Theme Demo
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>

      <!-- Interactive demo -->
      <div class="mt-8">
        <mat-card class="elevation-2">
          <mat-card-header>
            <mat-card-title>Interactive Demo</mat-card-title>
            <mat-card-subtitle
              >Test theme switching and component behavior</mat-card-subtitle
            >
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <p>
                Use the theme toggle in the top right to switch between light,
                dark, and system themes.
              </p>
              <p>
                Notice how all components automatically adapt to the selected
                theme while maintaining accessibility standards.
              </p>

              <div class="flex gap-4">
                <button
                  mat-raised-button
                  color="primary"
                  (click)="showSnackbar('success')"
                >
                  Success Message
                </button>
                <button
                  mat-raised-button
                  color="warn"
                  (click)="showSnackbar('error')"
                >
                  Error Message
                </button>
                <button
                  mat-raised-button
                  color="accent"
                  (click)="showSnackbar('warning')"
                >
                  Warning Message
                </button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .theme-demo-container {
        min-height: 100vh;
        background-color: var(--vendemas-background);
        color: var(--vendemas-on-background);
      }

      .text-display {
        font-family: var(--vendemas-font-family-display);
        font-weight: var(--vendemas-font-weight-bold);
      }

      .text-secondary {
        color: var(--vendemas-secondary);
      }

      .bg-primary {
        background-color: var(--vendemas-primary);
      }

      .bg-secondary {
        background-color: var(--vendemas-secondary);
      }

      .bg-tertiary {
        background-color: var(--vendemas-tertiary);
      }

      .bg-error {
        background-color: var(--vendemas-error);
      }

      .text-on-surface-variant {
        color: var(--vendemas-on-surface-variant);
      }

      .text-on-surface {
        color: var(--vendemas-on-surface);
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .theme-demo-container {
          padding: 1rem;
        }

        h1 {
          font-size: 2rem;
        }
      }

      /* High contrast mode support */
      @media (prefers-contrast: high) {
        .theme-demo-container {
          border: 2px solid currentColor;
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        .theme-demo-container * {
          transition: none !important;
          animation: none !important;
        }
      }
    `,
  ],
})
export class ThemeDemoComponent {
  private readonly themeService = inject(ThemeService);
  private readonly snackBar = inject(MatSnackBar);

  // Reactive signals
  readonly themeMode = this.themeService.themeMode;
  readonly isSystem = this.themeService.isSystem;

  // Demo state
  readonly sliderValue = signal(50);
  readonly progressValue = signal(75);

  getEffectiveTheme(): string {
    return this.themeService.getEffectiveTheme();
  }

  showSnackbar(type: 'success' | 'error' | 'warning'): void {
    const message = `${type.charAt(0).toUpperCase() + type.slice(1)} message displayed!`;
    const config = {
      duration: 3000,
      panelClass: type,
    };

    this.snackBar.open(message, 'Close', config);
  }
}
