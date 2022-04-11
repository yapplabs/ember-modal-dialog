import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TetheredAnimatableController extends Controller {
  @tracked isShowingBasic = false;
  @tracked isShowingTranslucent = false;
  @tracked isShowingTranslucentWithCallback = false;
  @tracked isShowingWithoutOverlay = false;
  @tracked isShowingWithoutOverlayClickOutsideToClose = false;
  @tracked isShowingWithoutOverlayClickOutsideToCloseAnotherOne = false;
  @tracked isShowingTargetSelector = false;
  @tracked isShowingTargetElement = false;
  @tracked isShowingSubclassed = false;
  @tracked isShowingCenteredScrolling = false;
  @tracked isShowingElementCenterModal = false;
  @tracked exampleTargetAttachment = 'middle left';
  @tracked exampleAttachment = 'middle right';

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
      this.activeComponent = 'tether-dialog';
    } else {
      this.activeComponent = 'modal-dialog';
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
  toggleElementCenterModal() {
    this.isShowingElementCenterModal = !this.isShowingElementCenterModal;
    if (this.isShowingElementCenterModal) {
      this.targetAttachment = 'elementCenter';
      this.exampleTargetAttachment = 'elementCenter';
      this.exampleAttachment = 'elementCenter';
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
