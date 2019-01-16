export class KongConsumerKeyAuth {

  singularName = `Key Auth`;

  pluralName = `Key auths`;

  endpoint: string;

  fields = [
    {
      key: {
        type: 'string',
        description: 'You can optionally set your own unique <code>key</code> to authenticate the client. If missing, the plugin will generate one.'
      }
    }
  ];

  titleItems = [
    {
      title: 'Key',
      property: 'key',
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
    this.endpoint = `consumers/${consumerId}/key-auth`
  }
}