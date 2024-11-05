import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, RouterLinkActive, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],  
      password: ['', Validators.required], 
    });
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.authService.loginUser(loginData).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.loginError = '';  
        },
        error: (error) => {
          console.error('Login error', error);
          this.loginError = 'Invalid email or password.';
        },
        complete: () => {
          console.log('Login process completed');
          this.navigateToStarships()
        }
      });
    } else {
      console.error('Login form is invalid');
    }
  }
  navigateToStarships(): void {
    this.router.navigate(['/starships']);
  }

}
