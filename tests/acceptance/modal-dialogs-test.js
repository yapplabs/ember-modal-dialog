import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from '../helpers/start-app';

import QUnit from 'qunit';

var modalRootElementSelector = '#modal-overlays';
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
    if (options.whileOpen) {
      options.whileOpen();
    }
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
    hasOverlay: true,
    whileOpen: function(){
      assert.ok(Ember.$(`${modalRootElementSelector} ${overlaySelector}`).hasClass('custom-styles-modal'), 'has provided overlay-class');
      assert.ok(Ember.$(`${modalRootElementSelector} ${dialogSelector}`).hasClass('custom-styles-modal-container'), 'has provided container-class');
    }
  });
  assert.dialogOpensAndCloses({
    openSelector: '#example-custom-styles button',
    dialogText: 'Custom Styles',
    closeSelector: dialogCloseButton,
    hasOverlay: true
  });

  assert.dialogOpensAndCloses({
    openSelector: '#example-alignment-target-selector button',
    dialogText: 'Alignment Target - Selector',
    closeSelector: dialogCloseButton,
    hasOverlay: false,
    whileOpen: function(){
      assert.ok(Ember.$(`${modalRootElementSelector} ${dialogSelector}`).hasClass('ember-modal-dialog-right'), 'has alignment class name');
    }
  });

  assert.dialogOpensAndCloses({
    openSelector: '#example-alignment-target-view button',
    dialogText: 'Alignment Target - View',
    closeSelector: dialogCloseButton,
    hasOverlay: false
  });

  assert.dialogOpensAndCloses({
    openSelector: '#example-alignment-target-element button',
    dialogText: 'Alignment Target - Element',
    closeSelector: dialogCloseButton,
    hasOverlay: false
  });

  assert.dialogOpensAndCloses({
    openSelector: '#example-subclass button',
    dialogText: 'Via Subclass',
    closeSelector: dialogCloseButton,
    hasOverlay: true,
    whileOpen: function(){
      assert.ok(Ember.$(`${modalRootElementSelector} ${dialogSelector}`).hasClass('my-cool-modal'), 'has provided containerClassNames');
    }
  });

  click('#example-in-place button');
  var dialogText = 'In Place';
  var defaultSelector = [modalRootElementSelector, dialogSelector, ':contains(' + dialogText + ')'].join(' ');
  var inPlaceDialogSelector = dialogSelector + '.ember-modal-dialog-in-place';
  var inPlaceRootSelector = '#container-in-place';
  var inPlaceSelector = [inPlaceRootSelector, inPlaceDialogSelector, ':contains(' + dialogText + ')'].join(' ');
  var inPlaceCloseButton = [inPlaceRootSelector, inPlaceDialogSelector, 'button'].join(' ');
  andThen(function() {
    assert.isAbsent(defaultSelector);
    assert.isPresentOnce(inPlaceSelector);
  });

  click(inPlaceCloseButton);
  andThen(function() {
    assert.isAbsent(defaultSelector);
    assert.isAbsent(inPlaceSelector);
  });
});
