import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {LugaresProvider} from '../../Providers/lugares/lugares';
import leaflet from 'leaflet';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  map: any;
  lugares: any = []
  constructor(public navCtrl: NavController, public navParams: NavParams,public lugaresProvider:LugaresProvider,
    public loadingCtrl: LoadingController) {
     
    this.lugaresProvider.getLugares().valueChanges()
    .subscribe( (lugares)=>{
      this.lugares=lugares;
    });

  }
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Por favor, espera...",
      duration: 250
    });
    loader.present();
  } 
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }
  metodoEnter(){
    this.lugares.forEach(lugar => {
       console.log(lugar.nombre);
    });
  }

  ionViewDidEnter() {
    this.loadmap();
  } 
   loadmap() {
    if(this.map != undefined || this.map != null){
      this.map.remove();
    }
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
     /* minZoom: 8,
     maxZoom: 18 */
    }).addTo(this.map);
    this.map.locate({
      setView: true,
    })
    let markerGroup = leaflet.featureGroup();
    this.lugares.forEach(lugar => {
    var icono = leaflet.icon({
        iconUrl: lugar.foto,
        iconSize:     [20, 30], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
      
      let marker: any = leaflet.marker([lugar.latitud, lugar.longitude],{icon: icono}).bindPopup(lugar.nombre);
      markerGroup.addLayer(marker);
      console.log(lugar.nombre);
   });
      this.map.addLayer(markerGroup);
  
/*     
      this.map.setView([0, 0], 0); */
  } 
  metodoLimpiar(){
    this.map.remove();
  }
  
}
