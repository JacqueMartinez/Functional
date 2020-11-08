import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {LugaresProvider} from '../../Providers/lugares/lugares';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {StorageProvider} from '../../Providers/storage/storage';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the LugarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lugar',
  templateUrl: 'lugar.html',
})
export class LugarPage {
  /* nombreLugar: String = ""; */
  lugar:any ={};
  pictureID: any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public lugaresProvider: LugaresProvider,public alertCtrl: AlertController,
     public camera: Camera,
     public storageProvider :StorageProvider,
     public toastCtrl: ToastController,
     private geolocation: Geolocation,
     public loadingCtrl: LoadingController
     ) {
    /* console.log(navParams);
    this.lugar = navParams.get("nombre"); */
    if(navParams.get('lugar')){
      this.lugar=navParams.get('lugar');
      console.log(this.lugar);
    }
  }

  showAlertSave() {
    const alert = this.alertCtrl.create({
      title: 'Lugar guardado!',
      subTitle: this.lugar.nombre + ' se ha guardado!',
      buttons: ['OK']
    });
    alert.present();
  }
  

  showAlertNotSaved() {
    const alert = this.alertCtrl.create({
      title: '¡Informacion Incompleta!',
      subTitle: 'Llene toda la información!',
      buttons: ['OK']
    });
    alert.present();
  }
  guardarLugar(){
    
    if(!this.lugar.nombre || !this.lugar.direccion  || !this.lugar.categoria){
      this.showAlertNotSaved();
    } else {
      if(!this.lugar.id){
        this.lugar.id = Date.now();
         
      }
      this.lugaresProvider.createLugar(this.lugar);
      this.showAlertSave();
      this.navCtrl.pop();
      console.log(this.lugar);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LugarPage');
  }
  subirFoto(source){
    try{
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit:true
      //De donde toma la fotografia
      //sourceType: this.camera.PictureSourceType.CAMERA
    }
    //EXPRESION TERNIARIA (ES COMO UN IF)
    options.sourceType = (source =='camera')?
    this.camera.PictureSourceType.CAMERA:
    this.camera.PictureSourceType.PHOTOLIBRARY;

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    // this.lugar.imagen = base64Image;
     let namePicture =Date.now();
     console.log(namePicture);
    this.storageProvider.uploadPicture(namePicture+'.jpg',base64Image). 
     then((data)=>{
       this.localizacion();
       this.storageProvider.getDownloadURL(namePicture+'.jpg')
       .subscribe((url)=>{
         console.log('si entro');
          console.log(url);
          this.lugar.foto=url;
       })
        //console.log(data);
     }).catch((error)=>{
       console.log(error);
     }) 
      //console.log(base64Image);
    }, (err) => {
     // Handle error
     console.log(err);
    });
  }catch(e){
    console.error(e);
  }
}  
 

async takePicture(source) {
    try {
      let cameraOptions: CameraOptions = {
        quality: 50,
        targetWidth: 1280,
        targetHeight: 720,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: true
      };
      cameraOptions.sourceType = (source == 'camera') ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY;
      const result = await this.camera.getPicture(cameraOptions);
      const image = `data:image/jpeg;base64,${result}`;
      console.log(image);
      this.pictureID = Date.now();
      this.localizacion();
      this.storageProvider.uploadPicture(this.pictureID + '.jpg', image).then((data) => {
        this.storageProvider.getDownloadURL(this.pictureID + '.jpg').subscribe((url) => {
          this.lugar.foto = url;
          const toast = this.toastCtrl.create({

            duration: 2000,
            position: 'bottom'
          });
          toast.present();
        }, (error) => {
          console.log(error);
        });
      });
    } catch (e) {
      console.error(e);
    }
  }
  localizacion(){
    console.log("entro");
    this.geolocation.getCurrentPosition().then((resp) => {
        console.log("entro1");
        this.lugar.latitud = resp.coords.latitude;
        this.lugar.longitude = resp.coords.longitude;
        //alert(resp.coords.latitude);
        //alert(resp.coords.longitude);
     }).catch((error) => {
      console.log("entro2");
       console.log('Error getting location', error);
     });
  }
  AceptarLugar(lugar){
    const confirm = this.alertCtrl.create({
      title: 'Aceptar lugar',
      message: '¿Estás seguro de utilizar esa foto?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Aceptar clicked');
            this.guardarLugar()
            
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
}
