import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ProfilepicPage } from '../profilepic/profilepic';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
newuser = {
  email: '',
  password: '',
  displayname:''

}
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
  public loadingctrl: LoadingController, public toastctrl: ToastController) {
  }
 signup(){
   var toaster = this.toastctrl.create({
     duration: 3000,
     position: 'bottom'
   });
   if(this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayname == ''){
     toaster.setMessage('All fields are required buddy');
     toaster.present();
   }
   else if(this.newuser.password.length < 7){
    toaster.setMessage('Password is not strong. try giving more than 7 characters ');
    toaster.present();
   }
   else {
   let loader = this.loadingctrl.create({
     content: 'waitpannuvarum'
   });
   loader.present();
  this.userservice.adduser(this.newuser).then((res: any) => {
    loader.dismiss();
   if (res.success)
   this.navCtrl.push(ProfilepicPage);
   else
   alert(res);
  })
 }
}
 goback(){
   this.navCtrl.setRoot('LoginPage');
 }

}
