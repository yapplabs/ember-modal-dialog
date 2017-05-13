import Ember from 'ember';
import layout from '../templates/components/modal-dialog';
import { deprecate } from '@ember/debug';

const { dasherize } = Ember.String;
const { $, computed, guidFor, inject } = Ember;
const { oneWay } = computed;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const computedJoin = function(prop) {
  return computed(prop, function() {
    return this.get(prop).join(' ');
  });
};

export default Ember.Component.extend({
  tagName: '',
  layout,
  modalService: inject.service('modal-dialog'),
  destinationElementId: oneWay('modalService.destinationElementId'),

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
  containerClassNamesString: computedJoin('containerClassNames'),

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
  overlayClassNamesString: computedJoin('overlayClassNames'),

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
  wrapperClassNamesString: computedJoin('wrapperClassNames'),

  concatenatedProperties: ['containerClassNames', 'overlayClassNames', 'wrapperClassNames'],

  targetAttachmentClass: computed('targetAttachment', function() {
    let targetAttachment = this.get('targetAttachment') || '';
    // Convert tether-styled values like 'middle right' to 'right'
    targetAttachment = targetAttachment.split(' ').slice(-1)[0];
    return `ember-modal-dialog-target-attachment-${dasherize(targetAttachment)}`;
  }),

  target: 'body', // element, css selector, or view instance
  targetAttachment: 'middle center',

  translucentOverlay: false,
  clickOutsideToClose: false,
  renderInPlace: false,

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
      if (!$(event.target).closest('.ember-modal-dialog').length) {
        this.sendAction('onClose');
      }
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
  },

  actions: {
    close() {
      this.sendAction('onClose');
    },
    clickedOverlay() {
      if (this.get('onClickOverlay')) {
        this.sendAction('onClickOverlay');
      } else {
        this.sendAction('onClose');
      }
    }
  }
});
