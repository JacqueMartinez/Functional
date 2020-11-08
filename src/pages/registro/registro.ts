import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {AutheticationProvider} from '../../Providers/authetication/authetication';

import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  email: string = null;
  password: string = null;
  usuario: string = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public autheticationProvider:AutheticationProvider,
    public alertCtrl: AlertController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }
  irLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
  register(){
    this.autheticationProvider.registerWithEmail(this.email, this.password).then(
      (data) => {
        const user1 = {
          uid: data.user.uid,
          email: this.email,
          password: this.password
        };
        this.autheticationProvider.createUser(user1).then((userData) => {
          this.navCtrl.setRoot(HomePage);
          this.showAlertIngreso();
          console.log(userData)
        }).catch((error) => {
          alert('Error');
          console.log(error);
        });
      }).catch((error) => {
        alert('Error');
        console.log(error);
      });
  }
  showAlertIngreso() {
    const alert = this.alertCtrl.create({
      title: '¡Registro Exitoso!',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlertNot() {
    const alert = this.alertCtrl.create({
      title: '¡No se puede registrar!',
      buttons: ['OK']
    });
    alert.present();
  }
}
