export class KongPlugin {

  singularName = `Plugin`;

  pluralName = `Plugins`;

  endpoint = `plugins`;


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
      title: 'konga.scope',
      property: 'scope'
    },
    {
      title: 'konga.applyTo',
      property: 'applyTo'
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

  constructor() {}
}