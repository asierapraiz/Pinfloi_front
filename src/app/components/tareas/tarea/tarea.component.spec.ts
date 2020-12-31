import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaOldComponent } from './tarea-old.component';

describe('TareaComponent', () => {
  let component: TareaOldComponent;
  let fixture: ComponentFixture<TareaOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
