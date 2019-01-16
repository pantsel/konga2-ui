export class KongConsumerHmacAuth {

  singularName = `HMAC Auth`;

  pluralName = `HMAC Auths`;

  endpoint: string;

  fields = [
    {
      username: {
        type: 'string',
        required: true,
        description: 'The username to use in the HMAC Signature verification.'
      }
    },
    {
      secret: {
        type: 'string',
        description: 'The secret to use in the HMAC Signature verification. ' +
          'Note that if this parameter isn’t provided, Kong will generate a value for you and send it as part of the response body'
      }
    }
  ];

  titleItems = [
    {
      title: 'Username',
      property: 'username',
      searchable: true,
      sortable: true
    },
    {
      title: 'Secret',
      property: 'secret',
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
    this.endpoint = `consumers/${consumerId}/hmac-auth`
  }
}