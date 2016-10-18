import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
    this.sendAction('registerComponent', this);
  },
  actions: {
    openModalDialog() {
      this.set('isShowingModalDialog', true);
    },
    closeModalDialog() {
      this.set('isShowingModalDialog', false);
    }
  }
});
