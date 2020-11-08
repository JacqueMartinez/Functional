import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
//CameraOptions
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LugarPage} from '../pages/lugar/lugar';// Agregar nueva pagina
import {PerfilPage} from '../pages/perfil/perfil';
import {TabsPage} from '../pages/tabs/tabs';
import {TerceraPage} from '../pages/tercera/tercera';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LugaresProvider } from '../Providers/lugares/lugares';
import {AutheticationProvider} from '../Providers/authetication/authetication';
import {LoginPage} from '../pages/login/login';
import {RegistroPage} from '../pages/registro/registro';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {StorageProvider} from '../Providers/storage/storage';
import { Geolocation } from '@ionic-native/geolocation';
import {MapaPage} from '../pages/mapa/mapa';
import { OneSignal } from '@ionic-native/onesignal';
  // Initialize Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyAOUYkDBo1Uc2Ml4GyO3vkUgMP1Tfo1NMg",
    authDomain: "miprimerproyecto-85a38.firebaseapp.com",
    databaseURL: "https://miprimerproyecto-85a38.firebaseio.com",
    projectId: "miprimerproyecto-85a38",
    storageBucket: "miprimerproyecto-85a38.appspot.com",
    messagingSenderId: "162366313532"
};
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LugarPage, //Agregar nueva pagina
    PerfilPage,
    TabsPage,
    TerceraPage,
    LoginPage,
    RegistroPage,
    MapaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false, 
      scrollAssist: true, 
      autoFocusAssist: false 
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LugarPage, //Agregar nueva pagina
    PerfilPage,
    TabsPage,
    TerceraPage,
    LoginPage,
    RegistroPage,
    MapaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LugaresProvider,
    AutheticationProvider,
    Camera,
    AngularFireStorageModule,
    StorageProvider,
    Geolocation,
    OneSignal
  
  ]
})
export class AppModule {}
