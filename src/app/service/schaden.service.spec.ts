import { TestBed } from '@angular/core/testing';

import { SchadenService } from './schaden.service';

describe('SchadenService', () => {
  let service: SchadenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchadenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
