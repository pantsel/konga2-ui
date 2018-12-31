import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { routeAnimations, selectAuth } from '@app/core';
import { State as BaseSettingsState } from '@app/settings';

import { State as BaseExamplesState } from '../examples.state';

interface State extends BaseSettingsState, BaseExamplesState {}

@Component({
  selector: 'konga-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  examples = [
    { link: 'todos', label: 'konga.examples.menu.todos' },
    { link: 'stock-market', label: 'konga.examples.menu.stocks' },
    { link: 'theming', label: 'konga.examples.menu.theming' },
    { link: 'crud', label: 'konga.examples.menu.crud' },
    { link: 'form', label: 'konga.examples.menu.form' },
    { link: 'notifications', label: 'konga.examples.menu.notifications' },
    { link: 'authenticated', label: 'konga.examples.menu.auth', auth: true }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(
      select(selectAuth),
      map(auth => auth.isAuthenticated)
    );
  }
}
