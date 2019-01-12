export const User = {
  endpoint: `users`,
  titleItems: [
    {
      title: '',
      property: 'active',
      width: 1,
      sortable: true
    },
    {
      title: '',
      property: 'isSuperAdmin',
      width: 1,
      sortable: true
    },
    {
      title: 'konga.name',
      property: 'fullName',
      searchable: true,
      sortable: true,
      inTitle: true
    },
    {
      title: 'Email',
      property: 'emailAddress',
      searchable: true,
      sortable: true,
      inTitle: true
    },
    {
      title: 'konga.created_at',
      property: 'createdAt',
      sortable: true,
    }
    ]
}