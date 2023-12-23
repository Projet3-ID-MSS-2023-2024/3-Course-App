import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleGestionnaireGuard } from './role-gestionnaire.guard';

describe('roleGestionnaireGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleGestionnaireGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
