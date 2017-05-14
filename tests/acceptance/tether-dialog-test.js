import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { visit, click } from 'ember-native-dom-helpers';

let application;
const modalRootElementSelector = '#modal-overlays';
const overlaySelector = '.ember-modal-overlay';
const dialogSelector = '.ember-modal-dialog';
const dialogCloseButton = [dialogSelector, 'button'].join(' ');

module('Acceptance: tether-dialog (deprecated)', {
  async beforeEach() {
    application = startApp();
    await visit('/tether-dialog');
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('basic modal', async function(assert) {
  assert.isPresentOnce(modalRootElementSelector);
  assert.isAbsent(overlaySelector);
  assert.isPresentOnce('#example-basic button');

  await assert.dialogOpensAndCloses({
    openSelector: '#example-basic button',
    dialogText: 'Basic',
    closeSelector: overlaySelector,
    hasOverlay: true
  });

  await assert.dialogOpensAndCloses({
    openSelector: '#example-basic button',
    dialogText: 'Basic',
    closeSelector: dialogCloseButton
  });
});

test('modal with translucent overlay', async function(assert) {
  await assert.dialogOpensAndCloses({
    openSelector: '#example-translucent button',
    dialogText: 'With Translucent Overlay',
    closeSelector: overlaySelector,
    hasOverlay: true
  });

  await assert.dialogOpensAndCloses({
    openSelector: '#example-translucent button',
    dialogText: 'With Translucent Overlay',
    closeSelector: dialogCloseButton
  });
});

test('clicking translucent overlay triggers callback', async function(assert) {
  window.onClickOverlayCallbackCalled = false;

  await click('#example-translucent-with-callback button');
  await click(overlaySelector);

  assert.isPresentOnce(overlaySelector);
  assert.ok(window.onClickOverlayCallbackCalled);

  click(dialogCloseButton);

  assert.isAbsent(overlaySelector);
});

test('modal without overlay', async function(assert) {
  await assert.dialogOpensAndCloses({
    openSelector: '#example-without-overlay button',
    dialogText: 'Without Overlay',
    closeSelector: '#example-without-overlay button'
  });

  await assert.dialogOpensAndCloses({
    openSelector: '#example-without-overlay button',
    dialogText: 'Without Overlay',
    closeSelector: dialogCloseButton,
    context: 'body'
  });
});

test('modal without overlay click outside to close', async function(assert) {
  await assert.dialogOpensAndCloses({
    openSelector: '#example-without-overlay-click-outside-to-close button',
    dialogText: 'Without Overlay - Click Outside to Close',
    closeSelector: '#example-without-overlay-click-outside-to-close button'
  });

  await assert.dialogOpensAndCloses({
    openSelector: '#example-without-overlay-click-outside-to-close button',
    dialogText: 'Without Overlay - Click Outside to Close',
    closeSelector: '#example-without-overlay-click-outside-to-close'
  });

  await assert.dialogOpensAndCloses({
    openSelector: '#example-without-overlay-click-outside-to-close button:nth-of-type(2)',
    dialogText: 'Without Overlay Another One - Click Outside to Close',
    closeSelector: '#example-without-overlay-click-outside-to-close button:nth-of-type(1)'
  });

  await assert.dialogOpensAndCloses({
    openSelector: '#example-without-overlay-click-outside-to-close button:nth-of-type(2)',
    dialogText: 'Without Overlay Another One - Click Outside to Close',
    closeSelector: '#example-without-overlay-click-outside-to-close'
  });

  assert.equal(Ember.$(dialogSelector).length, 0, 'All modals are absent');
});

test('target - selector', async function(assert) {
  await assert.dialogOpensAndCloses({
    openSelector: '#example-target-selector button',
    dialogText: 'Target - Selector',
    closeSelector: dialogCloseButton,
    hasOverlay: false,
    whileOpen() {
      assert.ok(Ember.$(dialogSelector).hasClass('ember-tether-target-attached-left'), 'has targetAttachment class name');
    }
  });
});

test('target - element', async function(assert) {
  await assert.dialogOpensAndCloses({
    openSelector: '#example-target-element button',
    dialogText: 'Target - Element',
    closeSelector: dialogCloseButton,
    hasOverlay: false
  });
});

test('in place', async function(assert) {
  await click('#example-in-place button');
  let dialogText = 'In Place';
  let defaultSelector = [modalRootElementSelector, dialogSelector, `:contains(${dialogText})`].join(' ');
  let inPlaceDialogSelector = `${dialogSelector}.ember-modal-dialog-in-place`;
  let inPlaceRootSelector = '#container-in-place';
  let inPlaceSelector = [inPlaceRootSelector, inPlaceDialogSelector, `:contains(${dialogText})`].join(' ');
  let inPlaceCloseButton = [inPlaceRootSelector, inPlaceDialogSelector, 'button'].join(' ');

  assert.equal(Ember.$(dialogSelector).css('position'), 'static', 'not absolutely positioned');
  assert.equal(Ember.$(dialogSelector).css('left'), 'auto', 'should not be positioned');
  assert.equal(Ember.$(dialogSelector).css('margin-left'), '0px', 'should not be positioned');
  assert.isAbsent(defaultSelector);
  assert.isPresentOnce(inPlaceSelector);

  await click(inPlaceCloseButton);
  assert.isAbsent(defaultSelector);
  assert.isAbsent(inPlaceSelector);
});
