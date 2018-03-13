import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { visit, click, find } from 'ember-native-dom-helpers';
import { findContains } from '../helpers/modal-asserts';

let application;
const modalRootElementSelector = '#modal-overlays';
const overlaySelector = '.ember-modal-overlay';
const dialogSelector = '.ember-modal-dialog';
const dialogCloseButton = [dialogSelector, 'button'].join(' ');

module('Acceptance: modal-dialog | no animation, no tether', {
  async beforeEach() {
    application = startApp();
    await visit('/');
  },

  afterEach() {
    run(application, 'destroy');
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
    ariaLabelId: 'example-basic-title',
    ariaDescriptionId: 'example-basic-desc'
  });

  await assert.dialogOpensAndCloses({
    openSelector: '#example-basic button',
    dialogText: 'Basic',
    closeSelector: dialogCloseButton,
    ariaLabelId: 'example-basic-title',
    ariaDescriptionId: 'example-basic-desc'
  });
});

test('modal with translucent overlay', async function(assert) {
  await assert.dialogOpensAndCloses({
    openSelector: '#example-translucent button',
    dialogText: 'With Translucent Overlay',
    closeSelector: overlaySelector,
    ariaLabelId: 'example-translucent-title',
    ariaDescriptionId: 'example-translucent-desc'
  });

  await assert.dialogOpensAndCloses({
    openSelector: '#example-translucent button',
    dialogText: 'With Translucent Overlay',
    closeSelector: dialogCloseButton,
    ariaLabelId: 'example-translucent-title',
    ariaDescriptionId: 'example-translucent-desc'
  });
});

test('modal without overlay', async function(assert) {
  await assert.dialogOpensAndCloses({
    openSelector: '#example-without-overlay button',
    dialogText: 'Without Overlay',
    closeSelector: '#example-without-overlay',
    ariaLabelId: 'example-without-overlay-title',
    ariaDescriptionId: 'example-without-overlay-desc'
  });

  await assert.dialogOpensAndCloses({
    openSelector: '#example-without-overlay button',
    dialogText: 'Without Overlay',
    closeSelector: dialogCloseButton,
    ariaLabelId: 'example-without-overlay-title',
    ariaDescriptionId: 'example-without-overlay-desc'
  });
});

test('modal with overlay', async function(assert) {
  await assert.dialogOpensAndCloses({
    openSelector: '#example-translucent button',
    dialogText: 'With Translucent Overlay',
    closeSelector: overlaySelector,
    ariaLabelId: 'example-translucent-title',
    ariaDescriptionId: 'example-translucent-desc'
  });

  await assert.dialogOpensAndCloses({
    openSelector: '#example-translucent button',
    dialogText: 'With Translucent Overlay',
    closeSelector: dialogCloseButton,
    ariaLabelId: 'example-translucent-title',
    ariaDescriptionId: 'example-translucent-desc'
  });
});

test('modal with sibling overlay', async function(assert) {
  await assert.dialogOpensAndCloses({
    openSelector: '#example-overlay-sibling button',
    dialogText: 'With Translucent Overlay as Sibling',
    closeSelector: overlaySelector,
    ariaLabelId: 'example-overlay-sibling-title',
    ariaDescriptionId: 'example-overlay-sibling-desc'
  });

  await assert.dialogOpensAndCloses({
    openSelector: '#example-overlay-sibling button',
    dialogText: 'With Translucent Overlay as Sibling',
    closeSelector: dialogCloseButton,
    ariaLabelId: 'example-overlay-sibling-title',
    ariaDescriptionId: 'example-overlay-sibling-desc'
  });
});

test('clicking translucent overlay triggers callback', async function(assert) {
  window.onClickOverlayCallbackCalled = false;

  await click('#example-translucent-with-callback button');
  await click(overlaySelector);

  assert.isPresentOnce(overlaySelector);
  assert.ok(window.onClickOverlayCallbackCalled);

  await click(dialogCloseButton);

  assert.isAbsent(overlaySelector);
});

test('modal with custom styles', async function(assert) {
  await assert.dialogOpensAndCloses({
    openSelector: '#example-custom-styles button',
    dialogText: 'Custom Styles',
    closeSelector: overlaySelector,
    whileOpen() {
      assert.ok(find(`${modalRootElementSelector} ${overlaySelector}`).classList.contains('custom-styles-overlay'), 'has provided overlayClass');
      assert.ok(find(`${modalRootElementSelector} ${dialogSelector}`).classList.contains('custom-styles-modal-container'), 'has provided container-class');
    },
    ariaLabelId: "example-custom-styles-title",
    ariaDescriptionId: "example-custom-styles-desc"
  });
  await assert.dialogOpensAndCloses({
    openSelector: '#example-custom-styles button',
    dialogText: 'Custom Styles',
    closeSelector: dialogCloseButton,
    ariaLabelId: "example-custom-styles-title",
    ariaDescriptionId: "example-custom-styles-desc"
  });
});

test('target - selector', async function(assert) {
  await assert.dialogOpensAndCloses({
    openSelector: '#example-target-selector button',
    dialogText: 'Target - Selector',
    closeSelector: dialogCloseButton,
    whileOpen() {
      assert.ok(find(dialogSelector).classList.contains('ember-modal-dialog-target-attachment-left'), 'has targetAttachment class name');
    },
    ariaLabelId: "example-target-selector-title",
    ariaDescriptionId: "example-target-selector-desc"
  });
});

test('target - element', async function(assert) {
  await assert.dialogOpensAndCloses({
    openSelector: '#example-target-element button',
    dialogText: 'Target - Element',
    closeSelector: dialogCloseButton,
    ariaLabelId: "example-target-element-title",
    ariaDescriptionId: "example-target-element-desc"
  });
});

test('subclassed modal', async function(assert) {
  await assert.dialogOpensAndCloses({
    openSelector: '#example-subclass button',
    dialogText: 'Via Subclass',
    closeSelector: overlaySelector,
    whileOpen() {
      assert.ok(find(dialogSelector).classList.contains('my-cool-modal'), 'has provided containerClassNames');
    },
    ariaLabelId: 'my-cool-title',
    ariaDescriptionId: 'my-cool-desc'
  });
});

test('in place', async function(assert) {
  await click('#example-in-place button');
  let dialogText = 'In Place';
  let inPlaceDialogSelector = `${dialogSelector}.ember-modal-dialog-in-place`;
  let inPlaceRootSelector = '#container-in-place';
  let inPlaceCloseButton = [inPlaceRootSelector, inPlaceDialogSelector, 'button'].join(' ');
  let dialogElement = find(dialogSelector);

  assert.equal(getComputedStyle(dialogElement).getPropertyValue('position'), 'static', 'not absolutely positioned');
  assert.equal(getComputedStyle(dialogElement).getPropertyValue('left'), 'auto', 'should not be positioned (left)');
  assert.equal(getComputedStyle(dialogElement).getPropertyValue('margin-left'), '0px', 'should not be positioned (margin-left)');
  assert.equal(findContains(`${modalRootElementSelector} ${dialogSelector}`, dialogText), undefined, 'dialog is not open');
  assert.ok(findContains(`${inPlaceRootSelector} ${dialogSelector}`, dialogText), 'dialog rendered in place, once');
  assert.isAccessibleDialog(dialogSelector);
  assert.hasAccessibleLabel(dialogSelector, 'example-in-place-title');
  assert.hasAccessibleDescription(dialogSelector, 'example-in-place-desc');

  await click(inPlaceCloseButton);
  assert.equal(findContains(`${modalRootElementSelector} ${dialogSelector}`, dialogText), undefined, 'dialog is not open');
  assert.equal(findContains(`${inPlaceRootSelector} ${dialogSelector}`, dialogText), undefined, 'dialog is not rendered in place');
});
