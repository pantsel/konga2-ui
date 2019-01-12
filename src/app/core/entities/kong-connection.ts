export const KongConnection = {
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