import Ember from 'ember';

export default Ember.Component.extend({
  isShowingModalDialog: false,
  actions: {
    openModalDialog() {
      this.set('isShowingModalDialog', true);
    },
    closeModalDialog() {
      this.set('isShowingModalDialog', false);
    }
  }
});
