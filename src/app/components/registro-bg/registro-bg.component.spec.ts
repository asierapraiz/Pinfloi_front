import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroBgComponent } from './registro-bg.component';

describe('RegistroBgComponent', () => {
  let component: RegistroBgComponent;
  let fixture: ComponentFixture<RegistroBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroBgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
