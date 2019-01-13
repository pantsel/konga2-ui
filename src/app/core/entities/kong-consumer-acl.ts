export class KongConsumerAcl {

  singularName = `Group`;

  pluralName = `Groups`;

  endpoint: string;

  fields = [
    {
      group: {
        type: 'string',
        required: true,
        description: 'The name of the group'
      }
    }
  ];

  titleItems = [
    {
      title: 'id',
      property: 'id',
      searchable: true,
      hidden: true,
    },
    {
      title: 'Group',
      property: 'group',
      searchable: true,
      sortable: true,
      hidden: false,
    },
    {
      title: 'konga.created_at',
      property: 'created_at',
      sortable: true,
      hidden: false
    }
    ]
  
  constructor(consumerId: string) {
    this.endpoint = `consumers/${consumerId}/acls`
  }
}