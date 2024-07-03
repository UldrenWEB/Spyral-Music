import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./views/splashPage/splash.module').then(m=> m.SplashScreenModule)
  },
  {
    path: 'startup',
    loadChildren: () => import('./views/startup/startup.module').then(m=>m.StartupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then(m=>m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./views/register/register.module').then(m=>m.RegisterPageModule)
  },
  {
    path: 'create-artist',
    loadChildren: () => import('./views/artist-page/artist.module').then(m=>m.ArtistPageModule)
  },
  {
    path: 'play-song',
    loadChildren: () => import('./views/song-page/song.module').then(m=>m.SongPageModule)
  },
  {
    path: 'view-album',
    loadChildren: () => import('./views/album-page/album.module').then(m=>m.AlbumPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./views/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
