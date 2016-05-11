import Ember from 'ember';

const { computed, observer, on } = Ember;
const { capitalize } = Ember.String;
const SUPPORTED_TARGET_ATTACHMENTS = [
  'top', 'right', 'bottom', 'left', 'center', 'none'
];

export default Ember.Component.extend({

  // target - element selector, element, or Ember View
  // targetAttachment - top, right, bottom, left, center, or none
  //   left, right, top, bottom (relative to target)
  //   center (relative to container)
  targetAttachment: 'center',

  isPositioned: computed('targetAttachment', 'target', 'renderInPlace', function() {
    if (this.get('renderInPlace')) {
      return false;
    }
    if (this.get('target') && this.get('targetAttachment')) {
      return true;
    }
    const targetAttachment = this.get('targetAttachment');
    return targetAttachment === 'center' || targetAttachment === 'middle center';
  }),

  didGetPositioned: observer('isPositioned', on('didInsertElement', function() {
    if (this._state !== 'inDOM') {
      return;
    }

    if (this.get('isPositioned')) {
      this.updateTargetAttachment();
    } else {
      this.$().css('left', '').css('top', '');
    }
  })),

  getWrappedTargetAttachmentElement() {
    const target = this.get('target');
    if (!target) {
      return null;
    }

    if (Ember.typeOf(target) === 'string') {
      const targetSelector = target;
      const wrappedElement = Ember.$(targetSelector).eq(0);
      Ember.assert(`No element found for modal-dialog's target selector '${targetSelector}'.`, wrappedElement);
      return wrappedElement;
    }

    // passed an ember view or component
    if (target.element) {
      return Ember.$(target.element);
    }

    // passed an element directly
    return Ember.$(target);
  },

  updateTargetAttachment() {
    let targetAttachment = this.get('targetAttachment');
    // Convert tether-styled values like 'middle right' to 'right'
    targetAttachment = targetAttachment.split(' ').slice(-1)[0];
    Ember.assert(
      `Positioned container supports targetAttachments of ${SUPPORTED_TARGET_ATTACHMENTS.join(', ')}`,
      SUPPORTED_TARGET_ATTACHMENTS.indexOf(targetAttachment) > -1
    );
    const targetAttachmentMethod = `align${capitalize(targetAttachment)}`;
    const targetAttachmentElement = this.getWrappedTargetAttachmentElement();

    this[targetAttachmentMethod](targetAttachmentElement);
  },

  alignCenter() {
    const elementWidth = this.$().outerWidth();
    const elementHeight = this.$().outerHeight();

    this.$().css('left', '50%')
      .css('top', '50%')
      .css('margin-left', elementWidth * -0.5)
      .css('margin-top', elementHeight * -0.5);
  },

  alignLeft(targetAttachmentElement) {
    Ember.assert('Left targetAttachment requires a target', targetAttachmentElement.length > 0);

    const elementWidth = this.$().outerWidth();
    const originOffset = targetAttachmentElement.offset();
    const originOffsetTop = originOffset.top - Ember.$(window).scrollTop();

    this.$().css('left', originOffset.left - elementWidth)
      .css('top', originOffsetTop);
  },

  alignRight(targetAttachmentElement) {
    Ember.assert('Right targetAttachment requires a target', targetAttachmentElement.length > 0);

    const targetWidth = targetAttachmentElement.outerWidth();
    const originOffset = targetAttachmentElement.offset();
    const originOffsetTop = originOffset.top - Ember.$(window).scrollTop();

    this.$().css('left', originOffset.left + targetWidth)
      .css('top', originOffsetTop);
  },

  alignTop(targetAttachmentElement) {
    Ember.assert('Top targetAttachment requires a target', targetAttachmentElement.length > 0);

    const elementWidth = this.$().outerWidth();
    const elementHeight = this.$().outerHeight();
    const originOffset = targetAttachmentElement.offset();
    const originOffsetTop = originOffset.top - Ember.$(window).scrollTop();
    const targetWidth = targetAttachmentElement.outerWidth();

    this.$().css('left', (originOffset.left + targetWidth / 2 - elementWidth / 2))
      .css('top', originOffsetTop - elementHeight);
  },

  alignBottom(targetAttachmentElement) {
    Ember.assert('Bottom targetAttachment requires a target', targetAttachmentElement.length > 0);

    const elementWidth = this.$().outerWidth();
    const originOffset = targetAttachmentElement.offset();
    const originOffsetTop = originOffset.top - Ember.$(window).scrollTop();
    const targetWidth = targetAttachmentElement.outerWidth();
    const targetHeight = targetAttachmentElement.outerHeight();

    this.$().css('left', (originOffset.left + targetWidth / 2 - elementWidth / 2))
      .css('top', originOffsetTop + targetHeight);
  },

  alignNone() {}
});
