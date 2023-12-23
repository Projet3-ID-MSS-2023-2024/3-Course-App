import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { firstAdminGuard } from './first-admin.guard';

describe('firstAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => firstAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
