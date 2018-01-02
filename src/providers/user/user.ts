import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class UserProvider {
  //storing in separate user collection
firedata = firebase.database().ref('/chatusers');
  constructor(public afireauth: AngularFireAuth) {
    //console.log('Hello UserProvider Provider');
  }
  //creating user  and updating his profile with profile name simply instances for this user in a diff collection called chat users because it have UID
  adduser(newuser){
    var promise = new Promise((resolve, reject)=>{
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(()=>{
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,//after update it will display name
          photoURL: ''//as of now blank
        }).then(() =>{//idhu edhku nu seriya puriyala
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: ''
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
          
      }).catch((err) =>{
        reject(err);
      })
    })
    return promise;
  }
}
