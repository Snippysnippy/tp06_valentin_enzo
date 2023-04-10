import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireSaisieClientComponent } from './formulaire-saisie-client.component';

describe('FormulaireSaisieClientComponent', () => {
  let component: FormulaireSaisieClientComponent;
  let fixture: ComponentFixture<FormulaireSaisieClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireSaisieClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireSaisieClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
