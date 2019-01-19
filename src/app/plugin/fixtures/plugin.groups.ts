
export const PluginGroups = [
  {
    id: 'authentication',
    name: 'Authentication',
    plugins: {
      'basic-auth': {
        name: 'Basic Authentication',
        description: 'Add Basic Authentication to your Services'
      },
      'hmac-auth': {
        name: 'HMAC Authentication',
        description: 'Add HMAC Authentication to your Services'
      },
      'jwt-signer': {
        name: 'Kong JWT Signer',
        description: 'Verify and (re-)sign one or two tokens in a request',
        enterprise: true
      },
      'jwt' : {
        name: 'JWT',
        description: 'Verify and authenticate JSON Web Tokens'
      },
      'key-auth': {
        name: 'Key Authentication',
        description: 'Add Key Authentication to your services'
      },
      'ldap-auth-advanced': {
        name: 'LDAP Authentication Advanced',
        description: 'Secure Kong clusters, routes and services with username and password protection',
        enterprise: true
      },
      'ldap-auth': {
        name: 'LDAP Authentication',
        description: 'Integrate Kong with a LDAP server'
      },
      'oauth2-introspection': {
        name: 'OAuth 2.0 Introspection',
        description: 'Integrate Kong with a third-party OAuth 2.0 Authorization Server',
        enterprise: true
      },
      'oauth2': {
        name: 'OAuth 2.0 Authentication',
        description: 'Add OAuth 2.0 authentication to your Services'
      },
      'openid-connect': {
        name: 'OpenID Connect',
        description: 'Integrate Kong with a third-party OpenID Connect 1.0 provider',
        enterprise: true
      }
    }
  },
  {
    id: 'security',
    name: 'Security',
    plugins: {
      'bot-detection': {
        name: 'Bot Detection',
        description: 'Detect and block bots or custom clients'
      },
      'cors': {
        name: 'CORS',
        description: 'Allow developers to make requests from the browser'
      },
      'ip-restriction': {
        name: 'IP Restriction',
        description: 'Whitelist or blacklist IPs that can make requests to your Services'
      }
    }
  },
  {
    id: 'traffic-control',
    name: 'Traffic Control',
    plugins: {
      'acl': {
        name: 'ACL',
        description: 'Control which consumers can access Services'
      },
      'canary': {
        name: 'Canary Release',
        description: 'Slowly roll out software changes to a subset of users',
        enterprise: true
      },
      'forward-proxy': {
        name: 'Forward Proxy Advanced',
        description: 'Allows Kong to connect to intermediary transparent HTTP proxies',
        enterprise: true
      },
      'proxy-cache': {
        name: 'Proxy Caching',
        description: 'Cache and serve commonly requested responses in Kong',
        enterprise: true
      },
      'rate-limiting-advanced': {
        name: 'Rate Limiting Advanced',
        description: 'Upgrades Kong Rate Limiting with more flexibility and higher performance',
        enterprise: true
      },
      'rate-limiting': {
        name: 'Rate Limiting',
        description: 'Rate-limit how many HTTP requests a developer can make'
      },
      'request-size-limiting': {
        name: 'Request Size Limiting',
        description: 'Block requests with bodies greater than a specified size'
      },
      'request-termination': {
        name: 'Request Termination',
        description: 'Terminates all requests with a specific response'
      },
      'response-rate-limiting': {
        name: 'Response Rate Limiting',
        description: 'Rate-limiting based on a custom response header value'
      },
      'route-by-header': {
        name: 'Route by Header',
        description: 'Route request based on request headers',
        enterprise: true
      }
    }
  },
  {
    id: 'serverless',
    name: 'Serverless',
    plugins: {
      'aws-lambda': {
        name: 'AWS Lambda',
        description: 'Invoke and manage AWS Lambda functions from Kong'
      },
      'azure-functions': {
        name: 'Azure Functions',
        description: 'Invoke and manage Azure functions from Kong'
      },
      'openwhisk': {
        name: 'Apache OpenWhisk',
        description: 'Invoke and manage OpenWhisk actions from Kong'
      },
      'serverless-functions': {
        name: 'Serverless Functions',
        description: 'Dynamically run Lua code from Kong during the access phase'
      }
    }
  },
  {
    id: 'analytics-monitoring',
    name: 'Analytics & Monitoring',
    plugins: {
      'datadog' : {
        name: 'Datadog',
        description: 'Visualize metrics on Datadog'
      },
      'prometheus': {
        name: 'Prometheus',
        description: 'Expose metrics related to Kong and proxied upstream services in Prometheus exposition format'
      },
      'zipkin': {
        name: 'Zipkin',
        description: 'Propagate Zipkin spans and report space to a Zipkin server'
      }
    }
  },
  {
    id: 'transformations',
    name: 'Transformations',
    plugins: {
      'correlation-id': {
        name: 'Correlation ID',
        description: 'Correlate requests and responses using a unique ID'
      },
      'request-transformer-advanced': {
        name: 'Request Transformer Advanced',
        description: 'Use powerful regular expressions, variables and templates to transform API requests',
        enterprise: true
      },
      'request-transformer': {
        name: 'Request Transformer',
        description: 'Modify the request before hitting the upstream server'
      },
      'response-transformer': {
        name: 'Response Transformer',
        description: 'Modify the upstream response before returning it to the client'
      }
    }
  },
  {
    id: 'logging',
    name: 'Logging',
    plugins: {
      'file-log': {
        name: 'File Log',
        description: 'Append request and response data to a log file on disk'
      },
      'http-log': {
        name: 'HTTP Log',
        description: 'Send request and response logs to an HTTP server'
      },
      'loggly': {
        name: 'Loggly',
        description: 'Send request and response logs to Loggly'
      },
      'statsd-advanced': {
        name: 'StatsD Advanced',
        description: 'Send metrics to StatsD with more flexible options',
        enterprise: true
      },
      'statsd': {
        name: 'StatsD',
        description: 'Send request and response logs to StatsD'
      },
      'syslog': {
        name: 'Syslog',
        description: 'Send request and response logs to Syslog'
      },
      'tcp-log': {
        name: 'TCP Log',
        description: 'Send request and response logs to a TCP server'
      },
      'udp-log': {
        name: 'UDP Log',
        description: 'Send request and response logs to a UDP server'
      }
    }
  },
  {
    id: 'other',
    name: 'Other',
    plugins: {

    }
  }
]