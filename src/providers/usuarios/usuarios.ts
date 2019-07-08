import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../../app/clases/Usuario';

/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {

  private usuariosFirebase: AngularFirestoreCollection<any>;
  private usuariosObservable: Observable<any>;

  constructor(private objFirebase: AngularFirestore) {
  
  }

  TraerUsuarios(){
    this.usuariosFirebase = this.objFirebase.collection<Usuario>("usuarios");
    this.usuariosObservable = this.usuariosFirebase.valueChanges();
    return this.usuariosObservable;
  }


}
