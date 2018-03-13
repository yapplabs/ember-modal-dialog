import Controller from '@ember/controller';
import { set, get } from '@ember/object';

export default Controller.extend({
  isShowingBasic: false,
  isShowingTranslucent: false,
  isShowingTranslucentWithCallback: false,
  isShowingWithoutOverlay: false,
  isShowingWithoutOverlayClickOutsideToClose: false,
  isShowingWithoutOverlayClickOutsideToCloseAnotherOne: false,
  isShowingSubclassed: false,
  isShowingCenteredScrolling: false,
  isShowingElementCenterModal: false,
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
    toggleSubclassed() {
      this.toggleProperty('isShowingSubclassed');
    },
    toggleCenteredScrolling() {
      this.toggleProperty('isShowingCenteredScrolling');

      if (this.get('isShowingCenteredScrolling')) {
        document.querySelector('#modal-overlays').classList.add('active');
        document.body.classList.add('centered-modal-showing');
      } else {
        document.querySelector('#modal-overlays').classList.remove('active');
        document.body.classList.remove('centered-modal-showing');
      }
    },
    clickedTranslucentOverlay() {
      window.onClickOverlayCallbackCalled = true;
    }
  }
});
