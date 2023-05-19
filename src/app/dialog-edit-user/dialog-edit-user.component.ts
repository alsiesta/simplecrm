import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { FirestoreService } from '../services/firestore.service';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user = new User();
  loading: boolean = false;
  birthDate: Date;
  userId: string;
  constructor(private firestoreService: FirestoreService, public dialogRef: MatDialogRef<DialogAddUserComponent>) { }
  
  saveUser() {
    this.loading = true;
    // this.user.birthDate = this.birthDate.getTime();
    this.firestoreService.updateDocument(this.userId, this.user.toJSON());
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close()
    }, 500);
  }
  
}


