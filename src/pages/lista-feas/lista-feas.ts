import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ImagenesProvider } from '../../providers/imagenes/imagenes';
import { Usuario } from '../../app/clases/Usuario';
import { Voto } from '../../app/clases/Voto';
import { Imagen } from '../../app/clases/Imagen';

/**
 * Generated class for the ListaFeasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-feas',
  templateUrl: 'lista-feas.html',
})
export class ListaFeasPage {
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
    private imgProvider: ImagenesProvider,
    public alertCtrl: AlertController
   ) {
    this.usuario= JSON.parse(sessionStorage.getItem("usuario"));
    this.TraerFoto();

  }
    

  

  TraerFoto()
  {
    this.imgProvider.TraerFotosFeas().subscribe(arr => {
   
      this.fotos = arr.map(function(mesa, index){
        return mesa;
      });
    });
    console.log(this.fotos);
  }


  async VotarPositivo(img:Imagen)
  {
    let elVoto=new Voto();
    elVoto.tipo="positivo";
    elVoto.usuario=this.usuario;
    let votoBuscado:Voto;
    if(img.votos)
    {
      let ok= img.votos.map(function(voto:Voto)
      {
        if(voto.usuario.id==elVoto.usuario.id)
        {
          votoBuscado=voto;
          console.log(votoBuscado);
          return true
        }
         
        //voto.usuario==this.usuario
      });
      if(ok)
      {
        if(votoBuscado.tipo=="negativo")
        {
         
          img.negativo=img.negativo-1;
    
        }
        if(votoBuscado.tipo=="positivo")
        {
          img.positivo--;
        }
        
      }

      img.votos.push(JSON.parse(JSON.stringify(elVoto)));
    }
    else{
      img.votos= new Array<Voto>();
      img.votos.push(JSON.parse(JSON.stringify(elVoto)));
    }
    
    this.imgProvider.VotarPositivo(img, "feas");
  }



  async VotarNegativo(img:Imagen)
  {

    
    let elVoto=new Voto();
    elVoto.tipo="negativo";
    elVoto.usuario=this.usuario;
    let votoBuscado:Voto;
    if(img.votos)
    {
      let ok= img.votos.map(function(voto:Voto)
      {
        if(voto.usuario.id==elVoto.usuario.id)
        {
          votoBuscado=voto;
          console.log(votoBuscado);
          return true
        }
         
        //voto.usuario==this.usuario
      });
      if(ok)
      {
        if(votoBuscado.tipo=="positivo")
        {
         
          img.positivo=img.positivo-1;
    
        }
        if(votoBuscado.tipo=="negativo")
        {
          img.negativo--;
        }
        
      }

      img.votos.push(JSON.parse(JSON.stringify(elVoto)));
    }
    else{
      img.votos= new Array<Voto>();
      img.votos.push(JSON.parse(JSON.stringify(elVoto)));
    }
    
  
    this.imgProvider.VotarNegativo(img, "feas");
  }
}
