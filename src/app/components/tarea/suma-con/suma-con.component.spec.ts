import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumaConComponent } from './suma-con.component';

describe('SumaConComponent', () => {
  let component: SumaConComponent;
  let fixture: ComponentFixture<SumaConComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumaConComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumaConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
