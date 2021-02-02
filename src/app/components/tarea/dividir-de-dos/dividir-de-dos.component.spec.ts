import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividirDeDosComponent } from './dividir-de-dos.component';

describe('DividirDeDosComponent', () => {
  let component: DividirDeDosComponent;
  let fixture: ComponentFixture<DividirDeDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividirDeDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividirDeDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
