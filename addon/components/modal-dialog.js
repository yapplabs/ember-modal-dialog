import Ember from 'ember';
import template from '../templates/components/modal-dialog';
const dasherize = Ember.String.dasherize;
const computed = Ember.computed;

const injectService = Ember.inject.service;
const reads = Ember.computed.reads;
const computedJoin = function(prop) {
  return computed(prop, function(){
    return this.get(prop).join(' ');
  });
};

export default Ember.Component.extend({
  tagName: '', // modal-dialog is itself tagless. positioned-container provides
               // the container div
  layout: template,
  modalService: injectService('modal-dialog'),
  destinationElementId: reads('modalService.destinationElementId'),
  hasEmberTether: reads('modalService.hasEmberTether'),

  useEmberTether: computed('hasEmberTether', 'alignment', 'renderInPlace', function() {
    return this.get('hasEmberTether') && (this.get('alignment') !== 'none') && !this.get('renderInPlace');
  }),

  'container-class': null, // set this from templates
  containerClassNames: ['ember-modal-dialog'], // set this in a subclass definition
  containerClassNamesString: computedJoin('containerClassNames'),

  'overlay-class': null, // set this from templates
  overlayClassNames: ['ember-modal-overlay'], // set this in a subclass definition
  overlayClassNamesString: computedJoin('overlayClassNames'),

  concatenatedProperties: ['containerClassNames', 'overlayClassNames'],

  alignmentClass: computed('alignment', function(){
    var alignment = this.get('alignment');
    if (alignment) {
      return `ember-modal-dialog-${dasherize(alignment)}`;
    }
  }),

  renderInPlaceClass: computed('renderInPlace', function() {
    if (this.get('renderInPlace')) {
      return 'ember-modal-dialog-in-place';
    }
  }),

  alignment: 'center', // passed in
  _alignmentNormalized: computed('alignment', 'renderInPlace', function() {
    if (this.get('renderInPlace')) {
      return 'none';
    }
    return this.get('alignment');
  }),
  alignmentTarget: null, // element, css selector, or view instance... passed in
  _alignmentTargetNormalized: computed('alignmentTarget', function() {
    if (this.get('alignmentTarget')) {
      return this.get('alignmentTarget');
    }
    if (typeof document !== 'undefined') {
      return document.body;
    }
  }),
  attachment: null, // passed in
  targetAttachment: null, // passed in
  targetModifier: null, // passed in
  _targetModifierNormalized: computed('targetModifier', 'alignment', function() {
    if (this.get('targetModifier')) {
      return this.get('targetModifier');
    }
    if (this.get('alignment') === 'center') {
      return 'visible';
    }
  }),

  tetherClassPrefix: 'ember-tether',
  offset: null, // passed in
  targetOffset: null, // passed in

  hasOverlay: true,
  translucentOverlay: false,
  renderInPlace: false,

  _attachmentNormalized: computed('alignment', 'attachment', function() {
    if (this.get('attachment')) {
      return this.get('attachment');
    }
    switch(this.get('alignment')) {
      case 'center':
        return 'middle center';
      case 'top':
        return 'bottom center';
      case 'right':
        return 'middle left';
      case 'bottom':
        return 'top center';
      case 'left':
        return 'middle right';
    }
  }),
  _targetAttachmentNormalized: computed('targetAttachment', '_attachmentNormalized', function() {
    if (this.get('targetAttachment')) {
      return this.get('targetAttachment');
    }
    switch(this.get('_attachmentNormalized')) {
      case 'middle center':
        return 'middle center';
      case 'top center':
        return 'bottom center';
      case 'middle right':
        return 'middle left';
      case 'bottom center':
        return 'top center';
      case 'middle left':
        return 'middle right';
    }
  }),

  actions: {
    close: function() {
      this.sendAction('close');
    }
  }
});

