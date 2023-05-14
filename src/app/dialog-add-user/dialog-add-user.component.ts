import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { FirestoreService } from '../firestore.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  constructor(private firestoreService: FirestoreService,public dialogRef: MatDialogRef<DialogAddUserComponent>) {}
  user = new User();
  birthDate: Date; //first binding the date input as DateObject
  loading: boolean = false;

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime(); //then transforming the DateObject into a timestamp (number), which is easier to store in firebase
    this.firestoreService.createDoc(this.user);
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close()
    }, 500);
  }
}
