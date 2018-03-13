import Controller from '@ember/controller';

export default Controller.extend({
  isShowingBasic: false,
  isShowingTranslucent: false,
  isShowingTranslucentWithCallback: false,
  isShowingWithoutOverlay: false,
  isShowingWithoutOverlayClickOutsideToClose: false,
  isShowingWithoutOverlayClickOutsideToCloseAnotherOne: false,
  isShowingCustomStyles: false,
  isShowingTargetSelector: false,
  isShowingTargetElement: false,
  isShowingSubclassed: false,
  isShowingInPlace: false,
  isShowingCenteredScrolling: false,
  isShowingElementCenterModal: false,
  exampleTargetAttachment: 'middle left',
  exampleAttachment: 'middle right',
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
