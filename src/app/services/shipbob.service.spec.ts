import { TestBed } from '@angular/core/testing';

import { ShipbobService } from './shipbob.service';

describe('ShipbobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShipbobService = TestBed.get(ShipbobService);
    expect(service).toBeTruthy();
  });
});
