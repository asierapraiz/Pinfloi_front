import { TestBed } from '@angular/core/testing';

import { TareaModalesService } from './tarea-modales.service';

describe('TareaModalesService', () => {
  let service: TareaModalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaModalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
