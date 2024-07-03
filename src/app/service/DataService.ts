import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: Object = {};

  constructor() { }

  setData(data: Object) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}