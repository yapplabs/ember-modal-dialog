import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from '../helpers/start-app';

import QUnit from 'qunit';

var modalRootElementSelector = '#custom-modal-root-element';
var overlaySelector = '.ember-modal-overlay';
var dialogSelector = '.ember-modal-dialog';

QUnit.assert.isPresentOnce = function(selector, message) {
  message = message || selector + ' is present in DOM once';
  return this.equal(findWithAssert(selector).length, 1, message);
};

QUnit.assert.isAbsent = function(selector, message) {
  message = message || selector + ' is absent from DOM';
  return this.equal(find(selector).length, 0, message);
};

QUnit.assert.isVisible = function(selector, message) {
  message = message || selector + ' is not visible';
  return this.ok(findWithAssert(selector).is(':visible'), message);
};

QUnit.assert.dialogOpensAndCloses = function(options, message) {
  message = message || 'Dialog triggered by ' + options.openSelector + ' failed to open and close';
  var dialogContent = [modalRootElementSelector, dialogSelector, ':contains(' + options.dialogText + ')'].join(' ');
  var self = this;
  return click(options.openSelector).then(function() {
    if (options.hasOverlay) {
      self.isPresentOnce(overlaySelector);
    }
    self.isPresentOnce(dialogContent);
    return click(options.closeSelector).then(function() {
      self.isAbsent(overlaySelector);
      self.isAbsent(dialogContent);
    });
  });
};

var application;

module('Acceptance: Display Modal Dialogs', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('opening and closing modals', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentPath(), 'index');
    assert.isPresentOnce(modalRootElementSelector);
    assert.isAbsent(overlaySelector);
    assert.isPresentOnce('#example-basic button');
  });

  var dialogCloseButton = [modalRootElementSelector, dialogSelector, 'button'].join(' ');

  assert.dialogOpensAndCloses({
    openSelector: '#example-basic button',
    dialogText: 'Basic',
    closeSelector: overlaySelector,
    hasOverlay: true
  });
  assert.dialogOpensAndCloses({
    openSelector: '#example-basic button',
    dialogText: 'Basic',
    closeSelector: dialogCloseButton,
    hasOverlay: true
  });

  assert.dialogOpensAndCloses({
    openSelector: '#example-translucent button',
    dialogText: 'With Translucent Overlay',
    closeSelector: overlaySelector,
    hasOverlay: true
  });
  assert.dialogOpensAndCloses({
    openSelector: '#example-translucent button',
    dialogText: 'With Translucent Overlay',
    closeSelector: dialogCloseButton,
    hasOverlay: true
  });

  assert.dialogOpensAndCloses({
    openSelector: '#example-custom-styles button',
    dialogText: 'Custom Styles',
    closeSelector: overlaySelector,
    hasOverlay: true
  });
  assert.dialogOpensAndCloses({
    openSelector: '#example-custom-styles button',
    dialogText: 'Custom Styles',
    closeSelector: dialogCloseButton,
    hasOverlay: true
  });

  assert.dialogOpensAndCloses({
    openSelector: '#example-alignment-target button',
    dialogText: 'Alignment Target',
    closeSelector: dialogCloseButton,
    hasOverlay: false
  });
});
