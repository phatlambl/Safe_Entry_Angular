import { AuthenService } from './authen.service';
import { TestBed } from '@angular/core/testing';


describe('AuthenService', () => {
  let service: AuthenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
