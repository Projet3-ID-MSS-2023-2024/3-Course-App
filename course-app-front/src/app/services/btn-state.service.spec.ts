import { TestBed } from '@angular/core/testing';

import { BtnStateService } from './btn-state.service';

describe('BtnStateService', () => {
  let service: BtnStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtnStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
