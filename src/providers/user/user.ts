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
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        console.log("am inside");
        console.log(newuser);
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,//after update it will display name
          photoURL: ''//as of now blank
        }).then(() => {//idhu edhku nu seriya puriyala
          console.log("am inside 2");
          console.log(this.afireauth.auth.currentUser.uid);
          console.log(newuser);
          console.log(newuser.displayname);
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
  
          uid: this.afireauth.auth.currentUser.uid,
            displayname: newuser.displayname,
            photoURL: ''
          }).then(() => {
            console.log("am in firedata");
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
  passwordreset(email){
    var promise = new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({ success:true });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: this.afireauth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(() =>{
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          displayName: this.afireauth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
      })
    })
    return promise;
  }
}

