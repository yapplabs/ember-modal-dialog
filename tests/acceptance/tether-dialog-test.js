import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;
const modalRootElementSelector = '#modal-overlays';
const overlaySelector = '.ember-modal-overlay';
const dialogSelector = '.ember-modal-dialog';
const dialogCloseButton = [dialogSelector, 'button'].join(' ');

module('Acceptance: Display Tether Dialogs', {
  beforeEach() {
    application = startApp();
    visit('/');
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('basic modal', function(assert) {
  andThen(function() {
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
});

test('modal with translucent overlay', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-translucent button',
    dialogText: 'With Translucent Overlay',
    closeSelector: overlaySelector,
    hasOverlay: true
  });
});

test('modal without overlay', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-without-overlay button',
    dialogText: 'Without Overlay',
    closeSelector: '#example-without-overlay button'
  });

  assert.dialogOpensAndCloses({
    openSelector: '#example-without-overlay button',
    dialogText: 'Without Overlay',
    closeSelector: dialogCloseButton,
    context: 'body'
  });
});

test('modal without overlay click outside to close', function(assert) {
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

test('target - selector', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-target-selector button',
    dialogText: 'Target - Selector',
    closeSelector: dialogCloseButton,
    hasOverlay: false,
    tethered: true,
    whileOpen() {
      assert.ok(Ember.$(dialogSelector).hasClass('ember-tether-target-attached-left'), 'has targetAttachment class name');
    }
  });
});

test('subclassed modal', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-subclass button',
    dialogText: 'Via Subclass',
    closeSelector: overlaySelector,
    hasOverlay: true,
    whileOpen() {
      assert.ok(Ember.$(dialogSelector).hasClass('my-cool-modal'), 'has provided containerClassNames');
    }
  });
});

test('in place', function(assert) {
  click('#example-in-place button');
  let dialogText = 'In Place';
  let defaultSelector = [modalRootElementSelector, dialogSelector, `:contains(${dialogText})`].join(' ');
  let inPlaceDialogSelector = `${dialogSelector}.ember-modal-dialog-in-place`;
  let inPlaceRootSelector = '#container-in-place';
  let inPlaceSelector = [inPlaceRootSelector, inPlaceDialogSelector, `:contains(${dialogText})`].join(' ');
  let inPlaceCloseButton = [inPlaceRootSelector, inPlaceDialogSelector, 'button'].join(' ');
  andThen(function() {
    assert.equal(Ember.$(dialogSelector).css('position'), 'relative', 'not absolutely positioned');
    assert.equal(Ember.$(dialogSelector).css('left'), 'auto', 'should not be positioned');
    assert.equal(Ember.$(dialogSelector).css('margin-left'), '0px', 'should not be positioned');
    assert.isAbsent(defaultSelector);
    assert.isPresentOnce(inPlaceSelector);
  });

  click(inPlaceCloseButton);
  andThen(function() {
    assert.isAbsent(defaultSelector);
    assert.isAbsent(inPlaceSelector);
  });
});
