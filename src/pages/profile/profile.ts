import { ImghandlerProvider } from './../../providers/imghandler/imghandler';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';

import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  displayName: any;
  avatar: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider, public zone: NgZone,
  public alertctrl: AlertController,public imghandler: ImghandlerProvider ) {
  }

  ionViewWillEnter(){
   this.loaduserdetails();
  }

  loaduserdetails(){
  this.userservice.getuserdetails().then((res : any) => {
    console.log("am in");
    console.log(res);
    this.displayName = res.displayName;
    
    this.zone.run(() => {
      this.avatar = res.photoURL;
    })
  })
  }
editimage(){
  let statusalert = this.alertctrl.create({
    buttons: ['okay']
});
this.imghandler.uploadimage().then((url: any) => {
  this.userservice.updateimage(url).then((res: any) => {
    if (res.success){

      statusalert.setTitle('updated');
      statusalert.setSubTitle('Your Profile pic changed successfully');
      statusalert.present();
      this.zone.run(() => {
        this.avatar = url;
      })
    }
  }).catch((errr) => {
    statusalert.setTitle('failed');
    statusalert.setSubTitle('Your Profile pic was not changed successfully');
    statusalert.present();
  })
})
}


  editname() {
    let statusalert = this.alertctrl.create({
        buttons: ['okay']
    });
let alert =  this.alertctrl.create({
  title: 'Edit Nickname',
  inputs: [{
    name: 'nickname',
    placeholder: 'NickName'
  }],
  buttons: [{
    text :'cancel',
    role: 'cancel',
    handler: data => {//handler is just a funtion

    }
  },
    {
     text: 'Edit',
     handler: data => {
     if (data.nickname) {
       this.userservice.updatedisplayname(data.nickname).then((res: any) => {
       if (res.success) {
         statusalert.setTitle('updated');
         statusalert.setSubTitle('Your nickname changed successfully');
         statusalert.present();
         this.zone.run(() => {
           this.displayName = data.nickname;
         })
       }
       else {
        statusalert.setTitle('failed');
        statusalert.setSubTitle('Your nickname was not changed successfully');
        statusalert.present();
       }
       })
     }
     }
    }]
});
alert.present();
}
logout() {
firebase.auth().signOut().then(() =>{
  this.navCtrl.parent.parent.setRoot('LoginPage');
})
}
}