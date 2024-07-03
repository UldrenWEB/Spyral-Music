// src/app/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStorageService } from '../service/AuthStorage';
import { StorageService } from '../service/StorageService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(private storageService: StorageService, private router: Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const token = this.storageService.get('token');
    if (true) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
