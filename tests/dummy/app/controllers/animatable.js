import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import { set, action } from '@ember/object';

@classic
export default class AnimatableController extends Controller {
  isShowingBasic = false;
  isShowingTranslucent = false;
  isShowingTranslucentWithCallback = false;
  isShowingWithoutOverlay = false;
  isShowingWithoutOverlayClickOutsideToClose = false;
  isShowingWithoutOverlayClickOutsideToCloseAnotherOne = false;
  isShowingSubclassed = false;
  isShowingCenteredScrolling = false;
  isShowingElementCenterModal = false;

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
  }

  @action
  toggleActiveComponent() {
    if (this.activeComponent === 'modal-dialog') {
      set(this, 'activeComponent', 'tether-dialog');
    } else {
      set(this, 'activeComponent', 'modal-dialog');
    }
  }

  @action
  toggleBasic() {
    this.toggleProperty('isShowingBasic');
  }

  @action
  toggleTranslucent() {
    this.toggleProperty('isShowingTranslucent');
  }

  @action
  toggleTranslucentWithCallback() {
    this.toggleProperty('isShowingTranslucentWithCallback');
  }

  @action
  toggleWithoutOverlay() {
    this.toggleProperty('isShowingWithoutOverlay');
  }

  @action
  toggleWithoutOverlayClickOutsideToClose() {
    this.toggleProperty('isShowingWithoutOverlayClickOutsideToClose');
  }

  @action
  toggleWithoutOverlayClickOutsideToCloseAnotherOne() {
    this.toggleProperty(
      'isShowingWithoutOverlayClickOutsideToCloseAnotherOne'
    );
  }

  @action
  toggleSubclassed() {
    this.toggleProperty('isShowingSubclassed');
  }

  @action
  toggleCenteredScrolling() {
    this.toggleProperty('isShowingCenteredScrolling');

    if (this.isShowingCenteredScrolling) {
      document.querySelector('#modal-overlays').classList.add('active');
      document.body.classList.add('centered-modal-showing');
    } else {
      document.querySelector('#modal-overlays').classList.remove('active');
      document.body.classList.remove('centered-modal-showing');
    }
  }

  @action
  clickedTranslucentOverlay() {
    window.onClickOverlayCallbackCalled = true;
  }
}
