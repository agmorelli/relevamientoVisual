import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LindasPage } from '../lindas/lindas';
import { FeasPage } from '../feas/feas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lindas= LindasPage;
  feas = FeasPage;
  ruta;

  constructor(public navCtrl: NavController) {

  }

  Ingresar(ruta)
  {
    ruta == "lindas" ? this.ruta = this.lindas : this.ruta = this.feas;

    this.navCtrl.push(this.ruta);
    
  }

}
