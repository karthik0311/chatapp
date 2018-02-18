import firebase from 'firebase';
import { Injectable } from '@angular/core';


@Injectable()
export class GroupsProvider {
  firegroup = firebase.database().ref('/groups');
  constructor() {
    
  }

  addgroup(newGroup){
    var promise = new Promise ((resolve, reject) => {
     this.firegroup.child(firebase.auth().currentUser.uid).child(newGroup.groupname).set({
       groupimage: newGroup.groupPic,
       msgboard: '',
       owner: firebase.auth().currentUser.uid
     }).then(() => {
       resolve(true);
     }).catch((err) => {
       reject(err);
     })
    });
    return promise;
  }

}
