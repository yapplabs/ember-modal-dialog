import Ember from 'ember';
const { get, set } = Ember;

export default Ember.Controller.extend({
  isShowingBasic: false,
  isShowingTranslucent: false,
  isShowingTranslucentWithCallback: false,
  isShowingWithoutOverlay: false,
  isShowingWithoutOverlayClickOutsideToClose: false,
  isShowingWithoutOverlayClickOutsideToCloseAnotherOne: false,
  isShowingCustomStyles: false,
  isShowingSubclassed: false,
  isShowingInPlace: false,
  isShowingCenteredScrolling: false,
  customContainerClassNames: 'custom-styles-modal-container',
  nextAttachment(val) {
    switch (val) {
      case 'middle right':
        return 'bottom center';
      case 'bottom center':
        return 'middle left';
      case 'middle left':
        return 'top center';
      case 'top center':
        return 'middle right';
    }
    return false;
  },
  actions: {
    toggleActiveComponent() {
      if (get(this, 'activeComponent') === 'modal-dialog') {
        set(this, 'activeComponent', 'tether-dialog');
      } else {
        set(this, 'activeComponent', 'modal-dialog');
      }
    },
    toggleBasic() {
      this.toggleProperty('isShowingBasic');
    },
    toggleTranslucent() {
      this.toggleProperty('isShowingTranslucent');
    },
    toggleTranslucentWithCallback() {
      this.toggleProperty('isShowingTranslucentWithCallback');
    },
    toggleWithoutOverlay() {
      this.toggleProperty('isShowingWithoutOverlay');
    },
    toggleWithoutOverlayClickOutsideToClose() {
      this.toggleProperty('isShowingWithoutOverlayClickOutsideToClose');
    },
    toggleWithoutOverlayClickOutsideToCloseAnotherOne() {
      this.toggleProperty('isShowingWithoutOverlayClickOutsideToCloseAnotherOne');
    },
    toggleCustomStyles() {
      this.toggleProperty('isShowingCustomStyles');
    },
    toggleSubclassed() {
      this.toggleProperty('isShowingSubclassed');
    },
    toggleInPlace() {
      this.toggleProperty('isShowingInPlace');
    },
    toggleCenteredScrolling() {
      this.toggleProperty('isShowingCenteredScrolling');

      if (this.get('isShowingCenteredScrolling')) {
        Ember.$('#modal-overlays').addClass('active');
        Ember.$('body').addClass('centered-modal-showing');
      } else {
        Ember.$('#modal-overlays').removeClass('active');
        Ember.$('body').removeClass('centered-modal-showing');
      }
    },
    clickedTranslucentOverlay() {
      window.onClickOverlayCallbackCalled = true;
    }
  }
});
