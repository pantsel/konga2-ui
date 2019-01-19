export class KongPlugin {

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

  constructor(name?, singularName?, schema?) {
    if (singularName) this.singularName = singularName;
    if (schema) {
      const enabledField = {
        enabled: {
          type: 'boolean',
          default: true
        }
      }

      this.fields = schema.fields && Object.keys(schema.fields).length ? [enabledField].concat(schema.fields) : [enabledField];
    }

  }
}