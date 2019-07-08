import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { Usuario } from '../../app/clases/Usuario';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  home = HomePage;
  mail;
  clave;
  usuarios:Array<Usuario>

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams, private usrProv: UsuariosProvider) {
    this.TraerUsuario();
    console.log(this.usuarios);
  }

  Ingresar()
  {
    
   let usr= this.usuarios.find(usuario=>{
      return usuario.correo==this.mail && usuario.clave== this.clave;
    })
  if(usr)
  {
    sessionStorage.setItem("usuario",JSON.stringify(usr));
    this.navCtrl.push(this.home);
  }
  else{
    let toast = this.toastCtrl.create({
      message: "Error al iniciar sesion" ,
      duration: 3000,
      position: 'top' //middle || top
    });
    toast.present();
  }
  }

  TraerUsuario()
  {
    this.usrProv.TraerUsuarios().subscribe((array)=>{
      this.usuarios= array.map((usuario)=>{
        return usuario;
      })
    })
  }

  Test(correo, clave)
  {
    this.mail=correo;
    this.clave=clave;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
