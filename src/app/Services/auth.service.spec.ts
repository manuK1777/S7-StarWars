import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),  
        AuthService,
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
    localStorage.clear(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should check if email exists via GET request', () => {
    const email = 'test@example.com';

    service.checkEmailExists(email).subscribe(response => {
      expect(response).toEqual([{ email }]);
    });

    const req = httpMock.expectOne(`http://localhost:3000/users?email=${email}`);
    expect(req.request.method).toBe('GET');
    req.flush([{ email }]);
  });

  it('should login a user and store the token', () => {
    const credentials = { email: 'test@example.com', password: '123456' };
    const mockToken = 'mock-token';

    service.loginUser(credentials).subscribe(response => {
      expect(response.accessToken).toBe(mockToken);
      expect(localStorage.getItem('token')).toBe(mockToken);
    });

    const req = httpMock.expectOne('http://localhost:3000/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);
    req.flush({ accessToken: mockToken });
  });

  it('should return true if user is logged in', () => {
    localStorage.setItem('token', 'mock-token');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if user is not logged in', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should logout the user by removing the token', () => {
    localStorage.setItem('token', 'mock-token');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
