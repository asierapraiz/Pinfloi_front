import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambiarComponent } from './modal-cambiar.component';

describe('ModalCambiarComponent', () => {
  let component: ModalCambiarComponent;
  let fixture: ComponentFixture<ModalCambiarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCambiarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCambiarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
