import Ember from 'ember';

export default Ember.Controller.extend({
  isShowingBasic: false,
  isShowingTranslucent: false,
  isShowingWithoutOverlay: false,
  isShowingWithoutOverlayClickOutsideToClose: false,
  isShowingCustomStyles: false,
  isShowingTargetSelector: false,
  isShowingTargetView: false,
  isShowingTargetElement: false,
  isShowingSubclassed: false,
  isShowingInPlace: false,
  isShowingCenteredScrolling: false,
  exampleTargetAttachment: 'middle left',
  exampleAttachment: 'middle right',
  customContainerClassNames: 'custom-styles-modal-container',
  nextAttachment: function(val) {
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
    toggleBasic: function() {
      this.toggleProperty('isShowingBasic');
    },
    toggleTranslucent: function() {
      this.toggleProperty('isShowingTranslucent');
    },
    toggleWithoutOverlay: function() {
      this.toggleProperty('isShowingWithoutOverlay');
    },
    toggleWithoutOverlayClickOutsideToClose: function() {
      this.toggleProperty('isShowingWithoutOverlayClickOutsideToClose');
    },
    toggleCustomStyles: function() {
      this.toggleProperty('isShowingCustomStyles');
    },
    toggleTargetSelector: function() {
      if (this.get('isShowingTargetSelector')) {
        var newTargetAttachment = this.nextAttachment(this.get('exampleTargetAttachment'));
        var newAttachment = this.nextAttachment(this.get('exampleAttachment'));
        this.set('exampleTargetAttachment', newTargetAttachment);
        this.set('exampleAttachment', newAttachment);
        if (newTargetAttachment !== 'middle left') {
          return;
        }
      }
      this.toggleProperty('isShowingTargetSelector');
    },
    toggleTargetView: function() {
      if (this.get('isShowingTargetView')) {
        var newTargetAttachment = this.nextAttachment(this.get('exampleTargetAttachment'));
        var newAttachment = this.nextAttachment(this.get('exampleAttachment'));
        this.set('exampleTargetAttachment', newTargetAttachment);
        this.set('exampleAttachment', newAttachment);
        if (newTargetAttachment !== 'middle left') {
          return;
        }
      }
      this.toggleProperty('isShowingTargetView');
    },
    toggleTargetElement: function() {
      if (this.get('isShowingTargetElement')) {
        var newTargetAttachment = this.nextAttachment(this.get('exampleTargetAttachment'));
        var newAttachment = this.nextAttachment(this.get('exampleAttachment'));
        this.set('exampleTargetAttachment', newTargetAttachment);
        this.set('exampleAttachment', newAttachment);
        if (newTargetAttachment !== 'middle left') {
          return;
        }
      }
      this.toggleProperty('isShowingTargetElement');
    },
    toggleSubclassed: function() {
      this.toggleProperty('isShowingSubclassed');
    },
    toggleInPlace: function() {
      this.toggleProperty('isShowingInPlace');
    },
    // HACK to unify pre/post 1.13
    close: function() {
      this.toggleProperty('isShowingInPlace');
    },
    toggleCenteredScrolling: function() {
      this.toggleProperty('isShowingCenteredScrolling');

      if (this.get('isShowingCenteredScrolling')) {
        Ember.$('#modal-overlays').addClass('active');
        Ember.$('body').addClass('centered-modal-showing');
      } else {
        Ember.$('#modal-overlays').removeClass('active');
        Ember.$('body').removeClass('centered-modal-showing');
      }
    },
    closeTargetSelector: function() {
      this.set('isShowingTargetSelector', false);
      this.set('exampleTargetAttachment', 'middle left');
      this.set('exampleAttachment', 'middle right');
    },
    closeTargetView: function() {
      this.set('isShowingTargetView', false);
      this.set('exampleTargetAttachment', 'middle left');
      this.set('exampleAttachment', 'middle right');
    },
    closeTargetElement: function() {
      this.set('isShowingTargetElement', false);
      this.set('exampleTargetAttachment', 'middle left');
      this.set('exampleAttachment', 'middle right');
    }
  }
});
