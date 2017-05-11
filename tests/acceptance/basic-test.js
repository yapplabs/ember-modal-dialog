import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;
const modalRootElementSelector = '#modal-overlays';
const overlaySelector = '.ember-modal-overlay';
const dialogSelector = '.ember-modal-dialog';
const dialogCloseButton = [dialogSelector, 'button'].join(' ');

module('Acceptance: modal-dialog | no animation, no tether', {
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

test('clicking translucent overlay triggers callback', function(assert) {
  window.onClickOverlayCallbackCalled = false;

  click('#example-translucent-with-callback button');
  click(overlaySelector);

  andThen(function() {
    assert.isPresentOnce(overlaySelector);
    assert.ok(window.onClickOverlayCallbackCalled);
  });

  click(dialogCloseButton);

  andThen(function() {
    assert.isAbsent(overlaySelector);
  });
});

test('modal with custom styles', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-custom-styles button',
    dialogText: 'Custom Styles',
    closeSelector: overlaySelector,
    whileOpen() {
      assert.ok(Ember.$(`${modalRootElementSelector} ${overlaySelector}`).hasClass('custom-styles-modal'), 'has provided overlayClass');
      assert.ok(Ember.$(`${modalRootElementSelector} ${dialogSelector}`).hasClass('custom-styles-modal-container'), 'has provided containerClass');
    }
  });
  assert.dialogOpensAndCloses({
    openSelector: '#example-custom-styles button',
    dialogText: 'Custom Styles',
    closeSelector: dialogCloseButton
  });
});

test('subclassed modal', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-subclass button',
    dialogText: 'Via Subclass',
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
  let inPlaceDialogSelector = `${dialogSelector}.emd-in-place`;
  let inPlaceRootSelector = '#container-in-place';
  let inPlaceSelector = [inPlaceRootSelector, inPlaceDialogSelector, `:contains(${dialogText})`].join(' ');
  let inPlaceCloseButton = [inPlaceRootSelector, inPlaceDialogSelector, 'button'].join(' ');
  andThen(function() {
    assert.equal(Ember.$(dialogSelector).css('position'), 'static', 'not absolutely positioned');
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
