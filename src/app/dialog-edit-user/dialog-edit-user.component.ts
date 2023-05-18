import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { FirestoreService } from '../firestore.service';

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
  constructor(private firestoreService: FirestoreService) {}
  saveUser() {
    this.firestoreService.updateDocument(this.userId, this.user.toJSON());
  }
}


