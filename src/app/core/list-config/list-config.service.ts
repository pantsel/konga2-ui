import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListConfigService {

  public models: any;

  constructor() {
    this.models = {
      service : {
        endpoint: `services`,
        titleItems: [
          {
            title: 'konga.name',
            property: 'name',
            width: 1,
            searchable: true,
            sortable: true
          },
          {
            title: 'konga.host',
            property: 'host',
            searchable: true,
            sortable: true
          },
          {
            title: 'konga.tags',
            property: 'tags',
            searchable: true,
            sortable: true
          },
          {
            title: 'konga.created_at',
            property: 'created_at',
            sortable: true,
          }
        ]
      },
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
