import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {
  tab1: string ="ChatsPage";
  tab2: string ="GroupsPage";
  tab3: string ="ProfilePage";

  constructor() {
  }

  

}
