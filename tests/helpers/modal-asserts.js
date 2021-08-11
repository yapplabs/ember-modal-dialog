import { click, waitUntil } from '@ember/test-helpers';

export function findContains(selector, text) {
  return [].slice
    .apply(document.querySelectorAll(selector))
    .filter((e) => e.textContent.trim().indexOf(text) > -1)[0];
}

export default function registerAssertHelpers(assert) {
  const overlaySelector = '.ember-modal-overlay';
  const dialogSelector = '.ember-modal-dialog';

  assert.isAbsent = function (selector, message) {
    message = message || `${selector} is absent from DOM`;
    return this.equal(document.querySelectorAll(selector).length, 0, message);
  };

  assert.isVisible = function (selector, message) {
    message = message || `${selector} is not visible`;
    return this.dom(selector).isVisible(message);
  };

  assert.dialogOpensAndCloses = async function (options) {
    const self = this;
    await click(options.openSelector, options.context);
    await waitUntil(function () {
      return findContains(dialogSelector, options.dialogText);
    });
    if (options.hasOverlay) {
      self.dom(overlaySelector).exists({ count: 1 });
    }
    if (options.whileOpen) {
      await options.whileOpen();
    }
    await click(options.closeSelector, options.context);
    await waitUntil(function () {
      return !findContains(dialogSelector, options.dialogText);
    });
    self.isAbsent(overlaySelector);
  };
}
