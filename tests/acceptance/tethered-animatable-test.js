import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;
const dialogSelector = '.ember-modal-dialog';
const dialogCloseButton = [dialogSelector, 'button'].join(' ');

module('Acceptance: modal-dialog | tethered and animatable', {
  async beforeEach() {
    application = startApp();
    await visit('/tethered-animatable');
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('target - selector', async function(assert) {
  await assert.dialogOpensAndCloses({
    openSelector: '#example-target-selector button',
    dialogText: 'Target - Selector',
    closeSelector: dialogCloseButton,
    hasOverlay: false,
    whileOpen() {
      assert.ok(Ember.$(dialogSelector).hasClass('liquid-tether-target-attached-left'), 'has targetAttachment class name');
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
