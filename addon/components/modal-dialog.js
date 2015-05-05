import Ember from 'ember';
import template from '../templates/components/modal-dialog';
var dasherize = Ember.String.dasherize;

var injectService = Ember.inject.service;
var reads = Ember.computed.reads;
var computed = Ember.computed;
var computedJoin = function(prop) {
  return computed(prop, function(){
    return this.get(prop).join(' ');
  });
};

export default Ember.Component.extend({
  tagName: '', // modal-dialog is itself tagless. positioned-container provides
               // the container div
  layout: template,

  modalService: injectService("modal-dialog"),
  destinationElementId: reads("modalService.destinationElementId"),

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

  alignmentTarget: null, // view instance, passed in
  alignment: 'center', // passed in
  isPositioned: computed.notEmpty('alignmentTarget'),
  hasOverlay: true,
  translucentOverlay: false,
  renderInPlace: false,

  actions: {
    close: function() {
      this.sendAction('close');
    }
  }
});

