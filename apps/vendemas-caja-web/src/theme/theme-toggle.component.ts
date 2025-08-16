import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService, ThemeMode } from './theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  template: `
    <div class="theme-toggle-container">
      <!-- Quick toggle button -->
      <button
        mat-icon-button
        [matTooltip]="getToggleTooltip()"
        (click)="toggleTheme()"
        [attr.aria-label]="getToggleAriaLabel()"
        class="theme-toggle-btn"
        [class.dark]="isDark()"
      >
        <mat-icon [svgIcon]="getToggleIcon()"></mat-icon>
      </button>

      <!-- Theme menu for more options -->
      <button
        mat-icon-button
        [matMenuTriggerFor]="themeMenu"
        [matTooltip]="'More theme options'"
        aria-label="Open theme options menu"
        class="theme-menu-btn"
      >
        <mat-icon>more_vert</mat-icon>
      </button>

      <mat-menu #themeMenu="matMenu" class="theme-menu">
        <button
          mat-menu-item
          (click)="setTheme('light')"
          [class.active]="isThemeActive('light')"
          [attr.aria-label]="'Set light theme'"
        >
          <mat-icon>light_mode</mat-icon>
          <span>Light</span>
          <mat-icon *ngIf="isThemeActive('light')" class="check-icon"
            >check</mat-icon
          >
        </button>

        <button
          mat-menu-item
          (click)="setTheme('dark')"
          [class.active]="isThemeActive('dark')"
          [attr.aria-label]="'Set dark theme'"
        >
          <mat-icon>dark_mode</mat-icon>
          <span>Dark</span>
          <mat-icon *ngIf="isThemeActive('dark')" class="check-icon"
            >check</mat-icon
          >
        </button>

        <button
          mat-menu-item
          (click)="setTheme('system')"
          [class.active]="isThemeActive('system')"
          [attr.aria-label]="'Use system theme'"
        >
          <mat-icon>settings_system_daydream</mat-icon>
          <span>System</span>
          <mat-icon *ngIf="isThemeActive('system')" class="check-icon"
            >check</mat-icon
          >
        </button>
      </mat-menu>
    </div>
  `,
  styles: [
    `
      .theme-toggle-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .theme-toggle-btn {
        transition: all 0.2s ease-in-out;
        border-radius: 50%;
      }

      .theme-toggle-btn:hover {
        transform: scale(1.1);
      }

      .theme-toggle-btn.dark {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .theme-menu-btn {
        opacity: 0.7;
        transition: opacity 0.2s ease-in-out;
      }

      .theme-menu-btn:hover {
        opacity: 1;
      }

      .theme-menu {
        min-width: 200px;
      }

      .theme-menu button[mat-menu-item] {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
      }

      .theme-menu button[mat-menu-item] .check-icon {
        margin-left: auto;
        color: var(--mdc-filled-button-container-color, #4caf50);
      }

      .theme-menu button[mat-menu-item].active {
        background-color: rgba(76, 175, 80, 0.1);
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .theme-toggle-container {
          gap: 0.25rem;
        }

        .theme-menu-btn {
          display: none;
        }
      }

      /* High contrast mode support */
      @media (prefers-contrast: high) {
        .theme-toggle-btn,
        .theme-menu-btn {
          border: 2px solid currentColor;
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        .theme-toggle-btn,
        .theme-menu-btn {
          transition: none;
        }

        .theme-toggle-btn:hover {
          transform: none;
        }
      }
    `,
  ],
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);

  // Reactive signals
  readonly isDark = this.themeService.isDark;
  readonly themeMode = this.themeService.themeMode;

  // Computed values
  readonly isThemeActive = (theme: ThemeMode): boolean =>
    this.themeService.isThemeActive(theme);

  getToggleIcon(): string {
    const mode = this.themeMode();
    if (mode === 'system') {
      return this.isDark() ? 'dark_mode' : 'light_mode';
    }
    return mode === 'dark' ? 'dark_mode' : 'light_mode';
  }

  getToggleTooltip(): string {
    const mode = this.themeMode();
    if (mode === 'system') {
      return `System theme (${this.isDark() ? 'Dark' : 'Light'})`;
    }
    return `${mode === 'dark' ? 'Dark' : 'Light'} theme`;
  }

  getToggleAriaLabel(): string {
    const mode = this.themeMode();
    if (mode === 'system') {
      return `Toggle theme (currently system: ${this.isDark() ? 'dark' : 'light'})`;
    }
    return `Toggle theme (currently ${mode})`;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setTheme(mode: ThemeMode): void {
    this.themeService.setTheme(mode);
  }
}
