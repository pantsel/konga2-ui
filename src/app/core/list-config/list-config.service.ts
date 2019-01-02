import { Injectable } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ListConfigService {

  public models: any;
  public defaultLimit: 30;

  constructor(domSanitizer: DomSanitizer) {
    this.models = {
      user : [
        {
          title: '',
          property: 'isSuperAdmin',
          type: 'html',
          width: 1,
          html: (isSuperAdmin) => {
            return domSanitizer.bypassSecurityTrustHtml(`
            <mat-icon>${isSuperAdmin ? 'stars' : 'account_box'}</mat-icon>
          `);
          }
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
          type: 'date',
          sortable: true,
        }
      ]
    }
  }
}
