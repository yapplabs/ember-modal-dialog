/* eslint-env node */
'use strict';

var VersionChecker = require('ember-cli-version-checker');

module.exports = function( environment, appConfig, addon ) {
  appConfig['ember-modal-dialog'] = appConfig['ember-modal-dialog'] || {};

  var checker = new VersionChecker(addon);
  var hasEmberTether = checker.for('ember-tether', 'npm').version;

  appConfig['ember-modal-dialog']['hasEmberTether'] = hasEmberTether;

  return appConfig;
};
