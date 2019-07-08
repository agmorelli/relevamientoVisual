import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { Voto } from '../../app/clases/Voto';
import { Usuario } from '../../app/clases/Usuario';
import { Imagen } from '../../app/clases/Imagen';
//import { storage, initializeApp } from 'firebase';
//import { FIREBASE_CONFIG } from '../../app/firebase.config';

/*
  Generated class for the ImagenesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImagenesProvider {

  private fotosFirebase: AngularFirestoreCollection<Imagen>;
  private fotosObservable: Observable<Imagen[]>;
  private usuario:Usuario;

  constructor(private objFirebase: AngularFirestore) {
  this.usuario= JSON.parse(sessionStorage.getItem("usuario"));
  }

   TraerFotosFeas(){
    this.fotosFirebase = this.objFirebase.collection<Imagen>("feas");
    this.fotosObservable = this.fotosFirebase.valueChanges();
    return this.fotosObservable;
  }

  TraerFotosLindas()
  {
    this.fotosFirebase = this.objFirebase.collection<Imagen>("lindas");
    this.fotosObservable = this.fotosFirebase.valueChanges();
    return this.fotosObservable;
  }


async GuardarData(imagenData, tipo)
{
  let idBd=this.objFirebase.createId();
  let obj={
    "id": idBd,
    "nombre":imagenData.nombre,
    "path": imagenData.path,
    "usuario": imagenData.usuario,
    "positivo":0,
    "negativo":0
  }
  this.objFirebase.collection<any>(tipo).doc(idBd).set(obj).then((data)=>{
   console.log(data);
 }).catch((data)=>{
   console.log(data);
 })
}

 TraerUrl(nombre)
{
  let path;
   firebase.storage().ref().child(nombre).getDownloadURL().then((url)=>{
    path=url;

   console.log(url);
  }).catch((data)=>{
    console.log(data);
  });
   return path;

}

VotarNegativo(img, tipo)
{

console.log(img);
  img.negativo++;
  this.objFirebase.collection(tipo).doc(img.id).update(img).then((data)=>
{
  console.log(data);
})
}

VotarPositivo(img, tipo)
{


  img.positivo++;
  console.log(img);
  this.objFirebase.collection(tipo).doc(img.id).update(img).then((data)=>
{
  console.log(data);
})
}
}
