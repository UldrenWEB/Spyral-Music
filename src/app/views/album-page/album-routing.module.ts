import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlbumPage} from './album.page'

const routes: Routes = [
  {
    path: '',
    component: AlbumPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumPageRoutingModule {}