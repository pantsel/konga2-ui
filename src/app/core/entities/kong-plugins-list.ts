export class KongPluginsList {

  singularName = `Plugin`;

  pluralName = `Plugins`;

  endpoint = `plugins`;

  fields = [];

  titleItems = [
    {
      title: '',
      property: 'enabled',
    },
    {
      title: 'konga.name',
      property: 'name',
      searchable: true,
      sortable: true
    },
    {
      title: 'konga.consumer',
      property: 'consumer.id'
    },
    {
      title: 'konga.created_at',
      property: 'created_at',
      sortable: true
    }
  ]

  constructor(endpoint?) {
    if (endpoint) this.endpoint = endpoint;
  }
}