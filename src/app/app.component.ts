import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simplecrm';

  constructor(public authService: AuthenticationService, private router: Router) { };

  //ein kleiner Test um Observable zu verstehen
  ngOnInit() {
    const array = [10, 20, 30];
    const result = from(array);
    console.log('Das array wird zu einem Observable: ',result);
    
    result.subscribe(x => console.log(x));
  }

  logOut() {
    //   //logging out via promise
    //   this.authService.logout();
    //   this.router.navigate(['']);
    // }
  
    //logging out via observable
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }
}

