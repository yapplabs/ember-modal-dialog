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
    if (!checker.for('ember-cli', 'npm').isAbove('0.2.6')) {
      console.warn("Warning: ember-modal-dialog requires ember-cli >= 0.2.6 "
                   + "for support for the addon-templates tree, which allows "
                   + "us to support various ember versions. Use an older "
                   + "version of ember-modal-dialog if you are stuck on an "
                   + "older ember-cli.");
    }
  },

  treeForAddonTemplates: function treeForAddonTemplates (tree) {
    var checker = new VersionChecker(this);
    var dep = checker.for('ember', 'bower');

    var baseTemplatesPath = path.join(this.root, 'addon/templates');

    if (dep.lt('1.13.0-beta.1')) {
      return this.treeGenerator(path.join(baseTemplatesPath, 'lt-1-13'));
    } else {
      return this.treeGenerator(path.join(baseTemplatesPath, 'current'));
    }
  }
};
