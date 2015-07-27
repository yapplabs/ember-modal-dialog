module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: '1.10.1',
      dependencies: {
        'ember': '1.10.1',
        'ember-load-initializers': 'ember-cli/ember-load-initializers#0.0.2'
      }
    },
    {
      name: '1.11.3',
      dependencies: {
        'ember': '1.11.3',
        'ember-load-initializers': 'ember-cli/ember-load-initializers#0.0.2'
      }
    },
    {
      name: '1.12.1',
      dependencies: {
        'ember': '1.12.1'
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
