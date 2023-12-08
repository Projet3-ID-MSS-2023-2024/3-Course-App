import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mdpTempGuard } from './mdp-temp.guard';

describe('mdpTempGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mdpTempGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
