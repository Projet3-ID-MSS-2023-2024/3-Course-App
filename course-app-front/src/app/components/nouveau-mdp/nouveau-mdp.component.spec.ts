import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauMdpComponent } from './nouveau-mdp.component';

describe('NouveauMdpComponent', () => {
  let component: NouveauMdpComponent;
  let fixture: ComponentFixture<NouveauMdpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NouveauMdpComponent]
    });
    fixture = TestBed.createComponent(NouveauMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
