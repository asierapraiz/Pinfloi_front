import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodoDosComponent } from './nodo-dos.component';

describe('NodoDosComponent', () => {
  let component: NodoDosComponent;
  let fixture: ComponentFixture<NodoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodoDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
