import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

const dialogSelector = '.ember-modal-dialog';
const dialogCloseButton = [dialogSelector, 'button'].join(' ');

module('Acceptance: modal-dialog | tethered and animatable', function(hooks) {
  setupApplicationTest(hooks);
  hooks.beforeEach(function() {
    return visit('/tethered-animatable');
  });

  test('target - selector', async function(assert) {
    await assert.dialogOpensAndCloses({
      openSelector: '#example-target-selector button',
      dialogText: 'Target - Selector',
      closeSelector: dialogCloseButton,
      hasOverlay: false,
      whileOpen() {
        assert.dom(dialogSelector).hasClass('liquid-tether-target-attached-left', 'has targetAttachment class name');
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
});
