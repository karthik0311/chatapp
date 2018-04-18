import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';


@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  allmygroups;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public loadingctrl : LoadingController, public  groupservice : GroupsProvider) {

  }

  ionViewWillEnter() {
    let loader = this.loadingctrl.create({
      content : 'Getting your groups, please wait...'
    });
    loader.present();
    this.groupservice.getmygroups();
    this.events.subscribe('newgroup', () =>
    {
      loader.dismiss();
      this.allmygroups = this.groupservice.mygroups;
    })
     }

     ionViewDidLeave(){
       this.events.unsubscribe('newgroup');
     }

addgroup(){
  this.navCtrl.push('NewgroupPage');
}

openchat(group) {
  alert('Groupchat' + group.groupname);
}
}
