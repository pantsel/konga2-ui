import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  AppState,
  LocalStorageService,
  selectIsAuthenticated, selectAuth, startingPage, loginPage, onboardingPage
} from '@app/core';
import { environment as env } from '@env/environment';

import {
  ActionSettingsChangeLanguage,
  ActionSettingsChangeAnimationsPageDisabled,
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader
} from './settings';
import {Router} from '@angular/router';
import {AuthService} from '@app/core/auth/auth.service';

@Component({
  selector: 'konga-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');
  languages = ['en'];
  navigation = [

    // { link: 'features', label: 'konga.menu.features' },
    // { link: 'examples', label: 'konga.menu.examples' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'dashboard',
      icon: 'dashboard',
      label: 'konga.menu.dashboard' },
    { link: 'users',
      icon: 'supervised_user_circle',
      label: 'konga.menu.users' },
    { link: 'settings',
      icon: 'settings',
      label: 'konga.menu.settings' }
  ];

  isAuthenticated$: Observable<boolean>;
  auth$: Observable<any>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;
  authUser: any = {};

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private auth: AuthService,
    private storageService: LocalStorageService
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        new ActionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.auth$ = this.store.pipe(select(selectAuth));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));

    // Act on auth events
    this.auth$.subscribe(data => {
      this.authUser = data.user;

    })

    this.isAuthenticated$.subscribe(data => {
      console.log('[DEBUG] [AppComponent] Authenticated state changed =>', data)
      if (!data) {
        setTimeout(() => {
          const path = window['_needsOnboarding'] ? onboardingPage : loginPage;
          this.router.navigate([path]);
        })
      }else{
        const paths = ['/login', '/sign-up'];
        if (paths.indexOf(window.location.pathname) > -1) {
          this.router.navigate([startingPage]);
        }
      }
    })
  }


  onLogoutClick() {
    this.auth.logout();
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
  }

  shouldShowToolbar() {
    return window.location.pathname.indexOf('welcome') < 0
      && window.location.pathname.indexOf('login') < 0;
  }

  shouldShowSidenav() {
    return window.location.pathname.indexOf('welcome') < 0
      && window.location.pathname.indexOf('login') < 0;
  }
}
