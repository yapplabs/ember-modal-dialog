import Ember from 'ember';
import QUnit from 'qunit';

export default function registerAssertHelpers() {
  const { assert } = QUnit;
  const overlaySelector = '.ember-modal-overlay';
  const dialogSelector = '.ember-modal-dialog';

  assert.isPresentOnce = function(selector, message) {
    message = message || `${selector} is present in DOM once`;
    return this.equal(Ember.$(selector).length, 1, message);
  };

  assert.isAbsent = function(selector, message) {
    message = message || `${selector} is absent from DOM`;
    return this.equal(find(selector).length, 0, message);
  };

  assert.isVisible = function(selector, message) {
    message = message || `${selector} is not visible`;
    return this.ok(findWithAssert(selector).is(':visible'), message);
  };

  assert.dialogOpensAndCloses = function(options, message) {
    message = message || `Dialog triggered by ${options.openSelector} failed to open and close`;
    const dialogContent = [dialogSelector, `:contains(${options.dialogText})`].join('');
    const self = this;
    return nativeClick(options.openSelector, options.context).then(function() {
      if (options.hasOverlay) {
        self.isPresentOnce(overlaySelector);
      }
      self.isPresentOnce(dialogContent);
      if (options.whileOpen) {
        options.whileOpen();
      }
      return nativeClick(options.closeSelector, options.context).then(function() {
        self.isAbsent(overlaySelector);
        self.isAbsent(dialogContent);
      });
    });
  };

  assert.closesOnMouseleave = function(mouseLeaveSelector, dialogText) {
    const dialogContent = [dialogSelector, `:contains(${dialogText})`].join('');

    return triggerEvent(mouseLeaveSelector, 'mouseleave').then(() => {
      this.isAbsent(dialogContent);
    });
  };
}
