import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadPage } from './upload.page';

import { UploadPageRoutingModule } from './upload-routing.module';
import { InputComponent } from 'src/app/components/input-component/input.component';
import { MessageBarComponent } from 'src/app/components/message-bar/message-bar.component';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UploadPageRoutingModule,
    InputComponent,
    MessageBarComponent
  ],
  providers: [AndroidPermissions],
  declarations: [UploadPage]
})
export class UploadPageModule {

}