import $ from 'jquery';
import { on } from '@ember/object/evented';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { dasherize } from '@ember/string';
import { inject as service } from '@ember/service';
import BasicDialog from './basic-dialog';
import layout from '../templates/components/deprecated-tether-dialog';
import { deprecate } from 'ember-deprecations';

export default BasicDialog.extend({
  layout,
  init() {
    this._super(...arguments);
    deprecate(
      'Direct usage of `tether-dialog` is deprecated in favor of opting into tethering behavior by passing a `tetherTarget` to `modal-dialog`. Will be removed in 3.0.0.',
      false,
      { id: 'ember-modal-dialog.tether-dialog', until: '3.0.0' }
    );
  },
  modalService: service('modal-dialog'),
  destinationElementId: computed.oneWay('modalService.destinationElementId'),

  // onClose - set this from templates
  close: computed('onClose', {
    get() {
      return this.get('onClose');
    },
    set(key, value) {
      deprecate(
        'Specifying the `close` action for a modal-dialog/tether-dialog is deprecated in favor of `onClose`. Will be removed in 3.0.0.',
        false,
        { id: 'ember-modal-dialog.close-action', until: '3.0.0' }
      );
      this.set('onClose', value);
    },
  }),

  // containerClass - set this from templates
  "container-class": computed('containerClass', {
    get() {
      return this.get('containerClass');
    },
    set(key, value) {
      deprecate(
        'Passing `container-class` (kebab-case) is deprecated in favor of `containerClass` (camelCase). Will be removed in 3.0.0.',
        false,
        { id: 'ember-modal-dialog.kebab-props', until: '3.0.0' }
      );
      this.set('containerClass', value);
    },
  }),
  containerClassNames: ['ember-modal-dialog'], // set this in a subclass definition
  containerClassNamesString: computed('containerClassNames.[]', 'targetAttachmentClass', 'attachmentClass', 'containerClass', 'renderInPlace', function() {
    return [
      this.get('containerClassNames').join(' '),
      this.get('targetAttachmentClass'),
      this.get('attachmentClass'),
      this.get('containerClass'),
      this.get('renderInPlace') ? 'ember-modal-dialog-in-place emd-in-place' : null
    ].filter((className) => !isEmpty(className)).join(' ');
  }),

  // overlayClass - set this from templates
  "overlay-class": computed('overlayClass', {
    get() {
      return this.get('overlayClass');
    },
    set(key, value) {
      deprecate(
        'Passing `overlay-class` (kebab-case) is deprecated in favor of `overlayClass` (camelCase). Will be removed in 3.0.0.',
        false,
        { id: 'ember-modal-dialog.kebab-props', until: '3.0.0' }
      );
      this.set('overlayClass', value);
    },
  }),
  overlayClassNames: ['ember-modal-overlay'], // set this in a subclass definition

  // wrapperClass - set this from templates
  "wrapper-class": computed('wrapperClass', {
    get() {
      return this.get('wrapperClass');
    },
    set(key, value) {
      deprecate(
        'Passing `wrapper-class` (kebab-case) is deprecated in favor of `wrapperClass` (camelCase). Will be removed in 3.0.0.',
        false,
        { id: 'ember-modal-dialog.kebab-props', until: '3.0.0' }
      );
      this.set('wrapperClass', value);
    },
  }),
  wrapperClassNames: ['ember-modal-wrapper'], // set this in a subclass definition

  concatenatedProperties: ['containerClassNames', 'overlayClassNames', 'wrapperClassNames'],

  targetAttachmentClass: computed('targetAttachment', function() {
    let targetAttachment = this.get('targetAttachment') || '';
    return `ember-modal-dialog-target-attachment-${dasherize(targetAttachment)}`;
  }),

  targetAttachment: 'middle center',
  attachment: 'middle center',
  hasOverlay: true,
  target: 'viewport', // element, css selector, view instance, 'viewport', or 'scroll-handle'

  tetherClassPrefix: 'ember-tether',
  // offset - passed in
  // targetOffset - passed in
  // targetModifier - passed in

  isIOS: computed(function() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }),

  makeOverlayClickableOnIOS: on('didInsertElement', function() {
    if (this.get('isIOS') && this.get('hasOverlay')) {
      $('div[data-emd-overlay]').css('cursor', 'pointer');
    }
  }),

  actions: {
    onClose() {
      this.sendAction('onClose');
    },
    onClickOverlay(e) {
      e.preventDefault();
      if (this.get('onClickOverlay')) {
        this.sendAction('onClickOverlay');
      } else {
        this.sendAction('onClose');
      }
    }
  }

});
