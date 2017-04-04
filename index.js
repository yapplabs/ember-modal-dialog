/* jshint node: true */
'use strict';
var path = require('path');
var fs = require('fs');

var VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-modal-dialog',

  init: function() {
    this._super.init && this._super.init.apply(this, arguments);
    var checker = new VersionChecker(this);

    if (!checker.forEmber().isAbove('0.2.6')) {
      console.warn("Warning: ember-modal-dialog requires ember-cli >= 0.2.6 "
        + "for support for the addon-templates tree, which allows "
        + "us to support various ember versions. Use an older "
        + "version of ember-modal-dialog if you are stuck on an "
        + "older ember-cli.");
    }
  }
};
