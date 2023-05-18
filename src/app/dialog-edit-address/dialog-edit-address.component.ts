import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss'],
})
export class DialogEditAddressComponent {
  user = new User();
  loading: boolean = false;
  userId: string;
  constructor(private firestoreService: FirestoreService) {}
  saveUser() {
    this.firestoreService.updateDocument(this.userId, this.user.toJSON());
  }
}
