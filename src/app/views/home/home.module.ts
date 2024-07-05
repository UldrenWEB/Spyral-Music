import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CardComponent } from 'src/app/components/card-component/card.component';
import { AlbumComponent } from 'src/app/components/album-component/album.component';
import { MessageBarComponent } from 'src/app/components/message-bar/message-bar.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    CardComponent,
    AlbumComponent,
    MessageBarComponent
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
