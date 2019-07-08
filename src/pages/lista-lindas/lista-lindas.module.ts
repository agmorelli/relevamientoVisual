import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaLindasPage } from './lista-lindas';

@NgModule({
  declarations: [
    ListaLindasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaLindasPage),
  ],
})
export class ListaLindasPageModule {}
