import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})
export class BuddiesPage {
   filteredusers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider) {
    this.userservice.getallusers().then((res: any) =>{
      this.filteredusers = res;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddiesPage');
  }

}
