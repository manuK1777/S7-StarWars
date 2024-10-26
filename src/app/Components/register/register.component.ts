import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../models/user.model';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



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

    this.authService.checkEmailExists(formData.email).subscribe({
      next: (users) => {
      
        if (users.length > 0) { 
          console.error('Email already registered');
          alert('This email is already registered. Please use a different one.');

        } else {

          this.authService.registerUser(formData).subscribe({
            next: (response) => {
              console.log('Registration successful', response);
              alert('User registered successfully!');
              this.router.navigate(['/login']);
            },
            error: (error) => {
              console.error('Error during registration', error);
            },
            complete: () => {
              console.log('Registration completed');
            }
          });
        }
      },
      error: (error) => {
        console.error('Error checking email', error);
      }
    });
  } else {
    console.error('Form is invalid');
    alert('Please fill out the form correctly.');
  }
}
}
