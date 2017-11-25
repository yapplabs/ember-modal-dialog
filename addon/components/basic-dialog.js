import { on } from '@ember/object/evented';
import Component from '@ember/component';
import $ from 'jquery';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
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
      $('div[data-ember-modal-dialog-overlay]').css('cursor', 'pointer');
    }
  }),

  didInsertElement() {
    if (!this.get('clickOutsideToClose')) {
      return;
    }

    const handleClick = (event) => {
      let $eventTarget = $(event.target);

      // if the click has already resulted in the target
      // being removed or hidden, do nothing
      if (!$eventTarget.is(':visible')) {
        return;
      }

      // if the click is within the dialog, do nothing
      if ($eventTarget.closest('.ember-modal-dialog').length) {
        return;
      }

      this.sendAction('onClose');
    };
    const registerClick = () => $(window.document).on(`click.ember-modal-dialog-${guidFor(this)}`, handleClick);

    // setTimeout needed or else the click handler will catch the click that spawned this modal dialog
    setTimeout(registerClick);

    if (this.get('isIOS')) {
      const registerTouch = () => $(window.document).on(`touchend.ember-modal-dialog-${guidFor(this)}`, handleClick);
      setTimeout(registerTouch);
    }
    this._super(...arguments);
  },

  willDestroyElement() {
    $(window.document).off(`click.ember-modal-dialog-${guidFor(this)}`);
    if (this.get('isIOS')) {
      $(window.document).off(`touchend.ember-modal-dialog-${guidFor(this)}`);
    }
    this._super(...arguments);
  }
});
