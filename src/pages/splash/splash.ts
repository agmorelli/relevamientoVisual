import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../login/login';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams, public splashScreen: SplashScreen) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

  ionViewDidEnter() {
 this.splashScreen.hide();
    setTimeout(() => {

    
        this.navCtrl.push(LoginPage);

            this.viewCtrl.dismiss();
    }, 4000);
 
  }


}
