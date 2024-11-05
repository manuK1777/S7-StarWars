import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../models/user.model';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, RouterLinkActive, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registrationForm: FormGroup;

  user: User = {
    name: '',
    email: '',
    password: '',
  };

  registrationError: any;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, 
    private router: Router ) {

  this.registrationForm = this.formBuilder.group({
    name: ['', Validators.required], 
    email: ['', [Validators.required, Validators.email]], 
    password: ['', [Validators.required, Validators.minLength(6)]], 
  });
}

onSubmit() {
  if (this.registrationForm.valid) {
    const formData: User = this.registrationForm.value;

    this.authService.checkEmailExists(formData.email).pipe(
      switchMap((users) => {
        if (users.length > 0) {
          throw new Error('Email already registered');
        } else {
          return this.authService.registerUser(formData);
        }
      }),
      switchMap((response) => {
        console.log('Registration successful', response);
        alert('User registered successfully!');
        return this.authService.loginUser(formData);
      })
    ).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error during registration or login', error);
        this.registrationError = error.message;
      }
    });
  } else {
    console.error('Form is invalid');
    alert('Please fill out the form correctly.');
  }
}
}
