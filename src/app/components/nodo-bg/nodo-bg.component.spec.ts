import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodoBgComponent } from './nodo-bg.component';

describe('NodoBgComponent', () => {
  let component: NodoBgComponent;
  let fixture: ComponentFixture<NodoBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodoBgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodoBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
