import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Entities {

  public models: any;

  constructor() {
    this.models = {
      service: {
        endpoint: `services`,
        fields: [{
          name: {
            type: 'string',
            description: 'The Service name.'
          },
        },

        // {
        //   url: {
        //     type: 'string',
        //     description: 'Shorthand attribute to set protocol, host, port and path at once. This attribute is write-only (the Admin API never “returns” the url).'
        //   },
        // },

        {
          protocol: {
            type: 'string',
            one_of: ['http', 'https'],
            default: 'http',
            description: 'The protocol used to communicate with the upstream. It can be one of http or https. Defaults to "http".'
          },
        }, {
          host: {
            type: 'string',
            required: true,
            description: 'The host of the upstream server.'
          },
        }, {
          port: {
            type: 'integer',
            required: true,
            default: 80,
            description: 'The upstream server port. Defaults to 80.'
          },
        }, {
          path: {
            type: 'string',
            required: true,
            description: 'The path to be used in requests to the upstream server.'
          },
        }, {
          retries: {
            type: 'integer',
            default: 5,
            description: 'The number of retries to execute upon failure to proxy. Defaults to 5.'
          },
        }, {
          connect_timeout: {
            type: 'integer',
            default: 60000,
            description: 'The timeout in milliseconds for establishing a connection to the upstream server. Defaults to 60000.'
          },
        }, {
          write_timeout: {
            type: 'integer',
            default: 60000,
            description: 'The timeout in milliseconds between two successive write operations for transmitting a request to the upstream server. Defaults to 60000.'
          },
        }, {
          read_timeout: {
            type: 'integer',
            default: 60000,
            description: 'The timeout in milliseconds between two successive read operations for transmitting a request to the upstream server. Defaults to 60000.'
          },
        }],
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
      user: {
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
      connection: {
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
