import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapSaisieClientComponent } from './recap-saisie-client.component';

describe('RecapSaisieClientComponent', () => {
  let component: RecapSaisieClientComponent;
  let fixture: ComponentFixture<RecapSaisieClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapSaisieClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecapSaisieClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
