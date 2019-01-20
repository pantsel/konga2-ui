import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  public itemAdded$: EventEmitter<any>;
  public itemRemoved$: EventEmitter<any>;

  constructor() {
    this.itemAdded$ = new EventEmitter();
    this.itemRemoved$ = new EventEmitter();
  }


  public add(item: any): void {
    this.itemAdded$.emit(item);
  }

  public remove(item: any): void {
    this.itemRemoved$.emit(item);
  }
}
