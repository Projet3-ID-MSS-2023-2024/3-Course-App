import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VilleAddComponent } from './ville-add.component';

describe('VilleAddComponent', () => {
  let component: VilleAddComponent;
  let fixture: ComponentFixture<VilleAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VilleAddComponent]
    });
    fixture = TestBed.createComponent(VilleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
