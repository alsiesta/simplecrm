import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../firestore.service';

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
    private firestoreService: FirestoreService
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

  openAddressDialog() {
    
  }
  
  editAddressMenu() { }
  

  openUserDialog() {
    
  }
  editUserMenu() {
    
  }
}
