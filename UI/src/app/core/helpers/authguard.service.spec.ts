import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';

import { AuthguardService } from './authguard.service';

describe('AuthguardService', () => {
  let service: AuthguardService;
  class MockDummyService extends AuthService {
    // mock everything used by the component
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientModule],
      providers:[{provide: AuthService, useClass:MockDummyService}]
    });
    service = TestBed.inject(AuthguardService);
   
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
