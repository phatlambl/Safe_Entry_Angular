import { TestBed } from '@angular/core/testing';

import { TemperatureSettingServiceService } from './temperature-setting-service.sevice';

describe('TemperatureSettingServiceService', () => {
  let service: TemperatureSettingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemperatureSettingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
