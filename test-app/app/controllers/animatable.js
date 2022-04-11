import Controller from '@ember/controller';
import { set, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AnimatableController extends Controller {
  @tracked isShowingBasic = false;
  @tracked isShowingTranslucent = false;
  @tracked isShowingTranslucentWithCallback = false;
  @tracked isShowingWithoutOverlay = false;
  @tracked isShowingWithoutOverlayClickOutsideToClose = false;
  @tracked isShowingWithoutOverlayClickOutsideToCloseAnotherOne = false;
  @tracked isShowingSubclassed = false;
  @tracked isShowingCenteredScrolling = false;
  @tracked isShowingElementCenterModal = false;

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
    this.isShowingBasic = !this.isShowingBasic;
  }

  @action
  toggleTranslucent() {
    this.isShowingTranslucent = !this.isShowingTranslucent;
  }

  @action
  toggleTranslucentWithCallback() {
    this.isShowingTranslucentWithCallback =
      !this.isShowingTranslucentWithCallback;
  }

  @action
  toggleWithoutOverlay() {
    this.isShowingWithoutOverlay = !this.isShowingWithoutOverlay;
  }

  @action
  toggleWithoutOverlayClickOutsideToClose() {
    this.isShowingWithoutOverlayClickOutsideToClose =
      !this.isShowingWithoutOverlayClickOutsideToClose;
  }

  @action
  toggleWithoutOverlayClickOutsideToCloseAnotherOne() {
    this.isShowingWithoutOverlayClickOutsideToCloseAnotherOne =
      !this.isShowingWithoutOverlayClickOutsideToCloseAnotherOne;
  }

  @action
  toggleSubclassed() {
    this.isShowingSubclassed = !this.isShowingSubclassed;
  }

  @action
  toggleCenteredScrolling() {
    this.isShowingCenteredScrolling = !this.isShowingCenteredScrolling;

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
