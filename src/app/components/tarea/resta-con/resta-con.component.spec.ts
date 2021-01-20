import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaConComponent } from './resta-con.component';

describe('RestaConComponent', () => {
  let component: RestaConComponent;
  let fixture: ComponentFixture<RestaConComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaConComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
