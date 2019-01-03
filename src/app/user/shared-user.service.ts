import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedUserService {
  _user: BehaviorSubject<any> = <BehaviorSubject<any>>new BehaviorSubject(null);
  constructor() { }
}
