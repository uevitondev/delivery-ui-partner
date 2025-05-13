import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-signin',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './auth-signin.component.html',
  styleUrl: './auth-signin.component.scss',
})
export class AuthSignInComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  signinForm!: FormGroup;
  isLoading: boolean = false;
  message!: string;

  ngOnInit(): void {
    this.onInitSignInForm();
  }

  onInitSignInForm() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
    });
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

  onSubmit() {
    this.isLoading = true;
    if (this.signinForm.invalid) {
      this.isLoading = false;
      return;
    }

    this.authService
      .signin({
        username: this.email?.value,
        password: this.password?.value,
      })
      .subscribe({
        next: (reponse) => {
         console.log("partner logou")
        },
        error: (e) => {
          if (e.status == 401) {
            this.message = e.error.detail;
          }          
          this.isLoading = false;
        },
      });
  }
}
