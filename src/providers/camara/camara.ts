
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

/*
  Generated class for the CamaraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



@Injectable()


export class CamaraProvider {

  miFoto: any;

  constructor(private camera: Camera) {
    console.log('Hello CamaraProvider Provider');
  }

  SacarFoto(){

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
       this.miFoto = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }

  

}
