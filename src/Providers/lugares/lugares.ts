/* import {HttpClient} from '@angular/common/http'; */
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable()
export class LugaresProvider{
    constructor(public afDB: AngularFireDatabase){
        console.log('Hello LugaresProvider Provider');
    }
   
  /*Obtener todos los lugares*/
  public getLugares(){
    return this.afDB.list('/lugares/');
  }
  /*Obtener un lugar en especifico*/
  public getLugar(id){
    return this.afDB.object('/lugares/'+id);
  }

  /*Crear un lugar nuevo*/
  public createLugar(lugar){
    return this.afDB.database.ref( '/lugares/'+ lugar.id).set(lugar);
  }
  /*Editar un lugar*/
public editLugar(lugar){
  return this.afDB.database.ref( '/lugares/'+ lugar.id).set(lugar);
}
  /*Eliminar lugar*/
  public deletetLugar(lugar){
    return this.afDB.database.ref( '/lugares/'+ lugar.id).remove();
  }

}