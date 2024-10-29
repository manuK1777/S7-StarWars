import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    const authServiceSpy = jasmine.createSpyObj('AuthService', ['loginUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(), 
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with email and password controls', () => {
    expect(component.loginForm.contains('email')).toBe(true);
    expect(component.loginForm.contains('password')).toBe(true);
  });

  it('should validate form controls', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalse();
    emailControl?.setValue('valid@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should not call AuthService if form is invalid on submit', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    component.onSubmitLogin();
    expect(authService.loginUser).not.toHaveBeenCalled();
  });

  it('should call AuthService and handle successful login', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    authService.loginUser.and.returnValue(of({ token: 'mock-token' })); 

    component.onSubmitLogin();

    expect(authService.loginUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(component.loginError).toBe(''); 
    expect(router.navigate).toHaveBeenCalledWith(['/starships']); 
  });

  it('should display an error message on login failure', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    authService.loginUser.and.returnValue(throwError(() => new Error('Invalid credentials'))); 

    component.onSubmitLogin();

    expect(authService.loginUser).toHaveBeenCalled();
    expect(component.loginError).toBe('Invalid email or password.');
    expect(router.navigate).not.toHaveBeenCalled(); 
  });
});
