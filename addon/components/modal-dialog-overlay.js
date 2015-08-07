import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['data-ember-modal-dialog-overlay'],
  'data-ember-modal-dialog-overlay': true,

  // trigger only when clicking the overlay itself, not its children
  click(event) {
    if (event.target === this.get('element')) {
      this.sendAction();
    }
  }
});
