import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const form = this.forgotPasswordForm.value;
      const payload = {
        email: form.email,
        password: form.password
      }

      this.api.adminForgotPassword(payload).subscribe({
        next: (res: any) => {
          console.log(res);
        }
      })
    }
  }
}
