module.exports = {
  scenarios: [
    {
      name: 'Ember Canary',
      dependencies: {
        "ember": "components/ember#canary"
      },
      resolutions: {
        "ember": "canary"
      }
    },
    {
      name: 'Ember Beta',
      dependencies: {
        "ember": "components/ember#beta"
      },
      resolutions: {
        "ember": "beta"
      }
    },
    {
      name: "Ember 1.11.1",
      dependencies: {
        "ember": "1.11.1"
      }
    },
    {
      name: "Ember 1.10.0",
      dependencies: {
        "ember": "1.10.0"
      }
    }
  ]
};
