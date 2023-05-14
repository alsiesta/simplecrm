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
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private usersCollection: CollectionReference<DocumentData>;
  private docRef: DocumentReference<any>;

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

  getDocData() {
    const userData = docData(this.docRef);
    return userData;
  }

  createDoc(user) {
    // user = new User();
    return addDoc(this.usersCollection, user.toJSON())
      .then((result) => {
        console.log(result);
    })
    // //unten setze ich innerhalb der {} den user nochmals in ein user{}. Und deswegen muss ich das in game.ts deconstructen
    // let user = new User();
    // return addDoc(this.usersCollection, { user: user.toJSON() });
  }

  // updateDoc() {
  //   updateDoc(this.docRef, this.user.toJSON() );
  // }

}
