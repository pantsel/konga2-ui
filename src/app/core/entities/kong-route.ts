export const KongRoute = {
  singularName: `konga.route`,
  pluralName: `konga.routes`,
  endpoint: `routes`,
  fields: [
    {
      name: {
        description: 'The name of the route',
        type: 'string'
      }
    },
    {
      protocols: {
        description: 'A list of the protocols this Route should allow. When set to ["https"], HTTP requests are answered with a request to upgrade to HTTPS. Defaults to ["http", "https"].',
        default: ['http', 'https'],
        options: ['http', 'https', 'tcp', 'tls'],
        type: 'array'
      }
    },
    {
      methods: {
        description: 'A list of HTTP methods that match this Route. When using http or https protocols, at least one of hosts, paths, or methods must be set.',
        options: ['OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        type: 'array'
      }
    },
    {
      hosts: {
        description: 'A list of domain names that match this Route. When using http or https protocols, at least one of hosts, paths, or methods must be set.',
        type: 'array'
      }
    },
    {
      paths: {
        description: 'A list of paths that match this Route. When using http or https protocols, at least one of hosts, paths, or methods must be set.',
        type: 'array'
      }
    },
    {
      regex_priority : {
        description: 'A number used to choose which route resolves a given request when several routes match it using regexes simultaneously. When two routes match the path and have the same regex_priority, the older one (lowest created_at) is used. Note that the priority for non-regex routes is different (longer non-regex routes are matched before shorter ones). Defaults to 0.',
        type: 'integer'
      }
    },
    {
      strip_path: {
        description: 'When matching a Route via one of the paths, strip the matching prefix from the upstream request URL. Defaults to true.',
        default: true,
        type: 'boolean'
      }
    },
    {
      preserve_host: {
        description: 'When matching a Route via one of the hosts domain names, use the request Host header in the upstream request headers. If set to false, the upstream Host header will be that of the Service’s host.',
        default: false,
        type: 'boolean'
      }
    },
    // {
    //   snis: {
    //     description: 'A list of SNIs that match this Route when using stream routing. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set.',
    //     type: 'array'
    //   }
    // },
    // {
    //   sources: {
    //     description: 'A list of IP sources of incoming connections that match this Route when using stream routing. Each entry is an object with fields “ip” (optionally in CIDR range notation) and/or “port”. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set',
    //     type: 'array'
    //   }
    // },
    // {
    //   destinations: {
    //     description: 'A list of IP destinations of incoming connections that match this Route when using stream routing. Each entry is an object with fields “ip” (optionally in CIDR range notation) and/or “port”. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set.',
    //     type: 'array'
    //   }
    // }
  ],
  titleItems: [
    {
      title: 'konga.name',
      property: 'name',
      width: 1,
      searchable: true,
      sortable: true
    },
    {
      title: 'konga.hosts',
      property: 'hosts',
      searchable: true,
      sortable: true
    },
    {
      title: 'konga.paths',
      property: 'paths',
      searchable: true,
      sortable: true
    },
    {
      title: 'konga.created_at',
      property: 'created_at',
      sortable: true,
    }
    ]
}