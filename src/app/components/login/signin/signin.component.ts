import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  siginResponse: any;

  constructor(private api: ApiService, private fb: FormBuilder, private snackbar: MatSnackBar, private router: Router) {
    this.signinForm = this.fb.group({
      email: ['vnm@gmail.com', Validators.required],
      password: ['123456', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  adminSignin() {
    if (this.signinForm.valid) {
      const form = this.signinForm.value;
      const payload = {
        email: form.email,
        password: form.password
      }

      this.api.adminSignin(payload).subscribe({
        next: (res: any) => {
          this.siginResponse = res;

          if (this.siginResponse?.token) {
            localStorage.setItem('userInfo', JSON.stringify(this.siginResponse));
          }

          this.snackbar.open('Login successful!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.router.navigate(['/dashboard/add-user'])
        }, error: (err: any) => {
          console.log(err);
          this.snackbar.open('Login failed!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      })
    }
  }

}
