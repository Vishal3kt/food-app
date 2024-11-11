import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm: FormGroup
  signupResponse: any;

  constructor(private api: ApiService, private fb: FormBuilder, private snackbar: MatSnackBar, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['Vishal', Validators.required],
      lastName: ['Mokashi', Validators.required],
      email: ['vnm@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      dob: ['27/05/1999', Validators.required],
      phoneNumber: ['7676208117', [Validators.required]]
    });
  }

  adminSignup() {
    if (this.signupForm.valid) {
      const form = this.signupForm.value;
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        dob: form.dob,
        phoneNumber: form.phoneNumber
      }

      this.api.adminSignup(payload).subscribe({
        next: (res: any) => {
          this.signupResponse = res;
          console.log(this.signupResponse);

          const token = this.signupResponse;
          localStorage.setItem('userInfo', JSON.stringify(token));

          this.snackbar.open('User registered successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.router.navigate(['/login/signin']);
        }, error: (err: any) => {
          console.log(err);
          if (err.error.message == "email id already registered") {
            this.snackbar.open('User with the same email ID already exists!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          } else {
            this.snackbar.open('Failed to register user!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          }
        }
      })
    }
  }


}
