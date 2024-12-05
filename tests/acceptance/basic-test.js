import { click, find, settled, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { findContains } from '../helpers/modal-asserts';
import { setupApplicationTest } from 'ember-qunit';

const modalRootElementSelector = '#modal-overlays';
const overlaySelector = '.ember-modal-overlay';
const dialogSelector = '.ember-modal-dialog';
const dialogCloseButton = [dialogSelector, 'button'].join(' ');

module('Acceptance: modal-dialog | no animation, no tether', function (hooks) {
  setupApplicationTest(hooks);
  hooks.beforeEach(async function () {
    await visit('/');
  });

  hooks.afterEach(async function () {
    await settled();
  });

  test('basic modal', async function (assert) {
    assert.dom(modalRootElementSelector).exists({ count: 1 });
    assert.isAbsent(overlaySelector);
    assert.dom('#example-basic button').exists({ count: 2 });

    await assert.dialogOpensAndCloses({
      openSelector: '#example-basic button',
      dialogText: 'Basic',
      closeSelector: overlaySelector,
    });

    await assert.dialogOpensAndCloses({
      openSelector: '#example-basic button',
      dialogText: 'Basic',
      closeSelector: dialogCloseButton,
    });
  });

  test('modal with translucent overlay', async function (assert) {
    await assert.dialogOpensAndCloses({
      openSelector: '#example-translucent button',
      dialogText: 'With Translucent Overlay',
      closeSelector: overlaySelector,
    });

    await assert.dialogOpensAndCloses({
      openSelector: '#example-translucent button',
      dialogText: 'With Translucent Overlay',
      closeSelector: dialogCloseButton,
    });
  });

  test('modal without overlay', async function (assert) {
    await assert.dialogOpensAndCloses({
      openSelector: '#example-without-overlay button',
      dialogText: 'Without Overlay',
      closeSelector: '#example-without-overlay',
    });

    await assert.dialogOpensAndCloses({
      openSelector: '#example-without-overlay button',
      dialogText: 'Without Overlay',
      closeSelector: dialogCloseButton,
    });
  });

  test('modal with overlay', async function (assert) {
    await assert.dialogOpensAndCloses({
      openSelector: '#example-translucent button',
      dialogText: 'With Translucent Overlay',
      closeSelector: overlaySelector,
    });

    await assert.dialogOpensAndCloses({
      openSelector: '#example-translucent button',
      dialogText: 'With Translucent Overlay',
      closeSelector: dialogCloseButton,
    });
  });

  test('modal with sibling overlay', async function (assert) {
    await assert.dialogOpensAndCloses({
      openSelector: '#example-overlay-sibling button',
      dialogText: 'With Translucent Overlay as Sibling',
      closeSelector: overlaySelector,
    });

    await assert.dialogOpensAndCloses({
      openSelector: '#example-overlay-sibling button',
      dialogText: 'With Translucent Overlay as Sibling',
      closeSelector: dialogCloseButton,
    });
  });

  test('clicking translucent overlay triggers callback', async function (assert) {
    window.onClickOverlayCallbackCalled = false;

    await click('#example-translucent-with-callback button');
    await click(overlaySelector);

    assert.dom(overlaySelector).exists({ count: 1 });
    assert.ok(window.onClickOverlayCallbackCalled);

    await click(dialogCloseButton);

    assert.isAbsent(overlaySelector);
  });

  test('modal with custom styles', async function (assert) {
    await assert.dialogOpensAndCloses({
      openSelector: '#example-custom-styles button',
      dialogText: 'Custom Styles',
      closeSelector: overlaySelector,
      whileOpen() {
        assert
          .dom(`#ember-testing ${overlaySelector}`)
          .hasClass('custom-styles-overlay', 'has provided overlayClass');
        assert
          .dom(`#ember-testing ${dialogSelector}`)
          .hasClass(
            'custom-styles-modal-container',
            'has provided container-class',
          );
      },
    });
    await assert.dialogOpensAndCloses({
      openSelector: '#example-custom-styles button',
      dialogText: 'Custom Styles',
      closeSelector: dialogCloseButton,
    });
  });

  test('target - selector', async function (assert) {
    await assert.dialogOpensAndCloses({
      openSelector: '#example-target-selector button',
      dialogText: 'Target - Selector',
      closeSelector: dialogCloseButton,
      whileOpen() {
        assert
          .dom(dialogSelector)
          .hasClass(
            'ember-modal-dialog-target-attachment-left',
            'has targetAttachment class name',
          );
      },
    });
  });

  test('target - element', async function (assert) {
    await assert.dialogOpensAndCloses({
      openSelector: '#example-target-element button',
      dialogText: 'Target - Element',
      closeSelector: dialogCloseButton,
    });
  });

  test('subclassed modal', async function (assert) {
    await assert.dialogOpensAndCloses({
      openSelector: '#example-subclass button',
      dialogText: 'Via Subclass',
      closeSelector: overlaySelector,
      whileOpen() {
        assert
          .dom(dialogSelector)
          .hasClass('my-cool-modal', 'has provided containerClassNames');
      },
    });
  });

  test('subclassed modal with string for containerClassNames', async function (assert) {
    await assert.dialogOpensAndCloses({
      openSelector: '#example-subclass-2 button',
      dialogText: 'Via Subclass',
      closeSelector: overlaySelector,
      whileOpen() {
        assert
          .dom(dialogSelector)
          .hasClass('my-cool-modal', 'has provided containerClassNames');
        assert
          .dom(dialogSelector)
          .hasClass('my-cool-modal-2', 'has provided containerClassNames');
      },
    });
  });

  test('in place', async function (assert) {
    await click('#example-in-place button');
    let dialogText = 'In Place';
    let inPlaceDialogSelector = `${dialogSelector}.ember-modal-dialog-in-place`;
    let inPlaceRootSelector = '#container-in-place';
    let inPlaceCloseButton = [
      inPlaceRootSelector,
      inPlaceDialogSelector,
      'button',
    ].join(' ');
    let dialogElement = find(inPlaceDialogSelector);

    assert
      .dom(inPlaceDialogSelector)
      .hasClass('my-custom-class', 'has provided containerClass');
    assert.strictEqual(
      getComputedStyle(dialogElement).getPropertyValue('position'),
      'static',
      'not absolutely positioned',
    );
    assert.strictEqual(
      getComputedStyle(dialogElement).getPropertyValue('left'),
      'auto',
      'should not be positioned (left)',
    );
    assert.strictEqual(
      getComputedStyle(dialogElement).getPropertyValue('margin-left'),
      '0px',
      'should not be positioned (margin-left)',
    );
    assert.strictEqual(
      findContains(`${modalRootElementSelector} ${dialogSelector}`, dialogText),
      undefined,
      'dialog is not open',
    );
    assert.ok(
      findContains(`${inPlaceRootSelector} ${dialogSelector}`, dialogText),
      'dialog rendered in place, once',
    );

    await click(inPlaceCloseButton);
    assert.strictEqual(
      findContains(`${modalRootElementSelector} ${dialogSelector}`, dialogText),
      undefined,
      'dialog is not open',
    );
    assert.strictEqual(
      findContains(`${inPlaceRootSelector} ${dialogSelector}`, dialogText),
      undefined,
      'dialog is not rendered in place',
    );

    await click('#example-in-place-2 button');
    inPlaceDialogSelector = `${dialogSelector}.ember-modal-dialog-in-place`;
    inPlaceRootSelector = '#container-in-place-2';
    inPlaceCloseButton = [
      inPlaceRootSelector,
      inPlaceDialogSelector,
      'button',
    ].join(' ');

    assert
      .dom(inPlaceDialogSelector)
      .hasClass('my-custom-class-2', 'has provided containerClassNames');
    await click(inPlaceCloseButton);
  });
});
