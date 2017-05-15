import Ember from 'ember';
import layout from '../templates/components/in-place-dialog';

const { computed } = Ember;
const computedJoin = function(prop) {
  return computed(prop, function() {
    return this.get(prop).join(' ');
  });
};

export default Ember.Component.extend({
  tagName: '',
  layout,

  containerClass: null, // passed in
  containerClassNames: ['ember-modal-dialog', 'ember-modal-dialog-in-place', 'emd-in-place'], // set this in a subclass definition
  containerClassNamesString: computedJoin('containerClassNames'),

  concatenatedProperties: ['containerClassNames']
});
