import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { App } from './app';
import { NxWelcome } from './nx-welcome';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, NxWelcome],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as unknown as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome vendemas-caja-web'
    );
  });
});
