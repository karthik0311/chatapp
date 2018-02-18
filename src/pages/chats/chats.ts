import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { RequestsProvider } from './../../providers/requests/requests';
import { ChatProvider } from '../../providers/chat/chat';


@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  myrequests;
  myfriends;
  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider,
  public events: Events, public alertctrl: AlertController, public chatservice: ChatProvider) {
  }

  ionViewWillEnter(){
   this.requestservice.getmyrequests();
   this.requestservice.getmyfriends();
   this.events.subscribe('gotrequests', () => {
     this.myrequests = [];
     this.myrequests = this.requestservice.userdetails;
   })
   this.events.subscribe('friends', () => {
    this.myfriends = [];
    this.myfriends = this.requestservice.myfriends;
  })
  }
  ionViewDidLeave(){
   this.events.unsubscribe('gotrequests');
   this.events.unsubscribe('friends');
  }
  addfriend(){
  this.navCtrl.push('BuddiesPage');
  }

  accept(item) {
   this.requestservice.acceptrequest(item).then(() => {
     let alert = this.alertctrl.create({
       title: 'Friend Added',
       subTitle: 'Tap on Friend to chat',
       buttons: ['ok']
     });
     alert.present();
   })
  }
  ignore(item) {
    this.requestservice.deleterequest(item).then(() => {

    }).catch((err) => {
      alert(err);
    })
  }
  buddychat(buddy) {
    this.chatservice.initializebuddy(buddy);
    this.navCtrl.push('buddychatPage');
  }
}
