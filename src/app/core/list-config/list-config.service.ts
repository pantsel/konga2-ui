import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListConfigService {

  public models = {
    user : [
      {
        title: 'konga.name',
        column: 'fullName',
        searchable: true,
        sortable: true,
        inSearch: true,
        inTitle: true
      },
      {
        title: 'Email',
        column: 'emailAddress',
        searchable: true,
        sortable: true,
        inSearch: true,
        inTitle: true
      }
    ]
  }

  constructor() { }
}
