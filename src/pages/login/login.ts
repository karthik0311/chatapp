import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { usercreds } from '../../models/interfaces/usercreds';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as usercreds;//from interface
  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
signin (){
  //signing authentication from providers
  this.authservice.login(this.credentials).then((res: any)=>{
    if (!res.code)
    this.navCtrl.setRoot('TabPage');
    else
    alert(res);
  })
}
signup(){
  this.navCtrl.push('SignupPage');
}
}
