import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import layout from '../templates/components/basic-dialog';

export default Component.extend({
  tagName: '',
  layout,

  containerClassNames: null,
  overlayClassNames: null,
  wrapperClassNames: null,
  destinationElementId: null,

  modalService: service('modal-dialog'),

  init() {
    this._super(...arguments);
    if (!this.destinationElementId) {
      this.set('destinationElementId', this.modalService.destinationElementId);
    }
  },

  variantWrapperClass: 'emd-static',
  containerClassNamesString: computed('containerClassNames.[]', 'targetAttachmentClass', 'attachmentClass', 'containerClass', function() {
    return [
      this.containerClassNames.join(' '),
      this.targetAttachmentClass,
      this.attachmentClass,
      this.containerClass
    ].filter((className) => !isEmpty(className)).join(' ');
  }),
  overlayClassNamesString: computed('overlayClassNames.[]', 'overlayClass', 'translucentOverlay', function(){
    return [
      this.overlayClassNames.join(' '),
      this.translucentOverlay ? 'translucent' : null,
      this.overlayClass
    ].filter((className) => !isEmpty(className)).join(' ');
  }),
  wrapperClassNamesString: computed('wrapperClassNames.[]', 'targetAttachmentClass', 'variantWrapperClass', 'wrapperClass', function(){
    return [
      this.wrapperClassNames.join(' '),
      this.targetAttachmentClass.replace('emd-', 'emd-wrapper-'),
      this.variantWrapperClass,
      this.wrapperClass
    ].filter((className) => !isEmpty(className)).join(' ');
  }),

  concatenatedProperties: ['containerClassNames', 'overlayClassNames', 'wrapperClassNames'],

  translucentOverlay: false,
  clickOutsideToClose: false,
  hasOverlay: true,
  isCentered: true,
  overlayPosition: null,
  isOverlaySibling: computed('overlayPosition', function() {
    return this.overlayPosition === 'sibling';
  }),

  didInsertElement() {
    if (!this.clickOutsideToClose) {
      return;
    }
    this.makeOverlayClickableOnIOS();

    this.handleClick = ({ target }) => {
      // if the click has already resulted in the target
      // being removed or hidden, do nothing
      if (target.offsetWidth === 0 && target.offsetHeight === 0) {
        return;
      }

      if (this.isDestroying || this.isDestroyed) {
        return;
      }

      let modalSelector = '.ember-modal-dialog';
      if (this.stack) {
        modalSelector = '#' + this.stack + modalSelector;
      }

      // if the click is within the dialog, do nothing
      let modalEl = document.querySelector(modalSelector);
      if (modalEl && modalEl.contains(target)) {
        return;
      }
      if (this.onClose) {
        this.onClose();
      }
    };

    const registerClick = () => document.addEventListener('click', this.handleClick);

    // setTimeout needed or else the click handler will catch the click that spawned this modal dialog
    setTimeout(registerClick);

    if (this.isIOS) {
      const registerTouch = () => document.addEventListener('touchend', this.handleClick);
      setTimeout(registerTouch);
    }
    this._super(...arguments);
  },

  willDestroyElement() {
    document.removeEventListener('click', this.handleClick);
    if (this.isIOS) {
      document.removeEventListener('touchend', this.handleClick);
    }
    this._super(...arguments);
  },

  isIOS: computed(function() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }),

  makeOverlayClickableOnIOS() {
    if (this.isIOS) {
      let overlayEl = document.querySelector('div[data-emd-overlay]');
      if (overlayEl) {
        overlayEl.style.cursor = 'pointer';
      }
    }
  }
});
