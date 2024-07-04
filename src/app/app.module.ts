import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { MiniPlayerComponent } from './components/song-component/song.component';
import { LoaderComponent } from './components/loader-component/loader.component';
import { SecureStorage } from '@awesome-cordova-plugins/secure-storage/ngx';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



@NgModule({
  declarations: [AppComponent],
  providers: [SecureStorage, provideAnimationsAsync()],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
     IonicStorageModule.forRoot(),
     AppRoutingModule,
      MiniPlayerComponent,
      LoaderComponent,
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
