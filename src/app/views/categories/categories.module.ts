import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesPage } from './categories.page';

import { CategoriesPageRoutingModule} from './categoriers-routing.module';
import { AlbumComponent } from 'src/app/components/album-component/album.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MessageBarComponent } from 'src/app/components/message-bar/message-bar.component';
import { PlaylistComponent } from 'src/app/components/playlist-component/playlist.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CategoriesPageRoutingModule,
    AlbumComponent,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule,
    MessageBarComponent,
    PlaylistComponent
  ],
  declarations: [CategoriesPage],
})
export class CategoriesPageModule {}
