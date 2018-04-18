import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';

@IonicPage()
@Component({
  selector: 'page-newgroup',
  templateUrl: 'newgroup.html',
})
export class NewgroupPage {
  newgroup = {
    groupName: 'GroupName',
    groupPic:'',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertctrl: AlertController,
  public groupservice: GroupsProvider, public imghandler: ImghandlerProvider, public loadingctrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewgroupPage');
  }
  creategroup(){
  this.groupservice.addgroup(this.newgroup).then(() => {
    this.navCtrl.pop();
  }).catch((err) => {
    alert(JSON.stringify(err));
  })
  }
  chooseimage(){
    if (this.newgroup.groupName == 'GroupName'){
      alert ('Please enter a groupname. Thanks');
      let namealert = this.alertctrl.create({
        buttons: ['Okay'],
        message: 'Please enter a groupname. Thanks'
      });
      namealert.present();
    }
    else{
     let loader = this.loadingctrl.create({
        content: 'Laoding, Wait...'
      });
      loader.present();
      this.imghandler.grouppicstore(this.newgroup.groupName).then((res: any) =>{
        loader.dismiss();
       if(res)
         this.newgroup.groupPic = res;
      }).catch((err) => {
        alert(err);
      })
    }
   
  }

  
  editgroupname(){
    let alert =  this.alertctrl.create({
      title: 'Edit Group Name',
      inputs: [{
        name: 'groupname',
        placeholder: 'give a new group name'
      }],
      buttons: [{
        text :'cancel',
        role: 'cancel',
        handler: data => {//handler is just a funtion
    
        }
      },
        {
         text: 'Set',
         handler: data => {
         if (data.groupname) {
           this.newgroup.groupName = data.groupname
           }
           else {
            this.newgroup.groupName = 'groupName';
           }
           }
         }
         
        ]
    });
    alert.present();
  }
}
