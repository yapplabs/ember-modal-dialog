import Ember from 'ember';
import template from '../templates/components/modal-dialog';

var computed = Ember.computed;

export default Ember.Component.extend({
  tagName: '', // modal-dialog is itself tagless. positioned-container provides
               // the container div
  layout: template,
  containerClassNames: ['ember-modal-dialog'],
  overlayClassNames: ['ember-modal-overlay'],
  concatenatedProperties: ['containerClassNames', 'overlayClassNames'],

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

