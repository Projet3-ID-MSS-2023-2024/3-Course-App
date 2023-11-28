import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInscriptionComponent } from './confirm-inscription.component';

describe('ConfirmInscriptionComponent', () => {
  let component: ConfirmInscriptionComponent;
  let fixture: ComponentFixture<ConfirmInscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmInscriptionComponent]
    });
    fixture = TestBed.createComponent(ConfirmInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
