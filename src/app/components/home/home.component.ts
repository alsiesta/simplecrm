import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private authService: AuthenticationService) {
    //  this.user$.subscribe((user) => {
    //     console.log(user, 'this is the current user: ', user.email,'und DisplayName: ', user.displayName);
    // })
  }

  user$ = this.authService.currentUser$;
}
