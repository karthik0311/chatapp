import firebase from 'firebase';
import { Injectable } from '@angular/core';
import {Events } from 'ionic-angular';

@Injectable()
export class GroupsProvider {
  firegroup = firebase.database().ref('/groups');
  mygroups = [];
  constructor(public events: Events) {
    
  }

  addgroup(newGroup){
    console.log("newGroup");
    console.log(newGroup);
    var promise = new Promise ((resolve, reject) => {
     this.firegroup.child(firebase.auth().currentUser.uid).child(newGroup.groupName).set({
       groupimage: newGroup.groupPic,
       msgboard: '',
       owner: firebase.auth().currentUser.uid
     }).then(() => {
       console.log("its true");
       
       resolve(true);
     }).catch((err) => {
      console.log("its false");
      console.log(err);
      
       reject(err);
     })
    });
    return promise;
  }
getmygroups() {
  this.firegroup.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
    this.mygroups = [];
    if (snapshot.val() !=null) {
      var temp = snapshot.val();
      for (var key in temp){
        let newgroup = {
          groupName: key,
          groupimage: temp[key].groupimage
        }
        this.mygroups.push(newgroup);
      }
    }
    this.events.publish('newgroup');
  })
}
}
