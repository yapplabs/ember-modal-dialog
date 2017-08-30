import Component from '@ember/component';
import { deprecate } from '@ember/debug';

export default Component.extend({
  init(){
    this._super(...arguments);
    deprecate(
      'The modal-dialog-overlay component is deprecated. Use a div with an onclick handler instead. Will be removed in 3.0.0',
      false,
      { id: 'ember-modal-dialog.modal-dialog-overlay', until: '3.0.0' }
    );
  },
  attributeBindings: ['data-ember-modal-dialog-overlay'],
  'data-ember-modal-dialog-overlay': true,

  // trigger only when clicking the overlay itself, not its children
  click(event) {
    if (event.target === this.get('element')) {
      this.sendAction();
    }
  }
});
