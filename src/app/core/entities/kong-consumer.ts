export const KongConsumer = {
  singularName: `konga.consumer`,
  pluralName: `konga.consumers`,
  endpoint: `consumers`,
  fields: [
    {
      username: {
        description: 'The unique username of the consumer. You must send either this field or custom_id with the request',
        type: 'string'
      }
    },
    {
      custom_id: {
        description: 'Field for storing an existing unique ID for the consumer - useful for mapping Kong with users in your existing database. You must send either this field or username with the request',
        type: 'string'
      }
    }
  ],
  titleItems: [
    {
      title: 'id',
      property: 'id',
      searchable: true,
      hidden: true
    },
    {
      title: 'Username/Id',
      property: 'username',
      searchable: true,
      sortable: true,
      hidden: false
    },
    {
      title: 'Custom id',
      property: 'custom_id',
      searchable: true,
      sortable: true,
      hidden: false
    },
    {
      title: 'konga.created_at',
      property: 'created_at',
      sortable: true,
      hidden: false
    }
  ]
}