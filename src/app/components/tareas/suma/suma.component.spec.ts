import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumaOldComponent } from './suma-old.component';

describe('SumaComponent', () => {
  let component: SumaOldComponent;
  let fixture: ComponentFixture<SumaOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumaOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumaOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
