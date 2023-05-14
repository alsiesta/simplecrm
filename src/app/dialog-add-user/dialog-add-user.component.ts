import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection } from '@angular/fire/firestore';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  constructor(private firestoreService: FirestoreService) {}
  user = new User();
  birthDate: Date; //first binding the date input as DateObject
  loading: boolean = false;

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime(); //then transforming the DateObject into a timestamp (number), which is easier to store in firebase
    this.firestoreService.createDoc(this.user);
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
