import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private auth: Auth,
    public authService: AuthenticationService,
    private router: Router
  ) {}

  user$ = this.authService.currentUser$;
  title = 'simplecrm';

  // //ein kleiner Test um Observable zu verstehen
  // ngOnInit() {
  //   const array = [10, 20, 30];
  //   const result = from(array);
  //   console.log('Das array wird zu einem Observable: ',result);
  //   result.subscribe(x => console.log(x));
  // }

  logOut() {
    //logging out via promise
    this.authService.logOut();
    this.router.navigate(['']);
  }

  // //logging out via observable
  // this.authService.logOut().subscribe(() => {
  //   this.router.navigate(['']);
  // })
  // }
}
