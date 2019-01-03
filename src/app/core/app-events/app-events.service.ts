import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export class AppEvent {
  name: string;
  data: any;

  constructor(_name: string, _data?: any) {
    this.name = _name;
    this.data = _data;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppEventsService {

  _event: BehaviorSubject<any> = <BehaviorSubject<any>>new BehaviorSubject(null);
  private event: Observable<any> =  this._event.asObservable();

  constructor() { }
  
  emit(event: AppEvent) {
    this._event.next(event);
  }
}
