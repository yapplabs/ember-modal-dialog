import Ember from 'ember';
import inPlaceLayout from '../templates/components/modal-dialog-in-place-structure';
import simpleLayout from '../templates/components/modal-dialog-simple-structure';
import nestedLayout from '../templates/components/modal-dialog-nested-structure';
import tetheredLayout from '../templates/components/modal-dialog-tethered-structure';

const STRUCTURES = {
  inPlace: inPlaceLayout,
  simple: simpleLayout,
  nested: nestedLayout,
  tethered: tetheredLayout
};

const { dasherize } = Ember.String;
const { $, computed, get, inject } = Ember;
const { oneWay } = computed;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const computedJoin = function(prop) {
  return computed(prop, function() {
    return this.get(prop).join(' ');
  });
};

export default Ember.Component.extend({
  tagName: '',
  layout: computed('structure', function() {
    return STRUCTURES[get(this, 'structure')];
  }),
  structure: computed('defaultStructure', function() {
    return get(this, 'defaultStructure') || 'simple';
  }),
  modalService: inject.service('modal-dialog'),
  destinationElementId: oneWay('modalService.destinationElementId'),
  defaultStructure: oneWay('modalService.defaultStructure'),

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

  targetAttachmentClass: computed('targetAttachment', 'structure', function() {
    let targetAttachment = this.get('targetAttachment') || '';
    const structure = get(this, 'structure');
    if (structure !== 'tethered') {
      // Convert tether-styled values like 'middle right' to 'right'
      targetAttachment = targetAttachment.split(' ').slice(-1)[0];
    }
    return `ember-modal-dialog-target-attachment-${dasherize(targetAttachment)}`;
  }),

  target: 'body', // element, css selector, or view instance
  targetAttachment: 'middle center',
  attachment: 'middle center',
  targetModifier: 'visible',

  tetherClassPrefix: 'ember-tether',
  // offset - passed in
  // targetOffset - passed in

  hasOverlay: true,
  translucentOverlay: false,
  clickOutsideToClose: false,

  makeOverlayClickableOnIOS: Ember.on('didInsertElement', function() {
    if (isIOS && get(this, 'hasOverlay')) {
      Ember.$('div[data-ember-modal-dialog-overlay]').css('cursor', 'pointer');
    }
  }),

  didInsertElement() {
    if (!this.get('clickOutsideToClose')) {
      return;
    }

    const handleClick = event => {
      if (!$(event.target).closest('.ember-modal-dialog').length) {
        this.send('close');
      }
    };
    const registerClick = () => $(document).on('click.ember-modal-dialog', handleClick);

    // setTimeout needed or else the click handler will catch the click that spawned this modal dialog
    setTimeout(registerClick);
  },
  willDestroyElement() {
    $(document).off('click.ember-modal-dialog');
  },

  actions: {
    close() {
      this.sendAction('close');
    }
  }
});
