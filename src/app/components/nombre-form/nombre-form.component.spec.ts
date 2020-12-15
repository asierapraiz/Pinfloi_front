import { ComponentFixture, TestBed } from '@angular/core/testing';



import { NombreFormComponent } from './nombre-form.component';



describe('NombreFormComponent', () => {
  let component: NombreFormComponent;
  let fixture: ComponentFixture<NombreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NombreFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
