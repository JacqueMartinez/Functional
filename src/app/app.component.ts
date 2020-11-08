import { Component } from '@angular/core';
import { Platform, AlertController , App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TerceraPage } from '../pages/tercera/tercera';
import { OneSignal } from '@ionic-native/onesignal';
import { LugaresProvider } from '../Providers/lugares/lugares';
import { LugarPage } from '../pages/lugar/lugar';


@Component({
  templateUrl: 'app.html'
})
export class MyApp /* implements OneSignal.NotificationOpenedHandler  */ {


  rootPage: any = TerceraPage;  //PAGINA PRINCIPAL QUE SE CARGA
  constructor(public oneSignal: OneSignal, platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, private alertCtrl: AlertController,
    lugaresProvider: LugaresProvider,public app: App
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      /* var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      }; 
  
      window["plugins"].oneSignal
        .startInit("300d721a-717a-4306-9032-053dfa155188", "miprimerproyecto-85a38")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();  */


      this.oneSignal.startInit('300d721a-717a-4306-9032-053dfa155188', 'miprimerproyecto-85a38');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);


      this.oneSignal.handleNotificationOpened().subscribe((jsonData) => {
        // do something when a notification is opened
        let informacion;
        lugaresProvider.getLugar(jsonData.notification.payload.additionalData.ID).valueChanges().subscribe(datos=> {informacion = datos
          this.irAVistaDetalle2(informacion);});

        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));


      });
      
      this.oneSignal.handleNotificationReceived().subscribe(() => {
      
      });
      this.oneSignal.endInit();

    });

  }
  irAVistaDetalle2(lugar) {

    this.app.getActiveNav().setRoot(LugarPage,{lugar:lugar});
  }
}