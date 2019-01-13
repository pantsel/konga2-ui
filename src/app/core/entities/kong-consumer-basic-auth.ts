export class KongConsumerBasicAuth {

  singularName = `Basic Auth`;

  pluralName = `Basic auths`;

  endpoint: string;

  fields = [
    {
      username: {
        type: 'string',
        required: true,
        description: 'The username to use in the Basic Authentication'
      }
    },
    {
      password: {
        type: 'string',
        description: 'The password to use in the Basic Authentication'
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
      title: 'Password',
      property: 'password',
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
    this.endpoint = `consumers/${consumerId}/basic-auth`
  }
}