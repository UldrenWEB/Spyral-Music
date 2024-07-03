import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SplashScreenComponent } from './splash.component';
import { SplashScreenRoutingModule } from './splash-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SplashScreenRoutingModule
  ],
  declarations: [SplashScreenComponent]
})
export class SplashScreenModule {}