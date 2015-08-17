import Ember from 'ember';
import QUnit from 'qunit';

export default function registerAssertHelpers() {
  const assert = QUnit.assert;
  const overlaySelector = '.ember-modal-overlay';
  const dialogSelector = '.ember-modal-dialog';

  assert.isPresentOnce = function(selector, message) {
    message = message || selector + ' is present in DOM once';
    return this.equal(Ember.$(selector).length, 1, message);
  };

  assert.isAbsent = function(selector, message) {
    message = message || selector + ' is absent from DOM';
    return this.equal(find(selector).length, 0, message);
  };

  assert.isVisible = function(selector, message) {
    message = message || selector + ' is not visible';
    return this.ok(findWithAssert(selector).is(':visible'), message);
  };

  assert.dialogOpensAndCloses = function(options, message) {
    message = message || 'Dialog triggered by ' + options.openSelector + ' failed to open and close';
    var dialogContent = [dialogSelector, ':contains(' + options.dialogText + ')'].join('');
    var self = this;
    return click(options.openSelector, options.context).then(function() {
      if (options.hasOverlay) {
        self.isPresentOnce(overlaySelector);
      }
      self.isPresentOnce(dialogContent);
      if (options.whileOpen) {
        options.whileOpen();
      }
      // TODO: Craft a better approach for testing the tethered modals that
      //       tether appends to the body tag
      if (options.tethered) {
        // HACK: Click open button 4 more times to let the modal go around
        //       the horn and then disappear. This is obviously tightly coupled
        //       to arbitrary demo behavior.
        for (var i = 1; i <= 4; i++) {
          click(options.openSelector, options.context);
        }
        andThen(function() {
          self.isAbsent(overlaySelector);
          self.isAbsent(dialogContent);
        });
      } else {
        return click(options.closeSelector, options.context).then(function() {
          self.isAbsent(overlaySelector);
          self.isAbsent(dialogContent);
        });
      }
    });
  };
}
