import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import { set, action } from '@ember/object';

@classic
export default class TetheredAnimatableController extends Controller {
  isShowingBasic = false;
  isShowingTranslucent = false;
  isShowingTranslucentWithCallback = false;
  isShowingWithoutOverlay = false;
  isShowingWithoutOverlayClickOutsideToClose = false;
  isShowingWithoutOverlayClickOutsideToCloseAnotherOne = false;
  isShowingTargetSelector = false;
  isShowingTargetElement = false;
  isShowingSubclassed = false;
  isShowingCenteredScrolling = false;
  isShowingElementCenterModal = false;
  exampleTargetAttachment = 'middle left';
  exampleAttachment = 'middle right';

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
    this.toggleProperty('isShowingWithoutOverlayClickOutsideToCloseAnotherOne');
  }

  @action
  toggleTargetSelector() {
    if (this.isShowingTargetSelector) {
      let newTargetAttachment = this.nextAttachment(
        this.exampleTargetAttachment
      );
      let newAttachment = this.nextAttachment(this.exampleAttachment);
      this.set('exampleTargetAttachment', newTargetAttachment);
      this.set('exampleAttachment', newAttachment);
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
        this.exampleTargetAttachment
      );
      let newAttachment = this.nextAttachment(this.exampleAttachment);
      this.set('exampleTargetAttachment', newTargetAttachment);
      this.set('exampleAttachment', newAttachment);
      if (newTargetAttachment !== 'middle left') {
        return;
      }
    }
    this.toggleProperty('isShowingTargetElement');
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
  toggleElementCenterModal() {
    this.toggleProperty('isShowingElementCenterModal');
    if (this.isShowingElementCenterModal) {
      this.set('targetAttachment', 'elementCenter');
      this.set('exampleTargetAttachment', 'elementCenter');
      this.set('exampleAttachment', 'elementCenter');
    }
  }

  @action
  closeTargetSelector() {
    this.set('isShowingTargetSelector', false);
    this.set('exampleTargetAttachment', 'middle left');
    this.set('exampleAttachment', 'middle right');
  }

  @action
  closeTargetElement() {
    this.set('isShowingTargetElement', false);
    this.set('exampleTargetAttachment', 'middle left');
    this.set('exampleAttachment', 'middle right');
  }

  @action
  clickedTranslucentOverlay() {
    window.onClickOverlayCallbackCalled = true;
  }
}
