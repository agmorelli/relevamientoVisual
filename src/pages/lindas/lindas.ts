import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { CameraOptions, Camera } from '@ionic-native/camera';
import { storage, initializeApp } from 'firebase';
import { FIREBASE_CONFIG } from '../../app/firebase.config';
import firebase from 'firebase';
import { Imagen } from '../../app/clases/Imagen';
import { ImagenesProvider } from '../../providers/imagenes/imagenes';
import { Usuario } from '../../app/clases/Usuario';
import { ListaLindasPage } from '../lista-lindas/lista-lindas';
import { Voto } from '../../app/clases/Voto';
import { MisFotosPage } from '../mis-fotos/mis-fotos';

/**
 * Generated class for the LindasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lindas',
  templateUrl: 'lindas.html',
})
export class LindasPage {

  miFoto;
  clasificacionFoto: number=0;
  fotos;
  resultFoto;
  captureDataUrl:Array<any>;
  usuario:Usuario;
  hayFotos: boolean;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private imgProvider: ImagenesProvider,
    public alertCtrl: AlertController
   ) {
    this.usuario= JSON.parse(sessionStorage.getItem("usuario")); //initializeApp(FIREBASE_CONFIG);
    this.TraerFoto();
    this.captureDataUrl= new Array<string>();
    
    //console.log(this.fotos);

  }

 async SacarFoto(){

    const options: CameraOptions = {
      quality: 50,
      //destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
     // saveToPhotoAlbum: true
    }
     
      await this.camera.getPicture(options).then((imageData)=>{
      this.captureDataUrl.push('data:image/jpeg;base64,'+ imageData);
      this.hayFotos=true;
      }, (error)=>{
        
        this.alertCtrl.create({
          title: 'Error!',
          subTitle: error,
          buttons: ['Ok']
        }).present();

      });
    }

   async GuardarFotos()
    {
      let ImagenAGuardar= new Imagen();
      let hora= new Date();

     await this.captureDataUrl.forEach(async foto=>{
        let filename = 'lindas/'+ Date.now(); //hora.getFullYear()+ hora.getMonth() + hora.getDate() + hora.getHours() + hora.getMinutes() + hora.getSeconds();
        
        let  fotos = await storage().ref(filename).putString(foto,'data_url');

        await firebase.storage().ref().child(filename).getDownloadURL().then(async (url)=>{
          ImagenAGuardar.path=url;
          ImagenAGuardar.nombre=filename;
          ImagenAGuardar.usuario=this.usuario;
          ImagenAGuardar.votos=new Array<Voto>();
          await this.imgProvider.GuardarData(ImagenAGuardar, "lindas");
      
         console.log(url);
         this.captureDataUrl.splice(0);
        }).catch((data)=>{
          console.log(data);
        });

      })

           
     //let nombreBd='feas/'+ hora.getFullYear()+ hora.getMonth() + hora.getDate() + hora.getHours() + hora.getMinutes() + hora.getSeconds();
    // const fotos =await storage().ref(nombreBd);
    // const imagen= 'data:image/jpeg;base64,'+result;
    
     //await fotos.putString(imagen,'data_url');
/*
    await firebase.storage().ref().child(nombreBd).getDownloadURL().then((url)=>{
      ImagenAGuardar.path=url;
  
     console.log(url);
    }).catch((data)=>{
      console.log(data);
    });
     
     ImagenAGuardar.nombre=nombreBd;
     ImagenAGuardar.usuario=this.usuario;
     this.imgProvider.GuardarData(ImagenAGuardar);

    */
    }
     
    IrAListalindas()
    {
      this.navCtrl.push(ListaLindasPage);
    }

  

  TraerFoto()
  {
    this.imgProvider.TraerFotosLindas().subscribe(arr => {
   
      this.fotos = arr.map(function(mesa, index){
        return mesa;
      });
    });
    console.log(this.fotos);
  }

  MisFotos()
  {
    this.navCtrl.push(MisFotosPage); 
  }


}
