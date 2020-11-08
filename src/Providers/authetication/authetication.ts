
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from "angularfire2/database";
@Injectable()
export class AutheticationProvider {
  constructor(private afAuth: AngularFireAuth,public afdb: AngularFireDatabase) {
  }
  loginWithEmail(email: string, password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  registerWithEmail(email: string, password: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  getStatus(){
    return this.afAuth.authState;
  }
  logOut(){
    return this.afAuth.auth.signOut();
    
  }
  createUser(user){
    return this.afdb.object('/users/' + user.uid).set(user);
  }
}
