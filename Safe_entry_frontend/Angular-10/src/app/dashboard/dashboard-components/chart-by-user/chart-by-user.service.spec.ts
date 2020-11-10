import { TestBed } from '@angular/core/testing';

import { ChartByUserService } from './chart-by-user.service';

describe('ChartByUserService', () => {
  let service: ChartByUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartByUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
