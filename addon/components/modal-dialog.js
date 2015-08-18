import Ember from 'ember';
import inPlaceLayout from '../templates/components/modal-dialog-in-place-positioner';
import simpleLayout from '../templates/components/modal-dialog-simple-positioner';
import nestedLayout from '../templates/components/modal-dialog-nested-positioner';
import tetheredLayout from '../templates/components/modal-dialog-tethered-positioner';

const LAYOUTS = {
  inPlace: inPlaceLayout,
  simple: simpleLayout,
  nested: nestedLayout,
  tethered: tetheredLayout
};

const { dasherize } = Ember.String;
const { $, computed, get } = Ember;
var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

const injectService = Ember.inject.service;
const { reads } = computed;
const computedJoin = function(prop) {
  return computed(prop, function() {
    return this.get(prop).join(' ');
  });
};

export default Ember.Component.extend({
  // modal-dialog is itself tagless. positioned-container provides the container div
  tagName: '',
  layout: computed('positioning', 'useEmberTether', function() {
    let strategy = get(this, 'positioning');
    let useEmberTether = get(this, 'useEmberTether');
    if (strategy === 'tethered' && !useEmberTether) {
      strategy = 'simple';
    }
    return LAYOUTS[strategy];
  }),
  positioning: 'tethered', // tethered, simple, nested, or in-place
  modalService: injectService('modal-dialog'),
  destinationElementId: reads('modalService.destinationElementId'),

  useEmberTether: computed('modalService.useEmberTether', function() {
    return this.get('modalService.useEmberTether');
  }),

  'container-class': null, // set this from templates
  containerClassNames: ['ember-modal-dialog'], // set this in a subclass definition
  containerClassNamesString: computedJoin('containerClassNames'),

  'overlay-class': null, // set this from templates
  overlayClassNames: ['ember-modal-overlay'], // set this in a subclass definition
  overlayClassNamesString: computedJoin('overlayClassNames'),

  'wrapper-class': null, // set this from templates
  wrapperClassNames: ['ember-modal-wrapper'], // set this in a subclass definition
  wrapperClassNamesString: computedJoin('wrapperClassNames'),

  concatenatedProperties: ['containerClassNames', 'overlayClassNames', 'wrapperClassNames'],

  alignmentClass: computed('alignment', function() {
    var alignment = this.get('alignment');
    if (alignment) {
      return `ember-modal-dialog-${dasherize(alignment)}`;
    }
  }),

  alignment: 'center', // passed in
  alignmentTarget: null, // element, css selector, or view instance... passed in
  target: null, // passed in
  computedTarget: computed('target', 'alignmentTarget', function() {
    return this.get('target') || this.get('alignmentTarget') || 'body';
  }),
  attachment: null, // passed in
  computedAttachment: computed('attachment', function() {
    return this.get('attachment') || 'middle center';
  }),
  targetAttachment: null, // passed in
  targetModifier: 'visible',

  tetherClassPrefix: 'ember-tether',
  offset: null, // passed in
  targetOffset: null, // passed in

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

    var handleClick = event => {
      if (!$(event.target).closest('.ember-modal-dialog').length) {
        this.send('close');
      }
    };
    var registerClick = () => $(document).on('click.ember-modal-dialog', handleClick);

    // setTimeout needed or else the click handler will catch the click that spawned this modal dialog
    setTimeout(registerClick);
  },
  willDestroyElement() {
    $(document).off('click.ember-modal-dialog');
  },

  actions: {
    close: function() {
      this.sendAction('close');
    }
  }
});
