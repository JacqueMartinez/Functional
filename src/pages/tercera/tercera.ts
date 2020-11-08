import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistroPage } from '../registro/registro';

/**
 * Generated class for the TerceraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tercera',
  templateUrl: 'tercera.html',
})
export class TerceraPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TerceraPage');
  }
  irLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
  irRegistro(){
    this.navCtrl.setRoot(RegistroPage);
  }

}
