import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;
const modalRootElementSelector = '#modal-overlays';
const overlaySelector = '.ember-modal-overlay';
const dialogSelector = '.ember-modal-dialog';
const dialogCloseButton = [dialogSelector, 'button'].join(' ');

module('Acceptance: Display Modal Dialogs', {
  beforeEach() {
    application = startApp();
    visit('/');
    click('button:contains(Change to modal-dialog)');
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
    closeSelector: overlaySelector
  });

  assert.dialogOpensAndCloses({
    openSelector: '#example-basic button',
    dialogText: 'Basic',
    closeSelector: dialogCloseButton
  });
});

test('modal with translucent overlay', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-translucent button',
    dialogText: 'With Translucent Overlay',
    closeSelector: overlaySelector
  });

  assert.dialogOpensAndCloses({
    openSelector: '#example-translucent button',
    dialogText: 'With Translucent Overlay',
    closeSelector: dialogCloseButton
  });
});

test('modal with custom styles', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-custom-styles button',
    dialogText: 'Custom Styles',
    closeSelector: overlaySelector,
    whileOpen() {
      assert.ok(Ember.$(`${modalRootElementSelector} ${overlaySelector}`).hasClass('custom-styles-modal'), 'has provided overlay-class');
      assert.ok(Ember.$(`${modalRootElementSelector} ${dialogSelector}`).hasClass('custom-styles-modal-container'), 'has provided container-class');
    }
  });
  assert.dialogOpensAndCloses({
    openSelector: '#example-custom-styles button',
    dialogText: 'Custom Styles',
    closeSelector: dialogCloseButton
  });
});

test('target - selector', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-target-selector button',
    dialogText: 'Target - Selector',
    closeSelector: dialogCloseButton,
    tethered: true,
    whileOpen() {
      assert.ok(Ember.$(dialogSelector).hasClass('ember-modal-dialog-target-attachment-left'), 'has targetAttachment class name');
    }
  });
});

test('target - element', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-target-element button',
    dialogText: 'Target - Element',
    closeSelector: dialogCloseButton,
    tethered: true
  });
});

test('target - view', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-target-view button',
    dialogText: 'Target - View',
    closeSelector: dialogCloseButton,
    tethered: true
  });
});

test('subclassed modal', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-subclass button',
    dialogText: 'Via ModalDialog Subclass',
    closeSelector: overlaySelector,
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
    assert.equal(Ember.$(dialogSelector).css('left'), 'auto', 'should not be positioned (left)');
    assert.equal(Ember.$(dialogSelector).css('margin-left'), '0px', 'should not be positioned (margin-left)');
    assert.isAbsent(defaultSelector);
    assert.isPresentOnce(inPlaceSelector);
  });

  click(inPlaceCloseButton);
  andThen(function() {
    assert.isAbsent(defaultSelector);
    assert.isAbsent(inPlaceSelector);
  });
});
