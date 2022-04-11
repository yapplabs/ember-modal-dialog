import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked isShowingBasic = false;
  @tracked isShowingTranslucent = false;
  @tracked isShowingTranslucentWithCallback = false;
  @tracked isShowingWithoutOverlay = false;
  @tracked isShowingWithoutOverlayClickOutsideToClose = false;
  @tracked isShowingWithoutOverlayClickOutsideToCloseAnotherOne = false;
  @tracked isShowingCustomStyles = false;
  @tracked isShowingTargetSelector = false;
  @tracked isShowingTargetElement = false;
  @tracked isShowingSubclassed = false;
  @tracked isShowingSubclassed2 = false;
  @tracked isShowingInPlace = false;
  @tracked isShowingCenteredScrolling = false;
  @tracked isShowingElementCenterModal = false;
  @tracked exampleTargetAttachment = 'middle left';
  @tracked exampleAttachment = 'middle right';
  @tracked customContainerClassNames = 'custom-styles-modal-container';

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
        this.exampleTargetAttachment
      );
      let newAttachment = this.nextAttachment(this.exampleAttachment);
      this.exampleTargetAttachment = newTargetAttachment;
      this.exampleAttachment = newAttachment;
      if (newTargetAttachment !== 'middle left') {
        return;
      }
    }
    this.isShowingTargetSelector = !this.isShowingTargetSelector;
  }

  @action
  toggleTargetElement() {
    if (this.isShowingTargetElement) {
      let newTargetAttachment = this.nextAttachment(
        this.exampleTargetAttachment
      );
      let newAttachment = this.nextAttachment(this.exampleAttachment);
      this.exampleTargetAttachment = newTargetAttachment;
      this.exampleAttachment = newAttachment;
      if (newTargetAttachment !== 'middle left') {
        return;
      }
    }
    this.isShowingTargetElement = !this.isShowingTargetElement;
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
  closeTargetSelector() {
    this.isShowingTargetSelector = false;
    this.exampleTargetAttachment = 'middle left';
    this.exampleAttachment = 'middle right';
  }

  @action
  closeTargetElement() {
    this.isShowingTargetElement = false;
    this.exampleTargetAttachment = 'middle left';
    this.exampleAttachment = 'middle right';
  }

  @action
  clickedTranslucentOverlay() {
    window.onClickOverlayCallbackCalled = true;
  }
}
