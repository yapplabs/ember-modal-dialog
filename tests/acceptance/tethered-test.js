import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { find } from 'ember-native-dom-helpers';

let application;
const dialogSelector = '.ember-modal-dialog';
const dialogCloseButton = [dialogSelector, 'button'].join(' ');

module('Acceptance: modal-dialog | tethered', {
  beforeEach() {
    application = startApp();
    visit('/tethered');
  },

  afterEach() {
    run(application, 'destroy');
  }
});

test('target - selector', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-target-selector button',
    dialogText: 'Target - Selector',
    closeSelector: dialogCloseButton,
    hasOverlay: false,
    whileOpen() {
      assert.ok(find(dialogSelector).classList.contains('ember-tether-target-attached-left'), 'has targetAttachment class name');
    }
  });
});

test('target - element', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-target-element button',
    dialogText: 'Target - Element',
    closeSelector: dialogCloseButton,
    hasOverlay: false
  });
});
