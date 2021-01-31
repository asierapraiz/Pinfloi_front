import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplicarDeDosComponent } from './multiplicar-de-dos.component';

describe('MultiplicarDeDosComponent', () => {
  let component: MultiplicarDeDosComponent;
  let fixture: ComponentFixture<MultiplicarDeDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplicarDeDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplicarDeDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
