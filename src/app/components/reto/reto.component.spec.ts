import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetoComponent } from './reto.component';

describe('RetoComponent', () => {
  let component: RetoComponent;
  let fixture: ComponentFixture<RetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
