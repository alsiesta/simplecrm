import { Injectable } from '@angular/core';
import { AuthErrorCodes } from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toast: HotToastService) { }

  showLoginError(error: { code: string; }) {
    alert(error)
    // if (error.code === 'FirebaseError: Firebase: Error (auth/wrong-password).' ) {
    //   this.toast.observe({
    //     error:'Sorry. Wrong password.'
    //   })
    // }
    //   this.toast.observe({
    //     success: 'Logged in successfully',
    //     loading: 'Logging in...',
    //     error:'There was an error'
    //   })
  }

}
