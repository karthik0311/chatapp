import { UserProvider } from './../user/user';
import firebase from 'firebase';
import { Injectable } from '@angular/core';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';

@Injectable()
export class ImghandlerProvider {
  nativepath: any;
  firestore = firebase.storage();
  
  constructor(public filechooser: FileChooser) {
    console.log('Hello ImghandlerProvider Provider');
  }
  uploadimage() {
    var promise = new Promise((resolve, reject) =>{
    this.filechooser.open().then((url) => {
      (<any>window).FilePath.resolveNativePath(url, (result) => {
        this.nativepath = result;
    (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
      res.file((resFile) => {
        var reader = new FileReader();
        reader.readAsArrayBuffer(resFile);
        reader.onloadend = (evt: any) => {
          var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
          var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
          imageStore.put(imgBlob).then((res) => {
            this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) =>{
              resolve(url);
            }).catch((err) =>{
              reject(err);
            })
          }).catch((err) => {
            reject(err);
          })
        }
      })
    })
  })
})
 
}) 
 return promise;
}

grouppicstore(groupname) {
  var promise = new Promise((resolve, reject) =>{
  this.filechooser.open().then((url) => {
    (<any>window).FilePath.resolveNativePath(url, (result) => {
      this.nativepath = result;
  (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
    res.file((resFile) => {
      var reader = new FileReader();
      reader.readAsArrayBuffer(resFile);
      reader.onloadend = (evt: any) => {
        var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
        var imageStore = this.firestore.ref('/groupimages').child(firebase.auth().currentUser.uid).child(groupname);
        imageStore.put(imgBlob).then((res) => {
          this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).child(groupname).getDownloadURL().then((url) =>{
            resolve(url);
          }).catch((err) =>{
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
      }
    })
  })
})
})

}) 
return promise;
}

picmsgstore(){
  var promise = new Promise((resolve, reject) =>{
    this.filechooser.open().then((url) => {
      (<any>window).FilePath.resolveNativePath(url, (result) => {
        this.nativepath = result;
    (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
      res.file((resFile) => {
        var reader = new FileReader();
        reader.readAsArrayBuffer(resFile);
        reader.onloadend = (evt: any) => {
          var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
          var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsgs');
          imageStore.put(imgBlob).then((res) => {
            this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsgs').getDownloadURL().then((url) =>{
              resolve(url);
            }).catch((err) =>{
              reject(err);
            })
          }).catch((err) => {
            reject(err);
          })
        }
      })
    })
  })
})
 
}) 
 return promise;

}
}
