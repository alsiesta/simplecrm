import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  userId = '';
  user: any = {};
  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id');
      let docRef = this.firestoreService.getDocRef(this.userId);
      this.firestoreService.getDocData(docRef).subscribe((userData) => {
        this.user = userData;
      });
    });
  }

  editUserAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user); //durch new User() erstelle ich eine neue Kopie von meinem User Obj. Wenn ich das nicht machen würde, würde ich durch two-way binding dieses Object in Memory editieren - egal ob ich save drücke oder nur cancel.
  }

  editUser() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
  }
}
