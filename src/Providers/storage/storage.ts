import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireStorage } from "angularfire2/storage";
/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public afdb: AngularFireDatabase,private angularFireStorage: AngularFireStorage) {
    
  }
  uploadPicture(pictura_name,image){
    return this.angularFireStorage.ref('/pictures/'+ pictura_name).putString(image,'data_url');
  }
  getDownloadURL(picture_name){
    return this.angularFireStorage.ref('/pictures/'+picture_name).getDownloadURL();
  }
   /* public uploadPicture(pictureName, image) {
    return this.aFS.ref('/pictures/' + pictureName).putString(image, 'data_url');
  }

  public getDownloadURL(pictureName) {
    return this.aFS.ref('/pictures/' + pictureName).getDownloadURL();
  } */
}
