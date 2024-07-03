import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesPage } from './categories.page';

import { CategoriesPageRoutingModule} from './categoriers-routing.module';
import { AlbumComponent } from 'src/app/components/album-component/album.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CategoriesPageRoutingModule,
    AlbumComponent
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
