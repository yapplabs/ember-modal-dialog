import Ember from 'ember';
import template from '../templates/components/modal-dialog';

var computed = Ember.computed;

export default Ember.Component.extend({
  tagName: '', // modal-dialog is itself tagless. positioned-container provides
               // the container div
  layout: template,

 /* containerClassNames should be additive, functioning similarly to a
  * "concatenatedProperty" even for values set from a template. Combining
  * the setter below with the concatenatedProperties declaration
  * accomplishes this.
  */
  containerClassNames: Ember.computed('_containerClassNames.[]', function(key, val){
    if (arguments.length > 1) {
      Ember.A(this.get('_containerClassNames')).pushObject(val);
    }
    return this.get('_containerClassNames');
  }),
  _containerClassNames: Ember.computed(function(){
    return ['ember-modal-dialog'];
  }),

  overlayClassNames: ['ember-modal-overlay'],
  concatenatedProperties: ['containerClassNames', 'overlayClassNames'],

  destinationElementId: null, // injected
  alignmentTarget: null, // view instance, passed in
  alignment: 'center', // passed in
  isPositioned: computed.notEmpty('alignmentTarget'),
  hasOverlay: true,
  translucentOverlay: false,

  overlayClassNamesString: computed('overlayClassNames.[]', 'translucentOverlay', function() {
    var overlayClassNames = this.get('overlayClassNames');
    var cns = [];
    if (this.get('translucentOverlay')) {
      cns.push('translucent');
    }
    if (overlayClassNames) {
      cns.push(this.get('overlayClassNames').join(' '));
    }
    if (cns) {
      return cns.join(' ');
    }
  }),

  actions: {
    close: function() {
      this.sendAction('close');
    }
  }
});

