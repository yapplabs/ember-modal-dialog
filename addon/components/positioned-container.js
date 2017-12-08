import { assert } from '@ember/debug';
import { typeOf } from '@ember/utils';
import Component from '@ember/component';
import { capitalize } from '@ember/string';
import { observer, computed } from '@ember/object';
import { on } from '@ember/object/evented';
const SUPPORTED_TARGET_ATTACHMENTS = [
  'top', 'right', 'bottom', 'left', 'center', 'elementCenter', 'none'
];

export default Component.extend({

  // target - element selector, element, or Ember View
  // targetAttachment - top, right, bottom, left, center, or none
  //   left, right, top, bottom (relative to target)
  //   center (relative to container)
  targetAttachment: 'center',

  isPositioned: computed('targetAttachment', 'target', 'renderInPlace', function() {
    if (this.get('renderInPlace')) {
      return false;
    }
    let target = this.get('target');
    let targetAttachment = this.get('targetAttachment');
    if (target === 'body' && (targetAttachment === 'center' || targetAttachment === 'middle center')) {
      return false;
    }

    if (target && targetAttachment) {
      return true;
    }

    return false;
  }),

  didGetPositioned: observer('isPositioned', on('didInsertElement', function() {
    if (this._state !== 'inDOM') {
      return;
    }

    if (this.get('isPositioned')) {
      this.updateTargetAttachment();
    } else {
      this.element.style.left = '';
      this.element.style.top = '';
    }
  })),

  getWrappedTargetAttachmentElement() {
    const target = this.get('target');
    if (!target) {
      return null;
    }

    if (typeOf(target) === 'string') {
      const targetSelector = target;
      const wrappedElement = document.querySelector(targetSelector);
      assert(`No element found for modal-dialog's target selector '${targetSelector}'.`, wrappedElement);
      return wrappedElement;
    }

    // passed an ember view or component
    if (target.element) {
      return target.element;
    }

    // passed an element directly
    return target;
  },

  updateTargetAttachment() {
    let targetAttachment = this.get('targetAttachment');
    // Convert tether-styled values like 'middle right' to 'right'
    targetAttachment = targetAttachment.split(' ').slice(-1)[0];
    assert(
      `Positioned container supports targetAttachments of ${SUPPORTED_TARGET_ATTACHMENTS.join(', ')}`,
      SUPPORTED_TARGET_ATTACHMENTS.indexOf(targetAttachment) > -1
    );
    const targetAttachmentMethod = `align${capitalize(targetAttachment)}`;
    const targetAttachmentElement = this.getWrappedTargetAttachmentElement();

    this[targetAttachmentMethod](targetAttachmentElement);
  },

  alignCenter() {
    const elementWidth = this.element.offsetWidth;
    const elementHeight = this.element.offsetHeight;

    this.element.style.left = '50%';
    this.element.style.top = '50%';
    this.element.style.marginLeft = `${elementWidth * -0.5}px`;
    this.element.style.marginTop = `${elementHeight * -0.5}px`;
  },

  alignLeft(targetAttachmentElement) {
    assert('Left targetAttachment requires a target', targetAttachmentElement);

    const elementWidth = this.element.offsetWidth;
    const originOffset = targetAttachmentElement.getBoundingClientRect();
    const originOffsetTop = originOffset.top;

    this.element.style.left = `${originOffset.left - elementWidth}px`;
    this.element.style.top = `${originOffsetTop}px`;
  },

  alignRight(targetAttachmentElement) {
    assert('Right targetAttachment requires a target', targetAttachmentElement);

    const targetWidth = targetAttachmentElement.offsetWidth;
    const originOffset = targetAttachmentElement.getBoundingClientRect();
    const originOffsetTop = originOffset.top;


    this.element.style.left = `${originOffset.left + targetWidth}px`;
    this.element.style.top = `${originOffsetTop}px`;
  },

  alignTop(targetAttachmentElement) {
    assert('Top targetAttachment requires a target', targetAttachmentElement);

    const elementWidth = this.element.offsetWidth;
    const elementHeight = this.element.offsetHeight;
    const originOffset = targetAttachmentElement.getBoundingClientRect();
    const originOffsetTop = originOffset.top;
    const targetWidth = targetAttachmentElement.offsetWidth;

    this.element.style.left = `${originOffset.left + targetWidth / 2 - elementWidth / 2}px`;
    this.element.style.top = `${originOffsetTop - elementHeight}px`;
  },

  alignBottom(targetAttachmentElement) {
    assert('Bottom targetAttachment requires a target', targetAttachmentElement);

    const elementWidth = this.element.offsetWidth;
    const originOffset = targetAttachmentElement.getBoundingClientRect();
    const originOffsetTop = originOffset.top;
    const targetWidth = targetAttachmentElement.offsetWidth;
    const targetHeight = targetAttachmentElement.offsetHeight;

    this.element.style.left = `${originOffset.left + targetWidth / 2 - elementWidth / 2}px`;
    this.element.style.top = `${originOffsetTop + targetHeight}px`;
  },

  alignElementCenter(targetAttachmentElement) {
    assert('ElementCenter targetAttachment requires a target', targetAttachmentElement);

    const elementWidth = this.element.offsetWidth;
    const originOffset = targetAttachmentElement.getBoundingClientRect();
    const originOffsetTop = originOffset.top;
    const targetWidth = targetAttachmentElement.offsetWidth;
    const targetHeight = targetAttachmentElement.offsetHeight;
    const elementHeight = this.element.offsetHeight;

    this.element.style.left = `${originOffset.left + targetWidth / 2 - elementWidth / 2}px`;
    this.element.style.top = `${originOffsetTop + targetHeight / 2 - elementHeight / 2}px`;
  },

  alignNone() {}
});
