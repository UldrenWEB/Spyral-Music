import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PlaylistPage} from './playlist.page'

import { PlaylistPageRoutingModule } from './playlist-routing.module';
import { InputComponent } from 'src/app/components/input-component/input.component';
import { MessageBarComponent } from 'src/app/components/message-bar/message-bar.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlaylistPageRoutingModule,
    InputComponent,
    MessageBarComponent
  ],
  declarations: [PlaylistPage]
})
export class PlaylistPageModule {}