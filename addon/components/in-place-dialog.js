import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/in-place-dialog';

const computedJoin = function(prop) {
  return computed(prop, function() {
    return this.get(prop).join(' ');
  });
};

export default Component.extend({
  tagName: '',
  layout,

  containerClass: null, // passed in
  containerClassNames: ['ember-modal-dialog', 'ember-modal-dialog-in-place', 'emd-in-place'], // set this in a subclass definition
  containerClassNamesString: computedJoin('containerClassNames'),

  concatenatedProperties: ['containerClassNames']
});
