import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorService } from 'src/app/services/error.service';
import { UsersService } from 'src/app/services/users.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    private auth: Auth,
    private errServ: ErrorService,
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService,
    private usersService: UsersService,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  submit() {
    const { name, email, password } = this.signUpForm.value;
    if (!this.signUpForm.valid || !name || !password || !email) {
      return;
    }
    this.authService.signUp(email, password, name);
    this.router.navigate(['/home']);
  }

  // submit() {
  //   const { name, email, password } = this.signUpForm.value;
  //   if (!this.signUpForm.valid || !name || !password || !email) {
  //     return;
  //   }

  //   //via Observable
  //   this.authService
  //     .signUp(email, password)
  //     .pipe(
  //       switchMap(({ user: { uid } }) =>
  //         this.usersService.addUser({ uid, email, displayName: name })
  //       ),
  //       this.toast.observe({
  //         success: 'Congrats! You are all signed up',
  //         loading: 'Signing up...',
  //         error: ({ message }) => `${message}`,
  //       })
  //     )
  //     .subscribe(() => {
  //       this.router.navigate(['/home']);
  //     });
  // }
}
