import Ember from 'ember';
import layout from '../templates/components/modal-dialog';
const { computed, inject, isEmpty } = Ember;
const { dasherize } = Ember.String;
import { deprecate } from '@ember/debug';

export default Ember.Component.extend({
  tagName: '',
  layout,
  modalService: inject.service('modal-dialog'),
  destinationElementId: computed.oneWay('modalService.destinationElementId'),
  modalDialogComponentName: computed('renderInPlace', 'tetherTarget', function(){
    if (this.get('renderInPlace')) {
      return 'ember-modal-dialog/-in-place-dialog';
    } else if (this.get('tetherTarget')) {
      if (!this.get('modalService.hasEmberTether')) {
        throw new Error('Please install ember-tether in order to pass a tetherTarget to modal-dialog');
      }
      return 'ember-modal-dialog/-tether-dialog';
    }
    return 'ember-modal-dialog/-basic-dialog';
  }),

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

  hasOverlay: true,
  translucentOverlay: false,
  clickOutsideToClose: false,
  renderInPlace: false,
  tetherTarget: null,
  target: computed({ // element, css selector, or view instance
    get() {
      return 'body';
    },
    set(key, value) {
      deprecate(
        'Specifying a `target` on `modal-dialog` is deprecated in favor of padding `tetherTarget`, which will trigger ember-tether usage. Support for `target` will be removed in 3.0.0.',
        false,
        { id: 'ember-modal-dialog.modal-dialog-target', until: '3.0.0' }
      );
      return value;
    },
  }),

  targetAttachment: 'middle center',
  tetherClassPrefix: null,
  attachmentClass: computed('attachment', function() {
    let attachment = this.get('attachment');
    if (isEmpty(attachment)) {
      return;
    }
    return attachment.split(' ').map((attachmentPart) => {
      return `emd-attachment-${dasherize(attachmentPart)}`;
    }).join(' ');
  }),
  targetAttachmentClass: computed('targetAttachment', function() {
    let targetAttachment = this.get('targetAttachment') || '';
    // Convert tether-styled values like 'middle right' to 'right'
    targetAttachment = targetAttachment.split(' ').slice(-1)[0];
    return `ember-modal-dialog-target-attachment-${dasherize(targetAttachment)}`;
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
