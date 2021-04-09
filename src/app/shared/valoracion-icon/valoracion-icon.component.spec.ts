import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionIconComponent } from './valoracion-icon.component';

describe('ValoracionIconComponent', () => {
  let component: ValoracionIconComponent;
  let fixture: ComponentFixture<ValoracionIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValoracionIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoracionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
