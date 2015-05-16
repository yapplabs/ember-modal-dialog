import Ember from 'ember';

export default Ember.Controller.extend({
  isShowingBasic: false,
  isShowingTranslucent: false,
  isShowingCustomStyles: false,
  isShowingAlignmentTargetSelector: false,
  isShowingAlignmentTargetView: false,
  isShowingAlignmentTargetElement: false,
  isShowingSubclassed: false,
  isShowingInPlace: false,
  exampleTargetAttachment: 'middle left',
  exampleAttachment: 'middle right',
  alignmentTargetDirection: 'right',
  customContainerClassNames: 'custom-styles-modal-container',
  nextAlignmentTargetDirection: function(){
    switch(this.alignmentTargetDirection) {
      case 'right':
        return 'bottom';
      case 'bottom':
        return 'left';
      case 'left':
        return 'top';
      case 'top':
        return 'right';
    }
    return false;
  },
  nextAttachment: function(val){
    switch(val) {
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
    toggleBasic: function(){
      this.toggleProperty('isShowingBasic');
    },
    toggleTranslucent: function(){
      this.toggleProperty('isShowingTranslucent');
    },
    toggleCustomStyles: function(){
      this.toggleProperty('isShowingCustomStyles');
    },
    toggleAlignmentTargetSelector: function(){
      if (this.get('isShowingAlignmentTargetSelector')) {
        var newTargetAttachment = this.nextAttachment(this.get('exampleTargetAttachment'));
        var newAttachment = this.nextAttachment(this.get('exampleAttachment'));
        var newAlignment = this.nextAlignmentTargetDirection();
        this.set('alignmentTargetDirection', newAlignment);
        this.set('exampleTargetAttachment', newTargetAttachment);
        this.set('exampleAttachment', newAttachment);
        if (newTargetAttachment !== 'middle left') {
          return;
        }
      }
      this.toggleProperty('isShowingAlignmentTargetSelector');
    },
    toggleAlignmentTargetView: function(){
      if (this.get('isShowingAlignmentTargetView')) {
        var newTargetAttachment = this.nextAttachment(this.get('exampleTargetAttachment'));
        var newAttachment = this.nextAttachment(this.get('exampleAttachment'));
        var newAlignment = this.nextAlignmentTargetDirection();
        this.set('alignmentTargetDirection', newAlignment);
        this.set('exampleTargetAttachment', newTargetAttachment);
        this.set('exampleAttachment', newAttachment);
        if (newTargetAttachment !== 'middle left') {
          return;
        }
      }
      this.toggleProperty('isShowingAlignmentTargetView');
    },
    toggleAlignmentTargetElement: function(){
      if (this.get('isShowingAlignmentTargetElement')) {
        var newTargetAttachment = this.nextAttachment(this.get('exampleTargetAttachment'));
        var newAttachment = this.nextAttachment(this.get('exampleAttachment'));
        var newAlignment = this.nextAlignmentTargetDirection();
        this.set('alignmentTargetDirection', newAlignment);
        this.set('exampleTargetAttachment', newTargetAttachment);
        this.set('exampleAttachment', newAttachment);
        if (newTargetAttachment !== 'middle left') {
          return;
        }
      }
      this.toggleProperty('isShowingAlignmentTargetElement');
    },
    toggleSubclassed: function(){
      this.toggleProperty('isShowingSubclassed');
    },
    toggleInPlace: function() {
      this.toggleProperty('isShowingInPlace');
    },
    closeAlignmentTargetSelector: function() {
      this.set('isShowingAlignmentTargetSelector', false);
      this.set('exampleTargetAttachment', 'middle left');
      this.set('exampleAttachment', 'middle right');
    },
    closeAlignmentTargetView: function() {
      this.set('isShowingAlignmentTargetView', false);
      this.set('exampleTargetAttachment', 'middle left');
      this.set('exampleAttachment', 'middle right');
    },
    closeAlignmentTargetElement: function() {
      this.set('isShowingAlignmentTargetElement', false);
      this.set('exampleTargetAttachment', 'middle left');
      this.set('exampleAttachment', 'middle right');
    }
  }
});
