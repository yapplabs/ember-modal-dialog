import Ember from 'ember';
import layout from '../templates/components/modal-dialog';

const { dasherize } = Ember.String;
const { $, computed, inject } = Ember;
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

  // container-class - set this from templates
  containerClassNames: ['ember-modal-dialog'], // set this in a subclass definition
  containerClassNamesString: computedJoin('containerClassNames'),

  // 'overlay-class - set this from templates
  overlayClassNames: ['ember-modal-overlay'], // set this in a subclass definition
  overlayClassNamesString: computedJoin('overlayClassNames'),

  // 'wrapper-class - set this from templates
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
        this.send('close');
      }
    };
    const registerClick = () => $(document).on('click.ember-modal-dialog', handleClick);

    // setTimeout needed or else the click handler will catch the click that spawned this modal dialog
    setTimeout(registerClick);
    this._super(...arguments);
  },
  willDestroyElement() {
    $(document).off('click.ember-modal-dialog');
    this._super(...arguments);
  },

  actions: {
    close() {
      this.sendAction('close');
    }
  }
});
