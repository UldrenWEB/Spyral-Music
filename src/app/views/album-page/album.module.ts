import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlbumPage } from './album.page';

import { AlbumPageRoutingModule } from './album-routing.module';
import { InputComponent } from 'src/app/components/input-component/input.component';
import { MessageBarComponent } from 'src/app/components/message-bar/message-bar.component';
import { CardComponent } from 'src/app/components/card-component/card.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AlbumPageRoutingModule,
    InputComponent,
    MessageBarComponent,
    CardComponent
  ],
  declarations: [AlbumPage]
})
export class AlbumPageModule {}