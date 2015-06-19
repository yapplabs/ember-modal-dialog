/* jshint node: true */
'use strict';
var path = require('path');
var fs = require('fs');

var VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-modal-dialog',

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
