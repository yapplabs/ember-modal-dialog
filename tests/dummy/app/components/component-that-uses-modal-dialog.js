import Ember from 'ember';

export default Ember.Component.extend({
  isShowingModalDialog: false,
  actions: {
    openModalDialog: function() {
      this.set('isShowingModalDialog', true);
    },
    closeModalDialog: function() {
      this.set('isShowingModalDialog', false);
    }
  }
});
