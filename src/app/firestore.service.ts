import { Injectable } from '@angular/core';
import { User } from 'src/models/user.class';

import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  docData,
  DocumentData,
  DocumentReference,
  Firestore,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private usersCollection: CollectionReference<DocumentData>;
  private docRef: DocumentReference<any>;
  users: any[] = []; // Array to store user entries


  constructor(private firestore: Firestore) { 
    this.usersCollection = collection(this.firestore, 'users');
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
    return addDoc(this.usersCollection, user.toJSON())
      .then((result) => {
        // console.log(result);
    })
  }

  getUsers = async () => {
    onSnapshot(this.usersCollection, (snapshot) => {
      this.users = [];
      snapshot.forEach((doc) => {
        const user = doc.data();
        this.users.push(user);
      });
      console.log(this.users);

    });
  };


}
