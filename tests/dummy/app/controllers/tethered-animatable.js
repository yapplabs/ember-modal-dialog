import Controller from '@ember/controller';
import { set, get } from '@ember/object';

export default Controller.extend({
  isShowingBasic: false,
  isShowingTranslucent: false,
  isShowingTranslucentWithCallback: false,
  isShowingWithoutOverlay: false,
  isShowingWithoutOverlayClickOutsideToClose: false,
  isShowingWithoutOverlayClickOutsideToCloseAnotherOne: false,
  isShowingTargetSelector: false,
  isShowingTargetElement: false,
  isShowingSubclassed: false,
  isShowingCenteredScrolling: false,
  isShowingElementCenterModal: false,
  exampleTargetAttachment: 'middle left',
  exampleAttachment: 'middle right',
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
    toggleTargetSelector() {
      if (this.get('isShowingTargetSelector')) {
        let newTargetAttachment = this.nextAttachment(this.get('exampleTargetAttachment'));
        let newAttachment = this.nextAttachment(this.get('exampleAttachment'));
        this.set('exampleTargetAttachment', newTargetAttachment);
        this.set('exampleAttachment', newAttachment);
        if (newTargetAttachment !== 'middle left') {
          return;
        }
      }
      this.toggleProperty('isShowingTargetSelector');
    },
    toggleTargetElement() {
      if (this.get('isShowingTargetElement')) {
        let newTargetAttachment = this.nextAttachment(this.get('exampleTargetAttachment'));
        let newAttachment = this.nextAttachment(this.get('exampleAttachment'));
        this.set('exampleTargetAttachment', newTargetAttachment);
        this.set('exampleAttachment', newAttachment);
        if (newTargetAttachment !== 'middle left') {
          return;
        }
      }
      this.toggleProperty('isShowingTargetElement');
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
    toggleElementCenterModal() {
      this.toggleProperty('isShowingElementCenterModal');
      if (this.get('isShowingElementCenterModal')) {
        this.set('targetAttachment', 'elementCenter');
        this.set('exampleTargetAttachment', 'elementCenter');
        this.set('exampleAttachment', 'elementCenter');
      }
    },
    closeTargetSelector() {
      this.set('isShowingTargetSelector', false);
      this.set('exampleTargetAttachment', 'middle left');
      this.set('exampleAttachment', 'middle right');
    },
    closeTargetElement() {
      this.set('isShowingTargetElement', false);
      this.set('exampleTargetAttachment', 'middle left');
      this.set('exampleAttachment', 'middle right');
    },
    clickedTranslucentOverlay() {
      window.onClickOverlayCallbackCalled = true;
    }
  }
});
