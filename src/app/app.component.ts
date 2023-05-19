import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simplecrm';

  constructor(public authService: AuthenticationService, private router: Router) { }
  
  logOut() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }
}
