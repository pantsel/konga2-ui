export class KongConsumerJwt {

  singularName = `JWT`;

  pluralName = `JWT`;

  endpoint: string;

  fields = [
    {
      key: {
        type: 'string',
        description: 'A unique string identifying the credential. If left out, it will be auto-generated.'
      }
    },
    {
      algorithm: {
        type: 'string',
        one_of: ['HS256', 'HS384', 'HS512', 'RS256', 'ES256'],
        default: 'HS256',
        description: 'The algorithm used to verify the token’s signature. ' +
          'Can be <code>HS256</code>, <code>HS384</code>, <code>HS512</code>, <code>RS256</code>, or <code>ES256</code>.'
      }
    },
    {
      rsa_public_key: {
        type: 'text',
        description: 'If algorithm is <code>RS256</code> or <code>ES256</code>, the public key (in PEM format) to use to verify the token’s signature.'
      }
    },
    {
      secret: {
        type: 'string',
        description: 'If algorithm is <code>HS256</code> or <code>ES256</code>, the secret used to sign JWTs for this credential. If left out, will be auto-generated.'
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
      title: 'Algorithm',
      property: 'algorithm',
      searchable: true,
      sortable: true
    },
    // {
    //   title: 'Secret',
    //   property: 'secret',
    //   searchable: true,
    //   sortable: true
    // },
    {
      title: 'konga.created_at',
      property: 'created_at',
      sortable: true
    }
    ]
  
  constructor(consumerId: string) {
    this.endpoint = `consumers/${consumerId}/jwt`
  }
}