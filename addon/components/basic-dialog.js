import Ember from 'ember';
import layout from '../templates/components/basic-dialog';

const { $, computed, guidFor, inject, isEmpty } = Ember;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

export default Ember.Component.extend({
  tagName: '',
  layout,

  modalService: inject.service('modal-dialog'),
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

  makeOverlayClickableOnIOS: Ember.on('didInsertElement', function() {
    if (isIOS) {
      Ember.$('div[data-ember-modal-dialog-overlay]').css('cursor', 'pointer');
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
    const registerClick = () => $(document).on(`click.ember-modal-dialog-${guidFor(this)}`, handleClick);

    // setTimeout needed or else the click handler will catch the click that spawned this modal dialog
    setTimeout(registerClick);

    if (isIOS) {
      const registerTouch = () => $(document).on(`touchend.ember-modal-dialog-${guidFor(this)}`, handleClick);
      setTimeout(registerTouch);
    }
    this._super(...arguments);
  },

  willDestroyElement() {
    $(document).off(`click.ember-modal-dialog-${guidFor(this)}`);
    if (isIOS) {
      $(document).off(`touchend.ember-modal-dialog-${guidFor(this)}`);
    }
    this._super(...arguments);
  }
});
