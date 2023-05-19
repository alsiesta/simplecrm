import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { FirestoreService } from '../services/firestore.service';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss'],
})
export class DialogEditAddressComponent {
  user = new User();
  loading: boolean = false;
  userId: string;
  constructor(private firestoreService: FirestoreService,public dialogRef: MatDialogRef<DialogAddUserComponent>) {}
  
  saveUser() {
    this.loading = true;
    this.firestoreService.updateDocument(this.userId, this.user.toJSON());
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close()
    }, 500);
  }
}
