import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';

import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { getTestBed } from '@angular/core/testing';

// Import test functions for global availability
import 'vitest/globals';

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);
