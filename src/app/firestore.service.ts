import { Injectable } from '@angular/core';
import { User } from 'src/models/user.class';

import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  DocumentData,
  DocumentReference,
  Firestore,
  onSnapshot,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  // approach #1
  private usersSubject = new BehaviorSubject<any[]>([]);
  public users$ = this.usersSubject.asObservable();

  private usersCollection: CollectionReference<DocumentData>;
  private docRef: DocumentReference<any>;
  users: any[] = []; // Array to store user entries

  constructor(private firestore: Firestore) {
    this.usersCollection = collection(this.firestore, 'users');

    onSnapshot(this.usersCollection, (snapshot) => {
      const users: any[] = [];
      snapshot.forEach((doc) => {
        const user = doc.data();
        users.push(user);
      });
      this.usersSubject.next(users)
  });
  }

  getCollection(collectionName: string) {
    return collection(this.firestore, collectionName);
  }

  getDocRef(gameId) {
    this.docRef = doc(this.usersCollection, gameId);
    return this.docRef;
  }

  getDocData(docRef) {
    const userData = docData(docRef);
    return userData;
  }

  createDoc(user) {
    return addDoc(this.usersCollection, user.toJSON()).then((result) => {
    });
  }


  getUsers$() {
    return collectionData(this.usersCollection);
  }



  // getUsers = async () => {
  //   onSnapshot(this.usersCollection, (snapshot) => {
  //     snapshot.forEach((doc) => {
  //       const user = doc.data();
  //       this.users.push(user);
  //     });
  //   });
  //   return this.users;
  // };
}
