import Ember from 'ember';
import layout from '../templates/components/modal-dialog';

const { dasherize } = Ember.String;
const { $, computed, observer, inject } = Ember;
const { oneWay } = computed;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const computedJoin = function(prop) {
  return computed(prop, function() {
    return this.get(prop).join(' ');
  });
};

export default Ember.Component.extend({
  tagName: '',
  layout: layout,
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
  outsideClickHandler: null,
  renderInPlace: false,

  emberModalDismissId: oneWay('elementId'),

  makeOverlayClickableOnIOS: Ember.on('didInsertElement', function() {
    if (isIOS) {
      Ember.$('div[data-ember-modal-dialog-overlay]').css('cursor', 'pointer');
    }
  }),

  _registerClickHandler() {
    if (!this.get('clickOutsideToClose')) {
      return;
    }

    const handleClick = (event) => {
      if (!$(event.target).hasClass('ember-modal-dialog')) { return; }
      this.send('close');
    };
    this.set('outsideClickHandler', handleClick);

    // Run next so the click handler will not catch the click that spawned this modal dialog
    Ember.run.next(this, () => {
      $(document).on(`click[data-ember-modal-dismiss-id="${this.get('elementId')}"]`, null, null, handleClick);
    });
  },

  _removeClickHandler() {
    $(document).off(`click[data-ember-modal-dismiss-id="${this.get('elementId')}"]`, null, this.get('outsideClickHandler'));
    this.set('outsideClickHandler', null);
  },

  updateClickHandler: Ember.on('init', observer('clickOutsideToClose', function() {
    if (this.get('clickOutsideToClose')) {
      this._registerClickHandler();
    } else {
      this._removeClickHandler();
    }
  })),

  didInsertElement() {
    this._registerClickHandler();
    this._super(...arguments);
  },

  willDestroyElement() {
    $(document).off(`click[data-ember-modal-dismiss-id="${this.get('elementId')}"]`);
    this._super(...arguments);
  },

  actions: {
    close() {
      this.sendAction('close');
    }
  }
});
