import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;
const modalRootElementSelector = '#modal-overlays';
const overlaySelector = '.ember-modal-overlay';
const dialogSelector = '.ember-modal-dialog';
const dialogCloseButton = [dialogSelector, 'button'].join(' ');

module('Acceptance: modal-dialog | animatable', {
  beforeEach() {
    application = startApp();
    visit('/animatable');
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
      assert.ok(Ember.$(overlaySelector).hasClass('custom-styles-modal'), 'has provided overlayClass');
      assert.ok(Ember.$(dialogSelector).hasClass('custom-styles-modal-container'), 'has provided containerClass');
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
