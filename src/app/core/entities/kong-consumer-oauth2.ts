export class KongConsumerOauth2 {

  singularName = `Oauth2`;

  pluralName = `Oauth2`;

  endpoint: string;

  fields = [
    {
      name: {
        type: 'string',
        required: true,
        description: 'The name to associate to the credential. In OAuth 2.0 this would be the application name.'
      }
    },
    {
      client_id: {
        type: 'string',
        description: 'You can optionally set your own unique <code>client_id</code>. If missing, the plugin will generate one.'
      }
    },
    {
      client_secret: {
        type: 'string',
        description: 'You can optionally set your own unique <code>client_secret</code>. If missing, the plugin will generate one.'
      }
    },
    {
      redirect_uris: {
        type: 'array',
        required: true,
        description: 'An array with one or more URLs in your app where users ' +
          'will be sent after authorization (<a href="https://tools.ietf.org/html/rfc6749#section-3.1.2">RFC 6742 Section 3.1.2</a>)'
      }
    }
  ];

  titleItems = [
    {
      title: 'Name',
      property: 'name',
      searchable: true,
      sortable: true
    },
    {
      title: 'Client id',
      property: 'client_id',
      searchable: true,
      sortable: true
    },
    {
      title: 'Redirect URIs',
      property: 'redirect_uris',
      searchable: true,
      sortable: true
    },
    {
      title: 'konga.created_at',
      property: 'created_at',
      sortable: true
    }
    ]
  
  constructor(consumerId: string) {
    this.endpoint = `consumers/${consumerId}/oauth2`
  }
}