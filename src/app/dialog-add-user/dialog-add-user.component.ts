import { Component } from '@angular/core';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  //first binding the date input as DateObject
  birthDate: Date;

  saveUser() {
    //then transforming the DateObject into a timestamp (number), which is easier to store in firebase
    this.user.birthDate = this.birthDate.getTime()
  console.log('current user is: ', this.user);
  
}

}
