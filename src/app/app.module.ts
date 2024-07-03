import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { MiniPlayerComponent } from './components/song-component/song.component';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
     IonicStorageModule.forRoot(),
     AppRoutingModule,
      MiniPlayerComponent
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
