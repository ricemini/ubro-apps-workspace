import { Injectable, signal, computed, effect } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  isSystem: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _themeMode = signal<ThemeMode>('system');
  private readonly _isDark = signal<boolean>(false);
  private readonly _isSystem = computed(() => this._themeMode() === 'system');

  // Public signals for reactive components
  readonly themeMode = this._themeMode;
  readonly isDark = this._isDark;
  readonly isSystem = this._isSystem;

  // Observable for legacy components
  private readonly _themeState$ = new BehaviorSubject<ThemeState>({
    mode: 'system',
    isDark: false,
    isSystem: true,
  });

  readonly themeState$: Observable<ThemeState> =
    this._themeState$.asObservable();

  constructor() {
    this.initializeTheme();
    this.setupThemeEffects();
  }

  private initializeTheme(): void {
    // Check for saved theme preference
    try {
      const savedTheme = localStorage.getItem('vendemas-theme') as ThemeMode;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        this._themeMode.set(savedTheme);
      } else {
        // Default to system preference
        this._themeMode.set('system');
      }
    } catch {
      // Default to system preference if localStorage not available
      this._themeMode.set('system');
    }

    this.applyTheme();
  }

  private setupThemeEffects(): void {
    // Effect to update theme state when mode changes
    effect(() => {
      const mode = this._themeMode();
      const isSystem = this._isSystem();
      const isDark = this._isDark();

      this._themeState$.next({ mode, isDark, isSystem });
    });

    // Effect to apply theme changes
    effect(() => {
      this.applyTheme();
    });
  }

  private applyTheme(): void {
    const mode = this._themeMode();
    let isDark = false;

    if (mode === 'system') {
      isDark = this.getSystemPreference();
    } else {
      isDark = mode === 'dark';
    }

    this._isDark.set(isDark);
    this.updateDocumentClasses(isDark);
    this.updateTailwindClasses(isDark);
  }

  private getSystemPreference(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  private updateDocumentClasses(isDark: boolean): void {
    const html = document.documentElement;

    // Remove existing theme classes
    html.classList.remove('light-theme', 'dark-theme');

    // Add new theme class
    html.classList.add(isDark ? 'dark-theme' : 'light-theme');
  }

  private updateTailwindClasses(isDark: boolean): void {
    const html = document.documentElement;

    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  setTheme(mode: ThemeMode): void {
    if (!['light', 'dark', 'system'].includes(mode)) {
      // Fallback to system theme for invalid modes
      mode = 'system';
    }

    this._themeMode.set(mode);
    try {
      localStorage.setItem('vendemas-theme', mode);
    } catch {
      // Ignore localStorage errors in SSR environments
    }
  }

  toggleTheme(): void {
    const currentMode = this._themeMode();
    if (currentMode === 'system') {
      // If system, toggle to opposite of current system preference
      const isDark = this.getSystemPreference();
      this.setTheme(isDark ? 'light' : 'dark');
    } else {
      // If explicit light/dark, toggle between them
      this.setTheme(currentMode === 'light' ? 'dark' : 'light');
    }
  }

  // Method to get current theme state synchronously
  getCurrentTheme(): ThemeState {
    return {
      mode: this._themeMode(),
      isDark: this._isDark(),
      isSystem: this._isSystem(),
    };
  }

  // Method to check if a specific theme is active
  isThemeActive(theme: ThemeMode): boolean {
    if (theme === 'system') {
      return this._isSystem();
    }
    return this._themeMode() === theme && !this._isSystem();
  }

  // Method to get the effective theme (resolves system preference)
  getEffectiveTheme(): 'light' | 'dark' {
    return this._isDark() ? 'dark' : 'light';
  }
}
