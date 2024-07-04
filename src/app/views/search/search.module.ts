import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPage } from './search.page';

import { SearchPageRoutingModule } from './search-routing.module';
import { MessageBarComponent } from 'src/app/components/message-bar/message-bar.component';
import { CardComponent } from 'src/app/components/card-component/card.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SearchPageRoutingModule,
    MessageBarComponent,
    CardComponent
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
