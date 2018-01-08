import { TabPage } from './../pages/tab/tab';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { config } from './app.firebaseconfig';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { UserProvider } from '../providers/user/user';
import { ProfilepicPage } from '../pages/profilepic/profilepic';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';

@NgModule({
  declarations: [
    MyApp,
    //app is lazy loaded so i didnt included any pages.
    ProfilepicPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilepicPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FilePath,
    FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    UserProvider,
    ImghandlerProvider
  ]
})
export class AppModule {}
