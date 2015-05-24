import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { stubResolver } from '../helpers/container';

var application;
const modalRootElementSelector = '#modal-overlays';
const overlaySelector = '.ember-modal-overlay';
const dialogSelector = '.ember-modal-dialog';
const dialogCloseButton = [dialogSelector, 'button'].join(' ');

var modalDialogService = Ember.Service.extend({
  destinationElementId: 'modal-overlays',
  hasEmberTether: true
});

module('Acceptance: Display Modal Dialogs With Tether', {
  beforeEach: function() {
    application = startApp({}, function(app) {
      stubResolver(app, 'service:modal-dialog', modalDialogService);
    });
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('basic modal', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentPath(), 'index');
    assert.isPresentOnce(modalRootElementSelector);
    assert.isAbsent(overlaySelector);
    assert.isPresentOnce('#example-basic button');
  });

  assert.dialogOpensAndCloses({
    openSelector: '#example-basic button',
    dialogText: 'Basic',
    closeSelector: overlaySelector,
    hasOverlay: true,
  });
});

test('modal with translucent overlay', function(assert) {
  visit('/');

  assert.dialogOpensAndCloses({
    openSelector: '#example-translucent button',
    dialogText: 'With Translucent Overlay',
    closeSelector: overlaySelector,
    hasOverlay: true,
  });
});

test('modal with custom styles', function(assert) {
  visit('/');

  assert.dialogOpensAndCloses({
    openSelector: '#example-custom-styles button',
    dialogText: 'Custom Styles',
    closeSelector: overlaySelector,
    hasOverlay: true,
    whileOpen: function(){
      assert.ok(Ember.$(`${modalRootElementSelector} ${overlaySelector}`).hasClass('custom-styles-modal'), 'has provided overlay-class');
      assert.ok(Ember.$(`${modalRootElementSelector} ${dialogSelector}`).hasClass('custom-styles-modal-container'), 'has provided container-class');
    }
  });
  assert.dialogOpensAndCloses({
    openSelector: '#example-custom-styles button',
    dialogText: 'Custom Styles',
    closeSelector: dialogCloseButton,
    hasOverlay: true,
  });
});

test('alignment target - selector', function(assert) {
  visit('/');

  assert.dialogOpensAndCloses({
    openSelector: '#example-alignment-target-selector button',
    dialogText: 'Alignment Target - Selector',
    closeSelector: dialogCloseButton,
    hasOverlay: false,
    tethered: true,
    whileOpen: function(){
      assert.ok(Ember.$(dialogSelector).hasClass('ember-tether-target-attached-left'), 'has alignment class name');
    }
  });
});

test('alignment target - element', function(assert) {
  visit('/');

  assert.dialogOpensAndCloses({
    openSelector: '#example-alignment-target-element button',
    dialogText: 'Alignment Target - Element',
    closeSelector: dialogCloseButton,
    hasOverlay: false,
    tethered: true
  });
});

test('alignment target - view', function(assert) {
  visit('/');

  assert.dialogOpensAndCloses({
    openSelector: '#example-alignment-target-view button',
    dialogText: 'Alignment Target - View',
    closeSelector: dialogCloseButton,
    hasOverlay: false,
    tethered: true
  });
});

test('subclassed modal', function(assert) {
  visit('/');

  assert.dialogOpensAndCloses({
    openSelector: '#example-subclass button',
    dialogText: 'Via Subclass',
    closeSelector: overlaySelector,
    hasOverlay: true,
    whileOpen: function(){
      assert.ok(Ember.$(dialogSelector).hasClass('my-cool-modal'), 'has provided containerClassNames');
    }
  });
});

test('in place', function(assert) {
  visit('/');

  click('#example-in-place button');
  var dialogText = 'In Place';
  var defaultSelector = [modalRootElementSelector, dialogSelector, ':contains(' + dialogText + ')'].join(' ');
  var inPlaceDialogSelector = dialogSelector + '.ember-modal-dialog-in-place';
  var inPlaceRootSelector = '#container-in-place';
  var inPlaceSelector = [inPlaceRootSelector, inPlaceDialogSelector, ':contains(' + dialogText + ')'].join(' ');
  var inPlaceCloseButton = [inPlaceRootSelector, inPlaceDialogSelector, 'button'].join(' ');
  andThen(function() {
    assert.equal(Ember.$(dialogSelector).css('position'), 'relative', 'not absolutely positioned');
    assert.equal(Ember.$(dialogSelector).css('left'), 'auto', 'should not be positioned');
    assert.equal(Ember.$(dialogSelector).css('margin-left'), '0px', 'should not be positioned');
    assert.isAbsent(defaultSelector);
    assert.isPresentOnce(inPlaceSelector);
  });

  click(inPlaceCloseButton);
  andThen(function() {
    assert.isAbsent(defaultSelector);
    assert.isAbsent(inPlaceSelector);
  });
});
