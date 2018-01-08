import { UserProvider } from './../../providers/user/user';
import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { TabPage } from '../tab/tab';

@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {
  
  imgurl: any;
  moveon = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public imgservice: ImghandlerProvider,
             public zone: NgZone, public userservice: UserProvider) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad ProfilepicPage');
  }
  chooseimage(){
  this.imgservice.uploadimage().then((uploadedurl: any) => {
    this.zone.run(() =>{
      this.imgurl= uploadedurl;
      this.moveon = false;
    })
   
  })
  }
  updateproceed(){
  this.userservice.updateimage(this.imgurl).then((res: any) =>{
    if (res.success) {
      this.navCtrl.setRoot('TabPage')
    }
   else{
     alert(res);

   }
  })
  }
  proceed(){
    this.navCtrl.setRoot('TabPage')
  }
}
