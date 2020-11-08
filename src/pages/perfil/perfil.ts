import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AutheticationProvider} from '../../Providers/authetication/authetication'
/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public autheticationProvider:AutheticationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  public salir(){
    this.autheticationProvider.logOut();
  }
}
