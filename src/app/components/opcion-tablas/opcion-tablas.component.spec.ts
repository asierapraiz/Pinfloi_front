import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionTablasComponent } from './opcion-tablas.component';

describe('OpcionTablasComponent', () => {
  let component: OpcionTablasComponent;
  let fixture: ComponentFixture<OpcionTablasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionTablasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionTablasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
