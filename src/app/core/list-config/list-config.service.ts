import { Injectable } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ListConfigService {

  public models: any;
  public defaultLimit: 30;

  constructor() {
    this.models = {
      user : {
        endpoint: `users`,
        titleItems: [
          {
            title: '',
            property: 'active',
            width: 1,
            sortable: true
          },
          {
            title: '',
            property: 'isSuperAdmin',
            width: 1,
            sortable: true
          },
          {
            title: 'konga.name',
            property: 'fullName',
            searchable: true,
            sortable: true,
            inTitle: true
          },
          {
            title: 'Email',
            property: 'emailAddress',
            searchable: true,
            sortable: true,
            inTitle: true
          },
          {
            title: 'konga.created_at',
            property: 'createdAt',
            sortable: true,
          }
        ]
      }
    }
  }
}
