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
  onSnapshot,getFirestore,updateDoc
} from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {private user: User;

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

  getDocData(docRef) {
    const userData = docData(docRef,{
      idField: 'userId'
  });
    return userData;
  }


  updateDocument(id, user) {
    updateDoc(this.getDocRef(id), user)
      .then(() => {
      console.log('A New Document Field has been added to an existing document',); 
      })
      .catch(error => {
        console.log(error);
    })
  }


  createDoc(user) {
    return addDoc(this.usersCollection, user.toJSON()).then((result) => {
      console.log(result);
      
    });
  }


  getUsers$() {
    return collectionData(this.usersCollection,  {
      idField: 'docId'  });
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
