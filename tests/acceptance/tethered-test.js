import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;
const dialogSelector = '.ember-modal-dialog';
const dialogCloseButton = [dialogSelector, 'button'].join(' ');

module('Acceptance: modal-dialog | tethered', {
  beforeEach() {
    application = startApp();
    visit('/tethered');
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('target - selector', function(assert) {
  assert.dialogOpensAndCloses({
    openSelector: '#example-target-selector button',
    dialogText: 'Target - Selector',
    closeSelector: dialogCloseButton,
    hasOverlay: false,
    whileOpen() {
      assert.ok(Ember.$(dialogSelector).hasClass('ember-tether-target-attached-left'), 'has targetAttachment class name');
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
