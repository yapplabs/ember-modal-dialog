/* eslint-env node */
'use strict';

var fs = require('fs');
var path = require('path');

module.exports = {
  name: 'ember-modal-dialog',
  config: function (env, baseConfig) {
    var configPath = path.join(this.root, 'config', 'environment.js');

    if (fs.existsSync(configPath)) {
      var configGenerator = require(configPath);

      return configGenerator(env, baseConfig, this);
    }
  }

};
