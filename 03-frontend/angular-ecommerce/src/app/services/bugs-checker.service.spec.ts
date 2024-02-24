import { TestBed } from '@angular/core/testing';

import { BugsCheckerService } from './bugs-checker.service';

describe('BugsCheckerService', () => {
  let service: BugsCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BugsCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
