import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import {
  Auth,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator,
  updateProfile,
  getAuth,
  user,
  onAuthStateChanged
} from '@angular/fire/auth';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth, private toast: HotToastService) {
    connectAuthEmulator(auth, 'http://localhost:9099'); //emmulating fire auth on local mashine
  }

  ngOnInit() {
    console.log(this.currentUser$);
    
  }
  // // VIA PROMISE
  loginEmailPassword = async (email, password) => {
    const userCredentials = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return userCredentials;
  };

  signUp = async (email, password, name) => {
    const userCredentials = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    ).then((userCredential => {
      console.log('Dieses sind sie: ',userCredential);
      console.log('Name ist: ',name);
      
    }));
    return userCredentials;
  };

    logOut() {
      return this.auth.signOut(); //logging out via promise
      
    // return from(this.auth.signOut()); //logging out via observable
  }

  monitorAuthState = async () => {
    onAuthStateChanged(this.auth, user => {
      if (user) {
        return user
      } else {
        return null;
      }
    })
  }

  ////via other Promise
  // async userSignUp(email, password) {
  //   const signUpEmail = email;
  //   const signUpPassword = password;
  //   createUserWithEmailAndPassword(this.auth, signUpEmail, signUpPassword).then(
  //     (value) => {
  //       // const user = value.user;
  //       // console.log('Your account has been created!', user);
  //       this.toast.success('Your account has been created!');
  //       console.log(this.currentUser$);

  //     },
  //     (reason: any) => {
  //       // console.error(typeof reason); // to find out the type of the error result
  //       // const json = JSON.stringify(reason); // to understand the key/value pairs of the object

  //       const codeValue = reason.customData._tokenResponse.error.message // expected output: "EMAIL_EXISTS"
  //       if (codeValue === 'EMAIL_EXISTS') {
  //         this.toast.error("SORRY! This email is already in use.");
  //         console.log(
  //           this.currentUser$.subscribe(res => {
  //             if (res) {
  //               console.log('Current logged in user is: ', res.email)
  //             } else {
  //               console.log('There is no user logged in currently.');
  //             };

  //           }));
  //       }

  //       // const codeValue = reason.code // expected output: "auth/email-already-in-use"
  //       // console.log(codeValue); // Output: "auth/email-already-in-use"
  //       // if (codeValue === 'auth/email-already-in-use') {
  //       //   this.toast.error("This email is already in use!");
  //       // }
  //     }
  //   );
  // }




  // // VIA OBSERVABLE
  // signUp(email: string, password: string): Observable<UserCredential> {
  //   return from(createUserWithEmailAndPassword(this.auth, email, password));
  // }

  // login(username: string, password: string) {
  //   return from(signInWithEmailAndPassword(this.auth, username, password));
  // }

  // logout() {
  //   // return this.auth.signOut(); //logging out via promise
  //   return from(this.auth.signOut()); //logging out via observable
  // }
}
