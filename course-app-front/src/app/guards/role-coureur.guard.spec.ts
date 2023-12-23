import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleCoureurGuard } from './role-coureur.guard';

describe('roleCoureurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleCoureurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
