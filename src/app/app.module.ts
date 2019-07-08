import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SplashPage } from '../pages/splash/splash';
import { LoginPage } from '../pages/login/login';
import { LindasPage } from '../pages/lindas/lindas';
import { FeasPage } from '../pages/feas/feas';
import { Camera } from '@ionic-native/camera';
import { CamaraProvider } from '../providers/camara/camara';
import { Injectable } from '@angular/core';
import { FIREBASE_CONFIG } from './firebase.config';
import { AngularFireModule } from "angularfire2";
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { ImagenesProvider } from '../providers/imagenes/imagenes';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { ListaLindasPage } from '../pages/lista-lindas/lista-lindas';
import { ListaFeasPage } from '../pages/lista-feas/lista-feas';
import { MisFotosPage } from '../pages/mis-fotos/mis-fotos';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SplashPage,
    LoginPage,
    LindasPage,
    FeasPage,
    ListaLindasPage,
    ListaFeasPage,
    MisFotosPage
  ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SplashPage,
    LoginPage,
    LindasPage,
    FeasPage,
    ListaLindasPage,
    ListaFeasPage,
    MisFotosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    CamaraProvider,
    ImagenesProvider,
    HttpClient,
    UsuariosProvider,
    UsuariosProvider
    
    
  
  ]
})
export class AppModule {}
