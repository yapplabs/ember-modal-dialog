/* eslint-env node */
'use strict';

var VersionChecker = require('ember-cli-version-checker');

module.exports = function( environment, appConfig, addon ) {
  appConfig['ember-modal-dialog'] = appConfig['ember-modal-dialog'] || {};

  var checker = new VersionChecker(addon);
  var hasLiquidWormhole = checker.for('liquid-wormhole', 'npm').version;
  var hasLiquidTether = checker.for('liquid-tether', 'npm').version;
  var hasEmberTether = checker.for('ember-tether', 'npm').version;

  appConfig['ember-modal-dialog']['hasLiquidWormhole'] = hasLiquidWormhole;
  appConfig['ember-modal-dialog']['hasLiquidTether'] = hasLiquidTether;
  appConfig['ember-modal-dialog']['hasEmberTether'] = hasEmberTether;

  return appConfig;
};
