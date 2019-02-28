import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBCUViwmpjzlXNdV6jhA31Cwa4yliesV-s",
  authDomain: "jovenes-7b74d.firebaseapp.com",
  databaseURL: "https://jovenes-7b74d.firebaseio.com",
  projectId: "jovenes-7b74d",
  storageBucket: "jovenes-7b74d.appspot.com",
  messagingSenderId: "1053631503230"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    firebase.initializeApp(config);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
