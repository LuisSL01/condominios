import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { LOCALE_ID } from "@angular/core";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx'; 
import { FileOpener } from '@ionic-native/file-opener/ngx';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';//ocupado para la plataforma ios

import { DatePipe } from '@angular/common';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

import {NgxMaskIonicModule} from 'ngx-mask-ionic'


/* import { NgxMaskModule, IConfig } from 'ngx-mask' */
/* export const options: Partial<IConfig> | (() => Partial<IConfig>) = null; */

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
     AppRoutingModule,
     ComponentsModule,
     HttpClientModule,
     IonicStorageModule.forRoot(),
     NgxMaskIonicModule.forRoot()
    ],

  providers: [

    /* No funciono
    { provide: LOCALE_ID, useValue: "es" },//se supone es para la fecha la pinte en español */

    StatusBar,
    SplashScreen,
    Camera,
    FileTransfer,
    File,
    FileOpener,
    OneSignal,
    BarcodeScanner,
    EmailComposer,
    CallNumber,
    DatePipe,
    FileChooser,
    IOSFilePicker,
    FilePath,
    Base64,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
