import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service'; // Import AuthService if it is used as a provider
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),         
        provideHttpClientTesting(),    
        AuthGuardService,              
        AuthService                   
      ]
    });

    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
