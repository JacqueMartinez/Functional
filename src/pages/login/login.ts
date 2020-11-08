import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import{AutheticationProvider} from '../../Providers/authetication/authetication'
import { RegistroPage } from '../registro/registro';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  operation: string = '';
  email: string = null;
  password: string = null;
  usuario: string = null;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public autheticationProvider: AutheticationProvider,
    public viewController: ViewController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  irHome(){
    this.navCtrl.setRoot(TabsPage);
  }
  showAlertIngreso() {
    const alert = this.alertCtrl.create({
      title: '¡Bienvenido!',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlertNot() {
    const alert = this.alertCtrl.create({
      title: '¡Informacion Incorrecta!',
      buttons: ['OK']
    });
    alert.present();
  }
  login(){
    if(!this.email || !this.password ){
      this.showAlertNot();
    } else {
    this.autheticationProvider.loginWithEmail(this.email, this.password).then(
      (data) => {
        this.showAlertIngreso();
        this.navCtrl.setRoot(TabsPage);
        this.viewController.dismiss().catch((err) =>{
          console.log('ViewController: ' + err);
        })
        console.log(data)
      }).catch((error) => {
        this.showAlertNot();
        this.navCtrl.setRoot(LoginPage);
        console.log('Data: ' + error);
      });
  }
  }
  irRegistro(){
    this.navCtrl.setRoot(RegistroPage);
  }
}

