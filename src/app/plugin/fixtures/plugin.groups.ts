
export const PluginGroups = [
  {
    id: 'authentication',
    name: 'Authentication',
    plugins: {}
  },
  {
    id: 'security',
    name: 'Security',
    plugins: {}
  },
  {
    id: 'traffic-control',
    name: 'Traffic Control',
    plugins: {}
  },
  {
    id: 'serverless',
    name: 'Serverless',
    plugins: {}
  },
  {
    id: 'analytics-monitoring',
    name: 'Analytics & Monitoring',
    plugins: {}
  },
  {
    id: 'transformations',
    name: 'Transformations',
    plugins: {}
  },
  {
    id: 'logging',
    name: 'Logging',
    plugins: {}
  },
  {
    id: 'other',
    name: 'Other',
    plugins: {

    }
  }
]


export const KnownPlugins = {
  // Authentication
    'basic-auth': {
      name: 'Basic Authentication',
      description: 'Add Basic Authentication to your Services',
      group: 'authentication'
    },
    'hmac-auth': {
      name: 'HMAC Authentication',
      description: 'Add HMAC Authentication to your Services',
      group: 'authentication'
    },
    'jwt-signer': {
      name: 'Kong JWT Signer',
      description: 'Verify and (re-)sign one or two tokens in a request',
      group: 'authentication',
      enterprise: true
    },
    'jwt' : {
      name: 'JWT',
      description: 'Verify and authenticate JSON Web Tokens',
      group: 'authentication',
    },
    'key-auth': {
      group: 'authentication',
      name: 'Key Authentication',
      description: 'Add Key Authentication to your services'
    },
    'ldap-auth-advanced': {
      group: 'authentication',
      name: 'LDAP Authentication Advanced',
      description: 'Secure Kong clusters, routes and services with username and password protection',
      enterprise: true
    },
    'ldap-auth': {
      group: 'authentication',
      name: 'LDAP Authentication',
      description: 'Integrate Kong with a LDAP server'
    },
    'oauth2-introspection': {
      group: 'authentication',
      name: 'OAuth 2.0 Introspection',
      description: 'Integrate Kong with a third-party OAuth 2.0 Authorization Server',
      enterprise: true
    },
    'oauth2': {
      group: 'authentication',
      name: 'OAuth 2.0 Authentication',
      description: 'Add OAuth 2.0 authentication to your Services'
    },
    'openid-connect': {
      group: 'authentication',
      name: 'OpenID Connect',
      description: 'Integrate Kong with a third-party OpenID Connect 1.0 provider',
      enterprise: true
    },
    // Security
    'bot-detection': {
      group: 'security',
      name: 'Bot Detection',
      description: 'Detect and block bots or custom clients'
    },
    'cors': {
      group: 'security',
      name: 'CORS',
      description: 'Allow developers to make requests from the browser'
    },
    'ip-restriction': {
      group: 'security',
      name: 'IP Restriction',
      description: 'Whitelist or blacklist IPs that can make requests to your Services'
    },

    // Traffic Control
    'acl': {
      group: 'traffic-control',
      name: 'ACL',
      description: 'Control which consumers can access Services'
    },
    'canary': {
      group: 'traffic-control',
      name: 'Canary Release',
      description: 'Slowly roll out software changes to a subset of users',
      enterprise: true
    },
    'forward-proxy': {
      group: 'traffic-control',
      name: 'Forward Proxy Advanced',
      description: 'Allows Kong to connect to intermediary transparent HTTP proxies',
      enterprise: true
    },
    'proxy-cache': {
      group: 'traffic-control',
      name: 'Proxy Caching',
      description: 'Cache and serve commonly requested responses in Kong',
      enterprise: true
    },
    'rate-limiting-advanced': {
      group: 'traffic-control',
      name: 'Rate Limiting Advanced',
      description: 'Upgrades Kong Rate Limiting with more flexibility and higher performance',
      enterprise: true
    },
    'rate-limiting': {
      group: 'traffic-control',
      name: 'Rate Limiting',
      description: 'Rate-limit how many HTTP requests a developer can make'
    },
    'request-size-limiting': {
      group: 'traffic-control',
      name: 'Request Size Limiting',
      description: 'Block requests with bodies greater than a specified size'
    },
    'request-termination': {
      group: 'traffic-control',
      name: 'Request Termination',
      description: 'Terminates all requests with a specific response'
    },
    'response-ratelimiting': {
      group: 'traffic-control',
      name: 'Response Rate Limiting',
      description: 'Rate-limiting based on a custom response header value'
    },
    'route-by-header': {
      group: 'traffic-control',
      name: 'Route by Header',
      description: 'Route request based on request headers',
      enterprise: true
    },

    // Serverless
    'aws-lambda': {
      group: 'serverless',
      name: 'AWS Lambda',
      description: 'Invoke and manage AWS Lambda functions from Kong'
    },
    'azure-functions': {
      group: 'serverless',
      name: 'Azure Functions',
      description: 'Invoke and manage Azure functions from Kong'
    },
    'openwhisk': {
      group: 'serverless',
      name: 'Apache OpenWhisk',
      description: 'Invoke and manage OpenWhisk actions from Kong'
    },
    // 'serverless-functions': {
    //   group: 'serverless',
    //   name: 'Serverless Functions',
    //   description: 'Dynamically run Lua code from Kong during the access phase'
    // },
    'pre-function': {
      group: 'serverless',
      name: 'Serverless Functions (Pre-function)',
      description: 'Dynamically run Lua code from Kong before other plugins run during access phase'
    },
    'post-function': {
      group: 'serverless',
      name: 'Serverless Functions (Post-function)',
      description: 'Dynamically run Lua code from Kong after other plugins run during access phase'
    },

    // Analytics & Monitoring
    'datadog' : {
      group: 'analytics-monitoring',
      name: 'Datadog',
      description: 'Visualize metrics on Datadog'
    },
    'prometheus': {
      group: 'analytics-monitoring',
      name: 'Prometheus',
      description: 'Expose metrics related to Kong and proxied upstream services in Prometheus exposition format'
    },
    'zipkin': {
      group: 'analytics-monitoring',
      name: 'Zipkin',
      description: 'Propagate Zipkin spans and report space to a Zipkin server'
    },


    // Transformations
    'correlation-id': {
      group: 'transformations',
      name: 'Correlation ID',
      description: 'Correlate requests and responses using a unique ID'
    },
    'request-transformer-advanced': {
      group: 'transformations',
      name: 'Request Transformer Advanced',
      description: 'Use powerful regular expressions, variables and templates to transform API requests',
      enterprise: true
    },
    'request-transformer': {
      group: 'transformations',
      name: 'Request Transformer',
      description: 'Modify the request before hitting the upstream server'
    },
    'response-transformer': {
      group: 'transformations',
      name: 'Response Transformer',
      description: 'Modify the upstream response before returning it to the client'
    },


    // Logging
    'file-log': {
      group: 'logging',
      name: 'File Log',
      description: 'Append request and response data to a log file on disk'
    },
    'http-log': {
      group: 'logging',
      name: 'HTTP Log',
      description: 'Send request and response logs to an HTTP server'
    },
    'loggly': {
      group: 'logging',
      name: 'Loggly',
      description: 'Send request and response logs to Loggly'
    },
    'statsd-advanced': {
      group: 'logging',
      name: 'StatsD Advanced',
      description: 'Send metrics to StatsD with more flexible options',
      enterprise: true
    },
    'statsd': {
      group: 'logging',
      name: 'StatsD',
      description: 'Send request and response logs to StatsD'
    },
    'syslog': {
      group: 'logging',
      name: 'Syslog',
      description: 'Send request and response logs to Syslog'
    },
    'tcp-log': {
      group: 'logging',
      name: 'TCP Log',
      description: 'Send request and response logs to a TCP server'
    },
    'udp-log': {
      group: 'logging',
      name: 'UDP Log',
      description: 'Send request and response logs to a UDP server'
    }

  }
