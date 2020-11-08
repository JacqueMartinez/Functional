import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';//importar 
import { LugarPage } from '../lugar/lugar';
import {LugaresProvider} from '../../Providers/lugares/lugares';
import { LoadingController } from 'ionic-angular';
import {AutheticationProvider} from '../../Providers/authetication/authetication'
import { TerceraPage } from '../tercera/tercera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lugares: any = []

  constructor(public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public lugaresProvider:LugaresProvider,
    public autheticationProvider:AutheticationProvider
   ) {
    this.lugaresProvider.getLugares().valueChanges()
    .subscribe( (lugares)=>{
      this.lugares=lugares;
    });
    

  autheticationProvider.getStatus()
  .subscribe((datos)=>{
  if(datos ==null){
    
    this.navCtrl.setRoot(TerceraPage);
  }else{
    
  }
  });
  }
  irAVistaDetalle2(){
    this.navCtrl.push(LugarPage,{lugar:{}});
  }
  irAVistaDetalle(lugar){
    this.navCtrl.push(LugarPage,{lugar:lugar});
  }
  deleteLugar(lugar){
    const confirm = this.alertCtrl.create({
      title: 'Eliminar lugar',
      message: '¿Estás seguro de eliminar este lugar?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Eliminar clicked');
            this.lugaresProvider.deletetLugar(lugar)
            .then(() => {
               this.presentLoading(); 
              
            });
          }
        }
      ]
    });
    confirm.present();
  }
     presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Por favor, espera...",
      duration: 250
    });
    loader.present();
  } 
 /*  public entrar(){
    this.autheticationProvider.loginWithEmail("usuario1234@gmail.com","12345678910");
  }

  public registrar(){
    this.autheticationProvider.registerWithEmail("usuario1234@gmail.com","12345678910");
  } */

}
