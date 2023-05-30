import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorService } from 'src/app/services/error.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { signInWithEmailAndPassword, Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private auth: Auth,
    private errServ: ErrorService,
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async submit() {
    const { email, password } = this.loginForm.value; //destructure obj. first

    if (!this.loginForm.valid) {
      return;
    }
    try {
      const userCredentials = await this.authService.loginEmailPassword(
        email,
        password
      );
      console.log('User Credentials: ', userCredentials.user);
      this.router.navigate(['/home']);
      this.toast.observe({
            success: 'Logged in successfully',
            loading: 'Logging in...',
            error:'There was an error'
          })
    } catch (error) {
      console.warn(error);
      this.errServ.showLoginError(error);
    }
  }

  // // via Observable
  // this.authService.login(email, password).pipe(
  //   this.toast.observe({
  //     success: 'Logged in successfully',
  //     loading: 'Logging in...',
  //     error:'There was an error'
  //   })
  // ).subscribe(() => {
  //   this.router.navigate(['/home']);
  // });
}
