import { action, set } from '@ember/object';
import Controller from '@ember/controller';

export default class IndexController extends Controller {
  isShowingBasic = false;
  isShowingTranslucent = false;
  isShowingTranslucentWithCallback = false;
  isShowingWithoutOverlay = false;
  isShowingWithoutOverlayClickOutsideToClose = false;
  isShowingWithoutOverlayClickOutsideToCloseAnotherOne = false;
  isShowingCustomStyles = false;
  isShowingTargetSelector = false;
  isShowingTargetElement = false;
  isShowingSubclassed = false;
  isShowingSubclassed2 = false;
  isShowingInPlace = false;
  isShowingCenteredScrolling = false;
  isShowingElementCenterModal = false;
  exampleTargetAttachment = 'middle left';
  exampleAttachment = 'middle right';
  customContainerClassNames = 'custom-styles-modal-container';

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
  toggleTargetSelector() {
    if (this.isShowingTargetSelector) {
      let newTargetAttachment = this.nextAttachment(
        this.exampleTargetAttachment,
      );
      let newAttachment = this.nextAttachment(this.exampleAttachment);
      set(this, 'exampleTargetAttachment', newTargetAttachment);
      set(this, 'exampleAttachment', newAttachment);
      if (newTargetAttachment !== 'middle left') {
        return;
      }
    }
    this.toggleProperty('isShowingTargetSelector');
  }

  @action
  toggleTargetElement() {
    if (this.isShowingTargetElement) {
      let newTargetAttachment = this.nextAttachment(
        this.exampleTargetAttachment,
      );
      let newAttachment = this.nextAttachment(this.exampleAttachment);
      set(this, 'exampleTargetAttachment', newTargetAttachment);
      set(this, 'exampleAttachment', newAttachment);
      if (newTargetAttachment !== 'middle left') {
        return;
      }
    }
    this.toggleProperty('isShowingTargetElement');
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
  closeTargetSelector() {
    set(this, 'isShowingTargetSelector', false);
    set(this, 'exampleTargetAttachment', 'middle left');
    set(this, 'exampleAttachment', 'middle right');
  }

  @action
  closeTargetElement() {
    set(this, 'isShowingTargetElement', false);
    set(this, 'exampleTargetAttachment', 'middle left');
    set(this, 'exampleAttachment', 'middle right');
  }

  @action
  clickedTranslucentOverlay() {
    window.onClickOverlayCallbackCalled = true;
  }
}
