import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  users: any[] = [];
  allUsers: any[] = [];

  constructor(
    public dialog: MatDialog,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    // approach #2
    // this.firestoreService.users$
    //   .subscribe(users => {
    //   this.users = users;
    //   console.log('From GPT: ',this.users);

    // });

    // approach #1
    this.firestoreService.getUsers$().subscribe((changes) => {
      console.log('My users user: ', changes);
      this.allUsers = changes;
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
