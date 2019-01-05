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
      },

      connection : {
        endpoint: `connections`,
        titleItems: [
          {
            title: 'konga.name',
            property: 'name',
            searchable: true,
            sortable: true,
            inTitle: true
          },
          {
            title: 'konga.connection_type',
            property: 'type',
            searchable: true,
            sortable: true,
            inTitle: true
          },
          {
            title: 'Kong Admin Url',
            property: 'kongAdminUrl',
            searchable: true,
            sortable: true,
          },
          {
            title: 'Kong Version',
            property: 'kongVersion',
            sortable: true,
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
