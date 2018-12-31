import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsAuthenticated } from './auth.selectors';
import { AppState } from '../core.state';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    const can = this.store.pipe(select(selectIsAuthenticated));
    can.subscribe(next => {
      if (!next) this.router.navigate(['/login']);
    });
    return can;
  }
}
