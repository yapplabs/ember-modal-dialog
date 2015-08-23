import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
const modalRootElementSelector = '#modal-overlays';
const overlaySelector = '.ember-modal-overlay';
const dialogSelector = '.ember-modal-dialog';
const dialogCloseButton = [dialogSelector, 'button'].join(' ');

module('Acceptance: Display Modal Dialogs Without Tether', {
  beforeEach: function() {
    application = startApp({
      emberModalDialog: {
        defaultStructure: 'simple'
      }
    });
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('basic modal', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentPath(), 'index');
    assert.isPresentOnce(modalRootElementSelector);
    assert.isAbsent(overlaySelector);
    assert.isPresentOnce('#example-basic button');
  });

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
});

test('modal with translucent overlay', function(assert) {
  visit('/');

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
});

test('modal without overlay', function(assert) {
  visit('/');

  assert.dialogOpensAndCloses({
    openSelector: '#example-without-overlay button',
    dialogText: 'Without Overlay',
    closeSelector: '#example-without-overlay button'
  });

  assert.dialogOpensAndCloses({
    openSelector: '#example-without-overlay button',
    dialogText: 'Without Overlay',
    closeSelector: dialogCloseButton
  });
});

test('modal without overlay click outside to close', function(assert) {
  visit('/');

  assert.dialogOpensAndCloses({
    openSelector: '#example-without-overlay-click-outside-to-close button',
    dialogText: 'Without Overlay - Click Outside to Close',
    closeSelector: '#example-without-overlay-click-outside-to-close button'
  });

  assert.dialogOpensAndCloses({
    openSelector: '#example-without-overlay-click-outside-to-close button',
    dialogText: 'Without Overlay - Click Outside to Close',
    closeSelector: '#example-without-overlay-click-outside-to-close'
  });
});

test('modal with custom styles', function(assert) {
  visit('/');

  assert.dialogOpensAndCloses({
    openSelector: '#example-custom-styles button',
    dialogText: 'Custom Styles',
    closeSelector: overlaySelector,
    hasOverlay: true,
    whileOpen: function() {
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
});

test('target - selector', function(assert) {
  visit('/');

  assert.dialogOpensAndCloses({
    openSelector: '#example-target-selector button',
    dialogText: 'Target - Selector',
    closeSelector: dialogCloseButton,
    hasOverlay: false,
    tethered: true,
    whileOpen: function() {
      assert.ok(Ember.$(dialogSelector).hasClass('ember-modal-dialog-target-attachment-left'), 'has targetAttachment class name');
    }
  });
});

test('target - element', function(assert) {
  visit('/');

  assert.dialogOpensAndCloses({
    openSelector: '#example-target-element button',
    dialogText: 'Target - Element',
    closeSelector: dialogCloseButton,
    hasOverlay: false,
    tethered: true
  });
});

test('target - view', function(assert) {
  visit('/');

  assert.dialogOpensAndCloses({
    openSelector: '#example-target-view button',
    dialogText: 'Target - View',
    closeSelector: dialogCloseButton,
    hasOverlay: false,
    tethered: true
  });
});

test('subclassed modal', function(assert) {
  visit('/');

  assert.dialogOpensAndCloses({
    openSelector: '#example-subclass button',
    dialogText: 'Via Subclass',
    closeSelector: overlaySelector,
    hasOverlay: true,
    whileOpen: function() {
      assert.ok(Ember.$(dialogSelector).hasClass('my-cool-modal'), 'has provided containerClassNames');
    }
  });
});

// TODO: Reorganize.. uses in-place not simple
test('in place', function(assert) {
  visit('/');

  click('#example-in-place button');
  var dialogText = 'In Place';
  // var defaultSelector = [modalRootElementSelector, dialogSelector, ':contains(' + dialogText + ')'].join(' ');
  // var inPlaceDialogSelector = dialogSelector + '.ember-modal-dialog-in-place';
  var inPlaceRootSelector = '#container-in-place';
  var inPlaceSelector = [inPlaceRootSelector, ':contains(' + dialogText + ')'].join('');
  var inPlaceCloseButton = [inPlaceRootSelector, 'button'].join(' ');
  andThen(function() {
    assert.isPresentOnce(inPlaceSelector);
  });

  click(inPlaceCloseButton);
  andThen(function() {
    assert.isAbsent(inPlaceSelector);
  });
});
