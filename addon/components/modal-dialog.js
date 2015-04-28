import Ember from 'ember';
import template from '../templates/components/modal-dialog';
var dasherize = Ember.String.dasherize;

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

  "container-class": null, // set this from templates
  containerClassNames: ['ember-modal-dialog'], // set this in a subclass definition
  containerClassNamesString: computedJoin('containerClassNames'),

  "overlay-class": null, // set this from templates
  overlayClassNames: ['ember-modal-overlay'], // set this in a subclass definition
  overlayClassNamesString: computedJoin('overlayClassNames'),

  concatenatedProperties: ['containerClassNames', 'overlayClassNames'],

  alignmentClass: computed('alignment', function(){
    var alignment = this.get('alignment');
    if (alignment) {
      return `ember-modal-dialog-${dasherize(alignment)}`;
    }
  }),

  destinationElementId: null, // injected
  alignmentTarget: null, // view instance, passed in
  alignment: 'center', // passed in
  isPositioned: computed.notEmpty('alignmentTarget'),
  hasOverlay: true,
  translucentOverlay: false,

  actions: {
    close: function() {
      this.sendAction('close');
    }
  }
});

