import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import {
  Auth,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth, private toast: HotToastService) {}

  // VIA PROMISE
  async userSignUp(email, password) {
    const signUpEmail = email;
    const signUpPassword = password;
    createUserWithEmailAndPassword(this.auth, signUpEmail, signUpPassword)
      .then(
        (value) => {
          const user = value.user;
          console.log('Your account has been created!', user);
        },
        (reason: any) => {
          console.error('Promise was rejected', reason);
          //  throw reason;
        }
      )
      .then(() => {
        this.toast.info("I must be super-useful!")
        this.toast.loading("I must be super-useful!")
        this.toast.success("I must be super-useful!")
        this.toast.error("I must be super-useful!")
      });
  }

  // // VIA OBSERVABLE
  // signUp(email: string, password: string): Observable<UserCredential> {
  //   return from(createUserWithEmailAndPassword(this.auth, email, password));
  // }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  logout() {
    return from(this.auth.signOut());
  }
}
