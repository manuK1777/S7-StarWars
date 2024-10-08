import { TestBed } from '@angular/core/testing';

import { GetStarshipService } from './get-starship.service';

describe('GetStarshipService', () => {
  let service: GetStarshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStarshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
