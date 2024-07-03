import { IonicModule } from '@ionic/angular';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtistPage } from './artist.page';

import { ArtistPageRoutingModule } from './artist-routing.module';
import { InputComponent } from 'src/app/components/input-component/input.component';
import { MessageBarComponent } from 'src/app/components/message-bar/message-bar.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ArtistPageRoutingModule,
    InputComponent,
    MessageBarComponent
  ],
  declarations: [ArtistPage]
})
export class ArtistPageModule {
  
}