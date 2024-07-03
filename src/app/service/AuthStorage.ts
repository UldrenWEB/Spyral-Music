// src/app/services/auth-storage.service.ts

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SecureStorage, SecureStorageObject } from '@awesome-cordova-plugins/secure-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  private storage: SecureStorageObject | null = null;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_INFO_KEY = 'user_info';

  constructor(private platform: Platform, private secureStorage: SecureStorage) {
    this.platform.ready().then(() => {
      this.initializeStorage();
    });
  }

  private async initializeStorage(): Promise<void> {
    try {
      this.storage = await this.secureStorage.create('my_store');
    } catch (error) {
      console.error('Error creating secure storage', error);
    }
  }

  private async ensureStorageReady(): Promise<void> {
    if (!this.storage) {
      await this.initializeStorage();
    }
  }

  async setToken(token: string): Promise<void> {
    await this.ensureStorageReady();
    if (this.storage) {
      await this.storage.set(this.TOKEN_KEY, token);
    }
  }

  async getToken(): Promise<string | null> {
    await this.ensureStorageReady();
    if (this.storage) {
      return await this.storage.get(this.TOKEN_KEY).catch(() => null);
    }
    return null;
  }

  async removeToken(): Promise<void> {
    await this.ensureStorageReady();
    if (this.storage) {
      await this.storage.remove(this.TOKEN_KEY);
    }
  }

  async setUserInfo(userInfo: any): Promise<void> {
    await this.ensureStorageReady();
    if (this.storage) {
      await this.storage.set(this.USER_INFO_KEY, JSON.stringify(userInfo));
    }
  }

  async getUserInfo(): Promise<any> {
    await this.ensureStorageReady();
    if (this.storage) {
      const userInfo = await this.storage.get(this.USER_INFO_KEY).catch(() => null);
      return userInfo ? JSON.parse(userInfo) : null;
    }
    return null;
  }

  async removeUserInfo(): Promise<void> {
    await this.ensureStorageReady();
    if (this.storage) {
      await this.storage.remove(this.USER_INFO_KEY);
    }
  }

  async clear(): Promise<void> {
    await this.ensureStorageReady();
    if (this.storage) {
      await this.storage.clear();
    }
  }
}
