/* jshint node: true */
'use strict';
var path = require('path');
var fs = require('fs');
var semver = require('semver');
var stew = require('broccoli-stew');

module.exports = {
  name: 'ember-modal-dialog',
  treeForAddonTemplates: function treeForAddonTemplates (tree) {
    if (useLegacyBindingSyntax(this)) {
      tree = stew.rm(tree, 'components/modal-dialog.hbs');
      tree = stew.mv(tree, 'components/modal-dialog-legacy.hbs', 'components/modal-dialog.hbs');
    } else {
      tree = stew.rm(tree, 'components/modal-dialog-legacy.hbs');
    }
    return tree;
  }
};

function useLegacyBindingSyntax(addon){
  var emberVersion = getEmberVersion(addon);
  if (/canary/.test(emberVersion)) { return false; }
  if (/beta/.test(emberVersion)) { return false; }
  if (/beta/.test(emberVersion)) { return false; }
  return semver.lt(emberVersion, '1.13.0');
}

function getEmberVersion(addon) {
  if (!addon.project) {
    return null;
  }

  var bowerPath = path.join(addon.project.root, 'bower.json')
  var bowerObj = JSON.parse(fs.readFileSync(bowerPath, 'utf8'));
  return bowerObj.dependencies.ember;
}
