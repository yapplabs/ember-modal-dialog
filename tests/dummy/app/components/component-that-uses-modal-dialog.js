import Component from '@ember/component';

export default Component.extend({
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
