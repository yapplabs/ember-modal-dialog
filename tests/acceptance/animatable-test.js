import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

const modalRootElementSelector = '#modal-overlays';
const overlaySelector = '[data-emd-overlay]';
const wrapperSelector = '.ember-modal-wrapper';
const dialogSelector = '.ember-modal-dialog';
const dialogCloseButton = [dialogSelector, 'button'].join(' ');

module('Acceptance: modal-dialog | animatable', function(hooks) {
  setupApplicationTest(hooks);
  hooks.beforeEach(function() {
    return visit('/animatable');
  });

  test('basic modal', async function(assert) {
    assert.isPresentOnce(modalRootElementSelector);
    assert.isAbsent(overlaySelector);
    assert.isPresentOnce('#example-basic button');

    await assert.dialogOpensAndCloses({
      openSelector: '#example-basic button',
      dialogText: 'Basic',
      closeSelector: wrapperSelector
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
      closeSelector: wrapperSelector
    });

    await assert.dialogOpensAndCloses({
      openSelector: '#example-translucent button',
      dialogText: 'With Translucent Overlay',
      closeSelector: dialogCloseButton
    });
  });

  test('modal with custom styles', async function(assert) {
    await assert.dialogOpensAndCloses({
      openSelector: '#example-custom-styles button',
      dialogText: 'Custom Styles',
      closeSelector: overlaySelector,
      whileOpen() {
        assert.dom(overlaySelector).hasClass('custom-styles-overlay', 'has provided overlayClass');
        assert.dom(dialogSelector).hasClass('custom-styles-modal-container', 'has provided containerClass');
      }
    });
    await assert.dialogOpensAndCloses({
      openSelector: '#example-custom-styles button',
      dialogText: 'Custom Styles',
      closeSelector: dialogCloseButton
    });
  });

  test('subclassed modal', async function(assert) {
    await assert.dialogOpensAndCloses({
      openSelector: '#example-subclass button',
      dialogText: 'Via Subclass',
      closeSelector: overlaySelector,
      whileOpen() {
        assert.dom(dialogSelector).hasClass('my-cool-modal', 'has provided containerClassNames');
      }
    });
  });
});
