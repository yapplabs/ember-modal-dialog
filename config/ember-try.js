module.exports = {
  scenarios: [
    // // Not needed, since we explicitly test ~1.12.0
    // {
    //   name: 'default',
    //   dependencies: {}
    // },
    {
      name: 'ember-1.10',
      dependencies: {
        ember: '~1.10.0',
        'ember-load-initializers': 'ember-cli/ember-load-initializers#0.0.2'
      },
      resolutions: {
        ember: '~1.10.0',
        'ember-load-initializers': 'ember-cli/ember-load-initializers#0.0.2'
      }
    },
    {
      name: 'ember-1.11',
      dependencies: {
        ember: '~1.11.0',
        'ember-load-initializers': 'ember-cli/ember-load-initializers#0.0.2'
      },
      resolutions: {
        ember: '~1.11.0',
        'ember-load-initializers': 'ember-cli/ember-load-initializers#0.0.2'
      }
    },
    {
      name: 'ember-1.12',
      dependencies: {
        ember: '~1.12.0'
      },
      resolutions: {
        ember: '~1.12.0'
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#release'
      },
      resolutions: {
        'ember': 'release'
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        'ember': 'components/ember#beta'
      },
      resolutions: {
        'ember': 'beta'
      }
    },
    {
      name: 'ember-canary',
      dependencies: {
        'ember': 'components/ember#canary'
      },
      resolutions: {
        'ember': 'canary'
      }
    }
  ]
};
