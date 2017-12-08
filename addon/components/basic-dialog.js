import { on } from '@ember/object/evented';
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

  modalService: service('modal-dialog'),
  destinationElementId: computed.oneWay('modalService.destinationElementId'),

  variantWrapperClass: 'emd-static',
  containerClassNamesString: computed('containerClassNames.[]', 'targetAttachmentClass', 'attachmentClass', 'containerClass', function() {
    return [
      this.get('containerClassNames').join(' '),
      this.get('targetAttachmentClass'),
      this.get('attachmentClass'),
      this.get('containerClass')
    ].filter((className) => !isEmpty(className)).join(' ');
  }),
  overlayClassNamesString: computed('overlayClassNames.[]', 'overlayClass', 'translucentOverlay', function(){
    return [
      this.get('overlayClassNames').join(' '),
      this.get('translucentOverlay') ? 'translucent' : null,
      this.get('overlayClass')
    ].filter((className) => !isEmpty(className)).join(' ');
  }),
  wrapperClassNamesString: computed('wrapperClassNames.[]', 'targetAttachmentClass', 'variantWrapperClass', 'wrapperClass', function(){
    return [
      this.get('wrapperClassNames').join(' '),
      this.get('targetAttachmentClass').replace('emd-', 'emd-wrapper-'),
      this.get('variantWrapperClass'),
      this.get('wrapperClass')
    ].filter((className) => !isEmpty(className)).join(' ');
  }),

  concatenatedProperties: ['containerClassNames', 'overlayClassNames', 'wrapperClassNames'],

  translucentOverlay: false,
  clickOutsideToClose: false,
  hasOverlay: true,
  isCentered: true,
  overlayPosition: null,
  isOverlaySibling: computed('overlayPosition', function() {
    return this.get('overlayPosition') === 'sibling';
  }),

  isIOS: computed(function() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }),

  makeOverlayClickableOnIOS: on('didInsertElement', function() {
    if (this.get('isIOS')) {
      document.querySelector('div[data-ember-modal-dialog-overlay]').style.cursor = 'pointer';
    }
  }),

  didInsertElement() {
    if (!this.get('clickOutsideToClose')) {
      return;
    }

    this.handleClick = ({ target }) => {
      // if the click has already resulted in the target
      // being removed or hidden, do nothing
      if (target.offsetWidth === 0 && target.offsetHeight === 0) {
        return;
      }

      // if the click is within the dialog, do nothing
      if (document.querySelector('.ember-modal-dialog').contains(target)) {
        return;
      }

      this.sendAction('onClose');
    };

    const registerClick = () => document.addEventListener('click', this.handleClick);

    // setTimeout needed or else the click handler will catch the click that spawned this modal dialog
    setTimeout(registerClick);

    if (this.get('isIOS')) {
      const registerTouch = () => document.addEventListener.on('touchend', this.handleClick);
      setTimeout(registerTouch);
    }
    this._super(...arguments);
  },

  willDestroyElement() {
    document.removeEventListener('click', this.handleClick);
    if (this.get('isIOS')) {
      document.removeEventListener('touchend', this.handleClick);
    }
    this._super(...arguments);
  }
});
