import { TestBed } from '@angular/core/testing';

import { DeviceLogServiceService } from './device-log-service.service';

describe('DeviceLogServiceService', () => {
  let service: DeviceLogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceLogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
