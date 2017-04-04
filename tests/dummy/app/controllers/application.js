import Ember from 'ember';
const { get, set } = Ember;

export default Ember.Controller.extend({
  queryParams: ['activeComponent'],
  activeComponent: 'tether-dialog',
  isShowingBasic: false,
  isShowingTranslucent: false,
  isShowingTranslucentWithCallback: false,
  isShowingWithoutOverlay: false,
  isShowingWithoutOverlayClickOutsideToClose: false,
  isShowingWithoutOverlayClickOutsideToCloseAnotherOne: false,
  isShowingCustomStyles: false,
  isShowingTargetSelector: false,
  isShowingTargetView: false,
  isShowingTargetElement: false,
  isShowingSubclassed: false,
  isShowingInPlace: false,
  isInPlace: true,
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
    toggleTargetView() {
      if (this.get('isShowingTargetView')) {
        let newTargetAttachment = this.nextAttachment(this.get('exampleTargetAttachment'));
        let newAttachment = this.nextAttachment(this.get('exampleAttachment'));
        this.set('exampleTargetAttachment', newTargetAttachment);
        this.set('exampleAttachment', newAttachment);
        if (newTargetAttachment !== 'middle left') {
          return;
        }
      }
      this.toggleProperty('isShowingTargetView');
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
    toggleInPlace() {
      this.toggleProperty('isShowingInPlace');
    },
    toggleIsInPlace() {
      this.toggleProperty('isInPlace');
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
    closeTargetView() {
      this.set('isShowingTargetView', false);
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
